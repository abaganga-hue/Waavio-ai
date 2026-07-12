import { useState } from 'react'
import { Button, Tag } from '../components/UI'

const STAGES = [
  { id: 'new',       label: 'New',       color: 'purple', count: 8 },
  { id: 'contacted', label: 'Contacted', color: 'blue',   count: 12 },
  { id: 'interested',label: 'Interested',color: 'amber',  count: 7 },
  { id: 'proposal',  label: 'Proposal',  color: 'teal',   count: 5 },
  { id: 'won',       label: 'Won',       color: 'green',  count: 23 },
  { id: 'lost',      label: 'Lost',      color: 'red',    count: 3 },
]

const LEADS = {
  new:        [{ name: 'Arjun Mehta',  company: 'Mehta Textiles', tag: 'Campaign', tagColor: 'purple' }, { name: 'Sunita Patel', company: 'SP Traders',    tag: 'Instagram', tagColor: 'blue' }, { name: 'Kiran Roy', company: 'Roy Electronics', tag: 'Campaign', tagColor: 'purple' }],
  contacted:  [{ name: 'Anand Kumar', company: 'AK Enterprises', tag: 'Bulk Order', tagColor: 'amber' }, { name: 'Meena S',     company: 'Individual',    tag: 'Price Query', tagColor: 'blue' }],
  interested: [{ name: 'Rahul Verma', company: 'Verma Stores',   tag: 'Demo Done',   tagColor: 'green' }, { name: 'Suresh P',    company: 'SP Hardware',   tag: 'Negotiating', tagColor: 'amber' }],
  proposal:   [{ name: 'Divya M',     company: 'DM Fashion',     tag: '₹45,000',    tagColor: 'teal'  }, { name: 'Prakash N',   company: 'Naveen & Co',  tag: '₹1.2L',      tagColor: 'teal'  }],
  won:        [{ name: 'Lakshmi T',   company: 'LT Boutique',    tag: '₹78,000 ✓', tagColor: 'green', won: true }, { name: 'Venkat R', company: 'VR Exports', tag: '₹2.1L ✓', tagColor: 'green', won: true }],
  lost:       [{ name: 'Sanjay B',    company: 'SB Suppliers',   tag: 'No Budget',  tagColor: 'red',   lost: true }],
}

export default function Pipeline() {
  const [leads, setLeads] = useState(LEADS)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Pipeline</span>
        <Button>Filter</Button>
        <Button variant="primary">+ Add Lead</Button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {/* Summary row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total Leads', value: '58', color: 'var(--blue)' },
            { label: 'Won Value',   value: '₹2.9L', color: 'var(--green)' },
            { label: 'Win Rate',    value: '39.6%', color: 'var(--purple)' },
            { label: 'Avg. Deal',   value: '₹48K',  color: 'var(--amber)' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Kanban */}
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {STAGES.map(stage => (
            <div key={stage.id} style={{ minWidth: 195, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 14, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '.6px' }}>{stage.label}</span>
                <Tag color={stage.color}>{stage.count}</Tag>
              </div>
              {leads[stage.id].map((lead, i) => (
                <div key={i}
                  style={{
                    background: 'var(--bg3)', border: `1px solid ${lead.won ? 'rgba(0,212,160,0.2)' : 'var(--border)'}`,
                    borderRadius: 10, padding: 12, marginBottom: 8, cursor: 'pointer',
                    transition: 'all 0.2s', opacity: lead.lost ? 0.6 : 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 7 }}>{lead.company}</div>
                  <Tag color={lead.tagColor}>{lead.tag}</Tag>
                </div>
              ))}
              <button style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px dashed var(--border2)', borderRadius: 8, color: 'var(--text3)', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text3)' }}
              >+ Add Lead</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
