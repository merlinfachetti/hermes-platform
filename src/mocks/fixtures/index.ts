import type { Provider, Connector, SyncJob, ErrorLog, PayloadSample, RateLimitWindow } from '../../types'

// ─── Providers ───────────────────────────────────────────────────────────────

export const providers: Provider[] = [
  { id: 'p_sf', name: 'Salesforce', category: 'crm', status: 'operational' },
  { id: 'p_hs', name: 'HubSpot', category: 'crm', status: 'operational' },
  { id: 'p_sl', name: 'Slack', category: 'messaging', status: 'degraded' },
  { id: 'p_no', name: 'Notion', category: 'productivity', status: 'operational' },
  { id: 'p_gd', name: 'Google Drive', category: 'storage', status: 'operational' },
]

// ─── Connectors ──────────────────────────────────────────────────────────────

export const connectors: Connector[] = [
  {
    id: 'c_001',
    providerId: 'p_sf',
    name: 'Salesforce CRM — Production',
    environment: 'production',
    status: 'connected',
    authStatus: 'valid',
    lastSyncAt: '2026-03-11T10:45:00Z',
    healthScore: 97,
    recordsSynced: 48230,
    createdAt: '2025-09-01T08:00:00Z',
  },
  {
    id: 'c_002',
    providerId: 'p_hs',
    name: 'HubSpot Marketing — Production',
    environment: 'production',
    status: 'degraded',
    authStatus: 'refreshing',
    lastSyncAt: '2026-03-11T09:12:00Z',
    healthScore: 61,
    recordsSynced: 12904,
    createdAt: '2025-10-14T08:00:00Z',
  },
  {
    id: 'c_003',
    providerId: 'p_sl',
    name: 'Slack Notifications — Production',
    environment: 'production',
    status: 'disconnected',
    authStatus: 'expired',
    lastSyncAt: '2026-03-10T18:30:00Z',
    healthScore: 0,
    recordsSynced: 3201,
    createdAt: '2025-11-03T08:00:00Z',
  },
  {
    id: 'c_004',
    providerId: 'p_no',
    name: 'Notion Docs — Staging',
    environment: 'staging',
    status: 'connected',
    authStatus: 'valid',
    lastSyncAt: '2026-03-11T11:00:00Z',
    healthScore: 100,
    recordsSynced: 891,
    createdAt: '2026-01-20T08:00:00Z',
  },
  {
    id: 'c_005',
    providerId: 'p_sf',
    name: 'Salesforce CRM — Staging',
    environment: 'staging',
    status: 'paused',
    authStatus: 'valid',
    lastSyncAt: '2026-03-09T14:00:00Z',
    healthScore: 82,
    recordsSynced: 5103,
    createdAt: '2025-12-01T08:00:00Z',
  },
]

// ─── Sync Jobs ────────────────────────────────────────────────────────────────

export const syncJobs: SyncJob[] = [
  {
    id: 'j_001',
    connectorId: 'c_001',
    status: 'success',
    startedAt: '2026-03-11T10:40:00Z',
    finishedAt: '2026-03-11T10:45:00Z',
    durationMs: 300000,
    recordsProcessed: 1240,
    retries: 0,
    triggerType: 'scheduled',
  },
  {
    id: 'j_002',
    connectorId: 'c_002',
    status: 'failed',
    startedAt: '2026-03-11T09:10:00Z',
    finishedAt: '2026-03-11T09:12:00Z',
    durationMs: 120000,
    recordsProcessed: 0,
    retries: 2,
    triggerType: 'scheduled',
  },
  {
    id: 'j_003',
    connectorId: 'c_001',
    status: 'success',
    startedAt: '2026-03-11T08:00:00Z',
    finishedAt: '2026-03-11T08:07:00Z',
    durationMs: 420000,
    recordsProcessed: 980,
    retries: 0,
    triggerType: 'scheduled',
  },
  {
    id: 'j_004',
    connectorId: 'c_004',
    status: 'running',
    startedAt: '2026-03-11T11:00:00Z',
    finishedAt: null,
    durationMs: null,
    recordsProcessed: 210,
    retries: 0,
    triggerType: 'manual',
  },
  {
    id: 'j_005',
    connectorId: 'c_003',
    status: 'failed',
    startedAt: '2026-03-10T18:28:00Z',
    finishedAt: '2026-03-10T18:30:00Z',
    durationMs: 120000,
    recordsProcessed: 0,
    retries: 3,
    triggerType: 'scheduled',
  },
  {
    id: 'j_006',
    connectorId: 'c_001',
    status: 'partial',
    startedAt: '2026-03-10T22:00:00Z',
    finishedAt: '2026-03-10T22:09:00Z',
    durationMs: 540000,
    recordsProcessed: 680,
    retries: 1,
    triggerType: 'retry',
  },
]

// ─── Error Logs ───────────────────────────────────────────────────────────────

export const errorLogs: ErrorLog[] = [
  {
    id: 'e_001',
    connectorId: 'c_002',
    code: 'AUTH_TOKEN_EXPIRED',
    severity: 'error',
    message: 'OAuth access token expired and refresh attempt failed.',
    details: 'Refresh token was rejected by HubSpot with HTTP 401. Re-authentication required.',
    occurredAt: '2026-03-11T09:12:00Z',
  },
  {
    id: 'e_002',
    connectorId: 'c_003',
    code: 'AUTH_MISSING',
    severity: 'critical',
    message: 'No valid credentials found for connector.',
    details: 'Slack token was revoked from the provider side. All sync operations are blocked.',
    occurredAt: '2026-03-10T18:30:00Z',
  },
  {
    id: 'e_003',
    connectorId: 'c_001',
    code: 'RATE_LIMIT_APPROACHED',
    severity: 'warning',
    message: 'API rate limit at 88% usage in current window.',
    details: 'Salesforce API: 880/1000 requests used in the last 15-minute window.',
    occurredAt: '2026-03-10T22:05:00Z',
  },
  {
    id: 'e_004',
    connectorId: 'c_002',
    code: 'PAYLOAD_PARSE_ERROR',
    severity: 'error',
    message: 'Unexpected response schema from HubSpot contacts endpoint.',
    details: 'Field "associatedCompanyId" missing in 14 out of 200 records. Records skipped.',
    occurredAt: '2026-03-11T07:33:00Z',
  },
  {
    id: 'e_005',
    connectorId: 'c_001',
    code: 'TIMEOUT',
    severity: 'warning',
    message: 'Sync job exceeded maximum timeout threshold.',
    details: 'Job j_006 exceeded 540s limit on the opportunity_updates object. Partial data written.',
    occurredAt: '2026-03-10T22:09:00Z',
  },
]

// ─── Payload Samples ──────────────────────────────────────────────────────────

export const payloadSamples: PayloadSample[] = [
  {
    id: 'ps_001',
    connectorId: 'c_001',
    direction: 'inbound',
    contentType: 'application/json',
    payload: {
      object: 'Contact',
      id: 'SF-00101',
      fields: {
        FirstName: 'Alex',
        LastName: 'Rivera',
        Email: 'a.rivera@acme.com',
        AccountId: 'SF-ACC-0042',
        LastModifiedDate: '2026-03-11T10:40:00Z',
      },
    },
    createdAt: '2026-03-11T10:45:00Z',
  },
  {
    id: 'ps_002',
    connectorId: 'c_002',
    direction: 'inbound',
    contentType: 'application/json',
    payload: {
      id: '12345',
      properties: {
        email: 'contact@example.com',
        firstname: 'Jordan',
        lastname: 'Kim',
        lifecyclestage: 'customer',
        hs_object_id: '12345',
      },
      createdAt: '2026-03-11T07:00:00Z',
    },
    createdAt: '2026-03-11T09:00:00Z',
  },
]

// ─── Rate Limit Windows ───────────────────────────────────────────────────────

export const rateLimitWindows: RateLimitWindow[] = [
  {
    connectorId: 'c_001',
    windowStart: '2026-03-11T10:30:00Z',
    windowEnd: '2026-03-11T10:45:00Z',
    used: 420,
    limit: 1000,
  },
  {
    connectorId: 'c_002',
    windowStart: '2026-03-11T09:00:00Z',
    windowEnd: '2026-03-11T09:15:00Z',
    used: 88,
    limit: 500,
  },
]
