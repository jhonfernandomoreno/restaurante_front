import api from '../../../services/api'
import type {
  Categoria,
  CategoriaCreate,
  CategoriaUpdate,
  CategoriaFiltros,
  CategoriaPaginado,
} from '../types/categoria.types'

export const categoriaService = {
  listar: async (filtros: CategoriaFiltros): Promise<CategoriaPaginado> => {
    const response = await api.get<CategoriaPaginado>('/categorias', {
      params: filtros,
    })
    return response.data
  },

  obtener: async (id: number): Promise<Categoria> => {
    const response = await api.get<Categoria>(`/categorias/${id}`)
    return response.data
  },

  crear: async (data: CategoriaCreate): Promise<Categoria> => {
    const response = await api.post<Categoria>('/categorias', data)
    return response.data
  },

  actualizar: async (id: number, data: CategoriaUpdate): Promise<Categoria> => {
    const response = await api.put<Categoria>(`/categorias/${id}`, data)
    return response.data
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`)
  },

  activar: async (id: number): Promise<Categoria> => {
    const response = await api.patch<Categoria>(`/categorias/${id}/activar`)
    return response.data
  },

  desactivar: async (id: number): Promise<Categoria> => {
    const response = await api.patch<Categoria>(`/categorias/${id}/desactivar`)
    return response.data
  },
}
