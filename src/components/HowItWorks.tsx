import collabIcon from "@/assets/collab-icon.png";
import ScrollReveal from "./ScrollReveal";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create or join a project",
      description: "Start your idea or find projects that match your skills and interests"
    },
    {
      number: "02", 
      title: "Define roles and expectations",
      description: "Set clear responsibilities, equity splits, and project timelines"
    },
    {
      number: "03",
      title: "Trial → Review → Finalize", 
      description: "Work together for a trial period, then decide to continue or part ways"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-card relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-elements absolute top-10 left-1/4 w-20 h-20 bg-accent/5 rounded-full blur-md"></div>
        <div className="floating-elements absolute bottom-20 right-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to find your crew and start shipping
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 hover:glow-green transition-all duration-300 magnetic-hover">
                    <span className="text-2xl font-bold text-accent">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent to-secondary transform -translate-x-1/2 opacity-50"></div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-shimmer">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="flex justify-center mt-12">
            <img src={collabIcon} alt="Collaboration" className="w-16 h-16 opacity-50 magnetic-hover" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorks;