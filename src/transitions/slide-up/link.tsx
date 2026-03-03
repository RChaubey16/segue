import { TransitionLink } from "@/components/transition-link"
import "./transition.css"

interface SlideUpLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SlideUpLink({ href, children, className }: SlideUpLinkProps) {
  return (
    <TransitionLink href={href} transitionClass="slide-up" className={className}>
      {children}
    </TransitionLink>
  )
}
