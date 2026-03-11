import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from '../../components/ui/Footer'

export function RootLayout() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-base)',
      transition: 'background-color 0.3s ease',
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--bg-base)',
          transition: 'background-color 0.3s ease',
        }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
