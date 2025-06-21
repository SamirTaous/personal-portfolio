"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      starsRef.current = []
      for (let i = 0; i < 800; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          prevX: 0,
          prevY: 0,
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Mouse influence
      const mouseInfluenceX = (mouseRef.current.x - centerX) * 0.0001
      const mouseInfluenceY = (mouseRef.current.y - centerY) * 0.0001

      starsRef.current.forEach((star) => {
        star.prevX = (star.x / star.z) * 100 + centerX
        star.prevY = (star.y / star.z) * 100 + centerY

        star.z -= 2 + mouseInfluenceX * 50
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
          star.z = 1000
        }

        const x = (star.x / star.z) * 100 + centerX + mouseInfluenceX * 100
        const y = (star.y / star.z) * 100 + centerY + mouseInfluenceY * 100

        const opacity = 1 - star.z / 1000
        const size = (1 - star.z / 1000) * 2

        // --- Clamp radius & opacity to avoid Canvas errors -----------------
        const safeSize = Math.max(size, 0.3) // 0.3 px minimum
        const safeOpacity = Math.max(Math.min(opacity, 1), 0)

        if (safeSize > 0) {
          // Draw star trail
          ctx.strokeStyle = `rgba(0, 255, 150, ${safeOpacity * 0.5})`
          ctx.lineWidth = safeSize
          ctx.beginPath()
          ctx.moveTo(star.prevX, star.prevY)
          ctx.lineTo(x, y)
          ctx.stroke()

          // Draw star
          ctx.fillStyle = `rgba(0, 255, 150, ${safeOpacity})`
          ctx.beginPath()
          ctx.arc(x, y, safeSize, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    initStars()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initStars()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
