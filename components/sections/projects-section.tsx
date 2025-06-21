"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Cloud-Native FinTech Application",
    description:
      "Developed React.js dashboards, integrated backend APIs, and contributed to a microservices architecture. Deployed using Docker and CI/CD for automated testing and deployment.",
    tech: ["React.js", "JavaScript", "REST API", "Docker", "CI/CD"],
    status: "Production",
  },
  {
    id: 2,
    title: "RPG Game with Procedural Generation",
    description:
      "Developed an RPG game in Unity with C# featuring procedural map generation and A* pathfinding for enemy movement and coin collection.",
    tech: ["Unity", "C#", "A* Algorithm", "Procedural Generation"],
    status: "Completed",
  },
  {
    id: 3,
    title: "Oracle Administration Application",
    description:
      "Developed an application for user management, performance monitoring, RMAN backup/restore, and query optimization.",
    tech: ["Oracle DB", "Spring Boot", "React.js", "RMAN"],
    status: "Completed",
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0)

  return (
    <section className="w-screen h-screen flex items-center justify-center relative z-10 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-green-400 font-mono mb-12 text-center">PROJECTS.db</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  selectedProject === index
                    ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                    : "border-green-400/30 bg-green-400/5 hover:border-green-400/60"
                }`}
              >
                <h3 className="text-green-300 font-mono text-sm mb-2">PROJECT_{String(index + 1).padStart(2, "0")}</h3>
                <p className="text-green-400 font-semibold text-sm leading-tight">{project.title}</p>
                <div className="mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      project.status === "Production"
                        ? "bg-green-400/20 text-green-400"
                        : "bg-blue-400/20 text-blue-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Project Details */}
          <div className="md:col-span-2 border border-green-400/30 rounded-lg p-6 bg-green-400/5">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-green-400 font-mono mb-2">{projects[selectedProject].title}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    projects[selectedProject].status === "Production"
                      ? "bg-green-400/20 text-green-400"
                      : "bg-blue-400/20 text-blue-400"
                  }`}
                >
                  {projects[selectedProject].status}
                </span>
              </div>

              <p className="text-green-300 leading-relaxed">{projects[selectedProject].description}</p>

              <div>
                <h4 className="text-green-400 font-mono text-sm mb-3">TECH_STACK:</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-400/10 border border-green-400/30 rounded text-green-300 text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-400/20 border border-green-400 rounded text-green-400 hover:bg-green-400/30 transition-colors">
                  <Github size={16} />
                  <span className="font-mono text-sm">VIEW_CODE</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-400/20 border border-blue-400 rounded text-blue-400 hover:bg-blue-400/30 transition-colors">
                  <ExternalLink size={16} />
                  <span className="font-mono text-sm">LIVE_DEMO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
