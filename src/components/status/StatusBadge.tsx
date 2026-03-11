import type { ConnectorStatus, JobStatus, Severity, AuthStatus } from '../../types'

type BadgeVariant = ConnectorStatus | JobStatus | Severity | AuthStatus | 'operational' | 'degraded' | 'outage'

const styles: Record<string, { bg: string; text: string; dot: string }> = {
  connected:     { bg: '#0d2218', text: '#22c55e', dot: '#22c55e' },
  operational:   { bg: '#0d2218', text: '#22c55e', dot: '#22c55e' },
  success:       { bg: '#0d2218', text: '#22c55e', dot: '#22c55e' },
  valid:         { bg: '#0d2218', text: '#22c55e', dot: '#22c55e' },
  degraded:      { bg: '#2a1f08', text: '#eab308', dot: '#eab308' },
  warning:       { bg: '#2a1f08', text: '#eab308', dot: '#eab308' },
  partial:       { bg: '#2a1f08', text: '#eab308', dot: '#eab308' },
  refreshing:    { bg: '#0d1a2e', text: '#3b82f6', dot: '#3b82f6' },
  running:       { bg: '#0d1a2e', text: '#3b82f6', dot: '#3b82f6' },
  queued:        { bg: '#1a1a2e', text: '#a855f7', dot: '#a855f7' },
  disconnected:  { bg: '#2a0d0d', text: '#ef4444', dot: '#ef4444' },
  failed:        { bg: '#2a0d0d', text: '#ef4444', dot: '#ef4444' },
  critical:      { bg: '#2a0d0d', text: '#ef4444', dot: '#ef4444' },
  error:         { bg: '#2a0d0d', text: '#ef4444', dot: '#ef4444' },
  expired:       { bg: '#2a0d0d', text: '#ef4444', dot: '#ef4444' },
  paused:        { bg: '#1a1e26', text: '#94a3b8', dot: '#94a3b8' },
  missing:       { bg: '#1a1e26', text: '#94a3b8', dot: '#94a3b8' },
  info:          { bg: '#0d1a2e', text: '#06b6d4', dot: '#06b6d4' },
  outage:        { bg: '#2a0d0d', text: '#ef4444', dot: '#ef4444' },
}

const fallback = { bg: '#1a1e26', text: '#94a3b8', dot: '#94a3b8' }

interface StatusBadgeProps {
  status: BadgeVariant | string
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const s = styles[status] ?? fallback
  const px = size === 'sm' ? '6px' : '8px'
  const py = size === 'sm' ? '2px' : '3px'
  const fs = size === 'sm' ? '11px' : '12px'

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: `${py} ${px}`, borderRadius: '4px',
      backgroundColor: s.bg, color: s.text,
      fontSize: fs, fontWeight: '500', letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}
