import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Mic, X } from 'lucide-react'

const REPLIES = [
  "Your open rate of 78.3% is excellent! WhatsApp industry average is ~45%. Try sending between 10 AM–12 PM for best results.",
  "To avoid bans, always use Meta's official Cloud API, collect opt-ins, and keep response rates above 20%. Your ban risk is just 0.4% — great!",
  "For bulk orders, create a dedicated pipeline stage and auto-trigger a special pricing template when 'bulk' is detected in chat.",
  "Your top campaign is 'Summer Sale Blast' at 82% open rate. Re-target non-responders with a follow-up after 48 hours.",
  "I can help build a chat flow for price inquiries. Go to Chat Builder → '+ New Flow' to get started — takes about 5 minutes!",
  "To connect WhatsApp: go to Settings → Integrations → WhatsApp Business API. You'll need a Meta Business Manager account.",
]

export default function AIAssistant() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm your Waavio AI. Ask me anything about campaigns, leads, or WhatsApp marketing." }
  ])
  const [input, setInput]     = useState('')
  const msgRef                = useRef(null)

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)]
      setMessages(m => [...m, { from: 'bot', text: reply }])
    }, 650)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 200,
          width: 48, height: 48, borderRadius: 14,
          background: 'linear-gradient(135deg, var(--purple), var(--blue))',
          border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(139,92,246,0.45)',
          color: '#fff', transition: 'all 0.2s',
        }}
      >
        <Bot size={20} />
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 82, right: 24, zIndex: 200,
          width: 310, background: 'var(--card2)',
          border: '1px solid rgba(139,92,246,0.3)', borderRadius: 18,
          overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column', maxHeight: 440,
          animation: 'fadeIn 0.2s ease',
        }}>
          {/* Header */}
          <div style={{
            padding: '13px 16px',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1))',
            borderBottom: '1px solid rgba(139,92,246,0.15)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div className="pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple)', boxShadow: '0 0 8px var(--purple)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flex: 1 }}>Waavio AI</span>
            <Mic size={13} color="var(--text3)" style={{ cursor: 'pointer' }} />
            <X size={14} color="var(--text3)" style={{ cursor: 'pointer', marginLeft: 4 }} onClick={() => setOpen(false)} />
          </div>

          {/* Messages */}
          <div ref={msgRef} style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 120 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                fontSize: 12, lineHeight: 1.55, padding: '9px 12px', borderRadius: 10,
                ...(m.from === 'bot'
                  ? { background: 'rgba(139,92,246,0.12)', color: 'var(--text)', border: '1px solid rgba(139,92,246,0.15)', alignSelf: 'flex-start', maxWidth: '92%' }
                  : { background: 'var(--card)', color: 'var(--text2)', alignSelf: 'flex-end', maxWidth: '92%', border: '1px solid var(--border)' }
                )
              }}>
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: 10, borderTop: '1px solid var(--border)', display: 'flex', gap: 6 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              style={{
                flex: 1, background: 'var(--bg3)', border: '1px solid var(--border2)',
                borderRadius: 8, padding: '7px 10px', color: 'var(--text)',
                fontSize: 12, fontFamily: 'Inter, sans-serif', outline: 'none',
              }}
            />
            <button onClick={send} style={{
              width: 32, height: 32, borderRadius: 8, background: 'var(--purple)',
              border: 'none', cursor: 'pointer', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
