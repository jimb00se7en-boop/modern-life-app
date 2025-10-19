import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Plus,
  X,
  Save,
  Eye,
  Sparkles,
  Clock,
  ArrowUp,
  ArrowDown,
  Trash2,
  Wand2,
  Lock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { 
  Template, 
  TemplateStep, 
  TemplateCategory, 
  TemplateDifficulty,
  getMaxSteps,
  hasSchedulingFeature,
  hasAIFeatures,
} from '../data/TemplateDatabase';

interface TemplateCreatorProps {
  userTier: 'free' | 'bronze' | 'premium' | 'platinum';
  userMP: number;
  onSave?: (template: Template) => void;
  onCancel?: () => void;
  existingTemplate?: Template;
}

export function TemplateCreator({ 
  userTier, 
  userMP, 
  onSave, 
  onCancel,
  existingTemplate 
}: TemplateCreatorProps) {
  const [title, setTitle] = useState(existingTemplate?.title || '');
  const [description, setDescription] = useState(existingTemplate?.description || '');
  const [category, setCategory] = useState<TemplateCategory>(existingTemplate?.category || 'general');
  const [difficulty, setDifficulty] = useState<TemplateDifficulty>(existingTemplate?.difficulty || 'beginner');
  const [steps, setSteps] = useState<TemplateStep[]>(existingTemplate?.steps || []);
  const [tags, setTags] = useState<string[]>(existingTemplate?.tags || []);
  const [newTag, setNewTag] = useState('');
  
  // Premium features
  const [enableScheduling, setEnableScheduling] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [timeOfDay, setTimeOfDay] = useState('7:00 AM');
  
  // UI state
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const maxSteps = getMaxSteps(userTier);
  const canSchedule = hasSchedulingFeature(userTier);
  const hasAI = hasAIFeatures(userTier);

  // Calculate total duration
  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

  const addStep = () => {
    if (steps.length >= maxSteps) {
      setErrors([`Maximum ${maxSteps} steps allowed for ${userTier} tier. Upgrade for more!`]);
      return;
    }

    const newStep: TemplateStep = {
      id: `step-${Date.now()}`,
      title: '',
      description: '',
      duration: 5,
      optional: false,
      icon: '⭐',
    };
    setSteps([...steps, newStep]);
    setErrors([]);
  };

  const updateStep = (index: number, field: keyof TemplateStep, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const deleteStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newSteps = [...steps];
      [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
      setSteps(newSteps);
    } else if (direction === 'down' && index < steps.length - 1) {
      const newSteps = [...steps];
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
      setSteps(newSteps);
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const generateAISuggestions = (stepIndex: number) => {
    if (!hasAI) return;
    
    // Simulate AI suggestion based on step title
    const step = steps[stepIndex];
    const suggestions = [
      'Try combining this with 528 Hz frequency for enhanced benefits',
      'Research shows this is most effective in the morning',
      'Consider adding a 2-minute breathing exercise here',
      'Perfect opportunity for mindfulness practice',
      'AI recommends 10-15 minutes for optimal results',
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    updateStep(stepIndex, 'aiSuggestion', `AI: ${randomSuggestion}`);
  };

  const validateTemplate = (): boolean => {
    const newErrors: string[] = [];
    
    if (!title) newErrors.push('Title is required');
    if (!description) newErrors.push('Description is required');
    if (steps.length === 0) newErrors.push('Add at least one step');
    
    steps.forEach((step, i) => {
      if (!step.title) newErrors.push(`Step ${i + 1}: Title is required`);
      if (step.duration < 0) newErrors.push(`Step ${i + 1}: Invalid duration`);
    });
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (!validateTemplate()) return;
    
    const template: Template = {
      id: existingTemplate?.id || `tpl-${Date.now()}`,
      title,
      description,
      category,
      difficulty,
      steps,
      totalDuration,
      schedule: enableScheduling && canSchedule ? {
        frequency,
        timeOfDay,
        reminders: true,
      } : undefined,
      createdBy: 'You',
      createdByUserId: 'current-user',
      createdAt: new Date().toISOString(),
      downloads: 0,
      rating: 0,
      reviews: 0,
      masteryPointsEarned: 0,
      requiredTier: userTier,
      hasAIFeatures: hasAI && steps.some(s => s.aiSuggestion),
      tags,
      isPublished: false,
      isPersonal: true,
      version: 1,
    };
    
    onSave?.(template);
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-slate-900">{title || 'Untitled Template'}</h2>
                <Badge className="bg-teal-600 text-white border-0 capitalize">
                  {category}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {difficulty}
                </Badge>
              </div>
              <p className="text-slate-700 mb-3">{description || 'No description'}</p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{totalDuration} minutes total</span>
                <span>•</span>
                <span>{steps.length} steps</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Edit
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <Card key={step.id} className="p-4 bg-white border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0 text-xl">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-slate-900">
                      {index + 1}. {step.title}
                    </h4>
                    {step.optional && (
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    )}
                    <Badge className="bg-slate-100 text-slate-700 border-0 text-xs ml-auto">
                      {step.duration} min
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                  {step.aiSuggestion && hasAI && (
                    <div className="flex items-start gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                      <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-purple-700">{step.aiSuggestion}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {tags.length > 0 && (
          <Card className="p-4 bg-white border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white border-0"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-teal-500 to-cyan-600 border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1">Template Creator</h2>
            <p className="text-white/90 text-sm">
              Build custom routines and share with the community
            </p>
          </div>
          <Badge className="bg-white/20 border-0 text-white">
            {userTier.toUpperCase()} Tier
          </Badge>
        </div>
      </Card>

      {/* Errors */}
      {errors.length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <p className="text-sm text-red-900 mb-1">Please fix these issues:</p>
              <ul className="text-sm text-red-800 list-disc list-inside">
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="steps">Steps ({steps.length}/{maxSteps})</TabsTrigger>
          <TabsTrigger value="advanced">
            Advanced
            {!canSchedule && <Lock className="w-3 h-3 ml-1" />}
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Template Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Morning Mindfulness Routine"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this template does and who it's for..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="sleep">Sleep</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="childcare">Childcare</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tags..."
                  />
                  <Button onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Steps Tab */}
        <TabsContent value="steps" className="space-y-4">
          {steps.map((step, index) => (
            <Card key={step.id} className="p-6 bg-white border-slate-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-slate-900">Step {index + 1}</h4>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => moveStep(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => moveStep(index, 'down')}
                      disabled={index === steps.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteStep(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Step Title *</Label>
                    <Input
                      value={step.title}
                      onChange={(e) => updateStep(index, 'title', e.target.value)}
                      placeholder="e.g., Morning Stretch"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Icon (emoji)</Label>
                    <Input
                      value={step.icon}
                      onChange={(e) => updateStep(index, 'icon', e.target.value)}
                      placeholder="⭐"
                      className="mt-1"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={step.description}
                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                    placeholder="Describe this step..."
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={step.duration}
                      onChange={(e) => updateStep(index, 'duration', parseInt(e.target.value) || 0)}
                      min="0"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <Switch
                      checked={step.optional}
                      onCheckedChange={(checked) => updateStep(index, 'optional', checked)}
                    />
                    <Label>Optional Step</Label>
                  </div>
                </div>

                {hasAI && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>AI Suggestion (Platinum)</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateAISuggestions(index)}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                    <Textarea
                      value={step.aiSuggestion || ''}
                      onChange={(e) => updateStep(index, 'aiSuggestion', e.target.value)}
                      placeholder="AI will suggest optimizations for this step..."
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}

          <Button 
            onClick={addStep}
            variant="outline"
            className="w-full"
            disabled={steps.length >= maxSteps}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Step ({steps.length}/{maxSteps})
          </Button>

          {steps.length >= maxSteps && (
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-2">
                <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm text-amber-900 mb-1">Step limit reached</p>
                  <p className="text-xs text-amber-800">
                    Upgrade to Premium for 15 steps or Platinum for unlimited!
                  </p>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-4">
          {canSchedule ? (
            <Card className="p-6 bg-white border-slate-200">
              <h4 className="text-slate-900 mb-4">Scheduling (Premium Feature)</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={enableScheduling}
                    onCheckedChange={setEnableScheduling}
                  />
                  <Label>Enable automatic scheduling</Label>
                </div>

                {enableScheduling && (
                  <>
                    <div>
                      <Label>Frequency</Label>
                      <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Time of Day</Label>
                      <Input
                        type="time"
                        value={timeOfDay}
                        onChange={(e) => setTimeOfDay(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-slate-50 border-slate-200">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-slate-400 shrink-0" />
                <div>
                  <h4 className="text-slate-900 mb-2">Premium Feature Locked</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Scheduling features are available with Premium tier and above.
                  </p>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 bg-teal-50 border-teal-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="text-sm text-teal-900 mb-1">Template Summary</p>
                <ul className="text-xs text-teal-800 space-y-1">
                  <li>• {steps.length} steps configured</li>
                  <li>• {totalDuration} minutes total duration</li>
                  <li>• {category} category</li>
                  <li>• {difficulty} difficulty</li>
                  {hasAI && <li>• AI features enabled (Platinum)</li>}
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setShowPreview(true)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button 
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white border-0"
          onClick={handleSave}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Template
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
