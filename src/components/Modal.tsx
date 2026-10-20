import { type ReactNode, useEffect, useId, useRef } from 'react'
import { hasNativeEnterAction, isPlainEnter } from '../utils/keyboard'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')).filter(el => el.getClientRects().length > 0)
    const primary = dialog.querySelector<HTMLButtonElement>('[data-modal-primary]:not(:disabled)')
    const initialFocus = primary ?? focusable()[0] ?? dialog
    initialFocus.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.isComposing || event.keyCode === 229) return
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
      } else if (isPlainEnter(event)) {
        if (event.repeat) { event.preventDefault(); return }
        if (event.defaultPrevented || hasNativeEnterAction(event.target)) return
        event.preventDefault()
        const confirm = dialog.querySelector<HTMLButtonElement>('[data-modal-primary]')
        if (confirm) { if (!confirm.disabled) confirm.click() }
        else onClose()
      } else if (event.key === 'Tab') {
        const controls = focusable()
        const first = controls[0], last = controls[controls.length - 1]
        if (!first) { event.preventDefault(); dialog.focus() }
        else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) { event.preventDefault(); first.focus() }
      }
    }
    dialog.addEventListener('keydown', handleKey)
    return () => {
      dialog.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-label={title ? undefined : '提示'} tabIndex={-1} className="relative bg-[var(--color-bg-secondary)] rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 id={titleId} className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
            <button aria-label="关闭弹窗" onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-white text-2xl leading-none cursor-pointer">&times;</button>
          </div>
        {children}
        <p className="keyboard-hint">Enter 确认当前按钮 · Esc 关闭</p>
      </div>
    </div>
  )
}
