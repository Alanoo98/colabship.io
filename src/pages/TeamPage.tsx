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
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Emil Vergara",
      role: "Co-founder & Developer",
      avatar: "/images/profile.jpg",
      bio: "Technical/data background with huge drive to start projects and businesses. Building Colabship.io from the ground up.",
      skills: ["Full-stack Development", "Product Strategy", "Indie Hacking"],
      location: "Remote",
      status: "Founder",
      contribution: "Platform development, community building, product vision"
    },
    {
      name: "Silicon Valley Partner",
      role: "Co-founder & Business",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Experienced entrepreneur from Silicon Valley. Brings business expertise and strategic thinking to the team.",
      skills: ["Business Strategy", "Go-to-Market", "Fundraising"],
      location: "Silicon Valley",
      status: "Founder",
      contribution: "Business strategy, market validation, partnership development"
    },
    {
      name: "Beta Tester #1",
      role: "Frontend Developer",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Passionate about building user-friendly interfaces and creating seamless user experiences.",
      skills: ["React", "TypeScript", "UI/UX Design"],
      location: "Europe",
      status: "Beta Tester",
      contribution: "Feature testing, UI feedback, user experience insights"
    },
    {
      name: "Beta Tester #2",
      role: "Backend Developer",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Focused on scalable architecture and robust backend systems. Loves solving complex technical challenges.",
      skills: ["Node.js", "Python", "Database Design"],
      location: "North America",
      status: "Beta Tester",
      contribution: "Technical architecture feedback, performance optimization"
    },
    {
      name: "Beta Tester #3",
      role: "Product Designer",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Creates beautiful, functional designs that solve real user problems. Believes in human-centered design.",
      skills: ["Figma", "User Research", "Prototyping"],
      location: "Asia",
      status: "Beta Tester",
      contribution: "Design feedback, user research insights, accessibility improvements"
    },
    {
      name: "Beta Tester #4",
      role: "Growth Marketer",
      avatar: "/images/placeholder-avatar.jpg",
      bio: "Helps products find their audience and scale sustainably. Data-driven approach to growth.",
      skills: ["Digital Marketing", "Analytics", "Content Strategy"],
      location: "Australia",
      status: "Beta Tester",
      contribution: "Marketing strategy, user acquisition insights, community growth"
    }
  ];

  const stats = [
    { label: "Team Members", value: "6", icon: Users },
    { label: "Countries", value: "5", icon: Globe },
    { label: "Skills Covered", value: "12+", icon: Zap },
    { label: "Beta Feedback", value: "50+", icon: MessageSquare }
  ];

  const values = [
    {
      icon: Heart,
      title: "Diverse Perspectives",
      description: "Our team spans different timezones, backgrounds, and expertise levels. This diversity makes us stronger."
    },
    {
      icon: Star,
      title: "Quality Over Quantity",
      description: "We're building a small, focused team of people who truly believe in our mission and values."
    },
    {
      icon: Award,
      title: "Continuous Learning",
      description: "Every team member brings unique insights and is committed to growing together."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Meet the Team
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              The Valuable Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the people behind Colabship.io. From founders to beta testers, 
              each person brings unique value to building the future of indie collaboration.
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

      {/* Team Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <Badge variant={member.status === "Founder" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Contribution</h4>
                    <p className="text-xs text-muted-foreground">{member.contribution}</p>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Globe className="w-3 h-3 mr-1" />
                    {member.location}
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
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Our Team Special</h2>
          
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
          <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for passionate people who believe in our mission. 
            Whether as a beta tester, collaborator, or team member.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <Link to="/access">
                Join Beta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TeamPage; 