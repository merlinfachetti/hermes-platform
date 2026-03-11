interface HealthBarProps {
  score: number // 0–100
  showLabel?: boolean
}

export function HealthBar({ score, showLabel = true }: HealthBarProps) {
  const color = score >= 90 ? '#22c55e' : score >= 60 ? '#eab308' : score > 0 ? '#ef4444' : '#2e3848'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', backgroundColor: '#1e2530', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', backgroundColor: color, borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>
      {showLabel && (
        <span style={{ fontSize: '12px', color, fontWeight: '500', minWidth: '30px', textAlign: 'right' }}>
          {score}
        </span>
      )}
    </div>
  )
}
