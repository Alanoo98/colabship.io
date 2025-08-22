import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Rocket, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  Globe,
  Target,
  CheckCircle,
  MessageSquare,
  FileText,
  Search,
  Github,
  Code,
  DollarSign,
  Flame,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "Find collaborators based on skills, availability, and collaboration style. Our algorithm helps you discover the perfect match."
    },
    // {
    //   icon: MessageSquare,
    //   title: "Async Communication",
    //   description: "Built for the way indie hackers actually work. No pressure to be online 24/7 - communicate when it works for you."
    // },
    {
      icon: FileText,
      title: "Legal Templates",
      description: "Lightweight legal documents designed for indie collaborations. NDA, IP agreements, and more - all customizable."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Reputation-based system with optional trial periods. Build trust before committing to long-term partnerships."
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

  const stats = [
    { label: "Beta Testers", value: "10", icon: Users },
    { label: "Legal Templates", value: "6", icon: FileText },
    { label: "Features Built", value: "12+", icon: Rocket },
    { label: "Community Members", value: "50+", icon: Globe }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Share your skills, availability, and what you're looking for. Be honest about your needs and boundaries."
    },
    {
      step: "02",
      title: "Find Your Match",
      description: "Browse projects or let our algorithm suggest potential collaborators based on compatibility."
    },
    {
      step: "03",
      title: "Start Small",
      description: "Begin with a trial project or small collaboration to test the waters before committing long-term."
    },
    {
      step: "04",
      title: "Build Together",
      description: "Use our tools to communicate, share documents, and ship your project together."
    }
  ];

  const startingPoint = [
    {
      icon: Github,
      title: "3 Repos",
      description: "A handful of projects scattered across GitHub with no clear direction or strategy."
    },
    {
      icon: Code,
      title: "0 Backend Experience",
      description: "Frontend skills but barely any backend knowledge. Learning as we go."
    },
    {
      icon: DollarSign,
      title: "5 AI Tool Subscriptions",
      description: "Monthly payments to every AI tool under the sun, trying to fill the gaps."
    },
    {
      icon: BookOpen,
      title: "No GTM Strategy",
      description: "Zero experience in marketing, launching, or go-to-market. Pure trial and error."
    },
    {
      icon: Flame,
      title: "Infinite Drive",
      description: "More passion and determination than resources or experience. Pure hustle."
    },
    {
      icon: Users,
      title: "No Network",
      description: "No obvious resources to pull from. Building everything from scratch."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              About Colabship.io
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Where Indie Hackers Find Their People
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Colabship.io is the platform that makes finding collaborators effortless. 
              Built by indie hackers, for indie hackers. No corporate BS, just real people building real things together.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-accent/20">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To eliminate the loneliness and friction of indie hacking by mobilizing developers 
              with the best tools, resources, and collaborators. We believe that great things 
              happen when the right people work together with the right tools. This is more than 
              just a SaaS platform — it's about helping people like ourselves become sharper, 
              well-tuned tech-startup machines.
            </p>
          </div>
        </div>
      </section>

      {/* How It All Started Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Flame className="w-3 h-3 mr-1" />
              How It All Started
            </Badge>
            <h2 className="text-3xl font-bold mb-4">We Started With Nothing</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              This is the honest truth about where we began. No fancy backgrounds, no connections, 
              just pure determination and a willingness to learn. Here's what we had (and didn't have) 
              when we started this journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startingPoint.map((item, index) => (
              <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardContent className="pt-6">
                  <item.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-medium mb-2">The Point?</p>
              <p className="text-muted-foreground">
                You don't need to have it all figured out to start building something meaningful. 
                We're proof that passion, drive, and a willingness to learn can overcome any 
                lack of experience or resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <Card key={index} className="border-accent/20 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-accent">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
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
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your People?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the beta and be part of building the future of indie collaboration.
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

export default AboutPage; 