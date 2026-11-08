import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'
import type { UsuarioFiltros, UsuarioCreate, UsuarioUpdate } from '../types/usuario.types'

export const useUsuarios = (filtros: UsuarioFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['usuarios', filtros],
    queryFn: () => usuarioService.listar(filtros),
  })

  const crearMutation = useMutation({
    mutationFn: (data: UsuarioCreate) => usuarioService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UsuarioUpdate }) =>
      usuarioService.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => usuarioService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  const activarMutation = useMutation({
    mutationFn: (id: number) => usuarioService.activar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  const desactivarMutation = useMutation({
    mutationFn: (id: number) => usuarioService.desactivar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
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
    activar: activarMutation.mutateAsync,
    activarPending: activarMutation.isPending,
    desactivar: desactivarMutation.mutateAsync,
    desactivarPending: desactivarMutation.isPending,
  }
}

export const useUsuario = (id: number) => {
  return useQuery({
    queryKey: ['usuarios', id],
    queryFn: () => usuarioService.obtener(id),
    enabled: !!id,
  })
}
