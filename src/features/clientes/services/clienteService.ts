import api from '../../../services/api'
import type {
  Cliente,
  ClienteCreate,
  ClienteUpdate,
  ClienteFiltros,
  ClientePaginado,
} from '../types/cliente.types'

export const clienteService = {
  listar: async (filtros: ClienteFiltros): Promise<ClientePaginado> => {
    const response = await api.get<ClientePaginado>('/clientes', {
      params: filtros,
    })
    return response.data
  },

  obtener: async (id: number): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/${id}`)
    return response.data
  },

  crear: async (data: ClienteCreate): Promise<Cliente> => {
    const response = await api.post<Cliente>('/clientes', data)
    return response.data
  },

  actualizar: async (id: number, data: ClienteUpdate): Promise<Cliente> => {
    const response = await api.put<Cliente>(`/clientes/${id}`, data)
    return response.data
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`)
  },

  activar: async (id: number): Promise<Cliente> => {
    const response = await api.patch<Cliente>(`/clientes/${id}/activar`)
    return response.data
  },

  desactivar: async (id: number): Promise<Cliente> => {
    const response = await api.patch<Cliente>(`/clientes/${id}/desactivar`)
    return response.data
  },

  buscarPorIdentificacion: async (
    numeroIdentificacion: string
  ): Promise<Cliente | null> => {
    const response = await api.get<Cliente | null>(
      `/clientes/buscar/${numeroIdentificacion}`
    )
    return response.data
  },
}
