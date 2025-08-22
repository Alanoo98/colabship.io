import { LucideIcon } from "lucide-react";

export type AccessType = 'beta';

export type AccessLevel = 'none' | 'basic' | 'full' | 'admin';

export interface AccessConfig {
  type: AccessType;
  level: AccessLevel;
  grantedAt: string;
  expiresAt?: string;
  code: string;
  features: string[];
  metadata?: Record<string, unknown>;
}

export interface AccessRule {
  type: AccessType;
  validCodes: string[];
  defaultLevel: AccessLevel;
  features: {
    none: string[];
    basic: string[];
    full: string[];
    admin: string[];
  };
  expirationDays?: number;
}

export interface AccessConfigDisplay {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  validCodes: string[];
}

// Beta tester feedback types
export type TestingFocus = 
  | 'bug_finding'
  | 'design_ui'
  | 'navigation_flow'
  | 'information_architecture'
  | 'performance'
  | 'accessibility'
  | 'mobile_experience'
  | 'general_feedback';

export interface TestingFocusOption {
  id: TestingFocus;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface BetaTesterProfile {
  testingFocus: TestingFocus[];
  feedbackFrequency: 'daily' | 'weekly' | 'as_needed';
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  preferredContactMethod: 'email' | 'discord' | 'slack' | 'in_app';
  contactInfo?: string;
  additionalNotes?: string;
  // New comprehensive fields
  name?: string;
  location?: string;
  timezone?: string;
  primaryRole?: string;
  yearsOfExperience?: string;
  previousProjects?: string;
  techStack?: string;
  collaborationExperience?: string;
  motivation?: string;
  availability?: 'full_time' | 'part_time' | 'weekends' | 'flexible';
  // Social media links
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
} 