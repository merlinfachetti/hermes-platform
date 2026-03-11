import type {
  Connector, SyncJob, ErrorLog, PayloadSample,
  RateLimitWindow, DashboardMetrics, Provider,
} from '../../types'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export const api = {
  getDashboard: () => get<DashboardMetrics>('/dashboard'),
  getProviders: () => get<Provider[]>('/providers'),
  getConnectors: () => get<Connector[]>('/connectors'),
  getConnector: (id: string) => get<Connector>(`/connectors/${id}`),
  getSyncJobs: (connectorId?: string) =>
    get<SyncJob[]>(connectorId ? `/sync-jobs?connectorId=${connectorId}` : '/sync-jobs'),
  getLogs: (connectorId?: string) =>
    get<ErrorLog[]>(connectorId ? `/logs?connectorId=${connectorId}` : '/logs'),
  getPayloadSamples: (connectorId?: string) =>
    get<PayloadSample[]>(connectorId ? `/payload-samples?connectorId=${connectorId}` : '/payload-samples'),
  getRateLimit: (connectorId: string) =>
    get<RateLimitWindow>(`/rate-limits/${connectorId}`),
}
