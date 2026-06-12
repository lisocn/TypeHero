import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
  primary: 'bg-[var(--color-accent-blue)] hover:bg-blue-600 text-white',
  secondary: 'bg-[var(--color-bg-secondary)] hover:bg-slate-700 text-[var(--color-text-primary)] border border-slate-600',
  ghost: 'bg-transparent hover:bg-slate-800 text-[var(--color-text-secondary)]',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  )
}
