import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/':            { title: 'Dashboard',        description: 'Platform health and operational overview' },
  '/connectors':  { title: 'Connectors',       description: 'All configured integration instances' },
  '/sync-jobs':   { title: 'Sync Jobs',        description: 'Synchronization run history' },
  '/logs':        { title: 'Logs',             description: 'Errors, warnings and operational events' },
  '/docs':        { title: 'Documentation',    description: 'Connector reference and runbooks' },
}

export function Header() {
  const location = useLocation()
  const [time, setTime] = useState('')

  const isDetail = location.pathname.startsWith('/connectors/') && location.pathname !== '/connectors'
  const meta = isDetail
    ? { title: 'Connector Detail', description: 'Integration status and diagnostics' }
    : pageMeta[location.pathname] ?? { title: 'ConnectorHub', description: '' }

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'UTC',
      }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header style={{
      height: '52px',
      borderBottom: '1px solid #1a2030',
      backgroundColor: '#0d1017',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: '600', fontSize: '13.5px', color: '#e2e8f0' }}>
          {meta.title}
        </span>
        {meta.description && (
          <>
            <span style={{ color: '#1e2a3a', fontSize: '14px' }}>/</span>
            <span style={{ fontSize: '12.5px', color: '#475569' }}>{meta.description}</span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Live clock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11.5px', color: '#475569', letterSpacing: '0.03em',
          }}>
            {time} UTC
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '16px', backgroundColor: '#1a2030' }} />

        {/* Avatar */}
        <div style={{
          width: '26px', height: '26px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #1d4ed8, #0891b2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: '600', color: 'white', cursor: 'pointer',
          userSelect: 'none',
        }}>
          E
        </div>
      </div>
    </header>
  )
}
