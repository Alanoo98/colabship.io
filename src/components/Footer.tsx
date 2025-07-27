import confetti from 'canvas-confetti';

const Footer = () => {
  const triggerConfetti = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y }
    });
  };

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div 
              className="flex items-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={triggerConfetti}
            >
              <span className="text-xl font-bold gradient-text">Colabship</span>
              <span className="text-xs text-muted-foreground">.io</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Where builders meet to ship together
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Colabship. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">For Builders</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-mono">
            {'>'} Collab. Ship. Repeat.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;