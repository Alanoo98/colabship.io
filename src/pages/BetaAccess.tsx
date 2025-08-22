import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, CheckCircle, XCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";
import CodeProcessingAnimation from "@/components/common/CodeProcessingAnimation";
import CodeInput from "@/components/common/CodeInput";
import { useBetaAccess } from "@/contexts/BetaAccessContext";

const BetaAccess = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { grantBetaAccess } = useBetaAccess();

  // Beta invite codes (in production, these would be in a database)
  const validCodes = [
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
  ];

  const handleCodeValidation = async () => {
    if (!inviteCode.trim()) {
      setErrorMessage("Please enter an invite code");
      setIsValid(false);
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setIsValid(null);

    // Simulate processing delay
    setTimeout(() => {
      const isValidCode = validCodes.includes(inviteCode.toUpperCase());
      handleProcessingComplete(isValidCode);
    }, 2000);
  };

  const handleProcessingComplete = (isValidCode: boolean) => {
    setIsProcessing(false);
    
    if (isValidCode) {
      setIsValid(true);
      // Grant beta access through context (this also updates localStorage)
      grantBetaAccess(inviteCode.toUpperCase());
      
      // Redirect to main app after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setIsValid(false);
      setErrorMessage("Beta key not found in authorized database. Please check your code and try again.");
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-elements absolute top-20 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg"></div>
          <div className="floating-elements absolute bottom-32 right-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <Lock className="w-16 h-16 text-accent" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <HackerText 
                  text="BETA ACCESS" 
                  className="gradient-text"
                  delay={300}
                />
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Colabship is currently in private beta. Enter your invite code to get early access.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-md mx-auto">
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="text-center text-accent">
                    Enter Your Invite Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <CodeInput
                      value={inviteCode}
                      onChange={setInviteCode}
                      disabled={isProcessing}
                      placeholder="Enter the 8-character code you received"
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
                      Access Beta
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <Footer />

      {/* Code Processing Animation */}
      {isProcessing && (
        <CodeProcessingAnimation
          code={inviteCode}
          isProcessing={isProcessing}
          onComplete={handleProcessingComplete}
          validCodes={validCodes}
        />
      )}
    </div>
  );
};

export default BetaAccess; 