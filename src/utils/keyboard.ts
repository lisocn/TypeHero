export function isPlainEnter(event: Pick<KeyboardEvent, 'key' | 'isComposing' | 'keyCode' | 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey'>): boolean {
  return event.key === 'Enter' && !event.isComposing && event.keyCode !== 229
    && !event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey
}

export function hasNativeEnterAction(target: EventTarget | null): boolean {
  return target instanceof Element && !!target.closest('button, a[href], input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="switch"]')
}
