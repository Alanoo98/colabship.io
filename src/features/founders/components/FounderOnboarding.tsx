import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Users, 
  Rocket,
  User,
  Briefcase,
  Target,
  Star,
  Heart,
  Shield,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Zap,
  Lightbulb,
  Calendar,
  MapPin
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

interface FounderOnboardingProps {
  onComplete: (profile: FounderProfile) => void;
  onSkip: () => void;
}

interface FounderProfile {
  // Project Details
  projectName: string;
  projectDescription: string;
  projectStage: 'idea' | 'mvp' | 'beta' | 'launched' | 'scaling';
  projectCategory: string;
  projectUrl?: string;
  
  // Skills Needed
  skillsNeeded: string[];
  rolesNeeded: string[];
  experienceLevel: 'junior' | 'mid' | 'senior' | 'expert';
  
  // Collaboration Preferences
  collaborationStyle: 'async' | 'sync' | 'hybrid';
  timeCommitment: 'part-time' | 'full-time' | 'flexible';
  trialPeriod: boolean;
  trialDuration?: number; // weeks
  
  // Equity & Compensation
  equityOffered: boolean;
  equityPercentage?: number;
  revenueSharing: boolean;
  revenuePercentage?: number;
  paidCompensation: boolean;
  compensationType?: 'hourly' | 'project' | 'monthly';
  
  // Legal Preferences
  ndaRequired: boolean;
  ipProtection: boolean;
  formalAgreement: boolean;
  
  // Contact & Availability
  timezone: string;
  availability: string;
  preferredContact: 'email' | 'discord' | 'slack' | 'in_app';
  contactInfo: string;
  
  // Additional Info
  additionalNotes: string;
  timeline: string;
  budget?: string;
}

type OnboardingStep = 'welcome' | 'project' | 'skills' | 'collaboration' | 'compensation' | 'legal' | 'contact' | 'complete';

const FounderOnboarding: React.FC<FounderOnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [progress, setProgress] = useState(0);
  
  // Step 1: Welcome
  const [hasReadTerms, setHasReadTerms] = useState(false);
  
  // Step 2: Project Details
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStage, setProjectStage] = useState<'idea' | 'mvp' | 'beta' | 'launched' | 'scaling'>('idea');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  
  // Step 3: Skills Needed
  const [skillsNeeded, setSkillsNeeded] = useState<string[]>([]);
  const [rolesNeeded, setRolesNeeded] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<'junior' | 'mid' | 'senior' | 'expert'>('mid');
  
  // Step 4: Collaboration Preferences
  const [collaborationStyle, setCollaborationStyle] = useState<'async' | 'sync' | 'hybrid'>('async');
  const [timeCommitment, setTimeCommitment] = useState<'part-time' | 'full-time' | 'flexible'>('flexible');
  const [trialPeriod, setTrialPeriod] = useState(true);
  const [trialDuration, setTrialDuration] = useState(2);
  
  // Step 5: Compensation
  const [equityOffered, setEquityOffered] = useState(false);
  const [equityPercentage, setEquityPercentage] = useState(0);
  const [revenueSharing, setRevenueSharing] = useState(false);
  const [revenuePercentage, setRevenuePercentage] = useState(0);
  const [paidCompensation, setPaidCompensation] = useState(false);
  const [compensationType, setCompensationType] = useState<'hourly' | 'project' | 'monthly'>('project');
  
  // Step 6: Legal Preferences
  const [ndaRequired, setNdaRequired] = useState(false);
  const [ipProtection, setIpProtection] = useState(true);
  const [formalAgreement, setFormalAgreement] = useState(true);
  
  // Step 7: Contact & Availability
  const [timezone, setTimezone] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'discord' | 'slack' | 'in_app'>('in_app');
  const [contactInfo, setContactInfo] = useState('');
  
  // Step 8: Additional Info
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');

  const steps = [
    { id: 'welcome', title: 'Welcome', icon: Star },
    { id: 'project', title: 'Project Details', icon: Rocket },
    { id: 'skills', title: 'Skills Needed', icon: Target },
    { id: 'collaboration', title: 'Collaboration', icon: Users },
    { id: 'compensation', title: 'Compensation', icon: DollarSign },
    { id: 'legal', title: 'Legal', icon: Shield },
    { id: 'contact', title: 'Contact', icon: Globe },
    { id: 'complete', title: 'Complete', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const totalSteps = steps.length;

  const updateProgress = (step: OnboardingStep) => {
    const stepIndex = steps.findIndex(s => s.id === step);
    setProgress(((stepIndex + 1) / totalSteps) * 100);
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepId = steps[currentIndex + 1].id as OnboardingStep;
      setCurrentStep(nextStepId);
      updateProgress(nextStepId);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      const prevStepId = steps[currentIndex - 1].id as OnboardingStep;
      setCurrentStep(prevStepId);
      updateProgress(prevStepId);
    }
  };

  const handleSubmit = () => {
    const profile: FounderProfile = {
      projectName,
      projectDescription,
      projectStage,
      projectCategory,
      projectUrl,
      skillsNeeded,
      rolesNeeded,
      experienceLevel,
      collaborationStyle,
      timeCommitment,
      trialPeriod,
      trialDuration,
      equityOffered,
      equityPercentage,
      revenueSharing,
      revenuePercentage,
      paidCompensation,
      compensationType,
      ndaRequired,
      ipProtection,
      formalAgreement,
      timezone,
      availability,
      preferredContact,
      contactInfo,
      additionalNotes,
      timeline,
      budget
    };
    onComplete(profile);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'welcome':
        return hasReadTerms;
      case 'project':
        return projectName && projectDescription && projectCategory;
      case 'skills':
        return skillsNeeded.length > 0 && rolesNeeded.length > 0;
      case 'collaboration':
        return true; // All fields optional
      case 'compensation':
        return true; // All fields optional
      case 'legal':
        return true; // All fields optional
      case 'contact':
        return timezone && availability;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <Rocket className="w-16 h-16 text-accent mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Find Your Co-founder</h1>
                <p className="text-xl text-muted-foreground">
                  Let's get your project in front of the right collaborators. This will take about 5 minutes.
                </p>
              </div>
              
              <Card className="bg-background border-accent/20 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    What We'll Cover
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Project Details</h4>
                      <p className="text-sm text-muted-foreground">Describe your idea and current stage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Skills & Roles</h4>
                      <p className="text-sm text-muted-foreground">What collaborators you're looking for</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Collaboration Style</h4>
                      <p className="text-sm text-muted-foreground">How you want to work together</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Compensation & Legal</h4>
                      <p className="text-sm text-muted-foreground">Equity, revenue sharing, and protection</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-3 justify-center">
                <Checkbox
                  id="terms"
                  checked={hasReadTerms}
                  onCheckedChange={(checked) => setHasReadTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I understand and agree to the platform terms and want to find collaborators
                </Label>
              </div>
            </div>
          </ScrollReveal>
        );

      case 'project':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Tell Us About Your Project</h2>
                <p className="text-muted-foreground">Help potential collaborators understand your vision</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-accent" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      placeholder="e.g., EcoTrack Pro, DevCollab, GrowthAI"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      placeholder="Describe your project, the problem it solves, and your vision..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectStage">Current Stage *</Label>
                      <Select value={projectStage} onValueChange={(value: any) => setProjectStage(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Just an idea</SelectItem>
                          <SelectItem value="mvp">Building MVP</SelectItem>
                          <SelectItem value="beta">Beta testing</SelectItem>
                          <SelectItem value="launched">Launched</SelectItem>
                          <SelectItem value="scaling">Scaling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectCategory">Category *</Label>
                      <Select value={projectCategory} onValueChange={setProjectCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saas">SaaS</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="web">Web App</SelectItem>
                          <SelectItem value="ai">AI/ML</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="healthtech">Healthtech</SelectItem>
                          <SelectItem value="edtech">Edtech</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="social">Social Platform</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectUrl">Project URL (optional)</Label>
                    <Input
                      id="projectUrl"
                      type="url"
                      placeholder="https://yourproject.com"
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'skills':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">What Skills Do You Need?</h2>
                <p className="text-muted-foreground">Help us match you with the right collaborators</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Skills & Roles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Roles You're Looking For *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 
                        'Mobile Developer', 'DevOps Engineer', 'Data Scientist',
                        'UI/UX Designer', 'Product Designer', 'Graphic Designer',
                        'Growth Marketer', 'Content Marketer', 'SEO Specialist',
                        'Product Manager', 'Business Development', 'Sales',
                        'Legal Advisor', 'Financial Advisor', 'Other'
                      ].map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox
                            id={role}
                            checked={rolesNeeded.includes(role)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setRolesNeeded([...rolesNeeded, role]);
                              } else {
                                setRolesNeeded(rolesNeeded.filter(r => r !== role));
                              }
                            }}
                          />
                          <Label htmlFor={role} className="text-sm">{role}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Specific Skills Needed</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java',
                        'Swift', 'Kotlin', 'Flutter', 'React Native', 'AWS', 'Docker',
                        'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL',
                        'REST APIs', 'Machine Learning', 'Blockchain', 'Web3',
                        'Figma', 'Adobe Creative Suite', 'Google Analytics',
                        'Facebook Ads', 'Google Ads', 'Email Marketing', 'SEO',
                        'Content Creation', 'Video Production', 'Other'
                      ].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={skillsNeeded.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSkillsNeeded([...skillsNeeded, skill]);
                              } else {
                                setSkillsNeeded(skillsNeeded.filter(s => s !== skill));
                              }
                            }}
                          />
                          <Label htmlFor={skill} className="text-sm">{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Preferred Experience Level</Label>
                    <Select value={experienceLevel} onValueChange={(value: any) => setExperienceLevel(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                        <SelectItem value="expert">Expert (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'collaboration':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">How Do You Want to Collaborate?</h2>
                <p className="text-muted-foreground">Define your preferred working style and expectations</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Collaboration Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="collaborationStyle">Collaboration Style</Label>
                      <Select value={collaborationStyle} onValueChange={(value: any) => setCollaborationStyle(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="async">Async-first (recommended)</SelectItem>
                          <SelectItem value="sync">Synchronous meetings</SelectItem>
                          <SelectItem value="hybrid">Hybrid approach</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeCommitment">Time Commitment</Label>
                      <Select value={timeCommitment} onValueChange={(value: any) => setTimeCommitment(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="part-time">Part-time (5-15 hrs/week)</SelectItem>
                          <SelectItem value="full-time">Full-time (40+ hrs/week)</SelectItem>
                          <SelectItem value="flexible">Flexible (as needed)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trialPeriod"
                        checked={trialPeriod}
                        onCheckedChange={(checked) => setTrialPeriod(checked as boolean)}
                      />
                      <Label htmlFor="trialPeriod" className="text-sm font-medium">
                        Offer trial period (recommended)
                      </Label>
                    </div>
                    
                    {trialPeriod && (
                      <div className="space-y-2">
                        <Label htmlFor="trialDuration">Trial Duration (weeks)</Label>
                        <Select value={trialDuration.toString()} onValueChange={(value) => setTrialDuration(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 week</SelectItem>
                            <SelectItem value="2">2 weeks</SelectItem>
                            <SelectItem value="3">3 weeks</SelectItem>
                            <SelectItem value="4">4 weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm text-accent-foreground">
                      💡 <strong>Pro tip:</strong> Trial periods help build trust and avoid premature IP sharing. 
                      Start with a small project to test collaboration before diving into your main idea.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'compensation':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Compensation & Equity</h2>
                <p className="text-muted-foreground">Define how collaborators will be rewarded</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    Compensation Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="equityOffered"
                        checked={equityOffered}
                        onCheckedChange={(checked) => setEquityOffered(checked as boolean)}
                      />
                      <Label htmlFor="equityOffered" className="text-sm font-medium">
                        Offer equity in the company
                      </Label>
                    </div>
                    
                    {equityOffered && (
                      <div className="space-y-2">
                        <Label htmlFor="equityPercentage">Equity Percentage</Label>
                        <Select value={equityPercentage.toString()} onValueChange={(value) => setEquityPercentage(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1%</SelectItem>
                            <SelectItem value="2">2%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                            <SelectItem value="25">25%</SelectItem>
                            <SelectItem value="33">33% (Co-founder)</SelectItem>
                            <SelectItem value="50">50% (Equal partner)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="revenueSharing"
                        checked={revenueSharing}
                        onCheckedChange={(checked) => setRevenueSharing(checked as boolean)}
                      />
                      <Label htmlFor="revenueSharing" className="text-sm font-medium">
                        Offer revenue sharing
                      </Label>
                    </div>
                    
                    {revenueSharing && (
                      <div className="space-y-2">
                        <Label htmlFor="revenuePercentage">Revenue Share Percentage</Label>
                        <Select value={revenuePercentage.toString()} onValueChange={(value) => setRevenuePercentage(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                            <SelectItem value="25">25%</SelectItem>
                            <SelectItem value="30">30%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paidCompensation"
                        checked={paidCompensation}
                        onCheckedChange={(checked) => setPaidCompensation(checked as boolean)}
                      />
                      <Label htmlFor="paidCompensation" className="text-sm font-medium">
                        Offer paid compensation
                      </Label>
                    </div>
                    
                    {paidCompensation && (
                      <div className="space-y-2">
                        <Label htmlFor="compensationType">Compensation Type</Label>
                        <Select value={compensationType} onValueChange={(value: any) => setCompensationType(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly rate</SelectItem>
                            <SelectItem value="project">Project-based</SelectItem>
                            <SelectItem value="monthly">Monthly retainer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm text-accent-foreground">
                      💡 <strong>Pro tip:</strong> Consider offering a combination of equity and revenue sharing. 
                      This shows you value long-term partnership and aligns incentives for success.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'legal':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Legal & Protection</h2>
                <p className="text-muted-foreground">Define your legal preferences and protection needs</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Legal Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ndaRequired"
                        checked={ndaRequired}
                        onCheckedChange={(checked) => setNdaRequired(checked as boolean)}
                      />
                      <Label htmlFor="ndaRequired" className="text-sm font-medium">
                        Require NDA (Non-Disclosure Agreement)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ipProtection"
                        checked={ipProtection}
                        onCheckedChange={(checked) => setIpProtection(checked as boolean)}
                      />
                      <Label htmlFor="ipProtection" className="text-sm font-medium">
                        IP Protection Agreement (recommended)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formalAgreement"
                        checked={formalAgreement}
                        onCheckedChange={(checked) => setFormalAgreement(checked as boolean)}
                      />
                      <Label htmlFor="formalAgreement" className="text-sm font-medium">
                        Formal Collaboration Agreement
                      </Label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm text-accent-foreground">
                      💡 <strong>Pro tip:</strong> We provide customizable legal templates for all agreements. 
                      Start with IP protection and add formal agreements as the relationship develops.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'contact':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Contact & Availability</h2>
                <p className="text-muted-foreground">Help collaborators reach you and understand your availability</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone *</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                          <SelectItem value="UTC+2">Eastern European Time (UTC+2)</SelectItem>
                          <SelectItem value="UTC+5:30">India Standard Time (UTC+5:30)</SelectItem>
                          <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                          <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                          <SelectItem value="UTC+10">Australian Eastern Time (UTC+10)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability *</Label>
                      <Select value={availability} onValueChange={setAvailability}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays only</SelectItem>
                          <SelectItem value="weekends">Weekends only</SelectItem>
                          <SelectItem value="evenings">Evenings only</SelectItem>
                          <SelectItem value="flexible">Flexible schedule</SelectItem>
                          <SelectItem value="full-time">Full-time availability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <Select value={preferredContact} onValueChange={(value: any) => {
                      setPreferredContact(value);
                      setContactInfo(''); // Clear contact info when method changes
                    }}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="in_app">In-app messaging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {preferredContact !== 'in_app' && (
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">
                        {preferredContact === 'email' && 'Email Address'}
                        {preferredContact === 'discord' && 'Discord Username'}
                        {preferredContact === 'slack' && 'Slack Username'}
                      </Label>
                      <Input
                        id="contactInfo"
                        type={preferredContact === 'email' ? 'email' : 'text'}
                        placeholder={
                          preferredContact === 'email' ? 'your.email@example.com' :
                          preferredContact === 'discord' ? 'username#1234' :
                          preferredContact === 'slack' ? '@username' : ''
                        }
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3-6 months, ASAP, Flexible"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (optional)</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $5k-10k, Equity only, Flexible"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Any additional information you'd like to share with potential collaborators..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'complete':
        return (
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Project Listed Successfully!</h1>
                <p className="text-xl text-muted-foreground">
                  Your project is now visible to potential collaborators. We'll notify you when someone shows interest.
                </p>
              </div>
              
              <Card className="bg-background border-accent/20 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Profile Matching</h4>
                      <p className="text-sm text-muted-foreground">We'll match your project with relevant collaborators</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Interest Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified when collaborators express interest</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Direct Communication</h4>
                      <p className="text-sm text-muted-foreground">Connect directly through our platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Legal Templates</h4>
                      <p className="text-sm text-muted-foreground">Access customizable legal agreements when ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="bg-background border-accent/20 max-w-4xl w-full mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStepIndex 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStepIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStepIndex ? 'bg-accent' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStepIndex + 1} of {totalSteps}
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          {renderStepContent()}
          
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onSkip}>
                Skip for now
              </Button>
              
              {currentStep === 'complete' ? (
                <Button onClick={handleSubmit} className="glow-green">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Setup
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="glow-green"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FounderOnboarding; 