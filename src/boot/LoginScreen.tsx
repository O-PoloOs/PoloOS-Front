import React, { useState } from 'react'
import { useAuth } from '../state/AuthContext'

type Props = { onLogin: () => void }

export default function LoginScreen({ onLogin }: Props) {
  const { login } = useAuth()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      onLogin()
    } catch (err: any) {
      setError(err?.message || 'Error de autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="boot full-black">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="avatar" aria-hidden>👤</div>
        <div className="username">Iniciar sesión</div>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', width: 220 }}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', width: 220 }}
        />
        <button className="login-btn" disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
        {error && <div style={{ color: '#ff9b9b', fontSize: 12 }}>{error}</div>}
      </form>
    </div>
  )
}

