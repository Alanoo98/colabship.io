import React, { createContext, useContext, useState, useEffect } from 'react';
import { FounderProfile, CollaboratorProfile, Application, Match } from '../types/founder';

interface FounderContextType {
  // Founder Profiles
  founderProfiles: FounderProfile[];
  currentFounderProfile: FounderProfile | null;
  createFounderProfile: (profile: Omit<FounderProfile, 'createdAt' | 'updatedAt' | 'status' | 'views' | 'applications'>) => void;
  updateFounderProfile: (id: string, updates: Partial<FounderProfile>) => void;
  deleteFounderProfile: (id: string) => void;
  
  // Applications
  applications: Application[];
  createApplication: (application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  
  // Matches
  matches: Match[];
  generateMatches: (founderProfileId: string) => Match[];
  
  // Loading States
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const FounderContext = createContext<FounderContextType | undefined>(undefined);

export const useFounder = () => {
  const context = useContext(FounderContext);
  if (context === undefined) {
    throw new Error('useFounder must be used within a FounderProvider');
  }
  return context;
};

interface FounderProviderProps {
  children: React.ReactNode;
}

export const FounderProvider: React.FC<FounderProviderProps> = ({ children }) => {
  const [founderProfiles, setFounderProfiles] = useState<FounderProfile[]>([]);
  const [currentFounderProfile, setCurrentFounderProfile] = useState<FounderProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedProfiles = localStorage.getItem('colabship-founder-profiles');
        const storedApplications = localStorage.getItem('colabship-applications');
        const storedMatches = localStorage.getItem('colabship-matches');
        
        if (storedProfiles) {
          setFounderProfiles(JSON.parse(storedProfiles));
        }
        if (storedApplications) {
          setApplications(JSON.parse(storedApplications));
        }
        if (storedMatches) {
          setMatches(JSON.parse(storedMatches));
        }
      } catch (error) {
        console.error('Error loading founder data:', error);
      }
    };
    
    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('colabship-founder-profiles', JSON.stringify(founderProfiles));
  }, [founderProfiles]);

  useEffect(() => {
    localStorage.setItem('colabship-applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('colabship-matches', JSON.stringify(matches));
  }, [matches]);

  const createFounderProfile = (profileData: Omit<FounderProfile, 'createdAt' | 'updatedAt' | 'status' | 'views' | 'applications'>) => {
    const newProfile: FounderProfile = {
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      views: 0,
      applications: 0
    };
    
    setFounderProfiles(prev => [...prev, newProfile]);
    setCurrentFounderProfile(newProfile);
  };

  const updateFounderProfile = (id: string, updates: Partial<FounderProfile>) => {
    setFounderProfiles(prev => 
      prev.map(profile => 
        profile.projectName === id 
          ? { ...profile, ...updates, updatedAt: new Date().toISOString() }
          : profile
      )
    );
    
    if (currentFounderProfile?.projectName === id) {
      setCurrentFounderProfile(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
    }
  };

  const deleteFounderProfile = (id: string) => {
    setFounderProfiles(prev => prev.filter(profile => profile.projectName !== id));
    if (currentFounderProfile?.projectName === id) {
      setCurrentFounderProfile(null);
    }
  };

  const createApplication = (applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newApplication: Application = {
      ...applicationData,
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setApplications(prev => [...prev, newApplication]);
    
    // Update founder profile application count
    updateFounderProfile(applicationData.founderProfileId, {
      applications: (currentFounderProfile?.applications || 0) + 1
    });
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status, updatedAt: new Date().toISOString() }
          : app
      )
    );
  };

  const generateMatches = (founderProfileId: string): Match[] => {
    const founderProfile = founderProfiles.find(fp => fp.projectName === founderProfileId);
    if (!founderProfile) return [];

    // Mock collaborator profiles for demonstration
    // In a real app, these would come from a database
    const mockCollaborators: CollaboratorProfile[] = [
      {
        name: "Alex Chen",
        email: "alex@example.com",
        location: "San Francisco, CA",
        timezone: "UTC-8",
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        roles: ["Full Stack Developer", "DevOps Engineer"],
        experienceLevel: "senior",
        yearsOfExperience: 5,
        portfolio: [
          {
            title: "E-commerce Platform",
            description: "Built a scalable e-commerce platform with React and Node.js",
            url: "https://example.com",
            technologies: ["React", "Node.js", "PostgreSQL"]
          }
        ],
        collaborationStyle: "async",
        timeCommitment: "part-time",
        availability: "weekdays",
        equityInterest: true,
        revenueSharing: true,
        paidCompensation: false,
        ndaComfortable: true,
        ipProtection: true,
        formalAgreement: true,
        preferredContact: "email",
        contactInfo: "alex@example.com",
        bio: "Full-stack developer with 5 years of experience building scalable web applications.",
        motivation: "Looking to join exciting projects and build products that make a difference.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active",
        reputation: 4.8,
        completedProjects: 12
      },
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        location: "New York, NY",
        timezone: "UTC-5",
        skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"],
        roles: ["UI/UX Designer", "Product Designer"],
        experienceLevel: "mid",
        yearsOfExperience: 3,
        portfolio: [
          {
            title: "Mobile App Design",
            description: "Designed user interfaces for a fintech mobile app",
            url: "https://example.com",
            technologies: ["Figma", "Adobe XD", "Sketch"]
          }
        ],
        collaborationStyle: "hybrid",
        timeCommitment: "flexible",
        availability: "flexible",
        equityInterest: true,
        revenueSharing: false,
        paidCompensation: true,
        compensationType: "project",
        ndaComfortable: true,
        ipProtection: true,
        formalAgreement: true,
        preferredContact: "discord",
        contactInfo: "sarah#1234",
        bio: "UI/UX designer passionate about creating intuitive user experiences.",
        motivation: "Want to work on innovative projects and grow my design skills.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active",
        reputation: 4.6,
        completedProjects: 8
      }
    ];

    // Simple matching algorithm
    const matches: Match[] = mockCollaborators.map(collaborator => {
      const skillMatch = founderProfile.skillsNeeded.filter(skill => 
        collaborator.skills.includes(skill)
      ).length / founderProfile.skillsNeeded.length;
      
      const roleMatch = founderProfile.rolesNeeded.filter(role => 
        collaborator.roles.includes(role)
      ).length / founderProfile.rolesNeeded.length;
      
      const collaborationMatch = founderProfile.collaborationStyle === collaborator.collaborationStyle ? 1 : 0.5;
      
      const compensationMatch = 
        (founderProfile.equityOffered && collaborator.equityInterest) ||
        (founderProfile.revenueSharing && collaborator.revenueSharing) ||
        (founderProfile.paidCompensation && collaborator.paidCompensation) ? 1 : 0.3;
      
      const legalMatch = 
        (founderProfile.ndaRequired && collaborator.ndaComfortable) &&
        (founderProfile.ipProtection && collaborator.ipProtection) ? 1 : 0.7;
      
      const matchScore = Math.round(
        (skillMatch * 0.3 + roleMatch * 0.25 + collaborationMatch * 0.2 + 
         compensationMatch * 0.15 + legalMatch * 0.1) * 100
      );
      
      const matchReasons = [];
      if (skillMatch > 0.5) matchReasons.push("Skills match");
      if (roleMatch > 0.5) matchReasons.push("Role alignment");
      if (collaborationMatch === 1) matchReasons.push("Collaboration style match");
      if (compensationMatch === 1) matchReasons.push("Compensation alignment");
      
      const mutualInterests = founderProfile.skillsNeeded.filter(skill => 
        collaborator.skills.includes(skill)
      );
      
      return {
        founderProfile,
        collaboratorProfile: collaborator,
        matchScore,
        matchReasons,
        mutualInterests,
        compatibilityFactors: {
          skills: Math.round(skillMatch * 100),
          timezone: 80, // Mock timezone compatibility
          collaborationStyle: Math.round(collaborationMatch * 100),
          compensation: Math.round(compensationMatch * 100),
          legal: Math.round(legalMatch * 100)
        },
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      };
    }).filter(match => match.matchScore >= 60); // Only show matches with 60%+ compatibility
    
    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    return matches;
  };

  const value: FounderContextType = {
    founderProfiles,
    currentFounderProfile,
    createFounderProfile,
    updateFounderProfile,
    deleteFounderProfile,
    applications,
    createApplication,
    updateApplicationStatus,
    matches,
    generateMatches,
    isLoading,
    setIsLoading
  };

  return (
    <FounderContext.Provider value={value}>
      {children}
    </FounderContext.Provider>
  );
}; 