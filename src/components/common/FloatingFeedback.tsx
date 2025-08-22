import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bug, 
  Lightbulb, 
  Heart, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';


type FeedbackType = 'bug' | 'feature' | 'improvement' | 'praise' | 'general';

interface FeedbackData {
  type: FeedbackType;
  title: string;
  description: string;
  currentPage: string;
  componentContext?: string;
  elementType?: string;
  timestamp: string;
}

const FloatingFeedback = () => {
  // Simplified access check - always show for now
  const hasAccess = (type: string, level: string) => true;
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSelectingComponent, setIsSelectingComponent] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    type: 'general',
    title: '',
    description: '',
    currentPage: window.location.pathname,
    timestamp: new Date().toISOString()
  });

  // Function to get user-friendly page name
  const getPageName = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/projects':
        return 'Projects';
      case '/dashboard':
        return 'Dashboard';
      case '/about':
        return 'About';
      case '/access':
        return 'Access Control';
      default:
        // Handle dynamic routes or unknown pages
        if (pathname.startsWith('/projects/')) {
          return 'Project Details';
        }
        return 'Unknown Page';
    }
  };

  // Function to handle component selection
  const handleComponentSelection = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const target = event.target as HTMLElement;
    const elementInfo = {
      tagName: target.tagName.toLowerCase(),
      className: target.className || '',
      id: target.id || '',
      textContent: target.textContent?.trim().slice(0, 100) || '',
      innerHTML: target.innerHTML.slice(0, 200) || '',
      attributes: Array.from(target.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ')
    };

    const componentContext = `Selected: ${elementInfo.tagName}${elementInfo.id ? `#${elementInfo.id}` : ''}${elementInfo.className ? `.${elementInfo.className.split(' ')[0]}` : ''} | Text: "${elementInfo.textContent}..." | Page: ${getPageName(window.location.pathname)}`;
    
    setFeedbackData(prev => ({
      ...prev,
      componentContext,
      elementType: `${elementInfo.tagName}${elementInfo.id ? `#${elementInfo.id}` : ''}${elementInfo.className ? `.${elementInfo.className.split(' ')[0]}` : ''}`,
      timestamp: new Date().toISOString()
    }));

    // Stop selection mode
    setIsSelectingComponent(false);
    setIsOpen(true); // Reopen the modal
  };

  // Update current page when location changes
  useEffect(() => {
    setFeedbackData(prev => ({
      ...prev,
      currentPage: location.pathname
    }));
  }, [location.pathname]);

  // Add/remove event listeners for component selection
  useEffect(() => {
    if (isSelectingComponent) {
      document.addEventListener('click', handleComponentSelection, true);
      document.body.style.cursor = 'crosshair';
      document.body.style.userSelect = 'none';
      
      // Add visual indicator
      const overlay = document.createElement('div');
      overlay.id = 'component-selection-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(150, 255, 150, 0.1);
        z-index: 9998;
        pointer-events: none;
      `;
      document.body.appendChild(overlay);

      return () => {
        document.removeEventListener('click', handleComponentSelection, true);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        const overlay = document.getElementById('component-selection-overlay');
        if (overlay) overlay.remove();
      };
    }
  }, [isSelectingComponent]);

  // Only show for beta testers
  const hasBetaAccess = hasAccess('beta', 'basic');
  
  
  if (!hasBetaAccess) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store feedback in localStorage (placeholder for API)
    const existingFeedback = JSON.parse(localStorage.getItem('betaFeedback') || '[]');
    const newFeedback = {
      ...feedbackData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    localStorage.setItem('betaFeedback', JSON.stringify([...existingFeedback, newFeedback]));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFeedbackData({
        type: 'general',
        title: '',
        description: '',
        currentPage: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  const getTypeIcon = (type: FeedbackType) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'feature': return <Lightbulb className="w-4 h-4" />;
      case 'improvement': return <AlertTriangle className="w-4 h-4" />;
      case 'praise': return <Heart className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: FeedbackType) => {
    switch (type) {
      case 'bug': return 'text-red-500';
      case 'feature': return 'text-blue-500';
      case 'improvement': return 'text-yellow-500';
      case 'praise': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  // Function to detect current component context
  const getComponentContext = () => {
    const pathname = window.location.pathname;
    const pageName = getPageName(pathname);
    
    // Try to detect active elements
    const activeElement = document.activeElement;
    const hoveredElement = document.querySelector(':hover');
    
    let context = `Page: ${pageName}`;
    
    if (activeElement && activeElement !== document.body) {
      const elementType = activeElement.tagName.toLowerCase();
      const elementText = activeElement.textContent?.slice(0, 50) || '';
      context += ` | Active: ${elementType}${elementText ? ` (${elementText}...)` : ''}`;
    }
    
    if (hoveredElement && hoveredElement !== document.body && hoveredElement !== activeElement) {
      const elementType = hoveredElement.tagName.toLowerCase();
      const elementText = hoveredElement.textContent?.slice(0, 30) || '';
      context += ` | Hovered: ${elementType}${elementText ? ` (${elementText}...)` : ''}`;
    }
    
    return context;
  };

  // Function to start component selection mode
  const startComponentSelection = () => {
    setIsSelectingComponent(true);
    setIsOpen(false); // Close the modal temporarily
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 rounded-full shadow-lg glow-green hover:scale-110 transition-all duration-200"
                size="lg"
              >
                <MessageSquare className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-secondary text-secondary-foreground border-secondary/20">
              <p className="font-medium">Beta Feedback</p>
              <p className="text-xs opacity-90">Share your thoughts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-secondary" />
                Beta Feedback
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Feedback Submitted!</h3>
                  <p className="text-muted-foreground">
                    Thank you for helping improve Colabship!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Feedback Type */}
                  <div className="space-y-2">
                    <Label>Feedback Type</Label>
                    <Select 
                      value={feedbackData.type} 
                      onValueChange={(value: FeedbackType) => 
                        setFeedbackData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-red-500" />
                            Bug Report
                          </div>
                        </SelectItem>
                        <SelectItem value="feature">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-500" />
                            Feature Request
                          </div>
                        </SelectItem>
                        <SelectItem value="improvement">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            Improvement
                          </div>
                        </SelectItem>
                        <SelectItem value="praise">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-green-500" />
                            Praise
                          </div>
                        </SelectItem>
                        <SelectItem value="general">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            General
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <input
                      type="text"
                      placeholder="Brief description of your feedback"
                      value={feedbackData.title}
                      onChange={(e) => setFeedbackData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Detailed description of your feedback..."
                      value={feedbackData.description}
                      onChange={(e) => setFeedbackData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Current Page */}
                  <div className="space-y-2">
                    <Label>Current Page</Label>
                    <Badge variant="outline" className="w-full justify-start">
                      {getPageName(feedbackData.currentPage)}
                    </Badge>
                  </div>

                  {/* Component Context */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Component Context</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={startComponentSelection}
                        className="text-xs"
                      >
                        Select Component
                      </Button>
                    </div>
                    {feedbackData.componentContext ? (
                      <div className="p-3 bg-muted/50 rounded-md border border-border">
                        <p className="text-sm text-muted-foreground">
                          {feedbackData.componentContext}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Click "Select Component" to choose any element on the page for feedback
                      </p>
                    )}
                  </div>

                  {/* Manual Element Reference */}
                  <div className="space-y-2">
                    <Label>Element Reference (Optional)</Label>
                    <input
                      type="text"
                      placeholder="e.g., 'Hero section CTA button', 'Project card #3', 'Navigation menu'"
                      value={feedbackData.elementType || ''}
                      onChange={(e) => setFeedbackData(prev => ({ ...prev, elementType: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Manually specify which component, button, or element this feedback relates to
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full glow-green"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingFeedback; 