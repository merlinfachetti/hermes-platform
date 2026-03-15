import { useDashboard, useConnectors } from '../../services/queries'
import { Card, CardHeader } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { formatNumber, formatRelative, formatDuration } from '../../lib/format'
import { useNavigate } from 'react-router-dom'
import { useBreakpoint } from '../../lib/useBreakpoint'

function KpiCard({ label, value, sub, accentColor, trend }: {
  label: string; value: string | number; sub?: string; accentColor?: string; trend?: 'up' | 'down' | 'neutral'
}) {
  const trendColor = trend === 'up' ? 'var(--accent-green)' : trend === 'down' ? 'var(--accent-red)' : 'var(--text-muted)'
  return (
    <Card>
      <div style={{ fontSize: '10.5px', color: 'var(--text-faint)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px', transition: 'color 0.3s' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: '600', letterSpacing: '-0.03em', color: accentColor ?? 'var(--text-primary)', lineHeight: 1, marginBottom: '8px', transition: 'color 0.3s' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '11.5px', color: trendColor, transition: 'color 0.3s' }}>{sub}</div>}
    </Card>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const { data, isLoading, error, refetch } = useDashboard()
  const { data: connectors } = useConnectors()

  const kpiCols = isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'
  const mainCols = isMobile || isTablet ? '1fr' : '1fr 320px'
  const pad = isMobile ? '16px' : '28px 32px'

  if (isLoading) return (
    <div style={{ padding: pad }}>
      <div style={{ display: 'grid', gridTemplateColumns: kpiCols, gap: '12px', marginBottom: '16px' }}>
        {Array.from({ length: isMobile ? 4 : 5 }).map((_, i) => <Card key={i}><Skeleton height="70px" /></Card>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mainCols, gap: '12px' }}>
        <Card><Skeleton height="200px" /></Card>
        {!isMobile && <Card><Skeleton height="200px" /></Card>}
      </div>
    </div>
  )

  if (error) return <div style={{ padding: pad }}><ErrorState message="Failed to load dashboard metrics" onRetry={() => refetch()} /></div>
  if (!data) return null

  const successColor = data.successRate >= 95 ? 'var(--accent-green)' : data.successRate >= 80 ? 'var(--accent-yellow)' : 'var(--accent-red)'
  const degraded = connectors?.filter(c => c.status === 'degraded' || c.status === 'disconnected') ?? []

  return (
    <div style={{ padding: pad, maxWidth: '1280px' }}>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: kpiCols, gap: '12px', marginBottom: '16px' }}>
        <KpiCard label="Active Connectors" value={data.activeConnectors} sub={`of ${connectors?.length ?? '—'} configured`} accentColor="var(--accent-blue)" />
        <KpiCard label="Sync Runs / 24h" value={formatNumber(data.syncRunsLast24h)} sub="across all connectors" />
        <KpiCard label="Success Rate" value={`${data.successRate}%`} sub="last 24 hours" accentColor={successColor} trend={data.successRate >= 95 ? 'up' : 'down'} />
        {/* Hide last 2 on mobile to keep it clean — show as second row */}
        <KpiCard label="Failed Runs" value={data.failedRuns} sub={data.failedRuns > 0 ? 'require attention' : 'no failures'} accentColor={data.failedRuns > 0 ? 'var(--accent-red)' : 'var(--accent-green)'} trend={data.failedRuns > 0 ? 'down' : 'up'} />
        {!isMobile && <KpiCard label="Avg Latency" value={formatDuration(data.avgLatencyMs)} sub="per sync job" accentColor="var(--accent-cyan)" />}
      </div>

      {/* Mobile: latency as inline strip */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', marginBottom: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Avg Latency</span>
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-cyan)' }}>{formatDuration(data.avgLatencyMs)}</span>
        </div>
      )}

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: mainCols, gap: '12px' }}>

        {/* Incidents */}
        <Card padding="0">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <CardHeader title="Recent Incidents" description={`${data.recentIncidents.length} active event${data.recentIncidents.length !== 1 ? 's' : ''}`} />
          </div>
          {data.recentIncidents.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-faint)', fontSize: '13px' }}>✓ No incidents — all systems nominal</div>
          ) : (
            data.recentIncidents.map((incident, idx) => (
              <div key={incident.id} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '80px 1fr' : '90px 1fr auto',
                alignItems: 'start', gap: '12px',
                padding: isMobile ? '12px 14px' : '14px 16px',
                borderBottom: idx < data.recentIncidents.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <StatusBadge status={incident.severity} size="sm" />
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '3px', lineHeight: '1.4', transition: 'color 0.3s' }}>{incident.message}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>{incident.code}</div>
                  {isMobile && <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '4px' }}>{formatRelative(incident.occurredAt)}</div>}
                </div>
                {!isMobile && <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatRelative(incident.occurredAt)}</div>}
              </div>
            ))
          )}
        </Card>

        {/* Connector health — inline on mobile */}
        {isMobile ? (
          <Card padding="0">
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <CardHeader title="Connector Status" description="Quick health overview" />
            </div>
            {(connectors ?? []).map((c, idx) => (
              <div key={c.id} onClick={() => navigate(`/connectors/${c.id}`)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 16px',
                borderBottom: idx < (connectors?.length ?? 0) - 1 ? '1px solid var(--border-subtle)' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, backgroundColor: c.status === 'connected' ? 'var(--accent-green)' : c.status === 'degraded' ? 'var(--accent-yellow)' : c.status === 'disconnected' ? 'var(--accent-red)' : 'var(--text-faint)' }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>{c.name}</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>{c.healthScore}</span>
              </div>
            ))}
          </Card>
        ) : (
          <Card padding="0">
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <CardHeader title="Connector Status" description="Quick health overview" />
            </div>
            {(connectors ?? []).map((c, idx) => (
              <div key={c.id} onClick={() => navigate(`/connectors/${c.id}`)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 20px',
                borderBottom: idx < (connectors?.length ?? 0) - 1 ? '1px solid var(--border-subtle)' : 'none',
                cursor: 'pointer', transition: 'background-color 0.12s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, backgroundColor: c.status === 'connected' ? 'var(--accent-green)' : c.status === 'degraded' ? 'var(--accent-yellow)' : c.status === 'disconnected' ? 'var(--accent-red)' : 'var(--text-faint)' }} />
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>{c.name} — {c.environment}</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>{c.healthScore}</span>
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Alert banner */}
      {degraded.length > 0 && (
        <div style={{
          marginTop: '14px', padding: '11px 16px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderLeft: '3px solid var(--accent-yellow)',
          borderRadius: '6px',
          display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: '10px',
          transition: 'all 0.3s',
        }}>
          <span style={{ fontSize: '13px', flexShrink: 0, marginTop: isMobile ? '1px' : 0 }}>⚠</span>
          <span style={{ fontSize: '12.5px', lineHeight: '1.6' }}>
            <span style={{ fontWeight: '600', color: 'var(--accent-yellow)' }}>
              {degraded.length} connector{degraded.length > 1 ? 's' : ''} need attention:
            </span>{' '}
            <span style={{ color: 'var(--text-muted)' }}>{degraded.map(c => `${c.name} — ${c.environment}`).join(', ')}</span>
          </span>
        </div>
      )}
    </div>
  )
}
