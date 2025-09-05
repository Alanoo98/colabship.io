import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alice Chen",
      role: "Core Contributor",
      project: "Open Source → Core Team",
      quote: "Started with small PRs, built reputation through real contributions, and now I'm part of the core team with equity in the project.",
      avatar: "AC"
    },
    {
      name: "Bob Rodriguez", 
      role: "Project Owner",
      project: "Team Formation",
      quote: "Colabship's reputation system helped me identify the most valuable contributors and invite them into our core team seamlessly.",
      avatar: "BR"
    },
    {
      name: "Carol Kim",
      role: "Team Lead",
      project: "Graduation Path",
      quote: "The graduation path from open collaboration to structured teams made it easy to evolve our project while keeping our best contributors.",
      avatar: "CK"
    },
    {
      name: "David Park",
      role: "Developer",
      project: "Proof-of-Work",
      quote: "Proof-of-work reputation is game-changing. My contributions are measurable impact, not just social signals.",
      avatar: "DP"
    },
    {
      name: "Eva Martinez",
      role: "Designer",
      project: "Value Creation",
      quote: "From hobby contributions to core team member with revenue sharing. Colabship made the transition natural and rewarding.",
      avatar: "EM"
    },
    {
      name: "Frank Johnson",
      role: "Project Founder",
      project: "Three-Phase Journey",
      quote: "The three-phase approach is brilliant. We started open, built trust through contributions, and now have a committed team with clear incentives.",
      avatar: "FJ"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Journey <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From open source contributions to valuable team formation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-accent/50 transition-all duration-500 hover:glow-cyan animate-fade-in hover:scale-105"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="text-xs text-accent font-mono">
                  Project: {testimonial.project}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground font-mono">
            {'>'} Join contributors on their journey from OSS to ownership
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;