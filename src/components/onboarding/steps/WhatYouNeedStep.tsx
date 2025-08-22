import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Search, Target, Users, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface WhatYouNeedStepProps {
  data: {
    needs: Array<{
      skill_id: number;
      skill_name: string;
      must_have: boolean;
      priority: number;
    }>;
    project_stage_interest: string[];
    team_size_preference: 'solo' | 'duo' | 'small_team' | 'any';
    commitment_level: 'casual' | 'part_time' | 'full_time';
  };
  onUpdate: (updates: Partial<{
    needs: Array<{
      skill_id: number;
      skill_name: string;
      must_have: boolean;
      priority: number;
    }>;
    project_stage_interest: string[];
    team_size_preference: 'solo' | 'duo' | 'small_team' | 'any';
    commitment_level: 'casual' | 'part_time' | 'full_time';
  }>) => void;
}

const WhatYouNeedStep: React.FC<WhatYouNeedStepProps> = ({ data, onUpdate }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const { data: skillsData, error } = await supabase
        .from('skills')
        .select('*')
        .order('name');

      if (error) throw error;
      setSkills(skillsData || []);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = (skill: Skill) => {
    if (!data.needs.find(need => need.skill_id === skill.id)) {
      onUpdate({
        needs: [...data.needs, {
          skill_id: skill.id,
          skill_name: skill.name,
          must_have: false,
          priority: 3
        }]
      });
    }
  };

  const removeSkill = (skillId: number) => {
    onUpdate({
      needs: data.needs.filter(need => need.skill_id !== skillId)
    });
  };

  const updateMustHave = (skillId: number, mustHave: boolean) => {
    onUpdate({
      needs: data.needs.map(need =>
        need.skill_id === skillId
          ? { ...need, must_have: mustHave }
          : need
      )
    });
  };

  const updatePriority = (skillId: number, priority: number) => {
    onUpdate({
      needs: data.needs.map(need =>
        need.skill_id === skillId
          ? { ...need, priority }
          : need
      )
    });
  };

  const toggleProjectStage = (stage: string) => {
    const current = data.project_stage_interest;
    const updated = current.includes(stage)
      ? current.filter(s => s !== stage)
      : [...current, stage];
    onUpdate({ project_stage_interest: updated });
  };

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'All Skills' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'devops', label: 'DevOps' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'other', label: 'Other' }
  ];

  const projectStages = [
    { value: 'idea', label: 'Idea Stage', description: 'Just an idea, need help validating' },
    { value: 'mvp', label: 'MVP Development', description: 'Building the first version' },
    { value: 'growth', label: 'Growth Stage', description: 'Scaling and improving' },
    { value: 'scale', label: 'Scale Stage', description: 'Expanding to new markets' }
  ];

  const teamSizes = [
    { value: 'solo', label: 'Solo', description: 'Just me' },
    { value: 'duo', label: 'Duo', description: 'Me + 1 collaborator' },
    { value: 'small_team', label: 'Small Team', description: '3-5 people' },
    { value: 'any', label: 'Any Size', description: 'Open to any team size' }
  ];

  const commitmentLevels = [
    { value: 'casual', label: 'Casual', description: 'A few hours here and there' },
    { value: 'part_time', label: 'Part-time', description: 'Regular but not full-time' },
    { value: 'full_time', label: 'Full-time', description: 'Dedicated full-time commitment' }
  ];

  const priorityLabels = {
    1: 'Low Priority',
    2: 'Nice to Have',
    3: 'Important',
    4: 'Very Important',
    5: 'Critical'
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">What skills do you need?</Label>
        
        {/* Selected Skills */}
        {data.needs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Skills You Need</h3>
            {data.needs.map((need) => (
              <Card key={need.skill_id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{need.skill_name}</Badge>
                    {need.must_have && (
                      <Badge variant="destructive" className="text-xs">Must Have</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(need.skill_id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`must-have-${need.skill_id}`}
                      checked={need.must_have}
                      onCheckedChange={(checked) => updateMustHave(need.skill_id, checked as boolean)}
                    />
                    <Label htmlFor={`must-have-${need.skill_id}`} className="text-sm">
                      Must have this skill
                    </Label>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Priority Level</span>
                      <span className="font-medium">{priorityLabels[need.priority as keyof typeof priorityLabels]}</span>
                    </div>
                    <Select value={need.priority.toString()} onValueChange={(value) => updatePriority(need.skill_id, parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(priorityLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Add Skills You Need</h3>
          
          {/* Search and Filter */}
          <div className="flex gap-2">
            <Input
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {filteredSkills.map((skill) => (
              <Button
                key={skill.id}
                variant="outline"
                size="sm"
                onClick={() => addSkill(skill)}
                disabled={!!data.needs.find(need => need.skill_id === skill.id)}
                className="justify-start h-auto p-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Stage Interest */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Project Stage Interest
        </Label>
        
        <div className="grid gap-3">
          {projectStages.map((stage) => (
            <Card
              key={stage.value}
              className={`cursor-pointer transition-all hover:border-accent ${
                data.project_stage_interest.includes(stage.value)
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
              onClick={() => toggleProjectStage(stage.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={data.project_stage_interest.includes(stage.value)}
                    onCheckedChange={() => toggleProjectStage(stage.value)}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{stage.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          What stage of projects are you most interested in collaborating on?
        </p>
      </div>

      {/* Team Size Preference */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Team Size Preference
        </Label>
        
        <div className="grid gap-3">
          {teamSizes.map((size) => (
            <Card
              key={size.value}
              className={`cursor-pointer transition-all hover:border-accent ${
                data.team_size_preference === size.value
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
              onClick={() => onUpdate({ team_size_preference: size.value as any })}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium">{size.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {size.description}
                    </p>
                  </div>
                  {data.team_size_preference === size.value && (
                    <div className="w-4 h-4 rounded-full bg-accent" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Commitment Level */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Commitment Level
        </Label>
        
        <div className="grid gap-3">
          {commitmentLevels.map((level) => (
            <Card
              key={level.value}
              className={`cursor-pointer transition-all hover:border-accent ${
                data.commitment_level === level.value
                  ? 'border-accent bg-accent/5'
                  : 'border-border'
              }`}
              onClick={() => onUpdate({ commitment_level: level.value as any })}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium">{level.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                  {data.commitment_level === level.value && (
                    <div className="w-4 h-4 rounded-full bg-accent" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          How much time and commitment are you looking for from collaborators?
        </p>
      </div>
    </div>
  );
};

export default WhatYouNeedStep; 