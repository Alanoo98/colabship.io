import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useInView } from "@/hooks/useScrollAnimation";
import { Search, Filter, Sparkles, Users, Calendar, DollarSign } from "lucide-react";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [ref, isInView] = useInView(0.1);

  const projects = [
    {
      id: 1,
      name: "EcoTrack Pro",
      description: "Advanced carbon footprint tracking platform with AI-powered recommendations and corporate dashboards",
      stage: "Launched",
      category: "Climate Tech",
      team: ["Frontend Dev", "Data Scientist", "Product Manager"],
      equity: "12% available",
      timeline: "6 months",
      tags: ["React", "Python", "Machine Learning", "PostgreSQL"],
      funding: "$50k raised",
      users: "2.5k+ users",
      revenue: "$8k MRR",
      featured: true
    },
    {
      id: 2,
      name: "DevCollab",
      description: "Real-time collaboration platform for distributed development teams with integrated code review",
      stage: "Beta",
      category: "Developer Tools",
      team: ["Backend Dev", "DevOps Engineer"],
      equity: "18% available",
      timeline: "4 months",
      tags: ["Node.js", "WebSocket", "Docker", "Redis"],
      funding: "Pre-seed",
      users: "800+ users",
      revenue: "Freemium",
      featured: false
    },
    {
      id: 3,
      name: "LocalMarket",
      description: "Hyperlocal marketplace connecting neighborhood businesses with community members",
      stage: "MVP Ready",
      category: "E-commerce",
      team: ["Mobile Dev", "Marketing Lead"],
      equity: "20% available",
      timeline: "4 months",
      tags: ["React Native", "Node.js", "Stripe", "Maps API"],
      funding: "Bootstrapped",
      users: "500+ users",
      revenue: "5% commission",
      featured: false
    },
    {
      id: 4,
      name: "HealthMind AI",
      description: "Mental health platform with AI therapy assistance and peer support communities",
      stage: "Ideation",
      category: "HealthTech",
      team: ["Full-stack Dev", "Designer", "Mental Health Expert"],
      equity: "25% available",
      timeline: "8 months",
      tags: ["Next.js", "OpenAI", "Tailwind", "WebRTC"],
      funding: "Looking for funding",
      users: "Pre-launch",
      revenue: "Subscription model",
      featured: false
    },
    {
      id: 5,
      name: "CodeMentor AI",
      description: "AI-powered coding tutor that adapts to individual learning styles and provides personalized challenges",
      stage: "Beta",
      category: "EdTech",
      team: ["AI Engineer", "Frontend Dev"],
      equity: "15% available",
      timeline: "3 months",
      tags: ["OpenAI", "Vue.js", "FastAPI", "PostgreSQL"],
      funding: "$25k raised",
      users: "1.2k+ users",
      revenue: "$3k MRR",
      featured: true
    },
    {
      id: 6,
      name: "CreatorFlow",
      description: "Content creation suite with AI writing assistance, social media scheduling, and analytics",
      stage: "Launched",
      category: "Creator Tools",
      team: ["Content Strategist", "Backend Dev"],
      equity: "10% available",
      timeline: "5 months",
      tags: ["React", "Python", "OpenAI", "Social APIs"],
      funding: "$75k raised",
      users: "5k+ users",
      revenue: "$12k MRR",
      featured: true
    }
  ];

  const categories = ["All", "Climate Tech", "Developer Tools", "E-commerce", "HealthTech", "EdTech", "Creator Tools"];
  const stages = ["All", "Ideation", "MVP Ready", "Beta", "Launched"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesStage = selectedStage === "All" || project.stage === selectedStage;
    
    return matchesSearch && matchesCategory && matchesStage;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const allProjects = filteredProjects;

  const getStageColor = (stage: string) => {
    switch(stage) {
      case "Launched": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Beta": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "MVP Ready": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  };

  const ProjectCard = ({ project, featured = false }: { project: any, featured?: boolean }) => (
    <Card className={`bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/10 relative group ${featured ? 'ring-2 ring-accent/20 shadow-lg shadow-accent/10' : ''}`}>
      {featured && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Sparkles size={12} />
          Featured
        </div>
      )}
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors">{project.name}</h3>
          <Badge className={`${getStageColor(project.stage)} border shadow-sm text-xs`}>
            {project.stage}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-3 sm:mb-4 line-clamp-2 leading-relaxed text-sm sm:text-base">{project.description}</p>
        
                  <div className="space-y-3 mb-4">
            <div className="bg-muted/30 rounded-lg p-2 sm:p-3">
              <span className="text-xs sm:text-sm font-medium text-secondary">Looking for: </span>
              <span className="text-xs sm:text-sm text-foreground font-medium">{project.team.join(", ")}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2 bg-muted/20 rounded-lg p-1.5 sm:p-2">
                <DollarSign size={12} className="sm:w-3.5 sm:h-3.5 text-secondary" />
                <span className="font-medium">{project.equity}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-muted/20 rounded-lg p-1.5 sm:p-2">
                <Calendar size={12} className="sm:w-3.5 sm:h-3.5 text-secondary" />
                <span className="font-medium">{project.timeline}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-muted/20 rounded-lg p-1.5 sm:p-2">
                <Users size={12} className="sm:w-3.5 sm:h-3.5 text-secondary" />
                <span className="font-medium">{project.users}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-muted/20 rounded-lg p-1.5 sm:p-2">
                <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-secondary" />
                <span className="font-medium">{project.revenue}</span>
              </div>
            </div>
          </div>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
          {project.tags.map((tag: string, idx: number) => (
            <Badge key={idx} variant="outline" className="text-xs bg-muted/30 border-border/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button size="sm" className="flex-1 glow-green magnetic-hover h-9 sm:h-10">
            Apply to Join
          </Button>
          <Button size="sm" variant="outline" className="flex-1 hover:bg-secondary/10 hover:border-secondary/30 h-9 sm:h-10">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-card relative overflow-hidden min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-elements absolute top-20 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg"></div>
          <div className="floating-elements absolute bottom-32 right-1/3 w-16 h-16 bg-secondary/5 rounded-full blur-md"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
                Discover <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
                Find your next big collaboration. Browse projects from indie hackers looking for the right co-founders to ship together.
              </p>
              
              <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
                <div className="text-center p-4 sm:p-6 bg-background/50 rounded-xl border border-border/50 backdrop-blur-sm">
                  <AnimatedCounter end={47} suffix="+" className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Active Projects</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-background/50 rounded-xl border border-border/50 backdrop-blur-sm">
                  <AnimatedCounter end={156} suffix="+" className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Builders</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-background/50 rounded-xl border border-border/50 backdrop-blur-sm">
                  <AnimatedCounter end={23} suffix="+" className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Launched</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-background/50 rounded-xl border border-border/50 backdrop-blur-sm">
                  <AnimatedCounter end={89} suffix="%" className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Success Rate</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Search and Filters */}
          <ScrollReveal delay={200}>
            <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary" size={20} />
                    <Input
                      placeholder="Search projects, technologies, or roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 bg-card/50 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all duration-200"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48 h-12 bg-card/50 border-border/50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
                    <SelectTrigger className="w-full md:w-48 h-12 bg-card/50 border-border/50">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Content */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-center mb-8 sm:mb-12">
              <TabsList className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
                <TabsTrigger value="featured" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-accent/20 transition-all duration-200">
                  Featured Projects
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-accent/20 transition-all duration-200">
                  All Projects ({allProjects.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured">
              <ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                  {featuredProjects.map((project, index) => (
                    <ScrollReveal key={project.id} delay={index * 100}>
                      <ProjectCard project={project} featured={true} />
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="all">
              <ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                  {allProjects.map((project, index) => (
                    <ScrollReveal key={project.id} delay={index * 50}>
                      <ProjectCard project={project} featured={project.featured} />
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>

          {filteredProjects.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-12">
                <Filter className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;