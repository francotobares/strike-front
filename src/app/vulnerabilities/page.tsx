'use client'

import { useState, useEffect } from 'react'
import { Vulnerability } from './types'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import React from 'react'
import { VulnerabilityDialog } from "./vulnerability-dialog"
import { vulnerabilityApi } from './api'

const emptyVulnerability: Omit<Vulnerability, 'id'> = {
  title: '',
  description: '',
  severity: 'Low',
  cwe: '',
  affectedComponent: '',
  reportedDate: new Date().toISOString(),
  lastUpdatedDate: new Date().toISOString(),
  reporter: '',
  completeState: {
    currentState: 'Open',
    possibleNextStates: ['Open']
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  suggestedFix: null,
  workarounds: null,
  impact: '',
  technicalImpact: '' 
}
  
export default function VulnerabilitiesOverviewPage() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null)
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>('view')

  useEffect(() => {
    vulnerabilityApi.getAll().then(setVulnerabilities)
  }, [])

  const handleClickRow = (row: Vulnerability) => {
    setSelectedVulnerability({ ...row})
    setMode('view')
  }

  const handleClickAddVulnerability = () => {
    setSelectedVulnerability({ ...emptyVulnerability, id: '' })
    setMode('create')
  } 

  const handleSave = async (vulnerability: Vulnerability) => {
    if (mode === 'create') {
      const vulnerabilityWithoutId = Object.fromEntries(
        Object.entries(vulnerability).filter(([key]) => key !== 'id')
      ) as Omit<Vulnerability, 'id'>
      await vulnerabilityApi.create(vulnerabilityWithoutId)
      await vulnerabilityApi.getAll().then(setVulnerabilities)
    } else if (mode === 'edit') {
      console.log(vulnerability)
      await vulnerabilityApi.update(vulnerability.id, vulnerability)
      await vulnerabilityApi.getAll().then(setVulnerabilities)
    }
  }

  return (
    <div className="container mx-auto py-10">
        <DataTable 
          columns={columns({
            onEdit: (vulnerability) => {
              setSelectedVulnerability(vulnerability)
              setMode('edit')
            },
            onDelete: async (id) => {
              await vulnerabilityApi.delete(id)
              setVulnerabilities(vulnerabilities.filter(v => v.id !== id))
            },
            onStateChange: () => {
              vulnerabilityApi.getAll().then(setVulnerabilities)
            }
          })} 
          data={vulnerabilities} 
          onRowSelect={handleClickRow}
          onAddNew={handleClickAddVulnerability}
        />

      <VulnerabilityDialog 
        vulnerability={selectedVulnerability} 
        open={!!selectedVulnerability}
        onOpenChange={(open) => !open && setSelectedVulnerability(null)}
        mode={mode}
        onSave={handleSave}
      />
    </div>
  )
}