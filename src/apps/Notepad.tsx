import React, { useState } from 'react'

export default function Notepad() {
  const [text, setText] = useState('')
  return (
    <textarea
      className="notepad"
      placeholder="Escribe aquí…"
      value={text}
      onChange={(e) => setText(e.target.value)}
      spellCheck={false}
    />
  )
}

