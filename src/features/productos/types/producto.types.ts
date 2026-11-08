export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoriaId: number
  categoriaNombre?: string
  estacionId: number
  estacionNombre?: string
  disponible: boolean
  activo: boolean
  requiereModificadores: boolean
  imagenUrl?: string
  fechaCreacion: string
  fechaActualizacion?: string
  restauranteId: number
}

export interface ProductoCreate {
  nombre: string
  descripcion: string
  precio: number
  categoriaId: number
  estacionId: number
  disponible?: boolean
  requiereModificadores?: boolean
  imagenUrl?: string
  restauranteId: number
}

export interface ProductoUpdate {
  nombre?: string
  descripcion?: string
  precio?: number
  categoriaId?: number
  estacionId?: number
  disponible?: boolean
  activo?: boolean
  requiereModificadores?: boolean
  imagenUrl?: string
}

export interface ProductoFiltros {
  busqueda?: string
  categoriaId?: number
  estacionId?: number
  disponible?: boolean
  activo?: boolean
  pagina: number
  limite: number
}

export interface ProductoPaginado {
  datos: Producto[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}

export interface Modificador {
  id: number
  nombre: string
  precioAdicional: number
  obligatorio: boolean
  productoId: number
}
