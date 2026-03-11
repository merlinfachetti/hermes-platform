import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export const keys = {
  dashboard: ['dashboard'] as const,
  providers: ['providers'] as const,
  connectors: ['connectors'] as const,
  connector: (id: string) => ['connectors', id] as const,
  syncJobs: (connectorId?: string) => ['sync-jobs', connectorId ?? 'all'] as const,
  logs: (connectorId?: string) => ['logs', connectorId ?? 'all'] as const,
  payloadSamples: (connectorId?: string) => ['payload-samples', connectorId ?? 'all'] as const,
  rateLimit: (connectorId: string) => ['rate-limits', connectorId] as const,
}

export function useDashboard() {
  return useQuery({ queryKey: keys.dashboard, queryFn: api.getDashboard })
}

export function useProviders() {
  return useQuery({ queryKey: keys.providers, queryFn: api.getProviders })
}

export function useConnectors() {
  return useQuery({ queryKey: keys.connectors, queryFn: api.getConnectors })
}

export function useConnector(id: string) {
  return useQuery({ queryKey: keys.connector(id), queryFn: () => api.getConnector(id) })
}

export function useSyncJobs(connectorId?: string) {
  return useQuery({ queryKey: keys.syncJobs(connectorId), queryFn: () => api.getSyncJobs(connectorId) })
}

export function useLogs(connectorId?: string) {
  return useQuery({ queryKey: keys.logs(connectorId), queryFn: () => api.getLogs(connectorId) })
}

export function usePayloadSamples(connectorId?: string) {
  return useQuery({ queryKey: keys.payloadSamples(connectorId), queryFn: () => api.getPayloadSamples(connectorId) })
}

export function useRateLimit(connectorId: string) {
  return useQuery({
    queryKey: keys.rateLimit(connectorId),
    queryFn: () => api.getRateLimit(connectorId),
    enabled: !!connectorId,
  })
}
