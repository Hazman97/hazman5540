import { api, setAuthToken, setStoredUser, clearAuthToken } from './client'

export interface AuthUser {
  id?: string
  name: string
  email?: string
  picture?: string
  username?: string
  department?: string
  role: 'student' | 'admin'
}

export const authApi = {
  // Google OAuth login — Google Sign-In provides the idToken
  googleLogin: async (idToken: string, role: 'student' | 'admin' = 'admin') => {
    const res = await api.post<{ token: string; user: AuthUser }>('/auth/google', { idToken, role })
    setAuthToken(res.token)
    setStoredUser(res.user)
    return res
  },

  // Student username/password login
  studentLogin: async (username: string, password: string) => {
    const res = await api.post<{ token: string; user: AuthUser }>('/auth/student/login', { username, password })
    setAuthToken(res.token)
    setStoredUser(res.user)
    return res
  },

  // Admin username/password login
  adminLogin: async (username: string, password: string) => {
    const res = await api.post<{ token: string; user: AuthUser }>('/auth/admin/login', { username, password })
    setAuthToken(res.token)
    setStoredUser(res.user)
    return res
  },

  logout: () => {
    clearAuthToken()
  },
}

export default authApi
