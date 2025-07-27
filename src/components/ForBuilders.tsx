import { Card, CardContent } from "@/components/ui/card";
import shipIcon from "@/assets/ship-icon.png";

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
    <section id="for-builders" className="py-20 bg-background">
      <div className="container mx-auto px-6">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:glow-green">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-accent">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForBuilders;