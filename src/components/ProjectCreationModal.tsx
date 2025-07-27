import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ProjectCreationModal = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const skillOptions = [
    "Frontend", "Backend", "Design", "Mobile", "DevOps", 
    "Marketing", "Product", "Data Science", "AI/ML", "Blockchain"
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg px-8 py-4 glow-green animate-glow-pulse">
          Start a Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card border-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Launch Your Project
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your idea and find the perfect co-founders
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <label className="text-sm font-medium text-accent mb-2 block">
              Project Name
            </label>
            <Input 
              placeholder="e.g. AI-powered fitness app"
              className="bg-muted border-border"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-accent mb-2 block">
              Description
            </label>
            <Textarea 
              placeholder="Describe your project vision, target audience, and what makes it unique..."
              className="bg-muted border-border min-h-[100px]"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-accent mb-2 block">
              Skills Needed
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedSkills.includes(skill) 
                      ? "bg-accent text-accent-foreground glow-green" 
                      : "hover:bg-accent/20"
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-accent mb-2 block">
                Equity Range
              </label>
              <Input 
                placeholder="e.g. 10-20%"
                className="bg-muted border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-accent mb-2 block">
                Timeline
              </label>
              <Input 
                placeholder="e.g. 3-6 months"
                className="bg-muted border-border"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 glow-cyan">
              Create Project
            </Button>
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCreationModal;