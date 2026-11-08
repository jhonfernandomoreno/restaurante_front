interface CardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
}

export default function Card({
  title,
  subtitle,
  children,
  className,
  footer,
}: CardProps) {
  return (
    <div className={`card h-100 shadow-sm ${className || ''}`}>
      {title || subtitle ? (
        <div className="card-body d-flex flex-column">
          {title && <h5 className="card-title mb-1">{title}</h5>}
          {subtitle && <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>}
          {children}
        </div>
      ) : (
        <div className="card-body">{children}</div>
      )}
      {footer && <div className="card-footer bg-transparent border-top">{footer}</div>}
    </div>
  )
}
