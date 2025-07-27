import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToTop}
        >
          <span className="text-xl font-bold gradient-text">Colabship</span>
          <span className="text-xs text-muted-foreground">.io</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors">
            How It Works
          </a>
          <a href="#projects" className="text-muted-foreground hover:text-accent transition-colors">
            Projects
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-accent transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-accent transition-colors">
            Success Stories
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="glow-green">
            Join Beta
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;