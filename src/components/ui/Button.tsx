import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  type = 'button',
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
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  )
}
