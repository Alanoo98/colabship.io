import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Target, 
  Star, 
  Zap,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Briefcase,
  Shield,
  Globe,
  MessageSquare,
  Eye,
  Filter,
  Sliders,
  Heart,
  X,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  User,
  Calendar,
  Code,
  Palette,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Minus,
  RotateCcw
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmartMatching from "@/features/matching/components/SmartMatching";
import ScrollReveal from "@/components/common/ScrollReveal";

const SmartMatchingPage = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [matchFilters, setMatchFilters] = useState({
    minScore: 70,
    experienceLevel: 'all',
    availability: 'all',
    compensationType: 'all',
    location: 'all'
  });

  // Mock founder profile for demonstration
  const mockFounderProfile = {
    name: "Alex Chen",
    role: "Full-Stack Developer",
    experience: "5+ years",
    location: "San Francisco, CA",
    timezone: "PST",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    availability: "20 hours/week",
    compensation: "Equity + Revenue Share",
    collaborationStyle: "Async-first with weekly syncs",
    bio: "Passionate about building scalable web applications. Previously built and sold a SaaS platform. Looking for a technical co-founder to build the next big thing.",
    portfolio: [
      { name: "TaskFlow", description: "Project management SaaS", url: "#" },
      { name: "DataViz", description: "Analytics dashboard", url: "#" }
    ]
  };

  // Mock collaborator profile for demonstration
  const mockCollaboratorProfile = {
    name: "Sarah Johnson",
    role: "Product Designer",
    experience: "3+ years",
    location: "New York, NY",
    timezone: "EST",
    skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Design Systems"],
    availability: "15 hours/week",
    compensation: "Equity preferred",
    collaborationStyle: "Hybrid - async with regular check-ins",
    bio: "Product designer focused on user-centered design. Love working on early-stage products and helping founders bring their vision to life.",
    portfolio: [
      { name: "FinTech App", description: "Mobile banking interface", url: "#" },
      { name: "E-commerce Platform", description: "Shopping experience redesign", url: "#" }
    ]
  };

  const handleSelectMatch = (match: any) => {
    setSelectedMatch(match);
    // In a real app, this would open a chat or contact modal
    console.log('Selected match:', match);
  };

  const handleSwipe = (direction: 'left' | 'right', match: any) => {
    if (direction === 'right') {
      // Like/Match
      console.log('Liked:', match);
      // Show match notification
    } else {
      // Pass
      console.log('Passed:', match);
    }
  };

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
                  <Heart className="w-6 h-6 text-accent" />
                  Smart Matching
                </h1>
                <p className="text-muted-foreground mt-1">
                  Find your perfect co-founder or project match
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discover" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="matches" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Matches
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="space-y-6">
              {/* Match Card Interface */}
              <div className="max-w-md mx-auto">
                <Card className="relative overflow-hidden shadow-xl">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      95% Match
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{mockFounderProfile.name}</h3>
                      <p className="text-muted-foreground">{mockFounderProfile.role}</p>
                      <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {mockFounderProfile.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {mockFounderProfile.experience}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {mockFounderProfile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Availability</h4>
                        <p className="text-sm text-muted-foreground">{mockFounderProfile.availability}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Compensation</h4>
                        <p className="text-sm text-muted-foreground">{mockFounderProfile.compensation}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Bio</h4>
                        <p className="text-sm text-muted-foreground">{mockFounderProfile.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Swipe Actions */}
                <div className="flex justify-center gap-4 mt-6">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-16 h-16 rounded-full"
                    onClick={() => handleSwipe('left', mockFounderProfile)}
                  >
                    <X className="w-6 h-6 text-red-500" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-16 h-16 rounded-full glow-green"
                    onClick={() => handleSwipe('right', mockFounderProfile)}
                  >
                    <Heart className="w-6 h-6" />
                  </Button>
                </div>

                {/* Match Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-muted-foreground">Matches</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-muted-foreground">Conversations</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="matches" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((match) => (
                  <Card key={match} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Match #{match}</h3>
                            <p className="text-sm text-muted-foreground">Developer</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">
                          {85 + match * 2}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>20 hours/week</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-3 h-3 text-muted-foreground" />
                          <span>Equity + Revenue</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <SmartMatching mode="founder" currentProfile={mockFounderProfile} onSelectMatch={handleSelectMatch} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartMatchingPage; 