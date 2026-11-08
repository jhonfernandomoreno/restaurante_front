interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mt-2" aria-label="Ruta de navegación">
      <ol className="breadcrumb bg-transparent p-0 mb-0 small">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.active ? (
              <span className="text-muted">{item.label}</span>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
            {index < items.length - 1 && <span className="text-muted mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
