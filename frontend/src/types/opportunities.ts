export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  duration: string;
  postedDate: string;
  deadline?: string;
  salary?: string;
  skills?: string[];
  description?: string;
  requirements?: string[];
  level?: string;
  industry?: string;
} 