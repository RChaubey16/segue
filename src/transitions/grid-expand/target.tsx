import { ReactNode } from "react"

const DEFAULT_TRANSITION_NAME = "grid-item"

interface GridExpandTargetProps {
  children: ReactNode
  className?: string
  transitionName?: string
}

export function GridExpandTarget({
  children,
  className,
  transitionName = DEFAULT_TRANSITION_NAME,
}: GridExpandTargetProps) {
  return (
    <div
      data-grid-expand-target={transitionName}
      className={className}
      style={{ viewTransitionName: transitionName, contain: "layout paint" }}
    >
      {children}
    </div>
  )
}
