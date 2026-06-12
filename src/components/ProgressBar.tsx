interface ProgressBarProps {
  value: number
  color?: string
}

export default function ProgressBar({ value, color = 'var(--color-accent-blue)' }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }}
      />
    </div>
  )
}
