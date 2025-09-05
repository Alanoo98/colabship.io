import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  FileCheck, 
  Lock, 
  TrendingUp,
  Download,
  Eye,
  Edit,
  Plus,
  Clock,
  CheckCircle
} from 'lucide-react';

const LegalTemplatesPage: React.FC = () => {
  const templates = [
    {
      id: 'nda',
      title: 'NDA Templates',
      description: 'Non-disclosure agreements for protecting confidential information',
      icon: Shield,
      category: 'Confidentiality',
      templates: [
        {
          name: 'Standard NDA',
          description: 'Basic non-disclosure agreement for general use',
          lastUpdated: '2024-01-15',
          downloads: 45,
          status: 'active'
        },
        {
          name: 'Technical NDA',
          description: 'Specialized NDA for technical collaborations',
          lastUpdated: '2024-01-10',
          downloads: 23,
          status: 'active'
        }
      ]
    },
    {
      id: 'contracts',
      title: 'Collaboration Contracts',
      description: 'Agreements for co-founder partnerships and team collaborations',
      icon: FileCheck,
      category: 'Partnerships',
      templates: [
        {
          name: 'Co-founder Agreement',
          description: 'Comprehensive agreement for co-founder relationships',
          lastUpdated: '2024-01-20',
          downloads: 67,
          status: 'active'
        },
        {
          name: 'Team Collaboration Contract',
          description: 'Contract for team member collaborations',
          lastUpdated: '2024-01-18',
          downloads: 34,
          status: 'active'
        }
      ]
    },
    {
      id: 'ip',
      title: 'IP Agreements',
      description: 'Intellectual property protection and ownership agreements',
      icon: Lock,
      category: 'Intellectual Property',
      templates: [
        {
          name: 'IP Assignment Agreement',
          description: 'Transfer of intellectual property rights',
          lastUpdated: '2024-01-12',
          downloads: 28,
          status: 'active'
        },
        {
          name: 'IP License Agreement',
          description: 'Licensing of intellectual property',
          lastUpdated: '2024-01-08',
          downloads: 19,
          status: 'active'
        }
      ]
    },
    {
      id: 'revenue',
      title: 'Revenue Sharing',
      description: 'Agreements for profit sharing and revenue distribution',
      icon: TrendingUp,
      category: 'Financial',
      templates: [
        {
          name: 'Revenue Sharing Agreement',
          description: 'Standard revenue sharing terms',
          lastUpdated: '2024-01-25',
          downloads: 52,
          status: 'active'
        },
        {
          name: 'Profit Distribution Contract',
          description: 'Detailed profit distribution framework',
          lastUpdated: '2024-01-22',
          downloads: 31,
          status: 'active'
        }
      ]
    }
  ];

  const recentDocuments = [
    {
      id: '1',
      name: 'AI Task Manager - Co-founder Agreement',
      type: 'Collaboration Contract',
      lastModified: '2 hours ago',
      status: 'draft'
    },
    {
      id: '2',
      name: 'EcoTrack Pro - NDA',
      type: 'NDA',
      lastModified: '1 day ago',
      status: 'signed'
    },
    {
      id: '3',
      name: 'FinFlow App - Revenue Sharing',
      type: 'Revenue Agreement',
      lastModified: '3 days ago',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'draft': return 'text-yellow-600 bg-yellow-50';
      case 'signed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Legal Templates</h1>
        <p className="text-muted-foreground mt-1">
          Access professional legal templates for your collaborations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Documents</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold">298</p>
              </div>
              <Download className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.templates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {template.lastUpdated}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Download className="w-3 h-3 inline mr-1" />
                            {template.downloads} downloads
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New {category.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{doc.lastModified}</span>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalTemplatesPage; 