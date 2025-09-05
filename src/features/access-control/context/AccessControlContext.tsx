import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define different types of access control
export type AccessType = 'beta';

// Define access levels
export type AccessLevel = 'none' | 'basic' | 'full' | 'admin';

// Interface for access configuration
export interface AccessConfig {
  type: AccessType;
  level: AccessLevel;
  code?: string;
  expiresAt?: Date;
  features?: string[];
  metadata?: Record<string, unknown>;
}

// Interface for access validation rules
export interface AccessRule {
  type: AccessType;
  validCodes: string[];
  defaultLevel: AccessLevel;
  features: Record<AccessLevel, string[]>;
  expirationDays?: number;
}

// Main context interface
interface AccessControlContextType {
  // Current access state
  currentAccess: AccessConfig | null;
  hasAccess: (type: AccessType, level?: AccessLevel) => boolean;
  hasFeature: (feature: string) => boolean;
  
  // Access management
  grantAccess: (type: AccessType, code: string, level?: AccessLevel) => boolean;
  revokeAccess: (type: AccessType) => void;
  clearAllAccess: () => void;
  
  // Access information
  getAccessLevel: (type: AccessType) => AccessLevel;
  getAccessFeatures: (type: AccessType) => string[];
  isAccessExpired: (type: AccessType) => boolean;
  
  // Configuration
  setAccessRules: (rules: AccessRule[]) => void;
  getAccessRules: () => AccessRule[];
}

export const AccessControlContext = createContext<AccessControlContextType | undefined>(undefined);

// Default access rules
const defaultAccessRules: AccessRule[] = [
  {
    type: 'beta',
    validCodes: [
      "BETA2025",
      "84739201", 
      "15673948",
      "29384756",
      "48573926",
      "73948561",
      "38475629",
      "75629384",
      "29384765",
      "84739265"
    ],
    defaultLevel: 'basic',
    features: {
      none: [],
      basic: ['app_access', 'project_browsing', 'basic_profile'],
      full: ['app_access', 'project_browsing', 'project_creation', 'advanced_features'],
      admin: ['app_access', 'project_browsing', 'project_creation', 'advanced_features', 'admin_panel']
    },
    expirationDays: 30
  }
];

export const useAccessControl = () => {
  const context = useContext(AccessControlContext);
  if (context === undefined) {
    throw new Error('useAccessControl must be used within an AccessControlProvider');
  }
  return context;
};

interface AccessControlProviderProps {
  children: ReactNode;
  initialRules?: AccessRule[];
}

export const AccessControlProvider: React.FC<AccessControlProviderProps> = ({ 
  children, 
  initialRules = defaultAccessRules 
}) => {
  const [currentAccess, setCurrentAccess] = useState<AccessConfig | null>(null);
  const [accessRules, setAccessRulesState] = useState<AccessRule[]>(initialRules);

  // Load access from localStorage on mount
  useEffect(() => {
    const storedAccess = localStorage.getItem('colabship-access-control');
    if (storedAccess) {
      try {
        const parsed = JSON.parse(storedAccess);
        // Check if access is expired
        if (parsed.expiresAt && new Date(parsed.expiresAt) < new Date()) {
          localStorage.removeItem('colabship-access-control');
        } else {
          // Convert expiresAt back to Date object if it exists
          if (parsed.expiresAt) {
            parsed.expiresAt = new Date(parsed.expiresAt);
          }
          setCurrentAccess(parsed);
        }
      } catch (error) {
        console.error('Failed to parse stored access:', error);
        localStorage.removeItem('colabship-access-control');
      }
    }
  }, []);

  // Save access to localStorage when it changes
  useEffect(() => {
    if (currentAccess) {
      localStorage.setItem('colabship-access-control', JSON.stringify(currentAccess));
    } else {
      localStorage.removeItem('colabship-access-control');
    }
  }, [currentAccess]);

  const hasAccess = (type: AccessType, level: AccessLevel = 'basic'): boolean => {
    // Grant full access to everyone - platform is now free
    return true;
  };

  const hasFeature = (feature: string): boolean => {
    // Grant all features to everyone - platform is now free
    return true;
  };

  const grantAccess = (type: AccessType, code: string, level?: AccessLevel): boolean => {
    const rule = accessRules.find(r => r.type === type);
    if (!rule || !rule.validCodes.includes(code.toUpperCase())) {
      return false;
    }

    const accessLevel = level || rule.defaultLevel;
    const expiresAt = rule.expirationDays 
      ? new Date(Date.now() + rule.expirationDays * 24 * 60 * 60 * 1000)
      : undefined;

    const newAccess: AccessConfig = {
      type,
      level: accessLevel,
      code: code.toUpperCase(),
      expiresAt,
      features: rule.features[accessLevel],
      metadata: {
        grantedAt: new Date().toISOString(),
        ruleType: type
      }
    };

    setCurrentAccess(newAccess);
    return true;
  };

  const revokeAccess = (type: AccessType) => {
    if (currentAccess?.type === type) {
      setCurrentAccess(null);
    }
  };

  const clearAllAccess = () => {
    setCurrentAccess(null);
  };

  const getAccessLevel = (type: AccessType): AccessLevel => {
    if (currentAccess?.type === type) {
      return currentAccess.level;
    }
    return 'none';
  };

  const getAccessFeatures = (type: AccessType): string[] => {
    if (currentAccess?.type === type) {
      return currentAccess.features || [];
    }
    return [];
  };

  const isAccessExpired = (type: AccessType): boolean => {
    if (!currentAccess || currentAccess.type !== type) return true;
    if (!currentAccess.expiresAt) return false;
    return new Date(currentAccess.expiresAt) < new Date();
  };

  const setAccessRules = (rules: AccessRule[]) => {
    setAccessRulesState(rules);
  };

  const getAccessRules = (): AccessRule[] => {
    return accessRules;
  };

  const value: AccessControlContextType = {
    currentAccess,
    hasAccess,
    hasFeature,
    grantAccess,
    revokeAccess,
    clearAllAccess,
    getAccessLevel,
    getAccessFeatures,
    isAccessExpired,
    setAccessRules,
    getAccessRules,
  };

  return (
    <AccessControlContext.Provider value={value}>
      {children}
    </AccessControlContext.Provider>
  );
}; 