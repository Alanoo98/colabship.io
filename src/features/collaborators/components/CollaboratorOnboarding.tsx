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
  MapPin,
  ExternalLink,
  Plus,
  X
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

interface CollaboratorOnboardingProps {
  onComplete: (profile: CollaboratorProfile) => void;
  onSkip: () => void;
}

interface CollaboratorProfile {
  // Personal Info
  name: string;
  email: string;
  location: string;
  timezone: string;
  
  // Skills & Experience
  skills: string[];
  roles: string[];
  experienceLevel: 'junior' | 'mid' | 'senior' | 'expert';
  yearsOfExperience: number;
  
  // Portfolio
  portfolio: {
    title: string;
    description: string;
    url?: string;
    technologies: string[];
  }[];
  
  // Collaboration Preferences
  collaborationStyle: 'async' | 'sync' | 'hybrid';
  timeCommitment: 'part-time' | 'full-time' | 'flexible';
  availability: string;
  
  // Compensation Preferences
  equityInterest: boolean;
  revenueSharing: boolean;
  paidCompensation: boolean;
  compensationType?: 'hourly' | 'project' | 'monthly';
  
  // Legal Preferences
  ndaComfortable: boolean;
  ipProtection: boolean;
  formalAgreement: boolean;
  
  // Contact
  preferredContact: 'email' | 'discord' | 'slack' | 'in_app';
  contactInfo: string;
  
  // Additional Info
  bio: string;
  motivation: string;
}

type OnboardingStep = 'welcome' | 'personal' | 'skills' | 'portfolio' | 'preferences' | 'compensation' | 'legal' | 'contact' | 'complete';

const CollaboratorOnboarding: React.FC<CollaboratorOnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [progress, setProgress] = useState(0);
  
  // Step 1: Welcome
  const [hasReadTerms, setHasReadTerms] = useState(false);
  
  // Step 2: Personal Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  
  // Step 3: Skills & Experience
  const [skills, setSkills] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<'junior' | 'mid' | 'senior' | 'expert'>('mid');
  const [yearsOfExperience, setYearsOfExperience] = useState(3);
  
  // Step 4: Portfolio
  const [portfolio, setPortfolio] = useState<{
    title: string;
    description: string;
    url?: string;
    technologies: string[];
  }[]>([]);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    url: '',
    technologies: [] as string[]
  });
  
  // Step 5: Collaboration Preferences
  const [collaborationStyle, setCollaborationStyle] = useState<'async' | 'sync' | 'hybrid'>('async');
  const [timeCommitment, setTimeCommitment] = useState<'part-time' | 'full-time' | 'flexible'>('flexible');
  const [availability, setAvailability] = useState('');
  
  // Step 6: Compensation Preferences
  const [equityInterest, setEquityInterest] = useState(false);
  const [revenueSharing, setRevenueSharing] = useState(false);
  const [paidCompensation, setPaidCompensation] = useState(false);
  const [compensationType, setCompensationType] = useState<'hourly' | 'project' | 'monthly'>('project');
  
  // Step 7: Legal Preferences
  const [ndaComfortable, setNdaComfortable] = useState(true);
  const [ipProtection, setIpProtection] = useState(true);
  const [formalAgreement, setFormalAgreement] = useState(true);
  
  // Step 8: Contact & Bio
  const [preferredContact, setPreferredContact] = useState<'email' | 'discord' | 'slack' | 'in_app'>('in_app');
  const [contactInfo, setContactInfo] = useState('');
  const [bio, setBio] = useState('');
  const [motivation, setMotivation] = useState('');

  const steps = [
    { id: 'welcome', title: 'Welcome', icon: Star },
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'skills', title: 'Skills & Experience', icon: Target },
    { id: 'portfolio', title: 'Portfolio', icon: Briefcase },
    { id: 'preferences', title: 'Preferences', icon: Users },
    { id: 'compensation', title: 'Compensation', icon: DollarSign },
    { id: 'legal', title: 'Legal', icon: Shield },
    { id: 'contact', title: 'Contact & Bio', icon: Globe },
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
    const profile: CollaboratorProfile = {
      name,
      email,
      location,
      timezone,
      skills,
      roles,
      experienceLevel,
      yearsOfExperience,
      portfolio,
      collaborationStyle,
      timeCommitment,
      availability,
      equityInterest,
      revenueSharing,
      paidCompensation,
      compensationType,
      ndaComfortable,
      ipProtection,
      formalAgreement,
      preferredContact,
      contactInfo,
      bio,
      motivation
    };
    onComplete(profile);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'welcome':
        return hasReadTerms;
      case 'personal':
        return name && email && location && timezone;
      case 'skills':
        return skills.length > 0 && roles.length > 0;
      case 'portfolio':
        return true; // Optional
      case 'preferences':
        return availability;
      case 'compensation':
        return true; // At least one option should be selected
      case 'legal':
        return true; // All optional
      case 'contact':
        return bio && motivation;
      default:
        return true;
    }
  };

  const addPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      setPortfolio([...portfolio, { ...newPortfolioItem }]);
      setNewPortfolioItem({
        title: '',
        description: '',
        url: '',
        technologies: []
      });
    }
  };

  const removePortfolioItem = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <Users className="w-16 h-16 text-accent mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Join Amazing Projects</h1>
                <p className="text-xl text-muted-foreground">
                  Showcase your skills and connect with founders building the next big thing.
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
                      <h4 className="font-semibold">Personal Information</h4>
                      <p className="text-sm text-muted-foreground">Your name, location, and contact details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Skills & Experience</h4>
                      <p className="text-sm text-muted-foreground">Your technical skills and years of experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Portfolio</h4>
                      <p className="text-sm text-muted-foreground">Showcase your previous work and projects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Preferences</h4>
                      <p className="text-sm text-muted-foreground">How you like to work and collaborate</p>
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
                  I understand and agree to the platform terms and want to join projects
                </Label>
              </div>
            </div>
          </ScrollReveal>
        );

      case 'personal':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Tell Us About Yourself</h2>
                <p className="text-muted-foreground">Help founders understand who you are</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Alex Chen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="e.g., San Francisco, CA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    
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
                <h2 className="text-3xl font-bold mb-2">Your Skills & Experience</h2>
                <p className="text-muted-foreground">Show founders what you bring to the table</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Skills & Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Your Roles *</Label>
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
                            checked={roles.includes(role)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setRoles([...roles, role]);
                              } else {
                                setRoles(roles.filter(r => r !== role));
                              }
                            }}
                          />
                          <Label htmlFor={role} className="text-sm">{role}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Technical Skills</Label>
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
                            checked={skills.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSkills([...skills, skill]);
                              } else {
                                setSkills(skills.filter(s => s !== skill));
                              }
                            }}
                          />
                          <Label htmlFor={skill} className="text-sm">{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">Experience Level</Label>
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Select value={yearsOfExperience.toString()} onValueChange={(value) => setYearsOfExperience(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year} {year === 1 ? 'year' : 'years'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'portfolio':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Your Portfolio</h2>
                <p className="text-muted-foreground">Showcase your best work to impress founders</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-accent" />
                    Portfolio Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {portfolio.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          {item.url && (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-accent hover:underline flex items-center gap-1 mt-2"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View Project
                            </a>
                          )}
                          {item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioItem(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  
                  <div className="space-y-4 p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Project Title</Label>
                        <Input
                          placeholder="e.g., E-commerce Platform"
                          value={newPortfolioItem.title}
                          onChange={(e) => setNewPortfolioItem({
                            ...newPortfolioItem,
                            title: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Project URL (optional)</Label>
                        <Input
                          placeholder="https://..."
                          value={newPortfolioItem.url}
                          onChange={(e) => setNewPortfolioItem({
                            ...newPortfolioItem,
                            url: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Description</Label>
                      <Textarea
                        placeholder="Describe the project, your role, and key achievements..."
                        value={newPortfolioItem.description}
                        onChange={(e) => setNewPortfolioItem({
                          ...newPortfolioItem,
                          description: e.target.value
                        })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Technologies Used</Label>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'].map((tech) => (
                          <Badge
                            key={tech}
                            variant={newPortfolioItem.technologies.includes(tech) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              if (newPortfolioItem.technologies.includes(tech)) {
                                setNewPortfolioItem({
                                  ...newPortfolioItem,
                                  technologies: newPortfolioItem.technologies.filter(t => t !== tech)
                                });
                              } else {
                                setNewPortfolioItem({
                                  ...newPortfolioItem,
                                  technologies: [...newPortfolioItem.technologies, tech]
                                });
                              }
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={addPortfolioItem}
                      disabled={!newPortfolioItem.title || !newPortfolioItem.description}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Portfolio Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'preferences':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Collaboration Preferences</h2>
                <p className="text-muted-foreground">How do you like to work?</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Work Preferences
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
                          <SelectItem value="async">Async-first (preferred)</SelectItem>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={availability} onValueChange={setAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
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
                <h2 className="text-3xl font-bold mb-2">Compensation Preferences</h2>
                <p className="text-muted-foreground">What type of compensation are you interested in?</p>
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
                        id="equityInterest"
                        checked={equityInterest}
                        onCheckedChange={(checked) => setEquityInterest(checked as boolean)}
                      />
                      <Label htmlFor="equityInterest" className="text-sm font-medium">
                        Interested in equity
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="revenueSharing"
                        checked={revenueSharing}
                        onCheckedChange={(checked) => setRevenueSharing(checked as boolean)}
                      />
                      <Label htmlFor="revenueSharing" className="text-sm font-medium">
                        Interested in revenue sharing
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paidCompensation"
                        checked={paidCompensation}
                        onCheckedChange={(checked) => setPaidCompensation(checked as boolean)}
                      />
                      <Label htmlFor="paidCompensation" className="text-sm font-medium">
                        Interested in paid compensation
                      </Label>
                    </div>
                    
                    {paidCompensation && (
                      <div className="space-y-2">
                        <Label htmlFor="compensationType">Preferred Payment Type</Label>
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
                      💡 <strong>Pro tip:</strong> Being open to different compensation types increases your chances of finding great projects. 
                      Many founders offer a combination of equity and revenue sharing.
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
                <h2 className="text-3xl font-bold mb-2">Legal Preferences</h2>
                <p className="text-muted-foreground">What legal agreements are you comfortable with?</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Legal Agreements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ndaComfortable"
                        checked={ndaComfortable}
                        onCheckedChange={(checked) => setNdaComfortable(checked as boolean)}
                      />
                      <Label htmlFor="ndaComfortable" className="text-sm font-medium">
                        Comfortable with NDAs (Non-Disclosure Agreements)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ipProtection"
                        checked={ipProtection}
                        onCheckedChange={(checked) => setIpProtection(checked as boolean)}
                      />
                      <Label htmlFor="ipProtection" className="text-sm font-medium">
                        Comfortable with IP Protection Agreements
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formalAgreement"
                        checked={formalAgreement}
                        onCheckedChange={(checked) => setFormalAgreement(checked as boolean)}
                      />
                      <Label htmlFor="formalAgreement" className="text-sm font-medium">
                        Comfortable with Formal Collaboration Agreements
                      </Label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm text-accent-foreground">
                      💡 <strong>Pro tip:</strong> Legal agreements protect both you and the founder. 
                      They're standard practice and help establish clear expectations.
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
                <h2 className="text-3xl font-bold mb-2">Contact & Bio</h2>
                <p className="text-muted-foreground">Tell founders about yourself</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell founders about yourself, your background, and what drives you..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="motivation">What motivates you? *</Label>
                    <Textarea
                      id="motivation"
                      placeholder="What kind of projects are you looking for? What excites you about building products?"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
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
                <h1 className="text-3xl font-bold mb-4">
                  Profile Created Successfully!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your profile is now visible to founders looking for collaborators.
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
                      <p className="text-sm text-muted-foreground">Founders will see your profile in their search results</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Direct Outreach</h4>
                      <p className="text-sm text-muted-foreground">Founders may reach out directly with opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Browse Projects</h4>
                      <p className="text-sm text-muted-foreground">You can also browse and apply to founder projects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Stay Updated</h4>
                      <p className="text-sm text-muted-foreground">We'll notify you about new opportunities</p>
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

export default CollaboratorOnboarding; 