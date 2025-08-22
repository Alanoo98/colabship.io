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
  MessageSquare, 
  Zap,
  User,
  Briefcase,
  Globe,
  Target,
  Star,
  Heart,
  Rocket,
  Trophy
} from "lucide-react";
import { testingFocusOptions } from "../config/testingFocusConfig";
import { TestingFocus, BetaTesterProfile } from "../types/accessControl";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";

interface BetaTesterOnboardingProps {
  onComplete: (profile: BetaTesterProfile) => void;
  onSkip: () => void;
}

type OnboardingStep = 'welcome' | 'background' | 'experience' | 'focus' | 'preferences' | 'complete';

const BetaTesterOnboarding: React.FC<BetaTesterOnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [progress, setProgress] = useState(0);
  
  // Step 1: Welcome
  const [hasReadTerms, setHasReadTerms] = useState(false);
  
  // Step 2: Background
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [primaryRole, setPrimaryRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  
  // Step 3: Experience
  const [previousProjects, setPreviousProjects] = useState('');
  const [techStack, setTechStack] = useState('');
  const [collaborationExperience, setCollaborationExperience] = useState('');
  const [motivation, setMotivation] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  
  // Step 4: Focus
  const [selectedFocus, setSelectedFocus] = useState<TestingFocus[]>([]);
  
  // Step 5: Preferences
  const [feedbackFrequency, setFeedbackFrequency] = useState<'daily' | 'weekly' | 'as_needed'>('as_needed');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate');
  const [contactMethod, setContactMethod] = useState<'email' | 'discord' | 'slack' | 'in_app'>('in_app');
  const [contactInfo, setContactInfo] = useState('');
  const [availability, setAvailability] = useState<'full_time' | 'part_time' | 'weekends' | 'flexible'>('flexible');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const steps = [
    { id: 'welcome', title: 'Welcome', icon: Star },
    { id: 'background', title: 'Background', icon: User },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'focus', title: 'Testing Focus', icon: Target },
    { id: 'preferences', title: 'Preferences', icon: Heart },
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

  const handleFocusToggle = (focusId: TestingFocus) => {
    setSelectedFocus(prev => 
      prev.includes(focusId) 
        ? prev.filter(id => id !== focusId)
        : [...prev, focusId]
    );
  };

  const handleSubmit = () => {
    const profile: BetaTesterProfile = {
      testingFocus: selectedFocus,
      feedbackFrequency,
      experienceLevel,
      preferredContactMethod: contactMethod,
      contactInfo: contactInfo.trim() || undefined,
      additionalNotes: additionalNotes.trim() || undefined,
      // Add new fields
      name: name.trim() || undefined,
      location: location.trim() || undefined,
      timezone: timezone.trim() || undefined,
      primaryRole: primaryRole.trim() || undefined,
      yearsOfExperience: yearsOfExperience.trim() || undefined,
      previousProjects: previousProjects.trim() || undefined,
      techStack: techStack.trim() || undefined,
      collaborationExperience: collaborationExperience.trim() || undefined,
      motivation: motivation.trim() || undefined,
      availability: availability,
      // Social media links
      githubUrl: githubUrl.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      twitterUrl: twitterUrl.trim() || undefined,
      portfolioUrl: portfolioUrl.trim() || undefined
    };
    onComplete(profile);
  };

  const canProceedFromWelcome = hasReadTerms;
  const canProceedFromBackground = name.trim() && location.trim() && primaryRole.trim();
  const canProceedFromExperience = previousProjects.trim() && motivation.trim();
  const canProceedFromFocus = selectedFocus.length > 0;
  const canProceedFromPreferences = true; // All fields are optional

  const canProceed = () => {
    switch (currentStep) {
      case 'welcome': return canProceedFromWelcome;
      case 'background': return canProceedFromBackground;
      case 'experience': return canProceedFromExperience;
      case 'focus': return canProceedFromFocus;
      case 'preferences': return canProceedFromPreferences;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <ScrollReveal>
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <Star className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <HackerText 
                  text="Welcome to the Beta!" 
                  className="gradient-text"
                  delay={300}
                />
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                You're now part of an exclusive group of builders helping shape the future of co-founder discovery.
              </p>
              
              <Card className="bg-background border-accent/20 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-secondary" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Early Access</h4>
                      <p className="text-sm text-muted-foreground">Be among the first to test new features and provide feedback</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Direct Communication</h4>
                      <p className="text-sm text-muted-foreground">Connect directly with our team to share insights and suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Shape the Product</h4>
                      <p className="text-sm text-muted-foreground">Your feedback directly influences the development roadmap</p>
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
                  I understand and agree to participate in the beta testing program
                </Label>
              </div>
            </div>
          </ScrollReveal>
        );

      case 'background':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Tell Us About Yourself</h2>
                <p className="text-muted-foreground">Help us understand your background and expertise</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                          <SelectItem value="UTC+5:30">India Standard Time (UTC+5:30)</SelectItem>
                          <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                          <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Primary Role *</Label>
                      <Select value={primaryRole} onValueChange={setPrimaryRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full_stack">Full Stack Developer</SelectItem>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="designer">Product Designer</SelectItem>
                          <SelectItem value="marketer">Growth Marketer</SelectItem>
                          <SelectItem value="founder">Founder/Entrepreneur</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select value={yearsOfExperience} onValueChange={setYearsOfExperience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'experience':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Your Experience</h2>
                <p className="text-muted-foreground">Share your background in building and collaborating</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-accent" />
                    Project Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projects">Previous Projects *</Label>
                    <Textarea
                      id="projects"
                      placeholder="Tell us about projects you've worked on (built, launched, or contributed to). Feel free to include links to GitHub repos, live demos, or portfolio pieces..."
                      value={previousProjects}
                      onChange={(e) => setPreviousProjects(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Include project names, descriptions, your role, and any relevant links (GitHub, live demos, etc.)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tech">Tech Stack & Tools</Label>
                    <Input
                      id="tech"
                      placeholder="e.g., React, Node.js, Python, Figma, etc."
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="collaboration">Collaboration Experience</Label>
                    <Textarea
                      id="collaboration"
                      placeholder="Describe your experience working with teams, co-founders, or remote collaborators..."
                      value={collaborationExperience}
                      onChange={(e) => setCollaborationExperience(e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="motivation">What motivates you to join Colabship? *</Label>
                    <Textarea
                      id="motivation"
                      placeholder="Why are you interested in finding co-founders or building with others?"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent" />
                    Social Media & Links (Optional)
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Share your online presence to help us understand your work better
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input
                        id="github"
                        type="url"
                        placeholder="https://github.com/username"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter/X Profile</Label>
                      <Input
                        id="twitter"
                        type="url"
                        placeholder="https://twitter.com/username"
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        type="url"
                        placeholder="https://yourportfolio.com"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    These links help us understand your background and connect you with relevant testing opportunities.
                  </p>
                </CardContent>
              </Card>

              {/* Community Channels */}
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Join Our Community
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Connect with other beta testers and stay updated on the latest features
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#5865F2] rounded-full"></div>
                        Discord Community
                      </Label>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        asChild
                      >
                        <a 
                          href="https://discord.gg/colabship" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 bg-[#5865F2] rounded-full"></div>
                          Join Discord Server
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Chat with other builders, share feedback, and get real-time updates
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#FF4500] rounded-full"></div>
                        Reddit Community
                      </Label>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        asChild
                      >
                        <a 
                          href="https://reddit.com/r/colabship" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 bg-[#FF4500] rounded-full"></div>
                          Join r/colabship
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Share insights, ask questions, and discuss indie hacking
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Pro tip:</strong> Join our community channels to connect with other beta testers, 
                      share insights, and get early access to new features!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        );

      case 'focus':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Testing Focus</h2>
                <p className="text-muted-foreground">Select the areas you'd like to focus on during beta testing</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    What would you like to focus on? *
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Select the areas you're most interested in testing and providing feedback on.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testingFocusOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedFocus.includes(option.id);
                      
                      return (
                        <div
                          key={option.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                            isSelected 
                              ? 'border-accent bg-accent/5' 
                              : 'border-border hover:border-accent/50'
                          }`}
                          onClick={() => handleFocusToggle(option.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleFocusToggle(option.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className={`w-5 h-5 ${option.color}`} />
                                <h3 className="font-semibold">{option.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {selectedFocus.length > 0 && (
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold">Your Testing Focus</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedFocus.map((focusId) => {
                        const option = testingFocusOptions.find(opt => opt.id === focusId);
                        return (
                          <Badge key={focusId} variant="secondary" className="bg-accent/10 text-accent">
                            {option?.title}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollReveal>
        );

      case 'preferences':
        return (
          <ScrollReveal>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Motivation & Rewards</h2>
                <p className="text-muted-foreground">What's in it for you as a beta tester?</p>
              </div>
              
              {/* Motivation & Rewards Card */}
              <Card className="bg-background border-accent/20 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Beta Tester Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Early Access</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Be among the first to test new features and shape the future of Colabship
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Lifetime Discount</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get 50% off premium features for life as a founding beta tester
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">Exclusive Community</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Join our private beta tester community and network with other builders
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="font-medium">Direct Influence</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your feedback directly shapes product decisions and feature priorities
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                    <p className="text-sm text-accent-foreground">
                      💡 <strong>Pro tip:</strong> Active beta testers get priority access to co-founder matching and exclusive early bird pricing when we launch!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Preferences</h2>
                <p className="text-muted-foreground">How would you like to engage with the beta program?</p>
              </div>
              
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Feedback & Communication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Feedback Frequency</Label>
                      <Select value={feedbackFrequency} onValueChange={(value: 'daily' | 'weekly' | 'as_needed') => setFeedbackFrequency(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="as_needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select value={availability} onValueChange={(value: 'full_time' | 'part_time' | 'weekends' | 'flexible') => setAvailability(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full_time">Full-time</SelectItem>
                          <SelectItem value="part_time">Part-time</SelectItem>
                          <SelectItem value="weekends">Weekends only</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Preferred Contact Method</Label>
                      <Select value={contactMethod} onValueChange={(value: 'email' | 'discord' | 'in_app') => {
                        setContactMethod(value);
                        setContactInfo(''); // Clear contact info when method changes
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="discord">Discord</SelectItem>
                          <SelectItem value="in_app">In-app feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dynamic Contact Input */}
                    {contactMethod !== 'in_app' && (
                      <div className="space-y-2">
                        <Label htmlFor="contactInfo">
                          {contactMethod === 'email' && 'Email Address'}
                          {contactMethod === 'discord' && 'Discord Username'}
                        </Label>
                        <Input
                          id="contactInfo"
                          type={contactMethod === 'email' ? 'email' : 'text'}
                          placeholder={
                            contactMethod === 'email' ? 'your.email@example.com' :
                            contactMethod === 'discord' ? 'username#1234' : ''
                          }
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select value={experienceLevel} onValueChange={(value: 'beginner' | 'intermediate' | 'expert') => setExperienceLevel(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific areas you'd like to focus on, or additional context about your testing approach..."
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
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                <HackerText 
                  text="You're All Set!" 
                  className="gradient-text"
                  delay={300}
                />
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Welcome to the Colabship beta! We're excited to have you on board.
              </p>
              
              <Card className="bg-background border-accent/20 max-w-2xl mx-auto">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Beta access activated</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Profile created successfully</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Testing preferences saved</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Ready to explore the platform</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <p className="text-sm text-muted-foreground">
                We'll be in touch soon with your first testing assignment!
              </p>
            </div>
          </ScrollReveal>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStepIndex + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      {currentStep !== 'complete' && (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={currentStep === 'welcome' ? onSkip : prevStep}
            disabled={currentStep === 'welcome'}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 'welcome' ? 'Skip for now' : 'Previous'}
          </Button>
          
          <Button
            onClick={currentStep === 'preferences' ? handleSubmit : nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 glow-green"
          >
            {currentStep === 'preferences' ? 'Complete Setup' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            className="flex items-center gap-2 glow-green mx-auto"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BetaTesterOnboarding; 