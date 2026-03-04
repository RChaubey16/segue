import { ReactNode } from "react"

const DEFAULT_TRANSITION_NAME = "shared-element"

interface SharedTargetProps {
  children: ReactNode
  className?: string
  transitionName?: string
}

export function SharedTarget({
  children,
  className,
  transitionName = DEFAULT_TRANSITION_NAME,
}: SharedTargetProps) {
  return (
    <div
      data-shared-target={transitionName}
      className={className}
      style={{ viewTransitionName: transitionName }}
    >
      {children}
    </div>
  )
}
