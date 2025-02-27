"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useRouter } from "../../hooks/useRouter"
import { toast } from "../ui/use-toast"
import '../../styles/auth.css';

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
        if (data.user.role === 'STUDENT') {
          router.push('/dashboard/student');
        } else if (data.user.role === 'ORGANIZER') {
          router.push('/dashboard/organizer');
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/auth/forgot-password" className="auth-link">
            Forgot your password?
          </Link>
          <div style={{ margin: "8px 0" }}>
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}