import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Store,
  Search,
  TrendingUp,
  Star,
  Download,
  Upload,
  Zap,
  Heart,
  Eye,
  Filter,
  Plus,
  Brain,
  Moon,
  Apple,
  Calendar,
  Baby,
  BookOpen,
  Tag,
  Users,
} from 'lucide-react';

export function MarketplaceHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Store, count: 156 },
    { id: 'meditation', name: 'Meditation', icon: Brain, count: 42 },
    { id: 'sleep', name: 'Sleep', icon: Moon, count: 28 },
    { id: 'nutrition', name: 'Nutrition', icon: Apple, count: 35 },
    { id: 'schedule', name: 'Schedule', icon: Calendar, count: 31 },
    { id: 'childcare', name: 'Childcare', icon: Baby, count: 12 },
    { id: 'study', name: 'Study', icon: BookOpen, count: 8 },
  ];

  const templates = [
    {
      id: '1',
      title: 'Morning Mindfulness Routine',
      description: '15-minute guided meditation sequence perfect for starting your day with clarity',
      category: 'Meditation',
      author: 'Emma Wilson',
      authorAvatar: 'E',
      rating: 4.8,
      downloads: 1243,
      mp: 25,
      featured: true,
      tags: ['Morning', 'Beginner-Friendly', 'Quick'],
      tier: 'Foundation',
    },
    {
      id: '2',
      title: 'Deep Sleep Soundscape Mix',
      description: 'Custom 8-hour audio blend of rain, ocean waves, and theta waves',
      category: 'Sleep',
      author: 'Michael Chen',
      authorAvatar: 'M',
      rating: 4.9,
      downloads: 2156,
      mp: 30,
      featured: true,
      tags: ['Premium', 'Binaural', 'Full Night'],
      tier: 'Explorer',
    },
    {
      id: '3',
      title: 'Balanced Macros Meal Plan',
      description: 'Weekly meal plan optimized for 40/30/30 macro split with shopping list',
      category: 'Nutrition',
      author: 'Sarah Martinez',
      authorAvatar: 'S',
      rating: 4.7,
      downloads: 892,
      mp: 35,
      featured: false,
      tags: ['Meal Prep', 'Macro Tracking', 'Grocery List'],
      tier: 'Foundation',
    },
    {
      id: '4',
      title: 'Productivity Power Hour',
      description: 'Structured study/work template with Pomodoro technique and break reminders',
      category: 'Study',
      author: 'David Kim',
      authorAvatar: 'D',
      rating: 4.6,
      downloads: 634,
      mp: 20,
      featured: false,
      tags: ['Pomodoro', 'Focus', 'Time Management'],
      tier: 'Foundation',
    },
    {
      id: '5',
      title: 'Bedtime Routine Builder',
      description: 'Customizable evening routine with progressive relaxation and sleep hygiene tips',
      category: 'Sleep',
      author: 'Lisa Anderson',
      authorAvatar: 'L',
      rating: 4.8,
      downloads: 1089,
      mp: 28,
      featured: false,
      tags: ['Wind Down', 'Habit Stacking', 'Customizable'],
      tier: 'Explorer',
    },
    {
      id: '6',
      title: 'Family Schedule Coordinator',
      description: 'Multi-person calendar template with color-coding and conflict detection',
      category: 'Schedule',
      author: 'Jennifer Brown',
      authorAvatar: 'J',
      rating: 4.9,
      downloads: 1567,
      mp: 40,
      featured: true,
      tags: ['Family', 'Multi-User', 'Color-Coded'],
      tier: 'Explorer',
    },
    {
      id: '7',
      title: 'Breathing Exercise Collection',
      description: '12 different breathwork techniques from basic to advanced',
      category: 'Meditation',
      author: 'Robert Taylor',
      authorAvatar: 'R',
      rating: 4.7,
      downloads: 945,
      mp: 30,
      featured: false,
      tags: ['Breathwork', 'Varied', 'Instructional'],
      tier: 'Foundation',
    },
    {
      id: '8',
      title: 'Baby Sleep Training Log',
      description: 'Track feeding, diaper changes, sleep patterns with analytics',
      category: 'Childcare',
      authorAvatar: 'K',
      author: 'Karen White',
      rating: 4.8,
      downloads: 723,
      mp: 35,
      featured: false,
      tags: ['Infant', 'Tracking', 'Analytics'],
      tier: 'Explorer',
    },
  ];

  const myTemplates = [
    {
      id: '1',
      title: 'Custom Morning Flow',
      category: 'Meditation',
      downloads: 0,
      mp: 0,
      status: 'Draft',
      created: 'Oct 12',
    },
    {
      id: '2',
      title: 'Weekly Meal Prep Guide',
      category: 'Nutrition',
      downloads: 15,
      mp: 45,
      status: 'Published',
      created: 'Oct 8',
    },
  ];

  const stats = [
    { label: 'Available MP', value: '1,240', icon: Zap },
    { label: 'Templates Owned', value: '12', icon: Download },
    { label: 'Templates Shared', value: '2', icon: Upload },
    { label: 'Total Earned', value: '45 MP', icon: TrendingUp },
  ];

  const topCreators = [
    { name: 'Emma Wilson', avatar: 'E', templates: 15, earned: '450 MP' },
    { name: 'Michael Chen', avatar: 'M', templates: 12, earned: '380 MP' },
    { name: 'Sarah Martinez', avatar: 'S', templates: 10, earned: '325 MP' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900">Community Marketplace</h2>
              <p className="text-sm text-slate-600">Share templates, earn Mastery Points</p>
            </div>
          </div>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Share Template
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 bg-white border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
              <p className="text-2xl text-slate-900">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="mytemplates">My Templates</TabsTrigger>
          <TabsTrigger value="creators">Top Creators</TabsTrigger>
        </TabsList>

        {/* Browse Templates */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? 'bg-teal-500 hover:bg-teal-600 text-white border-0'
                      : ''
                  }
                >
                  <Icon className="w-3 h-3 mr-2" />
                  {category.name}
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs border-slate-300"
                  >
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {/* Featured Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="text-slate-900">Featured Templates</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates
                .filter((t) => t.featured)
                .map((template) => (
                  <Card
                    key={template.id}
                    className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-amber-100 text-amber-700 border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>

                    <h4 className="text-slate-900 mb-2">{template.title}</h4>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        {template.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {template.downloads}
                      </div>
                      <Badge
                        className={`text-xs ${
                          template.tier === 'Foundation'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-teal-100 text-teal-700'
                        } border-0`}
                      >
                        {template.tier}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-purple-200">
                      <Avatar className="w-6 h-6 bg-purple-200 text-purple-700 flex items-center justify-center text-xs">
                        {template.authorAvatar}
                      </Avatar>
                      <span className="text-xs text-slate-600 flex-1">
                        {template.author}
                      </span>
                      <Badge className="bg-amber-100 text-amber-700 border-0">
                        {template.mp} MP
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      className="w-full mt-3 bg-teal-500 hover:bg-teal-600 text-white border-0"
                    >
                      Get Template
                    </Button>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Templates */}
          <div>
            <h3 className="text-slate-900 mb-4">All Templates</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates
                .filter((t) => !t.featured)
                .map((template) => (
                  <Card
                    key={template.id}
                    className="p-4 bg-white border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Heart className="w-3 h-3" />
                      </Button>
                    </div>

                    <h4 className="text-slate-900 mb-2">{template.title}</h4>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        {template.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {template.downloads}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                      <Avatar className="w-6 h-6 bg-slate-200 text-slate-700 flex items-center justify-center text-xs">
                        {template.authorAvatar}
                      </Avatar>
                      <span className="text-xs text-slate-600 flex-1">
                        {template.author}
                      </span>
                      <Badge className="bg-amber-100 text-amber-700 border-0">
                        {template.mp} MP
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3"
                    >
                      Get Template
                    </Button>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        {/* My Templates */}
        <TabsContent value="mytemplates" className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-2">Share Your Templates</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Create and share your meditation scripts, sleep routines, meal plans, and more.
                  Earn Mastery Points for every download!
                </p>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </div>
          </Card>

          <div>
            <h3 className="text-slate-900 mb-4">Your Templates</h3>
            {myTemplates.length > 0 ? (
              <div className="space-y-3">
                {myTemplates.map((template) => (
                  <Card key={template.id} className="p-4 bg-white border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-slate-900">{template.title}</h4>
                          <Badge
                            className={`text-xs ${
                              template.status === 'Published'
                                ? 'bg-teal-100 text-teal-700'
                                : 'bg-slate-100 text-slate-600'
                            } border-0`}
                          >
                            {template.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {template.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {template.downloads} downloads
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-600" />
                            {template.mp} MP earned
                          </span>
                          <span className="text-xs text-slate-500">
                            Created {template.created}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 bg-slate-50 border-slate-200 text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 mb-4">You haven't created any templates yet</p>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
                  Create Your First Template
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Top Creators */}
        <TabsContent value="creators" className="space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">Top Contributors</h3>
            </div>

            <div className="space-y-4">
              {topCreators.map((creator, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-slate-400">#{index + 1}</span>
                      <Avatar className="w-12 h-12 bg-purple-200 text-purple-700 flex items-center justify-center text-lg">
                        {creator.avatar}
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-slate-900 mb-1">{creator.name}</p>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span>{creator.templates} templates</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-600" />
                          {creator.earned}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 mb-2">Become a Top Creator</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Share high-quality templates, help the community, and earn rewards. Top creators
                  get featured placement and bonus Mastery Points!
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Earn 5-50 MP per template download</li>
                  <li>• Get featured in weekly highlights</li>
                  <li>• Unlock exclusive creator badges</li>
                  <li>• Access to creator-only features</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
