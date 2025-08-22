import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectShowcase = () => {
  const [filter, setFilter] = useState("All");
  
  const projects = [
    {
      name: "EcoTrack",
      description: "Carbon footprint tracking app with AI insights",
      stage: "Launched",
      category: "Climate Tech",
      team: ["Frontend Dev", "Data Scientist", "Product Manager"],
      equity: "15% available",
      timeline: "6 months",
      tags: ["React", "Python", "Machine Learning"]
    },
    {
      name: "LocalMarket",
      description: "Hyperlocal marketplace connecting neighborhoods", 
      stage: "MVP Ready",
      category: "E-commerce",
      team: ["Backend Dev", "Mobile Dev"],
      equity: "20% available",
      timeline: "4 months",
      tags: ["Node.js", "React Native", "PostgreSQL"]
    },
    {
      name: "HealthMind",
      description: "Mental health platform with peer support",
      stage: "Ideation",
      category: "HealthTech", 
      team: ["Full-stack Dev", "Designer", "Mental Health Expert"],
      equity: "25% available",
      timeline: "8 months",
      tags: ["Next.js", "Tailwind", "WebRTC"]
    },
    {
      name: "CodeMentor AI",
      description: "AI-powered coding tutor for beginners",
      stage: "Beta",
      category: "EdTech",
      team: ["AI Engineer", "Frontend Dev"],
      equity: "18% available", 
      timeline: "3 months",
      tags: ["OpenAI", "Vue.js", "FastAPI"]
    }
  ];

  const categories = ["All", "Climate Tech", "E-commerce", "HealthTech", "EdTech"];
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const getStageColor = (stage: string) => {
    switch(stage) {
      case "Launched": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "MVP Ready": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Beta": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover exciting projects looking for co-founders
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={filter === category ? "glow-green" : "hover:glow-taupe"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card 
              key={index}
                              className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:glow-taupe animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-accent">{project.name}</h3>
                  <Badge className={`${getStageColor(project.stage)} border`}>
                    {project.stage}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-sm font-medium text-secondary">Looking for: </span>
                    <span className="text-sm text-foreground">{project.team.join(", ")}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span><span className="text-secondary">Equity:</span> {project.equity}</span>
                    <span><span className="text-secondary">Timeline:</span> {project.timeline}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 glow-green">
                    Apply to Join
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
                          <Button variant="outline" size="lg" className="hover:glow-taupe">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;