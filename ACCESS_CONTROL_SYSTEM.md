# 🚀 Global Access Control System

## Overview

The Global Access Control System is a flexible, scalable solution for managing different types of access to your application. It replaces the simple beta access system with a comprehensive framework that can handle multiple access types, levels, and features.

## 🎯 Key Features

### **Multiple Access Types**
- **Beta Access**: For private beta testing
- **Version Testing**: For testing new versions
- **Feature Flags**: For experimental features
- **Premium Access**: For paid features
- **Admin Access**: For administrative functions

### **Access Levels**
- **None**: No access
- **Basic**: Limited access
- **Full**: Complete access
- **Admin**: Administrative access

### **Flexible Configuration**
- Custom access codes for each type
- Configurable expiration dates
- Feature-based access control
- Metadata storage for tracking

## 🏗️ Architecture

### **Core Components**

#### 1. AccessControlContext (`src/contexts/AccessControlContext.tsx`)
The main context that manages all access control logic.

```typescript
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
```

#### 2. AccessControl Page (`src/pages/AccessControl.tsx`)
A flexible page that can handle different types of access requests.

#### 3. ProtectedRoute Component (`src/components/ProtectedRoute.tsx`)
Route protection that checks for any valid access type.

## 🔧 Usage Examples

### **Basic Usage**

```typescript
import { useAccessControl } from '@/contexts/AccessControlContext';

const MyComponent = () => {
  const { hasAccess, hasFeature, grantAccess } = useAccessControl();

  // Check if user has beta access
  if (hasAccess('beta', 'basic')) {
    // Show beta features
  }

  // Check if user has a specific feature
  if (hasFeature('project_creation')) {
    // Show project creation button
  }

  // Grant access programmatically
  const success = grantAccess('beta', 'BETA2025');
};
```

### **Feature-Based Access Control**

```typescript
// In your component
const { hasFeature } = useAccessControl();

return (
  <div>
    {hasFeature('project_creation') && (
      <Button>Create Project</Button>
    )}
    
    {hasFeature('advanced_analytics') && (
      <AnalyticsDashboard />
    )}
  </div>
);
```

### **Access Level Checking**

```typescript
const { hasAccess, getAccessLevel } = useAccessControl();

// Check for specific access level
if (hasAccess('beta', 'full')) {
  // Show advanced features
}

// Get current access level
const level = getAccessLevel('beta'); // 'none' | 'basic' | 'full' | 'admin'
```

## ⚙️ Configuration

### **Default Access Rules**

The system comes with pre-configured rules for common use cases:

```typescript
const defaultAccessRules: AccessRule[] = [
  {
    type: 'beta',
    validCodes: ["BETA2025", "84739201", ...],
    defaultLevel: 'basic',
    features: {
      none: [],
      basic: ['app_access', 'project_browsing', 'basic_profile'],
      full: ['app_access', 'project_browsing', 'project_creation', 'advanced_features'],
      admin: ['app_access', 'project_browsing', 'project_creation', 'advanced_features', 'admin_panel']
    },
    expirationDays: 30
  },
  // ... more rules
];
```

### **Adding Custom Access Rules**

```typescript
import { AccessControlProvider } from '@/contexts/AccessControlContext';

const customRules: AccessRule[] = [
  {
    type: 'premium',
    validCodes: ['PREMIUM2024', 'VIP2024'],
    defaultLevel: 'full',
    features: {
      none: [],
      basic: ['basic_features'],
      full: ['basic_features', 'premium_features', 'priority_support'],
      admin: ['basic_features', 'premium_features', 'priority_support', 'admin_access']
    },
    expirationDays: 365
  }
];

// In your App.tsx
<AccessControlProvider initialRules={customRules}>
  {/* Your app */}
</AccessControlProvider>
```

### **Dynamic Rule Updates**

```typescript
const { setAccessRules, getAccessRules } = useAccessControl();

// Update rules dynamically
const updateRules = () => {
  const currentRules = getAccessRules();
  const newRules = [...currentRules, newRule];
  setAccessRules(newRules);
};
```

## 🔄 Migration from Beta Access

### **What Changed**

1. **Context**: `BetaAccessContext` → `AccessControlContext`
2. **Route**: `/beta` → `/access`
3. **Provider**: `BetaAccessProvider` → `AccessControlProvider`
4. **Page**: `BetaAccess` → `AccessControl`

### **Migration Steps**

1. **Update App.tsx**:
```typescript
// Old
import { BetaAccessProvider } from "@/contexts/BetaAccessContext";
import BetaAccess from "./pages/BetaAccess";

// New
import { AccessControlProvider } from "@/contexts/AccessControlContext";
import AccessControl from "./pages/AccessControl";
```

2. **Update Routes**:
```typescript
// Old
<Route path="/beta" element={<BetaAccess />} />

// New
<Route path="/access" element={<AccessControl />} />
```

3. **Update Components**:
```typescript
// Old
import { useBetaAccess } from '@/contexts/BetaAccessContext';
const { hasBetaAccess } = useBetaAccess();

// New
import { useAccessControl } from '@/contexts/AccessControlContext';
const { hasAccess } = useAccessControl();
if (hasAccess('beta', 'basic')) { /* ... */ }
```

## 🚀 Future Use Cases

### **Version Testing**
```typescript
// Grant version testing access
grantAccess('version', 'V2.0.0', 'full');

// Check for new version features
if (hasFeature('new_ui')) {
  // Show new UI components
}
```

### **Feature Flags**
```typescript
// Grant feature flag access
grantAccess('feature', 'FEATURE_FLAG_1', 'basic');

// Check for experimental features
if (hasFeature('experimental_chat')) {
  // Enable experimental chat
}
```

### **Premium Features**
```typescript
// Grant premium access
grantAccess('premium', 'PREMIUM2024', 'full');

// Check for premium features
if (hasFeature('priority_support')) {
  // Show priority support options
}
```

### **Admin Access**
```typescript
// Grant admin access
grantAccess('admin', 'ADMIN2024', 'admin');

// Check for admin features
if (hasFeature('user_management')) {
  // Show admin panel
}
```

## 🔐 Security Considerations

### **Code Validation**
- All access codes are validated against the rules
- Codes are case-insensitive but stored in uppercase
- Invalid codes are rejected immediately

### **Expiration Handling**
- Access automatically expires based on `expirationDays`
- Expired access is cleared on app load
- Users are redirected to access page when expired

### **Local Storage**
- Access data is stored in localStorage for persistence
- Sensitive data should be encrypted in production
- Consider server-side validation for production use

## 🛠️ Production Deployment

### **Server-Side Integration**

For production, you'll want to move access validation to the server:

```typescript
// API endpoint for access validation
const validateAccess = async (type: AccessType, code: string) => {
  const response = await fetch('/api/access/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, code })
  });
  return response.json();
};

// Update grantAccess to use API
const grantAccess = async (type: AccessType, code: string) => {
  const result = await validateAccess(type, code);
  if (result.valid) {
    // Grant access locally
    setCurrentAccess(result.accessConfig);
    return true;
  }
  return false;
};
```

### **Database Schema**

```sql
-- Access codes table
CREATE TABLE access_codes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL,
  level VARCHAR(20) NOT NULL,
  max_uses INTEGER DEFAULT 1,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User access table
CREATE TABLE user_access (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  access_type VARCHAR(20) NOT NULL,
  access_level VARCHAR(20) NOT NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  granted_by_code VARCHAR(50)
);
```

## 📊 Monitoring & Analytics

### **Access Tracking**

```typescript
// Track access events
const trackAccess = (type: AccessType, level: AccessLevel, code: string) => {
  analytics.track('access_granted', {
    type,
    level,
    code: code.substring(0, 3) + '***', // Partial code for privacy
    timestamp: new Date().toISOString()
  });
};

// Usage in grantAccess
const grantAccess = (type: AccessType, code: string, level?: AccessLevel) => {
  // ... validation logic
  trackAccess(type, accessLevel, code);
  // ... grant access
};
```

### **Feature Usage Analytics**

```typescript
// Track feature usage
const trackFeatureUsage = (feature: string) => {
  analytics.track('feature_used', {
    feature,
    access_type: currentAccess?.type,
    access_level: currentAccess?.level,
    timestamp: new Date().toISOString()
  });
};

// Usage in components
if (hasFeature('project_creation')) {
  trackFeatureUsage('project_creation');
  // Show project creation UI
}
```

## 🎯 Best Practices

### **1. Feature Naming**
Use descriptive, consistent feature names:
```typescript
// Good
'project_creation', 'advanced_analytics', 'priority_support'

// Avoid
'feature1', 'new_thing', 'test'
```

### **2. Access Level Hierarchy**
Always define all access levels, even if some are empty:
```typescript
features: {
  none: [],
  basic: ['basic_features'],
  full: ['basic_features', 'advanced_features'],
  admin: ['basic_features', 'advanced_features', 'admin_features']
}
```

### **3. Code Management**
- Use environment variables for sensitive codes
- Rotate codes regularly
- Monitor code usage and abuse

### **4. User Experience**
- Provide clear feedback when access is denied
- Show helpful error messages
- Guide users to obtain access codes

## 🔧 Troubleshooting

### **Common Issues**

1. **Access not persisting**: Check localStorage permissions
2. **Invalid codes**: Verify code format and case sensitivity
3. **Expired access**: Check expiration dates in rules
4. **Feature not showing**: Verify feature names match exactly

### **Debug Mode**

```typescript
// Enable debug logging
const DEBUG_ACCESS = true;

const grantAccess = (type: AccessType, code: string) => {
  if (DEBUG_ACCESS) {
    console.log('Granting access:', { type, code });
  }
  // ... rest of logic
};
```

This global access control system provides a solid foundation for managing different types of access in your application, with the flexibility to grow and adapt as your needs change! 🚀 