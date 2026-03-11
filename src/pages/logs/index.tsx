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
    <div style={{ padding: '32px' }}>
      <Card padding="0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid #1e2530' }}>
            <Skeleton height="40px" />
          </div>
        ))}
      </Card>
    </div>
  )

  if (error) return <div style={{ padding: '32px' }}><ErrorState onRetry={() => refetch()} /></div>

  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {SEVERITIES.map((s) => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '5px 12px', borderRadius: '5px', fontSize: '12px',
            fontWeight: '500', cursor: 'pointer', border: '1px solid',
            borderColor: filter === s ? '#3b82f6' : '#252d3a',
            backgroundColor: filter === s ? '#0d1a2e' : 'transparent',
            color: filter === s ? '#3b82f6' : '#94a3b8',
          }}>
            {s}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center' }}>
          {filtered?.length ?? 0} events
        </span>
      </div>

      <Card padding="0">
        {!filtered?.length ? <EmptyState title="No events match this filter" /> :
          filtered.map((log) => (
            <div
              key={log.id}
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid #1e2530',
                cursor: 'pointer',
                backgroundColor: expanded === log.id ? '#13171f' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (expanded !== log.id) e.currentTarget.style.backgroundColor = '#0e1117'
              }}
              onMouseLeave={(e) => {
                if (expanded !== log.id) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusBadge status={log.severity} size="sm" />
                <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                  {log.code}
                </span>
                <span style={{ fontSize: '13px', color: '#e2e8f0', flex: 1 }}>{log.message}</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {connectorMap[log.connectorId]?.name ?? log.connectorId}
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{formatDateTime(log.occurredAt)}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{expanded === log.id ? '▲' : '▼'}</span>
              </div>

              {expanded === log.id && (
                <div style={{
                  marginTop: '12px', padding: '12px', borderRadius: '6px',
                  backgroundColor: '#0a0b0d', border: '1px solid #1e2530',
                  fontSize: '12px', color: '#94a3b8', lineHeight: '1.6',
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
