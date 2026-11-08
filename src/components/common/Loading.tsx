interface LoadingProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Loading({ text = 'Cargando...', size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-4">
      <div className={`spinner-border text-primary ${sizeClasses[size]} mb-2`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <span className="text-muted small">{text}</span>}
    </div>
  )
}
