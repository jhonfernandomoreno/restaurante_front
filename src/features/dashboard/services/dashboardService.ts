import api from '../../../services/api'
import type { DashboardData } from '../types/dashboard.types'

export const dashboardService = {
  obtenerDatos: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard/datos')
    return response.data
  },

  obtenerMetricas: async () => {
    const response = await api.get('/dashboard/metricas')
    return response.data
  },

  obtenerVentasDiarias: async () => {
    const response = await api.get('/dashboard/ventas-diarias')
    return response.data
  },
}
