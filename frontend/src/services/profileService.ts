import axios from 'axios'
import { Profile, Experience, Education, Project, Skill } from '@/types/profile'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const profileService = {
  // Profile CRUD operations
  getProfile: async (): Promise<Profile> => {
    const response = await axios.get(`${API_URL}/profile`)
    return response.data
  },

  updateProfile: async (profileData: Partial<Profile>): Promise<Profile> => {
    const response = await axios.put(`${API_URL}/profile`, profileData)
    return response.data
  },

  // Experience operations
  addExperience: async (experience: Omit<Experience, 'id'>): Promise<Experience> => {
    const response = await axios.post(`${API_URL}/profile/experience`, experience)
    return response.data
  },

  updateExperience: async (id: string, experience: Partial<Experience>): Promise<Experience> => {
    const response = await axios.put(`${API_URL}/profile/experience/${id}`, experience)
    return response.data
  },

  deleteExperience: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/profile/experience/${id}`)
  },

  // Education operations
  addEducation: async (education: Omit<Education, 'id'>): Promise<Education> => {
    const response = await axios.post(`${API_URL}/profile/education`, education)
    return response.data
  },

  updateEducation: async (id: string, education: Partial<Education>): Promise<Education> => {
    const response = await axios.put(`${API_URL}/profile/education/${id}`, education)
    return response.data
  },

  deleteEducation: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/profile/education/${id}`)
  },

  // Skills operations
  addSkill: async (skill: Omit<Skill, 'id'>): Promise<Skill> => {
    const response = await axios.post(`${API_URL}/profile/skills`, skill)
    return response.data
  },

  updateSkill: async (id: string, skill: Partial<Skill>): Promise<Skill> => {
    const response = await axios.put(`${API_URL}/profile/skills/${id}`, skill)
    return response.data
  },

  deleteSkill: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/profile/skills/${id}`)
  },

  // Projects operations
  addProject: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const response = await axios.post(`${API_URL}/profile/projects`, project)
    return response.data
  },

  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await axios.put(`${API_URL}/profile/projects/${id}`, project)
    return response.data
  },

  deleteProject: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/profile/projects/${id}`)
  },

  // Resume operations
  uploadResume: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('resume', file)
    const response = await axios.post(`${API_URL}/profile/resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.url
  },

  deleteResume: async (): Promise<void> => {
    await axios.delete(`${API_URL}/profile/resume`)
  },
} 