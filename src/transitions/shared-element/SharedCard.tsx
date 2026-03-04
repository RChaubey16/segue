"use client"

import { useRouter } from "next/navigation"
import { MouseEvent, ReactNode, useRef } from "react"
import "./transition.css"

const DEFAULT_TRANSITION_NAME = "shared-element"

interface SharedCardProps {
  href: string
  children: ReactNode
  className?: string
  transitionName?: string
}

function waitForTarget(name: string, timeout = 3000): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`[data-shared-target="${name}"]`)) {
      resolve()
      return
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(`[data-shared-target="${name}"]`)) {
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

export function SharedCard({
  href,
  children,
  className,
  transitionName = DEFAULT_TRANSITION_NAME,
}: SharedCardProps) {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!document.startViewTransition) {
      router.push(href)
      return
    }

    const el = ref.current
    if (el) {
      el.style.viewTransitionName = transitionName
    }

    const transition = document.startViewTransition(async () => {
      if (el) {
        el.style.viewTransitionName = ""
      }
      router.push(href)
      await waitForTarget(transitionName)
    })

    transition.finished.finally(() => {
      if (el) {
        el.style.viewTransitionName = ""
      }
    })
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={className}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  )
}
