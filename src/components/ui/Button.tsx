import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: ReactNode
  /** Força target=_blank. Se omitido, links externos abrem em nova aba. */
  external?: boolean
}

function isExternalHref(href: string): boolean {
  if (
    href.startsWith('#') ||
    href.startsWith('/') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return false
  }
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//')
  ) {
    try {
      const url = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
      if (typeof window === 'undefined') return true
      return url.origin !== window.location.origin
    } catch {
      return true
    }
  }
  return false
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  type = 'button',
  external,
  ...rest
}: ButtonProps) {
  const classes = [
    'bm-btn',
    `bm-btn--${variant}`,
    `bm-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const openBlank = external ?? isExternalHref(href)
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      className: classes,
      href,
    }
    if (openBlank) {
      anchorProps.target = '_blank'
      anchorProps.rel = 'noopener noreferrer'
    }
    return <a {...anchorProps}>{children}</a>
  }

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  )
}
