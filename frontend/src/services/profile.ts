interface ProfileData {
  location?: string;
  userType?: string;
}

export const updateUserProfile = async (data: ProfileData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch('/api/user/profile', {  // Use relative URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
}; 