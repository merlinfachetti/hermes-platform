import { useDashboard, useConnectors } from '../../services/queries'
import { Card, CardHeader } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { formatNumber, formatRelative, formatDuration } from '../../lib/format'
import { useNavigate } from 'react-router-dom'

function KpiCard({
  label, value, sub, accentColor, trend,
}: {
  label: string
  value: string | number
  sub?: string
  accentColor?: string
  trend?: 'up' | 'down' | 'neutral'
}) {
  const trendColor = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#64748b'
  return (
    <Card>
      <div style={{
        fontSize: '10.5px', color: '#475569', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '30px', fontWeight: '600', letterSpacing: '-0.03em',
        color: accentColor ?? '#e2e8f0', lineHeight: 1, marginBottom: '8px',
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '11.5px', color: trendColor }}>
          {sub}
        </div>
      )}
    </Card>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data, isLoading, error, refetch } = useDashboard()
  const { data: connectors } = useConnectors()

  if (isLoading) return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {Array.from({ length: 5 }).map((_, i) => <Card key={i}><Skeleton height="70px" /></Card>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <Card><Skeleton height="200px" /></Card>
        <Card><Skeleton height="200px" /></Card>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ padding: '32px' }}>
      <ErrorState message="Failed to load dashboard metrics" onRetry={() => refetch()} />
    </div>
  )

  if (!data) return null

  const successColor = data.successRate >= 95 ? '#22c55e' : data.successRate >= 80 ? '#eab308' : '#ef4444'
  const degraded = connectors?.filter(c => c.status === 'degraded' || c.status === 'disconnected') ?? []

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1280px' }}>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <KpiCard
          label="Active Connectors"
          value={data.activeConnectors}
          sub={`of ${connectors?.length ?? '—'} configured`}
          accentColor="#3b82f6"
        />
        <KpiCard
          label="Sync Runs / 24h"
          value={formatNumber(data.syncRunsLast24h)}
          sub="across all connectors"
        />
        <KpiCard
          label="Success Rate"
          value={`${data.successRate}%`}
          sub="last 24 hours"
          accentColor={successColor}
          trend={data.successRate >= 95 ? 'up' : 'down'}
        />
        <KpiCard
          label="Failed Runs"
          value={data.failedRuns}
          sub={data.failedRuns > 0 ? 'require attention' : 'no failures'}
          accentColor={data.failedRuns > 0 ? '#ef4444' : '#22c55e'}
          trend={data.failedRuns > 0 ? 'down' : 'up'}
        />
        <KpiCard
          label="Avg Latency"
          value={formatDuration(data.avgLatencyMs)}
          sub="per sync job"
          accentColor="#06b6d4"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '14px' }}>

        {/* Incidents */}
        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2030' }}>
            <CardHeader
              title="Recent Incidents"
              description={`${data.recentIncidents.length} active event${data.recentIncidents.length !== 1 ? 's' : ''}`}
            />
          </div>
          {data.recentIncidents.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#334155', fontSize: '13px' }}>
              ✓ No incidents — all systems nominal
            </div>
          ) : (
            data.recentIncidents.map((incident, idx) => (
              <div key={incident.id} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr auto',
                alignItems: 'start', gap: '14px',
                padding: '14px 20px',
                borderBottom: idx < data.recentIncidents.length - 1 ? '1px solid #1a2030' : 'none',
              }}>
                <StatusBadge status={incident.severity} size="sm" />
                <div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '3px', lineHeight: '1.4' }}>
                    {incident.message}
                  </div>
                  <div style={{ fontSize: '11px', color: '#334155', fontFamily: 'JetBrains Mono, monospace' }}>
                    {incident.code}
                  </div>
                </div>
                <div style={{ fontSize: '11.5px', color: '#475569', whiteSpace: 'nowrap' }}>
                  {formatRelative(incident.occurredAt)}
                </div>
              </div>
            ))
          )}
        </Card>

        {/* Connector health summary */}
        <Card padding="0">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2030' }}>
            <CardHeader title="Connector Status" description="Quick health overview" />
          </div>
          {(connectors ?? []).map((c, idx) => (
            <div
              key={c.id}
              onClick={() => navigate(`/connectors/${c.id}`)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 20px',
                borderBottom: idx < (connectors?.length ?? 0) - 1 ? '1px solid #1a2030' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1520'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor:
                    c.status === 'connected' ? '#22c55e' :
                    c.status === 'degraded' ? '#eab308' :
                    c.status === 'disconnected' ? '#ef4444' : '#475569',
                }} />
                <span style={{
                  fontSize: '12.5px', color: '#94a3b8',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {c.name}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#334155', fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>
                {c.healthScore}
              </div>
            </div>
          ))}
        </Card>

      </div>

      {/* Alert banner if degraded connectors */}
      {degraded.length > 0 && (
        <div style={{
          marginTop: '14px', padding: '12px 16px',
          backgroundColor: '#1c1208', border: '1px solid #713f12',
          borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '13px' }}>⚠</span>
          <span style={{ fontSize: '12.5px', color: '#a16207' }}>
            {degraded.length} connector{degraded.length > 1 ? 's' : ''} need attention:{' '}
            {degraded.map(c => c.name).join(', ')}
          </span>
        </div>
      )}
    </div>
  )
}
