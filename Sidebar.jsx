import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, ThumbsUp, Zap, Users, Settings, LogOut } from 'lucide-react'

const navItems = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Home' },
  { to: '/inbox',       icon: MessageSquare,   label: 'Inbox' },
  { to: '/chatbuilder', icon: ThumbsUp,        label: 'Builder' },
  { to: '/campaign',    icon: Zap,             label: 'Campaign' },
  { to: '/pipeline',    icon: Users,           label: 'Pipeline' },
]

export default function Sidebar({ user, onLogout }) {
  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : 'WA'

  return (
    <nav style={{
      width: 'var(--nav-w)', minWidth: 'var(--nav-w)', height: '100vh',
      background: 'var(--bg2)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '16px 0', gap: 4, flexShrink: 0, zIndex: 10,
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #3b55d6 0%, #00d4a0 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 18, color: '#fff',
          boxShadow: '0 0 20px rgba(0,212,160,0.35)',
        }}>W</div>
      </div>

      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, cursor: 'pointer', transition: 'all 0.2s',
              color: isActive ? 'var(--green)' : 'var(--text3)',
              background: isActive ? 'linear-gradient(135deg, rgba(0,212,160,0.15), rgba(59,130,246,0.1))' : 'transparent',
              border: isActive ? '1px solid rgba(0,212,160,0.25)' : '1px solid transparent',
              boxShadow: isActive ? '0 0 20px rgba(0,212,160,0.15)' : 'none',
            }}>
              <Icon size={20} strokeWidth={1.8} />
              <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.3px' }}>{label}</span>
            </div>
          )}
        </NavLink>
      ))}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <NavLink to="/settings" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, cursor: 'pointer',
              color: isActive ? 'var(--green)' : 'var(--text3)',
              background: isActive ? 'rgba(0,212,160,0.1)' : 'transparent',
              border: '1px solid transparent', transition: 'all 0.2s',
            }}>
              <Settings size={20} strokeWidth={1.8} />
              <span style={{ fontSize: 8, fontWeight: 600 }}>Settings</span>
            </div>
          )}
        </NavLink>

        {/* Logout */}
        <div onClick={onLogout} title="Logout" style={{
          width: 34, height: 34, borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text3)', transition: 'all 0.2s', border: '1px solid transparent',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent' }}
        >
          <LogOut size={16} strokeWidth={1.8} />
        </div>

        {/* User avatar */}
        <div title={user?.name} style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg,#3b55d6,#00d4a0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer', marginTop: 2,
        }}>{initials}</div>
      </div>
    </nav>
  )
}
