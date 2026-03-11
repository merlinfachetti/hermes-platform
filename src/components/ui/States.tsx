interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '28px', marginBottom: '12px', opacity: 0.2 }}>⊘</div>
      <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', transition: 'color 0.3s' }}>{title}</div>
      {description && <div style={{ fontSize: '12px', color: 'var(--text-muted)', transition: 'color 0.3s' }}>{description}</div>}
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
      <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--accent-red)', marginBottom: '6px' }}>{message}</div>
      {onRetry && (
        <button onClick={onRetry} style={{
          marginTop: '12px', padding: '6px 14px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: '5px', color: 'var(--text-secondary)',
          fontSize: '12px', cursor: 'pointer',
          transition: 'all 0.2s',
        }}>
          Retry
        </button>
      )}
    </div>
  )
}
