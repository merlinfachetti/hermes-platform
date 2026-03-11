export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Merlin Lab mark */}
        <div style={{
          width: '22px', height: '22px', borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
        }}>
          🧙🏼‍♀️
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
          Merlin Lab
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>·</span>
        <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
          Hermes Lab — Integration Control Plane
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>
          v0.1.0-alpha
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
          © {year} Merlin Lab. All rights reserved.
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
          MIT License
        </span>
      </div>
    </footer>
  )
}
