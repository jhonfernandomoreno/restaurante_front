import api from '../../../services/api'
import type {
  Producto,
  ProductoCreate,
  ProductoUpdate,
  ProductoFiltros,
  ProductoPaginado,
} from '../types/producto.types'

export const productoService = {
  listar: async (filtros: ProductoFiltros): Promise<ProductoPaginado> => {
    const response = await api.get<ProductoPaginado>('/productos', {
      params: filtros,
    })
    return response.data
  },

  obtener: async (id: number): Promise<Producto> => {
    const response = await api.get<Producto>(`/productos/${id}`)
    return response.data
  },

  crear: async (data: ProductoCreate): Promise<Producto> => {
    const response = await api.post<Producto>('/productos', data)
    return response.data
  },

  actualizar: async (id: number, data: ProductoUpdate): Promise<Producto> => {
    const response = await api.put<Producto>(`/productos/${id}`, data)
    return response.data
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/productos/${id}`)
  },

  activar: async (id: number): Promise<Producto> => {
    const response = await api.patch<Producto>(`/productos/${id}/activar`)
    return response.data
  },

  desactivar: async (id: number): Promise<Producto> => {
    const response = await api.patch<Producto>(`/productos/${id}/desactivar`)
    return response.data
  },

  listarDisponibles: async (): Promise<Producto[]> => {
    const response = await api.get<Producto[]>('/productos/disponibles')
    return response.data
  },
}
