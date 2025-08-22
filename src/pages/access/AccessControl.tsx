import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, CheckCircle, XCircle, Zap, Clock, Shield, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HackerText from "@/components/HackerText";
import ScrollReveal from "@/components/ScrollReveal";
import CodeProcessingAnimation from "@/components/CodeProcessingAnimation";
import CodeInput from "@/components/CodeInput";
import { useAccessControl, AccessType } from "@/contexts/AccessControlContext";

const AccessControl = () => {
  const [accessType, setAccessType] = useState<AccessType>('beta');
  const [inviteCode, setInviteCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { grantAccess, hasAccess } = useAccessControl();

  // Access type configurations
  const accessConfigs = {
    beta: {
      title: "BETA ACCESS",
      description: "Colabship is currently in private beta. Enter your invite code to get early access.",
      icon: Lock,
      color: "text-accent",
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
      ]
    },
    version: {
      title: "VERSION TESTING",
      description: "Test the latest version of Colabship with new features and improvements.",
      icon: Star,
      color: "text-blue-500",
      validCodes: [
        "V1.0.0",
        "V1.1.0",
        "V2.0.0"
      ]
    },
    feature: {
      title: "FEATURE FLAGS",
      description: "Access experimental features and early functionality.",
      icon: Zap,
      color: "text-green-500",
      validCodes: [
        "FEATURE_FLAG_1",
        "FEATURE_FLAG_2"
      ]
    }
  };

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
        // Redirect to main app after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setIsValid(false);
        setErrorMessage("Failed to grant access. Please try again.");
      }
    } else {
      setIsValid(false);
      setErrorMessage("Access code not found in authorized database. Please check your code and try again.");
    }
  };

  // Check if user already has access
  if (hasAccess(accessType, 'basic')) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-24 pb-12 bg-card relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
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
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cosmic-depth">
      <Header />
      
      <section className="pt-24 pb-12 bg-card relative overflow-hidden depth-layer">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-elements absolute top-20 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg"></div>
          <div className="floating-elements absolute bottom-32 right-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
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
              
              {/* Access Type Selector */}
              <div className="max-w-xs mx-auto mb-8">
                <Select value={accessType} onValueChange={(value: AccessType) => setAccessType(value)}>
                  <SelectTrigger className="bg-background border-accent/20">
                    <SelectValue placeholder="Select access type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beta">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Beta Access
                      </div>
                    </SelectItem>
                    <SelectItem value="version">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Version Testing
                      </div>
                    </SelectItem>
                    <SelectItem value="feature">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Feature Flags
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* About Link */}
              <div className="text-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/about" className="text-muted-foreground hover:text-accent">
                    About Colabship.io
                  </Link>
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
                        Access granted! Redirecting to Colabship...
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
        </div>
      </section>
      <Footer />
      
      <CodeProcessingAnimation
        code={inviteCode}
        isProcessing={isProcessing}
        onComplete={handleProcessingComplete}
        validCodes={currentConfig.validCodes}
      />
    </div>
  );
};

export default AccessControl; 