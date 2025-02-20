export interface Vulnerability {
  id: string
  title: string
  description: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  cwe: string
  affectedComponent: string
  technicalImpact?: string
  poc?: string
  reportedDate: string
  resolutionDate?: string
  lastUpdatedDate: string
  reporter: string
  suggestedFix?: string | null
  workarounds?: string | null
  impact: string
  completeState: {
    currentState: 'Open' | 'In Progress' | 'Fixed' | 'Closed' | "Won't Fix" | "Resurfaced",
    possibleNextStates: ('Open' | 'In Progress' | 'Fixed' | 'Closed' | "Won't Fix" | "Resurfaced")[]
  }
  createdAt: string
  updatedAt: string
} 

