import api from '../../../services/api'
import type {
  Pedido,
  PedidoCreate,
  PedidoUpdate,
  PedidoFiltros,
  PedidoPaginado,
} from '../types/pedido.types'

export const pedidoService = {
  listar: async (filtros: PedidoFiltros): Promise<PedidoPaginado> => {
    const response = await api.get<PedidoPaginado>('/pedidos', {
      params: filtros,
    })
    return response.data
  },

  obtener: async (id: number): Promise<Pedido> => {
    const response = await api.get<Pedido>(`/pedidos/${id}`)
    return response.data
  },

  crear: async (data: PedidoCreate): Promise<Pedido> => {
    const response = await api.post<Pedido>('/pedidos', data)
    return response.data
  },

  actualizar: async (id: number, data: PedidoUpdate): Promise<Pedido> => {
    const response = await api.put<Pedido>(`/pedidos/${id}`, data)
    return response.data
  },

  eliminar: async (id: number): Promise<void> => {
    await api.delete(`/pedidos/${id}`)
  },

  cambiarEstado: async (
    id: number,
    estado: Pedido['estado']
  ): Promise<Pedido> => {
    const response = await api.patch<Pedido>(`/pedidos/${id}/estado`, {
      estado,
    })
    return response.data
  },

  listarPorMesa: async (mesaId: number): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>(`/pedidos/mesa/${mesaId}`)
    return response.data
  },

  listarPorEstado: async (estado: Pedido['estado']): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>(`/pedidos/estado/${estado}`)
    return response.data
  },
}
