import { useTheme } from '../../lib/theme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '34px',
        height: '34px',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-elevated)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s, border-color 0.2s',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
        e.currentTarget.style.borderColor = 'var(--border-default)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
      }}
    >
      {isDark ? (
        <span key="moon" className="animate-moon" style={{ fontSize: '16px', lineHeight: 1 }}>
          🌙
        </span>
      ) : (
        <span key="sun" className="animate-sun" style={{ fontSize: '16px', lineHeight: 1 }}>
          ☀️
        </span>
      )}
    </button>
  )
}
