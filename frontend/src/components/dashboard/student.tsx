"use client"

import { useState, useEffect } from "react"
import { useRouter } from "../../hooks/useRouter"
import { toast } from "../ui/use-toast"
import '../../styles/student-dashboard.css'
import ErrorBoundary from '../ErrorBoundary'
import { useNavigate } from 'react-router-dom'
import StudentApplicationList from '../applications/StudentApplicationList'

interface Company {
  id: string;
  name: string;
  location: string;
  industry: string;
}

interface Internship {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  company?: Company;
  isRemote: boolean;
  requirements: string[];
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export default function StudentDashboard() {
  const router = useRouter()
  const navigate = useNavigate()
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await fetch('http://localhost:5000/api/internships', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch internships')
        }

        const data = await response.json()
        setInternships(data)

        // Show success toast if there's a new application
        if (router.query.applied === 'true') {
          toast.success("Your application has been submitted successfully!")
          // Remove the query parameter
          router.push('/dashboard/student')
        }
      } catch (error) {
        console.error('Error fetching internships:', error)
        setError('Failed to fetch internships')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleViewDetails = (id: string) => {
    router.push(`/internships/${id}`)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <ErrorBoundary>
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>StudentVolunteer</h2>
          </div>
          <nav className="sidebar-nav">
            <a href="/dashboard/student" className="nav-item active">Dashboard</a>
            <a href="/applications" className="nav-item">My Applications</a>
            <a href="/saved" className="nav-item">Saved Listings</a>
            <a href="/settings" className="nav-item">Settings</a>
          </nav>
        </aside>

        <main className="main-content">
          <header className="dashboard-header">
            <h1>Welcome back!</h1>
          </header>

          <div className="dashboard-grid">
            <div className="stats-card">
              <h3>Applications</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
            <div className="stats-card">
              <h3>Internships</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
            <div className="stats-card">
              <h3>Messages</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
          </div>

          <section className="internships-section">
            <h2>Available Internships</h2>
            <div className="internships-grid">
              {loading ? (
                <p>Loading internships...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : internships.length > 0 ? (
                internships.map((internship) => (
                  <div key={internship.id} className="internship-card">
                    <div className="internship-header">
                      <h3>{internship.title}</h3>
                      <span className={`status-badge ${internship.status.toLowerCase()}`}>
                        {internship.status}
                      </span>
                    </div>
                    <p className="company-info">
                      {internship.company?.name} • {internship.company?.industry}
                    </p>
                    <p className="location">
                      {internship.isRemote ? '🌐 Remote' : `📍 ${internship.location}`}
                    </p>
                    <p className="description">{internship.description.substring(0, 150)}...</p>
                    <div className="card-footer">
                      <button 
                        onClick={() => navigate(`/internships/${internship.id}`)}
                        className="view-details-btn"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-internships">No internships available at the moment.</p>
              )}
            </div>
          </section>

          <section className="applications-section">
            <h2>Applications Sent</h2>
            <StudentApplicationList />
          </section>
        </main>
      </div>
    </ErrorBoundary>
  )
}