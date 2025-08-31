"use client"

import type React from "react"
import { useEffect, useState } from "react"

export function MouseGradientProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100
        const y = (e.clientY / window.innerHeight) * 100

        document.documentElement.style.setProperty("--mouse-x", `${x}%`)
        document.documentElement.style.setProperty("--mouse-y", `${y}%`)
      })
    }

    const handleMouseEnter = () => {
      setIsActive(true)
      document.body.classList.add("mouse-gradient-active")
    }

    const handleMouseLeave = () => {
      setIsActive(false)
      document.body.classList.remove("mouse-gradient-active")
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return <div className={`transition-all duration-200 ${isActive ? "mouse-gradient-active" : ""}`}>{children}</div>
}
