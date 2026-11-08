import { useState } from 'react'

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header
      className="header fixed-top d-flex align-items-center py-2 px-3"
      style={{ zIndex: 1030 }}
    >
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-link text-reset p-0 me-3 d-lg-none"
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          <a href="#" className="navbar-brand d-flex align-items-center fw-bold fs-5 text-dark text-decoration-none">
            <i className="bi bi-building me-2 text-primary"></i>
            Restaurante
          </a>
        </div>

        <div className="d-none d-lg-flex align-items-center ms-auto">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center ms-3">
          <div className="dropdown d-inline-block">
            <button
              className="btn btn-link text-reset p-0 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded={userMenuOpen}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="Usuario"
            >
              <i className="bi bi-person-circle fs-4"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="/perfil">
                  <i className="bi bi-person me-2"></i> Perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/ajustes">
                  <i className="bi bi-gear me-2"></i> Ajustes
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item text-danger" href="/logout">
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
