import { useState } from 'react';
import { useRouter } from 'next/router';

interface CompanyFormData {
  name: string;
  description: string;
  location: string;
  isRemote: boolean;
  userPosition: string;
  occupiedPositions: string[];
  interests: string[];
}

const CreateCompanyPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    description: '',
    location: '',
    isRemote: false,
    userPosition: '',
    occupiedPositions: [],
    interests: []
  });
  const [newPosition, setNewPosition] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (response.ok) {
        // Check if we have the company data in the response
        if (data && data.id) {
          router.push(`/company/manage/${data.id}`);
        } else {
          console.error('Company data:', data); // Debug log
          throw new Error('Invalid company data received');
        }
      } else {
        throw new Error(data.error || 'Failed to create company');
      }
    } catch (error) {
      console.error('Error creating company:', error);
      alert(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const addPosition = () => {
    if (newPosition.trim()) {
      setFormData({
        ...formData,
        occupiedPositions: [...formData.occupiedPositions, newPosition.trim()]
      });
      setNewPosition('');
    }
  };

  const removePosition = (index: number) => {
    setFormData({
      ...formData,
      occupiedPositions: formData.occupiedPositions.filter((_, i) => i !== index)
    });
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your Company</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="userPosition" className="block text-sm font-medium text-gray-700">
              Your Position
            </label>
            <input
              type="text"
              name="userPosition"
              id="userPosition"
              required
              value={formData.userPosition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isRemote"
              id="isRemote"
              checked={formData.isRemote}
              onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isRemote" className="ml-2 block text-sm text-gray-700">
              Remote Work Available
            </label>
          </div>

          {/* Add Occupied Positions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupied Positions
            </label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className="flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a position"
              />
              <button
                type="button"
                onClick={addPosition}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {formData.occupiedPositions.map((position, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{position}</span>
                  <button
                    type="button"
                    onClick={() => removePosition(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Interests
            </label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add an interest"
              />
              <button
                type="button"
                onClick={addInterest}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {formData.interests.map((interest, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => removeInterest(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyPage; 