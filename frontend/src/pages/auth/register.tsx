import { useState } from "react"
import { useRouter } from "next/router"
import "@/styles/auth.css"
import Link from "next/link"
export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT"
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token)
        
        if (data.user?.role === 'ORGANIZER') {
          router.push('/company/create')
        } else {
          router.push('/dashboard/student')
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Register for StudentVolunteer</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="input-field"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName" className="input-label">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="input-field"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role" className="input-label">Register as</label>
            <select
              id="role"
              name="role"
              className="input-field"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-links">
          Already have an account?{" "}
          <Link href="/auth/login" className="auth-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
} 