import React from 'react'

type Props = {
  label: string
  icon: React.ReactNode
  onOpen: () => void
  top?: number
  left?: number
}

export default function DesktopIcon({ label, icon, onOpen, top = 24, left = 24 }: Props) {
  return (
    <button
      className="desktop-icon"
      style={{ top, left }}
      onDoubleClick={onOpen}
      title={label}
    >
      <div className="desktop-icon__art">{icon}</div>
      <span className="desktop-icon__label">{label}</span>
    </button>
  )
}

