import { TransitionLink } from "@/components/transition-link"
import "./transition.css"

interface SlideLeftLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SlideLeftLink({ href, children, className }: SlideLeftLinkProps) {
  return (
    <TransitionLink href={href} transitionClass="slide-left" className={className}>
      {children}
    </TransitionLink>
  )
}
