import { useState } from 'react'
import { Tag, Tag as T, ChevronRight, Hash, Clock, AlertCircle, FileEdit } from 'lucide-react'
import { Card, Button } from '../components/UI'

const FLOWS = [
  { id: 1, icon: '💬', name: 'Price / Cost / Rate',    desc: '3 keywords · Auto-reply with pricing card', status: 'Active', color: 'green' },
  { id: 2, icon: '📦', name: 'Delivery / Shipping',    desc: '5 keywords · Share tracking info',          status: 'Active', color: 'blue' },
  { id: 3, icon: '⚠️', name: 'Complaint / Issue',      desc: '8 keywords · Escalate to human agent',      status: 'Active', color: 'purple' },
  { id: 4, icon: '🔄', name: 'Refund / Cancel',        desc: '4 keywords · Draft pending',                status: 'Draft',  color: 'amber' },
]

import { TagIcon } from 'lucide-react'

export default function ChatBuilder() {
  const [selected, setSelected] = useState(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Chat Builder</span>
        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(0,212,160,0.12)', color: 'var(--green)', border: '1px solid rgba(0,212,160,0.2)' }}>AI Training</span>
        <Button variant="primary">+ New Flow</Button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Flow list */}
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Keyword Triggers</h2>
            {FLOWS.map(f => {
              const borderColor = { green: 'rgba(0,212,160,0.3)', blue: 'rgba(59,130,246,0.3)', purple: 'rgba(139,92,246,0.3)', amber: 'rgba(245,158,11,0.2)' }
              const bg = { green: 'rgba(0,212,160,0.12)', blue: 'rgba(59,130,246,0.12)', purple: 'rgba(139,92,246,0.12)', amber: 'rgba(245,158,11,0.1)' }
              return (
                <div key={f.id} onClick={() => setSelected(f.id)}
                  style={{
                    background: 'var(--card)', border: `1px solid ${selected === f.id ? borderColor[f.color] : 'var(--border)'}`,
                    borderRadius: 12, padding: '13px 15px', marginBottom: 8,
                    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                    transition: 'all 0.2s', opacity: f.status === 'Draft' ? 0.65 : 1,
                    background: selected === f.id ? `rgba(0,212,160,0.03)` : 'var(--card)',
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: bg[f.color], border: `1px solid ${borderColor[f.color]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{f.desc}</div>
                  </div>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: bg[f.color], color: `var(--${f.color})` }}>{f.status}</span>
                </div>
              )
            })}
          </div>

          {/* Flow preview */}
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Flow Preview: {FLOWS.find(f => f.id === selected)?.name}</h2>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'TRIGGER', color: 'var(--green)', border: 'rgba(0,212,160,0.15)', text: 'Customer sends: "price", "cost", "rate", "kitna"' },
                ].map((b, i) => (
                  <div key={i} style={{ background: 'var(--bg3)', borderRadius: 10, padding: 12, border: `1px solid ${b.border}` }}>
                    <div style={{ fontSize: 10, color: b.color, fontWeight: 700, marginBottom: 4 }}>{b.label}</div>
                    <div style={{ fontSize: 12 }}>{b.text}</div>
                  </div>
                ))}
                <div style={{ textAlign: 'center', fontSize: 18, color: 'var(--text3)' }}>↓</div>
                <div style={{ background: 'var(--bg3)', borderRadius: 10, padding: 12, border: '1px solid rgba(59,130,246,0.15)' }}>
                  <div style={{ fontSize: 10, color: 'var(--blue)', fontWeight: 700, marginBottom: 4 }}>AI CHECK</div>
                  <div style={{ fontSize: 12 }}>Is product category mentioned?</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: 10, padding: 10, border: '1px solid rgba(0,212,160,0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>YES</div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>Send product price list</div>
                  </div>
                  <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: 10, padding: 10, border: '1px solid rgba(245,158,11,0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700 }}>NO</div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>Ask: which product?</div>
                  </div>
                </div>
                <div style={{ background: 'var(--bg3)', borderRadius: 10, padding: 12, border: '1px solid rgba(139,92,246,0.15)' }}>
                  <div style={{ fontSize: 10, color: 'var(--purple)', fontWeight: 700, marginBottom: 4 }}>RESPONSE</div>
                  <div style={{ fontSize: 12 }}>Send catalog image + CTA button for order</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <Button style={{ flex: 1, justifyContent: 'center' }}>Edit Flow</Button>
                <Button variant="primary" style={{ flex: 1, justifyContent: 'center' }}>Test Flow</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
