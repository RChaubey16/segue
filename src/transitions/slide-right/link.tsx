import { TransitionLink } from "@/components/transition-link"
import "./transition.css"

interface SlideUpLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SlideRightLink({ href, children, className }: SlideUpLinkProps) {
  return (
    <TransitionLink href={href} transitionClass="slide-right" className={className}>
      {children}
    </TransitionLink>
  )
}
