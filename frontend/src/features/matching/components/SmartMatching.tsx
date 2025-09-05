import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Target, 
  Star, 
  Clock, 
  DollarSign, 
  MapPin,
  MessageSquare,
  ArrowRight,
  Filter,
  Sliders,
  Zap,
  TrendingUp,
  CheckCircle,
  X,
  Heart,
  Eye,
  Calendar,
  Briefcase,
  Shield,
  Globe
} from "lucide-react";
import { useFounder } from "@/features/founders/context/FounderContext";
import ScrollReveal from "@/components/common/ScrollReveal";

interface MatchScore {
  overall: number;
  skills: number;
  experience: number;
  availability: number;
  compensation: number;
  collaboration: number;
  location: number;
  reasons: string[];
  mutualInterests: string[];
}

interface MatchResult {
  collaborator: any; // Using the collaborator profile type
  founder: any; // Using the founder profile type
  score: MatchScore;
  compatibility: {
    high: string[];
    medium: string[];
    low: string[];
  };
}

interface SmartMatchingProps {
  mode: 'founder' | 'collaborator';
  currentProfile: any;
  onSelectMatch: (match: MatchResult) => void;
}

const SmartMatching: React.FC<SmartMatchingProps> = ({ 
  mode, 
  currentProfile, 
  onSelectMatch 
}) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    minScore: 70,
    experienceLevel: 'all',
    availability: 'all',
    compensationType: 'all',
    location: 'all'
  });

  // Mock data for demonstration
  const mockCollaborators = [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: '/placeholder.svg',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
      roles: ['Full Stack Developer', 'DevOps Engineer'],
      experienceLevel: 'senior',
      yearsOfExperience: 6,
      location: 'San Francisco, CA',
      timezone: 'UTC-8',
      availability: 'part-time',
      collaborationStyle: 'async',
      compensationPreferences: {
        equity: true,
        revenueSharing: true,
        paid: false
      },
      portfolio: [
        {
          title: 'E-commerce Platform',
          description: 'Built a scalable e-commerce platform serving 10k+ users',
          technologies: ['React', 'Node.js', 'Stripe', 'AWS']
        }
      ],
      bio: 'Senior full-stack developer with 6 years of experience building scalable web applications. Passionate about clean code and user experience.',
      motivation: 'Looking to join early-stage startups where I can have significant impact and learn from experienced founders.'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      skills: ['Flutter', 'Dart', 'Firebase', 'Python', 'TensorFlow'],
      roles: ['Mobile Developer', 'ML Engineer'],
      experienceLevel: 'mid',
      yearsOfExperience: 4,
      location: 'New York, NY',
      timezone: 'UTC-5',
      availability: 'full-time',
      collaborationStyle: 'hybrid',
      compensationPreferences: {
        equity: true,
        revenueSharing: false,
        paid: true
      },
      portfolio: [
        {
          title: 'AI Health App',
          description: 'Developed a mental health app using AI for personalized therapy recommendations',
          technologies: ['Flutter', 'Python', 'TensorFlow', 'Firebase']
        }
      ],
      bio: 'Mobile developer and ML engineer with expertise in AI-powered applications. Experience in healthcare and fintech.',
      motivation: 'Interested in AI/ML projects that can make a positive impact on people\'s lives.'
    },
    {
      id: '3',
      name: 'Marcus Rodriguez',
      avatar: '/placeholder.svg',
      skills: ['Solidity', 'React', 'Web3', 'TypeScript', 'Ethereum'],
      roles: ['Blockchain Developer', 'Frontend Developer'],
      experienceLevel: 'senior',
      yearsOfExperience: 5,
      location: 'Austin, TX',
      timezone: 'UTC-6',
      availability: 'flexible',
      collaborationStyle: 'async',
      compensationPreferences: {
        equity: true,
        revenueSharing: true,
        paid: false
      },
      portfolio: [
        {
          title: 'DeFi Protocol',
          description: 'Built a decentralized lending protocol with $50M+ TVL',
          technologies: ['Solidity', 'React', 'Web3', 'Ethereum']
        }
      ],
      bio: 'Blockchain developer with deep expertise in DeFi protocols and smart contract development.',
      motivation: 'Passionate about DeFi and building the future of decentralized finance.'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      avatar: '/placeholder.svg',
      skills: ['Vue.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
      roles: ['Full Stack Developer', 'DevOps Engineer'],
      experienceLevel: 'expert',
      yearsOfExperience: 8,
      location: 'Seattle, WA',
      timezone: 'UTC-8',
      availability: 'part-time',
      collaborationStyle: 'sync',
      compensationPreferences: {
        equity: false,
        revenueSharing: true,
        paid: true
      },
      portfolio: [
        {
          title: 'EdTech Platform',
          description: 'Scaled an educational platform to 100k+ students',
          technologies: ['Vue.js', 'Python', 'PostgreSQL', 'AWS']
        }
      ],
      bio: 'Expert full-stack developer with 8 years of experience in edtech and enterprise applications.',
      motivation: 'Looking for meaningful projects in education technology and social impact.'
    }
  ];

  const mockFounders = [
    {
      id: '1',
      name: 'David Kim',
      avatar: '/placeholder.svg',
      projectName: 'EcoTrack Pro',
      projectDescription: 'AI-powered sustainability tracking platform for businesses',
      projectCategory: 'AI/ML',
      projectStage: 'beta',
      skillsNeeded: ['React', 'Node.js', 'Python', 'AWS'],
      rolesNeeded: ['Full Stack Developer', 'DevOps Engineer'],
      collaborationStyle: 'async',
      timeCommitment: 'part-time',
      equityOffered: true,
      equityPercentage: 15,
      revenueSharing: true,
      revenuePercentage: 20,
      location: 'San Francisco, CA',
      timezone: 'UTC-8',
      experienceLevel: 'senior',
      compensationType: 'equity'
    },
    {
      id: '2',
      name: 'Lisa Park',
      avatar: '/placeholder.svg',
      projectName: 'Mental Health AI',
      projectDescription: 'Personalized mental health companion using AI',
      projectCategory: 'Healthtech',
      projectStage: 'mvp',
      skillsNeeded: ['Flutter', 'Python', 'TensorFlow', 'Firebase'],
      rolesNeeded: ['Mobile Developer', 'ML Engineer'],
      collaborationStyle: 'hybrid',
      timeCommitment: 'full-time',
      equityOffered: true,
      equityPercentage: 25,
      revenueSharing: false,
      location: 'New York, NY',
      timezone: 'UTC-5',
      experienceLevel: 'mid',
      compensationType: 'equity'
    },
    {
      id: '3',
      name: 'James Thompson',
      avatar: '/placeholder.svg',
      projectName: 'DeFi Portfolio Manager',
      projectDescription: 'Automated DeFi portfolio management with yield optimization',
      projectCategory: 'Fintech',
      projectStage: 'launched',
      skillsNeeded: ['Solidity', 'React', 'Web3', 'TypeScript'],
      rolesNeeded: ['Blockchain Developer', 'Frontend Developer'],
      collaborationStyle: 'async',
      timeCommitment: 'flexible',
      equityOffered: true,
      equityPercentage: 20,
      revenueSharing: true,
      revenuePercentage: 30,
      location: 'Austin, TX',
      timezone: 'UTC-6',
      experienceLevel: 'senior',
      compensationType: 'equity'
    }
  ];

  // Smart matching algorithm
  const calculateMatchScore = (founder: any, collaborator: any): MatchScore => {
    let reasons: string[] = [];
    let mutualInterests: string[] = [];

    // Skills match (40% weight)
    const skillMatch = founder.skillsNeeded.filter((skill: string) => 
      collaborator.skills.includes(skill)
    ).length / founder.skillsNeeded.length;
    const skillsScore = skillMatch * 40;
    
    if (skillMatch > 0.8) reasons.push('Excellent skills match');
    else if (skillMatch > 0.6) reasons.push('Good skills alignment');
    else if (skillMatch > 0.4) reasons.push('Partial skills match');
    else reasons.push('Limited skills overlap');

    // Experience level match (20% weight)
    let experienceScore = 0;
    if (founder.experienceLevel === collaborator.experienceLevel) {
      experienceScore = 20;
      reasons.push('Perfect experience level match');
    } else if (
      (founder.experienceLevel === 'senior' && collaborator.experienceLevel === 'expert') ||
      (founder.experienceLevel === 'mid' && collaborator.experienceLevel === 'senior')
    ) {
      experienceScore = 15;
      reasons.push('Good experience level compatibility');
    } else {
      experienceScore = 5;
      reasons.push('Experience level mismatch');
    }

    // Availability match (15% weight)
    let availabilityScore = 0;
    if (founder.timeCommitment === collaborator.availability) {
      availabilityScore = 15;
      reasons.push('Perfect availability match');
    } else if (
      (founder.timeCommitment === 'part-time' && collaborator.availability === 'flexible') ||
      (founder.timeCommitment === 'flexible' && collaborator.availability === 'part-time')
    ) {
      availabilityScore = 12;
      reasons.push('Good availability compatibility');
    } else {
      availabilityScore = 5;
      reasons.push('Availability mismatch');
    }

    // Collaboration style match (10% weight)
    let collaborationScore = 0;
    if (founder.collaborationStyle === collaborator.collaborationStyle) {
      collaborationScore = 10;
      reasons.push('Matching collaboration style');
    } else if (
      (founder.collaborationStyle === 'async' && collaborator.collaborationStyle === 'hybrid') ||
      (founder.collaborationStyle === 'hybrid' && collaborator.collaborationStyle === 'async')
    ) {
      collaborationScore = 8;
      reasons.push('Compatible collaboration styles');
    } else {
      collaborationScore = 3;
      reasons.push('Different collaboration preferences');
    }

    // Compensation match (10% weight)
    let compensationScore = 0;
    const founderWantsEquity = founder.equityOffered;
    const founderWantsRevenue = founder.revenueSharing;
    const collaboratorWantsEquity = collaborator.compensationPreferences.equity;
    const collaboratorWantsRevenue = collaborator.compensationPreferences.revenueSharing;
    const collaboratorWantsPaid = collaborator.compensationPreferences.paid;

    if ((founderWantsEquity && collaboratorWantsEquity) || 
        (founderWantsRevenue && collaboratorWantsRevenue)) {
      compensationScore = 10;
      reasons.push('Compensation preferences aligned');
    } else if (founderWantsEquity && collaboratorWantsEquity) {
      compensationScore = 8;
      reasons.push('Equity compensation match');
    } else if (founderWantsRevenue && collaboratorWantsRevenue) {
      compensationScore = 8;
      reasons.push('Revenue sharing match');
    } else {
      compensationScore = 2;
      reasons.push('Compensation preferences differ');
    }

    // Location/Timezone match (5% weight)
    let locationScore = 0;
    if (founder.timezone === collaborator.timezone) {
      locationScore = 5;
      reasons.push('Same timezone - easy collaboration');
    } else if (
      (founder.timezone === 'UTC-8' && collaborator.timezone === 'UTC-5') ||
      (founder.timezone === 'UTC-5' && collaborator.timezone === 'UTC-8')
    ) {
      locationScore = 3;
      reasons.push('Compatible timezones');
    } else {
      locationScore = 1;
      reasons.push('Different timezones');
    }

    // Calculate mutual interests
    if (founder.projectCategory === 'AI/ML' && collaborator.skills.includes('Python')) {
      mutualInterests.push('AI/ML Development');
    }
    if (founder.projectCategory === 'Fintech' && collaborator.skills.includes('Blockchain')) {
      mutualInterests.push('Fintech Innovation');
    }
    if (founder.projectCategory === 'Healthtech' && collaborator.portfolio.some(p => p.title.includes('Health'))) {
      mutualInterests.push('Healthcare Technology');
    }

    const overallScore = Math.round(skillsScore + experienceScore + availabilityScore + collaborationScore + compensationScore + locationScore);

    return {
      overall: overallScore,
      skills: Math.round(skillsScore),
      experience: experienceScore,
      availability: availabilityScore,
      compensation: compensationScore,
      collaboration: collaborationScore,
      location: locationScore,
      reasons,
      mutualInterests
    };
  };

  const generateMatches = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const results: MatchResult[] = [];
      
      if (mode === 'founder') {
        // Match collaborators to founder
        mockCollaborators.forEach(collaborator => {
          const score = calculateMatchScore(currentProfile, collaborator);
          
          if (score.overall >= selectedFilters.minScore) {
            const compatibility = {
              high: score.reasons.filter(r => r.includes('Excellent') || r.includes('Perfect') || r.includes('aligned')),
              medium: score.reasons.filter(r => r.includes('Good') || r.includes('Compatible')),
              low: score.reasons.filter(r => r.includes('Limited') || r.includes('mismatch') || r.includes('differ'))
            };
            
            results.push({
              collaborator,
              founder: currentProfile,
              score,
              compatibility
            });
          }
        });
      } else {
        // Match founders to collaborator
        mockFounders.forEach(founder => {
          const score = calculateMatchScore(founder, currentProfile);
          
          if (score.overall >= selectedFilters.minScore) {
            const compatibility = {
              high: score.reasons.filter(r => r.includes('Excellent') || r.includes('Perfect') || r.includes('aligned')),
              medium: score.reasons.filter(r => r.includes('Good') || r.includes('Compatible')),
              low: score.reasons.filter(r => r.includes('Limited') || r.includes('mismatch') || r.includes('differ'))
            };
            
            results.push({
              collaborator: currentProfile,
              founder,
              score,
              compatibility
            });
          }
        });
      }
      
      // Sort by overall score
      results.sort((a, b) => b.score.overall - a.score.overall);
      
      setMatches(results);
      setFilteredMatches(results);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (currentProfile) {
      generateMatches();
    }
  }, [currentProfile, selectedFilters]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/10 border-green-500/20';
    if (score >= 80) return 'bg-blue-500/10 border-blue-500/20';
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const renderMatchCard = (match: MatchResult, index: number) => {
    const profile = mode === 'founder' ? match.collaborator : match.founder;
    const projectName = mode === 'founder' ? currentProfile.projectName : match.founder.projectName;
    
    return (
      <ScrollReveal key={match.collaborator.id + match.founder.id} delay={index * 100}>
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {mode === 'founder' ? profile.roles.join(', ') : projectName}
                  </p>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full border ${getScoreBg(match.score.overall)}`}>
                <span className={`text-lg font-bold ${getScoreColor(match.score.overall)}`}>
                  {match.score.overall}%
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Score Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Skills Match</span>
                <span className="font-medium">{match.score.skills}%</span>
              </div>
              <Progress value={match.score.skills} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span>Experience</span>
                <span className="font-medium">{match.score.experience}%</span>
              </div>
              <Progress value={match.score.experience} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span>Availability</span>
                <span className="font-medium">{match.score.availability}%</span>
              </div>
              <Progress value={match.score.availability} className="h-2" />
            </div>
            
            {/* Compatibility Reasons */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Why this match works:</h4>
              <div className="space-y-1">
                {match.score.reasons.slice(0, 3).map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mutual Interests */}
            {match.score.mutualInterests.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Mutual Interests:</h4>
                <div className="flex flex-wrap gap-1">
                  {match.score.mutualInterests.map((interest, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{mode === 'founder' ? profile.availability : match.founder.timeCommitment}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span>{mode === 'founder' ? profile.experienceLevel : match.founder.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{mode === 'founder' ? profile.collaborationStyle : match.founder.collaborationStyle}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                className="flex-1 glow-green"
                onClick={() => onSelectMatch(match)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {mode === 'founder' ? 'Contact Collaborator' : 'Contact Founder'}
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          <Zap className="w-8 h-8 inline mr-2 text-accent" />
          Smart Matches
        </h2>
        <p className="text-muted-foreground">
          AI-powered matching based on skills, experience, and collaboration preferences
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-background border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-accent" />
            Match Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Match Score</label>
              <input
                type="range"
                min="50"
                max="95"
                value={selectedFilters.minScore}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  minScore: parseInt(e.target.value)
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50%</span>
                <span>{selectedFilters.minScore}%</span>
                <span>95%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <select
                value={selectedFilters.experienceLevel}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  experienceLevel: e.target.value
                })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Levels</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <select
                value={selectedFilters.availability}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  availability: e.target.value
                })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Finding your perfect matches...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {filteredMatches.length} Matches Found
            </h3>
            <Badge variant="outline">
              <TrendingUp className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.map((match, index) => renderMatchCard(match, index))}
          </div>
          
          {filteredMatches.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or expanding your search criteria
                </p>
                <Button onClick={() => setSelectedFilters({
                  minScore: 50,
                  experienceLevel: 'all',
                  availability: 'all',
                  compensationType: 'all',
                  location: 'all'
                })}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartMatching; 