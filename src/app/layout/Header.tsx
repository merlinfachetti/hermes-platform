import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, { title: string; description: string }> = {
  '/': { title: 'Dashboard', description: 'Platform health overview' },
  '/connectors': { title: 'Connectors', description: 'Configured integration instances' },
  '/sync-jobs': { title: 'Sync Jobs', description: 'Recent and active synchronization runs' },
  '/logs': { title: 'Logs', description: 'Errors, warnings and operational events' },
  '/docs': { title: 'Docs', description: 'Connector reference and runbooks' },
}

export function Header() {
  const location = useLocation()
  const pathname = location.pathname

  // Match connector detail pages
  const isConnectorDetail = pathname.startsWith('/connectors/') && pathname !== '/connectors'
  const meta = isConnectorDetail
    ? { title: 'Connector Details', description: 'Integration status and diagnostics' }
    : pageTitles[pathname] ?? { title: 'ConnectorHub', description: '' }

  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })

  return (
    <header
      style={{
        height: '56px',
        borderBottom: '1px solid #1e2530',
        backgroundColor: '#111318',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
      }}
    >
      <div>
        <span style={{ fontWeight: '600', fontSize: '14px', color: '#e2e8f0' }}>
          {meta.title}
        </span>
        {meta.description && (
          <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '10px' }}>
            {meta.description}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          UTC {timeStr}
        </span>

        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#1e222a',
            border: '1px solid #252d3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          E
        </div>
      </div>
    </header>
  )
}
