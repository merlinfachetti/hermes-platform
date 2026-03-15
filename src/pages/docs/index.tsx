import { useState } from 'react'
import { Card, CardHeader } from '../../components/ui/Card'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { useIsMobile } from '../../lib/useBreakpoint'

// ── Section content ────────────────────────────────────────────────────────

function Overview() {
  return (
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8', transition: 'color 0.3s' }}>
      <p style={{ margin: '0 0 12px' }}>
        Hermes Platform manages authenticated connections to third-party SaaS providers.
        Each connector runs periodic sync jobs to pull or push data between your platform and the provider.
      </p>
      <p style={{ margin: 0 }}>
        Connectors are scoped to an environment (
        <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-cyan)' }}>production</code>,{' '}
        <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-cyan)' }}>staging</code>,{' '}
        <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-cyan)' }}>development</code>
        ) and maintain their own auth credentials and sync state.
      </p>
    </div>
  )
}

function AuthTable() {
  const rows = [
    ['valid',       'Token active and refreshed',        'None'],
    ['refreshing',  'Refresh in progress',               'Wait for completion'],
    ['expired',     'Refresh failed or token revoked',   'Re-authenticate via OAuth'],
    ['missing',     'No credentials stored',             'Complete OAuth flow'],
  ]
  return (
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8', transition: 'color 0.3s' }}>
      <p style={{ margin: '0 0 12px' }}>
        All connectors authenticate using OAuth 2.0. Tokens are stored encrypted and refreshed automatically before expiry.
      </p>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '400px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
              {['Status', 'Meaning', 'Action Required'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([status, meaning, action]) => (
              <tr key={status} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>
                  <code style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--accent-cyan)' }}>{status}</code>
                </td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{meaning}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RetryPolicy() {
  return (
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8', transition: 'color 0.3s' }}>
      <p style={{ margin: '0 0 16px' }}>Failed sync jobs are retried with exponential backoff:</p>
      <CodeBlock language="text" content={`Attempt 1 — immediate\nAttempt 2 — 30 seconds\nAttempt 3 — 2 minutes\nAttempt 4 — 10 minutes\nAttempt 5 — 1 hour (final)\n\nAfter 5 failures: connector moves to degraded status.\nManual re-trigger required after root cause resolution.`} />
    </div>
  )
}

function RateLimits() {
  const rows = [
    ['Salesforce', '1,000 req', '15 min',   'Pause and wait'],
    ['HubSpot',    '500 req',   '15 min',   'Pause and wait'],
    ['Slack',      '50 req',    '1 min',    'Throttle requests'],
    ['Notion',     '3 req/s',   'Rolling',  'Queue with delay'],
  ]
  return (
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8', transition: 'color 0.3s' }}>
      <p style={{ margin: '0 0 12px' }}>
        Each provider enforces its own API rate limits. Hermes Platform tracks usage per window
        and pauses syncs when approaching limits.
      </p>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '380px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
              {['Provider', 'Limit', 'Window', 'On Breach'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([provider, limit, window, action]) => (
              <tr key={provider} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px', color: 'var(--text-primary)', fontWeight: '500' }}>{provider}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--accent-cyan)' }}>{limit}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{window}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PayloadFormat() {
  return (
    <div>
      <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8', transition: 'color 0.3s' }}>
        All connector payloads follow a normalized envelope format. Provider-specific fields are nested under{' '}
        <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-cyan)' }}>fields</code>{' '}
        or{' '}
        <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-cyan)' }}>properties</code>.
      </p>
      <CodeBlock content={{
        object: 'Contact',
        id: 'SF-00101',
        fields: {
          FirstName: 'Alex',
          LastName: 'Rivera',
          Email: 'a.rivera@acme.com',
          AccountId: 'SF-ACC-0042',
          LastModifiedDate: '2026-03-11T10:40:00Z',
        },
      }} />
    </div>
  )
}

// ── Sections registry ──────────────────────────────────────────────────────
const sections = [
  { id: 'overview',     title: 'Overview',        content: <Overview /> },
  { id: 'auth',         title: 'Authentication',  content: <AuthTable /> },
  { id: 'retry',        title: 'Retry Policy',    content: <RetryPolicy /> },
  { id: 'rate-limits',  title: 'Rate Limits',     content: <RateLimits /> },
  { id: 'payload',      title: 'Payload Format',  content: <PayloadFormat /> },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const [active, setActive] = useState('overview')
  const isMobile = useIsMobile()
  const section = sections.find((s) => s.id === active)!

  const handleSelect = (id: string) => {
    setActive(id)
  }

  return (
    <div style={{ padding: isMobile ? '16px' : '32px', maxWidth: '1100px' }}>

      {/* Mobile: section picker as horizontal scroll tabs */}
      {isMobile ? (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'flex', gap: '6px',
            overflowX: 'auto', paddingBottom: '4px',
            WebkitOverflowScrolling: 'touch',
          }}>
            {sections.map((s) => (
              <button key={s.id} onClick={() => handleSelect(s.id)} style={{
                padding: '6px 14px', borderRadius: '5px', fontSize: '12px',
                fontWeight: active === s.id ? '600' : '400',
                color: active === s.id ? 'var(--accent-blue)' : 'var(--text-muted)',
                backgroundColor: active === s.id ? 'var(--bg-elevated)' : 'transparent',
                border: `1px solid ${active === s.id ? 'var(--accent-blue)' : 'var(--border-default)'}`,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {s.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Desktop: sidebar + content / Mobile: content only */}
      <div style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
      }}>

        {/* Desktop sidebar nav */}
        {!isMobile && (
          <div style={{ width: '160px', flexShrink: 0 }}>
            <div style={{
              fontSize: '10px', color: 'var(--text-faint)', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px',
              transition: 'color 0.3s',
            }}>
              Reference
            </div>
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '7px 10px', borderRadius: '5px', fontSize: '13px',
                fontWeight: active === s.id ? '500' : '400',
                color: active === s.id ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: active === s.id ? 'var(--bg-elevated)' : 'transparent',
                borderLeft: active === s.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
                paddingLeft: active === s.id ? '8px' : '10px',
                border: 'none', cursor: 'pointer', marginBottom: '2px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (active !== s.id) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-elevated)'
                }
              }}
              onMouseLeave={(e) => {
                if (active !== s.id) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                }
              }}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Card>
            <CardHeader title={section.title} />
            {section.content}
          </Card>
        </div>

      </div>
    </div>
  )
}
