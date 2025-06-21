"use client"

interface NavigationProps {
  currentSection: number
  totalSections: number
  onNavigate: (index: number) => void
}

export function Navigation({ currentSection, totalSections, onNavigate }: NavigationProps) {
  const sections = ["INTRO", "ABOUT", "PROJECTS", "SKILLS", "CONTACT"]

  const handleClick = (index: number) => {
    console.log(`Navigation clicked: ${index}`) // Debug log
    onNavigate(index)
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => handleClick(index)}
            data-nav="true"
            className={`group relative p-3 transition-all duration-300 cursor-pointer ${
              currentSection === index ? "text-green-400" : "text-gray-500 hover:text-green-400"
            }`}
            title={`Navigate to ${section.toLowerCase()}`}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentSection === index
                  ? "bg-green-400 border-green-400 shadow-lg shadow-green-400/50 cyber-glow"
                  : "border-gray-500 group-hover:border-green-400 group-hover:shadow-md group-hover:shadow-green-400/30"
              }`}
            />

            <span
              className={`absolute left-8 top-1/2 transform -translate-y-1/2 text-xs font-mono whitespace-nowrap transition-all duration-300 px-2 py-1 rounded ${
                currentSection === index
                  ? "opacity-100 translate-x-0 bg-green-400/10 border border-green-400/30"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-green-400/5 group-hover:border group-hover:border-green-400/20"
              }`}
            >
              {section}
            </span>

            {/* Progress indicator */}
            {/* {currentSection === index && (
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-400 rounded-full animate-pulse"></div>
            )} */}
          </button>
        ))}

        {/* Progress bar */}
        {/* <div className="absolute -right-6 top-0 w-1 h-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-green-600 to-green-400 rounded-full transition-all duration-800 ease-out"
            style={{ height: `${((currentSection + 1) / totalSections) * 100}%` }}
          />
        </div> */}
      </div>
    </div>
  )
}
