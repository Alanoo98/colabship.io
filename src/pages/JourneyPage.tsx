import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Users, 
  Rocket, 
  Heart, 
  ArrowRight,
  Calendar,
  MapPin,
  Code,
  Palette,
  BarChart3,
  Globe,
  Zap,
  Target,
  TestTube,
  MessageSquare,
  Shield,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const JourneyPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Scroll tracking for timeline navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-journey-step]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (stepIndex: number) => {
    const section = document.querySelector(`[data-journey-step="${stepIndex}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const journeySteps = [
    {
      phase: "The Beginning",
      icon: Code,
      date: "Early 2025",
      title: "Solo Developer, Big Dreams",
      description: "I was diving straight into indie developing without any sparring partners or collaborators. With a technical/data background and huge drive to start my own projects and business, I was building alone. But how do you know if you're on the right track when there's no one to bounce ideas off?",
      vulnerability: "I had the skills and drive, but I was flying blind without anyone to share the journey with."
    },
    {
      phase: "The Tools",
      icon: Zap,
      date: "Spring 2025",
      title: "Discovering the Indie Hacker Toolkit",
      description: "I started using tools like bolt.new and loveable to accelerate my development. Then I found Cursor - this was a game changer. I didn't chat much or share my journey, but I found inspiration from people on YouTube and Reddit. The indie hacker community became my virtual co-working space."
    },
    {
      phase: "The Connection",
      icon: Users,
      date: "Summer 2025",
      title: "Finding My Silicon Valley Partner",
      description: "Through Reddit, I connected with someone from Silicon Valley. We hit it off immediately - he had the business experience I lacked, I had the technical skills he needed. We decided to team up. But this made me realize: why isn't finding a partner this easy for everyone?",
      vulnerability: "Finding him was pure luck. What about all the other talented people who never find their match?",
      button: {
        text: "Find Your Potential Partner",
        link: "/access"
      }
    },
    {
      phase: "The Realization",
      icon: Lightbulb,
      date: "Late Summer 2025",
      title: "This Isn't Just My Problem",
      description: "As I talked to more indie hackers, I realized I wasn't alone. Everyone was struggling with the same thing: finding the right people to build with. The existing platforms were too corporate, too expensive, too focused on full-time roles. We needed something different. Colabship.io was born in August 2025 - not just for introverts, but for anyone who wants to build with the right people."
    },
    {
      phase: "The Vision",
      icon: Target,
      date: "Fall 2025",
      title: "Colabship.io is Born",
      description: "The idea crystallized: a platform that understands the vulnerability of reaching out. A place where introverts can find their people without feeling awkward. Where trust is built gradually, not demanded upfront.",
      vulnerability: "Building this platform means being vulnerable about my own struggles. But that's exactly why it might work.",
      button: {
        text: "About Colabship.io",
        link: "/about"
      }
    },
    {
      phase: "The Build",
      icon: Code,
      date: "Late Summer 2025",
      title: "Building With Heart",
      description: "Every feature I built came from a real moment of pain or joy. The matching algorithm? That's for the times I wished someone could just tell me who I'd work well with.",
      button: {
        text: "See the Features",
        link: "/features"
      }
    },
    {
      phase: "The Test",
      icon: TestTube,
      date: "Late Summer 2025",
      title: "Beta Team Recruitment",
      description: "We're currently recruiting 10 passionate indie hackers to join our beta testing program. Every piece of feedback will be personal because this isn't just a product - it's a solution to a problem I lived. Your feedback will shape not just the platform, but how we help people find their collaborators.",
      vulnerability: "I'm nervous about what you'll think, but excited to build something that actually helps.",
      button: {
        text: "Join the Beta Team",
        link: "/access"
      }
    }
  ];

  const lessons = [
    {
      icon: Heart,
      title: "Vulnerability is Strength",
      description: "The moments when I was most honest about my struggles led to the deepest connections. People want to help, but they need to know you're human."
    },
    {
      icon: Users,
      title: "Introverts Need Safe Spaces",
      description: "Traditional networking doesn't work for everyone. We need ways to connect that respect different communication styles and energy levels."
    },
    {
      icon: Shield,
      title: "Trust Takes Time",
      description: "You can't rush trust. It builds through small interactions, shared experiences, and mutual vulnerability."
    },
    {
      icon: MessageSquare,
      title: "Communication is Everything",
      description: "Most collaboration problems are communication problems. Building tools that make honest communication easier is key."
    }
  ];

  const stats = [
    { label: "Reddit Karma", value: "68", icon: Users },
    { label: "LinkedIn Connections", value: "253", icon: Globe },
    { label: "Partners & Collaborators", value: "0", icon: Heart },
    { label: "Launched Products", value: "0", icon: Rocket }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-3 h-3 mr-1" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              The Colabship.io Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              This is the story of how a personal struggle became a platform. 
              It's about vulnerability, trust, and the courage to ask for help. 
              No corporate speak, just real feelings and real lessons.
            </p>
            
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="/images/profile.jpg" 
                  alt="Emil Vergara - Co-founder of Colabship.io" 
                  className="w-32 h-32 hover:w-48 hover:h-48 rounded-full object-cover border-4 border-accent/20 shadow-lg transition-all duration-300 ease-in-out"
                />
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hi, I'm <span className="text-accent font-semibold">Emil Vergara</span>. 
              This is my story of building Colabship.io from the ground up. 
              No fancy background, no connections, just pure determination and a willingness to learn. 
              I'm still figuring things out as I go, and honestly, that's probably never going to change.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-6 text-muted-foreground">
              Q2 2025: Where I'm starting from
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Sticky Timeline Navigation */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-background/80 backdrop-blur-sm border border-accent/20 rounded-lg p-4 shadow-lg">
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToStep(0)}
              className="w-8 h-8 p-0"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            
            <div className="flex flex-col space-y-2">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative group">
                  <button
                    onClick={() => scrollToStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      activeStep === index
                        ? 'bg-accent scale-125'
                        : 'bg-accent/30 hover:bg-accent/60'
                    }`}
                  />
                  {/* Hover Tooltip */}
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-background border border-accent/20 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                      <div className="text-xs font-semibold text-accent">{step.date}</div>
                      <div className="text-xs text-muted-foreground">{step.title}</div>
                    </div>
                    {/* Arrow pointing to dot */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-l-0 border-r-4 border-t-2 border-b-2 border-transparent border-r-accent/20"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToStep(journeySteps.length - 1)}
              className="w-8 h-8 p-0"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">The Timeline</h2>
          
          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative" data-journey-step={index}>
                {/* Timeline line */}
                {index < journeySteps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-12 bg-accent/30"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Phase icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1 border-accent/20">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{step.phase}</Badge>
                        <span className="text-sm text-muted-foreground">{step.date}</span>
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      {/* Vulnerability Quote */}
                      {step.vulnerability && (
                        <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mb-4">
                          <p className="text-sm italic text-accent">
                            "{step.vulnerability}"
                          </p>
                        </div>
                      )}
                      
                      {/* Action Button */}
                      {step.button && (
                        <div className="mt-4">
                          <Button asChild className="glow-green">
                            <Link to={step.button.link}>
                              {step.button.text}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-muted-foreground mb-8">
            This story isn't finished yet. Be part of writing the next chapter. 
            Help us build something that makes finding collaborators less scary and more human.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <Link to="/access">
                Join Beta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Share Your Story
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JourneyPage; 