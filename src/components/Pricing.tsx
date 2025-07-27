import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      description: "Perfect for testing the waters",
      features: [
        "Create 1 project",
        "Join unlimited projects", 
        "Basic profile",
        "Community access",
        "7-day trial periods"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Builder",
      price: "$29",
      period: "/month",
      description: "For serious indie builders",
      features: [
        "Create unlimited projects",
        "Advanced profile & portfolio",
        "Priority project visibility",
        "Extended 14-day trials",
        "Direct messaging",
        "Project analytics"
      ],
      cta: "Go Pro",
      popular: true
    },
    {
      name: "Startup",
      price: "$99",
      period: "/month",
      description: "For growing teams and agencies",
      features: [
        "Everything in Builder",
        "Team workspaces",
        "Custom equity templates",
        "Legal document templates",
        "Priority support",
        "Custom integrations"
      ],
      cta: "Scale Up",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, scale when you're ready to ship
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative bg-background border-border hover:border-accent/50 transition-all duration-300 animate-fade-in ${
                plan.popular ? 'ring-2 ring-accent glow-green scale-105' : 'hover:scale-105'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'glow-green animate-glow-pulse' 
                      : 'hover:glow-cyan'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include our core collaboration tools and 24/7 community support
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;