import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="d-flex w-100 h-100 position-relative" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Header />
      <div className="main-content d-flex flex-column w-100">
        <main className="flex-fill p-3">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
