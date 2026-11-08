import api from '../../../services/api'
import type {
  Mesa,
  MesaCreate,
  MesaUpdate,
  MesaFiltros,
  MesaPaginado,
} from '../types/mesa.types'

export const mesaService = {
  listar: async (filtros: MesaFiltros): Promise<MesaPaginado> => {
    const response = await api.get<MesaPaginado>('/mesas', { params: filtros })
    return response.data
  },

  obtener: async (id: number): Promise<Mesa> => {
    const response = await api.get<Mesa>(`/mesas/${id}`)
    return response.data
  },

  crear: async (data: MesaCreate): Promise<Mesa> => {
    const response = await api.post<Mesa>('/mesas', data)
    return response.data
  },

  actualizar: async (id: number, data: MesaUpdate): Promise<Mesa> => {
    const response = await api.put<Mesa>(`/mesas/${id}`, data)
    return response.data
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/mesas/${id}`)
  },

  cambiarEstado: async (
    id: number,
    estado: Mesa['estado']
  ): Promise<Mesa> => {
    const response = await api.patch<Mesa>(`/mesas/${id}/estado`, { estado })
    return response.data
  },

  listarDisponibles: async (): Promise<Mesa[]> => {
    const response = await api.get<Mesa[]>('/mesas/disponibles')
    return response.data
  },
}
