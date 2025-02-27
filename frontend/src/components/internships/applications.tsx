import { useState, useEffect } from "react"
import { useRouter } from "../../hooks/useRouter"
import { toast } from "../ui/use-toast"
import '../../styles/applications.css'

interface Application {
  id: string;
  studentName: string;
  status: string;
  appliedDate: string;
  resume: string;
}

export default function Applications() {
  const router = useRouter()
  const internshipId = router.query.id as string
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:5000/api/internships/${internshipId}/applications`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        
        if (data.success) {
          setApplications(data.applications)
        } else {
          toast.error("Failed to fetch applications")
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
        toast.error("Error loading applications")
      } finally {
        setLoading(false)
      }
    }

    if (internshipId) {
      fetchApplications()
    }
  }, [internshipId])

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      const data = await res.json()

      if (data.success) {
        setApplications(applications.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        ))
        toast.success("Application status updated")
      } else {
        toast.error("Failed to update application status")
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error("Error updating application status")
    }
  }

  if (loading) return <div>Loading applications...</div>

  return (
    <div className="applications-container">
      <h1>Applications</h1>
      <div className="applications-grid">
        {applications.map((application) => (
          <div key={application.id} className="application-card">
            <h3>{application.studentName}</h3>
            <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
            <p>Status: {application.status}</p>
            <div className="action-buttons">
              <button onClick={() => handleStatusUpdate(application.id, 'ACCEPTED')}>
                Accept
              </button>
              <button onClick={() => handleStatusUpdate(application.id, 'REJECTED')}>
                Reject
              </button>
              <a href={application.resume} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 