import { useState } from 'react'
import { ChevronRight, ExternalLink, LogOut, Upload } from 'lucide-react'
import { Card, Button, Tag, Toggle, SectionTitle } from '../components/UI'

const INTEGRATIONS = [
  { name: 'WhatsApp Business API', desc: 'Meta Cloud API · Connected',        connected: true },
  { name: 'Instagram',             desc: 'Share reels and posts to campaigns', connected: false },
  { name: 'Google Gemini AI',      desc: 'Poster generation and AI replies',   connected: true },
  { name: 'Meta Business Manager', desc: 'Business verification · Active',     connected: true, label: 'Verified' },
]

const TEAM = [
  { initials: 'SA', name: 'Sathish A', role: 'Admin · Owner', tagColor: 'green', tag: 'Admin', grad: 'linear-gradient(135deg,#3b55d6,#00d4a0)' },
  { initials: 'PK', name: 'Priya K',   role: 'Agent · Sales', tagColor: 'blue',  tag: 'Agent', grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
]

export default function Settings() {
  const [prefs, setPrefs] = useState({ darkMode: true, aiReply: true, roundRobin: true })

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const SettingsRow = ({ label, desc, right, onClick }) => (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 8, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.15s' }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--card2)' } }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)' }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{desc}</div>}
      </div>
      {right}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Settings</span>
        <Button>User Guide</Button>
        <Button variant="primary">Upgrade to Pro</Button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left column */}
          <div>
            <SectionTitle>Integrations</SectionTitle>
            {INTEGRATIONS.map((ig, i) => (
              <SettingsRow key={i} label={ig.name} desc={ig.desc}
                right={
                  <button style={{ padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'Inter,sans-serif', background: ig.connected ? 'rgba(0,212,160,0.12)' : 'rgba(59,130,246,0.12)', color: ig.connected ? 'var(--green)' : 'var(--blue)' }}>
                    {ig.label ?? (ig.connected ? 'Connected' : 'Connect')}
                  </button>
                }
              />
            ))}

            <div style={{ marginTop: 20 }}>
              <SectionTitle>Team Members</SectionTitle>
              {TEAM.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                  <Tag color={t.tagColor}>{t.tag}</Tag>
                </div>
              ))}
              <Button style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>+ Invite Team Member</Button>
            </div>

            <div style={{ marginTop: 20 }}>
              <SectionTitle>Data Import</SectionTitle>
              <div style={{ background: 'var(--card)', border: '1px dashed var(--border2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                <Upload size={28} color="var(--text3)" style={{ margin: '0 auto 10px', display: 'block' }} />
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>Upload customer data</div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>CSV, Excel, Word supported</div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
                  <Tag color="blue">CSV</Tag>
                  <Tag color="green">Excel</Tag>
                  <Tag color="purple">Word</Tag>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <SectionTitle>Preferences</SectionTitle>
            <SettingsRow label="Dark Mode"    desc="Currently enabled"             right={<Toggle on={prefs.darkMode}    onToggle={() => toggle('darkMode')} />} />
            <SettingsRow label="Language"     desc="English (India)"               right={<ChevronRight size={14} color="var(--text3)" />} onClick={() => {}} />
            <SettingsRow label="Country / Region" desc="India · +91"              right={<ChevronRight size={14} color="var(--text3)" />} onClick={() => {}} />
            <SettingsRow label="AI Auto-Reply" desc="Reply outside business hours" right={<Toggle on={prefs.aiReply}    onToggle={() => toggle('aiReply')} />} />
            <SettingsRow label="Round Robin"  desc="Auto-assign chats to team"     right={<Toggle on={prefs.roundRobin} onToggle={() => toggle('roundRobin')} />} />

            <div style={{ marginTop: 20 }}>
              <SectionTitle>Account</SectionTitle>
              <SettingsRow label="Profile"    desc="Sathish A · sathish@waavio.com" right={<ChevronRight size={14} color="var(--text3)" />} onClick={() => {}} />
              <SettingsRow label="User Guide" desc="How to connect Meta, WhatsApp, Instagram" right={<ExternalLink size={14} color="var(--blue)" />} onClick={() => {}} />
              <SettingsRow label={<span style={{ color: 'var(--red)' }}>Logout</span>} desc="Sign out of Waavio" right={<LogOut size={14} color="var(--red)" />} onClick={() => {}} />
            </div>

            {/* Pro upgrade */}
            <div style={{ marginTop: 20, background: 'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.08))', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--purple)', marginBottom: 5 }}>✦ Waavio Pro</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 14, lineHeight: 1.6 }}>
                Unlimited messages · Priority support · Advanced analytics · White-label
              </div>
              <Button variant="primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg,var(--purple),var(--blue))' }}>
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
