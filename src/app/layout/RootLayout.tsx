import { Outlet } from 'react-router-dom'
import { Sidebar, SidebarProvider } from './Sidebar'
import { Header } from './Header'
import { Footer } from '../../components/ui/Footer'
import { useIsMobile } from '../../lib/useBreakpoint'

export function RootLayout() {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <div style={{
        display: 'flex', height: '100vh', overflow: 'hidden',
        backgroundColor: 'var(--bg-base)', transition: 'background-color 0.3s ease',
      }}>
        {/* Desktop sidebar — hidden on mobile (drawer handles it) */}
        {!isMobile && <Sidebar />}
        {/* Mobile drawer (portal-style, always mounted) */}
        {isMobile && <Sidebar />}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <Header />
          <main style={{
            flex: 1, overflow: 'auto',
            backgroundColor: 'var(--bg-base)',
            transition: 'background-color 0.3s ease',
          }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}
