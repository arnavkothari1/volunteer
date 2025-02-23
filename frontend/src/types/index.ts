export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  location?: string;
  userType?: string;
}

export interface Application {
  id: string;
  status: string;
  createdAt: string;
  internship: {
    title: string;
    company: {
      name: string;
      location: string;
    };
  };
  student: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface Company {
  id: string;
  name: string;
  description: string;
  userPosition: string;
  location: string;
  interests: string[];
  isRemote: boolean;
  occupiedPositions: string[];
  internships?: Internship[];
  tasks?: Task[];
}

export interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  workLocation: string;
  isRemote: boolean;
  howToApply: string;
  status: 'OPEN' | 'CLOSED';
  companyId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  priority: string;
}

export interface InternshipType {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: string;
  company: {
    name: string;
    location: string;
  };
  applications: Application[];
  createdAt: string;
} 