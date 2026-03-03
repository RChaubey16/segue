"use client"

import type { TransitionMeta } from "@/lib/registry"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SidebarNav({
  transitions,
  onNavigate,
}: {
  transitions: TransitionMeta[]
  onNavigate?: () => void
}) {
  const pathname = usePathname()

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

      {/* Transitions group */}
      <div className="mt-6">
        <Link
          href="/transitions"
          onClick={onNavigate}
          className={cn(
            "mb-2 flex items-center rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors",
            pathname === "/transitions"
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
          )}
        >
          Transitions
        </Link>
        <div className="border-border ml-2 flex flex-col gap-0.5 border-l pl-2">
          {transitions.map((t) => {
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
    </nav>
  )
}
