import React, { useEffect, useRef, useState } from 'react'

type Props = {
  title: string
  onClose: () => void
  children: React.ReactNode
  initial?: { x: number; y: number; w?: number; h?: number }
}

export default function Window({ title, onClose, children, initial }: Props) {
  const [pos, setPos] = useState({ x: initial?.x ?? 160, y: initial?.y ?? 120 })
  const [size] = useState({ w: initial?.w ?? 680, h: initial?.h ?? 420 })
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current) return
      const dx = e.clientX - drag.current.sx
      const dy = e.clientY - drag.current.sy
      setPos({ x: drag.current.ox + dx, y: drag.current.oy + dy })
    }
    const onUp = () => (drag.current = null)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const startDrag = (e: React.MouseEvent) => {
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
  }

  return (
    <div
      ref={ref}
      className="window"
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
    >
      <div className="window__titlebar" onMouseDown={startDrag}>
        <div className="window__title">{title}</div>
        <div className="window__buttons">
          <button className="win-btn close" aria-label="Cerrar" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="window__content">{children}</div>
    </div>
  )
}

