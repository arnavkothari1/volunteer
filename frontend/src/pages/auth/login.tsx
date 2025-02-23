"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import '@/styles/auth.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Define paths as constants to avoid undefined
        const studentPath = '/dashboard/student';
        const organizerPath = '/dashboard/organizer';
        const companyCreatePath = '/company/create';
        
        if (data.user.role === 'STUDENT') {
          await router.push(studentPath);
        } else if (data.user.role === 'ORGANIZER') {
          const profileRes = await fetch('http://localhost:5000/api/profile', {
            headers: { 'Authorization': data.token }
          });
          
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            await router.push(profileData.company ? organizerPath : companyCreatePath);
          }
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Failed to login. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Log In to StudentVolunteer</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="auth-links">
          <Link href="/auth/forgot-password" className="auth-link">
            Forgot your password?
          </Link>
          <div style={{ margin: "8px 0" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}