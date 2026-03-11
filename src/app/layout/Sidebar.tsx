import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavItem {
  path: string
  label: string
  icon: React.ReactElement
}

function IconDashboard() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

function IconConnectors() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="3" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 7.5h3M8 7.5L10 3M8 7.5L10 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconJobs() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7.5 4v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconLogs() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2 3h11M2 6h8M2 9h10M2 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconDocs() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M3 1h6.5L12 3.5V14H3V1z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 6h5M5 8.5h5M5 11h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <IconDashboard /> },
  { path: '/connectors', label: 'Connectors', icon: <IconConnectors /> },
  { path: '/sync-jobs', label: 'Sync Jobs', icon: <IconJobs /> },
  { path: '/logs', label: 'Logs', icon: <IconLogs /> },
  { path: '/docs', label: 'Docs', icon: <IconDocs /> },
]

export function Sidebar() {
  return (
    <aside style={{
      width: '216px',
      minHeight: '100vh',
      backgroundColor: '#0d1017',
      borderRight: '1px solid #1a2030',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px 16px', borderBottom: '1px solid #1a2030' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
            background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M6.5 2l4.5 4.5L6.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '13.5px', color: '#e2e8f0', letterSpacing: '-0.02em' }}>
              ConnectorHub
            </div>
            <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '1px' }}>Control Plane</div>
          </div>
        </div>
      </div>

      {/* Environment badge */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1a2030' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '3px 8px', borderRadius: '4px',
          backgroundColor: '#0d2218', border: '1px solid #14532d',
          fontSize: '11px', color: '#22c55e', fontWeight: '500',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
          Production
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 8px', flex: 1 }}>
        <div style={{
          fontSize: '10px', color: '#334155', fontWeight: '600',
          padding: '4px 10px 8px', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Platform
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '7px 10px', borderRadius: '5px',
              textDecoration: 'none', fontSize: '13px',
              fontWeight: isActive ? '500' : '400',
              color: isActive ? '#e2e8f0' : '#64748b',
              backgroundColor: isActive ? '#161c27' : 'transparent',
              marginBottom: '1px', transition: 'all 0.1s',
            })}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              if (!el.classList.contains('active')) {
                el.style.color = '#94a3b8'
                el.style.backgroundColor = '#111827'
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              if (!el.classList.contains('active')) {
                el.style.color = '#64748b'
                el.style.backgroundColor = 'transparent'
              }
            }}
          >
            <span style={{ opacity: 0.75, display: 'flex' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #1a2030' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: '11px', color: '#475569' }}>All systems nominal</span>
        </div>
        <div style={{ fontSize: '10px', color: '#334155', fontFamily: 'JetBrains Mono, monospace' }}>
          v0.1.0-alpha
        </div>
      </div>
    </aside>
  )
}
