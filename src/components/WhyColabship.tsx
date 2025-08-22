import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import HackerText from "./HackerText";

const WhyColabship = () => {
  const benefits = [
    {
      title: "Low commitment, high trust",
      description: "Start small with trial periods, build trust naturally",
      icon: "🤝"
    },
    {
      title: "Project-first, people-centric", 
      description: "Focus on what you're building while finding the right people",
      icon: "🎯"
    },
    {
      title: "Launch more — together",
      description: "Ship faster with the right skills and shared motivation",
      icon: "🚀"
    }
  ];

  return (
    <section id="why-colabship" className="py-20 bg-card relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-elements absolute top-16 left-1/3 w-20 h-20 bg-accent/5 rounded-full blur-lg"></div>
        <div className="floating-elements absolute bottom-24 right-1/4 w-14 h-14 bg-secondary/5 rounded-full blur-md"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <HackerText text="Colabship?" className="gradient-text" delay={300} />?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for builders who want to ship, not just network
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="text-center magnetic-hover">
                <div className="text-4xl mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-accent text-shimmer">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Success metrics */}
        <ScrollReveal delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-center">
            <div>
              <AnimatedCounter end={92} suffix="%" className="text-2xl font-bold text-accent" />
              <p className="text-sm text-muted-foreground">Team Match Rate</p>
            </div>
            <div>
              <AnimatedCounter end={34} suffix=" days" className="text-2xl font-bold text-accent" />
              <p className="text-sm text-muted-foreground">Avg. Time to Launch</p>
            </div>
            <div>
              <AnimatedCounter end={76} suffix="%" className="text-2xl font-bold text-accent" />
              <p className="text-sm text-muted-foreground">Success After Trial</p>
            </div>
            <div>
              <AnimatedCounter end={15} suffix="k" className="text-2xl font-bold text-accent" />
              <p className="text-sm text-muted-foreground">MRR Generated</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <div className="text-center">
            <div className="inline-block p-6 bg-muted rounded-lg border border-accent/20 hover:glow-green transition-all duration-300 magnetic-hover">
              <p className="text-lg font-mono text-accent text-shimmer">
                <HackerText 
                  text="COLAB. SHIP. REPEAT." 
                  delay={1000}
                  speed={60}
                />
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — The Colabship Way
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyColabship;