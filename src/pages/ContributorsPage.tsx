import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Heart, 
  Zap, 
  Globe, 
  ArrowRight,
  MessageSquare,
  Github,
  Star,
  CheckCircle,
  Send,
  Lightbulb,
  Target,
  Trophy,
  Award,
  TrendingUp,
  Eye,
  ThumbsUp,
  MessageCircle,
  Calendar,
  User,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const ContributorsPage = () => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'contributors' | 'leaderboard'>('ideas');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Ideas', count: 24 },
    { id: 'feature', name: 'Feature Requests', count: 12 },
    { id: 'improvement', name: 'Improvements', count: 8 },
    { id: 'bug', name: 'Bug Reports', count: 4 },
    { id: 'community', name: 'Community', count: 6 }
  ];

  const ideas = [
    {
      id: 1,
      title: "Dark Mode for Better Late-Night Coding",
      description: "As someone who codes late at night, I'd love to see a dark mode option. It would make the platform much more comfortable to use during those late-night collaboration sessions.",
      author: {
        name: "Alex Chen",
        avatar: "/api/placeholder/40/40",
        reputation: 1250,
        contributions: 15
      },
      category: "feature",
      status: "under-review",
      votes: 47,
      comments: 12,
      createdAt: "2024-12-15",
      tags: ["ui", "accessibility", "user-experience"]
    },
    {
      id: 2,
      title: "Integration with Popular Indie Hacker Tools",
      description: "Would love to see integrations with tools like Notion, Linear, and GitHub. This would make the workflow much smoother for teams.",
      author: {
        name: "Sarah Kim",
        avatar: "/api/placeholder/40/40",
        reputation: 890,
        contributions: 8
      },
      category: "feature",
      status: "planned",
      votes: 89,
      comments: 23,
      createdAt: "2024-12-14",
      tags: ["integrations", "workflow", "productivity"]
    },
    {
      id: 3,
      title: "Better Timezone Handling for Global Teams",
      description: "Currently, it's hard to coordinate with team members across different timezones. A timezone-aware scheduling system would be amazing.",
      author: {
        name: "Marcus Rodriguez",
        avatar: "/api/placeholder/40/40",
        reputation: 2100,
        contributions: 22
      },
      category: "improvement",
      status: "in-progress",
      votes: 156,
      comments: 31,
      createdAt: "2024-12-13",
      tags: ["timezone", "global", "scheduling"]
    },
    {
      id: 4,
      title: "Community Challenges and Hackathons",
      description: "What if we had monthly challenges where indie hackers could team up and build something together? It would be a great way to test the platform and build community.",
      author: {
        name: "Emma Wilson",
        avatar: "/api/placeholder/40/40",
        reputation: 650,
        contributions: 5
      },
      category: "community",
      status: "implemented",
      votes: 203,
      comments: 45,
      createdAt: "2024-12-12",
      tags: ["community", "events", "engagement"]
    }
  ];

  const topContributors = [
    {
      name: "Marcus Rodriguez",
      avatar: "/api/placeholder/60/60",
      reputation: 2100,
      contributions: 22,
      badges: ["Early Adopter", "Idea Champion", "Community Leader"],
      role: "Full-Stack Developer",
      location: "Mexico City",
      joined: "2024-10-15"
    },
    {
      name: "Alex Chen",
      avatar: "/api/placeholder/60/60",
      reputation: 1250,
      contributions: 15,
      badges: ["Feature Hunter", "Bug Catcher"],
      role: "Product Designer",
      location: "San Francisco",
      joined: "2024-11-01"
    },
    {
      name: "Sarah Kim",
      avatar: "/api/placeholder/60/60",
      reputation: 890,
      contributions: 8,
      badges: ["Community Builder"],
      role: "Growth Marketer",
      location: "Seoul",
      joined: "2024-11-15"
    },
    {
      name: "Emma Wilson",
      avatar: "/api/placeholder/60/60",
      reputation: 650,
      contributions: 5,
      badges: ["Newcomer"],
      role: "UX Researcher",
      location: "London",
      joined: "2024-12-01"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Marcus Rodriguez", points: 2100, change: "+150" },
    { rank: 2, name: "Alex Chen", points: 1250, change: "+75" },
    { rank: 3, name: "Sarah Kim", points: 890, change: "+120" },
    { rank: 4, name: "Emma Wilson", points: 650, change: "+200" },
    { rank: 5, name: "David Park", points: 520, change: "+80" },
    { rank: 6, name: "Lisa Zhang", points: 480, change: "+60" },
    { rank: 7, name: "Tom Anderson", points: 420, change: "+90" },
    { rank: 8, name: "Maria Garcia", points: 380, change: "+45" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'planned': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'under-review': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'implemented': return 'Implemented';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      case 'under-review': return 'Under Review';
      default: return 'New';
    }
  };

  const filteredIdeas = selectedCategory === 'all' 
    ? ideas 
    : ideas.filter(idea => idea.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Open Contributions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Open Contribution Program
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our open contribution program and help shape the future of Colabship.io. 
              Share ideas, report bugs, suggest features, and be part of building the perfect platform for indie collaboration.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24</div>
              <div className="text-sm text-muted-foreground">Ideas Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">156</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">8</div>
              <div className="text-sm text-muted-foreground">Features Implemented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">2,100</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={activeTab === 'ideas' ? 'default' : 'outline'}
              onClick={() => setActiveTab('ideas')}
              className="flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Ideas & Feedback
            </Button>
            <Button
              variant={activeTab === 'contributors' ? 'default' : 'outline'}
              onClick={() => setActiveTab('contributors')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Top Contributors
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('leaderboard')}
              className="flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Ideas Tab */}
      {activeTab === 'ideas' && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-accent/10"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>

            {/* Submit New Idea */}
            <Card className="border-accent/20 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Share Your Idea
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="idea-title">Title</Label>
                    <Input
                      id="idea-title"
                      placeholder="What's your idea?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="idea-description">Description</Label>
                    <Textarea
                      id="idea-description"
                      placeholder="Tell us more about your idea..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="idea-category">Category</Label>
                      <select
                        id="idea-category"
                        className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="feature">Feature Request</option>
                        <option value="improvement">Improvement</option>
                        <option value="bug">Bug Report</option>
                        <option value="community">Community</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="idea-tags">Tags</Label>
                      <Input
                        id="idea-tags"
                        placeholder="ui, accessibility, workflow"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button className="glow-green">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Idea
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ideas List */}
            <div className="space-y-6">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="border-accent/20 hover:border-accent/40 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{idea.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(idea.status)}
                          >
                            {getStatusText(idea.status)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{idea.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {idea.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-muted"></div>
                            <span>{idea.author.name}</span>
                            <span>•</span>
                            <span>{idea.author.reputation} points</span>
                          </div>
                          <span>•</span>
                          <span>{idea.comments} comments</span>
                          <span>•</span>
                          <span>{idea.votes} votes</span>
                        </div>
                      </div>
                      
                      {/* Vote Button */}
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        {idea.votes}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contributors Tab */}
      {activeTab === 'contributors' && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Top Contributors</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {topContributors.map((contributor, index) => (
                <Card key={index} className="border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full bg-muted"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{contributor.name}</h3>
                          <Badge variant="outline" className="text-accent">
                            #{index + 1}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{contributor.role} • {contributor.location}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{contributor.reputation} points</span>
                          <span>•</span>
                          <span>{contributor.contributions} contributions</span>
                          <span>•</span>
                          <span>Joined {new Date(contributor.joined).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {contributor.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Community Leaderboard</h2>
            
            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-accent">{entry.rank}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{entry.name}</h3>
                          <p className="text-sm text-muted-foreground">{entry.points} points</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-500 border-green-500/20">
                          {entry.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Your ideas could shape the future of indie collaboration. 
            Share your thoughts, get recognized, and build your reputation in the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="glow-green">
              <a href="https://discord.gg/colabship" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Join Discord
              </a>
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

export default ContributorsPage; 