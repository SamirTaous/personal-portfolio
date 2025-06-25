"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Minimize2, Maximize2, TerminalIcon } from "lucide-react"

interface TerminalProps {
  onNavigate: (index: number) => void
  sections: string[]
}

export function Terminal({ onNavigate, /*sections*/ }: TerminalProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "╔══════════════════════════════════════╗",
    "║        SAMIR_TAOUS.exe v2.0.3        ║",
    "║     Futuristic Portfolio System      ║",
    "╚══════════════════════════════════════╝",
    "",
    'Type "help" for available commands.',
    "",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, /*setIsTyping*/] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => [
      "╔═══════════════ AVAILABLE COMMANDS ═══════════════╗",
      "║                                                  ║",
      "║  Navigation Commands:                            ║",
      "║    about     - Navigate to about section         ║",
      "║    projects  - Navigate to projects section      ║",
      "║    skills    - Navigate to skills section        ║",
      "║    contact   - Navigate to contact section       ║",
      "║    intro     - Navigate to intro section         ║",
      "║                                                  ║",
      "║  System Commands:                                ║",
      "║    clear     - Clear terminal                    ║",
      "║    whoami    - Display user info                 ║",
      "║    ls        - List available sections           ║",
      "║    date      - Show current date/time            ║",
      "║    status    - Show system status                ║",
      "║                                                  ║",
      "║  Easter Eggs:                                    ║",
      "║    matrix    - Enter the matrix...               ║",
      "║    hack      - Initiate hacking sequence         ║",
      "║    coffee    - Essential developer fuel          ║",
      "║                                                  ║",
      "╚══════════════════════════════════════════════════╝",
      "",
    ],
    about: () => {
      console.log("Terminal navigating to about (index 1)")
      onNavigate(1)
      return [">>> Initializing navigation protocol...", ">>> Loading about.exe...", ">>> Navigation successful!", ""]
    },
    projects: () => {
      console.log("Terminal navigating to projects (index 2)")
      onNavigate(2)
      return [
        ">>> Accessing project database...",
        ">>> Decrypting project files...",
        ">>> Projects loaded successfully!",
        "",
      ]
    },
    skills: () => {
      console.log("Terminal navigating to skills (index 3)")
      onNavigate(3)
      return [">>> Scanning skill matrix...", ">>> Analyzing competency levels...", ">>> Skills matrix displayed!", ""]
    },
    contact: () => {
      console.log("Terminal navigating to contact (index 4)")
      onNavigate(4)
      return [
        ">>> Opening communication channels...",
        ">>> Establishing secure connection...",
        ">>> Contact interface ready!",
        "",
      ]
    },
    intro: () => {
      console.log("Terminal navigating to intro (index 0)")
      onNavigate(0)
      return [">>> Returning to main interface...", ">>> Resetting system state...", ">>> Welcome back!", ""]
    },
    clear: () => {
      setHistory([])
      return []
    },
    matrix: () => [
      ">>> Entering the Matrix...",
      "",
      "Wake up, Neo...",
      "The Matrix has you...",
      "Follow the white rabbit.",
      "",
      "01001000 01100101 01101100 01101100 01101111",
      "01010111 01101111 01110010 01101100 01100100",
      "",
      "There is no spoon.",
      "",
    ],
    hack: () => [
      ">>> Initiating hacking sequence...",
      ">>> Bypassing firewall...",
      ">>> Accessing mainframe...",
      ">>> Downloading data...",
      "",
      "[████████████████████████████████] 100%",
      "",
      ">>> Access granted!",
      ">>> Welcome to the system, hacker.",
      "",
    ],
    coffee: () => [
      ">>> Brewing coffee...",
      "",
      "      (",
      "       )     (",
      "    ___...(-------)-...___",
      '.-""       )    (          ""-.',
      ".-'``'|-._             )         _.-|",
      '/  .--.|   `""---...........---""`   |',
      "/  /    |                             |",
      "|  |    |                             |",
      " \\  \\   |                             |",
      "  `\\ `\\ |                             |",
      "    `\\ `|            COFFEE           |",
      "    _/ /\\                             /",
      "   (__/  \\                           /",
      "        _/\\_________________________/",
      "       /    /__________________________\\",
      "",
      ">>> Coffee ready! Productivity +100%",
      "",
    ],
    whoami: () => [
      "╔═══════════════ USER PROFILE ═══════════════╗",
      "║                                            ║",
      "║  Name: Samir Taous                         ║",
      "║  Role: Software Engineer & AI Enthusiast   ║",
      "║  Location: Tangier, Morocco                ║",
      "║  Status: Available for opportunities       ║",
      "║  Education: Engineering Cycle (In Progress)║",
      "║  Specialization: AI & System Design        ║",
      "║                                            ║",
      "║  Contact:                                  ║",
      "║    Email: samirtaous01@gmail.com           ║",
      "║    Phone: +212 656163369                   ║",
      "║    GitHub: github.com/SamirTaous           ║",
      "║    LinkedIn: linkedin.com/in/samir-taous   ║",
      "║                                            ║",
      "╚════════════════════════════════════════════╝",
      "",
    ],
    ls: () => [
      ">>> Listing available sections:",
      "",
      "drwxr-xr-x  2 samir  staff   64 Dec 21 2024 intro/",
      "drwxr-xr-x  2 samir  staff   64 Dec 21 2024 about/",
      "drwxr-xr-x  2 samir  staff   64 Dec 21 2024 projects/",
      "drwxr-xr-x  2 samir  staff   64 Dec 21 2024 skills/",
      "drwxr-xr-x  2 samir  staff   64 Dec 21 2024 contact/",
      "",
      "Total: 5 sections",
      "",
    ],
    date: () => [
      `>>> Current system time: ${new Date().toLocaleString()}`,
      `>>> Uptime: ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      "",
    ],
    status: () => [
      "╔═══════════════ SYSTEM STATUS ═══════════════╗",
      "║                                             ║",
      "║  Portfolio System: ONLINE                   ║",
      "║  Navigation: ACTIVE                         ║",
      "║  Terminal: OPERATIONAL                      ║",
      "║  Sound System: READY                        ║",
      "║  Starfield: RENDERING                       ║",
      "║                                             ║",
      "║  CPU Usage: 12%                             ║",
      "║  Memory: 256MB / 8GB                        ║",
      "║  Network: CONNECTED                         ║",
      "║                                             ║",
      "╚═════════════════════════════════════════════╝",
      "",
    ],
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    console.log(`Executing command: ${trimmedCmd}`)

    const output = commands[trimmedCmd as keyof typeof commands]?.() || [
      `>>> Command not found: ${cmd}`,
      `>>> Type "help" for available commands.`,
      "",
    ]

    setHistory((prev) => [...prev, `$ ${cmd}`, ...output])
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isTyping) {
      executeCommand(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMinimized])

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isMinimized ? "w-64 h-12" : "w-96 h-80"}`}
    >
      <div className="bg-black/95 border border-green-400 rounded-lg shadow-2xl shadow-green-400/20 backdrop-blur-sm cyber-glow">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-2 border-b border-green-400/30 bg-green-400/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "1s" }}></div>
            <TerminalIcon size={12} className="text-green-400 ml-2" />
            <span className="text-xs text-green-400 ml-1">terminal@samir:~$</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-green-400/20 rounded transition-colors"
              title={isMinimized ? "Maximize terminal" : "Minimize terminal"}
            >
              {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <div className="p-3 h-64 flex flex-col" data-terminal="true">
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto text-xs text-green-400 font-mono space-y-1 scrollbar-thin scrollbar-thumb-green-400/30"
            >
              {history.map((line, index) => (
                <div
                  key={index}
                  className={line.startsWith("$") ? "text-green-300" : line.startsWith(">>>") ? "text-cyan-400" : ""}
                >
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center mt-2 border-t border-green-400/30 pt-2">
              <span className="text-green-400 text-xs mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent text-green-400 text-xs outline-none font-mono disabled:opacity-50"
                placeholder={isTyping ? "Processing..." : "Type a command..."}
                autoComplete="off"
              />
              <span className="text-green-400 animate-pulse cursor-blink">|</span>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
