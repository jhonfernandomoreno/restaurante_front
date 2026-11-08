import api from '../../../services/api'
import type {
  Comanda,
  ComandaFiltros,
  ComandaPaginado,
  CambioEstadoComanda,
} from '../types/comanda.types'

export const comandaService = {
  listar: async (filtros: ComandaFiltros): Promise<ComandaPaginado> => {
    const response = await api.get<ComandaPaginado>('/comandas', {
      params: filtros,
    })
    return response.data
  },

  obtener: async (id: number): Promise<Comanda> => {
    const response = await api.get<Comanda>(`/comandas/${id}`)
    return response.data
  },

  cambiarEstado: async (data: CambioEstadoComanda): Promise<Comanda> => {
    const response = await api.patch<Comanda>(
      `/comandas/${data.comandaId}/estado`,
      { estado: data.estado }
    )
    return response.data
  },

  listarPorEstacion: async (estacion: string): Promise<Comanda[]> => {
    const response = await api.get<Comanda[]>(`/comandas/estacion/${estacion}`)
    return response.data
  },

  listarPendientes: async (): Promise<Comanda[]> => {
    const response = await api.get<Comanda[]>('/comandas/pendientes')
    return response.data
  },
}
