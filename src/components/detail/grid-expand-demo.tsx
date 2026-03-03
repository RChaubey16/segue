"use client"

import { useRef, useState } from "react"

const items = [
  { id: 1, label: "Sneakers", emoji: "\uD83D\uDC5F", bg: "bg-accent/15" },
  { id: 2, label: "Hoodie", emoji: "\uD83E\uDDE5", bg: "bg-accent/25" },
  { id: 3, label: "Backpack", emoji: "\uD83C\uDF92", bg: "bg-accent/10" },
  { id: 4, label: "Watch", emoji: "\u231A", bg: "bg-accent/20" },
]

export function GridExpandDemo() {
  const [screen, setScreen] = useState<"grid" | "detail">("grid")
  const [phase, setPhase] = useState<"idle" | "expanding" | "collapsing">(
    "idle"
  )
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({})
  const gridRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const expand = (id: number) => {
    if (phase !== "idle") return
    setActiveItem(id)

    // Get the clicked card's image position relative to the viewport
    const card = gridRef.current?.querySelector(
      `[data-item-id="${id}"] .ge-image`
    ) as HTMLElement | null
    const viewport = viewportRef.current

    if (card && viewport) {
      const cardRect = card.getBoundingClientRect()
      const viewportRect = viewport.getBoundingClientRect()

      // Starting position of the "flying" image (relative to viewport)
      setImageStyle({
        position: "absolute",
        top: cardRect.top - viewportRect.top,
        left: cardRect.left - viewportRect.left,
        width: cardRect.width,
        height: cardRect.height,
        borderRadius: "0.5rem",
        zIndex: 20,
        transition: "all 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
      })

      setPhase("expanding")

      // Animate to full-width hero position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setImageStyle((prev) => ({
            ...prev,
            top: 37, // below the nav bar
            left: 0,
            width: "100%",
            height: 112,
            borderRadius: 0,
          }))
        })
      })

      setTimeout(() => {
        setScreen("detail")
        setPhase("idle")
        setImageStyle({})
      }, 520)
    }
  }

  const collapse = () => {
    if (phase !== "idle") return
    setPhase("collapsing")
    setTimeout(() => {
      setScreen("grid")
      setPhase("idle")
      setActiveItem(null)
    }, 400)
  }

  const replay = () => {
    setScreen("grid")
    setPhase("idle")
    setActiveItem(null)
    setImageStyle({})
    setTimeout(() => expand(2), 80)
  }

  const active = items.find((i) => i.id === activeItem)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
        </div>
        <span className="rounded-md border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
          segue.dev/demo/grid-expand
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-md border border-border bg-transparent px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="relative h-80 overflow-hidden bg-background">
        {/* Grid view */}
        {screen === "grid" && (
          <div
            ref={gridRef}
            className={`absolute inset-0 flex flex-col bg-background ${
              phase === "expanding" ? "ge-grid-fade" : ""
            }`}
          >
            {/* Mini nav */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <span className="font-serif text-sm font-bold text-foreground">
                myapp
              </span>
              <span className="font-mono text-[11px] text-foreground">
                Products
              </span>
            </div>

            {/* Grid */}
            <div className="grid flex-1 grid-cols-2 gap-3 p-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  data-item-id={item.id}
                  onClick={() => expand(item.id)}
                  className="relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-background text-left transition-colors hover:border-accent"
                >
                  <div
                    className={`ge-image ${item.bg} flex h-16 items-center justify-center text-2xl`}
                  >
                    {item.emoji}
                  </div>
                  <div className="px-2.5 py-2">
                    <span className="font-mono text-[10px] font-medium text-foreground">
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Flying image during expand */}
        {phase === "expanding" && active && (
          <div className={`${active.bg} flex items-center justify-center text-3xl`} style={imageStyle}>
            {active.emoji}
          </div>
        )}

        {/* Detail view */}
        {screen === "detail" && (
          <div
            className={`absolute inset-0 flex flex-col bg-background ${
              phase === "collapsing" ? "ge-detail-exit" : "ge-detail-enter"
            }`}
          >
            {/* Mini nav */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <span className="font-serif text-sm font-bold text-foreground">
                myapp
              </span>
              <button
                onClick={collapse}
                className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back
              </button>
            </div>

            {/* Hero banner — the image landed here */}
            <div
              className={`${active?.bg} flex h-28 items-center justify-center text-3xl`}
            >
              {active?.emoji}
            </div>

            {/* Detail content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Detail
              </span>
              <span className="font-serif text-lg font-bold text-foreground">
                {active?.label}
              </span>
              <p className="max-w-60 text-center text-xs leading-relaxed text-muted-foreground">
                The image moved from the grid card into this detail view.
              </p>
              <button
                onClick={collapse}
                className="mt-2 cursor-pointer rounded-md border-none bg-accent px-5 py-2 font-mono text-[12px] font-medium text-accent-foreground"
              >
                Back to Grid
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
