import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Clock, MapPin, Wrench } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface WhatYouOfferStepProps {
  data: {
    offers: Array<{
      skill_id: number;
      skill_name: string;
      proficiency: number;
    }>;
    availability_hours: number;
    timezone: string;
    preferred_tools: string[];
  };
  onUpdate: (updates: Partial<{
    offers: Array<{
      skill_id: number;
      skill_name: string;
      proficiency: number;
    }>;
    availability_hours: number;
    timezone: string;
    preferred_tools: string[];
  }>) => void;
}

const WhatYouOfferStep: React.FC<WhatYouOfferStepProps> = ({ data, onUpdate }) => {
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
    if (!data.offers.find(offer => offer.skill_id === skill.id)) {
      onUpdate({
        offers: [...data.offers, {
          skill_id: skill.id,
          skill_name: skill.name,
          proficiency: 3
        }]
      });
    }
  };

  const removeSkill = (skillId: number) => {
    onUpdate({
      offers: data.offers.filter(offer => offer.skill_id !== skillId)
    });
  };

  const updateProficiency = (skillId: number, proficiency: number) => {
    onUpdate({
      offers: data.offers.map(offer =>
        offer.skill_id === skillId
          ? { ...offer, proficiency }
          : offer
      )
    });
  };

  const addTool = (tool: string) => {
    if (tool.trim() && !data.preferred_tools.includes(tool.trim())) {
      onUpdate({
        preferred_tools: [...data.preferred_tools, tool.trim()]
      });
    }
  };

  const removeTool = (tool: string) => {
    onUpdate({
      preferred_tools: data.preferred_tools.filter(t => t !== tool)
    });
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

  const proficiencyLabels = {
    1: 'Beginner',
    2: 'Basic',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">What skills can you offer?</Label>
        
        {/* Selected Skills */}
        {data.offers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Your Skills</h3>
            {data.offers.map((offer) => (
              <Card key={offer.skill_id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{offer.skill_name}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(offer.skill_id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency Level</span>
                    <span className="font-medium">{proficiencyLabels[offer.proficiency as keyof typeof proficiencyLabels]}</span>
                  </div>
                  <Slider
                    value={[offer.proficiency]}
                    onValueChange={(value) => updateProficiency(offer.skill_id, value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Add More Skills</h3>
          
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
                disabled={!!data.offers.find(offer => offer.skill_id === skill.id)}
                className="justify-start h-auto p-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Weekly Availability
        </Label>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Hours per week</span>
            <span className="font-medium">{data.availability_hours} hours</span>
          </div>
          <Slider
            value={[data.availability_hours]}
            onValueChange={(value) => onUpdate({ availability_hours: value[0] })}
            max={40}
            min={1}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            How many hours can you dedicate to collaborative projects each week?
          </p>
        </div>
      </div>

      {/* Timezone */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Timezone
        </Label>
        <Select value={data.timezone} onValueChange={(value) => onUpdate({ timezone: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[
              'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
              'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
              'Australia/Sydney', 'Pacific/Auckland'
            ].map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Your timezone helps us find collaborators in compatible time zones.
        </p>
      </div>

      {/* Preferred Tools */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          Preferred Tools & Technologies
        </Label>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add a tool (e.g., Figma, Notion, Slack)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTool(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              addTool(input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>

        {data.preferred_tools.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.preferred_tools.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/10"
                onClick={() => removeTool(tool)}
              >
                {tool}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">
          Tools you prefer to use for collaboration and communication.
        </p>
      </div>
    </div>
  );
};

export default WhatYouOfferStep; 