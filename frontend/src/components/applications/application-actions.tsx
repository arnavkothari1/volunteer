import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react"

interface ApplicationActionsProps {
  applicationId: string
  currentStatus: string
  onStatusChange: (id: string, status: string) => Promise<void>
}

export function ApplicationActions({ 
  applicationId, 
  currentStatus, 
  onStatusChange 
}: ApplicationActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => onStatusChange(applicationId, 'ACCEPTED')}
          className="text-green-600"
          disabled={currentStatus === 'ACCEPTED'}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Accept Application
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onStatusChange(applicationId, 'REJECTED')}
          className="text-red-600"
          disabled={currentStatus === 'REJECTED'}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Reject Application
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onStatusChange(applicationId, 'PENDING')}
          disabled={currentStatus === 'PENDING'}
        >
          <Clock className="mr-2 h-4 w-4" />
          Mark as Pending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 