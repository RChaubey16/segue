"use client"

import type { TransitionCategory, TransitionMeta } from "@/lib/registry"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const categoryConfig: Record<TransitionCategory, { label: string; order: number }> = {
  page: { label: "Page Transitions", order: 0 },
  element: { label: "Element Transitions", order: 1 },
  "ui-state": { label: "UI State Transitions", order: 2 },
}

export function SidebarNav({
  transitions,
  onNavigate,
}: {
  transitions: TransitionMeta[]
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  const grouped = transitions.reduce<Record<TransitionCategory, TransitionMeta[]>>(
    (acc, t) => {
      acc[t.category].push(t)
      return acc
    },
    { page: [], element: [], "ui-state": [] }
  )

  const categories = (
    Object.entries(grouped) as [TransitionCategory, TransitionMeta[]][]
  )
    .filter(([, items]) => items.length > 0)
    .sort(([a], [b]) => categoryConfig[a].order - categoryConfig[b].order)

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      {/* Home */}
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(
          "mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors",
          pathname === "/"
            ? "bg-accent/10 text-accent"
            : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
        )}
      >
        Home
      </Link>

      {/* Category groups */}
      {categories.map(([category, items]) => (
        <div key={category} className="mt-6">
          <span className="text-muted-foreground mb-2 block px-3 font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
            {categoryConfig[category].label}
          </span>
          <div className="border-border ml-2 flex flex-col gap-0.5 border-l pl-2">
            {items.map((t) => {
              const href = `/transitions/${t.slug}`
              const isActive = pathname === href
              return (
                <Link
                  key={t.slug}
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-[12px] no-underline transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                  )}
                >
                  {t.name}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
