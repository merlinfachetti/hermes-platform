import { http, HttpResponse, delay } from 'msw'
import {
  providers,
  connectors,
  syncJobs,
  errorLogs,
  payloadSamples,
  rateLimitWindows,
} from '../fixtures'
import type { DashboardMetrics } from '../../types'

const BASE = '/api'

export const handlers = [
  // ─── Dashboard ───────────────────────────────────────────────────────────
  http.get(`${BASE}/dashboard`, async () => {
    await delay(300)
    const metrics: DashboardMetrics = {
      activeConnectors: connectors.filter((c) => c.status === 'connected').length,
      syncRunsLast24h: syncJobs.length,
      successRate: Math.round(
        (syncJobs.filter((j) => j.status === 'success').length / syncJobs.length) * 100,
      ),
      failedRuns: syncJobs.filter((j) => j.status === 'failed').length,
      avgLatencyMs: Math.round(
        syncJobs
          .filter((j) => j.durationMs !== null)
          .reduce((acc, j) => acc + (j.durationMs ?? 0), 0) /
          syncJobs.filter((j) => j.durationMs !== null).length,
      ),
      recentIncidents: errorLogs.filter((e) => e.severity === 'critical' || e.severity === 'error'),
    }
    return HttpResponse.json(metrics)
  }),

  // ─── Providers ───────────────────────────────────────────────────────────
  http.get(`${BASE}/providers`, async () => {
    await delay(200)
    return HttpResponse.json(providers)
  }),

  // ─── Connectors ──────────────────────────────────────────────────────────
  http.get(`${BASE}/connectors`, async () => {
    await delay(250)
    return HttpResponse.json(connectors)
  }),

  http.get(`${BASE}/connectors/:id`, async ({ params }) => {
    await delay(200)
    const connector = connectors.find((c) => c.id === params.id)
    if (!connector) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(connector)
  }),

  // ─── Sync Jobs ────────────────────────────────────────────────────────────
  http.get(`${BASE}/sync-jobs`, async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const connectorId = url.searchParams.get('connectorId')
    const jobs = connectorId
      ? syncJobs.filter((j) => j.connectorId === connectorId)
      : syncJobs
    return HttpResponse.json(jobs)
  }),

  // ─── Error Logs ───────────────────────────────────────────────────────────
  http.get(`${BASE}/logs`, async ({ request }) => {
    await delay(250)
    const url = new URL(request.url)
    const connectorId = url.searchParams.get('connectorId')
    const logs = connectorId
      ? errorLogs.filter((e) => e.connectorId === connectorId)
      : errorLogs
    return HttpResponse.json(logs)
  }),

  // ─── Payload Samples ──────────────────────────────────────────────────────
  http.get(`${BASE}/payload-samples`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const connectorId = url.searchParams.get('connectorId')
    const samples = connectorId
      ? payloadSamples.filter((p) => p.connectorId === connectorId)
      : payloadSamples
    return HttpResponse.json(samples)
  }),

  // ─── Rate Limits ──────────────────────────────────────────────────────────
  http.get(`${BASE}/rate-limits/:connectorId`, async ({ params }) => {
    await delay(150)
    const window = rateLimitWindows.find((r) => r.connectorId === params.connectorId)
    if (!window) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(window)
  }),
]
