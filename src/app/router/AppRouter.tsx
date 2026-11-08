import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import AuthLayout from '../../layouts/AuthLayout'

const ComingSoon = () => (
  <div className="text-center py-5">
    <h1 className="text-muted">Página en construcción</h1>
    <p className="text-muted">
      Este módulo se implementará en la próxima fase.
    </p>
  </div>
)

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación (sin sidebar) */}
        <Route path="/login" element={<AuthLayout><ComingSoon /></AuthLayout>} />
        <Route
          path="/register"
          element={<AuthLayout><ComingSoon /></AuthLayout>}
        />

        {/* Rutas de la aplicación (con MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<ComingSoon />} />
          <Route path="categorias" element={<ComingSoon />} />
          <Route path="productos" element={<ComingSoon />} />
          <Route path="clientes" element={<ComingSoon />} />
          <Route path="usuarios" element={<ComingSoon />} />
          <Route path="sucursales" element={<ComingSoon />} />
          <Route path="mesas" element={<ComingSoon />} />
          <Route path="pedidos" element={<ComingSoon />} />
          <Route path="cocina" element={<ComingSoon />} />
          <Route path="caja" element={<ComingSoon />} />
          <Route path="pagos" element={<ComingSoon />} />
          <Route path="reportes" element={<ComingSoon />} />
          <Route path="meseros" element={<ComingSoon />} />
          <Route path="facturacion" element={<ComingSoon />} />
        </Route>

        {/* Ruta comodín para rutas no encontradas */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  )
}
