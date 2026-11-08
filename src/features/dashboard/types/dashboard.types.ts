export interface MetricaDashboard {
  titulo: string
  valor: number | string
  variacion: number
  variacionPositiva: boolean
  icono: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export interface VentaPorDia {
  fecha: string
  total: number
  pedidos: number
}

export interface VentaPorMesero {
  mesero: string
  total: number
  pedidos: number
}

export interface VentaPorProducto {
  producto: string
  categoria: string
  cantidad: number
  total: number
}

export interface EstadoMesaResumen {
  estado: string
  cantidad: number
  color: string
}

export interface DashboardData {
  metricas: MetricaDashboard[]
  ventasDiarias: VentaPorDia[]
  ventasPorMesero: VentaPorMesero[]
  productosMasVendidos: VentaPorProducto[]
  resumenMesas: EstadoMesaResumen[]
  pedidosPendientes: number
  pedidosEnPreparacion: number
}
