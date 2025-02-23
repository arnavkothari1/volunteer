import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ApplicationActions } from "@/components/applications/application-actions";
import { toast } from "@/lib/toast";

interface Application {
  id: string;
  student: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "student.firstName",
    header: "First Name",
  },
  {
    accessorKey: "student.lastName",
    header: "Last Name",
  },
  {
    accessorKey: "student.email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        variant={
          row.getValue("status") === "PENDING" ? "outline" :
          row.getValue("status") === "ACCEPTED" ? "success" : "secondary"
        }
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Applied Date",
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM d, yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <ApplicationActions
          applicationId={application.id}
          currentStatus={application.status}
          onStatusChange={async (id, status) => {
            try {
              const res = await fetch(`/api/applications/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status })
              });
              
              if (res.ok) {
                toast({
                  title: "Status updated",
                  description: `Application status changed to ${status.toLowerCase()}`,
                });
                // Refresh the applications list
                router.push(router.asPath);
              }
            } catch (error) {
              console.error('Error updating status:', error);
              toast({
                title: "Error",
                description: "Failed to update application status",
                variant: "destructive",
              });
            }
          }}
        />
      );
    },
  },
];

export default function ApplicationsView() {
  const router = useRouter();
  const { id } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/internships/${id}/applications`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          setApplications(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">
              Manage applications for this internship position
            </p>
          </div>
        </div>

        <Card>
          <div className="p-6">
            <DataTable 
              columns={columns} 
              data={applications} 
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
} 