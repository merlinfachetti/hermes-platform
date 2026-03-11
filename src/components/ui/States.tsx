interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '28px', marginBottom: '12px', opacity: 0.3 }}>⊘</div>
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>{title}</div>
      {description && <div style={{ fontSize: '12px', color: '#64748b' }}>{description}</div>}
    </div>
  )
}

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = 'Failed to load data', onRetry }: ErrorStateProps) {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '28px', marginBottom: '12px', opacity: 0.4 }}>⚠</div>
      <div style={{ fontSize: '13px', fontWeight: '500', color: '#ef4444', marginBottom: '6px' }}>{message}</div>
      {onRetry && (
        <button onClick={onRetry} style={{
          marginTop: '12px', padding: '6px 14px',
          backgroundColor: '#1e222a', border: '1px solid #252d3a',
          borderRadius: '5px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer',
        }}>
          Retry
        </button>
      )}
    </div>
  )
}
