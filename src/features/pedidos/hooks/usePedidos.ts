import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { pedidoService } from '../services/pedidoService'
import type { PedidoFiltros, PedidoCreate, PedidoUpdate } from '../types/pedido.types'

export const usePedidos = (filtros: PedidoFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['pedidos', filtros],
    queryFn: () => pedidoService.listar(filtros),
  })

  const crearMutation = useMutation({
    mutationFn: (data: PedidoCreate) => pedidoService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] })
    },
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PedidoUpdate }) =>
      pedidoService.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] })
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => pedidoService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] })
    },
  })

  const cambiarEstadoMutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: PedidoUpdate['estado'] }) =>
      pedidoService.cambiarEstado(id, estado as NonNullable<PedidoUpdate['estado']>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] })
    },
  })

  return {
    datos: data?.datos ?? [],
    total: data?.total ?? 0,
    pagina: data?.pagina ?? 1,
    totalPaginas: data?.totalPaginas ?? 0,
    isLoading,
    error,
    refetch,
    crear: crearMutation.mutateAsync,
    crearPending: crearMutation.isPending,
    crearError: crearMutation.error,
    actualizar: actualizarMutation.mutateAsync,
    actualizarPending: actualizarMutation.isPending,
    actualizarError: actualizarMutation.error,
    eliminar: eliminarMutation.mutateAsync,
    eliminarPending: eliminarMutation.isPending,
    eliminarError: eliminarMutation.error,
    cambiarEstado: cambiarEstadoMutation.mutateAsync,
    cambiarEstadoPending: cambiarEstadoMutation.isPending,
    cambiarEstadoError: cambiarEstadoMutation.error,
  }
}

export const usePedido = (id: number) => {
  return useQuery({
    queryKey: ['pedidos', id],
    queryFn: () => pedidoService.obtener(id),
    enabled: !!id,
  })
}
