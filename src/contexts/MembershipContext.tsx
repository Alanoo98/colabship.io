import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MembershipContextType {
  isMember: boolean;
  upgradeToMember: () => void;
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined);

export const MembershipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMember, setIsMember] = useState(false);

  const upgradeToMember = () => {
    setIsMember(true);
  };

  return (
    <MembershipContext.Provider value={{ isMember, upgradeToMember }}>
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => {
  const context = useContext(MembershipContext);
  if (context === undefined) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return context;
}; 