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
    <section id="why-colabship" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="gradient-text">Colabship?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for builders who want to ship, not just network
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-accent">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-muted rounded-lg border border-accent/20">
            <p className="text-lg italic text-foreground">
              "A safe place to build"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              — The Colabship Promise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyColabship;