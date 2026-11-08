import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoriaService } from '../services/categoriaService'
import type { CategoriaFiltros, CategoriaCreate, CategoriaUpdate } from '../types/categoria.types'

export const useCategorias = (filtros: CategoriaFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categorias', filtros],
    queryFn: () => categoriaService.listar(filtros),
  })

  const crearMutation = useMutation({
    mutationFn: (data: CategoriaCreate) => categoriaService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
    },
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoriaUpdate }) =>
      categoriaService.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => categoriaService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
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
  }
}

export const useCategoria = (id: number) => {
  return useQuery({
    queryKey: ['categorias', id],
    queryFn: () => categoriaService.obtener(id),
    enabled: !!id,
  })
}
