import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { InternshipActions } from "@/components/internships/internship-actions";

type InternshipType = {
  id: string;
  title: string;
  company: {
    name: string;
    location: string;
  };
  type: string;
  status: string;
  applications: any[];
  createdAt: string;
};

export const columns: ColumnDef<InternshipType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "company.location",
    header: "Location",
    filterFn: "includesString",
  },
  {
    accessorKey: "applications",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const applications = row.getValue("applications") as any[];
      return applications?.length || 0;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equals",
    cell: ({ row }) => (
      <Badge variant={row.getValue("status") === "OPEN" ? "success" : "secondary"}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM d, yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const internship = row.original;
      return (
        <InternshipActions 
          internshipId={internship.id}
          onStatusChange={async (id, status) => {
            try {
              const res = await fetch(`/api/internships/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status })
              });
              if (res.ok) {
                // Refresh the page or update the table
                window.location.reload();
              }
            } catch (error) {
              console.error('Error updating status:', error);
            }
          }}
        />
      );
    },
  },
]; 