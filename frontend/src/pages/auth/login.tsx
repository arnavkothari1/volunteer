import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      console.log('Login response:', data); // Debug log

      // Force navigation based on user type
      if (data.user && data.user.userType === 'ORGANIZER') {
        window.location.href = '/dashboard/organizer';  // Force navigation
      } else {
        window.location.href = '/dashboard/student';  // Force navigation
      }

    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Failed to login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="w-2/5 bg-blue-600 p-12 text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="mb-8">Sign in to continue your journey with PathBuilder</p>
        <div className="bg-blue-500 p-6 rounded-lg mt-auto">
          <p className="italic">
            &quot;Volunteer has transformed how I manage my character sheets.&quot;
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="w-3/5 bg-white p-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8">Sign In</h2>

          {/* Social login buttons */}
          <button className="w-full mb-4 p-3 border rounded-lg flex items-center justify-center gap-2">
            <Image src="/google-icon.png" alt="Google" width={24} height={24} />
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-6 p-3 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            New to Volunteer?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 