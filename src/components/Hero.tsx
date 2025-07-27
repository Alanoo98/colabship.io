import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-image.jpg";
import ProjectCreationModal from "./ProjectCreationModal";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-background/90" />
      <img 
        src={heroImage} 
        alt="Collaboration" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="gradient-text">Collab</span> and{" "}
            <span className="gradient-text">ship</span> with the{" "}
            <span className="text-foreground">right crew</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Where builders meet to ship together
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <ProjectCreationModal />
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 hover:glow-cyan transition-all duration-300">
              Join the Waitlist
            </Button>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email for early access"
                className="bg-card border-border"
              />
              <Button className="glow-cyan">
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;