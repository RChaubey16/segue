"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  transitionClass: string; // CSS class applied to <html> during transition
}

export function TransitionLink({
  href,
  children,
  className,
  transitionClass,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    // Tag the html element so CSS knows which animation to run
    document.documentElement.classList.add(transitionClass);

    document
      .startViewTransition(() => {
        router.push(href);
      })
      .finished.finally(() => {
        document.documentElement.classList.remove(transitionClass);
      });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
