import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useMembership } from "@/contexts/MembershipContext";

interface MembershipUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: React.ReactNode;
}

const MembershipUpgradeModal: React.FC<MembershipUpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  trigger 
}) => {
  const { upgradeToMembership } = useMembership();

  const memberFeatures = [
    "Create unlimited projects",
    "Priority project visibility",
    "Extended 14-day trials",
    "Advanced project templates",
    "Team management tools",
    "Priority support"
  ];

  const handleUpgrade = () => {
    upgradeToMembership();
    onClose();
    // In a real app, this would redirect to payment processing
    console.log('Redirecting to payment...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] bg-card border-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Crown className="w-6 h-6" />
            Become a Full Member
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Unlock the full Colabship experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Pricing */}
          <div className="text-center p-6 bg-muted/30 rounded-lg border border-accent/20">
            <div className="text-4xl font-bold gradient-text mb-2">€9</div>
            <div className="text-muted-foreground mb-4">per month</div>
            <Badge className="bg-accent text-accent-foreground px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              30-day money-back guarantee
            </Badge>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">What you'll get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {memberFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <h4 className="font-semibold mb-2 text-accent">Why become a full member?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Create unlimited projects
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Get priority visibility for your projects
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Access advanced collaboration tools
              </li>
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1 glow-green animate-glow-pulse" 
              onClick={handleUpgrade}
            >
              Become Full Member
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Cancel anytime. No long-term commitment required.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipUpgradeModal; 