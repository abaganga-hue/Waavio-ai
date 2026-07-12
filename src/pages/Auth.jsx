import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react'
import { api } from '../api'

export default function Auth({ onLogin }) {
  const [mode, setMode]         = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [error, setError]       = useState('')
  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors]     = useState({})

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); setError('') }

  const validate = () => {
    const e = {}
    if (mode === 'signup') {
      if (!form.name.trim())        e.name     = 'Name is required'
      if (!form.phone.trim())       e.phone    = 'Phone is required'
      if (form.password.length < 8) e.password = 'Min 8 characters'
      if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    }
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (mode !== 'forgot' && !form.password) e.password = 'Password required'
    return e
  }

  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true); setError('')
    try {
      if (mode === 'forgot') {
        await new Promise(r => setTimeout(r, 1000))
        setDone(true)
      } else if (mode === 'login') {
        const data = await api.login({ email: form.email, password: form.password })
        localStorage.setItem('waavio_token', data.token)
        onLogin(data.user)
      } else {
        const data = await api.signup({ name: form.name, email: form.email, phone: form.phone, password: form.password })
        localStorage.setItem('waavio_token', data.token)
        onLogin(data.user)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,160,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {[
        { value: '48,291', label: 'Messages Sent', color: 'var(--green)', pos: { top: '15%', left: '8%' }, anim: 'float1 4s ease-in-out infinite' },
        { value: '78.3%',  label: 'Open Rate',     color: 'var(--blue)',  pos: { top: '30%', right: '7%' }, anim: 'float2 5s ease-in-out infinite' },
        { value: '1,847',  label: 'Active Leads',  color: 'var(--purple)',pos: { bottom: '25%', left: '6%' }, anim: 'float1 6s ease-in-out infinite' },
        { value: '99.1%',  label: 'Delivery Rate', color: 'var(--amber)', pos: { bottom: '20%', right: '8%' }, anim: 'float2 4.5s ease-in-out infinite' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', ...s.pos, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', animation: s.anim }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          <div style={{ fontSize: 10, color: 'var(--text3)' }}>{s.label}</div>
        </div>
      ))}

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        @keyframes spin { to { transform: rotate(360deg) } }
        .auth-input:focus { border-color: var(--green) !important; box-shadow: 0 0 0 3px rgba(0,212,160,0.1) !important; outline: none; }
        .auth-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,160,0.35) !important; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 420, background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 24, padding: 36, position: 'relative', zIndex: 10, boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #3b55d6 0%, #00d4a0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#fff', boxShadow: '0 0 20px rgba(0,212,160,0.35)' }}>W</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Waavio</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px' }}>CONVERSATIONS THAT DRIVE GROWTH</div>
          </div>
        </div>

        {mode !== 'forgot' && (
          <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 3, marginBottom: 24, border: '1px solid var(--border)' }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); setError('') }}
                style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', background: mode === m ? 'var(--card2)' : 'transparent', color: mode === m ? 'var(--text)' : 'var(--text3)' }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset password'}
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>
            {mode === 'login' ? 'Sign in to your Waavio workspace' : mode === 'signup' ? 'Start your WhatsApp marketing journey' : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--red)', marginBottom: 14 }}>
            ⚠ {error}
          </div>
        )}

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,212,160,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Check size={24} color="var(--green)" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Reset link sent!</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20 }}>Check your email at {form.email}</div>
            <button onClick={() => { setMode('login'); setDone(false) }} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>← Back to Sign In</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mode === 'signup' && <Field label="Full Name" icon={<User size={14} />} error={errors.name}><input className="auth-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" style={inp} /></Field>}
              <Field label="Email Address" icon={<Mail size={14} />} error={errors.email}><input className="auth-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" type="email" style={inp} /></Field>
              {mode === 'signup' && <Field label="WhatsApp Number" icon={<Phone size={14} />} error={errors.phone}><input className="auth-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" style={inp} /></Field>}
              {mode !== 'forgot' && (
                <Field label="Password" icon={<Lock size={14} />} error={errors.password}>
                  <div style={{ position: 'relative' }}>
                    <input className="auth-input" value={form.password} onChange={e => set('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder={mode === 'signup' ? 'Min 8 characters' : '••••••••'} type={showPass ? 'text' : 'password'} style={{ ...inp, paddingRight: 40 }} />
                    <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 0 }}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </Field>
              )}
              {mode === 'signup' && <Field label="Confirm Password" icon={<Lock size={14} />} error={errors.confirm}><input className="auth-input" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Re-enter password" type="password" style={inp} /></Field>}
            </div>

            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <button onClick={() => { setMode('forgot'); setErrors({}) }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Forgot password?</button>
              </div>
            )}

            <button onClick={submit} disabled={loading} className="auth-btn"
              style={{ width: '100%', marginTop: 20, height: 44, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--green), var(--blue))', color: '#fff', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Inter,sans-serif', transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(0,212,160,0.25)', opacity: loading ? 0.8 : 1 }}>
              {loading
                ? <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : <>{mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}<ArrowRight size={16} /></>
              }
            </button>

            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text3)' }}>
              {mode === 'forgot'
                ? <button onClick={() => { setMode('login'); setErrors({}) }} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>← Back to Sign In</button>
                : <>{mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); setError('') }} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                      {mode === 'login' ? 'Sign up free' : 'Sign in'}
                    </button>
                  </>
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>{icon} {label}</label>
      {children}
      {error && <div style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>⚠ {error}</div>}
    </div>
  )
}

const inp = { width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 10, padding: '10px 14px', color: 'var(--text)', fontSize: 13, fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }
