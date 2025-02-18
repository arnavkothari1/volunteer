import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CreateApplication = () => {
  const router = useRouter();
  const { internshipId } = router.query;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [internship, setInternship] = useState<any>(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    requirements: '',
    skills: '',
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    // Fetch user and internship data...
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        if (!response.ok) {
          router.push('/auth/login');
          return;
        }
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/auth/login');
      }
    };

    fetchUser();
    if (internshipId) {
      fetch(`http://localhost:5000/api/internships/${internshipId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setInternship(data))
        .catch(err => {
          console.error('Error fetching internship:', err);
          alert('Failed to load internship details');
        });
    }
  }, [internshipId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to submit an application');
      return;
    }

    try {
      // Convert requirements and skills to proper JSON objects
      const requirementsArray = formData.requirements.split(',').map(item => item.trim()).filter(Boolean);
      const skillsArray = formData.skills.split(',').map(item => item.trim()).filter(Boolean);

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          internshipId,
          userId: currentUser.id,
          coverLetter: formData.coverLetter,
          requirements: { items: requirementsArray },
          skills: { items: skillsArray },
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit application');
      }

      alert('Application submitted successfully!');
      router.push('/dashboard/dashboard');
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert(error.message || 'Failed to submit application');
    }
  };

  if (!currentUser || !internship) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Apply for {internship.title}</h1>
          <p className="mt-2 text-blue-100">Location: {internship.workLocation}</p>
        </div>

        <div className="p-6 bg-blue-50">
          <h2 className="font-semibold text-lg text-blue-800">About this position</h2>
          <p className="mt-2 text-gray-700">{internship.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
            <div className="bg-gray-50 p-3 rounded mb-2 text-sm text-gray-600">
              Please include:
              <ul className="list-disc ml-5 mt-1">
                <li>Your educational background</li>
                <li>Relevant experience</li>
                <li>Why you&apos;re interested in this position</li>
                <li>What makes you a good fit for the role</li>
                <li>Your availability and preferred start date</li>
              </ul>
            </div>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
              className="w-full p-3 border rounded-lg min-h-[200px] focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <p className="text-sm text-gray-500 mb-1">List your relevant skills (comma-separated)</p>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements Met</label>
              <p className="text-sm text-gray-500 mb-1">List how you meet the requirements (comma-separated)</p>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication; 