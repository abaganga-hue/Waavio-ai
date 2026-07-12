import { useState } from 'react'
import { Send, Paperclip, Sparkles } from 'lucide-react'
import { Tag, Button, Avatar } from '../components/UI'

const CONTACTS = [
  { id: 1, initials: 'AK', name: 'Anand Kumar', preview: 'Hi, I wanted to ask about the summer...', time: '2m', unread: 3, grad: 'linear-gradient(135deg,#3b55d6,#00d4a0)', online: true },
  { id: 2, initials: 'MS', name: 'Meena S',     preview: 'What is the price for the pro plan?',   time: '8m', unread: 0, grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)', online: false },
  { id: 3, initials: 'RV', name: 'Rahul Verma', preview: 'Thanks! Got the catalogue you sent.',   time: '15m', unread: 0, grad: 'linear-gradient(135deg,#f59e0b,#ef4444)', online: false },
  { id: 4, initials: 'SP', name: 'Suresh P',    preview: 'Can I get a discount for bulk order?',  time: '22m', unread: 1, grad: 'linear-gradient(135deg,#14b8a6,#3b82f6)', online: true },
  { id: 5, initials: 'DM', name: 'Divya M',     preview: 'I need to change my delivery address.', time: '1h',  unread: 0, grad: 'linear-gradient(135deg,#6366f1,#8b5cf6)', online: false },
]

const MESSAGES = [
  { from: 'in',  text: "Hi! I wanted to ask about the summer sale. Is the 30% discount applicable on all products?" },
  { from: 'out', text: "Hello Anand! Yes, the 30% discount applies to all products in our catalog. You can browse at waavio.shop/summer 🎉" },
  { from: 'in',  text: "Great! Does it work for bulk orders too? I'm looking to order about 50 units." },
  { from: 'out', text: "For bulk orders of 50+ units, we have a special 38% discount! Let me connect you with our sales team for a custom quote." },
  { from: 'in',  text: "That sounds amazing! Please do connect me. Also, what's the delivery timeline?" },
]

const AI_REPLY = "Delivery for bulk orders is 5–7 business days. Our sales manager will call you within 2 hours. What's your preferred time slot?"

export default function Inbox() {
  const [active, setActive]     = useState(1)
  const [messages, setMessages] = useState(MESSAGES)
  const [input, setInput]       = useState('')

  const contact = CONTACTS.find(c => c.id === active)

  const sendMsg = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { from: 'out', text: input }])
    setInput('')
  }

  const useAI = () => setInput(AI_REPLY)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Topbar */}
      <div style={{ height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Team Inbox</span>
        <Tag color="green">● 23 Online</Tag>
        <Button>Round Robin: ON</Button>
        <Button variant="primary">+ Assign Chat</Button>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: 16 }}>
        <div style={{ display: 'flex', height: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>

          {/* Contact List */}
          <div style={{ width: 270, minWidth: 270, background: 'var(--card)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
              <input placeholder="Search chats..." style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 10px', color: 'var(--text)', fontSize: 11, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, padding: '8px 10px', borderBottom: '1px solid var(--border)' }}>
              <Tag color="green" style={{ cursor: 'pointer' }}>All (47)</Tag>
              <Tag color="blue" style={{ cursor: 'pointer' }}>Mine (12)</Tag>
              <Tag color="amber" style={{ cursor: 'pointer' }}>Unread (8)</Tag>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {CONTACTS.map(c => (
                <div key={c.id} onClick={() => setActive(c.id)}
                  style={{
                    padding: '13px 14px', cursor: 'pointer', borderBottom: '1px solid var(--border)',
                    transition: 'background 0.15s',
                    background: active === c.id ? 'linear-gradient(135deg,rgba(0,212,160,0.08),rgba(59,130,246,0.05))' : 'transparent',
                    borderLeft: active === c.id ? '2px solid var(--green)' : '2px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar initials={c.initials} gradient={c.grad} size={36} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--text3)' }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>{c.preview}</div>
                    </div>
                    {c.unread > 0 && (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--green)', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div style={{ flex: 1, background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--card)', flexShrink: 0 }}>
              <Avatar initials={contact.initials} gradient={contact.grad} size={32} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{contact.name}</div>
                <div style={{ fontSize: 10, color: contact.online ? 'var(--green)' : 'var(--text3)' }}>
                  {contact.online ? '● Online' : '● Offline'}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                <Tag color="blue">Assigned: Priya K</Tag>
                <Tag color="amber">Warm Lead</Tag>
                <Button style={{ height: 28, fontSize: 11 }}>Reassign</Button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  maxWidth: '65%', padding: '10px 14px', borderRadius: 14,
                  fontSize: 12, lineHeight: 1.6,
                  ...(m.from === 'in'
                    ? { background: 'var(--card)', borderRadius: '4px 14px 14px 14px', alignSelf: 'flex-start', border: '1px solid var(--border)' }
                    : { background: 'linear-gradient(135deg,rgba(0,212,160,0.18),rgba(59,130,246,0.12))', borderRadius: '14px 4px 14px 14px', alignSelf: 'flex-end', border: '1px solid rgba(0,212,160,0.2)' }
                  )
                }}>
                  {m.text}
                </div>
              ))}
              <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text3)', padding: '4px 0' }}>— AI suggested reply —</div>
              <div onClick={useAI} style={{
                maxWidth: '65%', padding: '10px 14px', borderRadius: '14px 4px 14px 14px',
                fontSize: 12, lineHeight: 1.6, alignSelf: 'flex-end',
                background: 'linear-gradient(135deg,rgba(0,212,160,0.18),rgba(59,130,246,0.12))',
                border: '1px dashed rgba(0,212,160,0.35)', opacity: 0.6, cursor: 'pointer',
              }}>
                {AI_REPLY}
              </div>
            </div>

            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--card)', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg3)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paperclip size={14} />
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Type a reply..."
                style={{ flex: 1, background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 10, padding: '8px 12px', color: 'var(--text)', fontSize: 12, fontFamily: 'Inter,sans-serif', outline: 'none' }}
              />
              <button onClick={useAI} style={{ height: 32, padding: '0 10px', borderRadius: 8, background: 'rgba(139,92,246,0.12)', color: 'var(--purple)', border: '1px solid rgba(139,92,246,0.2)', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter,sans-serif' }}>
                <Sparkles size={12} /> AI Draft
              </button>
              <button onClick={sendMsg} style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,var(--green),var(--blue))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Info panel */}
          <div style={{ width: 220, minWidth: 220, background: 'var(--card)', borderLeft: '1px solid var(--border)', padding: 16, overflowY: 'auto' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>Contact Info</div>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <Avatar initials={contact.initials} gradient={contact.grad} size={48} style={{ margin: '0 auto 6px' }} />
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>{contact.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>+91 98765 43210</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
              {[['Stage', <Tag color="amber">Warm Lead</Tag>], ['Assigned', 'Priya K'], ['Source', 'Campaign'], ['Chats', '7 total']].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: 'var(--text3)' }}>{k}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>Tags</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
              <Tag color="blue">Bulk Buyer</Tag>
              <Tag color="green">Hot</Tag>
              <Tag color="purple">VIP</Tag>
            </div>
            <Button style={{ width: '100%', justifyContent: 'center', marginBottom: 6 }}>Move to Pipeline</Button>
            <Button style={{ width: '100%', justifyContent: 'center' }}>Add Note</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
