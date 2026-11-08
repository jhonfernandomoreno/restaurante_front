import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'bi bi-speedometer2' },
  { label: 'Categorías', href: '/categorias', icon: 'bi bi-collection' },
  { label: 'Productos', href: '/productos', icon: 'bi bi-box' },
  { label: 'Clientes', href: '/clientes', icon: 'bi bi-people' },
  { label: 'Mesas', href: '/mesas', icon: 'bi bi-table' },
  { label: 'Pedidos', href: '/pedidos', icon: 'bi bi-cart' },
  { label: 'Cocina', href: '/cocina', icon: 'bi bi-fire' },
  { label: 'Caja', href: '/caja', icon: 'bi bi-cash' },
  { label: 'Usuarios', href: '/usuarios', icon: 'bi bi-person-badge' },
  { label: 'Reportes', href: '/reportes', icon: 'bi bi-graph-up' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{ transition: 'all 0.3s' }}
    >
      <div className="sidebar-brand d-flex align-items-center py-3 px-2">
        <i className="bi bi-building me-2 fs-4 text-primary"></i>
        <span
          className={`d-none d-lg-block ms-2 fw-bold ${!collapsed ? '' : 'd-none'}`}
        >
          Restaurante
        </span>
      </div>

      <button
        className="sidebar-toggle d-lg-none btn btn-link text-reset p-2"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <i className={`bi ${collapsed ? 'bi-list' : 'bi-x'}`}></i>
      </button>

      <nav className="sidebar-nav p-2">
        <ul className="nav flex-column">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="nav-item mb-1">
              <a
                className="nav-link d-flex align-items-center rounded"
                href={item.href}
              >
                <i className={`${item.icon} me-2 fs-5`}></i>
                <span className={`d-none d-lg-block ${!collapsed ? '' : 'd-none'}`}>
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
