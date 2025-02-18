import { Profile } from '@/types/profile'

export const profileUtils = {
  validateProfileData: (profile: Partial<Profile>): string[] => {
    const errors: string[] = []
    
    if (!profile.firstName?.trim()) errors.push('First name is required')
    if (!profile.lastName?.trim()) errors.push('Last name is required')
    if (!profile.email?.trim()) errors.push('Email is required')
    
    return errors
  },

  formatDateRange: (startDate: string, endDate?: string, current?: boolean): string => {
    const start = new Date(startDate).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    
    if (current) return `${start} - Present`
    if (endDate) {
      return `${start} - ${new Date(endDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}`
    }
    return start
  },

  sortByDate: <T extends { startDate: string }>(items: T[]): T[] => {
    return [...items].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  },

  calculateProfileCompleteness: (profile: Profile): number => {
    const sections = [
      !!profile.avatar,
      !!profile.bio,
      profile.experience.length > 0,
      profile.education.length > 0,
      profile.skills.length > 0,
      profile.projects.length > 0,
      !!profile.linkedin,
      !!profile.github,
      !!profile.website,
      !!profile.resume,
    ]
    
    const completedSections = sections.filter(Boolean).length
    return Math.round((completedSections / sections.length) * 100)
  },

  generateProfileSummary: (profile: Profile): string => {
    const experience = profile.experience[0]
    const education = profile.education[0]
    
    return `${profile.firstName} ${profile.lastName} is a ${
      profile.headline
    } with ${profile.experience.length} years of experience. Currently ${
      experience?.current ? `working at ${experience.company}` : 'seeking new opportunities'
    }. ${education ? `Studied ${education.field} at ${education.school}.` : ''}`
  }
} 