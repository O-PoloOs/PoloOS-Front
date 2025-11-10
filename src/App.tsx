import React, { useState } from 'react'
import DesktopIcon from './components/DesktopIcon'
import Window from './components/Window'
import Notepad from './apps/Notepad'
import ConsoleMock from './apps/ConsoleMock'
import PoliChat from './apps/PoliChat'
import { ConsoleIcon, NotepadIcon, ChatIcon } from './icons'
import PowerScreen from './boot/PowerScreen'
import BootLogo from './boot/BootLogo'
import LoginScreen from './boot/LoginScreen'

type AppName = 'notepad' | 'console' | 'polichat'

export default function App() {
  const [open, setOpen] = useState<Record<AppName, boolean>>({ notepad: false, console: false, polichat: false })
  const [phase, setPhase] = useState<'off' | 'boot' | 'login' | 'desktop'>('off')


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

      {open.notepad && (
        <Window title="Bloc de notas" onClose={() => setOpen((s) => ({ ...s, notepad: false }))}>
          <Notepad />
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
