"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Code, Cpu, Zap } from "lucide-react"

export function IntroSection() {
  const [text, setText] = useState("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const fullText = "SAMIR TAOUS"
  const subtitle = "Software Engineer & AI Enthusiast"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
        setTimeout(() => setShowSubtitle(true), 500)
        setTimeout(() => setShowDetails(true), 1000)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-screen h-screen flex items-center justify-center relative z-10 overflow-hidden">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-green-400 font-mono tracking-wider glow">
            {text}
            <span className="animate-pulse text-green-300">|</span>
          </h1>
          <div className="absolute inset-0 text-4xl md:text-6xl lg:text-8xl font-bold text-green-400/10 font-mono tracking-wider blur-sm">
            {text}
          </div>
        </div>

        <div
          className={`space-y-6 transition-all duration-1000 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-lg md:text-xl lg:text-2xl text-green-300 font-mono animate-pulse">{subtitle}</p>

          <div className="flex justify-center items-center space-x-6 text-sm md:text-base text-gray-400 font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Tangier, Morocco</span>
            </div>
            <span className="text-green-400">•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <span>Available for opportunities</span>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
            <div className="flex flex-col items-center space-y-2 p-4 border border-green-400/20 rounded-lg bg-green-400/5 hover:bg-green-400/10 transition-colors">
              <Code className="text-green-400" size={24} />
              <span className="text-green-300 font-mono text-sm">Full-Stack Developer</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 border border-blue-400/20 rounded-lg bg-blue-400/5 hover:bg-blue-400/10 transition-colors">
              <Cpu className="text-blue-400" size={24} />
              <span className="text-blue-300 font-mono text-sm">AI Enthusiast</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 border border-purple-400/20 rounded-lg bg-purple-400/5 hover:bg-purple-400/10 transition-colors">
              <Zap className="text-purple-400" size={24} />
              <span className="text-purple-300 font-mono text-sm">System Designer</span>
            </div>
          </div>

          <div className="space-y-3 text-green-400/60 text-sm font-mono">
            <div className="flex items-center justify-center space-x-2">
              <span>Use</span>
              <kbd className="px-2 py-1 bg-green-400/10 border border-green-400/30 rounded text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-green-400/10 border border-green-400/30 rounded text-xs">→</kbd>
              <span>or scroll to navigate</span>
            </div>
            <p className="flex items-center justify-center space-x-2">
              <span>Try the terminal in the bottom right</span>
              <span className="animate-bounce">↘</span>
            </p>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-green-400/60" size={24} />
        </div>

        {/* Multiple glowing orb effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse -z-10"></div>
        <div
          className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl animate-pulse -z-10"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2 w-48 h-48 bg-purple-400/5 rounded-full blur-xl animate-pulse -z-10"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  )
}
