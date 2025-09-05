import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// Note: react-helmet-async needs to be installed: npm install react-helmet-async
// For now, using a simple title update
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Rocket, Target, Shield, LogIn, Star, Sparkles, CheckCircle, Zap, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";
import AuthModal from "@/components/auth/AuthModal";
import { useToast } from "@/components/ui/use-toast";

// --- helpers: reduced motion + safeWindow ---
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
};

const safeWindow = () => (typeof window !== "undefined" ? window : undefined);

// --- AnimatedCounter (respects reduced motion) ---
const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string; className?: string }> = ({ 
  end, 
  duration = 2000, 
  suffix = "",
  className = ""
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [count, setCount] = useState(prefersReduced ? end : 0);

  useEffect(() => {
    if (prefersReduced) return setCount(end);
    let startTime = 0;
    let raf = 0;
    const step = (t: number) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      setCount(Math.floor(end * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, prefersReduced]);

  return <span className={className}>{count}{suffix}</span>;
};

// --- Parallax w/ rAF + reduced motion fallback ---
const useParallax = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const win = safeWindow();
    if (!win || prefersReduced) return;
    const handler = (e: MouseEvent) => {
      last.current = { x: e.clientX, y: e.clientY };
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          setCoords(last.current);
          frame.current = 0;
        });
      }
    };
    win.addEventListener("mousemove", handler);
    return () => {
      win.removeEventListener("mousemove", handler);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [prefersReduced]);

  return prefersReduced ? { x: 0, y: 0 } : coords;
};

// --- Gradient Background Component ---
const GradientBackground = () => {
  const mouse = useParallax();
  const win = safeWindow();
  const reduced = usePrefersReducedMotion();
  
  const parallax = (multX: number, multY: number) => {
    const w = win?.innerWidth ?? 1;
    const h = win?.innerHeight ?? 1;
    return `translate(${((mouse.x - w / 2) * multX).toFixed(2)}px, ${((mouse.y - h / 2) * multY).toFixed(2)}px)`;
  };

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Floating geometric shapes (hide on small screens) */}
      <div className="hidden md:block">
        <div
          className="absolute top-20 left-10 w-16 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-lg border border-green-200/30 backdrop-blur-sm shadow-lg"
          style={{ transform: parallax(0.02, 0.02) }}
        >
          <div className="p-2">
            <div className="w-2 h-2 bg-green-400 rounded-full mb-1 animate-pulse" />
            <div className="w-3 h-1 bg-green-400/60 rounded-full" />
          </div>
        </div>
        
        <div
          className="absolute top-32 right-20 w-20 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-lg border border-blue-200/30 backdrop-blur-sm shadow-lg"
          style={{ transform: parallax(-0.015, 0.015) }}
        >
          <div className="p-2">
            <div className="flex space-x-1 mb-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
            </div>
            <div className="w-4 h-1 bg-blue-400/60 rounded-full" />
          </div>
        </div>
        
        <div
          className="absolute bottom-32 left-1/4 w-14 h-18 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-lg border border-purple-200/30 backdrop-blur-sm shadow-lg"
          style={{ transform: parallax(0.01, -0.01) }}
        >
          <div className="p-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full mb-1 animate-pulse" style={{animationDelay: '1.5s'}} />
            <div className="w-3 h-1 bg-purple-400/60 rounded-full" />
          </div>
        </div>
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
        <path 
          d="M 200 300 Q 400 200 600 300 T 800 300" 
          stroke="url(#connectionGradient)" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="5,10" 
          opacity="0.6"
        >
          {!reduced && (
            <animate attributeName="stroke-dashoffset" values="0;15;0" dur="3s" repeatCount="indefinite" />
          )}
        </path>
        <path 
          d="M 150 400 Q 350 350 550 400 T 750 400" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1.5" 
          fill="none" 
          strokeDasharray="3,8" 
          opacity="0.4"
        >
          {!reduced && (
            <animate attributeName="stroke-dashoffset" values="0;11;0" dur="4s" repeatCount="indefinite" />
          )}
        </path>
      </svg>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDecor, setShowDecor] = useState(false);
  const { toast } = useToast();

  // Mount background after idle to improve LCP
  useEffect(() => {
    const cb = () => setShowDecor(true);
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).requestIdleCallback(cb);
    } else {
      setTimeout(cb, 250);
    }
  }, []);

  // Update document title for SEO
  useEffect(() => {
    document.title = "Colabship — From Contribution to Core Team";
  }, []);

  // memoize static content (avoids re-creation on every render)
  const features = useMemo(() => ([
    { 
      icon: Users, 
      title: "Open Collaboration", 
      description: "Start OSS-style. Contribute and build a proof‑of‑work reputation.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200/30"
    },
    { 
      icon: Target, 
      title: "Core Team Invitations", 
      description: "Projects graduate to core teams and invite top contributors.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-200/30"
    },
    { 
      icon: Rocket, 
      title: "Value & Incentives", 
      description: "Equity, revenue share, or bounties—projects choose their model.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-200/30"
    },
    { 
      icon: Shield, 
      title: "Proof‑of‑Work Reputation", 
      description: "Impact measured by merged PRs, issues, reviews, velocity.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-200/30"
    },
  ]), []);

  const testimonials = useMemo(() => ([
    { 
      name: "Alice Chen", 
      role: "Core Contributor", 
      content: "Went from first PR to core team invite with revenue share.", 
      avatar: "AC",
      badge: "Revenue Share",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    },
    { 
      name: "Bob Rodriguez", 
      role: "Project Owner", 
      content: "Invited top contributors seamlessly based on real impact.", 
      avatar: "BR",
      badge: "Team Lead",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    },
    { 
      name: "Carol Kim", 
      role: "Team Lead", 
      content: "Graduated from open collab to a committed core team.", 
      avatar: "CK",
      badge: "Core Team",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    },
  ]), []);

  const handlePrimaryCTA = () => {
    if (user) return navigate("/dashboard");
    setShowAuthModal(true);
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section
          className="pt-24 md:pt-32 pb-16 relative overflow-hidden min-h-[85vh] flex items-center"
          aria-labelledby="heroTitle"
        >
          {showDecor && <GradientBackground />}

          <div className="container mx-auto px-6 relative z-10 text-center max-w-6xl">
            <ScrollReveal>
              <h1 id="heroTitle" className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                <span className="block">
                  <HackerText text="From Contribution" className="gradient-text" delay={300} />
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
                  <HackerText text="To Core Team" delay={800} />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-slate-200 dark:text-slate-300 max-w-4xl mx-auto mb-2">
                Match with projects. Prove your impact. Get invited. Earn upside.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 mb-6">
                <Button
                  size="lg"
                  className="glow-green w-full sm:w-auto text-lg px-8 py-6 h-auto group relative overflow-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={handlePrimaryCTA}
                  aria-label={user ? "Go to Dashboard" : "Start Building Together"}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center">
                    <Sparkles className="w-5 h-5 mr-3" />
                    <span className="font-semibold">{user ? "Go to Dashboard" : "Start Building Together"}</span>
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </div>
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-2 hover:border-accent hover:bg-accent/5 transition-all duration-300 focus:ring-2 focus:ring-accent focus:ring-offset-2" 
                  asChild
                >
                  <Link to="/projects">
                    <Users className="w-5 h-5 mr-3" />
                    Browse Projects
                  </Link>
                </Button>
              </div>

            </ScrollReveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4 text-sm">
                  <Zap className="w-3 h-3 mr-1" />
                  How It Works
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The Journey to Core Team</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A simple path from open collaboration to a committed, incentivized core team.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal key={feature.title} delay={i * 100}>
                    <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 group border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Two-lane value props with enhanced design */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Both Sides</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether you're contributing or building, Colabship has you covered.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ScrollReveal delay={200}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-semibold">For Contributors</h3>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Match with projects that fit your skills and time.
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Build measurable reputation (merged PRs, issues, reviews).
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Get invited to core teams with equity/revenue/bounties.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal delay={400}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                        <Rocket className="w-6 h-6 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold">For Project Owners</h3>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Bootstrap open collaboration to surface top contributors.
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Graduate to a core team with defined roles.
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Choose your incentive model (share, equity, bounties).
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Testimonials with enhanced design */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-card/20 to-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4 text-sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Success Stories
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Journey Stories</h2>
                <p className="text-lg text-muted-foreground">From OSS collaboration to valuable teams.</p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, index) => (
                <ScrollReveal key={t.name} delay={index * 100}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-card/50 backdrop-blur-sm group">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-sm font-semibold text-foreground">{t.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{t.name}</div>
                          <div className="text-sm text-muted-foreground">{t.role}</div>
                        </div>
                        <Badge className={`text-xs ${t.badgeColor}`}>
                          {t.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.content}"</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-green-950/20 dark:via-background dark:to-blue-950/20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <ScrollReveal>
              <Badge variant="secondary" className="mb-4 text-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Ready to Start?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8">Join contributors evolving from open collaboration to core teams with upside.</p>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="glow-green group relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 focus:ring-2 focus:ring-green-500 focus:ring-offset-2" 
                  onClick={handlePrimaryCTA}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    {user ? "Go to Dashboard" : "Sign Up Free"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 hover:border-accent hover:bg-accent/5 transition-all duration-300 transform hover:scale-105 group focus:ring-2 focus:ring-accent focus:ring-offset-2" 
                  asChild
                >
                  <Link to="/matching-demo">
                    <Star className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Learn More
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab="signin" />

    </div>
  );
};

export default HomePage;
