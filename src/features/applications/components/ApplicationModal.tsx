import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Send, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  ExternalLink,
  FileText,
  Calendar,
  MapPin,
  TrendingUp
} from "lucide-react";
import { useFounder } from "@/features/founders/context/FounderContext";
import { Application } from "@/features/founders/types/founder";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  founderProfile: any; // Using the showcase founder type
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, founderProfile }) => {
  const { createApplication } = useFounder();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Application form state
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState("");
  const [availability, setAvailability] = useState("");
  const [proposedCompensation, setProposedCompensation] = useState<{
    type: 'equity' | 'revenue' | 'paid' | 'combination';
    details: string;
  } | null>(null);
  const [portfolio, setPortfolio] = useState<{
    title: string;
    description: string;
    url?: string;
  }[]>([]);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    url: ""
  });

  const handleSubmit = async () => {
    if (!message.trim() || !timeline.trim() || !availability.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'> = {
        founderProfileId: founderProfile.id,
        collaboratorProfileId: "current-user-id", // This would come from auth
        message,
        timeline,
        availability,
        proposedCompensation,
        portfolio,
        status: 'pending'
      };

      createApplication(application);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        // Reset form
        setMessage("");
        setTimeline("");
        setAvailability("");
        setProposedCompensation(null);
        setPortfolio([]);
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      setPortfolio([...portfolio, { ...newPortfolioItem }]);
      setNewPortfolioItem({ title: "", description: "", url: "" });
    }
  };

  const removePortfolioItem = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Application Sent!</h3>
            <p className="text-muted-foreground">
              Your application has been sent to {founderProfile.name}. You'll hear back soon!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Apply to Join {founderProfile.projectName}
          </DialogTitle>
          <DialogDescription>
            Tell {founderProfile.name} why you'd be a great fit for their project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Summary */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{founderProfile.projectName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{founderProfile.projectDescription}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{founderProfile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{founderProfile.timeCommitment}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{founderProfile.collaborationStyle}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {founderProfile.rolesNeeded.map((role: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Why are you interested in this project? *</Label>
              <Textarea
                id="message"
                placeholder="Tell the founder about your interest, relevant experience, and why you'd be a great fit..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">What's your timeline? *</Label>
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately available</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Your availability *</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="part-time">Part-time (10-20 hrs/week)</SelectItem>
                    <SelectItem value="full-time">Full-time (40+ hrs/week)</SelectItem>
                    <SelectItem value="flexible">Flexible schedule</SelectItem>
                    <SelectItem value="weekends">Weekends only</SelectItem>
                    <SelectItem value="evenings">Evenings only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Compensation Preferences */}
            <div className="space-y-3">
              <Label>Compensation Preferences</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equity"
                    checked={proposedCompensation?.type === 'equity'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProposedCompensation({ type: 'equity', details: '' });
                      } else {
                        setProposedCompensation(null);
                      }
                    }}
                  />
                  <Label htmlFor="equity" className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Equity
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="revenue"
                    checked={proposedCompensation?.type === 'revenue'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProposedCompensation({ type: 'revenue', details: '' });
                      } else {
                        setProposedCompensation(null);
                      }
                    }}
                  />
                  <Label htmlFor="revenue" className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Revenue Sharing
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paid"
                    checked={proposedCompensation?.type === 'paid'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProposedCompensation({ type: 'paid', details: '' });
                      } else {
                        setProposedCompensation(null);
                      }
                    }}
                  />
                  <Label htmlFor="paid" className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Paid Compensation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="combination"
                    checked={proposedCompensation?.type === 'combination'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProposedCompensation({ type: 'combination', details: '' });
                      } else {
                        setProposedCompensation(null);
                      }
                    }}
                  />
                  <Label htmlFor="combination" className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Combination
                  </Label>
                </div>
              </div>
              
              {proposedCompensation && (
                <div className="space-y-2">
                  <Label>Compensation Details</Label>
                  <Textarea
                    placeholder="Describe your compensation expectations..."
                    value={proposedCompensation.details}
                    onChange={(e) => setProposedCompensation({
                      ...proposedCompensation,
                      details: e.target.value
                    })}
                    rows={2}
                  />
                </div>
              )}
            </div>

            {/* Portfolio */}
            <div className="space-y-3">
              <Label>Portfolio/Previous Work (Optional)</Label>
              <div className="space-y-3">
                {portfolio.map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        {item.url && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline flex items-center gap-1 mt-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Project
                          </a>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePortfolioItem(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
                
                <div className="space-y-3 p-3 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Project Title</Label>
                      <Input
                        placeholder="e.g., E-commerce Platform"
                        value={newPortfolioItem.title}
                        onChange={(e) => setNewPortfolioItem({
                          ...newPortfolioItem,
                          title: e.target.value
                        })}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Project URL (optional)</Label>
                      <Input
                        placeholder="https://..."
                        value={newPortfolioItem.url}
                        onChange={(e) => setNewPortfolioItem({
                          ...newPortfolioItem,
                          url: e.target.value
                        })}
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      placeholder="Brief description of the project and your role..."
                      value={newPortfolioItem.description}
                      onChange={(e) => setNewPortfolioItem({
                        ...newPortfolioItem,
                        description: e.target.value
                      })}
                      rows={2}
                      className="resize-none"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addPortfolioItem}
                    disabled={!newPortfolioItem.title || !newPortfolioItem.description}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Add Portfolio Item
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || !timeline || !availability || isSubmitting}
              className="flex-1 glow-green"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Application
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal; 