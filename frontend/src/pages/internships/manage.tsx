import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Internship {
  id: string
  title: string
  status: string
  applications: {
    id: string
    status: string
  }[]
  createdAt: string
}

export default function ManageInternships() {
  const router = useRouter()
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch("/api/internships", {
          credentials: "include",
        })
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setInternships(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  const handleStatusChange = async (internshipId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/internship/${internshipId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      setInternships(internships.map(internship => 
        internship.id === internshipId 
          ? { ...internship, status: newStatus }
          : internship
      ))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Internships</h1>
          <Button onClick={() => router.push("/internships/create")}>
            Create New Internship
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Internships</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internships.map((internship) => (
                    <TableRow key={internship.id}>
                      <TableCell>{internship.title}</TableCell>
                      <TableCell>
                        <Badge variant={
                          internship.status === "OPEN" ? "success" :
                          internship.status === "CLOSED" ? "destructive" : "secondary"
                        }>
                          {internship.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{internship.applications.length}</TableCell>
                      <TableCell>
                        {new Date(internship.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/internships/${internship.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(
                              internship.id,
                              internship.status === "OPEN" ? "CLOSED" : "OPEN"
                            )}
                          >
                            {internship.status === "OPEN" ? "Close" : "Reopen"}
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