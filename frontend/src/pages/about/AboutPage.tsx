import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";

const AboutPage = () => {
  const versionHistory = [
    {
      version: "v2.0.0",
      date: "2024-12-19",
      title: "Global Access Control System",
      description: "Complete overhaul of the access control system with support for multiple access types, feature flags, and version testing.",
      features: [
        "Multi-type access control (beta, version, feature, premium)",
        "Feature-based access management",
        "Flexible access levels and expiration",
        "Professional 8-block code input",
        "Cinematic processing animations"
      ],
      status: "current"
    },
    {
      version: "v1.5.0",
      date: "2024-12-18",
      title: "Freemium Model & Membership",
      description: "Implemented a complete freemium pricing model with membership tiers and project creation limits.",
      features: [
        "Free tier with 1 project creation",
        "Full Member tier at €9/month",
        "Project creation limits and upgrade prompts",
        "Membership status dashboard",
        "Community-focused messaging"
      ],
      status: "released"
    },
    {
      version: "v1.0.0",
      date: "2024-12-17",
      title: "Initial Beta Release",
      description: "First public beta release with core collaboration features for indie hackers.",
      features: [
        "Project creation and browsing",
        "Co-founder matching system",
        "Trial period mechanics",
        "Basic user profiles",
        "Responsive design"
      ],
      status: "released"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/access" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">Colabship</span>
            <span className="text-xs text-muted-foreground">.io</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/access">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Access
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-12 bg-card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-elements absolute top-20 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg"></div>
          <div className="floating-elements absolute bottom-32 right-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About <HackerText text="Colabship.io" className="gradient-text" delay={300} />
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Where indie hackers find their perfect co-founders and ship real products together.
              </p>
              <p className="text-accent font-mono text-sm">
                <HackerText text="COLAB. SHIP. REPEAT." delay={1000} />
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every day, thousands of developers, designers, and marketers are building side projects solo — 
                    not because they want to, but because forming a trustworthy team is hard. Colabship lowers the 
                    barrier to team formation with a structure that feels natural, fast, and low-risk.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    On Colabship, you can create a project, define open roles (like "looking for a backend dev for 10% equity"), 
                    and invite others or let them apply. New collaborators enter a trial phase — a 1–4 week async collaboration 
                    window where the team works together, without any formal commitment.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    This phase helps reduce friction, filter for commitment, and build trust before formalizing the team 
                    with a lightweight agreement. Once the trial ends, collaborators can mutually agree to share equity, 
                    revenue, or ownership — or simply part ways.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Version History
              </h2>
              <div className="space-y-6">
                {versionHistory.map((version, index) => (
                  <Card key={version.version} className="bg-background border-accent/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={version.status === 'current' ? 'default' : 'outline'}
                            className={version.status === 'current' ? 'bg-accent text-accent-foreground' : ''}
                          >
                            {version.version}
                          </Badge>
                          <div>
                            <CardTitle className="text-xl">{version.title}</CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{version.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Zap className="w-4 h-4" />
                                <span>{version.features.length} features</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {version.status === 'current' && (
                          <Badge className="bg-green-500 text-white">
                            Current
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {version.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {version.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="max-w-2xl mx-auto text-center">
              <Card className="bg-background border-accent/20">
                <CardHeader>
                  <CardTitle className="text-xl">Ready to Join?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Get early access to Colabship and start building with the right crew.
                  </p>
                  <Button asChild className="glow-green">
                    <Link to="/access">
                      <Zap className="w-4 h-4 mr-2" />
                      Get Beta Access
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground mb-2">
            Built for builders who want to ship, not just network
          </p>
          <p className="text-accent font-mono text-sm">
            COLAB. SHIP. REPEAT.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © 2024 Colabship. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage; 