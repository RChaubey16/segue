"use client"

import { useRef, useState } from "react"

function PageContent({
  dark,
  toggleBtn,
}: {
  dark: boolean
  toggleBtn?: React.ReactNode
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col ${dark ? "bg-[#0a0a0a]" : "bg-background"}`}
    >
      {/* Mini nav */}
      <div
        className={`flex items-center justify-between border-b px-6 py-3 ${dark ? "border-[#222]" : "border-border"}`}
      >
        <span
          className={`font-serif text-sm font-bold ${dark ? "text-[#e5e5e5]" : "text-foreground"}`}
        >
          myapp
        </span>
        <div className="flex items-center gap-4">
          <span
            className={`font-mono text-[11px] ${dark ? "text-[#e5e5e5]" : "text-foreground"}`}
          >
            Home
          </span>
          {toggleBtn}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <span
          className={`font-mono text-[10px] tracking-widest uppercase ${dark ? "text-[#888]" : "text-muted-foreground"}`}
        >
          {dark ? "Dark Mode" : "Light Mode"}
        </span>
        <span
          className={`font-serif text-2xl font-extrabold ${dark ? "text-[#e5e5e5]" : "text-foreground"}`}
        >
          {dark ? "Night Owl" : "Welcome"}
        </span>
        <p
          className={`max-w-[280px] text-center text-xs leading-relaxed ${dark ? "text-[#888]" : "text-muted-foreground"}`}
        >
          Click the toggle to see the expanding circle transition.
        </p>
      </div>
    </div>
  )
}

export function DarkModeDemo() {
  const [isDark, setIsDark] = useState(false)
  const [overlay, setOverlay] = useState<{
    x: number
    y: number
    expanding: boolean
    targetDark: boolean
  } | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const getMaxRadius = (x: number, y: number) => {
    const vp = viewportRef.current
    if (!vp) return 800
    const w = vp.offsetWidth
    const h = vp.offsetHeight
    return Math.sqrt(Math.max(x, w - x) ** 2 + Math.max(y, h - y) ** 2)
  }

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (overlay) return
    const btn = e.currentTarget
    const viewport = viewportRef.current
    if (!viewport) return

    const btnRect = btn.getBoundingClientRect()
    const vpRect = viewport.getBoundingClientRect()

    const x = btnRect.left + btnRect.width / 2 - vpRect.left
    const y = btnRect.top + btnRect.height / 2 - vpRect.top
    const targetDark = !isDark

    setOverlay({ x, y, expanding: false, targetDark })

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlay((prev) => (prev ? { ...prev, expanding: true } : null))
      })
    })

    setTimeout(() => {
      setIsDark(targetDark)
      setOverlay(null)
    }, 520)
  }

  const replay = () => {
    setIsDark(false)
    setOverlay(null)
    setTimeout(() => {
      toggleRef.current?.click()
    }, 80)
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      {/* Browser chrome */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <div className="flex gap-1.5">
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
        </div>
        <span className="border-border bg-background text-muted-foreground rounded-md border px-3 py-1 font-mono text-[11px]">
          segue.dev/demo/dark-mode
        </span>
        <button
          onClick={replay}
          className="border-border text-muted-foreground hover:border-accent hover:text-accent cursor-pointer rounded-md border bg-transparent px-2.5 py-1 font-mono text-[11px] transition-colors duration-150"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="relative h-80 overflow-hidden">
        {/* Current theme page */}
        <PageContent
          dark={isDark}
          toggleBtn={
            <button
              ref={toggleRef}
              onClick={toggle}
              className={`cursor-pointer border-none bg-transparent p-0 text-lg leading-none transition-transform hover:scale-110 ${overlay ? "pointer-events-none" : ""}`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          }
        />

        {/* Expanding circle overlay with next theme */}
        {overlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              clipPath: overlay.expanding
                ? `circle(${getMaxRadius(overlay.x, overlay.y)}px at ${overlay.x}px ${overlay.y}px)`
                : `circle(0px at ${overlay.x}px ${overlay.y}px)`,
              transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <PageContent dark={overlay.targetDark} />
          </div>
        )}
      </div>
    </div>
  )
}
