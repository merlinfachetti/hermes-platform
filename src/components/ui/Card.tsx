import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  style?: CSSProperties
  padding?: string
}

export function Card({ children, style, padding = '20px' }: CardProps) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '8px',
      padding,
      transition: 'background-color 0.3s, border-color 0.3s',
      ...style,
    }}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', transition: 'color 0.3s' }}>{title}</div>
        {description && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', transition: 'color 0.3s' }}>{description}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
