import { useParams, useNavigate } from 'react-router-dom'
import { useConnector, useProviders, useSyncJobs, useLogs, usePayloadSamples, useRateLimit } from '../../services/queries'
import { Card, CardHeader } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState, EmptyState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { HealthBar } from '../../components/status/HealthBar'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { formatDateTime, formatRelative, formatDuration, formatNumber } from '../../lib/format'

export default function ConnectorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: connector, isLoading: loadC, error: errC } = useConnector(id!)
  const { data: providers } = useProviders()
  const { data: jobs, isLoading: loadJ } = useSyncJobs(id)
  const { data: logs, isLoading: loadL } = useLogs(id)
  const { data: samples } = usePayloadSamples(id)
  const { data: rateLimit } = useRateLimit(id!)

  if (loadC) return <div style={{ padding: '32px' }}><Skeleton height="400px" /></div>
  if (errC || !connector) return (
    <div style={{ padding: '32px' }}>
      <ErrorState message="Connector not found" onRetry={() => navigate('/connectors')} />
    </div>
  )

  const provider = providers?.find((p) => p.id === connector.providerId)
  const ratePct = rateLimit ? Math.round((rateLimit.used / rateLimit.limit) * 100) : null

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Back + title */}
      <div>
        <button onClick={() => navigate('/connectors')} style={{
          background: 'none', border: 'none', color: '#64748b', fontSize: '12px',
          cursor: 'pointer', padding: '0 0 12px', display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          ← Connectors
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#e2e8f0' }}>{connector.name}</h1>
          <StatusBadge status={connector.status} />
        </div>
        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
          {provider?.name ?? connector.providerId} · {connector.environment} · ID: {connector.id}
        </div>
      </div>

      {/* Overview row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <Card>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Auth Status</div>
          <StatusBadge status={connector.authStatus} />
        </Card>
        <Card>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Health Score</div>
          <HealthBar score={connector.healthScore} />
        </Card>
        <Card>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Records Synced</div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#e2e8f0' }}>{formatNumber(connector.recordsSynced)}</div>
        </Card>
        <Card>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Last Sync</div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            {connector.lastSyncAt ? formatRelative(connector.lastSyncAt) : '—'}
          </div>
        </Card>
      </div>

      {/* Rate limit */}
      {rateLimit && (
        <Card>
          <CardHeader title="Rate Limit" description={`Current window · ${ratePct}% used`} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '6px', backgroundColor: '#1e2530', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                width: `${ratePct}%`, height: '100%', borderRadius: '3px',
                backgroundColor: (ratePct ?? 0) > 80 ? '#ef4444' : (ratePct ?? 0) > 60 ? '#eab308' : '#22c55e',
              }} />
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
              {rateLimit.used} / {rateLimit.limit}
            </span>
          </div>
        </Card>
      )}

      {/* Sync jobs */}
      <Card padding="0">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e2530' }}>
          <CardHeader title="Recent Sync Jobs" description="Last runs for this connector" />
        </div>
        {loadJ ? <div style={{ padding: '20px' }}><Skeleton height="120px" /></div> :
         !jobs?.length ? <EmptyState title="No sync jobs" /> :
         jobs.map((job) => (
          <div key={job.id} style={{
            display: 'grid', gridTemplateColumns: '140px 90px 80px 100px 80px 1fr',
            gap: '16px', alignItems: 'center',
            padding: '12px 20px', borderBottom: '1px solid #1e2530',
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{job.id}</span>
            <StatusBadge status={job.status} size="sm" />
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{job.triggerType}</span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
              {job.durationMs ? formatDuration(job.durationMs) : '—'}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{job.recordsProcessed.toLocaleString()}</span>
            <span style={{ fontSize: '12px', color: '#64748b', textAlign: 'right' }}>
              {formatRelative(job.startedAt)}
            </span>
          </div>
        ))}
      </Card>

      {/* Errors */}
      <Card padding="0">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e2530' }}>
          <CardHeader title="Error Log" description="Recent failures and warnings" />
        </div>
        {loadL ? <div style={{ padding: '20px' }}><Skeleton height="80px" /></div> :
         !logs?.length ? <EmptyState title="No errors" description="This connector is running cleanly." /> :
         logs.map((log) => (
          <div key={log.id} style={{
            padding: '14px 20px', borderBottom: '1px solid #1e2530',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <StatusBadge status={log.severity} size="sm" />
              <span style={{ fontSize: '11px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{log.code}</span>
              <span style={{ fontSize: '11px', color: '#64748b', marginLeft: 'auto' }}>{formatDateTime(log.occurredAt)}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>{log.message}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{log.details}</div>
          </div>
        ))}
      </Card>

      {/* Payload samples */}
      {samples && samples.length > 0 && (
        <Card>
          <CardHeader title="Payload Sample" description={`${samples[0].direction} · ${samples[0].contentType}`} />
          <CodeBlock content={samples[0].payload} />
        </Card>
      )}
    </div>
  )
}
