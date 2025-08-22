import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const MembershipBanner = () => {
  const freeFeatures = [
    "Create 1 project",
    "Join unlimited projects",
    "Basic profile",
    "Browse all projects",
    "Apply to join projects",
    "7-day trial periods"
  ];

  const memberFeatures = [
    "Create unlimited projects",
    "Priority project visibility",
    "Extended 14-day trials",
    "Advanced project templates",
    "Team management tools",
    "Priority support"
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-elements absolute top-16 left-1/4 w-20 h-20 bg-accent/5 rounded-full blur-lg"></div>
        <div className="floating-elements absolute bottom-24 right-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start <span className="gradient-text">Free</span>, Build <span className="gradient-text">Together</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your first project for free. Join membership to unlock unlimited projects and better collaboration tools.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={100}>
            <Card className="bg-card border-border transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free Forever</h3>
                  <div className="text-4xl font-bold text-accent mb-2">$0</div>
                  <p className="text-muted-foreground">Perfect to get started</p>
                </div>

                <ul className="space-y-3 mb-8 text-left">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full hover:glow-cyan">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="bg-card border-accent/50 transition-all duration-300 hover:scale-105 hover:glow-green relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground px-4 py-1 flex items-center gap-1">
                  <Sparkles size={12} />
                  Most Popular
                </Badge>
              </div>
              
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Full Member</h3>
                  <div className="text-4xl font-bold gradient-text mb-2">€9</div>
                  <p className="text-muted-foreground">per month</p>
                </div>

                <ul className="space-y-3 mb-8 text-left">
                  {memberFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Zap size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full glow-green magnetic-hover">
                  Become Full Member
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground font-mono">
              {'>'} 30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MembershipBanner;