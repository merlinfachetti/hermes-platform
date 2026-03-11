/**
 * API service layer — uses local fixtures with simulated async delay.
 * Works in all environments (dev, production, preview) without MSW.
 * To connect a real backend: replace each function body with a fetch() call.
 */

import type {
  Connector, SyncJob, ErrorLog, PayloadSample,
  RateLimitWindow, DashboardMetrics, Provider,
} from '../../types'

import {
  providers,
  connectors,
  syncJobs,
  errorLogs,
  payloadSamples,
  extraPayloadSamples,
  rateLimitWindows,
} from '../../mocks/fixtures'

const allPayloadSamples = [...payloadSamples, ...extraPayloadSamples]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function notFound(label: string): never {
  throw new Error(`Not found: ${label}`)
}

export const api = {
  getDashboard: async (): Promise<DashboardMetrics> => {
    await delay(300)
    const jobs = syncJobs
    const incidents = errorLogs.filter(
      (e) => e.severity === 'critical' || e.severity === 'error'
    )
    const finishedJobs = jobs.filter((j) => j.durationMs !== null)
    return {
      activeConnectors: connectors.filter((c) => c.status === 'connected').length,
      syncRunsLast24h: jobs.length,
      successRate: Math.round(
        (jobs.filter((j) => j.status === 'success').length / jobs.length) * 100
      ),
      failedRuns: jobs.filter((j) => j.status === 'failed').length,
      avgLatencyMs: Math.round(
        finishedJobs.reduce((acc, j) => acc + (j.durationMs ?? 0), 0) / finishedJobs.length
      ),
      recentIncidents: incidents,
    }
  },

  getProviders: async (): Promise<Provider[]> => {
    await delay(150)
    return providers
  },

  getConnectors: async (): Promise<Connector[]> => {
    await delay(250)
    return connectors
  },

  getConnector: async (id: string): Promise<Connector> => {
    await delay(200)
    return connectors.find((c) => c.id === id) ?? notFound(`connector:${id}`)
  },

  getSyncJobs: async (connectorId?: string): Promise<SyncJob[]> => {
    await delay(280)
    return connectorId
      ? syncJobs.filter((j) => j.connectorId === connectorId)
      : syncJobs
  },

  getLogs: async (connectorId?: string): Promise<ErrorLog[]> => {
    await delay(240)
    return connectorId
      ? errorLogs.filter((e) => e.connectorId === connectorId)
      : errorLogs
  },

  getPayloadSamples: async (connectorId?: string): Promise<PayloadSample[]> => {
    await delay(180)
    return connectorId
      ? allPayloadSamples.filter((p) => p.connectorId === connectorId)
      : allPayloadSamples
  },

  getRateLimit: async (connectorId: string): Promise<RateLimitWindow | null> => {
    await delay(150)
    return rateLimitWindows.find((r) => r.connectorId === connectorId) ?? null
  },
}
