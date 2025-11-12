import React, { useEffect } from 'react'

type Props = { onDone: () => void; durationMs?: number }

export default function ShutdownScreen({ onDone, durationMs = 3000 }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, durationMs)
    return () => clearTimeout(t)
  }, [onDone, durationMs])

  return (
    <div className="boot full-black">
      <div className="boot-logo-wrap">
        <div className="boot-logo">Polo<span className="brand-os">OS</span></div>
      </div>
      <div className="boot-loading enhanced">
        <div className="boot-loading__text">Apagando</div>
        <div className="loader-bar" aria-hidden></div>
      </div>
    </div>
  )
}

