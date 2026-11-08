import api from './api'
import type {
  UsuarioLogin,
  UsuarioRegistro,
  UsuarioToken,
} from '../features/auth/types/auth.types'

export const authService = {
  login: async (data: UsuarioLogin): Promise<UsuarioToken> => {
    const response = await api.post<UsuarioToken>('/auth/login', data)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('usuario', JSON.stringify(response.data))
    return response.data
  },

  register: async (data: UsuarioRegistro): Promise<UsuarioToken> => {
    const response = await api.post<UsuarioToken>('/auth/register', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  },

  getPerfil: async (): Promise<UsuarioToken> => {
    const response = await api.get<UsuarioToken>('/auth/perfil')
    return response.data
  },

  getToken: (): string | null => localStorage.getItem('token'),

  getUsuario: (): UsuarioToken | null => {
    const usuario = localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : null
  },

  isAuthenticated: (): boolean => !!localStorage.getItem('token'),
}
