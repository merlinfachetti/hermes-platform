// ─── Provider ────────────────────────────────────────────────────────────────

export type ProviderCategory = 'crm' | 'messaging' | 'productivity' | 'storage' | 'analytics'

export interface Provider {
  id: string
  name: string
  category: ProviderCategory
  iconUrl?: string
  status: 'operational' | 'degraded' | 'outage'
}

// ─── Connector ───────────────────────────────────────────────────────────────

export type ConnectorStatus = 'connected' | 'degraded' | 'disconnected' | 'paused'
export type AuthStatus = 'valid' | 'expired' | 'missing' | 'refreshing'
export type Environment = 'production' | 'staging' | 'development'

export interface Connector {
  id: string
  providerId: string
  name: string
  environment: Environment
  status: ConnectorStatus
  authStatus: AuthStatus
  lastSyncAt: string | null
  healthScore: number // 0–100
  recordsSynced: number
  createdAt: string
}

// ─── SyncJob ─────────────────────────────────────────────────────────────────

export type JobStatus = 'running' | 'success' | 'failed' | 'partial' | 'queued'
export type TriggerType = 'scheduled' | 'manual' | 'webhook' | 'retry'

export interface SyncJob {
  id: string
  connectorId: string
  status: JobStatus
  startedAt: string
  finishedAt: string | null
  durationMs: number | null
  recordsProcessed: number
  retries: number
  triggerType: TriggerType
}

// ─── ErrorLog ────────────────────────────────────────────────────────────────

export type Severity = 'critical' | 'error' | 'warning' | 'info'

export interface ErrorLog {
  id: string
  connectorId: string
  code: string
  severity: Severity
  message: string
  details: string
  occurredAt: string
}

// ─── PayloadSample ───────────────────────────────────────────────────────────

export type PayloadDirection = 'inbound' | 'outbound'

export interface PayloadSample {
  id: string
  connectorId: string
  direction: PayloadDirection
  contentType: string
  payload: Record<string, unknown>
  createdAt: string
}

// ─── RateLimitWindow ─────────────────────────────────────────────────────────

export interface RateLimitWindow {
  connectorId: string
  windowStart: string
  windowEnd: string
  used: number
  limit: number
}

// ─── Dashboard Metrics ───────────────────────────────────────────────────────

export interface DashboardMetrics {
  activeConnectors: number
  syncRunsLast24h: number
  successRate: number
  failedRuns: number
  avgLatencyMs: number
  recentIncidents: ErrorLog[]
}
