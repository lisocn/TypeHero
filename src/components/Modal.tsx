import { type ReactNode, useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[var(--color-bg-secondary)] rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
            <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-white text-2xl leading-none cursor-pointer">&times;</button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
