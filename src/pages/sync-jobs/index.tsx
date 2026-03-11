import { useSyncJobs, useConnectors } from '../../services/queries'
import { Card } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState, EmptyState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { formatDuration, formatRelative } from '../../lib/format'

export default function SyncJobsPage() {
  const { data: jobs, isLoading: loadJ, error, refetch } = useSyncJobs()
  const { data: connectors } = useConnectors()

  const connectorMap = Object.fromEntries((connectors ?? []).map((c) => [c.id, c]))

  if (loadJ) return (
    <div style={{ padding: '32px' }}>
      <Card padding="0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid #1e2530' }}>
            <Skeleton height="28px" />
          </div>
        ))}
      </Card>
    </div>
  )

  if (error) return <div style={{ padding: '32px' }}><ErrorState onRetry={() => refetch()} /></div>
  if (!jobs?.length) return <div style={{ padding: '32px' }}><EmptyState title="No sync jobs found" /></div>

  const cols = '120px 2fr 90px 80px 90px 80px 1fr'

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      <Card padding="0">
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: cols, gap: '16px',
          padding: '10px 20px', borderBottom: '1px solid #252d3a',
          backgroundColor: '#0e1117', borderRadius: '8px 8px 0 0',
        }}>
          {['Job ID', 'Connector', 'Status', 'Trigger', 'Duration', 'Records', 'Started'].map((h) => (
            <div key={h} style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {h}
            </div>
          ))}
        </div>

        {jobs.map((job) => (
          <div key={job.id} style={{
            display: 'grid', gridTemplateColumns: cols, gap: '16px',
            alignItems: 'center', padding: '13px 20px',
            borderBottom: '1px solid #1e2530',
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{job.id}</span>
            <div>
              <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
                {connectorMap[job.connectorId]?.name ?? job.connectorId}
              </div>
            </div>
            <StatusBadge status={job.status} size="sm" />
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{job.triggerType}</span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
              {job.durationMs ? formatDuration(job.durationMs) : '—'}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
              {job.recordsProcessed.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{formatRelative(job.startedAt)}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
