import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  style?: CSSProperties
  padding?: string
}

export function Card({ children, style, padding = '20px' }: CardProps) {
  return (
    <div style={{
      backgroundColor: '#111318',
      border: '1px solid #1e2530',
      borderRadius: '8px',
      padding,
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
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{title}</div>
        {description && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{description}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
