import React, { useEffect, useState } from 'react'
import DesktopIcon from './components/DesktopIcon'
import Window from './components/Window'
import Notepad from './apps/Notepad'
import ConsoleMock from './apps/ConsoleMock'
import PoliChat from './apps/PoliChat'
import { ConsoleIcon, NotepadIcon, ChatIcon } from './icons'
import PowerScreen from './boot/PowerScreen'
import BootLogo from './boot/BootLogo'
import LoginScreen from './boot/LoginScreen'
import { useAuth } from './state/AuthContext'
import { api } from './api'

type AppName = 'notepad' | 'console' | 'polichat'

export default function App() {
  const { user } = useAuth()
  const [open, setOpen] = useState<Record<AppName, boolean>>({ notepad: false, console: false, polichat: false })
  // Flujo de arranque completo: encendido -> boot -> login -> desktop
  const [phase, setPhase] = useState<'off' | 'boot' | 'login' | 'desktop'>('off')
  const [files, setFiles] = useState<Array<{ id: string; name: string; content: string }>>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)

  // Efectos SIEMPRE al tope: suscribirse a eventos y cargar archivos solo si hay usuario
  useEffect(() => {
    if (!user) return
    const refresh = () => api.files.list(user.id).then(setFiles).catch(() => {})
    refresh()
    const es = api.events()
    const handler = () => refresh()
    es.addEventListener('file_created', handler as any)
    es.addEventListener('file_deleted', handler as any)
    es.addEventListener('file_renamed', handler as any)
    return () => es.close()
  }, [user])

  const fileIconPosition = (index: number) => {
    const cols = [140, 240, 340, 440]
    const col = index % cols.length
    const row = Math.floor(index / cols.length)
    return { left: cols[col], top: 40 + row * 100 }
  }

  if (phase === 'off') return <PowerScreen onPower={() => setPhase('boot')} />
  if (phase === 'boot') return <BootLogo onDone={() => setPhase('login')} />
  if (phase === 'login') return <LoginScreen onLogin={() => setPhase('desktop')} />

  return (
    <div className="desktop">
      <DesktopIcon
        label="Bloc de notas"
        icon={<NotepadIcon />}
        onOpen={() => setOpen((s) => ({ ...s, notepad: true }))}
        top={40}
        left={28}
      />

      <DesktopIcon
        label="Consola"
        icon={<ConsoleIcon />}
        onOpen={() => setOpen((s) => ({ ...s, console: true }))}
        top={140}
        left={28}
      />

      <DesktopIcon
        label="PoliChat"
        icon={<ChatIcon />}
        onOpen={() => setOpen((s) => ({ ...s, polichat: true }))}
        top={240}
        left={28}
      />

      {user && files.map((f, i) => {
        const pos = fileIconPosition(i)
        return (
          <DesktopIcon
            key={f.id}
            label={f.name}
            icon={<NotepadIcon />}
            onOpen={() => {
              setSelectedFileId(f.id)
              setOpen((s) => ({ ...s, notepad: true }))
            }}
            top={pos.top}
            left={pos.left}
          />
        )
      })}

      {open.notepad && (
        <Window title="Bloc de notas" onClose={() => setOpen((s) => ({ ...s, notepad: false }))}>
          <Notepad initialFileId={selectedFileId} onOpenedFile={() => setSelectedFileId(null)} />
        </Window>
      )}

      {open.console && (
        <Window title="Consola" onClose={() => setOpen((s) => ({ ...s, console: false }))} initial={{ x: 220, y: 160 }}>
          <ConsoleMock />
        </Window>
      )}

      {open.polichat && (
        <Window title="PoliChat" onClose={() => setOpen((s) => ({ ...s, polichat: false }))} initial={{ x: 260, y: 180 }}>
          <PoliChat />
        </Window>
      )}

      <div className="taskbar">
        <div className="taskbar__clock">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    </div>
  )
}