export interface Usuario {
  id: number
  username: string
  email: string
  nombreCompleto: string
  rolId: number
  rolNombre?: string
  sucursalId?: number
  sucursalNombre?: string
  activo: boolean
  fechaCreacion: string
  fechaActualizacion?: string
}

export interface UsuarioCreate {
  username: string
  email: string
  password: string
  nombreCompleto: string
  rolId: number
  sucursalId?: number
}

export interface UsuarioUpdate {
  email?: string
  nombreCompleto?: string
  rolId?: number
  sucursalId?: number
  activo?: boolean
  password?: string
}

export interface UsuarioFiltros {
  busqueda?: string
  rolId?: number
  sucursalId?: number
  activo?: boolean
  pagina: number
  limite: number
}

export interface UsuarioPaginado {
  datos: Usuario[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}
