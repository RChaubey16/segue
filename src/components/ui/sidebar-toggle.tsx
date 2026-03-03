"use client"

import { Menu, X } from "lucide-react"

export function SidebarToggle({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </button>
  )
}
