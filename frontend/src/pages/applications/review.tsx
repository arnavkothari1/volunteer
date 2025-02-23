import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Application {
  id: string
  status: string
  student: {
    firstName: string
    lastName: string
    email: string
  }
  internship: {
    title: string
  }
  createdAt: string
}

export default function ReviewApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  async function fetchApplications() {
    try {
      const response = await fetch("/api/applications", {
        credentials: "include",
      })
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateApplicationStatus(applicationId: string, status: string) {
    try {
      const response = await fetch(`/api/application/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update status")
      
      // Refresh applications after update
      fetchApplications()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Review Applications</h1>

        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {application.student.firstName} {application.student.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {application.student.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{application.internship.title}</TableCell>
                      <TableCell>
                        <Badge variant={
                          application.status === "PENDING" ? "secondary" :
                          application.status === "ACCEPTED" ? "success" : "destructive"
                        }>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateApplicationStatus(application.id, "ACCEPTED")}
                            disabled={application.status === "ACCEPTED"}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateApplicationStatus(application.id, "REJECTED")}
                            disabled={application.status === "REJECTED"}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 