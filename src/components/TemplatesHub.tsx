import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Plus,
  Search,
  Download,
  Star,
  Clock,
  TrendingUp,
  Sparkles,
  Lock,
  Crown,
  Eye,
  Edit,
  Trash2,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { 
  Template, 
  TemplateCategory,
  communityTemplates,
  getTemplatesByCategory,
  getTemplatesByTier,
  getPopularTemplates,
  getTopRatedTemplates,
  canCreateTemplate,
  hasAIFeatures,
} from '../data/TemplateDatabase';
import { TemplateCreator } from './TemplateCreator';

interface TemplatesHubProps {
  userTier: 'free' | 'bronze' | 'premium' | 'platinum';
  userMP: number;
}

export function TemplatesHub({ userTier, userMP }: TemplatesHubProps) {
  const [activeView, setActiveView] = useState<'browse' | 'create' | 'my-templates'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [myTemplates, setMyTemplates] = useState<Template[]>([]);

  const canCreate = canCreateTemplate(userTier);
  const hasAI = hasAIFeatures(userTier);

  // Filter templates based on category, tier, and search
  const availableTemplates = getTemplatesByTier(userTier);
  const filteredTemplates = availableTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const popularTemplates = getPopularTemplates(3);
  const topRatedTemplates = getTopRatedTemplates(3);

  const handleSaveTemplate = (template: Template) => {
    setMyTemplates([...myTemplates, template]);
    setActiveView('my-templates');
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Delete this template? This cannot be undone.')) {
      setMyTemplates(myTemplates.filter(t => t.id !== templateId));
    }
  };

  const handleUseTemplate = (template: Template) => {
    // Here you would integrate with the scheduling system
    alert(`Template "${template.title}" added to your schedule!`);
  };

  if (activeView === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setActiveView('browse')}
          >
            ← Back to Templates
          </Button>
        </div>
        <TemplateCreator
          userTier={userTier}
          userMP={userMP}
          onSave={handleSaveTemplate}
          onCancel={() => setActiveView('browse')}
        />
      </div>
    );
  }

  if (selectedTemplate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedTemplate(null)}
          >
            ← Back to Browse
          </Button>
        </div>

        {/* Template Detail View */}
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-slate-900">{selectedTemplate.title}</h2>
                <Badge className="bg-teal-600 text-white border-0 capitalize">
                  {selectedTemplate.category}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {selectedTemplate.difficulty}
                </Badge>
                {selectedTemplate.hasAIFeatures && (
                  <Badge className="bg-purple-600 text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI
                  </Badge>
                )}
              </div>
              <p className="text-slate-700 mb-3">{selectedTemplate.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedTemplate.totalDuration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{selectedTemplate.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{selectedTemplate.downloads.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              className="bg-teal-500 hover:bg-teal-600 text-white border-0"
              onClick={() => handleUseTemplate(selectedTemplate)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Use This Template
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        {/* Steps Preview */}
        <div className="space-y-3">
          <h3 className="text-slate-900">Template Steps</h3>
          {selectedTemplate.steps.map((step, index) => (
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

        {/* Creator Info */}
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Created by</p>
              <p className="text-slate-900">{selectedTemplate.createdBy}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Earned</p>
              <p className="text-amber-600">
                <Sparkles className="w-4 h-4 inline mr-1" />
                {selectedTemplate.masteryPointsEarned} MP
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-slate-900 mb-2">Template Library</h2>
          <p className="text-slate-600">
            Browse and create custom wellness routines
          </p>
        </div>
        <div className="flex gap-2">
          {canCreate ? (
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white border-0"
              onClick={() => setActiveView('create')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          ) : (
            <div className="relative">
              <Button
                className="bg-slate-300 text-slate-500 cursor-not-allowed border-0"
                disabled
              >
                <Lock className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tier Unlock Message */}
      {!canCreate && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-amber-900 mb-2">
                Template creation unlocks at Bronze tier
              </p>
              <p className="text-xs text-amber-800 mb-3">
                Complete achievements to unlock template creator and earn MP by sharing with the community!
              </p>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                <Crown className="w-4 h-4 mr-2" />
                View Achievements
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Tabs */}
      <Tabs defaultValue="browse" value={activeView} onValueChange={(v: any) => setActiveView(v)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Templates</TabsTrigger>
          <TabsTrigger value="my-templates">
            My Templates ({myTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="create" disabled={!canCreate}>
            Create New
            {!canCreate && <Lock className="w-3 h-3 ml-1" />}
          </TabsTrigger>
        </TabsList>

        {/* Browse Templates */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              <option value="meditation">Meditation</option>
              <option value="sleep">Sleep</option>
              <option value="nutrition">Nutrition</option>
              <option value="study">Study</option>
              <option value="childcare">Childcare</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Featured Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Popular Templates */}
            <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <h3 className="text-slate-900">Popular This Week</h3>
              </div>
              <div className="space-y-2">
                {popularTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className="w-full p-3 bg-white rounded-lg border border-teal-100 hover:border-teal-300 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-slate-900">{template.title}</p>
                      <Badge className="bg-slate-100 text-slate-700 border-0 text-xs">
                        {template.totalDuration}min
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Download className="w-3 h-3" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Top Rated */}
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-600" />
                <h3 className="text-slate-900">Top Rated</h3>
              </div>
              <div className="space-y-2">
                {topRatedTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className="w-full p-3 bg-white rounded-lg border border-amber-100 hover:border-amber-300 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-slate-900">{template.title}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-slate-700">{template.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="capitalize">{template.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* All Templates Grid */}
          <div>
            <h3 className="text-slate-900 mb-4">
              All Templates ({filteredTemplates.length})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <Card
                  key={template.id}
                  className="p-4 bg-white border-slate-200 hover:border-teal-300 transition-colors cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-slate-900 mb-1">{template.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{template.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-xs capitalize">
                      {template.category}
                    </Badge>
                    {template.hasAIFeatures && (
                      <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{template.totalDuration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{template.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* My Templates */}
        <TabsContent value="my-templates" className="space-y-6">
          {myTemplates.length === 0 ? (
            <Card className="p-12 bg-slate-50 border-slate-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-slate-900 mb-2">No templates yet</h3>
                <p className="text-slate-600 mb-4">
                  {canCreate 
                    ? 'Create your first template to get started'
                    : 'Unlock Bronze tier to start creating templates'}
                </p>
                {canCreate && (
                  <Button
                    onClick={() => setActiveView('create')}
                    className="bg-teal-500 hover:bg-teal-600 text-white border-0"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myTemplates.map(template => (
                <Card key={template.id} className="p-4 bg-white border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-slate-900">{template.title}</h4>
                        {!template.isPublished && (
                          <Badge variant="outline" className="text-xs">Draft</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{template.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-xs capitalize">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.steps.length} steps
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
