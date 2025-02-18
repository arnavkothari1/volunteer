import { Opportunity } from '@/data/mockOpportunities'
import {SearchFilters } from '@/types/filters'

export const filterOpportunities = (
  opportunities: Opportunity[],
  filters: SearchFilters
): Opportunity[] => {
  let filtered = [...opportunities]

  // Apply search query
  if (filters.query) {
    const query = filters.query.toLowerCase()
    filtered = filtered.filter(opp => 
      opp.title.toLowerCase().includes(query) ||
      opp.company.toLowerCase().includes(query) ||
      (opp.description && opp.description.toLowerCase().includes(query)) ||
      (opp.skills && Array.isArray(opp.skills) && opp.skills.some(skill => skill.toLowerCase().includes(query)))
    )
  }

  // Apply filters
  if (filters.filters) {
    Object.entries(filters.filters).forEach(([key, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(opp => {
          if (key === 'skills') {
            return values.some(value => 
              opp.skills && Array.isArray(opp.skills) && opp.skills.some(skill => 
                skill.toLowerCase() === value.toLowerCase()
              )
            )
          }
          return values.includes(opp[key as keyof Opportunity] as string)
        })
      }
    })
  }

  // Apply sorting
  if (filters.sort) {
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'date_desc':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        case 'date_asc':
          return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        case 'company_asc':
          return a.company.localeCompare(b.company)
        case 'company_desc':
          return b.company.localeCompare(a.company)
        case 'salary_desc':
          return (parseInt(b.salary?.replace(/\D/g, '') || '0') - 
                 parseInt(a.salary?.replace(/\D/g, '') || '0'))
        case 'salary_asc':
          return (parseInt(a.salary?.replace(/\D/g, '') || '0') - 
                 parseInt(b.salary?.replace(/\D/g, '') || '0'))
        default:
          return 0
      }
    })
  }

  return filtered
} 