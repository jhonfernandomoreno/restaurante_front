export type EstadoComanda =
  | 'pendiente'
  | 'en_preparacion'
  | 'listo'
  | 'entregado'
  | 'cancelado'

export interface DetalleComanda {
  id: number
  productoId: number
  productoNombre: string
  cantidad: number
  estacion: string
  observaciones?: string
  estado: EstadoComanda
  horaEnvio: string
  horaInicioPreparacion?: string
  horaFinalizado?: string
}

export interface Comanda {
  id: number
  numero: string
  pedidoId: number
  pedidoNumero?: string
  mesaNumero?: number
  meseroNombre?: string
  estado: EstadoComanda
  estacion: string
  detalles: DetalleComanda[]
  horaEnvio: string
  tiempoTranscurrido?: number // segundos
  fechaCreacion: string
  fechaActualizacion?: string
  restauranteId: number
}

export interface ComandaFiltros {
  estacion?: string
  estado?: EstadoComanda
  pagina: number
  limite: number
}

export interface ComandaPaginado {
  datos: Comanda[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}

export interface CambioEstadoComanda {
  comandaId: number
  estado: EstadoComanda
  estacion: string
}
