import { useDashboard } from '../../services/queries'
import { Card, CardHeader } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { formatNumber, formatRelative, formatDuration } from '../../lib/format'

function KpiCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <Card>
      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: '600', color: accent ?? '#e2e8f0', lineHeight: 1, marginBottom: '6px' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '12px', color: '#64748b' }}>{sub}</div>}
    </Card>
  )
}

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard()

  if (isLoading) return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}><Skeleton height="60px" /></Card>
        ))}
      </div>
      <Card><Skeleton height="200px" /></Card>
    </div>
  )

  if (error) return (
    <div style={{ padding: '32px' }}>
      <ErrorState message="Failed to load dashboard metrics" onRetry={() => refetch()} />
    </div>
  )

  if (!data) return null

  const successColor = data.successRate >= 95 ? '#22c55e' : data.successRate >= 80 ? '#eab308' : '#ef4444'

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <KpiCard label="Active Connectors" value={data.activeConnectors} sub="of 5 configured" accent="#3b82f6" />
        <KpiCard label="Sync Runs / 24h" value={formatNumber(data.syncRunsLast24h)} sub="across all connectors" />
        <KpiCard label="Success Rate" value={`${data.successRate}%`} sub="last 24h" accent={successColor} />
        <KpiCard label="Failed Runs" value={data.failedRuns} sub="require attention" accent={data.failedRuns > 0 ? '#ef4444' : '#22c55e'} />
        <KpiCard label="Avg Latency" value={formatDuration(data.avgLatencyMs)} sub="per sync job" />
      </div>

      {/* Recent incidents */}
      <Card>
        <CardHeader title="Recent Incidents" description="Critical and error events in the last 24h" />
        {data.recentIncidents.length === 0 ? (
          <div style={{ padding: '32px 0', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
            No incidents — all systems operational
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {data.recentIncidents.map((incident) => (
              <div key={incident.id} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 180px',
                alignItems: 'center', gap: '16px',
                padding: '12px 0',
                borderBottom: '1px solid #1e2530',
              }}>
                <StatusBadge status={incident.severity} size="sm" />
                <div>
                  <div style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '2px' }}>{incident.message}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
                    {incident.code}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'right' }}>
                  {formatRelative(incident.occurredAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
