import { Card, CardContent } from "@/components/ui/card";
import shipIcon from "@/assets/ship-icon.png";
import ScrollReveal from "./ScrollReveal";

const ForBuilders = () => {
  const features = [
    {
      title: "Rich Profiles",
      description: "Showcase your skills, past projects, and what you're looking to build next"
    },
    {
      title: "Equity-Based Offers", 
      description: "Fair compensation through equity sharing and profit splits"
    },
    {
      title: "Async-First",
      description: "Work on your own schedule with builders across different time zones"
    },
    {
      title: "Project-Centric",
      description: "Focus on what you're building, not endless networking"
    },
    {
      title: "Trial Periods",
      description: "Test compatibility before committing to long-term partnerships"
    },
    {
      title: "Maker Community",
      description: "Connect with like-minded indie builders and entrepreneurs"
    }
  ];

  return (
    <section id="for-builders" className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-elements absolute top-20 right-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg"></div>
        <div className="floating-elements absolute bottom-32 left-1/5 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={shipIcon} alt="Ship Icon" className="w-12 h-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              For Indie <span className="gradient-text">Builders</span> & <span className="gradient-text">Makers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to find the right co-founder and ship your next big idea
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:glow-green magnetic-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-accent text-shimmer">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForBuilders;