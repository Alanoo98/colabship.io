import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Eye, 
  MessageSquare, 
  Star,
  Calendar,
  MapPin,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
  Rocket
} from "lucide-react";
import { useFounder } from "../context/FounderContext";
import { FounderProfile, Application, Match } from "../types/founder";
import ScrollReveal from "@/components/common/ScrollReveal";

const FounderDashboard = () => {
  const { 
    founderProfiles, 
    applications, 
    matches, 
    generateMatches,
    updateFounderProfile,
    deleteFounderProfile,
    updateApplicationStatus 
  } = useFounder();
  
  const [activeTab, setActiveTab] = useState("overview");

  const handleGenerateMatches = (profileId: string) => {
    const newMatches = generateMatches(profileId);
    console.log("Generated matches:", newMatches);
  };

  const handleApplicationAction = (applicationId: string, action: 'accept' | 'reject') => {
    const status = action === 'accept' ? 'accepted' : 'rejected';
    updateApplicationStatus(applicationId, status);
  };

  const getApplicationCount = (profileId: string) => {
    return applications.filter(app => app.founderProfileId === profileId).length;
  };

  const getPendingApplications = (profileId: string) => {
    return applications.filter(app => 
      app.founderProfileId === profileId && app.status === 'pending'
    );
  };

  const getProfileMatches = (profileId: string) => {
    return matches.filter(match => match.founderProfile.projectName === profileId);
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Founder Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your projects and collaborate with builders
            </p>
          </div>
          <Button className="glow-green">
            <Users className="w-4 h-4 mr-2" />
            Create New Project
          </Button>
        </div>
      </ScrollReveal>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Active Projects</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{founderProfiles.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Total Applications</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{applications.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Potential Matches</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{matches.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Profile Views</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {founderProfiles.reduce((total, profile) => total + profile.views, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">New application received</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(application.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={application.status === 'pending' ? 'default' : 'secondary'}>
                          {application.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No recent activity. Create a project to get started!
                  </p>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <ScrollReveal>
            {founderProfiles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {founderProfiles.map((profile) => (
                  <Card key={profile.projectName} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {profile.projectName}
                            <Badge variant={profile.status === 'active' ? 'default' : 'secondary'}>
                              {profile.status}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {profile.projectCategory} • {profile.projectStage}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {profile.projectDescription}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{profile.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{getApplicationCount(profile.projectName)} applications</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{getProfileMatches(profile.projectName).length} matches</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleGenerateMatches(profile.projectName)}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Find Matches
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Rocket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first project to start finding collaborators
                  </p>
                  <Button className="glow-green">
                    <Rocket className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <ScrollReveal>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Application for {application.founderProfileId}</h3>
                            <Badge variant={
                              application.status === 'pending' ? 'default' :
                              application.status === 'accepted' ? 'default' :
                              'secondary'
                            }>
                              {application.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {application.message}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Timeline:</span> {application.timeline}
                            </div>
                            <div>
                              <span className="font-medium">Availability:</span> {application.availability}
                            </div>
                            <div>
                              <span className="font-medium">Portfolio:</span> {application.portfolio.length} projects
                            </div>
                          </div>
                        </div>
                        
                        {application.status === 'pending' && (
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" onClick={() => handleApplicationAction(application.id, 'accept')}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleApplicationAction(application.id, 'reject')}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                  <p className="text-muted-foreground">
                    Applications from potential collaborators will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <ScrollReveal>
            {matches.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {matches.map((match, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {match.collaboratorProfile.name}
                            <Badge variant="outline" className="text-accent">
                              {match.matchScore}% Match
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {match.collaboratorProfile.roles.join(', ')}
                          </p>
                        </div>
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {match.collaboratorProfile.bio}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{match.collaboratorProfile.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{match.collaboratorProfile.timeCommitment}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{match.collaboratorProfile.yearsOfExperience} years exp.</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          <span>{match.collaboratorProfile.completedProjects} projects</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Match Reasons:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.matchReasons.map((reason, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Matches Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate matches for your projects to find potential collaborators
                  </p>
                  <Button className="glow-green">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Matches
                  </Button>
                </CardContent>
              </Card>
            )}
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FounderDashboard; 