import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Target, 
  TrendingUp, 
  Clock,
  Plus,
  Edit
} from 'lucide-react';

const SkillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'achievements'>('skills');

  const skills = [
    {
      id: '1',
      name: 'React Development',
      category: 'Frontend',
      proficiency: 85,
      experience: '3 years',
      projects: 12,
      lastUsed: '2 days ago',
      trending: 'up'
    },
    {
      id: '2',
      name: 'Node.js Backend',
      category: 'Backend',
      proficiency: 78,
      experience: '2 years',
      projects: 8,
      lastUsed: '1 week ago',
      trending: 'up'
    },
    {
      id: '3',
      name: 'Product Design',
      category: 'Design',
      proficiency: 72,
      experience: '1.5 years',
      projects: 6,
      lastUsed: '3 days ago',
      trending: 'stable'
    },
    {
      id: '4',
      name: 'Growth Marketing',
      category: 'Marketing',
      proficiency: 65,
      experience: '1 year',
      projects: 4,
      lastUsed: '1 month ago',
      trending: 'down'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Co-founder Match',
      description: 'Successfully matched with your first co-founder',
      date: '2024-01-20',
      points: 100,
      icon: Star
    },
    {
      id: '2',
      title: 'Project Launched',
      description: 'Launched your first project on the platform',
      date: '2024-01-18',
      points: 250,
      icon: Target
    },
    {
      id: '3',
      title: 'Skill Mastered',
      description: 'Achieved 90%+ proficiency in a technical skill',
      date: '2024-01-15',
      points: 150,
      icon: TrendingUp
    }
  ];

  const getTrendingIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Skills</h1>
        <p className="text-muted-foreground mt-1">
          Track your skills and showcase your achievements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Skills</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievement Points</p>
                <p className="text-2xl font-bold">1,250</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Proficiency</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'skills' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </Button>
        <Button
          variant={activeTab === 'achievements' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <Badge variant="outline">{skill.category}</Badge>
                      {getTrendingIcon(skill.trending)}
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Proficiency</span>
                        <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{skill.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="w-4 h-4" />
                        <span>{skill.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Last used: {skill.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Update
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Earned: {achievement.date}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-600">
                        +{achievement.points}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkillsPage; 