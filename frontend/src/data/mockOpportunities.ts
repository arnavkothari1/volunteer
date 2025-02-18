import { Opportunity } from '@/types/opportunities'

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Tech Corp',
    type: 'internship',
    location: 'remote',
    duration: '3-6',
    salary: '$20-25/hour',
    skills: ['React', 'TypeScript', 'Node.js'],
    description: 'Join our engineering team for a summer internship...',
    requirements: ['Currently pursuing CS degree', 'Strong programming fundamentals'],
    postedDate: '2024-02-20',
    deadline: '2024-03-20',
    level: 'entry',
    industry: 'technology'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Innovation Labs',
    type: 'full-time',
    location: 'hybrid',
    duration: '6+',
    salary: '$80,000-100,000/year',
    skills: ['React', 'Python', 'AWS', 'MongoDB'],
    description: 'Looking for an experienced full stack developer...',
    requirements: ['3+ years experience', "Bachelor's in CS or equivalent"],
    postedDate: '2024-02-18',
    level: 'mid',
    industry: 'technology'
  },
  // Add 8 more varied opportunities...
  {
    id: '3',
    title: 'UX Research Intern',
    company: 'Design Co',
    type: 'internship',
    location: 'on-site',
    duration: '0-3',
    salary: '$18-22/hour',
    skills: ['User Research', 'Figma', 'Prototyping'],
    description: 'Help shape the future of our products...',
    requirements: ['HCI background', 'Strong communication skills'],
    postedDate: '2024-02-15',
    deadline: '2024-03-15',
    level: 'entry',
    industry: 'design'
  },
  // ... more opportunities
]

export const additionalOpportunities: Opportunity[] = [
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    type: 'full-time',
    location: 'hybrid',
    duration: '6+',
    salary: '$95,000-120,000/year',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    description: 'Join our data science team to build predictive models...',
    requirements: ['MS/PhD in related field', '2+ years experience'],
    postedDate: '2024-02-17',
    level: 'mid',
    industry: 'technology'
  },
  {
    id: '5',
    title: 'Marketing Coordinator',
    company: 'Brand Solutions',
    type: 'part-time',
    location: 'on-site',
    duration: '3-6',
    salary: '$25-30/hour',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    description: 'Help manage our marketing campaigns...',
    requirements: ['Marketing degree', 'Strong writing skills'],
    postedDate: '2024-02-16',
    deadline: '2024-03-16',
    level: 'entry',
    industry: 'marketing'
  },
  // Add more opportunities...
]

export const allOpportunities = [...mockOpportunities, ...additionalOpportunities]

export type { Opportunity } 