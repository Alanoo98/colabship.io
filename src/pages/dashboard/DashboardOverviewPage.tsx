import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  Star,
  MessageSquare,
  Heart,
  Eye,
  ArrowRight,
  Plus,
  Target,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Zap,
  Lightbulb,
  FileText,
  Handshake,
  Rocket
} from 'lucide-react';

const DashboardOverviewPage: React.FC = () => {
  const stats = [
    {
      title: "Active Projects",
      value: "6",
      change: "+2",
      changeType: "positive",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Collaborations",
      value: "2",
      change: "+1",
      changeType: "positive", 
      icon: Handshake,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Match Score",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Profile Views",
      value: "1.2k",
      change: "+12%",
      changeType: "positive",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentProjects = [
    {
      id: "1",
      title: "AI Task Manager",
      status: "active",
      progress: 75,
      teamSize: 3,
      lastActivity: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "2", 
      title: "EcoTrack Pro",
      status: "planning",
      progress: 25,
      teamSize: 2,
      lastActivity: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "3",
      title: "FinFlow App",
      status: "completed",
      progress: 100,
      teamSize: 4,
      lastActivity: "3 days ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const recentMatches = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      matchScore: 95,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      skills: ["Figma", "React", "Design Systems"],
      status: "pending"
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      role: "DevOps Engineer", 
      matchScore: 87,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills: ["AWS", "Docker", "Kubernetes"],
      status: "accepted"
    },
    {
      id: "3",
      name: "Emma Thompson",
      role: "Product Manager",
      matchScore: 82,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skills: ["Strategy", "Analytics", "User Research"],
      status: "pending"
    }
  ];

  const quickActions = [
    {
      title: "Find Collaborators",
      description: "Discover new team members",
      icon: Users,
      href: "/dashboard/matching",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Create Project",
      description: "Start a new collaboration",
      icon: Plus,
      href: "/dashboard/projects",
      color: "text-green-600", 
      bgColor: "bg-green-50"
    },
    {
      title: "Legal Templates",
      description: "Access collaboration contracts",
      icon: FileText,
      href: "/dashboard/legal",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "View Resources",
      description: "Browse guides and tools",
      icon: Lightbulb,
      href: "/dashboard/resources",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const notifications = [
    {
      id: "1",
      type: "match",
      title: "New Match Found",
      description: "Sarah Johnson wants to collaborate on your AI project",
      time: "5 minutes ago",
      unread: true
    },
    {
      id: "2",
      type: "project",
      title: "Project Update",
      description: "EcoTrack Pro has reached 75% completion",
      time: "1 hour ago",
      unread: false
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      description: "Marcus Rodriguez sent you a message",
      time: "2 hours ago",
      unread: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Alex! 👋</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your projects and collaborations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Projects</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/projects">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={project.avatar} />
                      <AvatarFallback>{project.title.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{project.title}</h4>
                        <Badge variant={
                          project.status === 'active' ? 'default' :
                          project.status === 'completed' ? 'secondary' : 'outline'
                        }>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.teamSize} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.lastActivity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      asChild
                    >
                      <Link to={action.href}>
                        <div className={`w-8 h-8 ${action.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                          <Icon className={`w-4 h-4 ${action.color}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm text-muted-foreground">{action.description}</div>
                        </div>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Matches</span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/matching">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={match.avatar} />
                    <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{match.name}</h4>
                      <Badge variant={match.status === 'accepted' ? 'default' : 'secondary'}>
                        {match.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{match.role}</p>
                    <div className="flex flex-wrap gap-1">
                      {match.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {match.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{match.skills.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{match.matchScore}%</div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button variant="ghost" size="sm">
                Mark All Read
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`flex items-start gap-3 p-3 rounded-lg ${
                  notification.unread ? 'bg-accent/10' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === 'match' ? 'bg-blue-100' :
                    notification.type === 'project' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    {notification.type === 'match' && <Users className="w-4 h-4 text-blue-600" />}
                    {notification.type === 'project' && <Briefcase className="w-4 h-4 text-green-600" />}
                    {notification.type === 'message' && <MessageSquare className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverviewPage; 