"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useIsMounted()

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-muted-foreground hover:bg-accent/5 hover:text-foreground flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 transition-all dark:scale-100 dark:rotate-0" />
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  )
}
