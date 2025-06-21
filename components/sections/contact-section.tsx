"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Github, Linkedin, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })

    // Show success message (you could add a toast here)
    alert("Message transmitted successfully!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center relative z-10 p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-green-400 font-mono mb-4">CONTACT.init()</h2>
            <p className="text-green-300 text-lg">
              Ready to collaborate on innovative projects or discuss opportunities.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 border border-green-400/30 rounded-lg bg-green-400/5">
              <Mail className="text-green-400" size={24} />
              <div>
                <p className="text-green-400 font-mono text-sm">EMAIL</p>
                <p className="text-green-300">samirtaous01@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-green-400/30 rounded-lg bg-green-400/5">
              <Phone className="text-green-400" size={24} />
              <div>
                <p className="text-green-400 font-mono text-sm">PHONE</p>
                <p className="text-green-300">+212 656163369</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-green-400/30 rounded-lg bg-green-400/5">
              <MapPin className="text-green-400" size={24} />
              <div>
                <p className="text-green-400 font-mono text-sm">LOCATION</p>
                <p className="text-green-300">Tangier, Morocco</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400 font-mono">SOCIAL.links</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/SamirTaous"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 border border-green-400/30 rounded-lg bg-green-400/5 hover:bg-green-400/10 transition-colors"
              >
                <Github className="text-green-400" size={20} />
                <span className="text-green-300 font-mono text-sm">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/samir-taous"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 border border-blue-400/30 rounded-lg bg-blue-400/5 hover:bg-blue-400/10 transition-colors"
              >
                <Linkedin className="text-blue-400" size={20} />
                <span className="text-blue-300 font-mono text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-green-400/30 rounded-lg p-6 bg-green-400/5">
          <h3 className="text-2xl font-bold text-green-400 font-mono mb-6">SEND.message()</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black/50 border border-green-400/30 rounded text-green-300 font-mono focus:border-green-400 focus:outline-none transition-colors"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black/50 border border-green-400/30 rounded text-green-300 font-mono focus:border-green-400 focus:outline-none transition-colors"
                placeholder="your.email@domain.com"
              />
            </div>

            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 bg-black/50 border border-green-400/30 rounded text-green-300 font-mono focus:border-green-400 focus:outline-none transition-colors resize-none"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-green-400/20 border border-green-400 rounded text-green-400 font-mono hover:bg-green-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>SEND.MESSAGE()</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
