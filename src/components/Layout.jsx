import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AIAssistant from './AIAssistant'

export default function Layout({ user, onLogout }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Outlet />
      </div>
      <AIAssistant />
    </div>
  )
}
