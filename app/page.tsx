"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { StarfieldBackground } from "@/components/starfield-background"
import { Terminal } from "@/components/terminal"
import { SoundToggle } from "@/components/sound-toggle"
import { Navigation } from "@/components/navigation"
import { IntroSection } from "@/components/sections/intro-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ContactSection } from "@/components/sections/contact-section"

const sections = ["intro", "about", "projects", "skills", "contact"]

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback(
    (index: number) => {
      if (!containerRef.current || isScrolling || index < 0 || index >= sections.length) return

      setIsScrolling(true)
      setCurrentSection(index)

      // Use transform instead of scrollTo for better control
      const targetX = -index * 100
      containerRef.current.style.transform = `translateX(${targetX}vw)`

      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 800)
    },
    [isScrolling],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling || isLoading) return

      // Prevent default behavior for navigation keys
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "ArrowLeft":
          if (currentSection > 0) {
            scrollToSection(currentSection - 1)
          }
          break
        case "ArrowRight":
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1)
          }
          break
        case "Home":
          scrollToSection(0)
          break
        case "End":
          scrollToSection(sections.length - 1)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, isScrolling, isLoading, scrollToSection])

  // Mouse wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling || isLoading) return

      e.preventDefault()

      // Debounce wheel events
      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        if (Math.abs(e.deltaY) > 10) {
          // Minimum threshold
          if (e.deltaY > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1)
          } else if (e.deltaY < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1)
          }
        }
      }, 50)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(wheelTimeout)
    }
  }, [currentSection, isScrolling, isLoading, scrollToSection])

  // Touch navigation for mobile
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      if (isScrolling || isLoading) return

      const swipeThreshold = 50
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSection < sections.length - 1) {
          // Swipe left - go to next section
          scrollToSection(currentSection + 1)
        } else if (diff < 0 && currentSection > 0) {
          // Swipe right - go to previous section
          scrollToSection(currentSection - 1)
        }
      }
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSection, isScrolling, isLoading, scrollToSection])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black text-green-400 font-mono">
      <StarfieldBackground />

      <div
        ref={containerRef}
        className="flex h-full transition-transform duration-800 ease-out"
        style={{
          width: `${sections.length * 100}vw`,
          transform: `translateX(-${currentSection * 100}vw)`,
        }}
      >
        <IntroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>

      <Navigation currentSection={currentSection} totalSections={sections.length} onNavigate={scrollToSection} />

      <Terminal onNavigate={scrollToSection} sections={sections} />
      <SoundToggle />

      {/* Debug info - remove in production */}
      <div className="fixed top-4 left-4 z-40 text-xs text-green-400/60 font-mono bg-black/50 p-2 rounded">
        Section: {currentSection + 1}/{sections.length} ({sections[currentSection]})
        <br />
        Scrolling: {isScrolling ? "Yes" : "No"}
        <br />
        Use ← → keys or scroll
      </div>
    </div>
  )
}
