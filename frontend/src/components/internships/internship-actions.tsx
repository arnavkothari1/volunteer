import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Eye, UserPlus, XCircle } from "lucide-react"
import { useRouter } from "next/router"

interface InternshipActionsProps {
  internshipId: string
  onStatusChange: (id: string, status: string) => void
}

export function InternshipActions({ internshipId, onStatusChange }: InternshipActionsProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/internships/${internshipId}`)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/internships/${internshipId}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Internship
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/internships/${internshipId}/applications`)}>
          <UserPlus className="mr-2 h-4 w-4" />
          View Applications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => onStatusChange(internshipId, 'CLOSED')}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Close Position
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 