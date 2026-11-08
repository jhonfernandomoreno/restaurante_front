interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  helperText?: string
  options: { value: string | number; label: string }[]
}

export default function FormSelect({
  label,
  error,
  helperText,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div className={`mb-3 ${error ? 'has-validation' : ''} ${className || ''}`}>
      <label className="form-label">{label}</label>
      <select
        className={`form-select ${error ? 'is-invalid' : ''}`}
        {...props}
      >
        <option value="" disabled>
          Seleccione una opción...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  )
}
