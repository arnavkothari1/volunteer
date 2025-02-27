import { useState } from "react"
import { Link } from "react-router-dom"
import { useRouter } from "../../hooks/useRouter"
import { toast } from "../ui/use-toast"
import "../../styles/auth.css"

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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          fullName: `${formData.firstName} ${formData.lastName}`
        })
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem('token', data.token)
        toast.success('Registration successful')
        
        // Redirect based on role
        if (formData.role === 'STUDENT') {
          router.push('/dashboard/student')
        } else if (formData.role === 'ORGANIZER') {
          router.push('/company/create')
        }
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="auth-input"
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
          <Link to="/auth/login" className="auth-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
} 