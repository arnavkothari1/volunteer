import { useState } from 'react';
import { useRouter } from 'next/router';

const UserTypePage = () => {
  const router = useRouter();
  const { location } = router.query;

  const handleSubmit = async (userType: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          location: location,
          userType: userType
        })
      });

      const data = await response.json();
      console.log('Response:', data);  // Debug log

      if (data.success) {
        if (userType === 'ORGANIZER') {
          router.push('/dashboard/organizer');
        } else {
          router.push('/dashboard/student');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8">Choose your role</h1>
      <p className="mb-4">Location: {location}</p>
      
      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit('STUDENT')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          I&apos;m a Student
        </button>
        <button
          onClick={() => handleSubmit('ORGANIZER')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          I&apos;m an Organizer
        </button>
      </div>
    </div>
  );
};

export default UserTypePage;