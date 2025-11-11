import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../state/AuthContext'

type FileItem = { id: string; name: string; content: string }

type Props = { initialFileId?: string | null; onOpenedFile?: () => void }

export default function Notepad({ initialFileId, onOpenedFile }: Props) {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [name, setName] = useState('nuevo.txt')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const current = useMemo(() => files.find((f) => f.id === currentId) || null, [files, currentId])

  const refresh = async () => {
    if (!user) return
    try {
      const list = await api.files.list(user.id)
      setFiles(list)
      if (currentId) {
        const found = list.find((f) => f.id === currentId)
        if (!found) {
          setCurrentId(null)
        }
      }
    } catch (e: any) {
      setError(e?.message || 'No se pudieron cargar los archivos')
    }
  }

  useEffect(() => {
    setError(null)
    setLoading(true)
    refresh().finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    const es = api.events()
    const handler = () => refresh()
    es.addEventListener('file_created', handler as any)
    es.addEventListener('file_deleted', handler as any)
    es.addEventListener('file_renamed', handler as any)
    return () => es.close()
  }, [user, currentId])

  // Abrir archivo inicial si se ingresó desde icono del escritorio
  useEffect(() => {
    const openInitial = async () => {
      if (!initialFileId) return
      try {
        const full = await api.files.read(initialFileId)
        setCurrentId(full.id)
        setName(full.name)
        setText(full.content)
        onOpenedFile?.()
      } catch (e: any) {
        setError(e?.message || 'No se pudo abrir el archivo')
      }
    }
    openInitial()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFileId])

  const openFile = async (f: FileItem) => {
    try {
      const full = await api.files.read(f.id)
      setCurrentId(full.id)
      setName(full.name)
      setText(full.content)
    } catch (e: any) {
      setError(e?.message || 'No se pudo abrir el archivo')
    }
  }

  const save = async () => {
    if (!user) return
    setSaving(true)
    setError(null)
    try {
      await api.files.write(user.id, name.trim() || 'sin_nombre.txt', text)
      await refresh()
    } catch (e: any) {
      setError(e?.message || 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: '100%' }}>
      <div style={{ borderRight: '1px solid #1e2740', padding: 10, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 8 }}>
        <div style={{ fontWeight: 600 }}>Archivos</div>
        <div style={{ overflow: 'auto', display: 'grid', gap: 6 }}>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            files.map((f) => (
              <button key={f.id} onClick={() => openFile(f)} style={{ textAlign: 'left', background: 'transparent', color: 'inherit', border: '1px solid transparent', padding: 6, borderRadius: 8 }}>
                {f.name}
              </button>
            ))
          )}
          {!files.length && !loading && <div style={{ color: '#9fb0c7' }}>(sin archivos)</div>}
        </div>
        <button className="login-btn" onClick={refresh}>Refrescar</button>
      </div>

      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%' }}>
        <div style={{ display: 'flex', gap: 8, padding: 8, alignItems: 'center', borderBottom: '1px solid #1e2740' }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de archivo"
            style={{ background: '#0d1426', border: '1px solid #1f2b4a', color: '#e7eef7', padding: '8px 10px', borderRadius: 8, minWidth: 200 }}
          />
          <button className="login-btn" onClick={save} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
          {current && <span style={{ color: '#9fb0c7' }}>Abierto: {current.name}</span>}
          {error && <span style={{ color: '#ff9b9b', marginLeft: 'auto' }}>{error}</span>}
        </div>
        <textarea
          className="notepad"
          placeholder="Escribe aquí"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
        {/* Botón inferior de guardar eliminado a pedido */}
      </div>
    </div>
  )
}
