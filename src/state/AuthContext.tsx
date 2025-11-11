import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, type AuthUser, type LoginResponse } from '../api'

type AuthState = {
  user: AuthUser | null
  token: string | null
  login: (u: string, p: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('polo.auth')
    if (raw) {
      try {
        const parsed: LoginResponse = JSON.parse(raw)
        setToken(parsed.token)
        setUser(parsed.user)
      } catch {}
    }
  }, [])

  const login = async (username: string, password: string) => {
    const res = await api.login(username, password)
    setToken(res.token)
    setUser(res.user)
    localStorage.setItem('polo.auth', JSON.stringify(res))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('polo.auth')
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

