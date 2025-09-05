import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageSquare, 
  Star, 
  Filter, 
  Users, 
  MapPin, 
  Clock, 
  Zap,
  ChevronLeft,
  ChevronRight,
  Eye,
  Bookmark
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { Label } from '@/components/ui/label';

// Define MatchResult interface
interface MatchResult {
  user: {
    id: string;
    name: string;
    bio: string;
    avatar_url?: string;
    timezone: string;
    availability_hours: number;
    experience_level: string;
    offers: Array<{
      skill_id: number;
      skill_name: string;
      proficiency: number;
    }>;
    needs: Array<{
      skill_id: number;
      skill_name: string;
      must_have: boolean;
      priority: number;
    }>;
  };
  score: number;
  complementarity: {
    must_have_matches: string[];
    skill_matches: string[];
    availability_match: boolean;
    timezone_match: boolean;
    collab_style_match: boolean;
    personality_match: boolean;
  };
  breakdown: {
    skill_score: number;
    availability_score: number;
    timezone_score: number;
    collab_style_score: number;
    personality_score: number;
  };
}

interface MatchDashboardProps {
  viewMode?: 'list' | 'swipe';
}

// Helper functions
const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-100';
  if (score >= 60) return 'text-blue-600 bg-blue-100';
  if (score >= 40) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

const MatchDashboard: React.FC<MatchDashboardProps> = ({ viewMode = 'list' }) => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filters
  const [filters, setFilters] = useState({
    minScore: 0,
    mustHaveOnly: false,
    skillCategory: '',
    timezone: '',
    minAvailability: 0
  });
  
  // View state
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);

  useEffect(() => {
    if (user) {
      loadMatches();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [matches, filters]);

  const loadMatches = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Load potential matches from backend
      const response = await apiClient.getPotentialMatches(1, 50);
      const matchesData = (response as any).matches.map((match: any) => ({
        user: match,
        score: match.matchScore || 0,
        complementarity: {
          must_have_matches: [],
          skill_matches: [],
          availability_match: true,
          timezone_match: true,
          collab_style_match: true,
          personality_match: true
        },
        breakdown: {
          skill_score: match.matchScore || 0,
          availability_score: 80,
          timezone_score: 70,
          collab_style_score: 60,
          personality_score: 50
        }
      }));
      setMatches(matchesData);
    } catch (error) {
      console.log('Using mock data for demo purposes');
      // Fall back to mock data for demo
      const { generateMockMatches } = await import('@/lib/mock-data');
      const mockMatches = generateMockMatches();
      setMatches(mockMatches);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = matches;

    // Apply minimum score filter
    if (filters.minScore > 0) {
      filtered = filtered.filter(match => match.score >= filters.minScore);
    }

    // Apply must-have only filter
    if (filters.mustHaveOnly) {
      filtered = filtered.filter(match => 
        match.complementarity.must_have_matches.length > 0
      );
    }

    // Apply skill category filter
    if (filters.skillCategory) {
      filtered = filtered.filter(match => {
        const userSkills = match.user.offers.map(offer => 
          offer.skill_name.toLowerCase()
        );
        return userSkills.some(skill => 
          skill.includes(filters.skillCategory.toLowerCase())
        );
      });
    }

    // Apply timezone filter
    if (filters.timezone) {
      filtered = filtered.filter(match => {
        // Simple timezone matching - could be enhanced
        return match.user.timezone === filters.timezone;
      });
    }

    // Apply availability filter
    if (filters.minAvailability > 0) {
      filtered = filtered.filter(match => 
        match.user.availability_hours >= filters.minAvailability
      );
    }

    setFilteredMatches(filtered);
  };

  const handleLike = async (match: MatchResult) => {
    try {
      await apiClient.likeUser(match.user.id);
      console.log('Liked:', match.user.name);
      // Remove from current matches
      setMatches(prev => prev.filter(m => m.user.id !== match.user.id));
    } catch (error) {
      console.error('Error liking user:', error);
    }
  };

  const handleConnect = async (match: MatchResult) => {
    try {
      await apiClient.likeUser(match.user.id);
      console.log('Connected with:', match.user.name);
      // Remove from current matches
      setMatches(prev => prev.filter(m => m.user.id !== match.user.id));
    } catch (error) {
      console.error('Error connecting with user:', error);
    }
  };

  const handleSkip = () => {
    if (viewMode === 'swipe') {
      setCurrentIndex(prev => Math.min(prev + 1, filteredMatches.length - 1));
    }
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Finding your matches...</p>
        </div>
      </div>
    );
  }

  if (filteredMatches.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No matches found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or check back later for new potential collaborators.
          </p>
          <Button onClick={() => setFilters({
            minScore: 0,
            mustHaveOnly: false,
            skillCategory: '',
            timezone: '',
            minAvailability: 0
          })}>
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Matches</h2>
          <p className="text-muted-foreground">
            {filteredMatches.length} potential collaborators found
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          
          <Select value={viewMode} onValueChange={(value: 'list' | 'swipe') => {
            // TODO: Update view mode
          }}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="swipe">Swipe View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Minimum Score */}
              <div className="space-y-2">
                <Label>Minimum Match Score</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[filters.minScore]}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, minScore: value[0] }))}
                    max={100}
                    min={0}
                    step={10}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{filters.minScore}%</span>
                </div>
              </div>

              {/* Must Have Only */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="must-have-only"
                  checked={filters.mustHaveOnly}
                  onCheckedChange={(checked) => 
                    setFilters(prev => ({ ...prev, mustHaveOnly: checked as boolean }))
                  }
                />
                <Label htmlFor="must-have-only">Must-have skills only</Label>
              </div>

              {/* Skill Category */}
              <div className="space-y-2">
                <Label>Skill Category</Label>
                <Select 
                  value={filters.skillCategory} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, skillCategory: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select 
                  value={filters.timezone} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, timezone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any timezone</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Minimum Availability */}
              <div className="space-y-2">
                <Label>Minimum Availability (hours/week)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[filters.minAvailability]}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, minAvailability: value[0] }))}
                    max={40}
                    min={0}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{filters.minAvailability}h</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matches */}
      {viewMode === 'list' ? (
        <div className="grid gap-4">
          {filteredMatches.map((match, index) => (
            <MatchCard
              key={match.user.id}
              match={match}
              onLike={handleLike}
              onConnect={handleConnect}
              onView={() => setSelectedMatch(match)}
            />
          ))}
        </div>
      ) : (
        <SwipeView
          matches={filteredMatches}
          currentIndex={currentIndex}
          onLike={handleLike}
          onConnect={handleConnect}
          onSkip={handleSkip}
          onPrevious={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
          onNext={() => setCurrentIndex(prev => Math.min(prev + 1, filteredMatches.length - 1))}
        />
      )}

      {/* Match Detail Modal */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
};

// Match Card Component
const MatchCard: React.FC<{
  match: MatchResult;
  onLike: (match: MatchResult) => void;
  onConnect: (match: MatchResult) => void;
  onView: () => void;
}> = ({ match, onLike, onConnect, onView }) => {
  const { user } = match;
  
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onView}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
              
              <div className="text-right">
                <Badge className={`${getScoreColor(match.score)}`}>
                  {match.score}% {getScoreLabel(match.score)}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.timezone}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {user.availability_hours}h/week
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {user.experience_level}
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium mb-1">Skills they offer:</p>
                <div className="flex flex-wrap gap-1">
                  {user.offers.slice(0, 5).map((offer) => (
                    <Badge key={offer.skill_id} variant="secondary" className="text-xs">
                      {offer.skill_name}
                    </Badge>
                  ))}
                  {user.offers.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.offers.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              
              {match.complementarity.must_have_matches.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">
                    ✓ Fulfills your must-have skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {match.complementarity.must_have_matches.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                onLike(match);
              }}>
                <Heart className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button size="sm" onClick={(e) => {
                e.stopPropagation();
                onConnect(match);
              }}>
                <MessageSquare className="w-4 h-4 mr-1" />
                Connect
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Swipe View Component
const SwipeView: React.FC<{
  matches: MatchResult[];
  currentIndex: number;
  onLike: (match: MatchResult) => void;
  onConnect: (match: MatchResult) => void;
  onSkip: () => void;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ matches, currentIndex, onLike, onConnect, onSkip, onPrevious, onNext }) => {
  if (matches.length === 0) return null;
  
  const currentMatch = matches[currentIndex];
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="relative">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={currentMatch.user.avatar_url} />
              <AvatarFallback className="text-2xl">
                {currentMatch.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-xl font-semibold">{currentMatch.user.name}</h3>
              <p className="text-muted-foreground">{currentMatch.user.bio}</p>
            </div>
            
            <Badge className={`${getScoreColor(currentMatch.score)}`}>
              {currentMatch.score}% Match
            </Badge>
            
            <div className="space-y-2">
              <div className="flex justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {currentMatch.user.timezone}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentMatch.user.availability_hours}h/week
                </span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-1">
                {currentMatch.user.offers.slice(0, 3).map((offer) => (
                  <Badge key={offer.skill_id} variant="secondary" className="text-xs">
                    {offer.skill_name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={onPrevious} disabled={currentIndex === 0}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onSkip}>
                Skip
              </Button>
              <Button size="sm" onClick={() => onLike(currentMatch)}>
                <Heart className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button size="sm" onClick={() => onConnect(currentMatch)}>
                <MessageSquare className="w-4 h-4 mr-1" />
                Connect
              </Button>
              <Button variant="outline" size="sm" onClick={onNext} disabled={currentIndex === matches.length - 1}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {matches.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Match Detail Modal Component
const MatchDetailModal: React.FC<{
  match: MatchResult;
  onClose: () => void;
  onConnect: (match: MatchResult) => void;
}> = ({ match, onClose, onConnect }) => {
  const { user } = match;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Match Details</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.bio}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.timezone}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {user.availability_hours} hours/week
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {user.experience_level}
                </span>
              </div>
            </div>
            <Badge className={`${getScoreColor(match.score)}`}>
              {match.score}% Match
            </Badge>
          </div>
          
          {/* Skills Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Skills & Expertise</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">What they offer:</p>
                <div className="space-y-2">
                  {user.offers.map((offer) => (
                    <div key={offer.skill_id} className="flex items-center justify-between">
                      <Badge variant="secondary">{offer.skill_name}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {offer.proficiency}/5
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">What they need:</p>
                <div className="space-y-2">
                  {user.needs.map((need) => (
                    <div key={need.skill_id} className="flex items-center justify-between">
                      <Badge variant="outline">{need.skill_name}</Badge>
                      {need.must_have && (
                        <Badge variant="destructive" className="text-xs">Must Have</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Complementarity Section */}
          {match.complementarity.must_have_matches.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Perfect Match!</h4>
              <p className="text-sm text-green-700 mb-2">
                This person fulfills your must-have skills:
              </p>
              <div className="flex flex-wrap gap-1">
                {match.complementarity.must_have_matches.map((skill) => (
                  <Badge key={skill} variant="default" className="bg-green-100 text-green-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Match Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium">Match Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Skills & Expertise</span>
                <span>{match.breakdown.skill_score}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Availability</span>
                <span>{match.breakdown.availability_score}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Timezone</span>
                <span>{match.breakdown.timezone_score}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Collaboration Style</span>
                <span>{match.breakdown.collab_style_score}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Values & Personality</span>
                <span>{match.breakdown.personality_score}%</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={() => onConnect(match)} className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchDashboard; 