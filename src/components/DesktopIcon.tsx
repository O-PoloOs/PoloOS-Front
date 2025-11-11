import React from 'react'

type Props = {
  label: string
  icon: React.ReactNode
  onOpen: () => void
  top?: number
  left?: number
  zIndex?: number
}

export default function DesktopIcon({ label, icon, onOpen, top = 24, left = 24, zIndex = 1 }: Props) {
  return (
    <button
      className="desktop-icon"
      style={{ top, left, zIndex }}
      onDoubleClick={onOpen}
      title={label}
    >
      <div className="desktop-icon__art">{icon}</div>
      <span className="desktop-icon__label">{label}</span>
    </button>
  )
}

