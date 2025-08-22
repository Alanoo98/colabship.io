import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Heart, 
  Zap, 
  Globe, 
  ArrowRight,
  MessageSquare,
  Github,
  Star,
  CheckCircle,
  Send,
  Lightbulb,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const CareersPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Mission-Driven",
      description: "We're building something that actually helps indie hackers. Every feature we ship makes a real difference."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Our users are our co-founders. We build in public, share our journey, and listen to feedback."
    },
    {
      icon: Zap,
      title: "Fast & Lightweight",
      description: "We move quickly, ship often, and keep things simple. No corporate bureaucracy here."
    },
    {
      icon: Globe,
      title: "Remote-First",
      description: "Work from anywhere, collaborate async-first, and build your own schedule."
    }
  ];

  const collaborationWays = [
    {
      icon: MessageSquare,
      title: "Join Our Discord",
      description: "Connect with other indie hackers, share ideas, and help shape the future of Colabship.io",
      action: "Join Discord",
      href: "https://discord.gg/colabship"
    },
    {
      icon: Github,
      title: "Contribute Code",
      description: "Help build features, fix bugs, or improve the platform through open source contributions",
      action: "View on GitHub",
      href: "https://github.com/colabship"
    },
    {
      icon: Lightbulb,
      title: "Share Ideas",
      description: "Have ideas for features or improvements? We want to hear from you",
      action: "Get in Touch",
      href: "/contact"
    },
    {
      icon: Target,
      title: "Beta Testing",
      description: "Test new features, provide feedback, and help us iterate on the platform",
      action: "Join Beta",
      href: "/access"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Community Member",
      quote: "Being part of the Colabship Discord has been amazing. I've found collaborators for my projects and helped shape features that actually matter.",
      avatar: "/api/placeholder/100/100"
    },
    {
      name: "Sarah Kim",
      role: "Beta Tester",
      quote: "The community is incredibly supportive. It's refreshing to be part of something built by indie hackers, for indie hackers.",
      avatar: "/api/placeholder/100/100"
    },
    {
      name: "Marcus Rodriguez",
      role: "Contributor",
      quote: "I love that I can contribute in my own way - sometimes code, sometimes ideas, sometimes just feedback. Every voice matters here.",
      avatar: "/api/placeholder/100/100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Join Our Community
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Help Shape the Future of Collaboration
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not hiring employees - we're looking for co-creators. 
              Join our Discord community and help build the platform that indie hackers actually need.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Community-Driven</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Ways to Contribute</div>
            </div>
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

      {/* Ways to Collaborate */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Ways to Get Involved</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {collaborationWays.map((way, index) => (
              <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardContent className="pt-6">
                  <way.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{way.title}</h3>
                  <p className="text-muted-foreground mb-4">{way.description}</p>
                  <Button asChild className="glow-green">
                    <a href={way.href} target="_blank" rel="noopener noreferrer">
                      {way.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Our Discord Community</h2>
          <p className="text-xl text-muted-foreground mb-8">
            This is where the magic happens. Connect with other indie hackers, share your ideas, 
            and help us shape the Colabship.io universe into something that really matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="https://discord.gg/colabship" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Join Discord
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/journey">
                Read Our Story
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-accent/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4"></div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you want to contribute code, share ideas, or just be part of the community, 
            there's a place for you in the Colabship.io universe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="https://discord.gg/colabship" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Join Discord Community
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareersPage; 