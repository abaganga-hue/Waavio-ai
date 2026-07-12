import { useState } from 'react'
import { MessageSquare, Image, Video, Lightbulb, Instagram, FileText } from 'lucide-react'
import { Card, Button, Tag, Input } from '../components/UI'

const TYPES = [
  { id: 'text',      icon: MessageSquare, label: 'Text Message',    desc: 'Personalised bulk text messages with variables',    color: 'var(--green)',  bg: 'rgba(0,212,160,0.12)',  badge: null },
  { id: 'image',     icon: Image,         label: 'Image Poster',    desc: 'Send promotional posters and banners',              color: 'var(--blue)',   bg: 'rgba(59,130,246,0.12)', badge: null },
  { id: 'video',     icon: Video,         label: 'Short Video',     desc: 'Send product videos, reels and clips',             color: 'var(--purple)', bg: 'rgba(139,92,246,0.12)',badge: null },
  { id: 'gemini',    icon: Lightbulb,     label: 'Gemini AI Poster',desc: 'Generate posters with Google Gemini AI',           color: '#4285F4',       bg: 'rgba(66,133,244,0.12)', badge: 'AI' },
  { id: 'instagram', icon: Instagram,     label: 'Instagram Share', desc: 'Share Instagram posts and reels directly',         color: 'var(--pink)',   bg: 'rgba(236,72,153,0.12)', badge: 'NEW' },
  { id: 'document',  icon: FileText,      label: 'Document',        desc: 'Send PDF catalogs, menus, brochures',              color: 'var(--teal)',   bg: 'rgba(20,184,166,0.12)', badge: null },
]

export default function Campaign() {
  const [selected, setSelected]   = useState('text')
  const [prompt, setPrompt]       = useState('')
  const [igUrl, setIgUrl]         = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated]   = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Campaign Builder</span>
        <Button>Templates</Button>
        <Button variant="primary">+ Create Campaign</Button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Choose Campaign Type</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {TYPES.map(t => {
            const Icon = t.icon
            const isSelected = selected === t.id
            return (
              <div key={t.id} onClick={() => setSelected(t.id)}
                style={{
                  background: isSelected ? `rgba(0,212,160,0.04)` : 'var(--card)',
                  border: `1px solid ${isSelected ? 'var(--green)' : 'var(--border)'}`,
                  borderRadius: 14, padding: 16, cursor: 'pointer',
                  transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                  boxShadow: isSelected ? '0 0 20px rgba(0,212,160,0.1)' : 'none',
                }}
              >
                {t.badge && (
                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Tag color={t.badge === 'AI' ? 'purple' : 'pink'}>{t.badge}</Tag>
                  </div>
                )}
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Icon size={20} color={t.color} strokeWidth={1.8} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.desc}</div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Gemini Poster */}
          <Card>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Gemini AI Poster Creator</div>
            <div style={{ background: 'var(--bg3)', borderRadius: 10, border: '1px dashed rgba(66,133,244,0.3)', margin: '10px 0 12px', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              {generated ? (
                <div style={{ width: '100%', height: '100%', borderRadius: 10, background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>
                  🎉 Summer Sale — 30% OFF!
                </div>
              ) : (
                <div>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#4285F4,#EA4335,#FBBC05,#34A853)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 16 }}>G</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{generating ? 'Generating...' : 'Poster preview appears here'}</div>
                </div>
              )}
            </div>
            <Input placeholder="Describe: 'Summer sale 30% off, bright colors, modern style'" value={prompt} onChange={e => setPrompt(e.target.value)} style={{ marginBottom: 8 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleGenerate} disabled={generating} style={{ flex: 1, height: 32, borderRadius: 8, background: generating ? 'var(--card2)' : 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.25)', color: '#4285F4', fontSize: 11, fontWeight: 500, cursor: generating ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif' }}>
                {generating ? '✨ Generating...' : '✨ Generate with Gemini'}
              </button>
              <Button style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>Upload Image</Button>
            </div>
          </Card>

          {/* Instagram Share */}
          <Card>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Instagram Content Sharing</div>
            <div style={{ padding: 10, background: 'var(--bg3)', borderRadius: 10, border: '1px solid rgba(236,72,153,0.15)', margin: '10px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Instagram size={16} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Paste Instagram URL</div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>Post or Reel · Auto-download and share</div>
              </div>
            </div>
            <Input placeholder="https://instagram.com/p/..." value={igUrl} onChange={e => setIgUrl(e.target.value)} style={{ marginBottom: 10 }} />
            <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>Share to WhatsApp Campaign</Button>
            <div style={{ marginTop: 10, padding: 9, background: 'rgba(236,72,153,0.05)', borderRadius: 8, border: '1px solid rgba(236,72,153,0.1)' }}>
              <div style={{ fontSize: 10, color: 'var(--pink)', fontWeight: 700, marginBottom: 2 }}>NOTE</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>Connect Instagram in Settings → Integrations before sharing content.</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
