import { useIsMobile } from '../../lib/useBreakpoint'

export function Footer() {
  const year = new Date().getFullYear()
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, transition: 'background-color 0.3s, border-color 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ fontSize: '16px' }}>🧙🏼‍♀️</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Alden Merlin</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>© {year}</span>
      </footer>
    )
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-surface)',
      padding: '12px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, transition: 'background-color 0.3s, border-color 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
          🧙🏼‍♀️
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Alden Merlin</span>
        <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>·</span>
        <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>Hermes Platform — Integration Control Plane</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>v0.1.0-alpha</span>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>© {year} Alden Merlin. All rights reserved.</span>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>MIT License</span>
      </div>
    </footer>
  )
}
