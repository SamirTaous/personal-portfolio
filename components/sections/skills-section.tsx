"use client"

import { useState, useEffect } from "react"

const skillCategories = {
  languages: {
    title: "LANGUAGES",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 80 },
      { name: "PHP", level: 75 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  frameworks: {
    title: "FRAMEWORKS",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "Symfony", level: 70 },
    ],
  },
  tools: {
    title: "TOOLS & PLATFORMS",
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 75 },
      { name: "Unity", level: 80 },
      { name: "IntelliJ", level: 90 },
      { name: "Figma", level: 70 },
    ],
  },
  databases: {
    title: "DATABASES",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "Oracle DB", level: 75 },
    ],
  },
  concepts: {
    title: "CONCEPTS",
    skills: [
      { name: "Design Patterns", level: 80 },
      { name: "Data Structures", level: 85 },
      { name: "Machine Learning", level: 75 },
      { name: "Algorithms", level: 80 },
    ],
  },
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("languages")
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const currentSkills = skillCategories[selectedCategory as keyof typeof skillCategories].skills
    const newAnimatedLevels: { [key: string]: number } = {}

    currentSkills.forEach((skill, index) => {
      setTimeout(() => {
        setAnimatedLevels((prev) => ({
          ...prev,
          [skill.name]: skill.level,
        }))
      }, index * 200)
    })
  }, [selectedCategory])

  return (
    <section className="w-screen h-screen flex items-center justify-center relative z-10 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-green-400 font-mono mb-12 text-center">SKILLS.matrix</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="space-y-2">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-300 font-mono text-sm ${
                  selectedCategory === key
                    ? "border-green-400 bg-green-400/10 text-green-400 shadow-lg shadow-green-400/20"
                    : "border-green-400/30 bg-green-400/5 text-green-300 hover:border-green-400/60"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div className="md:col-span-3 border border-green-400/30 rounded-lg p-6 bg-green-400/5">
            <h3 className="text-2xl font-bold text-green-400 font-mono mb-6">
              {skillCategories[selectedCategory as keyof typeof skillCategories].title}
            </h3>

            <div className="space-y-6">
              {skillCategories[selectedCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-green-300 font-mono">{skill.name}</span>
                    <span className="text-green-400 font-mono text-sm">{animatedLevels[skill.name] || 0}%</span>
                  </div>

                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000 ease-out relative"
                      style={{ width: `${animatedLevels[skill.name] || 0}%` }}
                    >
                      <div className="absolute inset-0 bg-green-400/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix-style background effect */}
            <div className="mt-8 p-4 bg-black/50 rounded border border-green-400/20 font-mono text-xs text-green-400/60">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 50}ms` }}>
                    {Math.random() > 0.5 ? "1" : "0"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
