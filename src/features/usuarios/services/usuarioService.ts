import api from '../../../services/api'
import type {
  Usuario,
  UsuarioCreate,
  UsuarioUpdate,
  UsuarioFiltros,
  UsuarioPaginado,
} from '../types/usuario.types'

export const usuarioService = {
  listar: async (filtros: UsuarioFiltros): Promise<UsuarioPaginado> => {
    const response = await api.get<UsuarioPaginado>('/usuarios', {
      params: filtros,
    })
    return response.data
  },

  obtener: async (id: number): Promise<Usuario> => {
    const response = await api.get<Usuario>(`/usuarios/${id}`)
    return response.data
  },

  crear: async (data: UsuarioCreate): Promise<Usuario> => {
    const response = await api.post<Usuario>('/usuarios', data)
    return response.data
  },

  actualizar: async (id: number, data: UsuarioUpdate): Promise<Usuario> => {
    const response = await api.put<Usuario>(`/usuarios/${id}`, data)
    return response.data
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`)
  },

  activar: async (id: number): Promise<Usuario> => {
    const response = await api.patch<Usuario>(`/usuarios/${id}/activar`)
    return response.data
  },

  desactivar: async (id: number): Promise<Usuario> => {
    const response = await api.patch<Usuario>(`/usuarios/${id}/desactivar`)
    return response.data
  },
}
