const BASE = import.meta.env.VITE_API_URL || 'https://waavio-backend-production.up.railway.app'

async function request(path, options = {}) {
  const token = localStorage.getItem('waavio_token')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  // Auth
  signup: (body) => request('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login:  (body) => request('/api/auth/login',  { method: 'POST', body: JSON.stringify(body) }),
  me:     ()     => request('/api/auth/me'),
  updateProfile:     (body) => request('/api/auth/profile',      { method: 'PUT', body: JSON.stringify(body) }),
  updateIntegrations:(body) => request('/api/auth/integrations', { method: 'PUT', body: JSON.stringify(body) }),

  // Contacts
  getContacts:   ()     => request('/api/contacts'),
  createContact: (body) => request('/api/contacts', { method: 'POST', body: JSON.stringify(body) }),
  updateContact: (id, body) => request(`/api/contacts/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteContact: (id)   => request(`/api/contacts/${id}`, { method: 'DELETE' }),
  importContacts:(body) => request('/api/contacts/import', { method: 'POST', body: JSON.stringify(body) }),

  // Campaigns
  getCampaigns:   ()     => request('/api/campaigns'),
  createCampaign: (body) => request('/api/campaigns', { method: 'POST', body: JSON.stringify(body) }),
  sendCampaign:   (id)   => request(`/api/campaigns/${id}/send`, { method: 'POST' }),
  deleteCampaign: (id)   => request(`/api/campaigns/${id}`, { method: 'DELETE' }),

  // WhatsApp
  sendMessage: (body) => request('/api/whatsapp/send', { method: 'POST', body: JSON.stringify(body) }),
  getMessages: (contactId) => request(`/api/whatsapp/messages/${contactId}`),

  // Leads
  getLeads:   ()     => request('/api/leads'),
  createLead: (body) => request('/api/leads', { method: 'POST', body: JSON.stringify(body) }),
  updateLead: (id, body) => request(`/api/leads/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
}
