import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BetaAccessContextType {
  hasBetaAccess: boolean;
  betaCode: string | null;
  checkBetaAccess: () => boolean;
  grantBetaAccess: (code: string) => void;
  revokeBetaAccess: () => void;
}

const BetaAccessContext = createContext<BetaAccessContextType | undefined>(undefined);

export const useBetaAccess = () => {
  const context = useContext(BetaAccessContext);
  if (context === undefined) {
    throw new Error('useBetaAccess must be used within a BetaAccessProvider');
  }
  return context;
};

interface BetaAccessProviderProps {
  children: ReactNode;
}

export const BetaAccessProvider: React.FC<BetaAccessProviderProps> = ({ children }) => {
  const [hasBetaAccess, setHasBetaAccess] = useState(false);
  const [betaCode, setBetaCode] = useState<string | null>(null);

  // Check for existing beta access on mount
  useEffect(() => {
    const storedAccess = localStorage.getItem('colabship-beta-access');
    const storedCode = localStorage.getItem('colabship-beta-code');
    
    if (storedAccess === 'true' && storedCode) {
      setHasBetaAccess(true);
      setBetaCode(storedCode);
    }
  }, []);

  const checkBetaAccess = (): boolean => {
    const storedAccess = localStorage.getItem('colabship-beta-access');
    return storedAccess === 'true';
  };

  const grantBetaAccess = (code: string) => {
    localStorage.setItem('colabship-beta-access', 'true');
    localStorage.setItem('colabship-beta-code', code);
    setHasBetaAccess(true);
    setBetaCode(code);
  };

  const revokeBetaAccess = () => {
    localStorage.removeItem('colabship-beta-access');
    localStorage.removeItem('colabship-beta-code');
    setHasBetaAccess(false);
    setBetaCode(null);
  };

  const value: BetaAccessContextType = {
    hasBetaAccess,
    betaCode,
    checkBetaAccess,
    grantBetaAccess,
    revokeBetaAccess,
  };

  return (
    <BetaAccessContext.Provider value={value}>
      {children}
    </BetaAccessContext.Provider>
  );
}; 