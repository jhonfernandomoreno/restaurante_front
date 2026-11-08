import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productoService } from '../services/productoService'
import type { ProductoFiltros, ProductoCreate, ProductoUpdate } from '../types/producto.types'

export const useProductos = (filtros: ProductoFiltros) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['productos', filtros],
    queryFn: () => productoService.listar(filtros),
  })

  const crearMutation = useMutation({
    mutationFn: (data: ProductoCreate) => productoService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
    },
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductoUpdate }) =>
      productoService.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
    },
  })

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => productoService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
    },
  })

  const { data: productosDisponibles } = useQuery({
    queryKey: ['productos', 'disponibles'],
    queryFn: productoService.listarDisponibles,
  })

  return {
    datos: data?.datos ?? [],
    total: data?.total ?? 0,
    pagina: data?.pagina ?? 1,
    totalPaginas: data?.totalPaginas ?? 0,
    isLoading,
    error,
    refetch,
    productosDisponibles: productosDisponibles ?? [],
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

export const useProducto = (id: number) => {
  return useQuery({
    queryKey: ['productos', id],
    queryFn: () => productoService.obtener(id),
    enabled: !!id,
  })
}
