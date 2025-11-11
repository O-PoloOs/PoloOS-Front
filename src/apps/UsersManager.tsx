import React, { useEffect, useState } from 'react'
import { api, type Role } from '../api'
import { useAuth } from '../state/AuthContext'

export default function UsersManager() {
  const { token } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('USER')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [users, setUsers] = useState<Array<{ id: string; username: string; role: Role }>>([])

  const refresh = async () => {
    if (!token) return
    try {
      const list = await api.users.list(token)
      setUsers(list)
    } catch (e: any) {
      setError(e?.message || 'No se pudo cargar usuarios')
    }
  }

  useEffect(() => {
    refresh()
  }, [token])

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      await api.users.create(token, username, password, role)
      setUsername('')
      setPassword('')
      await refresh()
    } catch (e: any) {
      setError(e?.message || 'No se pudo crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 12, padding: 12, height: '100%' }}>
      <div style={{ fontWeight: 700 }}>Administración de usuarios</div>
      <form onSubmit={onCreate} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} style={{ background: '#0d1426', border: '1px solid #1f2b4a', color: '#e7eef7', padding: '8px 10px', borderRadius: 8 }} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ background: '#0d1426', border: '1px solid #1f2b4a', color: '#e7eef7', padding: '8px 10px', borderRadius: 8 }} />
        <select value={role} onChange={(e) => setRole(e.target.value as Role)} style={{ background: '#0d1426', border: '1px solid #1f2b4a', color: '#e7eef7', padding: '8px 10px', borderRadius: 8 }}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="login-btn" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
        {error && <span style={{ color: '#ff9b9b' }}>{error}</span>}
      </form>
      <div style={{ overflow: 'auto' }}>
        {!users.length ? (
          <div style={{ color: '#9fb0c7' }}>(sin usuarios)</div>
        ) : (
          <div style={{ display: 'grid', gap: 6 }}>
            {users.map((u) => (
              <div key={u.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#9fb0c7' }}>{u.id.slice(0, 8)}</span>
                <span>{u.username}</span>
                <span style={{ marginLeft: 'auto', color: '#cfe3ff' }}>{u.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

