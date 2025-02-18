export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatar?: string;
  resume?: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
} 