import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  FileText, 
  Shield, 
  Users, 
  Zap, 
  Heart,
  ArrowRight,
  Globe,
  Target,
  CheckCircle,
  Clock,
  Lock,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const FeaturesPage = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "Find collaborators based on skills, availability, and collaboration style. Our algorithm helps you discover the perfect match.",
      details: [
        "Multi-factor matching algorithm",
        "Skills and experience matching",
        "Availability and timezone compatibility",
        "Collaboration style preferences"
      ],
      status: "Live"
    },
    // {
    //   icon: MessageSquare,
    //   title: "Async Communication",
    //   description: "Built for the way indie hackers actually work. No pressure to be online 24/7 - communicate when it works for you.",
    //   details: [
    //     "Built-in chat system",
    //     "File sharing and collaboration",
    //     "Progress tracking",
    //     "Milestone management"
    //   ],
    //   status: "Live"
    // },
    {
      icon: FileText,
      title: "Legal Templates",
      description: "Lightweight legal documents designed for indie collaborations. NDA, IP agreements, and more - all customizable.",
      details: [
        "Non-Disclosure Agreements",
        "Intellectual Property Agreements",
        "Founder Agreements",
        "Contributor Agreements"
      ],
      status: "Live"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Reputation-based system with optional trial periods. Build trust before committing to long-term partnerships.",
      details: [
        "Reputation system",
        "Trial period mechanics",
        "Verification processes",
        "Community guidelines"
      ],
      status: "Live"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with other indie hackers, share ideas, and build your network in a supportive environment.",
      details: [
        "Community challenges",
        "Knowledge sharing",
        "Event organization",
        "Mentorship opportunities"
      ],
      status: "Coming Soon"
    },
    {
      icon: Zap,
      title: "Project Showcase",
      description: "Showcase your projects and attract the right collaborators. Make your ideas visible to the community.",
      details: [
        "Rich project profiles",
        "Media and documentation",
        "Progress updates",
        "Collaborator applications"
      ],
      status: "Coming Soon"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Human-First",
      description: "We understand that finding collaborators is deeply personal. We build with empathy and vulnerability in mind."
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Every feature is built based on real feedback from indie hackers. You're not just users - you're co-founders."
    },
    {
      icon: Zap,
      title: "Simplicity",
      description: "Complexity kills collaboration. We keep things simple, lightweight, and focused on what actually matters."
    },
    {
      icon: Globe,
      title: "Global",
      description: "Indie hackers are everywhere. We're building a platform that works regardless of timezone or location."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Built for Real Collaboration
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every feature comes from real pain points and real needs. 
              No corporate bloat, just tools that actually help indie hackers build together.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <feature.icon className="w-12 h-12 text-accent" />
                    <Badge variant={feature.status === "Live" ? "default" : "secondary"}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="pt-6">
                  <value.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try These Features?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the beta and experience how these features can transform your collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <Link to="/access">
                Join Beta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/journey">
                Read Our Story
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FeaturesPage; 