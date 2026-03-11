import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { Avatar } from '../../components/ui/Avatar'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/':            { title: 'Hermes Platform',       description: 'Integration Control Plane' },
  '/dashboard':   { title: 'Dashboard',        description: 'Platform health and operational overview' },
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
    : pageMeta[location.pathname] ?? { title: 'Hermes Platform', description: '' }

  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'UTC',
      })
    )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header style={{
      height: '52px',
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)', transition: 'color 0.3s' }}>
          {meta.title}
        </span>
        {meta.description && (
          <>
            <span style={{ color: 'var(--border-default)', fontSize: '14px' }}>/</span>
            <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', transition: 'color 0.3s' }}>
              {meta.description}
            </span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* UTC clock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="pulse-dot" style={{
            width: '5px', height: '5px', borderRadius: '50%',
            backgroundColor: 'var(--accent-green)', display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px', color: 'var(--text-faint)',
            letterSpacing: '0.03em', transition: 'color 0.3s',
          }}>
            {time} UTC
          </span>
        </div>

        <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-subtle)' }} />

        <ThemeToggle />
        <Avatar size={28} />
      </div>
    </header>
  )
}
