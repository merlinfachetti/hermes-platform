import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import DashboardPage from '../pages/dashboard'
import ConnectorsPage from '../pages/connectors'
import ConnectorDetailPage from '../pages/connector-details'
import SyncJobsPage from '../pages/sync-jobs'
import LogsPage from '../pages/logs'
import DocsPage from '../pages/docs'

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
