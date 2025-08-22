import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings, Zap, Clock, MapPin, Users, Heart } from 'lucide-react';

interface MatchPreferencesStepProps {
  data: {
    skill_weight: number;
    availability_weight: number;
    timezone_weight: number;
    collab_style_weight: number;
    personality_weight: number;
  };
  onUpdate: (updates: Partial<{
    skill_weight: number;
    availability_weight: number;
    timezone_weight: number;
    collab_style_weight: number;
    personality_weight: number;
  }>) => void;
}

const MatchPreferencesStep: React.FC<MatchPreferencesStepProps> = ({ data, onUpdate }) => {
  const totalWeight = data.skill_weight + data.availability_weight + data.timezone_weight + data.collab_style_weight + data.personality_weight;

  const preferences = [
    {
      key: 'skill_weight' as const,
      label: 'Skills & Expertise',
      description: 'How important is skill complementarity in your matches?',
      icon: Zap,
      color: 'bg-blue-500',
      details: [
        'Technical skills alignment',
        'Experience level compatibility',
        'Skill gaps filled by partner'
      ]
    },
    {
      key: 'availability_weight' as const,
      label: 'Availability & Commitment',
      description: 'How important is matching availability and commitment levels?',
      icon: Clock,
      color: 'bg-green-500',
      details: [
        'Weekly hours alignment',
        'Commitment level matching',
        'Project timeline compatibility'
      ]
    },
    {
      key: 'timezone_weight' as const,
      label: 'Timezone Compatibility',
      description: 'How important is working in similar time zones?',
      icon: MapPin,
      color: 'bg-purple-500',
      details: [
        'Overlapping work hours',
        'Real-time collaboration potential',
        'Meeting scheduling ease'
      ]
    },
    {
      key: 'collab_style_weight' as const,
      label: 'Collaboration Style',
      description: 'How important is matching work and communication styles?',
      icon: Users,
      color: 'bg-orange-500',
      details: [
        'Async vs sync preferences',
        'Communication methods',
        'Work process alignment'
      ]
    },
    {
      key: 'personality_weight' as const,
      label: 'Values & Personality',
      description: 'How important is alignment in values and personality?',
      icon: Heart,
      color: 'bg-red-500',
      details: [
        'Shared values and goals',
        'Personality compatibility',
        'Cultural fit'
      ]
    }
  ];

  const updateWeight = (key: keyof typeof data, value: number) => {
    onUpdate({ [key]: value });
  };

  const getWeightDescription = (weight: number) => {
    if (weight <= 10) return 'Low Priority';
    if (weight <= 20) return 'Somewhat Important';
    if (weight <= 30) return 'Important';
    if (weight <= 40) return 'Very Important';
    return 'Critical';
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-accent" />
          <Label className="text-lg font-medium">Match Preferences</Label>
        </div>
        
        <p className="text-muted-foreground">
          Fine-tune how we match you with potential collaborators. Adjust the sliders below to indicate 
          how important each factor is to you. The total should add up to 100%.
        </p>

        {/* Total Weight Display */}
        <Card className={totalWeight === 100 ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Weight</span>
              <Badge variant={totalWeight === 100 ? 'default' : 'secondary'}>
                {totalWeight}%
                {totalWeight === 100 && ' ✓'}
                {totalWeight < 100 && ' (Add ' + (100 - totalWeight) + '%)'}
                {totalWeight > 100 && ' (Remove ' + (totalWeight - 100) + '%)'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preference Sliders */}
      <div className="space-y-6">
        {preferences.map((pref) => {
          const Icon = pref.icon;
          return (
            <Card key={pref.key} className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${pref.color} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{pref.label}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pref.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {data[pref.key]}%
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Importance Level</span>
                    <span className="font-medium">{getWeightDescription(data[pref.key])}</span>
                  </div>
                  
                  <Slider
                    value={[data[pref.key]]}
                    onValueChange={(value) => updateWeight(pref.key, value[0])}
                    max={50}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Not Important</span>
                    <span>Critical</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {pref.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">💡 Matching Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• <strong>Balance is key:</strong> Consider what matters most for successful collaboration</p>
          <p>• <strong>Skills first:</strong> Most users prioritize skill complementarity</p>
          <p>• <strong>Timezone matters:</strong> Consider how much real-time collaboration you need</p>
          <p>• <strong>Values align:</strong> Shared values often lead to better long-term partnerships</p>
          <p>• <strong>You can adjust later:</strong> These preferences can be changed anytime</p>
        </CardContent>
      </Card>

      {/* Weight Distribution Visualization */}
      {totalWeight > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Current Weight Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-4 rounded-full overflow-hidden">
              {preferences.map((pref) => {
                const percentage = totalWeight > 0 ? (data[pref.key] / totalWeight) * 100 : 0;
                return (
                  <div
                    key={pref.key}
                    className={`${pref.color} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                    title={`${pref.label}: ${data[pref.key]}%`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {preferences.map((pref) => (
                <span key={pref.key} className="truncate">
                  {data[pref.key]}%
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MatchPreferencesStep; 