interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md'
}

const STATUS_VARIANTS: Record<string, string> = {
  disponible: 'bg-success',
  ocupada: 'bg-danger',
  'pendiente de pago': 'bg-warning',
  'en preparaci\u00f3n': 'bg-info',
  'lista para servir': 'bg-success',
  confirmado: 'bg-primary',
  'enviado a cocina': 'bg-info',
  listo: 'bg-success',
  entregado: 'bg-success',
  cancelado: 'bg-danger',
  borrador: 'bg-secondary',
  abierta: 'bg-success',
  cerrada: 'bg-secondary',
  activo: 'bg-success',
  inactivo: 'bg-secondary',
  default: 'bg-secondary',
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const variant = STATUS_VARIANTS[status.toLowerCase()] || STATUS_VARIANTS.default
  const sizeClass = size === 'sm' ? 'badge-sm' : ''

  return (
    <span className={`badge ${variant} ${sizeClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
