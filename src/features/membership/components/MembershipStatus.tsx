import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Plus } from "lucide-react";
import { useMembership } from "@/contexts/MembershipContext";
import MembershipUpgradeModal from "./MembershipUpgradeModal";
import { useState } from "react";

interface MembershipStatusProps {
  variant?: "compact" | "full";
  showUpgradeButton?: boolean;
}

const MembershipStatus: React.FC<MembershipStatusProps> = ({ 
  variant = "compact", 
  showUpgradeButton = false 
}) => {
  const { isMember, projectCount, maxProjects, canCreateProject } = useMembership();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        {isMember ? (
          <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Member
          </Badge>
        ) : (
          <Badge variant="outline" className="flex items-center gap-1">
            <Plus className="w-3 h-3" />
            {projectCount}/{maxProjects}
          </Badge>
        )}
        
        {showUpgradeButton && !isMember && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowUpgradeModal(true)}
            className="text-xs"
          >
            Upgrade
          </Button>
        )}

        <MembershipUpgradeModal 
          isOpen={showUpgradeModal} 
          onClose={() => setShowUpgradeModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-4 bg-muted/30 rounded-lg border border-accent/20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-accent">Membership Status</h3>
        {isMember ? (
          <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Member
          </Badge>
        ) : (
          <Badge variant="outline">Free</Badge>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Projects Created</span>
          <span className="text-sm font-medium">
            {isMember ? `${projectCount} (Unlimited)` : `${projectCount}/${maxProjects}`}
          </span>
        </div>
        
        {!isMember && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Can Create New Project</span>
            <span className={`text-sm font-medium ${canCreateProject ? 'text-green-500' : 'text-red-500'}`}>
              {canCreateProject ? 'Yes' : 'No'}
            </span>
          </div>
        )}
      </div>

      {!isMember && (
        <Button 
          className="w-full mt-3 glow-green" 
          onClick={() => setShowUpgradeModal(true)}
        >
          Become Full Member
        </Button>
      )}

      <MembershipUpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
};

export default MembershipStatus; 