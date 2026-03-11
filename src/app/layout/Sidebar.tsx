import { NavLink } from 'react-router-dom'

interface NavItem {
  path: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: '▦' },
  { path: '/connectors', label: 'Connectors', icon: '⬡' },
  { path: '/sync-jobs', label: 'Sync Jobs', icon: '↻' },
  { path: '/logs', label: 'Logs', icon: '⚑' },
  { path: '/docs', label: 'Docs', icon: '⊞' },
]

export function Sidebar() {
  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        backgroundColor: '#111318',
        borderRight: '1px solid #1e2530',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #1e2530',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
            }}
          >
            C
          </div>
          <div>
            <div
              style={{
                fontWeight: '600',
                fontSize: '14px',
                color: '#e2e8f0',
                letterSpacing: '-0.01em',
              }}
            >
              ConnectorHub
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Control Plane</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 8px', flex: 1 }}>
        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '500', padding: '4px 12px 8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Navigation
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: isActive ? '500' : '400',
              color: isActive ? '#e2e8f0' : '#94a3b8',
              backgroundColor: isActive ? '#1e222a' : 'transparent',
              marginBottom: '2px',
              transition: 'all 0.1s',
            })}
          >
            <span style={{ fontSize: '14px', opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #1e2530',
          fontSize: '11px',
          color: '#64748b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          All systems operational
        </div>
      </div>
    </aside>
  )
}
