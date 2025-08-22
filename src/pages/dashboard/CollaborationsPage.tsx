import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  Clock, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Pause,
  Target,
  TrendingUp,
  DollarSign,
  Star
} from 'lucide-react';

const CollaborationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'paused'>('active');

  const collaborations = [
    {
      id: '1',
      projectName: 'AI Task Manager',
      status: 'active',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      teamMembers: [
        {
          name: 'Sarah Chen',
          role: 'Full Stack Developer',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        {
          name: 'Marcus Rodriguez',
          role: 'Product Designer',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
      ],
      revenue: '$12,500',
      equity: '40%',
      lastActivity: '2 hours ago',
      nextMilestone: 'Beta Testing',
      description: 'Building an AI-powered task management platform for remote teams.'
    },
    {
      id: '2',
      projectName: 'EcoTrack Pro',
      status: 'active',
      progress: 45,
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      teamMembers: [
        {
          name: 'Alex Kim',
          role: 'Growth Marketer',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        }
      ],
      revenue: '$8,200',
      equity: '30%',
      lastActivity: '1 day ago',
      nextMilestone: 'MVP Development',
      description: 'Sustainability tracking app for businesses to monitor their environmental impact.'
    }
  ];

  const completedCollaborations = [
    {
      id: '3',
      projectName: 'FinFlow App',
      status: 'completed',
      progress: 100,
      startDate: '2023-09-01',
      endDate: '2024-01-15',
      teamMembers: [
        {
          name: 'David Park',
          role: 'Backend Developer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      ],
      revenue: '$25,000',
      equity: '50%',
      completedDate: '2024-01-15',
      finalOutcome: 'Successfully launched and acquired 1,000+ users',
      description: 'Personal finance management app with AI-powered insights.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Active Collaborations</h1>
        <p className="text-muted-foreground mt-1">
          Manage your ongoing partnerships and track progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <PlayCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$20.7k</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">60%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'active' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('active')}
        >
          Active
        </Button>
        <Button
          variant={activeTab === 'completed' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </Button>
        <Button
          variant={activeTab === 'paused' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('paused')}
        >
          Paused
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {collaborations.map((collab) => (
            <Card key={collab.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{collab.projectName}</CardTitle>
                    <p className="text-muted-foreground mt-1">{collab.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(collab.status)}>
                      {getStatusIcon(collab.status)}
                      <span className="ml-1">{collab.status}</span>
                    </Badge>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{collab.progress}%</span>
                  </div>
                  <Progress value={collab.progress} className="h-2" />
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Team Members</h4>
                  <div className="flex items-center gap-3">
                    {collab.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Timeline: {collab.startDate} - {collab.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Last activity: {collab.lastActivity}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Revenue: {collab.revenue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Equity: {collab.equity}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium">Next: {collab.nextMilestone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="space-y-6">
          {completedCollaborations.map((collab) => (
            <Card key={collab.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{collab.projectName}</CardTitle>
                    <p className="text-muted-foreground mt-1">{collab.description}</p>
                  </div>
                  <Badge className={getStatusColor(collab.status)}>
                    {getStatusIcon(collab.status)}
                    <span className="ml-1">{collab.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Outcome */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Final Outcome</h4>
                  <p className="text-green-700">{collab.finalOutcome}</p>
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Team Members</h4>
                  <div className="flex items-center gap-3">
                    {collab.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {collab.completedDate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Final Revenue: {collab.revenue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Equity: {collab.equity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'paused' && (
        <div className="text-center py-12">
          <Pause className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Paused Collaborations</h3>
          <p className="text-muted-foreground">
            All your collaborations are currently active or completed.
          </p>
        </div>
      )}
    </div>
  );
};

export default CollaborationsPage; 