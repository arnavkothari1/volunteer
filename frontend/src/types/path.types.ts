export interface PathStep {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  duration: string;
  resources: Resource[];
  completionCriteria: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'documentation' | 'exercise';
}

export interface Path {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  prerequisites: string[];
  learningOutcomes: string[];
  steps: PathStep[];
  estimatedDuration: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface UserProgress {
  userId: string;
  pathId: string;
  completedSteps: string[];
  currentStep: string;
  startedAt: string;
  lastActivity: string;
  stats?: {
    completedPaths: number;
    totalTime: number;
    averageScore: number;
  };
}

export interface SearchParams {
  query?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  tags?: string[];
} 