import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { clienteService } from '../services/clienteService'
import type { ClienteFiltros, ClienteCreate, ClienteUpdate } from '../types/cliente.types'

export const useClientes = (filtros: ClienteFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['clientes', filtros],
    queryFn: () => clienteService.listar(filtros),
  })

  const crearMutation = useMutation({
    mutationFn: (data: ClienteCreate) => clienteService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ClienteUpdate }) =>
      clienteService.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => clienteService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })

  const buscarMutation = useMutation({
    mutationFn: (numeroIdentificacion: string) =>
      clienteService.buscarPorIdentificacion(numeroIdentificacion),
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
    buscarPorIdentificacion: buscarMutation.mutateAsync,
    buscarPending: buscarMutation.isPending,
    buscarError: buscarMutation.error,
  }
}

export const useCliente = (id: number) => {
  return useQuery({
    queryKey: ['clientes', id],
    queryFn: () => clienteService.obtener(id),
    enabled: !!id,
  })
}
