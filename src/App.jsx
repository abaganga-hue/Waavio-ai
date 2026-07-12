import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Inbox from './pages/Inbox'
import ChatBuilder from './pages/ChatBuilder'
import Campaign from './pages/Campaign'
import Pipeline from './pages/Pipeline'
import Settings from './pages/Settings'

export default function App() {
  const glowRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top  = e.clientY + 'px'
      }
    }
    const click = (e) => {
      const r = document.createElement('div')
      r.className = 'ripple'
      r.style.cssText = `left:${e.clientX - 20}px;top:${e.clientY - 20}px;width:40px;height:40px`
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 600)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('click', click)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('click', click)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"   element={<Dashboard />} />
          <Route path="inbox"       element={<Inbox />} />
          <Route path="chatbuilder" element={<ChatBuilder />} />
          <Route path="campaign"    element={<Campaign />} />
          <Route path="pipeline"    element={<Pipeline />} />
          <Route path="settings"    element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}
