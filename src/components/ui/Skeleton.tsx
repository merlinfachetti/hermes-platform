interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
}

export function Skeleton({ width = '100%', height = '16px', borderRadius = '4px' }: SkeletonProps) {
  return (
    <div style={{
      width, height, borderRadius,
      backgroundColor: 'var(--bg-elevated)',
      backgroundImage: 'linear-gradient(90deg, var(--bg-elevated) 0%, var(--bg-hover) 50%, var(--bg-elevated) 100%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.5s infinite',
    }} />
  )
}
