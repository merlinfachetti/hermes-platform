interface HealthBarProps {
  score: number
  showLabel?: boolean
}

export function HealthBar({ score, showLabel = true }: HealthBarProps) {
  const color = score >= 90 ? 'var(--accent-green)' : score >= 60 ? 'var(--accent-yellow)' : score > 0 ? 'var(--accent-red)' : 'var(--border-subtle)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', backgroundColor: color, borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>
      {showLabel && (
        <span style={{ fontSize: '12px', color, fontWeight: '500', minWidth: '30px', textAlign: 'right', transition: 'color 0.3s' }}>
          {score}
        </span>
      )}
    </div>
  )
}
