interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  prepend?: React.ReactNode
  append?: React.ReactNode
}

export default function FormInput({
  label,
  error,
  helperText,
  prepend,
  append,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className={`mb-3 ${error ? 'has-validation' : ''} ${className || ''}`}>
      <label className="form-label">{label}</label>
      <div className="input-group">
        {prepend && <span className="input-group-text">{prepend}</span>}
        <input
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...props}
        />
        {append && <span className="input-group-text">{append}</span>}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  )
}
