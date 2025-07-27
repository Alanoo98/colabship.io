import collabIcon from "@/assets/collab-icon.png";

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
    <section id="how-it-works" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to find your crew and start shipping
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 hover:glow-green transition-all duration-300 hover:scale-110">
                  <span className="text-2xl font-bold text-accent">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent to-secondary transform -translate-x-1/2"></div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <img src={collabIcon} alt="Collaboration" className="w-16 h-16 opacity-50 animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;