import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { comandaService } from '../services/comandaService'
import type { ComandaFiltros, CambioEstadoComanda } from '../types/comanda.types'

export const useComandas = (filtros: ComandaFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['comandas', filtros],
    queryFn: () => comandaService.listar(filtros),
  })

  const cambiarEstadoMutation = useMutation({
    mutationFn: (data: CambioEstadoComanda) => comandaService.cambiarEstado(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comandas'] })
    },
  })

  const { data: comandasPendientes } = useQuery({
    queryKey: ['comandas', 'pendientes'],
    queryFn: comandaService.listarPendientes,
  })

  return {
    datos: data?.datos ?? [],
    total: data?.total ?? 0,
    pagina: data?.pagina ?? 1,
    totalPaginas: data?.totalPaginas ?? 0,
    isLoading,
    error,
    refetch,
    comandasPendientes: comandasPendientes ?? [],
    cambiarEstado: cambiarEstadoMutation.mutateAsync,
    cambiarEstadoPending: cambiarEstadoMutation.isPending,
    cambiarEstadoError: cambiarEstadoMutation.error,
  }
}

export const useComanda = (id: number) => {
  return useQuery({
    queryKey: ['comandas', id],
    queryFn: () => comandaService.obtener(id),
    enabled: !!id,
  })
}
