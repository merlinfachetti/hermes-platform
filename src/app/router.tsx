import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'

// Page placeholders — will be replaced in Phase 4
const PlaceholderPage = ({ name }: { name: string }) => (
  <div
    style={{
      padding: '32px',
      color: '#64748b',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '13px',
    }}
  >
    <div style={{ color: '#3b82f6', marginBottom: '8px' }}>// {name}</div>
    <div>Phase 4 — Feature implementation pending</div>
  </div>
)

const DashboardPage = () => <PlaceholderPage name="dashboard/index.tsx" />
const ConnectorsPage = () => <PlaceholderPage name="connectors/index.tsx" />
const ConnectorDetailPage = () => <PlaceholderPage name="connector-details/[id].tsx" />
const SyncJobsPage = () => <PlaceholderPage name="sync-jobs/index.tsx" />
const LogsPage = () => <PlaceholderPage name="logs/index.tsx" />
const DocsPage = () => <PlaceholderPage name="docs/index.tsx" />

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'connectors', element: <ConnectorsPage /> },
      { path: 'connectors/:id', element: <ConnectorDetailPage /> },
      { path: 'sync-jobs', element: <SyncJobsPage /> },
      { path: 'logs', element: <LogsPage /> },
      { path: 'docs', element: <DocsPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
