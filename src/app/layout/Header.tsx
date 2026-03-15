import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { Avatar } from '../../components/ui/Avatar'
import { useIsMobile } from '../../lib/useBreakpoint'
import { useSidebar } from './Sidebar'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/':            { title: 'Hermes Platform',  description: 'Integration Control Plane' },
  '/dashboard':   { title: 'Dashboard',        description: 'Platform health overview' },
  '/connectors':  { title: 'Connectors',       description: 'All integration instances' },
  '/sync-jobs':   { title: 'Sync Jobs',        description: 'Synchronization history' },
  '/logs':        { title: 'Logs',             description: 'Errors and events' },
  '/docs':        { title: 'Documentation',    description: 'Connector reference' },
}

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function Header() {
  const location = useLocation()
  const isMobile = useIsMobile()
  const { toggle } = useSidebar()
  const [time, setTime] = useState('')

  const isDetail = location.pathname.startsWith('/connectors/') && location.pathname !== '/connectors'
  const meta = isDetail
    ? { title: 'Connector Detail', description: 'Diagnostics' }
    : pageMeta[location.pathname] ?? { title: 'Hermes Platform', description: '' }

  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC' })
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
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 16px' : '0 24px',
      flexShrink: 0,
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        {/* Hamburger — mobile only */}
        {isMobile && (
          <button onClick={toggle} style={{
            width: '32px', height: '32px', borderRadius: '7px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-elevated)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
            flexShrink: 0, transition: 'all 0.15s',
          }}>
            <HamburgerIcon />
          </button>
        )}
        <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)', transition: 'color 0.3s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {meta.title}
        </span>
        {!isMobile && meta.description && (
          <>
            <span style={{ color: 'var(--border-default)', fontSize: '14px' }}>/</span>
            <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', transition: 'color 0.3s', whiteSpace: 'nowrap' }}>
              {meta.description}
            </span>
          </>
        )}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', flexShrink: 0 }}>
        {!isMobile && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.03em', transition: 'color 0.3s' }}>
                {time} UTC
              </span>
            </div>
            <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-subtle)' }} />
          </>
        )}
        <ThemeToggle />
        <Avatar size={28} />
      </div>
    </header>
  )
}
