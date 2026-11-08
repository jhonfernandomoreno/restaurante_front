export type EstadoMesa =
  | 'disponible'
  | 'ocupada'
  | 'pedido_pendiente'
  | 'en_preparacion'
  | 'lista_para_servir'
  | 'pendiente_de_pago'

export interface Mesa {
  id: number
  numero: number
  zonaId: number
  zonaNombre?: string
  capacidad: number
  meseroId?: number
  meseroNombre?: string
  estado: EstadoMesa
  cuentaAbiertaId?: number
  activo: boolean
  fechaCreacion: string
  fechaActualizacion?: string
  restauranteId: number
}

export interface MesaCreate {
  numero: number
  zonaId: number
  capacidad: number
  meseroId?: number
  restauranteId: number
}

export interface MesaUpdate {
  zonaId?: number
  capacidad?: number
  meseroId?: number
  estado?: EstadoMesa
  activo?: boolean
}

export interface MesaFiltros {
  busqueda?: string
  zonaId?: number
  estado?: EstadoMesa
  activo?: boolean
  pagina: number
  limite: number
}

export interface MesaPaginado {
  datos: Mesa[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}

export interface Zona {
  id: number
  nombre: string
  descripcion: string
  activo: boolean
  restauranteId: number
}
