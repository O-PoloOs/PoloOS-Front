// Simple API client for PoloOS backend
export type Role = 'ADMIN' | 'USER'

export interface AuthUser {
  id: string
  username: string
  role: Role
}

export interface LoginResponse {
  token: string
  user: AuthUser
}

const BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000'
const AI_BASE_URL: string = (import.meta as any).env?.VITE_AI_BASE_URL || 'http://localhost:8000'

export const api = {
  baseUrl: BASE_URL,
  aiBaseUrl: AI_BASE_URL,

  async login(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Error de login')
    return res.json()
  },

  files: {
    async list(userId: string) {
      const res = await fetch(`${BASE_URL}/api/user-files/${encodeURIComponent(userId)}`)
      if (!res.ok) throw new Error('No se pudo listar archivos')
      return res.json() as Promise<Array<{ id: string; name: string; content: string }>>
    },
    async read(fileId: string) {
      const res = await fetch(`${BASE_URL}/api/files/${encodeURIComponent(fileId)}`)
      if (!res.ok) throw new Error('No se pudo leer el archivo')
      return res.json() as Promise<{ id: string; name: string; content: string; userId: string }>
    },
    async write(userId: string, fileName: string, content: string) {
      const res = await fetch(`${BASE_URL}/api/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, fileName, content }),
      })
      if (!res.ok) throw new Error('No se pudo guardar el archivo')
      return res.json()
    },
  },

  terminal: {
    async run(userId: string, command: string, clientInfo?: any) {
      const res = await fetch(`${BASE_URL}/api/terminal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, command, clientInfo }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Error ejecutando comando')
      return res.json() as Promise<{ output?: string[]; clear?: boolean }>
    },
    async history(userId: string) {
      const res = await fetch(`${BASE_URL}/api/terminal/history/${encodeURIComponent(userId)}`)
      if (!res.ok) throw new Error('No se pudo obtener el historial')
      return res.json() as Promise<{ output: string[] }>
    },
  },

  users: {
    async create(token: string, username: string, password: string, role: Role) {
      const res = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password, role }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'No se pudo crear el usuario')
      return res.json()
    },
    async list(token: string) {
      const res = await fetch(`${BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error((await res.json()).error || 'No se pudo listar usuarios')
      return res.json() as Promise<Array<{ id: string; username: string; role: Role }>>
    },
  },

  events: () => new EventSource(`${BASE_URL}/api/events`),

  ai: {
    async chat(input_user: string, collection_name = 'PoloOS', onChunk?: (s: string) => void) {
      const res = await fetch(`${AI_BASE_URL}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_user, collection_name }),
      })
      if (!res.ok || !res.body) throw new Error('No se pudo iniciar el chat')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        onChunk?.(chunk)
      }
    },
  },
}

