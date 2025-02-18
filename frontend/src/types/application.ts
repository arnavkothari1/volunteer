export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'reviewing'
  | 'interview'
  | 'offered'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'

export interface ApplicationTimeline {
  id: string
  status: ApplicationStatus
  date: string
  note?: string
  createdBy: string
}

export interface ApplicationDocument {
  id: string
  name: string
  type: 'resume' | 'coverLetter' | 'other'
  url: string
  uploadedAt: string
}

export interface Application {
  id: string
  opportunityId: string
  userId: string
  status: ApplicationStatus
  documents: ApplicationDocument[]
  timeline: ApplicationTimeline[]
  notes: string
  createdAt: string
  updatedAt: string
} 