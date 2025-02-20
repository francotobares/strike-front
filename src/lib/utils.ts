import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | undefined) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getStateColor = (state: string) => {
  const stateColors = {
    'Open': "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
    'In Progress': "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    'Fixed': "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
    'Closed': "bg-slate-100 text-slate-800 hover:bg-slate-100/80",
    "Won't Fix": "bg-rose-100 text-rose-800 hover:bg-rose-100/80",
    'Resurfaced': "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
  } as const

  return stateColors[state as keyof typeof stateColors] || stateColors['Open']
}

export const getSeverityColor = (severity: string) => {
  const severityColors = {
    'Low': "bg-green-100 text-green-800 hover:bg-green-100/80",
    'Medium': "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
    'High': "bg-orange-100 text-orange-800 hover:bg-orange-100/80",
    'Critical': "bg-red-100 text-red-800 hover:bg-red-100/80"
  } as const

  return severityColors[severity as keyof typeof severityColors] || severityColors['Low']
}
