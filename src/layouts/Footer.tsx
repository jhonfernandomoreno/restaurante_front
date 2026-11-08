export default function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light border-top">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-muted small">
          &copy; {new Date().getFullYear()} Restaurante Elasjas. Todos los derechos reservados.
        </span>
        <span className="text-muted small">Versión 1.0.0</span>
      </div>
    </footer>
  )
}
