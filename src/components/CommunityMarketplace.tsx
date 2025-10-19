import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Store,
  TrendingUp,
  Download,
  Heart,
  Star,
  Coins,
  Users,
  Clock,
  Calendar,
  Brain,
  Apple,
  Baby,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

type Template = {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'nutrition' | 'study' | 'childcare' | 'schedule' | 'wellness';
  creator: {
    name: string;
    avatar: string;
    tier: string;
    verified: boolean;
  };
  price: number; // in Mastery Points
  downloads: number;
  rating: number;
  reviews: number;
  isFeatured?: boolean;
  isPremium?: boolean;
};

const templates: Template[] = [
  {
    id: '1',
    title: 'Morning Mom Meditation Routine',
    description: '5-minute guided meditation schedule perfect for busy mornings before the kids wake up',
    category: 'meditation',
    creator: {
      name: 'Sarah Chen',
      avatar: 'SC',
      tier: 'Mastery',
      verified: true
    },
    price: 0,
    downloads: 2847,
    rating: 4.9,
    reviews: 234,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Balanced Family Meal Plan',
    description: 'Weekly meal planning template with kid-friendly recipes and macro tracking',
    category: 'nutrition',
    creator: {
      name: 'Jessica Martinez',
      avatar: 'JM',
      tier: 'Growth',
      verified: true
    },
    price: 150,
    downloads: 1923,
    rating: 4.8,
    reviews: 167,
    isPremium: true
  },
  {
    id: '3',
    title: 'Study Time Optimizer',
    description: 'Pomodoro-based study schedule with built-in breaks and focus frequency suggestions',
    category: 'study',
    creator: {
      name: 'Alex Thompson',
      avatar: 'AT',
      tier: 'Mastery',
      verified: true
    },
    price: 100,
    downloads: 1456,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '4',
    title: 'Childcare Coordination Hub',
    description: 'Multi-caregiver schedule template with handoff checklists and milestone tracking',
    category: 'childcare',
    creator: {
      name: 'Emily Rodriguez',
      avatar: 'ER',
      tier: 'Growth',
      verified: false
    },
    price: 200,
    downloads: 892,
    rating: 4.9,
    reviews: 76,
    isPremium: true
  },
  {
    id: '5',
    title: 'Ultimate Weekly Planner',
    description: 'Comprehensive schedule template balancing work, family, self-care, and study time',
    category: 'schedule',
    creator: {
      name: 'Michael Kim',
      avatar: 'MK',
      tier: 'Mastery',
      verified: true
    },
    price: 250,
    downloads: 3421,
    rating: 5.0,
    reviews: 312,
    isFeatured: true,
    isPremium: true
  },
  {
    id: '6',
    title: 'Sleep Hygiene Routine',
    description: 'Evening wind-down schedule with frequency therapy timing and meditation prompts',
    category: 'wellness',
    creator: {
      name: 'Dr. Lisa Park',
      avatar: 'LP',
      tier: 'Mastery',
      verified: true
    },
    price: 0,
    downloads: 2156,
    rating: 4.8,
    reviews: 198
  }
];

const categoryIcons = {
  meditation: Brain,
  nutrition: Apple,
  study: BookOpen,
  childcare: Baby,
  schedule: Calendar,
  wellness: Heart
};

const earningOpportunities = [
  {
    action: 'Create & Share Template',
    points: '50-500',
    description: 'Upload your proven templates'
  },
  {
    action: 'Template Downloaded',
    points: '10',
    description: 'Each time someone uses your template'
  },
  {
    action: 'Receive 5-Star Review',
    points: '25',
    description: 'Quality templates earn bonuses'
  },
  {
    action: 'Reach 100 Downloads',
    points: '500',
    description: 'Popular creator milestone'
  },
  {
    action: 'Help Community Member',
    points: '15',
    description: 'Answer questions, provide support'
  },
  {
    action: 'Complete Achievements',
    points: '100-1000',
    description: 'Tier achievements unlock points'
  }
];

export function CommunityMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userPoints] = useState(1250); // Mock user points

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      meditation: 'text-purple-600 bg-purple-50',
      nutrition: 'text-green-600 bg-green-50',
      study: 'text-blue-600 bg-blue-50',
      childcare: 'text-pink-600 bg-pink-50',
      schedule: 'text-teal-600 bg-teal-50',
      wellness: 'text-amber-600 bg-amber-50'
    };
    return colors[category as keyof typeof colors] || 'text-slate-600 bg-slate-50';
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Store className="w-6 h-6 text-teal-600" />
            <Badge className="bg-teal-600 border-0 text-white">
              Community Marketplace
            </Badge>
          </div>
          <h2 className="text-slate-900 mb-4">
            Share Templates, Earn Mastery Points
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Access proven routines from the community or share your own. 
            Earn soft currency that unlocks features and reduces tier costs.
          </p>
        </div>

        {/* User Points Banner */}
        <div className="mb-12 p-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Your Mastery Points Balance</p>
                <p className="text-white">
                  {userPoints.toLocaleString()} MP
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Earn More Points
              </Button>
              <Button 
                className="bg-white text-teal-600 hover:bg-white/90"
              >
                <Award className="w-4 h-4 mr-2" />
                Redeem Points
              </Button>
            </div>
          </div>
        </div>

        {/* How Mastery Points Work */}
        <div className="mb-12 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
          <div className="text-center mb-8">
            <h3 className="text-slate-900 mb-2">How Mastery Points Work</h3>
            <p className="text-slate-600">
              Contribute to the community and earn currency with real value
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="text-slate-900">Earn Points</h4>
              <p className="text-sm text-slate-600">
                Share templates, help others, complete achievements
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
                <Store className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-slate-900">Spend Points</h4>
              <p className="text-sm text-slate-600">
                Download premium templates, unlock features early
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-slate-900">Redeem Value</h4>
              <p className="text-sm text-slate-600">
                Convert points to tier discounts (1000 MP = $10 off)
              </p>
            </div>
          </div>

          {/* Earning Opportunities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earningOpportunities.map((opp, idx) => (
              <Card key={idx} className="p-4 bg-white border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg shrink-0">
                    <Coins className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-slate-900">{opp.action}</p>
                      <Badge variant="secondary" className="text-xs">
                        +{opp.points} MP
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">{opp.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-7 bg-slate-100">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="meditation">
              <Brain className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Meditation</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition">
              <Apple className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="study">
              <BookOpen className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Study</span>
            </TabsTrigger>
            <TabsTrigger value="childcare">
              <Baby className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Childcare</span>
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="wellness">
              <Heart className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Wellness</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemplates.map((template) => {
            const CategoryIcon = categoryIcons[template.category];
            const canAfford = userPoints >= template.price;
            
            return (
              <Card 
                key={template.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  template.isFeatured ? 'border-2 border-teal-500' : 'border-slate-200'
                }`}
              >
                {/* Featured Badge */}
                {template.isFeatured && (
                  <div className="bg-teal-500 text-white px-4 py-1 text-xs text-center">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Featured Template
                  </div>
                )}

                <div className="p-6">
                  {/* Category & Premium Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getCategoryColor(template.category)}`}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {template.category}
                    </Badge>
                    {template.isPremium && (
                      <Badge variant="outline" className="border-amber-500 text-amber-600">
                        Premium
                      </Badge>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-slate-900 mb-2">{template.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <Avatar className="w-8 h-8 bg-teal-100 text-teal-700 flex items-center justify-center text-xs">
                      {template.creator.avatar}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 flex items-center gap-1">
                        {template.creator.name}
                        {template.creator.verified && (
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        )}
                      </p>
                      <p className="text-xs text-slate-500">{template.creator.tier} Tier</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {template.downloads.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm text-slate-600">
                        {template.rating} ({template.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {template.price === 0 ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Free
                        </Badge>
                      ) : (
                        <>
                          <Coins className="w-4 h-4 text-teal-600" />
                          <span className="text-slate-900">
                            {template.price} MP
                          </span>
                        </>
                      )}
                    </div>
                    <Button 
                      size="sm"
                      className={`${
                        template.price === 0 || canAfford
                          ? 'bg-teal-600 hover:bg-teal-700'
                          : 'bg-slate-300 cursor-not-allowed'
                      } border-0 text-white`}
                      disabled={template.price > 0 && !canAfford}
                    >
                      {template.price === 0 ? 'Download' : 
                       canAfford ? 'Get Template' : 'Earn More MP'}
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Create Your Own CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
          <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-white mb-3">
            Share Your Expertise
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Have a routine that works? Share it with the community and earn Mastery Points. 
            Top creators can earn 500-2000 MP per month—that's $5-$20 in tier discounts!
          </p>
          <Button 
            size="lg" 
            className="bg-teal-500 hover:bg-teal-600 border-0 text-white"
          >
            Create & Share Template
            <Award className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
