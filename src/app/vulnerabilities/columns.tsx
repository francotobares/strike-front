"use client"

import { Vulnerability } from './types'
import { Column, ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { vulnerabilityApi } from './api'
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash2 } from "lucide-react"

const getSortableHeader = (column: Column<Vulnerability>, title: string) => {

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

export const columns = (actions: {
  onEdit: (vulnerability: Vulnerability) => void
  onDelete: (id: string) => void
  onStateChange: () => void
}): ColumnDef<Vulnerability, keyof Vulnerability>[] => [
  {
    accessorKey: "cwe",
    header: ({ column }) => getSortableHeader(column, "CWE"),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
 
  {
    accessorKey: "severity",
    header: ({ column }) => getSortableHeader(column, "Severity"),
    cell: ({ row }) => {
      const severity = row.getValue("severity") as string
      const severityColors = {
        Low: "bg-green-100 text-green-800 hover:bg-green-100/80",
        Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
        High: "bg-orange-100 text-orange-800 hover:bg-orange-100/80",
        Critical: "bg-red-100 text-red-800 hover:bg-red-100/80"
      }
      
      return (
        <div className="flex justify-center items-center w-full">
        <Badge 
          className={`${severityColors[severity as keyof typeof severityColors]}  border-0`}
        >
          {severity}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => getSortableHeader(column, "Created At"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="flex justify-center items-center w-full">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => getSortableHeader(column, "Updated At"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"))
      return (
        <div className="flex justify-center items-center w-full">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "reportedDate",
    header: ({ column }) => getSortableHeader(column, "Reported Date"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("reportedDate"))
      return (
        <div className="flex justify-center items-center w-full">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "lastUpdatedDate",
    header: ({ column }) => getSortableHeader(column, "Last Updated"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastUpdatedDate"))
      return (
        <div className="flex justify-center items-center w-full">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>)
    },
  },
  {
    accessorKey: "completeState",
    header: ({ column }) => getSortableHeader(column, "State"),
    cell: ({ row }) => {
      const stateColors = {
        Open: "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
        "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
        Fixed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
        Closed: "bg-slate-100 text-slate-800 hover:bg-slate-100/80",
        "Won't Fix": "bg-rose-100 text-rose-800 hover:bg-rose-100/80",
        Resurfaced: "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      }

      const currentState = row.original.completeState?.currentState || 'Open'
      const possibleNextStates = row.original.completeState?.possibleNextStates || ['Open']
      
      const handleStateChange = async (nextState: string) => {
        try {
          await vulnerabilityApi.updateState(row.original.id, nextState);
          actions.onStateChange();
        } catch (error) {
          console.error('Error updating vulnerability state:', error);
        }
      };
      
      return (
        <div className="flex justify-center items-center w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" className="p-0">
                <Badge className={`${stateColors[currentState as keyof typeof stateColors]} border-0`}>
                  {currentState}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
              {possibleNextStates.map((nextState) => (
                <DropdownMenuItem 
                  key={nextState} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStateChange(nextState);
                  }}
                >
                  <Badge className={stateColors[nextState as keyof typeof stateColors]}>
                    {nextState}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vulnerability = row.original
      return (
        <div className="flex gap-2 justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              actions.onEdit(vulnerability)
            }}
            aria-label="edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              actions.onDelete(vulnerability.id)
            }}
            aria-label="delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  }
]
