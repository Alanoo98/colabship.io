import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, FileText, Star } from 'lucide-react';

interface BasicProfileStepProps {
  data: {
    name: string;
    bio: string;
    experience_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  };
  onUpdate: (updates: Partial<{
    name: string;
    bio: string;
    experience_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>) => void;
}

const BasicProfileStep: React.FC<BasicProfileStepProps> = ({ data, onUpdate }) => {
  const experienceLevels = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'Just starting out, learning the basics',
      icon: '🌱'
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Some experience, comfortable with core concepts',
      icon: '🚀'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Experienced, can handle complex projects',
      icon: '⚡'
    },
    {
      value: 'expert',
      label: 'Expert',
      description: 'Deep expertise, can mentor others',
      icon: '🏆'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">
          This is how other users will see your name on the platform.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself, your background, and what drives you..."
          value={data.bio}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          rows={4}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">
          Share your story, interests, and what you're passionate about building.
        </p>
      </div>

      {/* Experience Level */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          Experience Level
        </Label>
        
        <div className="grid gap-3">
          {experienceLevels.map((level) => (
            <Card
              key={level.value}
              className={`cursor-pointer transition-all hover:border-accent ${
                data.experience_level === level.value
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
              onClick={() => onUpdate({ experience_level: level.value as 'beginner' | 'intermediate' | 'advanced' | 'expert' })}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium">{level.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                  {data.experience_level === level.value && (
                    <div className="w-4 h-4 rounded-full bg-accent" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Be honest about your experience level. This helps us find the right collaborators for you.
        </p>
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">💡 Tips for a Great Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• <strong>Be authentic:</strong> Share your real story and motivations</p>
          <p>• <strong>Be specific:</strong> Mention the types of projects you're interested in</p>
          <p>• <strong>Be honest:</strong> Your experience level helps find the right matches</p>
          <p>• <strong>Be concise:</strong> Keep your bio focused and readable</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicProfileStep; 