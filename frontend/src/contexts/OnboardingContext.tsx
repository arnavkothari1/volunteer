import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  location?: string;
  role?: 'STUDENT' | 'ORGANIZER';
  interests?: string[];
  organizerOptions?: string[];
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  clearOnboardingData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const clearOnboardingData = () => {
    setOnboardingData({});
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData, clearOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 