import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MembershipContextType {
  isMember: boolean;
  projectCount: number;
  maxProjects: number;
  canCreateProject: boolean;
  upgradeToMembership: () => void;
  createProject: () => boolean;
  getMembershipStatus: () => {
    isMember: boolean;
    projectCount: number;
    maxProjects: number;
    canCreateProject: boolean;
  };
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined);

export const useMembership = () => {
  const context = useContext(MembershipContext);
  if (context === undefined) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return context;
};

interface MembershipProviderProps {
  children: ReactNode;
}

export const MembershipProvider: React.FC<MembershipProviderProps> = ({ children }) => {
  const [isMember, setIsMember] = useState(false);
  const [projectCount, setProjectCount] = useState(0);

  // Load membership status from localStorage on mount
  useEffect(() => {
    const savedMembership = localStorage.getItem('colabship-membership');
    const savedProjectCount = localStorage.getItem('colabship-project-count');
    
    if (savedMembership) {
      setIsMember(JSON.parse(savedMembership));
    }
    
    if (savedProjectCount) {
      setProjectCount(JSON.parse(savedProjectCount));
    }
  }, []);

  const maxProjects = isMember ? Infinity : 1;
  const canCreateProject = projectCount < maxProjects;

  const upgradeToMembership = () => {
    setIsMember(true);
    localStorage.setItem('colabship-membership', 'true');
    // In a real app, this would integrate with a payment processor
    console.log('Upgrading to membership...');
  };

  const createProject = (): boolean => {
    if (canCreateProject) {
      setProjectCount(prev => prev + 1);
      localStorage.setItem('colabship-project-count', JSON.stringify(projectCount + 1));
      return true;
    }
    return false;
  };

  const getMembershipStatus = () => ({
    isMember,
    projectCount,
    maxProjects,
    canCreateProject,
  });

  const value: MembershipContextType = {
    isMember,
    projectCount,
    maxProjects,
    canCreateProject,
    upgradeToMembership,
    createProject,
    getMembershipStatus,
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
}; 