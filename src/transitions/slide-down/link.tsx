import { TransitionLink } from "@/components/transition-link"
import "./transition.css"

interface SlideDownLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SlideDownLink({ href, children, className }: SlideDownLinkProps) {
  return (
    <TransitionLink href={href} transitionClass="slide-down" className={className}>
      {children}
    </TransitionLink>
  )
}
