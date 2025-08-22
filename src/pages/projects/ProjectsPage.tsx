import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Calendar, 
  MapPin, 
  Tag,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Star,
  Clock,
  DollarSign,
  Target,
  Zap,
  Lightbulb,
  Rocket,
  Code,
  Palette,
  BarChart3,
  Globe,
  Bookmark,
  User,
  Briefcase,
  Timer,
  Award,
  ChevronDown,
  ChevronUp,
  Grid3X3,
  List,
  TrendingUp,
  FilterX,
  Save,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HackerText from "@/components/common/HackerText";
import ScrollReveal from "@/components/common/ScrollReveal";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'completed' | 'paused' | 'idea' | 'mvp' | 'growth' | 'scale';
  teamSize: number;
  lookingFor: string[];
  location: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  founder: {
    name: string;
    avatar: string;
    experience: string;
    portfolio: string[];
  };
  compensation: string;
  timeCommitment: string;
  collaborationStyle: string;
  matchScore?: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

interface FilterState {
  search: string;
  category: string;
  status: string;
  location: string;
  teamSize: string;
  timeCommitment: string;
  compensation: string;
  skills: string[];
  experienceLevel: string;
  collaborationStyle: string;
  minMatchScore: number;
  sortBy: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Task Manager",
    description: "A smart task management app that uses AI to prioritize and organize your work. Features include intelligent scheduling, progress tracking, and team collaboration. We're looking for passionate developers to help us build the future of productivity.",
    category: "Productivity",
    status: "mvp",
    teamSize: 3,
    lookingFor: ["Frontend Developer", "AI/ML Engineer", "UX Designer"],
    location: "Remote",
    createdAt: "2024-01-15",
    views: 1247,
    likes: 89,
    comments: 23,
    tags: ["AI", "React", "Python", "Productivity", "Machine Learning"],
    founder: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years",
      portfolio: ["TaskFlow SaaS", "DataViz Analytics"]
    },
    compensation: "15% equity + $2k/month",
    timeCommitment: "20 hours/week",
    collaborationStyle: "Async-first with weekly syncs",
    matchScore: 95,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: "2",
    title: "Sustainable Food Delivery",
    description: "A food delivery platform focused on sustainability. We partner with local farms and use eco-friendly packaging to reduce environmental impact. Join us in making food delivery greener!",
    category: "Food & Beverage",
    status: "growth",
    teamSize: 5,
    lookingFor: ["Backend Developer", "UX Designer", "Marketing Specialist"],
    location: "San Francisco, CA",
    createdAt: "2024-01-10",
    views: 892,
    likes: 67,
    comments: 15,
    tags: ["Sustainability", "Food", "Mobile App", "Green Tech"],
    founder: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      experience: "3+ years",
      portfolio: ["Mobile Banking App", "E-commerce Platform"]
    },
    compensation: "20% equity",
    timeCommitment: "15 hours/week",
    collaborationStyle: "Hybrid - async with regular check-ins",
    matchScore: 87,
    isBookmarked: true,
    isLiked: true
  },
  {
    id: "3",
    title: "Mental Health Companion App",
    description: "A mobile app that provides mental health support through AI-powered conversations, mood tracking, and connection to licensed therapists. Help us make mental health accessible to everyone.",
    category: "Healthcare",
    status: "idea",
    teamSize: 4,
    lookingFor: ["Mobile Developer", "Clinical Psychologist", "UI Designer"],
    location: "Remote",
    createdAt: "2024-01-08",
    views: 1567,
    likes: 134,
    comments: 31,
    tags: ["Mental Health", "AI", "Mobile", "Healthcare"],
    founder: {
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "4+ years",
      portfolio: ["HealthTech Startup", "Telemedicine Platform"]
    },
    compensation: "25% equity + revenue share",
    timeCommitment: "25 hours/week",
    collaborationStyle: "Synchronous with flexible hours",
    matchScore: 78,
    isBookmarked: false,
    isLiked: false
  },
  {
    id: "4",
    title: "Blockchain Supply Chain Tracker",
    description: "A blockchain-based platform for tracking supply chains in real-time. Ensures transparency and authenticity of products from source to consumer. Revolutionizing supply chain management.",
    category: "Blockchain",
    status: "mvp",
    teamSize: 6,
    lookingFor: ["Blockchain Developer", "Full Stack Developer", "Business Analyst"],
    location: "New York, NY",
    createdAt: "2024-01-05",
    views: 2341,
    likes: 156,
    comments: 42,
    tags: ["Blockchain", "Supply Chain", "Web3", "Enterprise"],
    founder: {
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      experience: "6+ years",
      portfolio: ["DeFi Protocol", "Enterprise SaaS"]
    },
    compensation: "18% equity + $3k/month",
    timeCommitment: "30 hours/week",
    collaborationStyle: "Structured sprints with daily standups",
    matchScore: 92,
    isBookmarked: false,
    isLiked: true
  },
  {
    id: "5",
    title: "AR Interior Design Platform",
    description: "Augmented reality platform for interior design. Users can visualize furniture and decor in their space before purchasing. Making interior design accessible and fun!",
    category: "Design",
    status: "growth",
    teamSize: 4,
    lookingFor: ["AR/VR Developer", "3D Artist", "Product Manager"],
    location: "Los Angeles, CA",
    createdAt: "2024-01-03",
    views: 987,
    likes: 73,
    comments: 18,
    tags: ["AR/VR", "Design", "3D", "Mobile"],
    founder: {
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      experience: "4+ years",
      portfolio: ["Design Agency", "Mobile App Studio"]
    },
    compensation: "22% equity + $2.5k/month",
    timeCommitment: "18 hours/week",
    collaborationStyle: "Creative sessions + async work",
    matchScore: 85,
    isBookmarked: true,
    isLiked: false
  },
  {
    id: "6",
    title: "FinTech Budgeting Tool",
    description: "Personal finance app that automatically categorizes expenses and provides AI-driven financial insights and budgeting recommendations. Empowering people to take control of their finances.",
    category: "FinTech",
    status: "idea",
    teamSize: 3,
    lookingFor: ["React Native Developer", "Firebase Expert", "UI/UX Designer"],
    location: "Remote",
    createdAt: "2024-01-01",
    views: 756,
    likes: 45,
    comments: 12,
    tags: ["FinTech", "Mobile", "AI", "Personal Finance"],
    founder: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      experience: "3+ years",
      portfolio: ["Payment Gateway", "Investment App"]
    },
    compensation: "30% equity",
    timeCommitment: "12 hours/week",
    collaborationStyle: "Flexible async with weekly reviews",
    matchScore: 73,
    isBookmarked: false,
    isLiked: false
  }
];

const categories = [
  "All Categories",
  "Productivity",
  "Food & Beverage", 
  "Healthcare",
  "Blockchain",
  "Design",
  "FinTech",
  "Education",
  "Entertainment",
  "E-commerce",
  "Social Media",
  "IoT",
  "AI/ML"
];

const statuses = [
  "All Stages",
  "idea",
  "mvp", 
  "growth",
  "scale",
  "completed",
  "paused"
];

const locations = [
  "All Locations",
  "Remote",
  "San Francisco, CA",
  "New York, NY", 
  "Los Angeles, CA",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA"
];

const teamSizes = [
  "Any Size",
  "1-2 people",
  "3-5 people",
  "6-10 people",
  "10+ people"
];

const timeCommitments = [
  "Any Time",
  "5-10 hours/week",
  "10-20 hours/week", 
  "20-30 hours/week",
  "30+ hours/week"
];

const compensationTypes = [
  "Any Compensation",
  "Equity only",
  "Salary only",
  "Equity + Salary",
  "Revenue share",
  "Freelance rate"
];

const skills = [
  "React", "Node.js", "Python", "JavaScript", "TypeScript", "AWS", "Docker",
  "UI/UX Design", "Mobile Development", "AI/ML", "Blockchain", "DevOps",
  "Product Management", "Marketing", "Sales", "Data Science", "GraphQL",
  "Firebase", "MongoDB", "PostgreSQL", "Redis", "Kubernetes", "Terraform"
];

const experienceLevels = [
  "Any Level",
  "Junior (0-2 years)",
  "Mid-level (2-5 years)", 
  "Senior (5+ years)",
  "Expert (8+ years)"
];

const collaborationStyles = [
  "Any Style",
  "Async-first",
  "Synchronous",
  "Hybrid",
  "Structured sprints",
  "Flexible"
];

const ProjectsPage = () => {
  const location = useLocation();
  const isInDashboard = location.pathname.startsWith('/dashboard');
  
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All Categories",
    status: "All Stages", 
    location: "All Locations",
    teamSize: "Any Size",
    timeCommitment: "Any Time",
    compensation: "Any Compensation",
    skills: [],
    experienceLevel: "Any Level",
    collaborationStyle: "Any Style",
    minMatchScore: 0,
    sortBy: "relevance"
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Filter projects based on current filters
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = filters.search === "" || 
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase())) ||
      project.founder.name.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory = filters.category === "All Categories" || project.category === filters.category;
    const matchesStatus = filters.status === "All Stages" || project.status === filters.status;
    const matchesLocation = filters.location === "All Locations" || project.location === filters.location;
    const matchesTeamSize = filters.teamSize === "Any Size" || 
      (filters.teamSize === "1-2 people" && project.teamSize <= 2) ||
      (filters.teamSize === "3-5 people" && project.teamSize >= 3 && project.teamSize <= 5) ||
      (filters.teamSize === "6-10 people" && project.teamSize >= 6 && project.teamSize <= 10) ||
      (filters.teamSize === "10+ people" && project.teamSize > 10);

    const matchesTimeCommitment = filters.timeCommitment === "Any Time" || 
      project.timeCommitment === filters.timeCommitment;

    const matchesCompensation = filters.compensation === "Any Compensation" || 
      project.compensation.toLowerCase().includes(filters.compensation.toLowerCase().replace(" only", ""));

    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => 
        project.lookingFor.some(role => role.toLowerCase().includes(skill.toLowerCase())) ||
        project.tags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
      );

    const matchesExperience = filters.experienceLevel === "Any Level" || 
      project.founder.experience.includes(filters.experienceLevel.split(" ")[1]?.replace("(", "").replace(")", ""));

    const matchesCollaboration = filters.collaborationStyle === "Any Style" || 
      project.collaborationStyle.toLowerCase().includes(filters.collaborationStyle.toLowerCase());

    const matchesScore = !project.matchScore || project.matchScore >= filters.minMatchScore;

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation && 
           matchesTeamSize && matchesTimeCommitment && matchesCompensation && 
           matchesSkills && matchesExperience && matchesCollaboration && matchesScore;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (filters.sortBy) {
      case 'relevance':
        return (b.matchScore || 0) - (a.matchScore || 0);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalItems = sortedProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = sortedProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, itemsPerPage]);

  const handleBookmark = (projectId: string) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleLike = (projectId: string) => {
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All Categories",
      status: "All Stages",
      location: "All Locations", 
      teamSize: "Any Size",
      timeCommitment: "Any Time",
      compensation: "Any Compensation",
      skills: [],
      experienceLevel: "Any Level",
      collaborationStyle: "Any Style",
      minMatchScore: 0,
      sortBy: "relevance"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-blue-100 text-blue-800';
      case 'mvp': return 'bg-yellow-100 text-yellow-800';
      case 'growth': return 'bg-green-100 text-green-800';
      case 'scale': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'idea': return 'Idea Stage';
      case 'mvp': return 'MVP';
      case 'growth': return 'Growth';
      case 'scale': return 'Scale';
      case 'completed': return 'Completed';
      case 'paused': return 'Paused';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!isInDashboard && <Header />}
      
      <main className={isInDashboard ? "" : "pt-20"}>
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            {showFilters && (
              <div className="w-80 flex-shrink-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Filters</span>
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <FilterX className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search */}
                    <div>
                      <Label className="text-sm font-medium">Search</Label>
                      <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search projects..."
                          value={filters.search}
                          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div>
                      <Label className="text-sm font-medium">Project Stage</Label>
                      <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                              {status === "All Stages" ? status : getStatusLabel(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(location => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Team Size */}
                    <div>
                      <Label className="text-sm font-medium">Team Size</Label>
                      <Select value={filters.teamSize} onValueChange={(value) => setFilters(prev => ({ ...prev, teamSize: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {teamSizes.map(size => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      </div>
                      
                    {/* Time Commitment */}
                      <div>
                      <Label className="text-sm font-medium">Time Commitment</Label>
                      <Select value={filters.timeCommitment} onValueChange={(value) => setFilters(prev => ({ ...prev, timeCommitment: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeCommitments.map(time => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                        </div>

                    {/* Compensation */}
                    <div>
                      <Label className="text-sm font-medium">Compensation</Label>
                      <Select value={filters.compensation} onValueChange={(value) => setFilters(prev => ({ ...prev, compensation: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {compensationTypes.map(comp => (
                            <SelectItem key={comp} value={comp}>
                              {comp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      </div>

                    {/* Skills */}
                    <div>
                      <Label className="text-sm font-medium">Skills</Label>
                      <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                        {skills.map(skill => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={filters.skills.includes(skill)}
                              onCheckedChange={(checked) => {
                                setFilters(prev => ({
                                  ...prev,
                                  skills: checked 
                                    ? [...prev.skills, skill]
                                    : prev.skills.filter(s => s !== skill)
                                }));
                              }}
                            />
                            <Label htmlFor={skill} className="text-sm">{skill}</Label>
                          </div>
                        ))}
                      </div>
                        </div>

                    {/* Experience Level */}
                    <div>
                      <Label className="text-sm font-medium">Founder Experience</Label>
                      <Select value={filters.experienceLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map(level => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                        </div>

                    {/* Collaboration Style */}
                    <div>
                      <Label className="text-sm font-medium">Collaboration Style</Label>
                      <Select value={filters.collaborationStyle} onValueChange={(value) => setFilters(prev => ({ ...prev, collaborationStyle: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {collaborationStyles.map(style => (
                            <SelectItem key={style} value={style}>
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      </div>

                    {/* Match Score */}
                    <div>
                      <Label className="text-sm font-medium">Minimum Match Score: {filters.minMatchScore}%</Label>
                      <Slider
                        value={[filters.minMatchScore]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, minMatchScore: value[0] }))}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                      </div>

                    {/* Sort By */}
                    <div>
                      <Label className="text-sm font-medium">Sort By</Label>
                      <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Best Match</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="likes">Most Liked</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {totalItems} {totalItems === 1 ? 'Project' : 'Projects'} Found
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Showing results for your search criteria
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Projects Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project}
                      onBookmark={handleBookmark}
                      onLike={handleLike}
                      isBookmarked={bookmarkedProjects.includes(project.id)}
                      isLiked={likedProjects.includes(project.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedProjects.map((project) => (
                    <ProjectListCard 
                      key={project.id} 
                      project={project}
                      onBookmark={handleBookmark}
                      onLike={handleLike}
                      isBookmarked={bookmarkedProjects.includes(project.id)}
                      isLiked={likedProjects.includes(project.id)}
                    />
              ))}
            </div>
              )}

              {totalItems === 0 && (
              <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalItems > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
                  {/* Items per page selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Show:</span>
                    <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">per page</span>
                  </div>

                  {/* Page info */}
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} projects
                  </div>

                  {/* Pagination buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
                </div>
              </div>
        </div>
      </main>
      
      {!isInDashboard && <Footer />}
    </div>
  );
};

// Project Card Component (Grid View)
const ProjectCard: React.FC<{
  project: Project;
  onBookmark: (id: string) => void;
  onLike: (id: string) => void;
  isBookmarked: boolean;
  isLiked: boolean;
}> = ({ project, onBookmark, onLike, isBookmarked, isLiked }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(project.status)}>
                {getStatusLabel(project.status)}
              </Badge>
              {project.matchScore && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {project.matchScore}% Match
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg group-hover:text-accent transition-colors">
              {project.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(project.id);
              }}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-accent' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onLike(project.id);
              }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {project.location}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {project.teamSize} people
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {project.timeCommitment}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={project.founder.avatar} />
              <AvatarFallback>{project.founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{project.founder.name}</span>
            <Badge variant="outline" className="text-xs">
              {project.founder.experience}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium mb-1">Looking for:</p>
            <div className="flex flex-wrap gap-1">
              {project.lookingFor.slice(0, 3).map((role) => (
                <Badge key={role} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
              {project.lookingFor.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.lookingFor.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {project.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {project.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {project.comments}
            </div>
          </div>
          <Button size="sm">
            <MessageSquare className="w-4 h-4 mr-1" />
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Project List Card Component (List View)
const ProjectListCard: React.FC<{
  project: Project;
  onBookmark: (id: string) => void;
  onLike: (id: string) => void;
  isBookmarked: boolean;
  isLiked: boolean;
}> = ({ project, onBookmark, onLike, isBookmarked, isLiked }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                  {project.matchScore && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {project.matchScore}% Match
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors mb-2">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark(project.id);
                  }}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-accent' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(project.id);
                  }}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{project.teamSize} people</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{project.timeCommitment}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{project.compensation}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={project.founder.avatar} />
                  <AvatarFallback>{project.founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{project.founder.name}</span>
                <Badge variant="outline" className="text-xs">
                  {project.founder.experience}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.lookingFor.slice(0, 4).map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
                {project.lookingFor.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.lookingFor.length - 4} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {project.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {project.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {project.comments}
                  </div>
                </div>
                <Button>
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'idea': return 'bg-blue-100 text-blue-800';
    case 'mvp': return 'bg-yellow-100 text-yellow-800';
    case 'growth': return 'bg-green-100 text-green-800';
    case 'scale': return 'bg-purple-100 text-purple-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    case 'paused': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'idea': return 'Idea Stage';
    case 'mvp': return 'MVP';
    case 'growth': return 'Growth';
    case 'scale': return 'Scale';
    case 'completed': return 'Completed';
    case 'paused': return 'Paused';
    default: return status;
  }
};

export default ProjectsPage; 