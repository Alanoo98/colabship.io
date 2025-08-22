import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import BasicProfileStep from './steps/BasicProfileStep';
import WhatYouOfferStep from './steps/WhatYouOfferStep';
import WhatYouNeedStep from './steps/WhatYouNeedStep';
import CollaborationStep from './steps/CollaborationStep';
import MatchPreferencesStep from './steps/MatchPreferencesStep';

interface OnboardingData {
  // Step 1: Basic Profile
  name: string;
  bio: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  
  // Step 2: What You Offer
  offers: Array<{
    skill_id: number;
    skill_name: string;
    proficiency: number;
  }>;
  availability_hours: number;
  timezone: string;
  preferred_tools: string[];
  
  // Step 3: What You Need
  needs: Array<{
    skill_id: number;
    skill_name: string;
    must_have: boolean;
    priority: number;
  }>;
  project_stage_interest: string[];
  team_size_preference: 'solo' | 'duo' | 'small_team' | 'any';
  commitment_level: 'casual' | 'part_time' | 'full_time';
  
  // Step 4: Collaboration & Personality
  work_style: 'async' | 'sync' | 'hybrid';
  comms_pref: 'text' | 'video' | 'mixed';
  values: string[];
  
  // Step 5: Match Preferences
  skill_weight: number;
  availability_weight: number;
  timezone_weight: number;
  collab_style_weight: number;
  personality_weight: number;
}

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: '',
    bio: '',
    experience_level: 'intermediate',
    offers: [],
    availability_hours: 10,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    preferred_tools: [],
    needs: [],
    project_stage_interest: ['mvp'],
    team_size_preference: 'duo',
    commitment_level: 'part_time',
    work_style: 'async',
    comms_pref: 'text',
    values: [],
    skill_weight: 25,
    availability_weight: 20,
    timezone_weight: 20,
    collab_style_weight: 15,
    personality_weight: 20,
  });

  const totalSteps = 5;

  // Auto-save functionality
  useEffect(() => {
    const autoSave = async () => {
      if (user && currentStep > 1) {
        setIsSaving(true);
        try {
          await saveProgress();
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    const timeoutId = setTimeout(autoSave, 2000);
    return () => clearTimeout(timeoutId);
  }, [onboardingData, currentStep, user]);

  const saveProgress = async () => {
    if (!user) return;

    try {
      // Save basic user info
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: onboardingData.name,
          bio: onboardingData.bio,
          experience_level: onboardingData.experience_level,
          timezone: onboardingData.timezone,
          availability_hours: onboardingData.availability_hours,
          work_style: onboardingData.work_style,
          comms_pref: onboardingData.comms_pref,
          values: onboardingData.values,
          is_onboarded: currentStep === totalSteps,
        });

      if (userError) throw userError;

      // Save offers
      if (onboardingData.offers.length > 0) {
        const { error: offersError } = await supabase
          .from('user_offers')
          .upsert(
            onboardingData.offers.map(offer => ({
              user_id: user.id,
              skill_id: offer.skill_id,
              proficiency: offer.proficiency,
            }))
          );

        if (offersError) throw offersError;
      }

      // Save needs
      if (onboardingData.needs.length > 0) {
        const { error: needsError } = await supabase
          .from('user_needs')
          .upsert(
            onboardingData.needs.map(need => ({
              user_id: user.id,
              skill_id: need.skill_id,
              must_have: need.must_have,
              priority: need.priority,
            }))
          );

        if (needsError) throw needsError;
      }

      // Save collaboration preferences
      const { error: collabError } = await supabase
        .from('collaboration_preferences')
        .upsert({
          user_id: user.id,
          preferred_tools: onboardingData.preferred_tools,
          project_stage_interest: onboardingData.project_stage_interest,
          team_size_preference: onboardingData.team_size_preference,
          commitment_level: onboardingData.commitment_level,
        });

      if (collabError) throw collabError;

      // Save match preferences
      const { error: matchError } = await supabase
        .from('match_preferences')
        .upsert({
          user_id: user.id,
          skill_weight: onboardingData.skill_weight,
          availability_weight: onboardingData.availability_weight,
          timezone_weight: onboardingData.timezone_weight,
          collab_style_weight: onboardingData.collab_style_weight,
          personality_weight: onboardingData.personality_weight,
        });

      if (matchError) throw matchError;

    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      // Complete onboarding
      setIsLoading(true);
      try {
        await saveProgress();
        navigate('/dashboard');
      } catch (error) {
        console.error('Error completing onboarding:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicProfileStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
          />
        );
      case 2:
        return (
          <WhatYouOfferStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
          />
        );
      case 3:
        return (
          <WhatYouNeedStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
          />
        );
      case 4:
        return (
          <CollaborationStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
          />
        );
      case 5:
        return (
          <MatchPreferencesStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Profile';
      case 2: return 'What You Offer';
      case 3: return 'What You Need';
      case 4: return 'Collaboration & Personality';
      case 5: return 'Match Preferences';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Tell us about yourself and your experience level.';
      case 2: return 'What skills and expertise can you bring to collaborations?';
      case 3: return 'What skills and expertise are you looking for in collaborators?';
      case 4: return 'How do you prefer to work and communicate?';
      case 5: return 'Fine-tune how we match you with potential collaborators.';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Complete Your Profile</h1>
              <p className="text-muted-foreground">
                Step {currentStep} of {totalSteps}: {getStepTitle()}
              </p>
            </div>
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Save className="w-4 h-4 animate-pulse" />
                Saving...
              </div>
            )}
          </div>
          
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Basic Profile</span>
            <span>What You Offer</span>
            <span>What You Need</span>
            <span>Collaboration</span>
            <span>Preferences</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
            <p className="text-muted-foreground">{getStepDescription()}</p>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {currentStep === totalSteps ? (
              <>
                {isLoading ? 'Completing...' : 'Complete Profile'}
                {!isLoading && <ChevronRight className="w-4 h-4" />}
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard; 