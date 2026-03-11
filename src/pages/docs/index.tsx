import { useState } from 'react'
import { Card, CardHeader } from '../../components/ui/Card'
import { CodeBlock } from '../../components/ui/CodeBlock'

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.8' }}>
        <p style={{ margin: '0 0 12px' }}>
          Hermes Lab manages authenticated connections to third-party SaaS providers.
          Each connector runs periodic sync jobs to pull or push data between your platform and the provider.
        </p>
        <p style={{ margin: 0 }}>
          Connectors are scoped to an environment (<code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>production</code>, <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>staging</code>, <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>development</code>) and maintain their own auth credentials and sync state.
        </p>
      </div>
    ),
  },
  {
    id: 'auth',
    title: 'Authentication',
    content: (
      <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.8' }}>
        <p style={{ margin: '0 0 12px' }}>
          All connectors authenticate using OAuth 2.0. Tokens are stored encrypted and refreshed automatically before expiry.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2530' }}>
              {['Status', 'Meaning', 'Action Required'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['valid', 'Token active and refreshed', 'None'],
              ['refreshing', 'Refresh in progress', 'Wait for completion'],
              ['expired', 'Refresh failed or token revoked', 'Re-authenticate via OAuth'],
              ['missing', 'No credentials stored', 'Complete OAuth flow'],
            ].map(([status, meaning, action]) => (
              <tr key={status} style={{ borderBottom: '1px solid #1e2530' }}>
                <td style={{ padding: '8px 12px' }}>
                  <code style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{status}</code>
                </td>
                <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{meaning}</td>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'retry',
    title: 'Retry Policy',
    content: (
      <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.8' }}>
        <p style={{ margin: '0 0 16px' }}>Failed sync jobs are retried with exponential backoff:</p>
        <CodeBlock language="text" content={`Attempt 1 — immediate
Attempt 2 — 30 seconds
Attempt 3 — 2 minutes
Attempt 4 — 10 minutes
Attempt 5 — 1 hour (final)

After 5 failures: connector moves to degraded status.
Manual re-trigger required after root cause resolution.`} />
      </div>
    ),
  },
  {
    id: 'rate-limits',
    title: 'Rate Limits',
    content: (
      <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.8' }}>
        <p style={{ margin: '0 0 12px' }}>Each provider enforces its own API rate limits. Hermes Lab tracks usage per window and pauses syncs when approaching limits.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2530' }}>
              {['Provider', 'Limit', 'Window', 'On Breach'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748b', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Salesforce', '1,000 req', '15 min', 'Pause and wait'],
              ['HubSpot', '500 req', '15 min', 'Pause and wait'],
              ['Slack', '50 req', '1 min', 'Throttle requests'],
              ['Notion', '3 req/s', 'Rolling', 'Queue with delay'],
            ].map(([provider, limit, window, action]) => (
              <tr key={provider} style={{ borderBottom: '1px solid #1e2530' }}>
                <td style={{ padding: '8px 12px', color: '#e2e8f0' }}>{provider}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{limit}</td>
                <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{window}</td>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'payload',
    title: 'Payload Format',
    content: (
      <div>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8', lineHeight: '1.8' }}>
          All connector payloads follow a normalized envelope format. Provider-specific fields are nested under <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>fields</code> or <code style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>properties</code>.
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
    ),
  },
]

export default function DocsPage() {
  const [active, setActive] = useState('overview')
  const section = sections.find((s) => s.id === active)!

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', display: 'flex', gap: '24px' }}>
      {/* Sidebar nav */}
      <div style={{ width: '180px', flexShrink: 0 }}>
        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
          Reference
        </div>
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '7px 10px', borderRadius: '5px', fontSize: '13px',
            fontWeight: active === s.id ? '500' : '400',
            color: active === s.id ? '#e2e8f0' : '#94a3b8',
            backgroundColor: active === s.id ? '#1e222a' : 'transparent',
            border: 'none', cursor: 'pointer', marginBottom: '2px',
          }}>
            {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <Card>
          <CardHeader title={section.title} />
          {section.content}
        </Card>
      </div>
    </div>
  )
}
