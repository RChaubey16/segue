import { TransitionLink } from "@/components/transition-link"
import "./transition.css"

interface FadeInLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function FadeInLink({ href, children, className }: FadeInLinkProps) {
  return (
    <TransitionLink href={href} transitionClass="fade-in" className={className}>
      {children}
    </TransitionLink>
  )
}
