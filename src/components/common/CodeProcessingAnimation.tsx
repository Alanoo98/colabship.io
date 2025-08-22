import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Shield, Zap, Cpu, Database } from 'lucide-react';

interface CodeProcessingAnimationProps {
  code: string;
  isProcessing: boolean;
  onComplete: (isValid: boolean) => void;
  validCodes?: string[];
}

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number;
}

const CodeProcessingAnimation: React.FC<CodeProcessingAnimationProps> = ({
  code,
  isProcessing,
  onComplete,
  validCodes
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const processingSteps: ProcessingStep[] = [
    {
      id: 'initializing',
      title: 'INITIALIZING',
      description: 'Initializing security protocols...',
      icon: Shield,
      duration: 1000
    },
    {
      id: 'scanning',
      title: 'SCANNING_CODE',
      description: 'Scanning access code for validation...',
      icon: Zap,
      duration: 1400
    },
    {
      id: 'processing',
      title: 'PROCESSING',
      description: 'Processing code through secure channels...',
      icon: Cpu,
      duration: 1200
    },
    {
      id: 'validating',
      title: 'VALIDATING',
      description: 'Validating against authorized database...',
      icon: Database,
      duration: 1600
    }
  ];

  useEffect(() => {
    if (!isProcessing) {
      setCurrentStep(0);
      setProgress(0);
      setIsComplete(false);
      return;
    }

    let totalDuration = 0;
    processingSteps.forEach(step => {
      totalDuration += step.duration;
    });

    let currentTime = 0;

    const interval = setInterval(() => {
      currentTime += 50;
      const newProgress = Math.min((currentTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step
      let stepTime = 0;
      for (let i = 0; i < processingSteps.length; i++) {
        stepTime += processingSteps[i].duration;
        if (currentTime <= stepTime) {
          setCurrentStep(i);
          break;
        }
      }

      if (currentTime >= totalDuration) {
        clearInterval(interval);
        setIsComplete(true);
        
        // Determine if code is valid
        const codesToCheck = validCodes || [
          "BETA2025", "84739201", "15673948", "29384756", "48573926",
          "73948561", "38475629", "75629384", "29384765", "84739265"
        ];
        const codeIsValid = codesToCheck.includes(code.toUpperCase());
        setIsValid(codeIsValid);
        
        // Call onComplete after a short delay
        setTimeout(() => {
          onComplete(codeIsValid);
        }, 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isProcessing, code, validCodes, onComplete]);

  if (!isProcessing && !isComplete) return null;

  const currentStepData = processingSteps[currentStep];
  const CurrentIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <Card className="bg-card/95 border-accent/30 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              {isComplete ? (
                <div className={`p-4 rounded-full ${isValid ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {isValid ? (
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  ) : (
                    <XCircle className="w-20 h-20 text-red-500" />
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-full bg-accent/20">
                  <CurrentIcon className="w-20 h-20 text-accent" />
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {isComplete 
                  ? (isValid ? 'ACCESS GRANTED' : 'ACCESS DENIED')
                  : currentStepData.title
                }
              </h3>
              <p className="text-base text-muted-foreground">
                {isComplete 
                  ? (isValid 
                      ? 'Welcome to Colabship! Redirecting...' 
                      : 'Invalid access code. Please try again.'
                    )
                  : currentStepData.description
                }
              </p>
            </div>

            {/* Progress Bar */}
            {!isComplete && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processing...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-3 bg-muted"
                />
                <div className="flex justify-center text-xs text-muted-foreground">
                  Step {currentStep + 1} of {processingSteps.length}
                </div>
              </div>
            )}

            {/* Step Indicators */}
            {!isComplete && (
              <div className="flex justify-center space-x-2">
                {processingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index < currentStep 
                        ? 'bg-green-500' 
                        : index === currentStep 
                          ? 'bg-accent animate-pulse' 
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Success/Error Badge */}
            {isComplete && (
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isValid 
                  ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-500 border border-red-500/30'
              }`}>
                {isValid ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Success
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Error
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeProcessingAnimation; 