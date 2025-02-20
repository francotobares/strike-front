import { useState } from 'react'
import { Vulnerability } from '@/app/vulnerabilities/types'
import { vulnerabilityApi } from '@/app/vulnerabilities/api'

export function useVulnerabilities() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchVulnerabilities = async () => {
    setIsLoading(true)
    try {
      const data = await vulnerabilityApi.getAll()
      setVulnerabilities(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const createVulnerability = async (vulnerability: Omit<Vulnerability, 'id'>) => {
    setIsLoading(true)
    try {
      await vulnerabilityApi.create(vulnerability)
      await fetchVulnerabilities()
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateVulnerability = async (id: string, vulnerability: Vulnerability) => {
    setIsLoading(true)
    try {
      await vulnerabilityApi.update(id, vulnerability)
      await fetchVulnerabilities()
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deleteVulnerability = async (id: string) => {
    setIsLoading(true)
    try {
      await vulnerabilityApi.delete(id)
      setVulnerabilities(vulnerabilities.filter(v => v.id !== id))
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateState = async (id: string, state: string) => {
    setIsLoading(true)
    try {
      await vulnerabilityApi.updateState(id, state)
      await fetchVulnerabilities()
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    vulnerabilities,
    isLoading,
    error,
    fetchVulnerabilities,
    createVulnerability,
    updateVulnerability,
    deleteVulnerability,
    updateState
  }
} 