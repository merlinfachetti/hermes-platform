interface CodeBlockProps {
  content: string | object
  language?: string
  maxHeight?: string
}

export function CodeBlock({ content, language = 'json', maxHeight = '300px' }: CodeBlockProps) {
  const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2)
  return (
    <div style={{
      backgroundColor: 'var(--bg-base)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '6px',
      overflow: 'hidden',
      transition: 'all 0.3s',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 12px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all 0.3s',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'JetBrains Mono, monospace' }}>
          {language}
        </span>
      </div>
      <pre style={{
        margin: 0, padding: '14px', fontSize: '12px', lineHeight: '1.6',
        color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace',
        overflowX: 'auto', overflowY: 'auto', maxHeight, whiteSpace: 'pre',
        transition: 'color 0.3s',
      }}>
        {text}
      </pre>
    </div>
  )
}
