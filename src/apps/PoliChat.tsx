import React, { useRef, useState } from 'react'
import { api } from '../api'

type Msg = { from: 'bot' | 'me'; text: string }

export default function PoliChat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hola, ¿en qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || sending) return
    const text = input
    setMsgs((m) => [...m, { from: 'me', text }])
    setInput('')
    setSending(true)
    try {
      let acc = ''
      await api.ai.chat(text, 'PoloOS', (chunk) => {
        acc += chunk
        setMsgs((m) => {
          const copy = [...m]
          const lastIsBot = copy[copy.length - 1]?.from === 'bot'
          if (lastIsBot) {
            copy[copy.length - 1] = { from: 'bot', text: acc }
          } else {
            copy.push({ from: 'bot', text: acc })
          }
          return copy
        })
      })
    } catch {
      setMsgs((m) => [...m, { from: 'bot', text: 'Error al consultar el asistente.' }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="chat">
      <div className="chat__messages">
        {msgs.map((m, i) => (
          <div key={i} className={`chat__bubble ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <form className="chat__inputbar" onSubmit={send}>
        <input className="chat__input" placeholder="Escribe un mensaje..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="chat__send" disabled={sending || !input.trim()}>Enviar</button>
      </form>
    </div>
  )
}
