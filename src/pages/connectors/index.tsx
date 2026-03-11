import { useNavigate } from 'react-router-dom'
import { useConnectors, useProviders } from '../../services/queries'
import { Card } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState, EmptyState } from '../../components/ui/States'
import { StatusBadge } from '../../components/status/StatusBadge'
import { HealthBar } from '../../components/status/HealthBar'
import { formatRelative, formatNumber } from '../../lib/format'
import type { Connector, Provider } from '../../types'

const COLS = '2fr 110px 110px 140px 150px 90px'
const HEADERS = ['Connector', 'Status', 'Auth', 'Health', 'Records Synced', 'Last Sync']

function ConnectorRow({ connector, provider, onClick }: {
  connector: Connector; provider?: Provider; onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid', gridTemplateColumns: COLS,
        alignItems: 'center', gap: '16px',
        padding: '13px 20px', borderBottom: '1px solid var(--border-subtle)',
        cursor: 'pointer', transition: 'background-color 0.12s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)' }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
    >
      <div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px', transition: 'color 0.3s' }}>
          {connector.name}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', transition: 'color 0.3s' }}>
          {provider?.name ?? connector.providerId} · {connector.environment}
        </div>
      </div>
      <StatusBadge status={connector.status} size="sm" />
      <StatusBadge status={connector.authStatus} size="sm" />
      <div style={{ minWidth: '80px' }}><HealthBar score={connector.healthScore} /></div>
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', transition: 'color 0.3s' }}>
        {formatNumber(connector.recordsSynced)}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right', transition: 'color 0.3s' }}>
        {connector.lastSyncAt ? formatRelative(connector.lastSyncAt) : '—'}
      </div>
    </div>
  )
}

export default function ConnectorsPage() {
  const navigate = useNavigate()
  const { data: connectors, isLoading: lC, error, refetch } = useConnectors()
  const { data: providers, isLoading: lP } = useProviders()

  if (lC || lP) return (
    <div style={{ padding: '32px' }}>
      <Card padding="0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <Skeleton height="36px" />
          </div>
        ))}
      </Card>
    </div>
  )

  if (error) return <div style={{ padding: '32px' }}><ErrorState onRetry={() => refetch()} /></div>
  if (!connectors?.length) return <div style={{ padding: '32px' }}><EmptyState title="No connectors configured" /></div>

  const providerMap = Object.fromEntries((providers ?? []).map((p) => [p.id, p]))

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1200px' }}>
      <Card padding="0">
        <div style={{
          display: 'grid', gridTemplateColumns: COLS, gap: '16px',
          padding: '10px 20px', borderBottom: '1px solid var(--border-default)',
          backgroundColor: 'var(--bg-elevated)', borderRadius: '8px 8px 0 0',
          transition: 'all 0.3s',
        }}>
          {HEADERS.map((h) => (
            <div key={h} style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {h}
            </div>
          ))}
        </div>
        {connectors.map((c) => (
          <ConnectorRow key={c.id} connector={c} provider={providerMap[c.providerId]} onClick={() => navigate(`/connectors/${c.id}`)} />
        ))}
      </Card>
    </div>
  )
}
