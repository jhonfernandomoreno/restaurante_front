export interface Categoria {
  id: number
  nombre: string
  descripcion: string
  activo: boolean
  fechaCreacion: string
  fechaActualizacion?: string
  restauranteId: number
  productoCount?: number
}

export interface CategoriaCreate {
  nombre: string
  descripcion: string
  restauranteId: number
}

export interface CategoriaUpdate {
  nombre?: string
  descripcion?: string
  activo?: boolean
}

export interface CategoriaFiltros {
  busqueda?: string
  activo?: boolean
  pagina: number
  limite: number
}

export interface CategoriaPaginado {
  datos: Categoria[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}
