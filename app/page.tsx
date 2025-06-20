"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Zap, Cpu, Database, Globe, Rocket, Brain, Eye, Volume2, VolumeX, Terminal } from "lucide-react"

// Custom Hook for Mouse Position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return mousePosition
}

// Particle System Component
const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`,
        })
      }
    }

    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Mouse attraction
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          particle.vx += dx * 0.0001
          particle.vy += dy * 0.0001
        }

        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Connect nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x
          const dy2 = particle.y - otherParticle.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (distance2 < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = 0.1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mousePosition])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// Terminal Component
const TerminalComponent = ({ isActive }: { isActive: boolean }) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const terminalLines = [
    "$ whoami",
    "> Samir Taous - Software Engineer & AI Enthusiast",
    "$ cat skills.txt",
    "> Languages: Java, C++, JavaScript, PHP, Python",
    "> Frameworks: React.js, Spring Boot, Symfony",
    "> Databases: PostgreSQL, MySQL, OracleDB",
    "$ ls projects/",
    "> fintech-app/  rpg-game/  oracle-admin/",
    "$ echo 'Ready to build the future'",
    "> Ready to build the future ✨",
  ]

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        if (currentChar < terminalLines[currentLine].length) {
          setCurrentChar((prev) => prev + 1)
        } else {
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setCurrentChar(0)
          }, 500)
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [currentLine, currentChar, isActive])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 font-mono text-green-400 max-w-2xl">
      <div className="flex items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-4 text-sm">terminal@samir-portfolio</span>
      </div>
      <div className="space-y-2">
        {terminalLines.slice(0, currentLine + 1).map((line, index) => (
          <div key={index} className="flex">
            <span>{index === currentLine ? line.slice(0, currentChar) + (showCursor ? "_" : "") : line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 3D Card Component
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-transform duration-200 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// Morphing Shape Component
const MorphingShape = () => {
  const [pathIndex, setPathIndex] = useState(0)
  const paths = [
    "M50,10 L90,90 L10,90 Z", // Triangle
    "M10,50 Q50,10 90,50 Q50,90 10,50", // Circle-ish
    "M10,10 L90,10 L90,90 L10,90 Z", // Square
    "M50,10 L70,30 L90,50 L70,70 L50,90 L30,70 L10,50 L30,30 Z", // Octagon
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPathIndex((prev) => (prev + 1) % paths.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="text-purple-500">
      <motion.path
        d={paths[pathIndex]}
        fill="currentColor"
        initial={false}
        animate={{ d: paths[pathIndex] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  )
}

// Skill Visualization Component
const SkillVisualization = () => {
  const skills = [
    { name: "React.js", level: 90, color: "#61DAFB" },
    { name: "Java", level: 85, color: "#ED8B00" },
    { name: "JavaScript", level: 88, color: "#F7DF1E" },
    { name: "Spring Boot", level: 80, color: "#6DB33F" },
    { name: "PostgreSQL", level: 75, color: "#336791" },
    { name: "Docker", level: 70, color: "#2496ED" },
  ]

  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex justify-between mb-2">
            <span className="text-white font-medium">{skill.name}</span>
            <span className="text-white/60">{skill.level}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Main Portfolio Component
export default function CreativePortfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTerminalActive, setIsTerminalActive] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const mousePosition = useMousePosition()

  const sections = [
    { id: "hero", title: "Welcome", icon: Rocket },
    { id: "about", title: "About", icon: Eye },
    { id: "skills", title: "Skills", icon: Cpu },
    { id: "projects", title: "Projects", icon: Code2 },
    { id: "experience", title: "Experience", icon: Zap },
    { id: "contact", title: "Contact", icon: Globe },
  ]

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length)
  }

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") nextSection()
      if (e.key === "ArrowLeft") prevSection()
      if (e.key === "t" || e.key === "T") setIsTerminalActive(!isTerminalActive)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isTerminalActive])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Particle System */}
      <ParticleSystem />

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-purple-500/50 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => setCurrentSection(index)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? "bg-purple-500 border-purple-500 scale-125"
                : "border-white/30 hover:border-purple-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Control Panel */}
      <div className="fixed top-8 right-8 z-40 flex space-x-4">
        <motion.button
          onClick={() => setIsTerminalActive(!isTerminalActive)}
          className="p-3 bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Terminal className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-3 bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isTerminalActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsTerminalActive(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <TerminalComponent isActive={isTerminalActive} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.section
              key="hero"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="min-h-screen flex items-center justify-center"
            >
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <MorphingShape />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                >
                  SAMIR TAOUS
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl text-white/80"
                >
                  Crafting Digital Experiences with Code & Creativity
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center space-x-4"
                >
                  <motion.button
                    onClick={nextSection}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore My Universe
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}

          {currentSection === 1 && (
            <motion.section
              key="about"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="min-h-screen flex items-center justify-center p-8"
            >
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <Card3D className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                  <div className="space-y-4 text-white/80">
                    <p>
                      I'm a passionate software engineer currently pursuing my Engineering Cycle in Software &
                      Intelligent Systems at the Faculty of Sciences and Technologies in Tangier.
                    </p>
                    <p>
                      My journey began with mathematics and physics, evolving into a deep fascination with software
                      development, artificial intelligence, and system design.
                    </p>
                    <p>
                      I believe in creating not just functional software, but digital experiences that inspire and
                      innovate.
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">3+</div>
                      <div className="text-white/60">Years Learning</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-400">10+</div>
                      <div className="text-white/60">Projects Built</div>
                    </div>
                  </div>
                </Card3D>
                <div className="space-y-8">
                  <Card3D className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center space-x-4">
                      <Brain className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">AI Enthusiast</h3>
                        <p className="text-white/60">Machine Learning & Intelligent Systems</p>
                      </div>
                    </div>
                  </Card3D>
                  <Card3D className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center space-x-4">
                      <Code2 className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">Full-Stack Developer</h3>
                        <p className="text-white/60">React.js, Spring Boot, Cloud Technologies</p>
                      </div>
                    </div>
                  </Card3D>
                  <Card3D className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center space-x-4">
                      <Database className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">System Designer</h3>
                        <p className="text-white/60">Architecture & Database Optimization</p>
                      </div>
                    </div>
                  </Card3D>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 2 && (
            <motion.section
              key="skills"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="min-h-screen flex items-center justify-center p-8"
            >
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center text-white mb-12">Technical Arsenal</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <Card3D className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6">Skill Levels</h3>
                    <SkillVisualization />
                  </Card3D>
                  <div className="space-y-6">
                    {[
                      {
                        category: "Languages",
                        items: ["Java", "C++", "JavaScript", "PHP", "Python"],
                        color: "from-red-500 to-orange-500",
                      },
                      {
                        category: "Frameworks",
                        items: ["React.js", "Spring Boot", "Symfony"],
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        category: "Databases",
                        items: ["PostgreSQL", "MySQL", "OracleDB"],
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        category: "Tools",
                        items: ["Git", "Docker", "IntelliJ", "Unity"],
                        color: "from-purple-500 to-pink-500",
                      },
                    ].map((skillGroup, index) => (
                      <motion.div
                        key={skillGroup.category}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card3D
                          className={`bg-gradient-to-r ${skillGroup.color} bg-opacity-20 backdrop-blur-sm border border-white/10 rounded-xl p-6`}
                        >
                          <h4 className="text-xl font-semibold text-white mb-3">{skillGroup.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((item) => (
                              <span key={item} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        </Card3D>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 3 && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              className="min-h-screen flex items-center justify-center p-8"
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-bold text-center text-white mb-12">Featured Projects</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Cloud-Native FinTech App",
                      description: "React.js dashboards with microservices architecture",
                      tech: ["React.js", "Docker", "CI/CD"],
                      gradient: "from-blue-600 to-purple-600",
                      icon: Globe,
                    },
                    {
                      title: "RPG Game Engine",
                      description: "Unity game with procedural generation & A* pathfinding",
                      tech: ["Unity", "C#", "AI"],
                      gradient: "from-green-600 to-cyan-600",
                      icon: Zap,
                    },
                    {
                      title: "Oracle Admin Suite",
                      description: "Database management with performance monitoring",
                      tech: ["Oracle", "Spring Boot", "React.js"],
                      gradient: "from-orange-600 to-red-600",
                      icon: Database,
                    },
                  ].map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card3D className="h-full">
                        <div
                          className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-8 h-full flex flex-col justify-between`}
                        >
                          <div>
                            <project.icon className="w-12 h-12 text-white mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                            <p className="text-white/80 mb-6">{project.description}</p>
                          </div>
                          <div>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tech.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <motion.button
                              className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/30 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Explore Project
                            </motion.button>
                          </div>
                        </div>
                      </Card3D>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 4 && (
            <motion.section
              key="experience"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="min-h-screen flex items-center justify-center p-8"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-center text-white mb-12">Experience Timeline</h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Web Maintenance Internship",
                      company: "Football News Website",
                      period: "Jan 2025 - Mar 2025",
                      description: "Maintained and updated website, ensuring optimal performance",
                      current: true,
                    },
                    {
                      title: "Customer Service Representative",
                      company: "Orbus Marketing",
                      period: "Sep 2022 - Nov 2022",
                      description: "Customer interaction and problem-solving for insurance clients",
                    },
                  ].map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      <Card3D>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                              <p className="text-purple-400 font-semibold">{exp.company}</p>
                            </div>
                            {exp.current && (
                              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-white/60 mb-4">{exp.period}</p>
                          <p className="text-white/80">{exp.description}</p>
                        </div>
                      </Card3D>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 5 && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="min-h-screen flex items-center justify-center p-8"
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold text-white mb-8">Let's Connect</h2>
                <p className="text-xl text-white/80 mb-12">Ready to build something extraordinary together?</p>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: "samirtaous01@gmail.com",
                      action: "mailto:samirtaous01@gmail.com",
                    },
                    {
                      icon: "📱",
                      label: "Phone",
                      value: "+212 656163369",
                      action: "tel:+212656163369",
                    },
                    {
                      icon: "📍",
                      label: "Location",
                      value: "Tangier, Morocco",
                      action: "#",
                    },
                  ].map((contact, index) => (
                    <motion.a
                      key={contact.label}
                      href={contact.action}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="block"
                    >
                      <Card3D>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <div className="text-4xl mb-4">{contact.icon}</div>
                          <h3 className="text-xl font-semibold text-white mb-2">{contact.label}</h3>
                          <p className="text-white/80">{contact.value}</p>
                        </div>
                      </Card3D>
                    </motion.a>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <p className="text-white/60">Press 'T' to open terminal • Use arrow keys to navigate</p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold"
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download Resume
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Instructions */}
      <div className="fixed bottom-8 left-8 z-40 text-white/60 text-sm">
        <p>← → Navigate • Space: Next • T: Terminal</p>
      </div>

      {/* Section Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2">
          <span className="text-white font-medium">
            {sections[currentSection].title} ({currentSection + 1}/{sections.length})
          </span>
        </div>
      </div>
    </div>
  )
}
