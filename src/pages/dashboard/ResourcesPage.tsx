import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Lightbulb, 
  FileText, 
  Code,
  ExternalLink,
  Download,
  Star,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Target,
  Play,
  Monitor,
  Coffee,
  Rocket,
  DollarSign,
  Heart,
  Share2,
  Briefcase,
  Palette,
  Globe,
  Video,
  Headphones,
  BookMarked,
  ShoppingCart,
  Wrench
} from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const resourceSections = [
    {
      id: 'learning',
      title: 'Learning & Education',
      description: 'Expand your knowledge with curated content',
      icon: BookOpen,
      resources: [
        {
          id: '1',
          title: 'Indie Hackers YouTube',
          description: 'Interviews with successful indie hackers and bootstrapped founders. 450K subscribers.',
          type: 'Video Channel',
          author: 'Indie Hackers',
          rating: 4.9,
          url: 'https://youtube.com/indiehackers',
          icon: Play,
          featured: true
        },
        {
          id: '2',
          title: 'Fireship - Programming Tutorials',
          description: 'Quick programming tutorials and web development tips. 2.1M subscribers.',
          type: 'Video Channel',
          author: 'Fireship',
          rating: 4.8,
          url: 'https://youtube.com/fireship',
          icon: Play
        },
        {
          id: '3',
          title: 'The Indie Hacker\'s Guide to Finding Co-founders',
          description: 'Comprehensive guide on how to find, evaluate, and partner with the right co-founder for your startup.',
          type: 'Blog Post',
          author: 'Indie Hackers',
          rating: 4.9,
          url: 'https://indiehackers.com/guide',
          icon: FileText,
          featured: true
        },
        {
          id: '4',
          title: 'Product-Market Fit Validation',
          description: 'Step-by-step framework for validating your product idea before building.',
          type: 'Blog Post',
          author: 'First Round Capital',
          rating: 4.9,
          url: 'https://firstround.com/pmf',
          icon: Rocket
        }
      ]
    },
    {
      id: 'tools',
      title: 'Productivity & Tools',
      description: 'Essential tools for developers and founders',
      icon: Zap,
      resources: [
        {
          id: '5',
          title: 'Linear - Project Management',
          description: 'Modern project management tool built for high-performance teams. Perfect for software development.',
          type: 'Tool',
          price: 'Free - $15/month',
          rating: 4.8,
          url: 'https://linear.app',
          icon: Briefcase,
          featured: true
        },
        {
          id: '6',
          title: 'Raycast - Productivity Launcher',
          description: 'Blazingly fast, totally extendable launcher for macOS. Essential for developer productivity.',
          type: 'Tool',
          price: 'Free',
          rating: 4.9,
          url: 'https://raycast.com',
          icon: Zap
        },
        {
          id: '7',
          title: 'Figma - Design & Prototyping',
          description: 'Collaborative interface design tool. Industry standard for UI/UX design.',
          type: 'Tool',
          price: 'Free - $12/month',
          rating: 4.7,
          url: 'https://figma.com',
          icon: Palette
        },
        {
          id: '8',
          title: 'Notion - All-in-One Workspace',
          description: 'The all-in-one workspace for notes, docs, projects, and team collaboration.',
          type: 'Tool',
          price: 'Free - $8/month',
          rating: 4.6,
          url: 'https://notion.so',
          icon: BookOpen
        }
      ]
    },
    {
      id: 'business',
      title: 'Business & Legal',
      description: 'Templates and guides for business operations',
      icon: Briefcase,
      resources: [
        {
          id: '9',
          title: 'SaaS MVP Roadmap Template',
          description: 'Complete roadmap template for building and launching a SaaS MVP in 90 days.',
          type: 'Template',
          author: 'Notion',
          rating: 4.9,
          url: 'https://notion.so/saas-template',
          icon: Target,
          featured: true
        },
        {
          id: '10',
          title: 'Technical Co-founder Agreement',
          description: 'Comprehensive legal template for technical co-founder partnerships.',
          type: 'Template',
          author: 'Google Docs',
          rating: 4.8,
          url: 'https://docs.google.com/cofounder-template',
          icon: FileText
        },
        {
          id: '11',
          title: 'Equity Split Framework for Technical Teams',
          description: 'Data-driven approach to fairly distributing equity among technical co-founders.',
          type: 'Blog Post',
          author: 'Y Combinator',
          rating: 4.8,
          url: 'https://ycombinator.com/equity',
          icon: DollarSign
        },
        {
          id: '12',
          title: 'Remote Team Management Guide',
          description: 'How to build and manage high-performing remote development teams.',
          type: 'Blog Post',
          author: 'GitLab',
          rating: 4.7,
          url: 'https://gitlab.com/remote-guide',
          icon: Globe
        }
      ]
    },
    {
      id: 'hardware',
      title: 'Hardware & Products',
      description: 'Recommended hardware and affiliate products',
      icon: Monitor,
      resources: [
        {
          id: '13',
          title: 'Tern Portable Monitor Setup',
          description: 'Professional portable monitor setup for remote developers and indie hackers. Perfect for coding on the go.',
          type: 'Product',
          price: '$299',
          commission: '8%',
          rating: 4.9,
          url: 'https://tern.com/portable-setup',
          icon: Monitor,
          featured: true
        },
        {
          id: '14',
          title: 'Ergonomic Standing Desk',
          description: 'Adjustable standing desk with memory presets. Perfect for long coding sessions.',
          type: 'Product',
          price: '$599',
          commission: '12%',
          rating: 4.8,
          url: 'https://standingdesk.com/ergonomic',
          icon: Monitor
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Video Channel': return 'text-red-600 bg-red-50';
      case 'Blog Post': return 'text-blue-600 bg-blue-50';
      case 'Tool': return 'text-purple-600 bg-purple-50';
      case 'Template': return 'text-green-600 bg-green-50';
      case 'Product': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Channel': return <Video className="w-4 h-4" />;
      case 'Blog Post': return <FileText className="w-4 h-4" />;
      case 'Tool': return <Wrench className="w-4 h-4" />;
      case 'Template': return <Target className="w-4 h-4" />;
      case 'Product': return <ShoppingCart className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Resource Hub</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Curated tools, guides, and resources to help you build, grow, and succeed as an indie developer
        </p>
      </div>

      {/* Featured Resources Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Featured Resources</h3>
              <p className="text-muted-foreground">Hand-picked resources to get you started</p>
            </div>
            <Button variant="outline" asChild>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Explore All
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resource Sections */}
      <div className="space-y-12">
        {resourceSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <div key={section.id} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <SectionIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <p className="text-muted-foreground">{section.description}</p>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.resources.map((resource) => {
                  const ResourceIcon = resource.icon;
                  return (
                    <Card 
                      key={resource.id} 
                      className={`hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                        resource.featured ? 'ring-2 ring-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50' : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              resource.featured 
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                                : 'bg-gradient-to-br from-gray-100 to-gray-200'
                            }`}>
                              <ResourceIcon className={`w-5 h-5 ${
                                resource.featured ? 'text-white' : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex items-center gap-2">
                              {resource.featured && (
                                <Badge className="text-blue-600 bg-blue-50 text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              <Badge className={getTypeColor(resource.type)}>
                                {getTypeIcon(resource.type)}
                                <span className="ml-1 text-xs">{resource.type}</span>
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div>
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                              {resource.description}
                            </p>
                          </div>

                          {/* Meta Info */}
                          <div className="space-y-2">
                            {resource.author && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>By {resource.author}</span>
                              </div>
                            )}
                            {resource.price && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">{resource.price}</span>
                                {resource.commission && (
                                  <Badge className="text-green-600 bg-green-50 text-xs">
                                    {resource.commission} commission
                                  </Badge>
                                )}
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {resource.rating}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Button size="sm" className="flex-1" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {resource.type === 'Product' ? 'View Product' : 
                                 resource.type === 'Tool' ? 'Try Tool' : 
                                 resource.type === 'Template' ? 'Download' : 
                                 resource.type === 'Video Channel' ? 'Watch' : 'Read More'}
                              </a>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16" asChild>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer">
                <Users className="w-5 h-5 mr-2" />
                Join Indie Hackers
              </a>
            </Button>
            <Button variant="outline" className="h-16" asChild>
              <a href="https://ycombinator.com" target="_blank" rel="noopener noreferrer">
                <Rocket className="w-5 h-5 mr-2" />
                Y Combinator Resources
              </a>
            </Button>
            <Button variant="outline" className="h-16" asChild>
              <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer">
                <TrendingUp className="w-5 h-5 mr-2" />
                Discover Products
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage; 