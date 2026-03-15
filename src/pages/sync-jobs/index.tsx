import { useSyncJobs, useConnectors } from '../../services/queries'
import { Card } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState, EmptyState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { formatDuration, formatRelative } from '../../lib/format'
import { useIsMobile } from '../../lib/useBreakpoint'

const COLS = '120px 2fr 90px 90px 90px 80px 1fr'
const HEADERS = ['Job ID', 'Connector', 'Status', 'Trigger', 'Duration', 'Records', 'Started']

export default function SyncJobsPage() {
  const isMobile = useIsMobile()
  const { data: jobs, isLoading, error, refetch } = useSyncJobs()
  const { data: connectors } = useConnectors()
  const connectorMap = Object.fromEntries((connectors ?? []).map((c) => [c.id, c]))
  const pad = isMobile ? '16px' : '28px 32px'

  if (isLoading) return (
    <div style={{ padding: pad }}>
      <Card padding="0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}><Skeleton height="32px" /></div>
        ))}
      </Card>
    </div>
  )

  if (error) return <div style={{ padding: pad }}><ErrorState onRetry={() => refetch()} /></div>
  if (!jobs?.length) return <div style={{ padding: pad }}><EmptyState title="No sync jobs found" /></div>

  return (
    <div style={{ padding: pad, maxWidth: '1200px' }}>
      <Card padding="0">
        {isMobile ? (
          // Mobile: card-per-job
          jobs.map((job) => (
            <div key={job.id} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {connectorMap[job.connectorId]?.name ?? job.connectorId}
                </span>
                <StatusBadge status={job.status} size="sm" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  ['Trigger', job.triggerType],
                  ['Duration', job.durationMs ? formatDuration(job.durationMs) : '—'],
                  ['Records', job.recordsProcessed.toLocaleString()],
                  ['Started', formatRelative(job.startedAt)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{k}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>{job.id}</span>
              </div>
            </div>
          ))
        ) : (
          // Desktop: table
          <>
            <div style={{
              display: 'grid', gridTemplateColumns: COLS, gap: '16px',
              padding: '10px 20px', borderBottom: '1px solid var(--border-default)',
              backgroundColor: 'var(--bg-elevated)', borderRadius: '8px 8px 0 0', transition: 'all 0.3s',
            }}>
              {HEADERS.map((h) => (
                <div key={h} style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
              ))}
            </div>
            {jobs.map((job) => (
              <div key={job.id} style={{
                display: 'grid', gridTemplateColumns: COLS, gap: '16px',
                alignItems: 'center', padding: '12px 20px',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>{job.id}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', transition: 'color 0.3s' }}>{connectorMap[job.connectorId]?.name ?? job.connectorId}</span>
                <StatusBadge status={job.status} size="sm" />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{job.triggerType}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>{job.durationMs ? formatDuration(job.durationMs) : '—'}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>{job.recordsProcessed.toLocaleString()}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatRelative(job.startedAt)}</span>
              </div>
            ))}
          </>
        )}
      </Card>
    </div>
  )
}
