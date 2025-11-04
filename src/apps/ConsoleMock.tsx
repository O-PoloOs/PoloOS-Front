import React, { useEffect, useRef, useState } from 'react'

export default function ConsoleMock() {
  const [lines, setLines] = useState<string[]>([
    'Mock Console — solo UI',
    'Escribe y presiona Enter para añadir la línea.',
  ])
  const [input, setInput] = useState('')
  const outRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight })
  }, [lines])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setLines((l) => [...l, `> ${input}`])
    setInput('')
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
          placeholder="escribe aquí…"
        />
      </form>
    </div>
  )
}

