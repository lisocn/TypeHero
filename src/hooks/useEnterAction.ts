import { useEffect } from 'react'
import { hasNativeEnterAction, isPlainEnter } from '../utils/keyboard'

/** Page defaults only apply outside controls and dialogs; their native keys win. */
export function useEnterAction(action: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const handler = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !isPlainEnter(event)) return
      if (event.repeat) { event.preventDefault(); return }
      if (document.querySelector('[role="dialog"][aria-modal="true"]') || hasNativeEnterAction(event.target)) return
      event.preventDefault()
      action()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [action, enabled])
}
