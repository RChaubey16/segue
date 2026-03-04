"use client"

import { MouseEvent, ReactNode, useRef } from "react"
import "./transition.css"

interface DarkModeToggleProps {
  onToggle: () => void
  children: ReactNode
  className?: string
}

export function DarkModeToggle({
  onToggle,
  children,
  className,
}: DarkModeToggleProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current
    if (!btn) {
      onToggle()
      return
    }

    if (!(document as any).startViewTransition) {
      onToggle()
      return
    }

    const rect = btn.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    document.documentElement.style.setProperty("--dm-x", `${x}px`)
    document.documentElement.style.setProperty("--dm-y", `${y}px`)
    document.documentElement.classList.add("dark-mode-toggle")

    const transition = (document as any).startViewTransition(() => {
      onToggle()
    })

    transition.finished.finally(() => {
      document.documentElement.classList.remove("dark-mode-toggle")
      document.documentElement.style.removeProperty("--dm-x")
      document.documentElement.style.removeProperty("--dm-y")
    })
  }

  return (
    <button ref={ref} onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
