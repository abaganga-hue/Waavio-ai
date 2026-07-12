import { clsx } from 'clsx'

export function Tag({ color = 'green', children, className }) {
  const colors = {
    green:  'bg-green-tag text-green',
    blue:   'bg-blue-tag text-blue',
    purple: 'bg-purple-tag text-purple',
    amber:  'bg-amber-tag text-amber',
    red:    'bg-red-tag text-red',
    teal:   'bg-teal-tag text-teal',
    pink:   'bg-pink-tag text-pink',
  }
  return (
    <span className={clsx('tag', colors[color], className)} style={tagStyle(color)}>
      {children}
    </span>
  )
}

function tagStyle(color) {
  const map = {
    green:  { background: 'rgba(0,212,160,0.12)',   color: 'var(--green)' },
    blue:   { background: 'rgba(59,130,246,0.12)',  color: 'var(--blue)' },
    purple: { background: 'rgba(139,92,246,0.12)',  color: 'var(--purple)' },
    amber:  { background: 'rgba(245,158,11,0.12)',  color: 'var(--amber)' },
    red:    { background: 'rgba(239,68,68,0.12)',   color: 'var(--red)' },
    teal:   { background: 'rgba(20,184,166,0.12)',  color: 'var(--teal)' },
    pink:   { background: 'rgba(236,72,153,0.12)',  color: 'var(--pink)' },
  }
  return { ...map[color], display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600 }
}

export function Card({ children, style, className, hover = true }) {
  return (
    <div
      className={clsx('card', className)}
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '18px 20px',
        transition: hover ? 'border-color 0.2s' : undefined,
        ...style
      }}
    >
      {children}
    </div>
  )
}

export function CardTitle({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
      {children}
    </div>
  )
}

export function Button({ children, variant = 'default', style, onClick, className }) {
  const base = {
    height: 32, padding: '0 14px', borderRadius: 8,
    border: '1px solid var(--border2)', background: 'var(--card)',
    color: 'var(--text2)', fontSize: 12, fontWeight: 500,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
    gap: 6, transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap',
  }
  const primary = {
    ...base,
    background: 'linear-gradient(135deg, var(--green), var(--blue))',
    border: 'none', color: '#fff',
    boxShadow: '0 0 14px rgba(0,212,160,0.25)',
  }
  return (
    <button
      onClick={onClick}
      style={variant === 'primary' ? { ...primary, ...style } : { ...base, ...style }}
      className={className}
    >
      {children}
    </button>
  )
}

export function Avatar({ initials, gradient = 'linear-gradient(135deg,#3b55d6,#00d4a0)', size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: gradient, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: size * 0.28, fontWeight: 700,
      color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 36, height: 20, borderRadius: 10, border: 'none',
        cursor: 'pointer', position: 'relative', flexShrink: 0,
        background: on ? 'var(--green)' : 'var(--bg3)',
        transition: 'background 0.2s',
        outline: on ? 'none' : '1px solid var(--border2)',
      }}
    >
      <span style={{
        position: 'absolute', width: 14, height: 14, borderRadius: '50%',
        background: '#fff', top: 3, left: on ? 19 : 3, transition: 'left 0.2s',
      }} />
    </button>
  )
}

export function Input({ placeholder, value, onChange, style }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
        borderRadius: 8, padding: '8px 12px', color: 'var(--text)',
        fontSize: 12, fontFamily: 'Inter, sans-serif', outline: 'none',
        ...style
      }}
    />
  )
}

export function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase',
      letterSpacing: '0.8px', marginBottom: 10, paddingBottom: 8,
      borderBottom: '1px solid var(--border)',
    }}>
      {children}
    </div>
  )
}
