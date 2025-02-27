import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "../ui/use-toast"
import '../../styles/company-create.css'

export default function Create() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    email: "",
    industry: "",
    mission: "",
    benefits: "",
    position: "",
    occupiedPositions: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login first')
        navigate('/auth/login')
        return
      }

      const response = await fetch('http://localhost:5000/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          occupiedPositions: parseInt(formData.occupiedPositions.toString())
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast.success('Company profile created successfully!')
        navigate('/dashboard/organizer')
      } else {
        toast.error(data.message || 'Failed to create company profile')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to create company profile')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' 
      ? Math.max(1, parseInt(e.target.value) || 1)
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  return (
    <div className="create-company-container">
      <div className="form-wrapper">
        <h1>Create Company Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Company Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your company"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Company location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Company Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Company email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry*</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              placeholder="e.g., Technology, Healthcare, Finance"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mission">Company Mission*</label>
            <textarea
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              required
              placeholder="What is your company's mission?"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="benefits">Benefits*</label>
            <textarea
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              required
              placeholder="List the benefits offered to interns"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Your Position in Company*</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="e.g., CEO, HR Manager, Team Lead"
            />
          </div>

          <div className="form-group">
            <label htmlFor="occupiedPositions">Number of Occupied Positions*</label>
            <input
              type="number"
              id="occupiedPositions"
              name="occupiedPositions"
              value={formData.occupiedPositions}
              onChange={handleChange}
              required
              min="1"
              defaultValue="1"
              placeholder="Current number of employees (minimum 1)"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/dashboard/organizer')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Company Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 