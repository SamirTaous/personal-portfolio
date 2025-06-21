"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("")

  const loadingTexts = [
    "Initializing quantum processors...",
    "Loading neural networks...",
    "Establishing secure connections...",
    "Calibrating holographic displays...",
    "Synchronizing with the matrix...",
    "Portfolio system ready!",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15

        // Update loading text based on progress
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length)
        if (textIndex < loadingTexts.length) {
          setCurrentText(loadingTexts[textIndex])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 1000)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 font-mono glow">SAMIR_TAOUS.exe</h1>
          <p className="text-green-300 font-mono text-sm">v2.0.3</p>
        </div>

        <div className="space-y-4">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-green-400/30 animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between text-xs font-mono text-green-400">
            <span>{Math.floor(progress)}%</span>
            <span>LOADING...</span>
          </div>
        </div>

        <p className="text-green-400/80 font-mono text-sm min-h-[1.25rem]">{currentText}</p>

        {/* Matrix-style background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
