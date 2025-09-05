import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Rocket,
  MessageSquare,
  Star
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";
import FounderDashboard from "@/features/founders/components/FounderDashboard";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: Target,
      description: "Active projects you're involved in"
    },
    {
      title: "Team Members",
      value: "47",
      change: "+8",
      changeType: "positive",
      icon: Users,
      description: "People across all your projects"
    },
    {
      title: "Days Active",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: Calendar,
      description: "Days since you joined Colabship"
    },
    {
      title: "Success Rate",
      value: "89%",
      change: "+5%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Projects completed successfully"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "project_created",
      title: "New project created",
      description: "AI-Powered Task Manager",
      time: "2 hours ago",
      user: "You"
    },
    {
      id: 2,
      type: "member_joined",
      title: "New team member",
      description: "Sarah Chen joined your project",
      time: "1 day ago",
      user: "Sarah Chen"
    },
    {
      id: 3,
      type: "milestone_reached",
      title: "Milestone achieved",
      description: "MVP completed for Mental Health App",
      time: "3 days ago",
      user: "Team"
    },
    {
      id: 4,
      type: "feedback_received",
      title: "Feedback received",
      description: "5 new feedback items on your project",
      time: "1 week ago",
      user: "Beta Testers"
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      project: "AI Task Manager",
      deadline: "2024-02-15",
      type: "MVP Launch",
      priority: "high"
    },
    {
      id: 2,
      project: "Mental Health App",
      deadline: "2024-02-20",
      type: "Beta Testing",
      priority: "medium"
    },
    {
      id: 3,
      project: "E-commerce Platform",
      deadline: "2024-02-25",
      type: "Feature Release",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project_created":
        return <Rocket className="w-4 h-4" />;
      case "member_joined":
        return <Users className="w-4 h-4" />;
      case "milestone_reached":
        return <Target className="w-4 h-4" />;
      case "feedback_received":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your projects.
              </p>
            </div>
          </ScrollReveal>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="founder">Founder</TabsTrigger>
              <TabsTrigger value="collaborator">Collaborator</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                              </p>
                              <p className="text-2xl font-bold mt-1">{stat.value}</p>
                              <div className="flex items-center mt-2">
                                {stat.changeType === "positive" ? (
                                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm ${
                                  stat.changeType === "positive" ? "text-green-500" : "text-red-500"
                                }`}>
                                  {stat.change}
                                </span>
                              </div>
                            </div>
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-accent" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">
                            {stat.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScrollReveal delay={200}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                                <span className="text-xs text-muted-foreground mx-1">•</span>
                                <span className="text-xs text-accent">{activity.user}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingDeadlines.map((deadline) => (
                          <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{deadline.project}</p>
                              <p className="text-sm text-muted-foreground">{deadline.type}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(deadline.priority)}`}></div>
                              <span className="text-sm text-muted-foreground">{deadline.deadline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </TabsContent>

            <TabsContent value="founder" className="space-y-6">
              <FounderDashboard />
            </TabsContent>

            <TabsContent value="collaborator" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardContent className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Collaborator Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      View your collaborations and project applications
                    </p>
                    <Button className="glow-green">
                      <Users className="w-4 h-4 mr-2" />
                      Browse Projects
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardContent className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Detailed analytics and insights about your projects
                    </p>
                    <Button className="glow-green">
                      <PieChart className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage; 