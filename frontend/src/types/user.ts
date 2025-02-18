export interface CollaborationUser {
  id: number;
  name: string;
  role: string;
  interests: string[];
  currentProjects: string[];
  skills: string[];
  avatar?: string;
}

export interface UserPreferences {
  interestId: number;
  wantCollaboration: boolean | null;
} 