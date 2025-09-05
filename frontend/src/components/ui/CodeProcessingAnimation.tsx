import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Shield, Zap, Cpu, Database } from 'lucide-react';

interface CodeProcessingAnimationProps {
  code: string;
  isProcessing: boolean;
  onComplete: (isValid: boolean) => void;
  validCodes?: string[];
}

const CodeProcessingAnimation: React.FC<CodeProcessingAnimationProps> = ({ 
  code, 
  isProcessing, 
  onComplete,
  validCodes 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const processingSteps = [
    { name: 'INITIALIZING', icon: Cpu, duration: 1000 },
    { name: 'SCANNING_CODE', icon: Database, duration: 1400 },
    { name: 'VALIDATING', icon: Shield, duration: 1200 },
    { name: 'AUTHENTICATING', icon: Zap, duration: 1100 },
    { name: 'GRANTING_ACCESS', icon: CheckCircle, duration: 800 }
  ];

  const hackerTexts = [
    'Initializing security protocols...',
    'Scanning beta access code...',
    'Validating credentials...',
    'Authenticating user permissions...',
    'Granting beta access...'
  ];

  const errorTexts = [
    'Initializing security protocols...',
    'Scanning beta access code...',
    'Validating credentials...',
    'Authentication failed...',
    'Access denied - Invalid code'
  ];

  useEffect(() => {
    if (!isProcessing) return;

    // Use provided validCodes or fallback to default beta codes
    const codesToCheck = validCodes || [
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

    const codeIsValid = codesToCheck.includes(code.toUpperCase());
    setIsValid(codeIsValid);

    let stepIndex = 0;
    let charIndex = 0;
    const targetText = codeIsValid ? hackerTexts : errorTexts;

    const processStep = () => {
      if (stepIndex >= processingSteps.length) {
        onComplete(codeIsValid);
        return;
      }

      setCurrentStep(stepIndex);
      const currentText = targetText[stepIndex];
      charIndex = 0;

      const typeText = () => {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, 20); // Faster typing
        } else {
          // Wait before moving to next step
          setTimeout(() => {
            stepIndex++;
            processStep();
          }, 800); // Longer pause between steps
        }
      };

      typeText();
    };

    // Start processing after a short delay
    setTimeout(processStep, 500);
  }, [isProcessing, code, onComplete, validCodes]);

  if (!isProcessing) return null;

  const CurrentIcon = processingSteps[currentStep]?.icon || Cpu;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-card/95 border border-accent/30 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-accent/10">
        <div className="text-center space-y-8">
          {/* Processing Icon */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent/30 shadow-lg shadow-accent/20">
              <CurrentIcon className="w-10 h-10 text-accent" />
            </div>
            {isValid === false && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <XCircle className="w-5 h-5 text-white" />
              </div>
            )}
            {isValid === true && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Processing Text */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent">
              {isValid === false ? 'ACCESS DENIED' : 'PROCESSING ACCESS'}
            </h3>
            <div className="bg-muted/50 p-6 rounded-lg border border-accent/20 shadow-inner">
              <p className="text-base text-foreground mb-3 leading-relaxed">
                {displayText}
                <span className="text-accent animate-pulse ml-1">|</span>
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                Code: {code}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted/50 rounded-full h-3 shadow-inner">
              <div 
                className={`h-3 rounded-full transition-all duration-700 ease-out ${
                  isValid === false 
                    ? 'bg-red-500 shadow-lg shadow-red-500/30' 
                    : isValid === true 
                      ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                      : 'bg-accent shadow-lg shadow-accent/30'
                }`}
                style={{ 
                  width: `${((currentStep + 1) / processingSteps.length) * 100}%` 
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {processingSteps.length}
            </p>
          </div>

          {/* Status */}
          <div className="text-sm">
            {isValid === false && (
              <p className="text-red-400 font-medium">
                Beta key not found in authorized database
              </p>
            )}
            {isValid === true && (
              <p className="text-green-400 font-medium">
                Welcome to Colabship Beta
              </p>
            )}
            {isValid === null && (
              <p className="text-muted-foreground">
                Verifying beta access credentials...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeProcessingAnimation; 