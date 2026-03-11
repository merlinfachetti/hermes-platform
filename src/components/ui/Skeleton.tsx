interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
}

export function Skeleton({ width = '100%', height = '16px', borderRadius = '4px' }: SkeletonProps) {
  return (
    <div style={{
      width, height, borderRadius,
      backgroundColor: '#1e222a',
      backgroundImage: 'linear-gradient(90deg, #1e222a 0%, #252b35 50%, #1e222a 100%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.5s infinite',
    }} />
  )
}

// Inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('skeleton-style')) {
  const style = document.createElement('style')
  style.id = 'skeleton-style'
  style.textContent = `@keyframes skeleton-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`
  document.head.appendChild(style)
}
