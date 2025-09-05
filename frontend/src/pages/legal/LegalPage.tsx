import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Scale, 
  FileText, 
  Shield, 
  Users, 
  DollarSign, 
  Clock,
  Download,
  Copy,
  Eye,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  Globe,
  Calendar,
  MapPin,
  Building,
  User,
  Lock,
  Gavel,
  FileCheck,
  DownloadCloud,
  Printer,
  Share2,
  Settings,
  Zap,
  Star,
  TrendingUp,
  BookOpen,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Target,
  Briefcase,
  Plus,
  FolderOpen,
  History,
  Star as StarIcon
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalDocumentGenerator from "@/features/legal/components/LegalDocumentGenerator";
import FAQ from "@/components/common/FAQ";
import ScrollReveal from "@/components/common/ScrollReveal";

const LegalPage = () => {
  const [activeTab, setActiveTab] = useState("workspace");

  // Mock recent documents
  const recentDocuments = [
    {
      id: 1,
      name: "NDA - Tech Startup Discussion",
      type: "NDA",
      status: "draft",
      lastModified: "2 hours ago",
      parties: ["Acme Corp", "Tech Startup"]
    },
    {
      id: 2,
      name: "Founder Agreement - Mobile App",
      type: "Founder Agreement",
      status: "reviewed",
      lastModified: "1 day ago",
      parties: ["John Doe", "Jane Smith"]
    },
    {
      id: 3,
      name: "IP Assignment - Web Platform",
      type: "IP Agreement",
      status: "signed",
      lastModified: "3 days ago",
      parties: ["Company Inc", "Developer"]
    }
  ];

  const quickActions = [
    {
      title: "Create NDA",
      description: "Non-disclosure agreement for early discussions",
      icon: Lock,
      color: "bg-blue-500",
      action: () => setActiveTab("generator")
    },
    {
      title: "Founder Agreement",
      description: "Equity splits and team formation",
      icon: Users,
      color: "bg-green-500",
      action: () => setActiveTab("generator")
    },
    {
      title: "IP Assignment",
      description: "Intellectual property transfer",
      icon: Shield,
      color: "bg-purple-500",
      action: () => setActiveTab("generator")
    },
    {
      title: "Term Sheet",
      description: "Investment or collaboration terms",
      icon: FileText,
      color: "bg-orange-500",
      action: () => setActiveTab("generator")
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Gavel className="w-6 h-6 text-accent" />
                  Legal Workspace
                </h1>
                <p className="text-muted-foreground mt-1">
                  Generate, manage, and track your legal documents
                </p>
              </div>
              <Button className="glow-green">
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="workspace" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Workspace
              </TabsTrigger>
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generator
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workspace" className="space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={action.action}>
                      <CardContent className="p-4">
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Recent Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.parties.join(" & ")} • {doc.lastModified}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Legal Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Documents</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Signed</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Review</p>
                        <p className="text-2xl font-bold">4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="generator" className="space-y-6">
              <LegalDocumentGenerator />
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Legal Guide for Startups",
                    description: "Comprehensive guide covering all legal aspects of starting and running a startup",
                    icon: BookOpen,
                    category: "guide",
                    estimatedTime: "30 min read"
                  },
                  {
                    title: "Equity Distribution Calculator",
                    description: "Tool to help founders calculate fair equity splits based on contribution and risk",
                    icon: TrendingUp,
                    category: "tool",
                    estimatedTime: "5 min"
                  },
                  {
                    title: "Vesting Schedule Templates",
                    description: "Ready-to-use vesting schedules for different team structures",
                    icon: Calendar,
                    category: "template",
                    estimatedTime: "10 min"
                  },
                  {
                    title: "International Legal Considerations",
                    description: "Guide to legal requirements when working with international collaborators",
                    icon: Globe,
                    category: "guide",
                    estimatedTime: "20 min read"
                  },
                  {
                    title: "IP Protection Strategies",
                    description: "Best practices for protecting your intellectual property",
                    icon: Shield,
                    category: "guide",
                    estimatedTime: "15 min read"
                  },
                  {
                    title: "Contract Negotiation Tips",
                    description: "How to negotiate fair terms for your collaborations",
                    icon: MessageSquare,
                    category: "guide",
                    estimatedTime: "10 min read"
                  }
                ].map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4">
                            <Icon className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {resource.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.estimatedTime}
                          </span>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <FAQ 
                title="Legal FAQ"
                description="Find answers to common legal questions about collaborations, agreements, and protection"
                showSearch={true}
                showCategories={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalPage; 