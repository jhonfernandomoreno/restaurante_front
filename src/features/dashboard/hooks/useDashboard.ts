import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'

export const useDashboard = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.obtenerDatos,
  })

  return {
    metricas: data?.metricas ?? [],
    ventasDiarias: data?.ventasDiarias ?? [],
    ventasPorMesero: data?.ventasPorMesero ?? [],
    productosMasVendidos: data?.productosMasVendidos ?? [],
    resumenMesas: data?.resumenMesas ?? [],
    pedidosPendientes: data?.pedidosPendientes ?? 0,
    pedidosEnPreparacion: data?.pedidosEnPreparacion ?? 0,
    isLoading,
    error,
    refetch,
  }
}
