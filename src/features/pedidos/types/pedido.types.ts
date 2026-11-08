export type EstadoPedido =
  | 'borrador'
  | 'confirmado'
  | 'enviado_a_cocina'
  | 'en_preparacion'
  | 'listo'
  | 'entregado'
  | 'cancelado'

export interface DetallePedido {
  id: number
  productoId: number
  productoNombre: string
  cantidad: number
  precioUnitario: number
  subtotal: number
  observaciones?: string
  estado: EstadoPedido
}

export interface Pedido {
  id: number
  numero: string
  mesaId: number
  mesaNumero?: number
  cuentaId: number
  clienteId?: number
  clienteNombre?: string
  meseroId: number
  meseroNombre?: string
  estado: EstadoPedido
  subtotal: number
  impuestos: number
  descuentos: number
  propina: number
  total: number
  fecha: string
  hora: string
  detalles: DetallePedido[]
  fechaCreacion: string
  fechaActualizacion?: string
  restauranteId: number
}

export interface PedidoCreate {
  mesaId: number
  cuentaId: number
  clienteId?: number
  meseroId: number
  detalles: Omit<DetallePedido, 'id'>[]
  restauranteId: number
}

export interface PedidoUpdate {
  estado?: EstadoPedido
  observaciones?: string
}

export interface PedidoFiltros {
  busqueda?: string
  mesaId?: number
  estado?: EstadoPedido
  meseroId?: number
  fechaDesde?: string
  fechaHasta?: string
  pagina: number
  limite: number
}

export interface PedidoPaginado {
  datos: Pedido[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}
