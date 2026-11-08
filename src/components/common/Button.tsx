interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const sizeMap = { sm: 'btn-sm', md: '', lg: 'btn-lg' }

  return (
    <button
      type="button"
      className={`btn btn-${variant} ${sizeMap[size]} ${fullWidth ? 'w-100' : ''} ${loading ? 'disabled opacity-75' : ''} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
      )}
      {children}
    </button>
  )
}
