import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBetaAccess } from "@/contexts/BetaAccessContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Users, 
  Rocket, 
  Target,
  CheckCircle,
  Star,
  Zap,
  Shield,
  LogIn,
  User,
  MessageSquare,
  Handshake,
  Lock,
  TrendingUp,
  Clock,
  Sparkles
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";
import StarryBackground from "@/components/ui/StarryBackground";
import AuthModal from "@/components/auth/AuthModal";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

// Live Activity Indicator
const LiveActivityIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
      <span>{isOnline ? 'Live' : 'Online'}</span>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasBetaAccess } = useBetaAccess();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBetaAccessModal, setShowBetaAccessModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Find Co-founders",
      description: "Connect with like-minded builders who share your vision and complement your skills."
    },
    {
      icon: Rocket,
      title: "Ship Faster",
      description: "Build and launch products together with structured collaboration and clear ownership."
    },
    {
      icon: Target,
      title: "Trial Period",
      description: "Test the waters with a 1-4 week trial before committing to formal partnerships."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Built-in reputation system and lightweight agreements to protect all parties."
    }
  ];



  const testimonials = [
    {
      name: "Emil Vergara",
      role: "Product Founder",
      content: "Colabship's trial period feature was perfect for my early-stage project. It let us test the partnership before committing to anything formal.",
      avatar: "EV"
    },
    {
      name: "Mahir Patrawala",
      role: "Technical Founder",
      content: "The platform's structured collaboration tools helped us move from conversation to launch in record time. The project templates are game-changing.",
      avatar: "MP"
    },
    {
      name: "Marcus Lemser",
      role: "Product Founder",
      content: "Colabship's skill matching algorithm found me the perfect marketing partner. The equity split calculator made our partnership discussions so much easier.",
      avatar: "ML"
    },
    {
      name: "Alex Chen",
      role: "Developer",
      content: "Found my co-founder in 3 days through Colabship's smart matching. The platform's communication tools helped us ship our MVP in 2 weeks.",
      avatar: "AC"
    },
    {
      name: "Sarah Kim",
      role: "Designer",
      content: "The matching algorithm is incredible. Colabship understood exactly what skills I needed to complement mine. The trial period gave us confidence to commit.",
      avatar: "SK"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketer",
      content: "Colabship's project management features kept us on track. From idea to $10K MRR in 3 months thanks to the platform's structured approach.",
      avatar: "MR"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] flex items-center">
          {/* Enhanced dynamic background with interactive elements */}
          <div className="absolute inset-0">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-gradient"></div>
            
            {/* Interactive floating elements with parallax */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Floating cards with mouse parallax effect */}
              <div 
                className="absolute top-20 left-10 w-16 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-lg border border-green-200/30 backdrop-blur-sm animate-float hover:scale-110 transition-transform duration-300 cursor-pointer" 
                style={{
                  animationDelay: '0s', 
                  animationDuration: '6s',
                  transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
                }}
              >
                <div className="p-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mb-1 animate-pulse"></div>
                  <div className="w-3 h-1 bg-green-400/60 rounded-full"></div>
                </div>
              </div>
              
              <div 
                className="absolute top-32 right-20 w-20 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-lg border border-blue-200/30 backdrop-blur-sm animate-float hover:scale-110 transition-transform duration-300 cursor-pointer" 
                style={{
                  animationDelay: '2s', 
                  animationDuration: '8s',
                  transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.015}px, ${(mousePosition.y - window.innerHeight / 2) * 0.015}px)`
                }}
              >
                <div className="p-2">
                  <div className="flex space-x-1 mb-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  <div className="w-4 h-1 bg-blue-400/60 rounded-full"></div>
                </div>
              </div>
              
              <div 
                className="absolute bottom-32 left-1/4 w-14 h-18 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-lg border border-purple-200/30 backdrop-blur-sm animate-float hover:scale-110 transition-transform duration-300 cursor-pointer" 
                style={{
                  animationDelay: '4s', 
                  animationDuration: '7s',
                  transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * -0.01}px)`
                }}
              >
                <div className="p-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mb-1 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  <div className="w-3 h-1 bg-purple-400/60 rounded-full"></div>
                </div>
              </div>
              
              {/* Success indicators */}
              <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-green-500/20 rounded-full border border-green-300/50 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-500/20 rounded-full border border-blue-300/50 animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 600">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(150 100% 50% / 0.3)" />
                  <stop offset="50%" stopColor="hsl(25 15% 45% / 0.5)" />
                  <stop offset="100%" stopColor="hsl(150 100% 50% / 0.3)" />
                </linearGradient>
              </defs>
              <path d="M 200 300 Q 400 200 600 300 T 800 300" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" strokeDasharray="5,10" opacity="0.6">
                <animate attributeName="stroke-dashoffset" values="0;15;0" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M 150 400 Q 350 350 550 400 T 750 400" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" strokeDasharray="3,8" opacity="0.4">
                <animate attributeName="stroke-dashoffset" values="0;11;0" dur="4s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-6xl mx-auto">
              {/* Main headline with impact */}
              <ScrollReveal>
                <div className="mb-6">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
                    <span className="block">
                      <HackerText 
                        text="Find Your" 
                        className="gradient-text"
                        delay={300}
                      />
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
                      <HackerText 
                        text="Co-founder" 
                        delay={800}
                      />
                    </span>
                  </h1>
                </div>
              </ScrollReveal>
              
              {/* Compelling subtitle */}
              <ScrollReveal delay={200}>
                <div className="mb-8">
                  <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 leading-relaxed max-w-4xl mx-auto font-medium">
                    Join <span className="text-shimmer font-semibold">2,000+ builders</span> who found their perfect co-founders and shipped products together
                  </p>
                  <p className="text-lg text-accent font-mono tracking-wider">
                    <HackerText 
                      text="COLAB. SHIP. REPEAT." 
                      delay={1500}
                    />
                  </p>
                </div>
              </ScrollReveal>

              {/* Enhanced social proof stats with live indicators */}
              <ScrollReveal delay={300}>
                <div className="mb-8">

                </div>
              </ScrollReveal>

              {/* Enhanced CTA section with interactive effects */}
              <ScrollReveal delay={400}>
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                    <Button 
                      size="lg" 
                      className="glow-green w-full sm:w-auto text-lg px-8 py-6 h-auto group relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25"
                      onClick={() => {
                        if (!hasBetaAccess) {
                          setShowBetaAccessModal(true);
                        } else if (user) {
                          navigate('/dashboard');
                        } else {
                          setShowAuthModal(true);
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                      <div className="relative flex items-center">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-semibold">
                          {user ? 'Go to Dashboard' : 'Start Building Together'}
                        </span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2 hover:border-accent hover:bg-accent/5 transition-all duration-300 transform hover:scale-105 group"
                      onClick={() => navigate('/matching-demo')}
                    >
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-semibold">See How It Works</span>
                    </Button>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Free to join</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span>No commitment required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                      <span>Start in 2 minutes</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              {/* Enhanced success stories with live notifications */}
              <ScrollReveal delay={500}>
                <div className="max-w-4xl mx-auto">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 relative overflow-hidden">
                    {/* Live notification badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-500 font-medium">LIVE</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      Recent Success Stories
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-left group hover:bg-accent/5 p-3 rounded-lg transition-colors duration-300">
                        <p className="text-sm text-foreground mb-2 group-hover:text-accent transition-colors">"Found my co-founder in 3 days. We shipped our MVP in 2 weeks."</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xs text-white font-bold">A</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Alex Chen, Developer</span>
                        </div>
                      </div>
                      <div className="text-left group hover:bg-accent/5 p-3 rounded-lg transition-colors duration-300">
                        <p className="text-sm text-foreground mb-2 group-hover:text-accent transition-colors">"The matching algorithm is incredible. Perfect skill complement."</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xs text-white font-bold">S</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Sarah Kim, Designer</span>
                        </div>
                      </div>
                      <div className="text-left group hover:bg-accent/5 p-3 rounded-lg transition-colors duration-300">
                        <p className="text-sm text-foreground mb-2 group-hover:text-accent transition-colors">"From idea to $10K MRR in 3 months with my co-founder."</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xs text-white font-bold">M</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Marcus Rodriguez, Marketer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>



        {/* Features Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  How It Works
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
                  A simple, structured approach to finding co-founders and shipping products together.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal key={index} delay={200 * (index + 1)}>
                    <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Success Stories
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground px-4 sm:px-0">
                  Hear from builders who found their co-founders on Colabship.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} delay={300 * (index + 1)}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-secondary">
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Ready to Find Your Co-founder?
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4 sm:px-0">
                  Join thousands of builders who are shipping products together on Colabship.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  <Button 
                    size="lg" 
                    className="glow-green w-full sm:w-auto"
                    onClick={() => {
                      if (user) {
                        // If logged in, navigate to dashboard
                        navigate('/dashboard');
                      } else {
                        // If not logged in, show auth modal
                        setShowAuthModal(true);
                      }
                    }}
                  >
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {user ? 'Go to Dashboard' : 'Sign Up Free'}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={() => navigate('/matching-demo')}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      {/* Floating Live Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg animate-float" style={{animationDelay: '0s', animationDuration: '4s'}}>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 font-medium">New Match!</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Sarah & Alex just connected</p>
        </div>
        
        <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg animate-float" style={{animationDelay: '2s', animationDuration: '5s'}}>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-500 font-medium">Project Launched!</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">"TaskFlow" just went live</p>
        </div>
      </div>
      
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultTab="signin"
      />
      
      {/* Beta Access Modal */}
      {showBetaAccessModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Beta Access Required</h2>
                <p className="text-muted-foreground">
                  Colabship is currently in private beta. Enter your invite code to get early access.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Valid beta codes:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <code className="bg-muted px-2 py-1 rounded">BETA2025</code>
                    <code className="bg-muted px-2 py-1 rounded">84739201</code>
                    <code className="bg-muted px-2 py-1 rounded">15673948</code>
                    <code className="bg-muted px-2 py-1 rounded">29384756</code>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowBetaAccessModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowBetaAccessModal(false);
                      navigate('/beta');
                    }}
                    className="flex-1 glow-green"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Enter Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
