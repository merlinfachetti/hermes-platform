type BadgeStatus = string

interface BadgeStyle { bg: string; text: string; dot: string }

function getBadgeStyle(status: string, isDark: boolean): BadgeStyle {
  const d = isDark
  const map: Record<string, BadgeStyle> = {
    connected:    { bg: d ? '#0d2218' : '#f0fdf4', text: d ? '#22c55e' : '#16a34a', dot: '#22c55e' },
    operational:  { bg: d ? '#0d2218' : '#f0fdf4', text: d ? '#22c55e' : '#16a34a', dot: '#22c55e' },
    success:      { bg: d ? '#0d2218' : '#f0fdf4', text: d ? '#22c55e' : '#16a34a', dot: '#22c55e' },
    valid:        { bg: d ? '#0d2218' : '#f0fdf4', text: d ? '#22c55e' : '#16a34a', dot: '#22c55e' },
    degraded:     { bg: d ? '#2a1f08' : '#fefce8', text: d ? '#eab308' : '#ca8a04', dot: '#eab308' },
    warning:      { bg: d ? '#2a1f08' : '#fefce8', text: d ? '#eab308' : '#ca8a04', dot: '#eab308' },
    partial:      { bg: d ? '#2a1f08' : '#fefce8', text: d ? '#eab308' : '#ca8a04', dot: '#eab308' },
    refreshing:   { bg: d ? '#0d1a2e' : '#eff6ff', text: d ? '#3b82f6' : '#2563eb', dot: '#3b82f6' },
    running:      { bg: d ? '#0d1a2e' : '#eff6ff', text: d ? '#3b82f6' : '#2563eb', dot: '#3b82f6' },
    queued:       { bg: d ? '#1a1a2e' : '#faf5ff', text: d ? '#a855f7' : '#9333ea', dot: '#a855f7' },
    disconnected: { bg: d ? '#2a0d0d' : '#fef2f2', text: d ? '#ef4444' : '#dc2626', dot: '#ef4444' },
    failed:       { bg: d ? '#2a0d0d' : '#fef2f2', text: d ? '#ef4444' : '#dc2626', dot: '#ef4444' },
    critical:     { bg: d ? '#2a0d0d' : '#fef2f2', text: d ? '#ef4444' : '#dc2626', dot: '#ef4444' },
    error:        { bg: d ? '#2a0d0d' : '#fef2f2', text: d ? '#ef4444' : '#dc2626', dot: '#ef4444' },
    expired:      { bg: d ? '#2a0d0d' : '#fef2f2', text: d ? '#ef4444' : '#dc2626', dot: '#ef4444' },
    paused:       { bg: d ? '#1a1e26' : '#f8fafc', text: d ? '#94a3b8' : '#64748b', dot: '#94a3b8' },
    missing:      { bg: d ? '#1a1e26' : '#f8fafc', text: d ? '#94a3b8' : '#64748b', dot: '#94a3b8' },
    info:         { bg: d ? '#0d1a2e' : '#ecfeff', text: d ? '#06b6d4' : '#0891b2', dot: '#06b6d4' },
    outage:       { bg: d ? '#2a0d0d' : '#fef2f2', text: d ? '#ef4444' : '#dc2626', dot: '#ef4444' },
  }
  return map[status] ?? { bg: d ? '#1a1e26' : '#f8fafc', text: d ? '#94a3b8' : '#64748b', dot: '#94a3b8' }
}

interface StatusBadgeProps {
  status: BadgeStatus
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
  const s = getBadgeStyle(status, isDark)
  const px = size === 'sm' ? '6px' : '8px'
  const py = size === 'sm' ? '2px' : '3px'
  const fs = size === 'sm' ? '11px' : '12px'

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: `${py} ${px}`, borderRadius: '4px',
      backgroundColor: s.bg, color: s.text,
      fontSize: fs, fontWeight: '500', letterSpacing: '0.01em',
      whiteSpace: 'nowrap', transition: 'all 0.3s',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}
