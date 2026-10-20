export default function KeyboardHint({ children }: { children: React.ReactNode }) {
  return <p className="keyboard-hint"><kbd>Enter ↵</kbd> {children}<span> · Tab 切换按钮</span></p>
}
