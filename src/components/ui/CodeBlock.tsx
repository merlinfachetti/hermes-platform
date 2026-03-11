interface CodeBlockProps {
  content: string | object
  language?: string
  maxHeight?: string
}

export function CodeBlock({ content, language = 'json', maxHeight = '300px' }: CodeBlockProps) {
  const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2)

  return (
    <div style={{
      backgroundColor: '#0a0b0d',
      border: '1px solid #1e2530',
      borderRadius: '6px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px',
        backgroundColor: '#111318',
        borderBottom: '1px solid #1e2530',
      }}>
        <span style={{ fontSize: '11px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
          {language}
        </span>
      </div>
      <pre style={{
        margin: 0,
        padding: '14px',
        fontSize: '12px',
        lineHeight: '1.6',
        color: '#94a3b8',
        fontFamily: "'JetBrains Mono', monospace",
        overflowX: 'auto',
        overflowY: 'auto',
        maxHeight,
        whiteSpace: 'pre',
      }}>
        {text}
      </pre>
    </div>
  )
}
