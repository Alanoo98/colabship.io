# Beta Access Functionality Documentation

This document contains all the beta access functionality that was previously implemented in Colabship. You can use this as a reference to re-implement beta access in the future.

## Overview

The beta access system was designed to control early access to the platform with invite codes. It included:
- Beta code verification
- Local storage persistence
- Modal UI for code entry
- Integration with authentication flow

## Files and Components

### 1. Beta Access Context (`src/contexts/BetaAccessContext.tsx`)

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BetaAccessContextType {
  hasBetaAccess: boolean;
  betaCode: string | null;
  checkBetaAccess: () => boolean;
  grantBetaAccess: (code: string) => void;
  revokeBetaAccess: () => void;
  verifyBetaCode: (code: string) => Promise<boolean>;
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

  const verifyBetaCode = async (code: string): Promise<boolean> => {
    // Valid beta codes (in production, this would be server-side)
    const validCodes = ['BETA2025', '84739201', '15673948', '29384756'];
    
    // Simulate server verification delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isValid = validCodes.includes(code.trim().toUpperCase());
    
    if (isValid) {
      grantBetaAccess(code);
    }
    
    return isValid;
  };

  const value: BetaAccessContextType = {
    hasBetaAccess,
    betaCode,
    checkBetaAccess,
    grantBetaAccess,
    revokeBetaAccess,
    verifyBetaCode,
  };

  return (
    <BetaAccessContext.Provider value={value}>
      {children}
    </BetaAccessContext.Provider>
  );
};
```

### 2. Beta Access Modal Component

```tsx
{/* Enhanced Beta Access Modal */}
{showBetaAccessModal && (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Beta Access">
    <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Private Beta</h3>
          <p className="text-muted-foreground">Enter your invite code to get early access.</p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); handleVerifyBeta(); }}
          className="space-y-4"
        >
          <input
            aria-label="Beta code"
            value={betaCode}
            onChange={(e) => setBetaCode(e.target.value)}
            placeholder="Enter invite code"
            autoFocus
            className="w-full rounded-md border px-3 py-2 bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setShowBetaAccessModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 glow-green">
              <Lock className="w-4 h-4 mr-2" />
              Verify
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No code? <Link to="/request-invite" className="underline hover:text-accent transition-colors">Request access</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
)}
```

### 3. Beta Access Logic in HomePage

```typescript
// State management
const [showBetaAccessModal, setShowBetaAccessModal] = useState(false);
const [betaCode, setBetaCode] = useState("");

// Beta access hook
const { hasBetaAccess, verifyBetaCode } = useBetaAccess();

// Primary CTA handler with beta check
const handlePrimaryCTA = () => {
  if (!hasBetaAccess) return setShowBetaAccessModal(true);
  if (user) return navigate("/dashboard");
  setShowAuthModal(true);
};

// Beta verification handler
const handleVerifyBeta = async () => {
  try {
    const ok = await verifyBetaCode(betaCode.trim());
    if (ok) {
      toast({ title: "Welcome to the beta 🎉", description: "Access granted." });
      setShowBetaAccessModal(false);
      navigate("/dashboard");
    } else {
      toast({ title: "Invalid code", description: "Please try again or request a new invite.", variant: "destructive" });
    }
  } catch {
    toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
  }
};
```

### 4. Beta Note in Hero Section

```tsx
<div className="flex flex-col items-center gap-2">
  <p id="beta-note" className="text-xs text-muted-foreground">Private beta • invite required</p>
</div>
```

### 5. CTA Button with Beta Access Check

```tsx
<Button
  size="lg"
  className="glow-green w-full sm:w-auto text-lg px-8 py-6 h-auto group relative overflow-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
  onClick={handlePrimaryCTA}
  aria-label={user ? "Go to Dashboard" : "Start Building Together"}
  aria-describedby="beta-note"
>
  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="relative flex items-center">
    <Sparkles className="w-5 h-5 mr-3" />
    <span className="font-semibold">{user ? "Go to Dashboard" : "Start Building Together"}</span>
    <ArrowRight className="w-5 h-5 ml-3" />
  </div>
</Button>
```

## Valid Beta Codes

The system used these hardcoded beta codes:
- `BETA2025`
- `84739201`
- `15673948`
- `29384756`

## Local Storage Keys

- `colabship-beta-access`: Stores boolean string "true" when user has beta access
- `colabship-beta-code`: Stores the beta code used to gain access

## Integration Points

1. **App.tsx**: BetaAccessProvider should wrap the app
2. **HomePage.tsx**: Primary CTA checks beta access before proceeding
3. **Authentication Flow**: Beta access is checked before showing auth modal
4. **Navigation**: Beta access is required to access dashboard

## Future Implementation Notes

When re-implementing beta access:

1. **Server-side Verification**: Move beta code validation to backend API
2. **Database Storage**: Store beta codes and access in database instead of hardcoded
3. **Admin Panel**: Create interface to manage beta codes and access
4. **Analytics**: Track beta access patterns and conversion rates
5. **Expiration**: Add time-based expiration for beta access
6. **Rate Limiting**: Implement rate limiting for beta code attempts

## Dependencies

Required imports for beta functionality:
```typescript
import { useBetaAccess } from "@/contexts/BetaAccessContext";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";
```

## Styling Classes

Key CSS classes used in beta modal:
- `glow-green`: Custom green glow effect
- `backdrop-blur-sm`: Backdrop blur for modal overlay
- `focus:ring-2 focus:ring-accent`: Focus ring styling
- `transition-all duration-200`: Smooth transitions
