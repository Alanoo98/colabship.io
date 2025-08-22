import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Emil Vergara",
      role: "Product Founder",
      project: "Mobile App MVP",
      quote: "Colabship's trial period feature was perfect for my early-stage project. It let us test the partnership before committing to anything formal.",
      avatar: "EV"
    },
    {
      name: "Mahir Patrawala", 
      role: "Technical Founder",
      project: "Multiple Projects",
      quote: "The platform's structured collaboration tools helped us move from conversation to launch in record time. The project templates are game-changing.",
      avatar: "MP"
    },
    {
      name: "Marcus Lemser",
      role: "Product Founder",
      project: "Marketing Partnership",
      quote: "Colabship's skill matching algorithm found me the perfect marketing partner. The equity split calculator made our partnership discussions so much easier.",
      avatar: "ML"
    },
    {
      name: "Alex Chen",
      role: "Developer",
      project: "Rapid MVP",
      quote: "Found my co-founder in 3 days through Colabship's smart matching. The platform's communication tools helped us ship our MVP in 2 weeks.",
      avatar: "AC"
    },
    {
      name: "Sarah Kim",
      role: "Designer",
      project: "Skill Matching",
      quote: "The matching algorithm is incredible. Colabship understood exactly what skills I needed to complement mine. The trial period gave us confidence to commit.",
      avatar: "SK"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketer",
      project: "Revenue Growth",
      quote: "Colabship's project management features kept us on track. From idea to $10K MRR in 3 months thanks to the platform's structured approach.",
      avatar: "MR"
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