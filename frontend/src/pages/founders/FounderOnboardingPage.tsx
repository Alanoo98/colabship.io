import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Rocket, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  ArrowRight, 
  Star,
  Zap,
  Lightbulb,
  Search,
  Filter,
  MapPin,
  Calendar,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  Code,
  Palette,
  BarChart3,
  Globe,
  Heart,
  Bookmark,
  Share2,
  MoreVertical,
  User,
  Briefcase,
  Timer,
  Award
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FounderOnboarding from "@/features/founders/components/FounderOnboarding";
import { FounderProfile } from "@/features/founders/types/founder";
import { useFounder } from "@/features/founders/context/FounderContext";
import ScrollReveal from "@/components/common/ScrollReveal";
import ApplicationModal from "@/features/applications/components/ApplicationModal";

const FounderOnboardingPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [completedProfile, setCompletedProfile] = useState<FounderProfile | null>(null);
  const { createFounderProfile, currentFounderProfile, founderProfiles } = useFounder();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedFounder, setSelectedFounder] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock founder profiles for showcase
  const showcaseFounders = [
    {
      id: 1,
      name: "Alex Chen",
      projectName: "EcoTrack Pro",
      projectDescription: "AI-powered sustainability tracking platform for businesses. Real-time monitoring of carbon footprint, waste management, and compliance reporting.",
      category: "AI/ML",
      stage: "beta",
      skillsNeeded: ["React", "Node.js", "Python", "AWS", "Machine Learning"],
      timeCommitment: "20 hours/week",
      collaborationStyle: "Async-first with weekly syncs",
      compensation: "15% equity + 20% revenue share",
      location: "San Francisco, CA",
      views: 156,
      applications: 8,
      matchScore: 95,
      avatar: "AC",
      experience: "5+ years",
      portfolio: ["TaskFlow SaaS", "DataViz Analytics"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      projectName: "FinFlow",
      projectDescription: "Personal finance app that automatically categorizes expenses and provides AI-driven financial insights and budgeting recommendations.",
      category: "FinTech",
      stage: "idea",
      skillsNeeded: ["React Native", "Firebase", "Stripe API", "UI/UX Design"],
      timeCommitment: "15 hours/week",
      collaborationStyle: "Hybrid - async with regular check-ins",
      compensation: "20% equity",
      location: "New York, NY",
      views: 89,
      applications: 5,
      matchScore: 87,
      avatar: "SJ",
      experience: "3+ years",
      portfolio: ["Mobile Banking App", "E-commerce Platform"]
    },
    {
      id: 3,
      name: "David Kim",
      projectName: "HealthSync",
      projectDescription: "Telemedicine platform connecting patients with healthcare providers through video consultations and health monitoring.",
      category: "HealthTech",
      stage: "development",
      skillsNeeded: ["Vue.js", "WebRTC", "HIPAA Compliance", "Backend Development"],
      timeCommitment: "25 hours/week",
      collaborationStyle: "Sync with daily standups",
      compensation: "12% equity + $50/hour",
      location: "Austin, TX",
      views: 234,
      applications: 12,
      matchScore: 92,
      avatar: "DK",
      experience: "7+ years",
      portfolio: ["Hospital Management System", "Patient Portal"]
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      projectName: "EduTech Hub",
      projectDescription: "Online learning platform with interactive courses, progress tracking, and AI-powered personalized learning paths.",
      category: "EdTech",
      stage: "launch",
      skillsNeeded: ["React", "Node.js", "MongoDB", "Video Streaming", "Analytics"],
      timeCommitment: "30 hours/week",
      collaborationStyle: "Async-first",
      compensation: "18% equity",
      location: "Remote",
      views: 67,
      applications: 3,
      matchScore: 78,
      avatar: "MR",
      experience: "4+ years",
      portfolio: ["Language Learning App", "Corporate Training Platform"]
    },
    {
      id: 5,
      name: "James Wilson",
      projectName: "SmartHome Hub",
      projectDescription: "IoT platform for smart home automation with voice control, energy optimization, and security monitoring.",
      category: "IoT",
      stage: "prototype",
      skillsNeeded: ["Python", "IoT Protocols", "Mobile Development", "Cloud Infrastructure"],
      timeCommitment: "20 hours/week",
      collaborationStyle: "Hybrid",
      compensation: "15% equity + revenue share",
      location: "Seattle, WA",
      views: 123,
      applications: 7,
      matchScore: 83,
      avatar: "JW",
      experience: "6+ years",
      portfolio: ["Smart Thermostat", "Security Camera System"]
    },
    {
      id: 6,
      name: "Lisa Park",
      projectName: "SocialCommerce",
      projectDescription: "Social media platform integrated with e-commerce features, allowing users to discover and purchase products through social interactions.",
      category: "Social",
      stage: "idea",
      skillsNeeded: ["React", "GraphQL", "Payment Processing", "Social Features", "Mobile App"],
      timeCommitment: "25 hours/week",
      collaborationStyle: "Async with weekly meetings",
      compensation: "25% equity",
      location: "Los Angeles, CA",
      views: 45,
      applications: 2,
      matchScore: 91,
      avatar: "LP",
      experience: "4+ years",
      portfolio: ["Social Media App", "E-commerce Website"]
    }
  ];

  const categories = [
    "All Categories",
    "AI/ML",
    "FinTech", 
    "HealthTech",
    "EdTech",
    "IoT",
    "Social",
    "E-commerce",
    "SaaS",
    "Mobile",
    "Web3",
    "Other"
  ];

  const stages = [
    "All Stages",
    "idea",
    "prototype", 
    "development",
    "beta",
    "launch",
    "scaling"
  ];

  const handleComplete = (profile: Omit<FounderProfile, 'createdAt' | 'updatedAt' | 'status' | 'views' | 'applications'>) => {
    createFounderProfile(profile);
    setCompletedProfile({ ...profile, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'active', views: 0, applications: 0 });
    setShowOnboarding(false);
  };

  const handleSkip = () => {
    setShowOnboarding(false);
  };

  // Filter founders based on search and filters
  const filteredFounders = showcaseFounders.filter(founder => {
    const matchesSearch = searchTerm === "" || 
      founder.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      founder.projectDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      founder.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "" || selectedCategory === "All Categories" || founder.category === selectedCategory;
    const matchesStage = selectedStage === "" || selectedStage === "All Stages" || founder.stage === selectedStage;
    
    return matchesSearch && matchesCategory && matchesStage;
  });

  const handleApplyToProject = (founder: any) => {
    setSelectedFounder(founder);
    setShowApplicationModal(true);
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <FounderOnboarding onComplete={handleComplete} onSkip={handleSkip} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-accent" />
                  Project Marketplace
                </h1>
                <p className="text-muted-foreground mt-1">
                  Discover exciting projects and find your next collaboration
                </p>
              </div>
              <Button className="glow-green" onClick={() => setShowOnboarding(true)}>
                <Plus className="w-4 h-4 mr-2" />
                List Your Project
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-6">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search projects, skills, or founders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredFounders.length} projects found
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <div className="space-y-1 w-4 h-4">
                    <div className="bg-current rounded-sm h-0.5"></div>
                    <div className="bg-current rounded-sm h-0.5"></div>
                    <div className="bg-current rounded-sm h-0.5"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredFounders.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredFounders.map((founder) => (
                <Card key={founder.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {founder.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold">{founder.name}</h3>
                          <p className="text-sm text-muted-foreground">{founder.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          {founder.matchScore}%
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-lg mb-2">{founder.projectName}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {founder.projectDescription}
                      </p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{founder.category}</Badge>
                        <Badge variant="outline">{founder.stage}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {founder.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {founder.timeCommitment}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-1">Skills Needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {founder.skillsNeeded.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {founder.skillsNeeded.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{founder.skillsNeeded.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          <Eye className="w-3 h-3 inline mr-1" />
                          {founder.views} views
                        </span>
                        <span className="text-muted-foreground">
                          <MessageSquare className="w-3 h-3 inline mr-1" />
                          {founder.applications} applications
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 glow-green" 
                        onClick={() => handleApplyToProject(founder)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Apply to Join
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedStage("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Application Modal */}
      {selectedFounder && (
        <ApplicationModal
          isOpen={showApplicationModal}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedFounder(null);
          }}
          founderProfile={selectedFounder}
        />
      )}
    </div>
  );
};

export default FounderOnboardingPage; 