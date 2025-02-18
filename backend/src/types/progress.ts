export interface ProgressType {
  userId: string;
  pathId: string;
  currentStep: number;
  completed: boolean;
  lastUpdated: Date;
  // Add any other relevant fields
} 