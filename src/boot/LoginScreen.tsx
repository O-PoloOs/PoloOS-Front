import React from 'react'

type Props = { onLogin: () => void }

export default function LoginScreen({ onLogin }: Props) {
  const handleLoginClick = () => {
    onLogin()
  }
  return (
    <div className="boot full-black">
      <div className="login-card">
        <div className="avatar" aria-hidden>👤</div>
        <div className="username">Usuario</div>
        <button className="login-btn" onClick={handleLoginClick}>Iniciar sesión</button>
      </div>
    </div>
  )
}
