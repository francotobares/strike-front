"use client"

import { Vulnerability } from './types'
import { Column, ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { getSeverityColor, getStateColor } from "@/lib/utils"
 
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
  updateState: (id: string, state: string) => Promise<void>
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
      return (
        <div className="flex justify-center items-center w-full">
          <Badge className={`${getSeverityColor(severity)} border-0`}>
            {severity}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => getSortableHeader(column, "Created At"),
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {formatDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => getSortableHeader(column, "Updated At"),
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {formatDate(row.getValue("updatedAt"))}
      </div>
    ),
  },
  {
    accessorKey: "reportedDate",
    header: ({ column }) => getSortableHeader(column, "Reported Date"),
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {formatDate(row.getValue("reportedDate"))}
      </div>
    ),
  },
  {
    accessorKey: "lastUpdatedDate",
    header: ({ column }) => getSortableHeader(column, "Last Updated"),
    cell: ({ row }) => (
      <div className="flex justify-center items-center w-full">
        {formatDate(row.getValue("lastUpdatedDate"))}
      </div>
    ),
  },
  {
    accessorKey: "completeState",
    header: ({ column }) => getSortableHeader(column, "State"),
    cell: ({ row }) => {
      const currentState = row.original.completeState?.currentState || 'Open'
      const possibleNextStates = row.original.completeState?.possibleNextStates || ['Open']
      
      const handleStateChange = async (nextState: string) => {
        try {
          await actions.updateState(row.original.id, nextState)
          actions.onStateChange()
        } catch (error) {
          console.error('Error updating vulnerability state:', error)
        }
      }
      
      return (
        <div className="flex justify-center items-center w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" className="p-0">
                <Badge className={`${getStateColor(currentState)} border-0`}>
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
                  <Badge className={getStateColor(nextState)}>
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
