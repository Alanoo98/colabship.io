import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Target, 
  Star, 
  MessageSquare, 
  Heart, 
  ArrowRight,
  Filter,
  Search,
  Zap,
  Clock,
  MapPin,
  Briefcase,
  Award
} from 'lucide-react';

const SmartMatchingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matches' | 'requests' | 'history'>('matches');

  const matches = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      matchScore: 94,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      location: 'San Francisco, CA',
      availability: 'Full-time',
      lookingFor: 'Co-founder for SaaS startup',
      lastActive: '2 hours ago',
      mutualConnections: 3
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      matchScore: 87,
      skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
      location: 'New York, NY',
      availability: 'Part-time',
      lookingFor: 'Technical co-founder for mobile app',
      lastActive: '1 day ago',
      mutualConnections: 1
    },
    {
      id: '3',
      name: 'Alex Kim',
      role: 'Growth Marketer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      matchScore: 82,
      skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
      location: 'Austin, TX',
      availability: 'Full-time',
      lookingFor: 'Technical team for B2B platform',
      lastActive: '3 hours ago',
      mutualConnections: 2
    }
  ];

  const requests = [
    {
      id: '1',
      name: 'David Park',
      role: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      project: 'AI-powered analytics platform',
      message: 'Hey! I saw your profile and think we could build something amazing together. Would love to discuss potential collaboration.',
      sentAt: '1 day ago',
      status: 'pending'
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Smart Matching</h1>
        <p className="text-muted-foreground mt-1">
          Find your perfect co-founder with AI-powered matching
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Matches</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Matches</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Requests</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Match Score</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'matches' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </Button>
        <Button
          variant={activeTab === 'requests' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('history')}
        >
          History
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'matches' && (
        <div className="space-y-4">
          {matches.map((match) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={match.avatar} />
                    <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{match.name}</h3>
                        <p className="text-muted-foreground">{match.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getMatchColor(match.matchScore)}>
                          {match.matchScore}% Match
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4 mr-2" />
                          Like
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {match.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {match.availability}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {match.mutualConnections} mutual connections
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Looking for:</p>
                        <p className="text-sm text-muted-foreground">{match.lookingFor}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {match.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{request.name}</h3>
                        <p className="text-sm text-muted-foreground">{request.role}</p>
                      </div>
                      <Badge variant="outline">{request.status}</Badge>
                    </div>
                    
                    <p className="text-sm font-medium mb-1">Project: {request.project}</p>
                    <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" variant="ghost">View Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
          <p className="text-muted-foreground">
            Your matching history will appear here once you start connecting with others.
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartMatchingPage; 