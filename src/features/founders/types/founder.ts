export interface FounderProfile {
  // Project Details
  projectName: string;
  projectDescription: string;
  projectStage: 'idea' | 'mvp' | 'beta' | 'launched' | 'scaling';
  projectCategory: string;
  projectUrl?: string;
  
  // Skills Needed
  skillsNeeded: string[];
  rolesNeeded: string[];
  experienceLevel: 'junior' | 'mid' | 'senior' | 'expert';
  
  // Collaboration Preferences
  collaborationStyle: 'async' | 'sync' | 'hybrid';
  timeCommitment: 'part-time' | 'full-time' | 'flexible';
  trialPeriod: boolean;
  trialDuration?: number; // weeks
  
  // Equity & Compensation
  equityOffered: boolean;
  equityPercentage?: number;
  revenueSharing: boolean;
  revenuePercentage?: number;
  paidCompensation: boolean;
  compensationType?: 'hourly' | 'project' | 'monthly';
  
  // Legal Preferences
  ndaRequired: boolean;
  ipProtection: boolean;
  formalAgreement: boolean;
  
  // Contact & Availability
  timezone: string;
  availability: string;
  preferredContact: 'email' | 'discord' | 'slack' | 'in_app';
  contactInfo: string;
  
  // Additional Info
  additionalNotes: string;
  timeline: string;
  budget?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  views: number;
  applications: number;
}

export interface CollaboratorProfile {
  // Personal Info
  name: string;
  email: string;
  location: string;
  timezone: string;
  
  // Skills & Experience
  skills: string[];
  roles: string[];
  experienceLevel: 'junior' | 'mid' | 'senior' | 'expert';
  yearsOfExperience: number;
  
  // Portfolio
  portfolio: {
    title: string;
    description: string;
    url?: string;
    technologies: string[];
  }[];
  
  // Collaboration Preferences
  collaborationStyle: 'async' | 'sync' | 'hybrid';
  timeCommitment: 'part-time' | 'full-time' | 'flexible';
  availability: string;
  
  // Compensation Preferences
  equityInterest: boolean;
  revenueSharing: boolean;
  paidCompensation: boolean;
  compensationType?: 'hourly' | 'project' | 'monthly';
  
  // Legal Preferences
  ndaComfortable: boolean;
  ipProtection: boolean;
  formalAgreement: boolean;
  
  // Contact
  preferredContact: 'email' | 'discord' | 'slack' | 'in_app';
  contactInfo: string;
  
  // Additional Info
  bio: string;
  motivation: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'archived';
  reputation: number;
  completedProjects: number;
}

export interface Match {
  founderProfile: FounderProfile;
  collaboratorProfile: CollaboratorProfile;
  matchScore: number; // 0-100
  matchReasons: string[];
  mutualInterests: string[];
  compatibilityFactors: {
    skills: number;
    timezone: number;
    collaborationStyle: number;
    compensation: number;
    legal: number;
  };
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

export interface Application {
  id: string;
  founderProfileId: string;
  collaboratorProfileId: string;
  message: string;
  proposedCompensation?: {
    type: 'equity' | 'revenue' | 'paid' | 'combination';
    details: string;
  };
  timeline: string;
  availability: string;
  portfolio: {
    title: string;
    description: string;
    url?: string;
  }[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: string;
  updatedAt: string;
}

export interface LegalTemplate {
  id: string;
  name: string;
  type: 'nda' | 'ip_agreement' | 'founders_agreement' | 'contributor_agreement' | 'term_sheet' | 'partnership_agreement';
  description: string;
  content: string;
  variables: {
    name: string;
    type: 'string' | 'number' | 'date' | 'boolean';
    required: boolean;
    defaultValue?: any;
  }[];
  regions: string[]; // Country codes
  createdAt: string;
  updatedAt: string;
}

export interface Collaboration {
  id: string;
  founderProfileId: string;
  collaboratorProfileId: string;
  projectName: string;
  description: string;
  stage: 'trial' | 'formal' | 'completed' | 'terminated';
  startDate: string;
  endDate?: string;
  
  // Trial Period
  trialPeriod: boolean;
  trialDuration?: number; // weeks
  trialProject?: string;
  
  // Agreements
  agreements: {
    type: string;
    signed: boolean;
    signedAt?: string;
    documentUrl?: string;
  }[];
  
  // Communication
  communicationChannel: string;
  meetingFrequency: string;
  
  // Progress
  milestones: {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    completedAt?: string;
  }[];
  
  // Compensation
  compensation: {
    equity?: number;
    revenueShare?: number;
    paidAmount?: number;
    paidType?: string;
  };
  
  createdAt: string;
  updatedAt: string;
}

export type ProjectStage = 'idea' | 'mvp' | 'beta' | 'launched' | 'scaling';
export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'expert';
export type CollaborationStyle = 'async' | 'sync' | 'hybrid';
export type TimeCommitment = 'part-time' | 'full-time' | 'flexible';
export type CompensationType = 'hourly' | 'project' | 'monthly';
export type ContactMethod = 'email' | 'discord' | 'slack' | 'in_app';
export type LegalTemplateType = 'nda' | 'ip_agreement' | 'founders_agreement' | 'contributor_agreement' | 'term_sheet' | 'partnership_agreement'; 