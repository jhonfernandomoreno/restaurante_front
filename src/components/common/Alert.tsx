interface AlertProps {
  message: string
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'primary'
  dismissible?: boolean
  onDismiss?: () => void
}

export default function Alert({
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
}: AlertProps) {
  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show d-flex align-items-center`}
      role="alert"
    >
      {dismissible && (
        <button
          type="button"
          className="btn-close me-2"
          data-bs-dismiss="alert"
          aria-label="Cerrar"
          onClick={onDismiss}
        />
      )}
      {message}
    </div>
  )
}
