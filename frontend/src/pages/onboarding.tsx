import { api } from "@/utils/api";
import router from "next/router";
import { useState } from "react";

export default function Onboarding() {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log('Submitting onboarding data:', { role, location, interests });

    try {
      const response = await api.post('/profile', {
        role,
        location,
        interests
      });

      console.log('Onboarding response:', response);

      if (response.error) {
        setError(response.error);
        return;
      }

      await router.push('/dashboard/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      setError('Failed to complete onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your existing component code ...
} 