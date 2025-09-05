import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MembershipStatus from "@/components/MembershipStatus";
import ProjectCreationModal from "@/components/ProjectCreationModal";
import { useMembership } from "@/contexts/MembershipContext";
import { Plus, Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Dashboard = () => {
  const { isMember, projectCount, maxProjects, canCreateProject } = useMembership();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app, this would come from an API
  const userProjects = [
    {
      id: 1,
      name: "EcoTrack Pro",
      status: "Active",
      collaborators: 3,
      equity: "12%",
      timeline: "6 months",
      revenue: "$8k MRR"
    },
    {
      id: 2,
      name: "DevCollab",
      status: "Planning",
      collaborators: 2,
      equity: "18%",
      timeline: "4 months",
      revenue: "Pre-launch"
    }
  ];

  const joinedProjects = [
    {
      id: 3,
      name: "LocalMarket",
      status: "Active",
      role: "Backend Developer",
      equity: "15%",
      timeline: "4 months"
    }
  ];

  const stats = [
    {
      label: "Projects Created",
      value: projectCount,
      icon: Plus,
      color: "text-blue-500"
    },
    {
      label: "Active Collaborations",
      value: userProjects.length + joinedProjects.length,
      icon: Users,
      color: "text-green-500"
    },
    {
      label: "Total Equity",
      value: "30%",
      icon: DollarSign,
      color: "text-purple-500"
    },
    {
      label: "Success Rate",
      value: "89%",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ];

  interface Project {
    id: number;
    name: string;
    status: string;
    collaborators?: number;
    role?: string;
    equity: string;
    timeline: string;
    revenue?: string;
  }

  const ProjectCard = ({ project, type = "owned" }: { project: Project, type?: "owned" | "joined" }) => (
    <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-accent">{project.name}</h3>
          <Badge 
            variant={project.status === "Active" ? "default" : "outline"}
            className={project.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
          >
            {project.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span>{type === "owned" ? project.collaborators : project.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent" />
            <span>{project.equity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{project.timeline}</span>
          </div>
          {type === "owned" && (
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>{project.revenue}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 glow-green">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Content */}
      <section className="pt-24 pb-12 bg-card">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground mb-2">
                Manage your projects and collaborations
              </p>
              <p className="text-accent font-mono text-sm">
                COLAB. SHIP. REPEAT.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-background border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Membership Status */}
            <div className="md:col-span-1">
              <ScrollReveal delay={200}>
                <MembershipStatus variant="full" />
              </ScrollReveal>
            </div>

            {/* Projects Tabs */}
            <div className="md:col-span-2">
              <ScrollReveal delay={300}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList className="bg-card border border-border">
                      <TabsTrigger value="overview" className="data-[state=active]:glow-green">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="my-projects" className="data-[state=active]:glow-green">
                        My Projects ({userProjects.length})
                      </TabsTrigger>
                      <TabsTrigger value="joined" className="data-[state=active]:glow-green">
                        Joined ({joinedProjects.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    {canCreateProject && (
                      <ProjectCreationModal />
                    )}
                  </div>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm">New collaborator joined <span className="text-accent">EcoTrack Pro</span></p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm">Project <span className="text-accent">DevCollab</span> moved to Planning phase</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="my-projects">
                    <div className="space-y-4">
                      {userProjects.length > 0 ? (
                        userProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} type="owned" />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Plus className="mx-auto mb-4 text-muted-foreground" size={48} />
                          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Start your first project and find collaborators
                          </p>
                          {canCreateProject && <ProjectCreationModal />}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="joined">
                    <div className="space-y-4">
                      {joinedProjects.length > 0 ? (
                        joinedProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} type="joined" />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Users className="mx-auto mb-4 text-muted-foreground" size={48} />
                          <h3 className="text-lg font-semibold mb-2">No joined projects</h3>
                          <p className="text-muted-foreground">
                            Browse projects to find opportunities to collaborate
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard; 