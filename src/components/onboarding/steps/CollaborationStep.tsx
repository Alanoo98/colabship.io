import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Users, Heart } from 'lucide-react';

interface CollaborationStepProps {
  data: {
    work_style: 'async' | 'sync' | 'hybrid';
    comms_pref: 'text' | 'video' | 'mixed';
    values: string[];
  };
  onUpdate: (updates: Partial<{
    work_style: 'async' | 'sync' | 'hybrid';
    comms_pref: 'text' | 'video' | 'mixed';
    values: string[];
  }>) => void;
}

const CollaborationStep: React.FC<CollaborationStepProps> = ({ data, onUpdate }) => {
  const workStyles = [
    {
      value: 'async',
      label: 'Asynchronous',
      description: 'I prefer to work independently and communicate through written updates',
      icon: '📝',
      details: [
        'Written communication preferred',
        'Flexible working hours',
        'Documentation-focused',
        'Minimal real-time meetings'
      ]
    },
    {
      value: 'sync',
      label: 'Synchronous',
      description: 'I prefer real-time collaboration and regular meetings',
      icon: '🎯',
      details: [
        'Real-time communication',
        'Regular meetings',
        'Immediate feedback',
        'Structured working hours'
      ]
    },
    {
      value: 'hybrid',
      label: 'Hybrid',
      description: 'I\'m flexible and can adapt to different collaboration styles',
      icon: '🔄',
      details: [
        'Mix of async and sync',
        'Adaptable communication',
        'Balanced approach',
        'Flexible scheduling'
      ]
    }
  ];

  const communicationPreferences = [
    {
      value: 'text',
      label: 'Text-based',
      description: 'I prefer written communication (chat, email, docs)',
      icon: '💬'
    },
    {
      value: 'video',
      label: 'Video calls',
      description: 'I prefer face-to-face video communication',
      icon: '📹'
    },
    {
      value: 'mixed',
      label: 'Mixed approach',
      description: 'I\'m comfortable with both text and video communication',
      icon: '🎭'
    }
  ];

  const commonValues = [
    'Transparency', 'Innovation', 'Quality', 'Speed', 'Learning',
    'Collaboration', 'Independence', 'Creativity', 'Reliability',
    'Growth', 'Balance', 'Impact', 'Sustainability', 'Diversity',
    'Excellence', 'Simplicity', 'Trust', 'Adaptability'
  ];

  const addValue = (value: string) => {
    if (value.trim() && !data.values.includes(value.trim())) {
      onUpdate({
        values: [...data.values, value.trim()]
      });
    }
  };

  const removeValue = (value: string) => {
    onUpdate({
      values: data.values.filter(v => v !== value)
    });
  };

  return (
    <div className="space-y-6">
      {/* Work Style */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">How do you prefer to work?</Label>
        
        <div className="grid gap-4">
          {workStyles.map((style) => (
            <Card
              key={style.value}
              className={`cursor-pointer transition-all hover:border-accent ${
                data.work_style === style.value
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
              onClick={() => onUpdate({ work_style: style.value as 'async' | 'sync' | 'hybrid' })}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{style.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{style.label}</h3>
                    <p className="text-muted-foreground mb-4">{style.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {style.details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {data.work_style === style.value && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-accent-foreground" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Choose the work style that best describes how you prefer to collaborate with others.
        </p>
      </div>

      {/* Communication Preferences */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Communication Preferences
        </Label>
        
        <div className="grid gap-3">
          {communicationPreferences.map((pref) => (
            <Card
              key={pref.value}
              className={`cursor-pointer transition-all hover:border-accent ${
                data.comms_pref === pref.value
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
              onClick={() => onUpdate({ comms_pref: pref.value as 'text' | 'video' | 'mixed' })}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pref.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium">{pref.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  {data.comms_pref === pref.value && (
                    <div className="w-4 h-4 rounded-full bg-accent" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          How do you prefer to communicate with your collaborators?
        </p>
      </div>

      {/* Values */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          What values are important to you?
        </Label>
        
        <div className="space-y-3">
          {/* Add Custom Value */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a value that's important to you..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addValue(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                addValue(input.value);
                input.value = '';
              }}
            >
              Add
            </Button>
          </div>

          {/* Common Values */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Common values (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {commonValues.map((value) => (
                <Badge
                  key={value}
                  variant="outline"
                  className={`cursor-pointer hover:bg-accent/10 ${
                    data.values.includes(value) ? 'bg-accent/20 border-accent' : ''
                  }`}
                  onClick={() => {
                    if (data.values.includes(value)) {
                      removeValue(value);
                    } else {
                      addValue(value);
                    }
                  }}
                >
                  {value}
                  {data.values.includes(value) && (
                    <div className="w-2 h-2 bg-accent rounded-full ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Selected Values */}
          {data.values.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Your values:</p>
              <div className="flex flex-wrap gap-2">
                {data.values.map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/10"
                    onClick={() => removeValue(value)}
                  >
                    {value}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Values help us match you with collaborators who share similar principles and goals.
        </p>
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">💡 Collaboration Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• <strong>Be honest:</strong> Choose the work style that truly reflects your preferences</p>
          <p>• <strong>Be flexible:</strong> Consider how you can adapt to different collaboration styles</p>
          <p>• <strong>Be specific:</strong> Your values help find collaborators with similar goals</p>
          <p>• <strong>Be open:</strong> Different communication styles can complement each other</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationStep; 