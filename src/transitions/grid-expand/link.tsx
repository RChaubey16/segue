"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MouseEvent, ReactNode, useRef } from "react"
import "./transition.css"

const DEFAULT_TRANSITION_NAME = "grid-item"

interface GridExpandLinkProps {
  href: string
  children: ReactNode
  className?: string
  transitionName?: string
}

/**
 * Wait for a GridExpandTarget to appear in the DOM after navigation.
 * The View Transition API needs the target element present before it
 * captures the "new" state, but Next.js router.push() is async.
 */
function waitForTarget(name: string, timeout = 3000): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`[data-grid-expand-target="${name}"]`)) {
      resolve()
      return
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(`[data-grid-expand-target="${name}"]`)) {
        observer.disconnect()
        resolve()
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })

    setTimeout(() => {
      observer.disconnect()
      resolve()
    }, timeout)
  })
}

export function GridExpandLink({
  href,
  children,
  className,
  transitionName = DEFAULT_TRANSITION_NAME,
}: GridExpandLinkProps) {
  const router = useRouter()
  const ref = useRef<HTMLAnchorElement>(null)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return
    }

    const isExternal =
      href.toString().startsWith("http") || href.toString().startsWith("//")
    if (isExternal) return

    e.preventDefault()

    if (!(document as any).startViewTransition) {
      router.push(href)
      return
    }

    // Find the element marked with data-grid-expand to morph,
    // falling back to the link itself if none is found
    const el = ref.current
    const source =
      el?.querySelector<HTMLElement>("[data-grid-expand]") || el
    if (source) {
      source.style.viewTransitionName = transitionName
    }

    document.documentElement.classList.add("grid-expand")

    const transition = (document as any).startViewTransition(async () => {
      if (source) {
        source.style.viewTransitionName = ""
      }
      router.push(href)
      // Wait for the target element to appear in the new page DOM
      // before the View Transition API captures the new state
      await waitForTarget(transitionName)
    })

    transition.finished.finally(() => {
      if (source) {
        source.style.viewTransitionName = ""
      }
      document.documentElement.classList.remove("grid-expand")
    })
  }

  const prefetch = () => router.prefetch(href)

  return (
    <Link
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseEnter={prefetch}
      onTouchStart={prefetch}
      className={className}
    >
      {children}
    </Link>
  )
}
