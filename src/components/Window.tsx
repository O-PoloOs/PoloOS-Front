import React, { useEffect, useRef, useState } from 'react'

type Props = {
  title: string
  onClose: () => void
  children: React.ReactNode
  initial?: { x: number; y: number; w?: number; h?: number }
}

export default function Window({ title, onClose, children, initial }: Props) {
  const [pos, setPos] = useState({ x: initial?.x ?? 160, y: initial?.y ?? 120 })
  const [size, setSize] = useState({ w: initial?.w ?? 680, h: initial?.h ?? 420 })
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Track element resize (from CSS `resize`) and persist dimensions
    const el = ref.current
    if (!el) return
    // Initialize with provided size
    el.style.width = `${size.w}px`
    el.style.height = `${size.h}px`

    let ro: ResizeObserver | null = null
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Use border-box to match CSS width/height and avoid drift
          const anyEntry: any = entry as any
          let width: number
          let height: number
          if (anyEntry.borderBoxSize && anyEntry.borderBoxSize.length) {
            width = anyEntry.borderBoxSize[0].inlineSize
            height = anyEntry.borderBoxSize[0].blockSize
          } else {
            const rect = (entry.target as Element).getBoundingClientRect()
            width = rect.width
            height = rect.height
          }
          setSize((s) =>
            width !== s.w || height !== s.h ? { w: Math.round(width), h: Math.round(height) } : s,
          )
        }
      })
      ro.observe(el)
    }

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
      if (ro) ro.disconnect()
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

