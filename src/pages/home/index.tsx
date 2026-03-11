import { useNavigate } from 'react-router-dom'

// ── Feature card ───────────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: string
  title: string
  description: string
  path: string
  delay: number
}

function FeatureCard({ icon, title, description, path, delay }: FeatureCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(path)}
      className="animate-fade-up"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--accent-blue)'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 24px rgba(37,99,235,0.12)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-subtle)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: '22px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px', transition: 'color 0.3s' }}>
        {title}
      </div>
      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.6', transition: 'color 0.3s' }}>
        {description}
      </div>
      <div style={{
        marginTop: '14px', fontSize: '12px', color: 'var(--accent-blue)',
        display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500',
      }}>
        Open →
      </div>
    </div>
  )
}

// ── Status pill ────────────────────────────────────────────────────────────
function StatusPill({ label, status }: { label: string; status: 'ok' | 'warn' | 'off' }) {
  const colors = {
    ok:   { bg: 'var(--accent-green)', text: '#fff' },
    warn: { bg: 'var(--accent-yellow)', text: '#000' },
    off:  { bg: 'var(--text-faint)', text: '#fff' },
  }
  const c = colors[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '2px 8px', borderRadius: '99px',
      backgroundColor: c.bg, color: c.text,
      fontSize: '11px', fontWeight: '600',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: c.text, opacity: 0.8 }} />
      {label}
    </span>
  )
}

// ── Concept block ─────────────────────────────────────────────────────────
function ConceptBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{
      padding: '18px 20px',
      borderRadius: '8px',
      border: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-surface)',
      transition: 'all 0.3s',
    }}>
      <div style={{ fontSize: '11px', color: 'var(--text-faint)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
        {title}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-blue)', marginTop: '1px', flexShrink: 0 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Home page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={{
      padding: '40px 48px',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>

      {/* Hero */}
      <div className="animate-fade-up" style={{ animationDelay: '0ms', opacity: 0, animationFillMode: 'forwards', marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <StatusPill label="Live" status="ok" />
          <StatusPill label="v0.1.0-alpha" status="warn" />
          <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>by Merlin Lab</span>
        </div>

        <h1 style={{
          margin: '0 0 14px',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '600',
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          transition: 'color 0.3s',
        }}>
          Hermes Platform
          <span style={{ color: 'var(--accent-blue)' }}>.</span>
        </h1>

        <p style={{
          margin: '0 0 24px',
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          maxWidth: '560px',
          transition: 'color 0.3s',
        }}>
          An integration control plane for SaaS engineering teams. Monitor connector health,
          inspect sync jobs, investigate failures — all in one operational dashboard.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '9px 20px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #2563eb, #0891b2)',
              border: 'none', color: '#fff',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(37,99,235,0.35)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.9'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            Open Dashboard →
          </button>
          <button
            onClick={() => navigate('/docs')}
            style={{
              padding: '9px 20px', borderRadius: '7px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
              fontSize: '13px', fontWeight: '500', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--border-strong)'
              el.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--border-default)'
              el.style.color = 'var(--text-secondary)'
            }}
          >
            Read Docs
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', marginBottom: '32px' }} />

      {/* What is section */}
      <div className="animate-fade-up" style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards', marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', transition: 'color 0.3s' }}>
          What is Hermes Platform?
        </h2>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '620px', transition: 'color 0.3s' }}>
          Modern SaaS products depend on dozens of external integrations. When they break — and they do —
          you need visibility. Hermes Platform is the interface your team uses to know what's happening, why it failed,
          and how to fix it. No backend digging, no guessing.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <ConceptBlock
            title="The problem"
            items={[
              'OAuth tokens expire silently',
              'Sync jobs fail without clear cause',
              'Rate limits hit at peak times',
              'Payload schemas drift from providers',
            ]}
          />
          <ConceptBlock
            title="What Hermes solves"
            items={[
              'Unified health view across connectors',
              'Error logs with full technical detail',
              'Rate limit tracking per provider',
              'Payload inspection for debugging',
            ]}
          />
          <ConceptBlock
            title="Who it's for"
            items={[
              'Platform and integration engineers',
              'Solutions engineers and support',
              'Product teams needing data visibility',
              'Anyone who owns SaaS integrations',
            ]}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', marginBottom: '32px' }} />

      {/* Feature cards */}
      <div className="animate-fade-up" style={{ animationDelay: '150ms', opacity: 0, animationFillMode: 'forwards', marginBottom: '12px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', transition: 'color 0.3s' }}>
          Explore the platform
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '40px' }}>
        <FeatureCard
          icon="▦"
          title="Dashboard"
          description="Real-time KPIs — active connectors, sync success rate, failures and average latency across all integrations."
          path="/dashboard"
          delay={200}
        />
        <FeatureCard
          icon="⬡"
          title="Connectors"
          description="Browse all configured integrations. Inspect auth state, health score, last sync time and record volume."
          path="/connectors"
          delay={260}
        />
        <FeatureCard
          icon="↻"
          title="Sync Jobs"
          description="Full history of sync runs — status, trigger type, duration, retry count and records processed."
          path="/sync-jobs"
          delay={320}
        />
        <FeatureCard
          icon="⚑"
          title="Logs"
          description="Filterable error and warning stream. Click any event to expand the full technical detail of what failed."
          path="/logs"
          delay={380}
        />
        <FeatureCard
          icon="⊞"
          title="Docs"
          description="Internal reference: auth status table, retry policy, rate limits per provider, and payload format examples."
          path="/docs"
          delay={440}
        />
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '500ms',
            opacity: 0,
            animationFillMode: 'forwards',
            padding: '20px',
            borderRadius: '10px',
            border: `1px dashed var(--border-subtle)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '6px',
            minHeight: '130px',
          }}
        >
          <div style={{ fontSize: '18px', opacity: 0.3 }}>+</div>
          <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>More features coming in v2</div>
          <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>Real-time updates · Auth flows · Retry actions</div>
        </div>
      </div>

      {/* Tech stack note */}
      <div className="animate-fade-up" style={{
        animationDelay: '550ms', opacity: 0, animationFillMode: 'forwards',
        padding: '16px 20px', borderRadius: '8px',
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '12px',
        transition: 'all 0.3s',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Built with{' '}
          {['React 18', 'TypeScript', 'Vite', 'TanStack Query', 'React Router'].map((tech, i, arr) => (
            <span key={tech}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{tech}</span>
              {i < arr.length - 1 && <span style={{ color: 'var(--text-faint)' }}> · </span>}
            </span>
          ))}
        </div>
        <a
          href="https://github.com/merlinfachetti/hermes-platform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '12px', color: 'var(--accent-blue)', fontWeight: '500',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
          }}
        >
          View on GitHub →
        </a>
      </div>
    </div>
  )
}
