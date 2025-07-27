import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-stack Developer",
      project: "FinTech SaaS",
      quote: "Found my perfect co-founder in 2 weeks. We shipped our MVP in 3 months and raised our pre-seed!",
      avatar: "SC"
    },
    {
      name: "Marcus Johnson", 
      role: "Product Designer",
      project: "EdTech Platform",
      quote: "The trial period feature saved me from a bad partnership. When I found the right team, it was magic.",
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "AI Engineer", 
      project: "Healthcare AI",
      quote: "As a solo founder, I was stuck. Colabship helped me find a business co-founder who completed my skill set.",
      avatar: "ER"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real builders, real launches, real success
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
            {'>'} Join 500+ builders who found their crew
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;