import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  Heart, 
  Zap, 
  Target, 
  ArrowRight, 
  Play,
  Settings,
  BarChart3,
  UserCheck,
  MessageSquare
} from 'lucide-react';

const MatchingDemoPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      description: "Find collaborators based on complementary skills, not just similarity.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Heart,
      title: "Personality Fit",
      description: "Match based on work style, communication preferences, and values.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: Zap,
      title: "Real-time Scoring",
      description: "Dynamic match scores with detailed breakdowns and explanations.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Target,
      title: "Custom Preferences",
      description: "Fine-tune matching weights to prioritize what matters most to you.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const demoSteps = [
    {
      step: "01",
      title: "Complete Your Profile",
      description: "Go through our 5-step onboarding to tell us about your skills, needs, and preferences.",
      action: "Start Onboarding",
      link: "/onboarding",
      icon: UserCheck
    },
    {
      step: "02",
      title: "Discover Matches",
      description: "Browse potential collaborators with detailed match scores and complementarity analysis.",
      action: "View Matches",
      link: "/matches",
      icon: Users
    },
    {
      step: "03",
      title: "Connect & Collaborate",
      description: "Reach out to your best matches and start building amazing projects together.",
      action: "Start Matching",
      link: "/matches",
      icon: MessageSquare
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              🚀 New Feature
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart Matching System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find the perfect collaborators through our intelligent matching algorithm that focuses on 
              <span className="text-accent font-semibold"> complementary skills</span> rather than similarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/onboarding">
                  <Play className="w-4 h-4 mr-2" />
                  Try the Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/matches">
                  <Users className="w-4 h-4 mr-2" />
                  View Matches
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our matching system uses advanced algorithms to connect you with collaborators 
              who complement your skills and share your goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Steps */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Started in 3 Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete your profile, discover matches, and start collaborating with the right people.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {demoSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>
                    <Button asChild className="w-full">
                      <Link to={step.link}>
                        <Icon className="w-4 h-4 mr-2" />
                        {step.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Algorithm Details */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Matching Algorithm</h2>
              <p className="text-muted-foreground mb-6">
                Our algorithm considers multiple factors to find the best collaborators for your projects:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    25%
                  </div>
                  <div>
                    <h4 className="font-medium">Skills & Expertise</h4>
                    <p className="text-sm text-muted-foreground">Complementary skill matching with proficiency levels</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                    20%
                  </div>
                  <div>
                    <h4 className="font-medium">Availability & Commitment</h4>
                    <p className="text-sm text-muted-foreground">Matching weekly hours and commitment levels</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                    20%
                  </div>
                  <div>
                    <h4 className="font-medium">Timezone Compatibility</h4>
                    <p className="text-sm text-muted-foreground">Overlapping work hours for effective collaboration</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                    15%
                  </div>
                  <div>
                    <h4 className="font-medium">Collaboration Style</h4>
                    <p className="text-sm text-muted-foreground">Work style and communication preferences</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                    20%
                  </div>
                  <div>
                    <h4 className="font-medium">Values & Personality</h4>
                    <p className="text-sm text-muted-foreground">Shared values and cultural fit</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Match Score Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Frontend Developer + Backend Developer</span>
                      <Badge variant="default">92% Match</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Skills Complementarity</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Availability Alignment</span>
                        <span className="font-medium">88%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Timezone Overlap</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Work Style Match</span>
                        <span className="font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Customizable Weights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Adjust the importance of each factor based on your preferences:
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Skills & Expertise</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                    <Link to="/onboarding">
                      Customize Preferences
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already finding amazing collaborators 
            through our intelligent matching system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/onboarding">
                <UserCheck className="w-4 h-4 mr-2" />
                Complete Your Profile
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/matches">
                <Users className="w-4 h-4 mr-2" />
                Browse Matches
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MatchingDemoPage; 