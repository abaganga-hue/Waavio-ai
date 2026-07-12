import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react'

export default function Auth({ onLogin }) {
  const [mode, setMode]         = useState('login') // login | signup | forgot
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors]     = useState({})

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (mode === 'signup') {
      if (!form.name.trim())    e.name     = 'Name is required'
      if (!form.phone.trim())   e.phone    = 'Phone is required'
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
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    if (mode === 'forgot') { setDone(true); return }
    onLogin({ name: form.name || 'Sathish A', email: form.email })
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,160,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Floating stats */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', animation: 'float1 4s ease-in-out infinite' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)' }}>48,291</div>
        <div style={{ fontSize: 10, color: 'var(--text3)' }}>Messages Sent</div>
      </div>
      <div style={{ position: 'absolute', top: '30%', right: '7%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', animation: 'float2 5s ease-in-out infinite' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue)' }}>78.3%</div>
        <div style={{ fontSize: 10, color: 'var(--text3)' }}>Open Rate</div>
      </div>
      <div style={{ position: 'absolute', bottom: '25%', left: '6%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', animation: 'float1 6s ease-in-out infinite' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--purple)' }}>1,847</div>
        <div style={{ fontSize: 10, color: 'var(--text3)' }}>Active Leads</div>
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '8%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', animation: 'float2 4.5s ease-in-out infinite' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--amber)' }}>99.1%</div>
        <div style={{ fontSize: 10, color: 'var(--text3)' }}>Delivery Rate</div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        @keyframes spin { to { transform: rotate(360deg) } }
        .auth-input:focus { border-color: var(--green) !important; box-shadow: 0 0 0 3px rgba(0,212,160,0.1) !important; }
        .auth-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,160,0.35) !important; }
        .mode-tab:hover { color: var(--text) !important; }
      `}</style>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 420, background: 'var(--card)',
        border: '1px solid var(--border2)', borderRadius: 24,
        padding: 36, position: 'relative', zIndex: 10,
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        animation: 'fadeIn 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #3b55d6 0%, #00d4a0 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 18, color: '#fff',
            boxShadow: '0 0 20px rgba(0,212,160,0.35)',
          }}>W</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Waavio</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.5px' }}>CONVERSATIONS THAT DRIVE GROWTH</div>
          </div>
        </div>

        {/* Mode tabs */}
        {mode !== 'forgot' && (
          <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 3, marginBottom: 24, border: '1px solid var(--border)' }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}) }} className="mode-tab"
                style={{
                  flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                  background: mode === m ? 'var(--card2)' : 'transparent',
                  color: mode === m ? 'var(--text)' : 'var(--text3)',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>
        )}

        {/* Heading */}
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset password'}
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>
            {mode === 'login' ? 'Sign in to your Waavio workspace' : mode === 'signup' ? 'Start your WhatsApp marketing journey' : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {/* Forgot success */}
        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,212,160,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Check size={24} color="var(--green)" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Reset link sent!</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20 }}>Check your email at {form.email}</div>
            <button onClick={() => { setMode('login'); setDone(false) }} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>← Back to Sign In</button>
          </div>
        ) : (
          <>
            {/* Form fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {mode === 'signup' && (
                <Field label="Full Name" icon={<User size={14} />} error={errors.name}>
                  <input className="auth-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Sathish Arumugam" style={inputStyle} />
                </Field>
              )}

              <Field label="Email Address" icon={<Mail size={14} />} error={errors.email}>
                <input className="auth-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="sathish@waavio.com" type="email" style={inputStyle} />
              </Field>

              {mode === 'signup' && (
                <Field label="WhatsApp Number" icon={<Phone size={14} />} error={errors.phone}>
                  <input className="auth-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" style={inputStyle} />
                </Field>
              )}

              {mode !== 'forgot' && (
                <Field label="Password" icon={<Lock size={14} />} error={errors.password}>
                  <div style={{ position: 'relative' }}>
                    <input className="auth-input" value={form.password} onChange={e => set('password', e.target.value)} placeholder={mode === 'signup' ? 'Min 8 characters' : '••••••••'} type={showPass ? 'text' : 'password'} style={{ ...inputStyle, paddingRight: 40 }} />
                    <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 0 }}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </Field>
              )}

              {mode === 'signup' && (
                <Field label="Confirm Password" icon={<Lock size={14} />} error={errors.confirm}>
                  <input className="auth-input" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Re-enter password" type="password" style={inputStyle} />
                </Field>
              )}
            </div>

            {/* Forgot password link */}
            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <button onClick={() => { setMode('forgot'); setErrors({}) }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms for signup */}
            {mode === 'signup' && (
              <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 12, lineHeight: 1.5 }}>
                By signing up you agree to our <span style={{ color: 'var(--blue)', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: 'var(--blue)', cursor: 'pointer' }}>Privacy Policy</span>.
              </div>
            )}

            {/* Submit button */}
            <button onClick={submit} className="auth-btn"
              style={{
                width: '100%', marginTop: 20, height: 44, borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, var(--green), var(--blue))',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Inter,sans-serif', transition: 'all 0.2s',
                boxShadow: '0 4px 16px rgba(0,212,160,0.25)',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            {/* Google button */}
            <button style={{
              width: '100%', height: 40, borderRadius: 10, border: '1px solid var(--border2)',
              background: 'var(--bg3)', color: 'var(--text)', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, fontFamily: 'Inter,sans-serif', transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Mode switch */}
            {mode === 'forgot' ? (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <button onClick={() => { setMode('login'); setErrors({}) }} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  ← Back to Sign In
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text3)' }}>
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}) }}
                  style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  {mode === 'login' ? 'Sign up free' : 'Sign in'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
        {icon} {label}
      </label>
      {children}
      {error && <div style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>⚠ {error}</div>}
    </div>
  )
}

const inputStyle = {
  width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
  borderRadius: 10, padding: '10px 14px', color: 'var(--text)',
  fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none',
  transition: 'all 0.2s',
}
