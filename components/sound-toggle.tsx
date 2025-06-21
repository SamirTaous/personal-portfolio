"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Music } from "lucide-react"

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // Check if Web Audio API is supported
    if (typeof window !== "undefined") {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      setIsSupported(!!AudioContext)
    }
  }, [])

  const createAmbientSound = () => {
    if (!isSupported) return

    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContext()
      }

      const audioContext = audioContextRef.current

      // Resume context if suspended (required by some browsers)
      if (audioContext.state === "suspended") {
        audioContext.resume()
      }

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()

      // Create ambient cyberpunk-style sound
      oscillator.type = "sawtooth"
      oscillator.frequency.setValueAtTime(55, audioContext.currentTime) // Low bass frequency

      filter.type = "lowpass"
      filter.frequency.setValueAtTime(200, audioContext.currentTime)
      filter.Q.setValueAtTime(1, audioContext.currentTime)

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(isMuted ? 0 : 0.05, audioContext.currentTime + 0.5)

      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start()

      // Add frequency modulation for ambient effect
      const lfo = audioContext.createOscillator()
      const lfoGain = audioContext.createGain()

      lfo.type = "sine"
      lfo.frequency.setValueAtTime(0.1, audioContext.currentTime)
      lfoGain.gain.setValueAtTime(10, audioContext.currentTime)

      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      lfo.start()

      oscillatorRef.current = oscillator
      gainNodeRef.current = gainNode

      return { oscillator, gainNode, lfo }
    } catch (error) {
      console.warn("Audio context creation failed:", error)
      setIsSupported(false)
    }
  }

  const playTypingSound = () => {
    if (!audioContextRef.current || isMuted || !isSupported) return

    try {
      const audioContext = audioContextRef.current
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.type = "square"
      oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime)

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.warn("Typing sound failed:", error)
    }
  }

  const playNavigationSound = () => {
    if (!audioContextRef.current || isMuted || !isSupported) return

    try {
      const audioContext = audioContextRef.current
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2)

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05)
      gainNode.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.warn("Navigation sound failed:", error)
    }
  }

  const toggleSound = async () => {
    if (!isSupported) return

    if (isPlaying) {
      // Stop ambient sound
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (error) {
          console.warn("Error stopping oscillator:", error)
        }
        oscillatorRef.current = null
      }
      setIsPlaying(false)
    } else {
      // Start ambient sound
      createAmbientSound()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setValueAtTime(isMuted ? 0.05 : 0, audioContextRef.current.currentTime)
      } catch (error) {
        console.warn("Error toggling mute:", error)
      }
    }
  }

  useEffect(() => {
    // Add typing sound to terminal inputs
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement && e.target.closest("[data-terminal]")) {
        playTypingSound()
      }
    }

    // Add navigation sounds
    const handleNavigation = () => {
      playNavigationSound()
    }

    document.addEventListener("keypress", handleKeyPress)
    document.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-nav]")) {
        handleNavigation()
      }
    })

    return () => {
      document.removeEventListener("keypress", handleKeyPress)
      document.removeEventListener("click", handleNavigation)
    }
  }, [isMuted, isSupported])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (error) {
          console.warn("Cleanup error:", error)
        }
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close()
        } catch (error) {
          console.warn("Audio context cleanup error:", error)
        }
      }
    }
  }, [])

  if (!isSupported) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="p-3 rounded-full border border-gray-600 bg-black/50 text-gray-400" title="Audio not supported">
          <VolumeX size={20} />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      <button
        onClick={toggleSound}
        className={`p-3 rounded-full border transition-all duration-300 ${
          isPlaying
            ? "bg-green-400/20 border-green-400 text-green-400 shadow-lg shadow-green-400/20 cyber-glow"
            : "bg-black/50 border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400"
        }`}
        title={isPlaying ? "Stop ambient sound" : "Play ambient sound"}
      >
        {isPlaying ? <Music size={20} /> : <Volume2 size={20} />}
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full border transition-all duration-300 ${
            isMuted
              ? "bg-red-400/20 border-red-400 text-red-400 shadow-lg shadow-red-400/20"
              : "bg-green-400/20 border-green-400 text-green-400 shadow-lg shadow-green-400/20 cyber-glow"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  )
}
