import { Vulnerability } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const vulnerabilityApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok) throw new Error('Failed to fetch vulnerabilities')
    return response.json()
  },

  create: async (vulnerability: Omit<Vulnerability, 'id'>) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vulnerability)
    })
    if (!response.ok) throw new Error('Failed to create vulnerability')
    return response.json()
  },

  update: async (id: string, vulnerability: Vulnerability) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vulnerability)
    })
    if (!response.ok) throw new Error('Failed to update vulnerability')
    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete vulnerability')
    return response.json()
  },

  updateState: async (id: string, state: string) => {
    const response = await fetch(`${API_BASE_URL}/vulnerabilities/${id}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state })
    })
    if (!response.ok) throw new Error('Failed to update vulnerability state')
    return response.json()
  }
} 
