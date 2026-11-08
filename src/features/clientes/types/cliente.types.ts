export type TipoCliente = 'natural' | 'juridica' | 'ocasional'

export interface Cliente {
  id: number
  tipoCliente: TipoCliente
  // Persona natural
  nombres?: string
  apellidos?: string
  tipoIdentificacion?: string
  numeroIdentificacion?: string
  // Persona jurídica
  razonSocial?: string
  nit?: string
  nombreComercial?: string
  representanteLegal?: string
  digitoVerificacion?: string
  // Común
  correoElectronico?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  departamento?: string
  pais?: string
  activo: boolean
  fechaCreacion: string
  fechaActualizacion?: string
  restauranteId: number
}

export interface ClienteCreate {
  tipoCliente: TipoCliente
  nombres?: string
  apellidos?: string
  tipoIdentificacion?: string
  numeroIdentificacion?: string
  razonSocial?: string
  nit?: string
  nombreComercial?: string
  representanteLegal?: string
  digitoVerificacion?: string
  correoElectronico?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  departamento?: string
  pais?: string
  restauranteId: number
}

export interface ClienteUpdate {
  tipoCliente?: TipoCliente
  nombres?: string
  apellidos?: string
  tipoIdentificacion?: string
  numeroIdentificacion?: string
  razonSocial?: string
  nit?: string
  nombreComercial?: string
  representanteLegal?: string
  digitoVerificacion?: string
  correoElectronico?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  departamento?: string
  pais?: string
  activo?: boolean
}

export interface ClienteFiltros {
  busqueda?: string
  tipoCliente?: TipoCliente
  activo?: boolean
  pagina: number
  limite: number
}

export interface ClientePaginado {
  datos: Cliente[]
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}
