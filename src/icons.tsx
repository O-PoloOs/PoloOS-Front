import React from 'react'

export const NotepadIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="8" width="44" height="48" rx="6" fill="#fff" stroke="#c9d0d9" strokeWidth="2"/>
    <rect x="10" y="8" width="44" height="8" rx="6" fill="#f0f4f8"/>
    <circle cx="18" cy="12" r="2" fill="#8aa2b7"/>
    <circle cx="26" cy="12" r="2" fill="#8aa2b7"/>
    <circle cx="34" cy="12" r="2" fill="#8aa2b7"/>
    <line x1="16" y1="24" x2="48" y2="24" stroke="#c5ccd6" strokeWidth="2"/>
    <line x1="16" y1="32" x2="48" y2="32" stroke="#c5ccd6" strokeWidth="2"/>
    <line x1="16" y1="40" x2="40" y2="40" stroke="#c5ccd6" strokeWidth="2"/>
  </svg>
)

export const ConsoleIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="48" height="40" rx="6" fill="#101826" stroke="#263041" strokeWidth="2"/>
    <circle cx="16" cy="20" r="2" fill="#ff5f56"/>
    <circle cx="22" cy="20" r="2" fill="#ffbd2e"/>
    <circle cx="28" cy="20" r="2" fill="#27c93f"/>
    <path d="M18 36l8-6-8-6" stroke="#9fb3c8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="30" y="32" width="14" height="3" rx="1.5" fill="#9fb3c8"/>
  </svg>
)

export const WindowsIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="var(--brand)" d="M3 6l19-3v21H3V6zm23-3l19-3v24H26V3zM3 27h19v18L3 42V27zm23 0h19v15l-19 3V27z"/>
  </svg>
)

export const FolderIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12a4 4 0 014-4h10l4 4h18a4 4 0 014 4v18a4 4 0 01-4 4H8a4 4 0 01-4-4V12z" fill="#f7c948"/>
    <path d="M4 20h40v16a4 4 0 01-4 4H8a4 4 0 01-4-4V20z" fill="#fadb5f"/>
  </svg>
)

export const SquareIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="3" fill="#dfe6f3"/>
  </svg>
)

export const EdgeIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 34c-3 7-12 10-18 6-5-3-6-9-2-13 5-5 13-2 14 5 1-7-5-12-12-12-9 0-16 7-16 16" stroke="#2fb6ff" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M9 30c0-10 9-18 20-18 2 0 4 0 6 1" stroke="#16d7a5" strokeWidth="4" fill="none" strokeLinecap="round"/>
  </svg>
)

export const VscodeIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33 6l9 6v24l-9 6-17-13 17-13z" fill="#2f80ed"/>
    <path d="M9 18l8 6-8 6-5-5 5-7z" fill="#4098ff"/>
  </svg>
)

export const PowerIcon: React.FC<{ size?: number }> = ({ size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2eea3b" floodOpacity="0.35"/>
      </filter>
    </defs>
    <g filter="url(#g)">
      <line x1="32" y1="12" x2="32" y2="28" stroke="var(--brand)" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="32" cy="36" r="18" stroke="var(--brand)" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="80 200" transform="rotate(-90 32 36)"/>
    </g>
  </svg>
)

export const ChatIcon: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chatBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a2336"/>
        <stop offset="100%" stopColor="#0f1729"/>
      </linearGradient>
    </defs>
    <rect x="8" y="10" width="48" height="36" rx="8" fill="url(#chatBg)" stroke="#2b3650" strokeWidth="2"/>
    <path d="M22 48l8-8h18a6 6 0 006-6" fill="#0f1729" stroke="#2b3650" strokeWidth="2"/>
    <circle cx="22" cy="28" r="3" fill="#a8c3ff"/>
    <circle cx="32" cy="28" r="3" fill="#a8c3ff"/>
    <circle cx="42" cy="28" r="3" fill="#a8c3ff"/>
  </svg>
)
