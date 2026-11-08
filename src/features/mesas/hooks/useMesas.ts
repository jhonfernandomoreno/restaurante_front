import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mesaService } from '../services/mesaService'
import type { MesaFiltros, MesaCreate, MesaUpdate } from '../types/mesa.types'

export const useMesas = (filtros: MesaFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['mesas', filtros],
    queryFn: () => mesaService.listar(filtros),
  })

  const crearMutation = useMutation({
    mutationFn: (data: MesaCreate) => mesaService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mesas'] })
    },
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MesaUpdate }) =>
      mesaService.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mesas'] })
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => mesaService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mesas'] })
    },
  })

  const cambiarEstadoMutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: MesaUpdate['estado'] }) =>
      mesaService.cambiarEstado(id, estado as NonNullable<MesaUpdate['estado']>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mesas'] })
    },
  })

  const { data: mesasDisponibles } = useQuery({
    queryKey: ['mesas', 'disponibles'],
    queryFn: mesaService.listarDisponibles,
  })

  return {
    datos: data?.datos ?? [],
    total: data?.total ?? 0,
    pagina: data?.pagina ?? 1,
    totalPaginas: data?.totalPaginas ?? 0,
    isLoading,
    error,
    refetch,
    mesasDisponibles: mesasDisponibles ?? [],
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

export const useMesa = (id: number) => {
  return useQuery({
    queryKey: ['mesas', id],
    queryFn: () => mesaService.obtener(id),
    enabled: !!id,
  })
}
