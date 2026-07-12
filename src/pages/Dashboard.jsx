import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Card, CardTitle, Button, Tag } from '../components/UI'

const BARS_G = [35,50,42,65,58,80,100]
const BARS_B = [60,72,68,75,70,82,100]
const BARS_P = [40,55,48,70,80,90,100]
const BARS_A = [30,45,38,55,62,80,100]

function MiniBar({ heights, color }) {
  const grad = {
    green:  'linear-gradient(to top, var(--green2), var(--green))',
    blue:   'linear-gradient(to top, var(--blue2), var(--blue))',
    purple: 'var(--purple)',
    amber:  'var(--amber)',
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72, marginTop: 14 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ flex: 1, borderRadius: '4px 4px 0 0', minHeight: 4, background: grad[color], height: `${h}%`, transition: 'filter 0.2s', cursor: 'pointer' }} />
      ))}
    </div>
  )
}

function StatCard({ label, value, change, changeLabel, heights, color }) {
  const accent = { green: 'rgba(0,212,160,0.07)', blue: 'rgba(59,130,246,0.08)', purple: 'rgba(139,92,246,0.08)', amber: 'rgba(245,158,11,0.08)' }
  const textColor = { green: 'var(--green)', blue: 'var(--blue)', purple: 'var(--purple)', amber: 'var(--amber)' }
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16,
      padding: '18px 20px', position: 'relative', overflow: 'hidden', transition: 'all 0.25s', cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: 90, height: 90, borderRadius: '0 16px 0 90px', background: accent[color] }} />
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 700, margin: '6px 0 4px', color: textColor[color] }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text3)' }}>
        <span style={{ color: 'var(--green)', fontWeight: 600 }}>{change}</span> {changeLabel}
      </div>
      <MiniBar heights={heights} color={color} />
    </div>
  )
}

const campaigns = [
  { name: 'Summer Sale Blast', detail: '12,400 recipients · Text', tag: 'Running', tagColor: 'green', meta: '82% opened' },
  { name: 'Product Launch Video', detail: '5,200 recipients · Video', tag: 'Scheduled', tagColor: 'blue', meta: 'Jun 28, 10:00 AM' },
  { name: 'Welcome Flow', detail: 'Always-on · Auto-reply', tag: 'Live', tagColor: 'green', meta: 'Automated' },
  { name: 'Festival Poster Drop', detail: '8,900 recipients · Image', tag: 'Draft', tagColor: 'amber', meta: 'Not sent' },
]

const activities = [
  { dot: 'green', text: <><strong>Summer Sale</strong> delivered to <strong>284</strong> contacts</>, time: '2 min ago' },
  { dot: 'blue',  text: <><strong>Priya</strong> replied to Anand Kumar's inquiry</>, time: '5 min ago' },
  { dot: 'amber', text: <>New lead <strong>Meena S</strong> entered pipeline</>, time: '12 min ago' },
  { dot: 'purple',text: <>AI auto-replied to <strong>18</strong> product queries</>, time: '14 min ago' },
  { dot: 'green', text: <><strong>Festival Poster</strong> scheduled for 10:00 AM</>, time: '20 min ago' },
]

const team = [
  { initials: 'SA', name: 'Sathish A', pct: 92, color: 'var(--green)',  grad: 'linear-gradient(135deg,#3b55d6,#00d4a0)' },
  { initials: 'PK', name: 'Priya K',   pct: 78, color: 'var(--blue)',   grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
  { initials: 'RJ', name: 'Raj J',     pct: 65, color: 'var(--amber)',  grad: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
]

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Topbar */}
      <div style={{ height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Dashboard</span>
        <Tag color="green">● Live</Tag>
        <Button><Upload size={13} /> Export</Button>
        <Button variant="primary">+ New Campaign</Button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Messages Sent" value="48,291" change="↑ 18.4%" changeLabel="this month" heights={BARS_G} color="green" />
          <StatCard label="Open Rate"     value="78.3%"  change="↑ 4.2%"  changeLabel="vs last week" heights={BARS_B} color="blue" />
          <StatCard label="Active Leads"  value="1,847"  change="+124"     changeLabel="this week" heights={BARS_P} color="purple" />
          <StatCard label="Response Rate" value="34.7%"  change="↑ 2.1%"  changeLabel="vs average" heights={BARS_A} color="amber" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card>
              <CardTitle>Active Campaigns</CardTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {campaigns.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg3)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{c.detail}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Tag color={c.tagColor}>{c.tag}</Tag>
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>{c.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardTitle>Team Performance</CardTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {team.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{t.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ height: 4, background: 'var(--bg3)', borderRadius: 2, marginTop: 5 }}>
                        <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 2 }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: t.color, fontWeight: 600 }}>{t.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card>
              <CardTitle>Live Activity</CardTitle>
              {activities.map((a, i) => {
                const dotColors = { green: 'var(--green)', blue: 'var(--blue)', amber: 'var(--amber)', purple: 'var(--purple)' }
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: i < activities.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColors[a.dot], boxShadow: `0 0 8px ${dotColors[a.dot]}`, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{a.text}</div>
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{a.time}</div>
                    </div>
                  </div>
                )
              })}
            </Card>

            <Card>
              <CardTitle>Quick Stats</CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { value: '99.1%', label: 'Delivery Rate', color: 'var(--teal)' },
                  { value: '0.4%',  label: 'Ban Risk',       color: 'var(--pink)' },
                  { value: '₹2.4L', label: 'Revenue Driven', color: 'var(--green)' },
                  { value: '3',     label: 'Team Members',   color: 'var(--blue)' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: 14, background: 'var(--bg3)', borderRadius: 10, textAlign: 'center', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
