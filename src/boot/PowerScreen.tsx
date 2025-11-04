import React from 'react'
import { PowerIcon } from '../icons'

type Props = { onPower: () => void }

export default function PowerScreen({ onPower }: Props) {
  const handlePowerClick = () => {
    try {
      const el = document.documentElement as any
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
          el.requestFullscreen().catch(() => {})
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        }
      }
    } catch (_) {
      // Ignore fullscreen errors; still proceed to power on
    }
    onPower()
  }

  return (
    <div className="boot full-black">
      <div className="power-screen">
        <div className="power-logo" aria-hidden>
          <PowerIcon size={90} />
        </div>
        <button className="power-btn" onClick={handlePowerClick}>Encender</button>
      </div>
    </div>
  )
}
