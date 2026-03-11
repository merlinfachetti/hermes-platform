import { useNavigate } from 'react-router-dom'
import { useConnectors, useProviders } from '../../services/queries'
import { Card } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState, EmptyState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { HealthBar } from '../../components/status/HealthBar'
import { formatRelative, formatNumber } from '../../lib/format'
import type { Connector, Provider } from '../../types'

function ConnectorRow({ connector, provider, onClick }: { connector: Connector; provider?: Provider; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 110px 110px 120px 140px 80px',
        alignItems: 'center',
        gap: '16px',
        padding: '14px 20px',
        borderBottom: '1px solid #1e2530',
        cursor: 'pointer',
        transition: 'background-color 0.1s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#13171f')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {/* Name + provider */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#e2e8f0', marginBottom: '2px' }}>
          {connector.name}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b' }}>
          {provider?.name ?? connector.providerId} · {connector.environment}
        </div>
      </div>

      {/* Status */}
      <StatusBadge status={connector.status} size="sm" />

      {/* Auth */}
      <StatusBadge status={connector.authStatus} size="sm" />

      {/* Health */}
      <div style={{ minWidth: '80px' }}>
        <HealthBar score={connector.healthScore} />
      </div>

      {/* Records */}
      <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
        {formatNumber(connector.recordsSynced)}
      </div>

      {/* Last sync */}
      <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'right' }}>
        {connector.lastSyncAt ? formatRelative(connector.lastSyncAt) : '—'}
      </div>
    </div>
  )
}

export default function ConnectorsPage() {
  const navigate = useNavigate()
  const { data: connectors, isLoading: loadingC, error: errorC, refetch } = useConnectors()
  const { data: providers, isLoading: loadingP } = useProviders()

  const isLoading = loadingC || loadingP

  if (isLoading) return (
    <div style={{ padding: '32px' }}>
      <Card padding="0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid #1e2530' }}>
            <Skeleton height="36px" />
          </div>
        ))}
      </Card>
    </div>
  )

  if (errorC) return (
    <div style={{ padding: '32px' }}>
      <ErrorState message="Failed to load connectors" onRetry={() => refetch()} />
    </div>
  )

  if (!connectors?.length) return (
    <div style={{ padding: '32px' }}>
      <EmptyState title="No connectors configured" description="Add a connector to start syncing data." />
    </div>
  )

  const providerMap = Object.fromEntries((providers ?? []).map((p) => [p.id, p]))

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      <Card padding="0">
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 110px 110px 120px 140px 80px',
          gap: '16px',
          padding: '10px 20px',
          borderBottom: '1px solid #252d3a',
          backgroundColor: '#0e1117',
          borderRadius: '8px 8px 0 0',
        }}>
          {['Connector', 'Status', 'Auth', 'Health', 'Records Synced', 'Last Sync'].map((h) => (
            <div key={h} style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {h}
            </div>
          ))}
        </div>

        {connectors.map((c) => (
          <ConnectorRow
            key={c.id}
            connector={c}
            provider={providerMap[c.providerId]}
            onClick={() => navigate(`/connectors/${c.id}`)}
          />
        ))}
      </Card>
    </div>
  )
}
