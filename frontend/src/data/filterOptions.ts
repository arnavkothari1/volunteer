import { FilterGroup, SortOption } from '@/types/filters'

export const filterGroups: FilterGroup[] = [
  {
    id: 'type',
    label: 'Opportunity Type',
    options: [
      { label: 'Internship', value: 'internship' },
      { label: 'Full-time', value: 'full-time' },
      { label: 'Part-time', value: 'part-time' },
      { label: 'Contract', value: 'contract' },
      { label: 'Volunteer', value: 'volunteer' },
    ],
  },
  {
    id: 'location',
    label: 'Location',
    options: [
      { label: 'Remote', value: 'remote' },
      { label: 'On-site', value: 'on-site' },
      { label: 'Hybrid', value: 'hybrid' },
    ],
  },
  {
    id: 'duration',
    label: 'Duration',
    options: [
      { label: '0-3 months', value: '0-3' },
      { label: '3-6 months', value: '3-6' },
      { label: '6+ months', value: '6+' },
    ],
  },
  {
    id: 'level',
    label: 'Experience Level',
    options: [
      { label: 'Entry Level', value: 'entry' },
      { label: 'Mid Level', value: 'mid' },
      { label: 'Senior Level', value: 'senior' },
    ],
  },
  {
    id: 'industry',
    label: 'Industry',
    options: [
      { label: 'Technology', value: 'technology' },
      { label: 'Design', value: 'design' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Finance', value: 'finance' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Education', value: 'education' },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    options: [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
      { label: 'AWS', value: 'aws' },
      { label: 'UI/UX', value: 'uiux' },
      { label: 'Data Analysis', value: 'data-analysis' },
    ],
  },
]

export const sortOptions: SortOption[] = [
  { label: 'Most Recent', value: 'date_desc' },
  { label: 'Oldest First', value: 'date_asc' },
  { label: 'Salary (High to Low)', value: 'salary_desc' },
  { label: 'Salary (Low to High)', value: 'salary_asc' },
  { label: 'Company A-Z', value: 'company_asc' },
  { label: 'Company Z-A', value: 'company_desc' },
  { label: 'Most Relevant', value: 'relevance' },
]

export const dateRangeOptions = [
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 3 days', value: '3d' },
  { label: 'Last week', value: '1w' },
  { label: 'Last month', value: '1m' },
  { label: 'All time', value: 'all' },
] 