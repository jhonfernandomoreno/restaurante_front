import { useMutation, useQuery } from '@tanstack/react-query'
import { authService } from '../../../services/authService'
import type { UsuarioLogin, UsuarioRegistro } from '../types/auth.types'

export const useAuth = () => {
  const { data: usuario, isLoading, error } = useQuery({
    queryKey: ['auth', 'usuario'],
    queryFn: authService.getPerfil,
    enabled: authService.isAuthenticated(),
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: (data: UsuarioLogin) => authService.login(data),
    onSuccess: () => {
      window.location.href = '/dashboard'
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: UsuarioRegistro) => authService.register(data),
  })

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      window.location.href = '/login'
    },
  })

  return {
    usuario,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    loginPending: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    registerPending: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
    logoutPending: logoutMutation.isPending,
    isAuthenticated: !!usuario,
  }
}
