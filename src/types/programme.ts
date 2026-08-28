export type StudyMode = 'Full-Time' | 'Part-Time' | 'Weekend' | 'Distance Learning';

export interface Programme {
  id: string;
  name: string;
  code?: string;
  collegeId: string;
  level: string; // e.g., 'ND', 'HND', 'NCE', 'Certificate', 'Diploma'
  duration: string;
  mode: StudyMode[];
  description?: string;
  entryRequirements?: string[];
  careerOpportunities?: string[];
}
