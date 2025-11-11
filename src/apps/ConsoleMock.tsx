import React, { useEffect, useRef, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../state/AuthContext'

export default function ConsoleMock() {
  const { user } = useAuth()
  const [lines, setLines] = useState<string[]>(['Conectado a Terminal. Usa "help" para ver comandos.'])
  const [input, setInput] = useState('')
  const outRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight })
  }, [lines])

  useEffect(() => {
    const uid = user?.id || 'demo'
    api.terminal
      .history(uid)
      .then((res) => {
        if (res.output?.length) setLines((l) => [...l, ...res.output])
      })
      .catch(() => {})
  }, [user])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const cmd = input
    setLines((l) => [...l, `> ${cmd}`])
    setInput('')
    try {
      const uid = user?.id || 'demo'
      // Si no hay sesión y el comando intenta tocar el sistema de archivos, avisamos y salimos
      const [head] = cmd.trim().split(/\s+/)
      const fileOps = new Set(['ls', 'cat', 'touch', 'remove', 'rm', 'rename', 'mv'])
      if (!user && fileOps.has(head)) {
        setLines((l) => [...l, '[ERROR] Debes iniciar sesión para gestionar archivos. Usa el botón "Salir" para ir a la pantalla de login.'])
        return
      }
      const clientInfo = {
        browser: navigator.userAgent,
        resolution: `${window.innerWidth}x${window.innerHeight}`,
        frontUptimeMs: Math.round(performance.now()),
      }
      const res = await api.terminal.run(uid, cmd, clientInfo)
      if (res.clear) {
        setLines([])
      } else if (res.output) {
        setLines((l) => [...l, ...res.output!])
      }
    } catch (err: any) {
      setLines((l) => [...l, `[ERROR] ${err?.message || 'falló el comando'}`])
    }
  }

  return (
    <div className="console">
      <div className="console__output" ref={outRef}>
        {lines.map((l, i) => (
          <div key={i} className="console__line">{l}</div>
        ))}
      </div>
      <form className="console__inputbar" onSubmit={onSubmit}>
        <span className="prompt">&gt;</span>
        <input
          className="console__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          placeholder="escribe aquí"
        />
      </form>
    </div>
  )
}
