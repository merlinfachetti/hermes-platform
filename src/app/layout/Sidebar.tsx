import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../lib/theme'

// ── Icons ──────────────────────────────────────────────────────────────────
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

function IconHome() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1L1 6.5V14h4.5v-4h4v4H14V6.5L7.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Nav items ──────────────────────────────────────────────────────────────
const navItems = [
  { path: '/',           label: 'Home',        icon: <IconHome /> },
  { path: '/dashboard',  label: 'Dashboard',   icon: <IconDashboard /> },
  { path: '/connectors', label: 'Connectors',  icon: <IconConnectors /> },
  { path: '/sync-jobs',  label: 'Sync Jobs',   icon: <IconJobs /> },
  { path: '/logs',       label: 'Logs',        icon: <IconLogs /> },
  { path: '/docs',       label: 'Docs',        icon: <IconDocs /> },
]

// ── Logo ───────────────────────────────────────────────────────────────────
function HermesLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
        background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(37,99,235,0.35)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <div style={{
          fontWeight: '600', fontSize: '14px',
          color: 'var(--text-primary)', letterSpacing: '-0.02em',
          transition: 'color 0.3s',
        }}>
          Hermes Lab
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-faint)', marginTop: '1px', transition: 'color 0.3s' }}>
          by Merlin Lab
        </div>
      </div>
    </div>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────
export function Sidebar() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Stagger mount for nav animation
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <aside style={{
      width: '216px',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>

      {/* Logo */}
      <div style={{
        padding: '18px 16px 16px',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'border-color 0.3s',
      }}>
        <HermesLogo />
      </div>

      {/* Environment badge */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)', transition: 'border-color 0.3s' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '3px 8px', borderRadius: '4px',
          backgroundColor: theme === 'dark' ? '#0d2218' : '#f0fdf4',
          border: `1px solid ${theme === 'dark' ? '#14532d' : '#bbf7d0'}`,
          fontSize: '11px', color: 'var(--accent-green)', fontWeight: '500',
          transition: 'all 0.3s',
        }}>
          <span className="pulse-dot" style={{
            width: '5px', height: '5px', borderRadius: '50%',
            backgroundColor: 'var(--accent-green)', display: 'inline-block',
          }} />
          Production
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 8px', flex: 1 }}>
        <div style={{
          fontSize: '10px', color: 'var(--text-faint)', fontWeight: '600',
          padding: '4px 10px 8px', letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'color 0.3s',
        }}>
          Platform
        </div>

        {navItems.map((item, i) => (
          <div
            key={item.path}
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? `nav-item-in 0.35s ease forwards` : 'none',
              animationDelay: `${i * 55}ms`,
            }}
          >
            <NavLink
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '9px',
                padding: '7px 10px', borderRadius: '5px',
                textDecoration: 'none', fontSize: '13px',
                fontWeight: isActive ? '500' : '400',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                marginBottom: '2px',
                transition: 'all 0.15s ease',
                borderLeft: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                paddingLeft: isActive ? '8px' : '10px',
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                if (el.getAttribute('aria-current') !== 'page') {
                  el.style.color = 'var(--text-secondary)'
                  el.style.backgroundColor = 'var(--bg-elevated)'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                if (el.getAttribute('aria-current') !== 'page') {
                  el.style.color = 'var(--text-muted)'
                  el.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span style={{ opacity: 0.75, display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-subtle)',
        transition: 'border-color 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
          <span className="pulse-dot" style={{
            width: '5px', height: '5px', borderRadius: '50%',
            backgroundColor: 'var(--accent-green)', display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{ fontSize: '11px', color: 'var(--text-faint)', transition: 'color 0.3s' }}>
            All systems nominal
          </span>
        </div>
        <div style={{
          fontSize: '10px', color: 'var(--text-faint)',
          fontFamily: 'JetBrains Mono, monospace', transition: 'color 0.3s',
        }}>
          v0.1.0-alpha
        </div>
      </div>
    </aside>
  )
}
