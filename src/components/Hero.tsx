import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-image.jpg";
import ProjectCreationModal from "./ProjectCreationModal";
import ParallaxBackground from "./ParallaxBackground";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";
import HackerText from "./HackerText";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-background/90" />
      
      <ParallaxBackground speed={0.3}>
        <img 
          src={heroImage} 
          alt="Collaboration" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </ParallaxBackground>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-elements absolute top-20 left-10 w-16 h-16 bg-accent/10 rounded-full blur-sm"></div>
        <div className="floating-elements absolute bottom-32 right-16 w-12 h-12 bg-secondary/10 rounded-full blur-sm"></div>
        <div className="floating-elements absolute top-1/3 right-1/4 w-8 h-8 bg-accent/20 rounded-full blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <HackerText 
                text="Collab and ship with the right crew" 
                className="gradient-text"
                delay={500}
              />
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Where <span className="text-shimmer">indie hackers</span> find their perfect co-founders
            </p>
            <p className="text-lg text-accent font-mono mb-8">
              <HackerText 
                text="COLAB. SHIP. REPEAT." 
                delay={1500}
                speed={80}
              />
            </p>
          </ScrollReveal>


          
          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <ProjectCreationModal />
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 magnetic-hover hover:glow-cyan transition-all duration-300">
                Join the Waitlist
              </Button>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={500}>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email for early access"
                  className="bg-card border-border focus:animate-pulse-glow"
                />
                <Button className="glow-cyan magnetic-hover">
                  Notify Me
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;