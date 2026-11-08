interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  inline?: boolean
}

export default function FormCheckbox({
  label,
  error,
  helperText,
  inline = false,
  className,
  ...props
}: FormCheckboxProps) {
  return (
    <div
      className={`mb-3 form-check ${inline ? 'form-check-inline d-inline-block' : ''} ${error ? 'has-validation' : ''} ${className || ''}`}
    >
      <input
        className={`form-check-input ${error ? 'is-invalid' : ''}`}
        type="checkbox"
        {...props}
      />
      <label className="form-check-label">{label}</label>
      {error && <div className="invalid-feedback">{error}</div>}
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  )
}
