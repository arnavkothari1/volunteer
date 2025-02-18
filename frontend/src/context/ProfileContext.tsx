import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from 'react'
import { Profile, Experience, Education, Project, Skill } from '@/types/profile'
import { profileService } from '@/services/profileService'

interface ProfileState {
  profile: Profile | null
  isLoading: boolean
  error: string | null
}

type ProfileAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_PROFILE'; payload: Profile }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Profile> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: Experience }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: Education }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: Skill }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'REVERT_CHANGES'; payload: Profile }

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
}

const ProfileContext = createContext<{
  state: ProfileState
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<void>
  uploadAvatar: (file: File) => Promise<void>
  addExperience: (data: Omit<Experience, 'id'>) => Promise<void>
  updateExperience: (id: string, data: Partial<Experience>) => Promise<void>
  deleteExperience: (id: string) => Promise<void>
  addEducation: (data: Omit<Education, 'id'>) => Promise<void>
  updateEducation: (id: string, data: Partial<Education>) => Promise<void>
  deleteEducation: (id: string) => Promise<void>
  addSkill: (data: Omit<Skill, 'id'>) => Promise<void>
  deleteSkill: (id: string) => Promise<void>
  addProject: (data: Omit<Project, 'id'>) => Promise<void>
  updateProject: (id: string, data: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
} | undefined>(undefined)

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true, error: null }
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, isLoading: false, error: null }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: state.profile ? { ...state.profile, ...action.payload } : null,
        isLoading: false,
      }
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              experience: [...state.profile.experience, action.payload],
            }
          : null,
      }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              experience: state.profile.experience.map((exp) =>
                exp.id === action.payload.id ? action.payload : exp
              ),
            }
          : null,
      }
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              experience: state.profile.experience.filter(
                (exp) => exp.id !== action.payload
              ),
            }
          : null,
      }
    case 'ADD_EDUCATION':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              education: [...state.profile.education, action.payload],
            }
          : null,
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              education: state.profile.education.map((edu) =>
                edu.id === action.payload.id ? action.payload : edu
              ),
            }
          : null,
      }
    case 'DELETE_EDUCATION':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              education: state.profile.education.filter(
                (edu) => edu.id !== action.payload
              ),
            }
          : null,
      }
    case 'ADD_SKILL':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              skills: [...state.profile.skills, action.payload],
            }
          : null,
      }
    case 'UPDATE_SKILL':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              skills: state.profile.skills.map((skill) =>
                skill.id === action.payload.id ? action.payload : skill
              ),
            }
          : null,
      }
    case 'DELETE_SKILL':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              skills: state.profile.skills.filter(
                (skill) => skill.id !== action.payload
              ),
            }
          : null,
      }
    case 'ADD_PROJECT':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              projects: [...state.profile.projects, action.payload],
            }
          : null,
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              projects: state.profile.projects.map((project) =>
                project.id === action.payload.id ? action.payload : project
              ),
            }
          : null,
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              projects: state.profile.projects.filter(
                (project) => project.id !== action.payload
              ),
            }
          : null,
      }
    case 'REVERT_CHANGES':
      return {
        ...state,
        profile: action.payload,
        error: null,
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  const fetchProfile = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const profile = await profileService.getProfile()
      dispatch({ type: 'SET_PROFILE', payload: profile })
    } catch (error) {
      console.error('Error fetching profile:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch profile' })
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const updated = await profileService.updateProfile(data)
      dispatch({ type: 'UPDATE_PROFILE', payload: updated })
    } catch (error) {
      console.error('Error updating profile:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update profile' })
    }
  }, [])

  const uploadAvatar = useCallback(async (file: File) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { avatar: data.url },
      })
    } catch (error) {
      console.error('Error uploading avatar:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to upload avatar' })
    }
  }, [])

  const addExperience = useCallback(async (data: Omit<Experience, 'id'>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const newExperience = await profileService.addExperience(data)
      dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience })
    } catch (error) {
      console.error('Error adding experience:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add experience' })
    }
  }, [])

  const updateExperience = useCallback(async (id: string, data: Partial<Experience>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const updatedExperience = await profileService.updateExperience(id, data)
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: updatedExperience })
    } catch (error) {
      console.error('Error updating experience:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update experience' })
    }
  }, [])

  const deleteExperience = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      await profileService.deleteExperience(id)
      dispatch({ type: 'DELETE_EXPERIENCE', payload: id })
    } catch (error) {
      console.error('Error deleting experience:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete experience' })
    }
  }, [])

  const addEducation = useCallback(async (data: Omit<Education, 'id'>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const newEducation = await profileService.addEducation(data)
      dispatch({ type: 'ADD_EDUCATION', payload: newEducation })
    } catch (error) {
      console.error('Error adding education:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add education' })
    }
  }, [])

  const updateEducation = useCallback(async (id: string, data: Partial<Education>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const updatedEducation = await profileService.updateEducation(id, data)
      dispatch({ type: 'UPDATE_EDUCATION', payload: updatedEducation })
    } catch (error) {
      console.error('Error updating education:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update education' })
    }
  }, [])

  const deleteEducation = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      await profileService.deleteEducation(id)
      dispatch({ type: 'DELETE_EDUCATION', payload: id })
    } catch (error) {
      console.error('Error deleting education:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete education' })
    }
  }, [])

  const addSkill = useCallback(async (data: Omit<Skill, 'id'>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const newSkill = await profileService.addSkill(data)
      dispatch({ type: 'ADD_SKILL', payload: newSkill })
    } catch (error) {
      console.error('Error adding skill:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add skill' })
    }
  }, [])

  const deleteSkill = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      await profileService.deleteSkill(id)
      dispatch({ type: 'DELETE_SKILL', payload: id })
    } catch (error) {
      console.error('Error deleting skill:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete skill' })
    }
  }, [])

  const addProject = useCallback(async (data: Omit<Project, 'id'>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const newProject = await profileService.addProject(data)
      dispatch({ type: 'ADD_PROJECT', payload: newProject })
    } catch (error) {
      console.error('Error adding project:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add project' })
    }
  }, [])

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const updatedProject = await profileService.updateProject(id, data)
      dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject })
    } catch (error) {
      console.error('Error updating project:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update project' })
    }
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      await profileService.deleteProject(id)
      dispatch({ type: 'DELETE_PROJECT', payload: id })
    } catch (error) {
      console.error('Error deleting project:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete project' })
    }
  }, [])

  const value = {
    state,
    fetchProfile,
    updateProfile,
    uploadAvatar,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
} 