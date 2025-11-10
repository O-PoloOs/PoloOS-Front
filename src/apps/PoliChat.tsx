import React from 'react'

export default function PoliChat() {
  const initial = [{ from: 'bot' as const, text: 'Hola como estas en que puedo ayudarte hoy' }]
  return (
    <div className="chat">
      <div className="chat__messages">
        {initial.map((m, i) => (
          <div key={i} className={`chat__bubble ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <div className="chat__inputbar">
        <input className="chat__input" placeholder="Escribe un mensaje..." />
        <button className="chat__send" disabled>Enviar</button>
      </div>
    </div>
  )
}
