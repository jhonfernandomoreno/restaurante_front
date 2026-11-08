export interface UsuarioLogin {
  username: string
  password: string
}

export interface UsuarioRegistro {
  username: string
  email: string
  password: string
  rol: string
  sucursalId?: number
}

export interface UsuarioToken {
  id: number
  username: string
  email: string
  rol: string
  sucursalId?: number
  token: string
  expiresAt: string
}

export interface AuthState {
  usuario: UsuarioToken | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface Rol {
  id: number
  nombre: string
  descripcion: string
  permisos: string[]
}

export interface UsuarioConRol {
  id: number
  username: string
  email: string
  rol: Rol
  sucursalId?: number
  activo: boolean
  fechaCreacion: string
}
