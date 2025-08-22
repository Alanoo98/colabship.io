import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Heart, 
  Zap, 
  MessageSquare, 
  ArrowRight,
  Globe,
  Code,
  Palette,
  BarChart3,
  Lightbulb,
  Star,
  Award,
  Trophy,
  CheckCircle,
  Calendar,
  MapPin,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const BetaTestersPage = () => {
  const betaTesters = [
    {
      name: "Beta Tester #1",
      role: "Frontend Developer & UX Advocate",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Passionate about building user-friendly interfaces and creating seamless user experiences. Believes in the power of great design.",
      skills: ["React", "TypeScript", "UI/UX Design", "User Research"],
      location: "Europe",
      status: "Beta Tester",
      contributions: [
        "UI/UX feedback and improvements",
        "Frontend development insights",
        "User experience optimization",
        "Accessibility recommendations"
      ],
      impact: "User experience champion - ensuring the platform is intuitive and delightful to use.",
      social: {
        github: "https://github.com/betatester1",
        linkedin: "https://linkedin.com/in/betatester1"
      }
    },
    {
      name: "Beta Tester #2",
      role: "Backend Architect & Security Expert",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Focused on scalable architecture and robust backend systems. Loves solving complex technical challenges and ensuring security.",
      skills: ["Node.js", "Python", "Database Design", "Security"],
      location: "North America",
      status: "Beta Tester",
      contributions: [
        "Technical architecture feedback",
        "Security best practices",
        "Performance optimization",
        "Scalability recommendations"
      ],
      impact: "Technical foundation - ensuring the platform is robust, secure, and scalable.",
      social: {
        github: "https://github.com/betatester2"
      }
    },
    {
      name: "Beta Tester #3",
      role: "Product Designer & Community Builder",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Creates beautiful, functional designs that solve real user problems. Believes in human-centered design and community-driven development.",
      skills: ["Figma", "User Research", "Prototyping", "Community Management"],
      location: "Asia",
      status: "Beta Tester",
      contributions: [
        "Design system development",
        "User research insights",
        "Community engagement strategies",
        "Brand identity refinement"
      ],
      impact: "Design and community leader - shaping the visual identity and community culture.",
      social: {
        linkedin: "https://linkedin.com/in/betatester3",
        twitter: "https://twitter.com/betatester3"
      }
    },
    {
      name: "Beta Tester #4",
      role: "Growth Marketer & Data Analyst",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Helps products find their audience and scale sustainably. Data-driven approach to growth and user acquisition.",
      skills: ["Digital Marketing", "Analytics", "Content Strategy", "Growth Hacking"],
      location: "Australia",
      status: "Beta Tester",
      contributions: [
        "Growth strategy development",
        "User acquisition insights",
        "Content marketing strategy",
        "Analytics and measurement"
      ],
      impact: "Growth catalyst - ensuring Colabship.io reaches and serves the right audience effectively.",
      social: {
        linkedin: "https://linkedin.com/in/betatester4",
        twitter: "https://twitter.com/betatester4"
      }
    }
  ];

  const stats = [
    { label: "Beta Testers", value: "4", icon: Users },
    { label: "Countries", value: "4", icon: Globe },
    { label: "Skills Covered", value: "12+", icon: Zap },
    { label: "Contributions", value: "40+", icon: CheckCircle }
  ];

  const values = [
    {
      icon: Heart,
      title: "Foundation Builders",
      description: "These individuals are laying the foundation for what Colabship.io will become. Their early feedback and contributions are invaluable."
    },
    {
      icon: Star,
      title: "Highly Valued",
      description: "Each beta tester brings unique expertise and perspective. They're not just users - they're co-creators of the platform."
    },
    {
      icon: Trophy,
      title: "Recognition Deserved",
      description: "This page serves as recognition for their contributions and a reference for their valuable work on Colabship.io."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Beta Team
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              The Valuable Beta Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the exceptional individuals who are laying the foundation of Colabship.io. 
              Their early contributions, feedback, and insights are shaping the future of indie collaboration.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-accent/20">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Testers Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {betaTesters.map((tester, index) => (
              <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={tester.avatar} alt={tester.name} />
                      <AvatarFallback className="text-lg">
                        {tester.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <Badge variant={tester.status === "Founder" ? "default" : "secondary"}>
                      {tester.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{tester.name}</CardTitle>
                  <p className="text-muted-foreground">{tester.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{tester.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {tester.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Key Contributions</h4>
                    <ul className="space-y-1">
                      {tester.contributions.map((contribution, contribIndex) => (
                        <li key={contribIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 p-3 bg-accent/5 rounded-lg">
                    <h4 className="text-sm font-semibold mb-1">Impact</h4>
                    <p className="text-xs text-muted-foreground">{tester.impact}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {tester.location}
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex space-x-2">
                      {tester.social.github && (
                        <a href={tester.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 text-muted-foreground hover:text-accent" />
                        </a>
                      )}
                      {tester.social.linkedin && (
                        <a href={tester.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 text-muted-foreground hover:text-accent" />
                        </a>
                      )}
                      {tester.social.twitter && (
                        <a href={tester.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4 text-muted-foreground hover:text-accent" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why This Team Matters</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-accent/20 text-center">
                <CardContent className="pt-6">
                  <value.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Join This Team?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for passionate individuals who want to help shape the future of indie collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <Link to="/access">
                Apply for Beta Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contributors">
                Open Contributions
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BetaTestersPage; 