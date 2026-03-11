import { useState } from 'react'
import { useLogs, useConnectors } from '../../services/queries'
import { Card } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState, EmptyState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { formatDateTime } from '../../lib/format'
import type { Severity } from '../../types'

const SEVERITIES: (Severity | 'all')[] = ['all', 'critical', 'error', 'warning', 'info']

export default function LogsPage() {
  const [filter, setFilter] = useState<Severity | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const { data: logs, isLoading, error, refetch } = useLogs()
  const { data: connectors } = useConnectors()
  const connectorMap = Object.fromEntries((connectors ?? []).map((c) => [c.id, c]))
  const filtered = filter === 'all' ? logs : logs?.filter((l) => l.severity === filter)

  if (isLoading) return (
    <div style={{ padding: '28px 32px' }}>
      <Card padding="0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <Skeleton height="40px" />
          </div>
        ))}
      </Card>
    </div>
  )

  if (error) return <div style={{ padding: '28px 32px' }}><ErrorState onRetry={() => refetch()} /></div>

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1100px' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {SEVERITIES.map((s) => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: '500',
            cursor: 'pointer', border: '1px solid',
            borderColor: filter === s ? 'var(--accent-blue)' : 'var(--border-default)',
            backgroundColor: filter === s ? 'var(--bg-elevated)' : 'transparent',
            color: filter === s ? 'var(--accent-blue)' : 'var(--text-muted)',
            transition: 'all 0.15s',
          }}>
            {s}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-faint)' }}>
          {filtered?.length ?? 0} events
        </span>
      </div>

      <Card padding="0">
        {!filtered?.length
          ? <EmptyState title="No events match this filter" />
          : filtered.map((log) => (
            <div
              key={log.id}
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              style={{
                padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                backgroundColor: expanded === log.id ? 'var(--bg-elevated)' : 'transparent',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (expanded !== log.id) e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
              }}
              onMouseLeave={(e) => {
                if (expanded !== log.id) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <StatusBadge status={log.severity} size="sm" />
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {log.code}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', flex: 1, transition: 'color 0.3s' }}>
                  {log.message}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {connectorMap[log.connectorId]?.name ?? log.connectorId}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                  {formatDateTime(log.occurredAt)}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
                  {expanded === log.id ? '▲' : '▼'}
                </span>
              </div>
              {expanded === log.id && (
                <div style={{
                  marginTop: '12px', padding: '12px', borderRadius: '6px',
                  backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-subtle)',
                  fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6',
                  transition: 'all 0.3s',
                }}>
                  {log.details}
                </div>
              )}
            </div>
          ))
        }
      </Card>
    </div>
  )
}
