"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { SidebarToggle } from "@/components/ui/sidebar-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { TransitionMeta } from "@/lib/registry"
import Link from "next/link"
import { useState } from "react"

export function Sidebar({ transitions }: { transitions: TransitionMeta[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <SidebarToggle open={open} onToggle={() => setOpen(!open)} />

      {/* Backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`border-border bg-background fixed top-0 left-0 z-40 flex h-dvh w-60 flex-col border-r transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-border flex h-14 items-center border-b px-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-foreground font-serif text-lg font-bold no-underline"
          >
            Segue
          </Link>
        </div>

        {/* Navigation */}
        <SidebarNav transitions={transitions} onNavigate={() => setOpen(false)} />

        {/* Footer — theme toggle */}
        <div className="border-border border-t px-4 py-3">
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}
