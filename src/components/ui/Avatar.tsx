import avatarSrc from '../../assets/avatar.png'

interface AvatarProps {
  size?: number
}

export function Avatar({ size = 28 }: AvatarProps) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1.5px solid var(--border-default)',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
      }}
    >
      <img
        src={avatarSrc}
        alt="User avatar"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}
