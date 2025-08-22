import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Zap, Clock, Shield, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";
import CodeProcessingAnimation from "@/components/common/CodeProcessingAnimation";
import CodeInput from "@/components/common/CodeInput";
import { useAccessControl } from "@/features/access-control/hooks/useAccessControl";
import { accessConfigs } from "@/features/access-control/config/accessConfigs";
import BetaTesterOnboarding from "./BetaTesterOnboarding";
import { BetaTesterProfile } from "../types/accessControl";

const AccessControlForm = () => {
  const accessType = 'beta';
  const [inviteCode, setInviteCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [betaProfile, setBetaProfile] = useState<BetaTesterProfile | null>(null);
  const navigate = useNavigate();
  const { grantAccess, hasAccess, currentAccess } = useAccessControl();

  const currentConfig = accessConfigs[accessType];
  const CurrentIcon = currentConfig.icon;

  const handleCodeValidation = async () => {
    if (!inviteCode.trim()) {
      setErrorMessage("Please enter an access code");
      setIsValid(false);
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setIsValid(null);
  };

  const handleProcessingComplete = (isValidCode: boolean) => {
    setIsProcessing(false);
    
    if (isValidCode) {
      setIsValid(true);
      // Grant access through the new context
      const success = grantAccess(accessType, inviteCode.toUpperCase());
      
      if (success) {
        // Show onboarding instead of immediately redirecting
        setShowOnboarding(true);
      } else {
        setIsValid(false);
        setErrorMessage("Failed to grant access. Please try again.");
      }
    } else {
      setIsValid(false);
      setErrorMessage("Access code not found in authorized database. Please check your code and try again.");
    }
  };

  const handleOnboardingComplete = (profile: BetaTesterProfile) => {
    setBetaProfile(profile);
    // Store beta profile in localStorage
    localStorage.setItem('colabship-beta-profile', JSON.stringify(profile));
    // Redirect to main app
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleOnboardingSkip = () => {
    // Redirect to main app without profile
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };



  // Show onboarding if access was granted (check this first)
  if (showOnboarding) {
    return (
      <BetaTesterOnboarding
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  // Check if user already has access (but hasn't completed onboarding)
  if (hasAccess(accessType, 'basic')) {

    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Access Already Granted</h1>
        <p className="text-xl text-muted-foreground mb-8">
          You already have {accessType} access to Colabship.
        </p>
        <Button onClick={() => navigate('/')} className="glow-green">
          Go to App
        </Button>
      </div>
    );
  }

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CurrentIcon className={`w-16 h-16 ${currentConfig.color}`} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <HackerText 
              text={currentConfig.title} 
              className="gradient-text"
              delay={300}
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {currentConfig.description}
          </p>
          

          
          {/* About Link */}
          <div className="text-center space-y-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/about" className="text-muted-foreground hover:text-accent">
                About Colabship.io
              </Link>
            </Button>
            <br />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                localStorage.removeItem('colabship-access-control');
                window.location.reload();
              }}
              className="text-xs"
            >
              Clear Access (Debug)
            </Button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="max-w-md mx-auto">
          <Card className="bg-background border-accent/20">
            <CardHeader>
              <CardTitle className="text-center text-accent">
                Enter Your Access Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <CodeInput
                  value={inviteCode}
                  onChange={setInviteCode}
                  disabled={isProcessing}
                  placeholder="Enter the access code you received"
                  onEnter={handleCodeValidation}
                />
              </div>

              {isValid === false && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {isValid === true && (
                <Alert className="border-green-500/20 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-500">
                    Access granted! Setting up your beta profile...
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                className="w-full glow-green" 
                onClick={handleCodeValidation}
                disabled={isProcessing}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Access {currentConfig.title}
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollReveal>

      {/* Access Information */}
      <ScrollReveal delay={400}>
        <div className="max-w-2xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg border border-accent/20">
              <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Secure Access</h3>
              <p className="text-sm text-muted-foreground">
                All access codes are validated against our secure database
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg border border-accent/20">
              <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Temporary Access</h3>
              <p className="text-sm text-muted-foreground">
                Access codes may expire based on the type and duration
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg border border-accent/20">
              <Star className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Early Features</h3>
              <p className="text-sm text-muted-foreground">
                Get access to new features before they're publicly available
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
      
      <CodeProcessingAnimation
        code={inviteCode}
        isProcessing={isProcessing}
        onComplete={handleProcessingComplete}
        validCodes={currentConfig.validCodes}
      />
    </>
  );
};

export default AccessControlForm; 