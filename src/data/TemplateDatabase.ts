// Template System - User-generated routine templates for Modern Life

export type TemplateCategory = 
  | 'meditation'
  | 'sleep'
  | 'nutrition'
  | 'study'
  | 'childcare'
  | 'general';

export type TemplateDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type TemplateStep = {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  optional: boolean;
  aiSuggestion?: string; // Platinum tier feature
  icon?: string;
};

export type TemplateSchedule = {
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  timeOfDay?: string; // e.g., "7:00 AM"
  reminders?: boolean;
};

export type Template = {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  difficulty: TemplateDifficulty;
  
  // Content
  steps: TemplateStep[];
  totalDuration: number; // calculated from steps
  
  // Schedule (Premium tier feature)
  schedule?: TemplateSchedule;
  
  // Metadata
  createdBy: string;
  createdByUserId: string;
  createdAt: string;
  
  // Community metrics
  downloads: number;
  rating: number;
  reviews: number;
  masteryPointsEarned: number; // For creator
  
  // Tier requirements
  requiredTier: 'free' | 'bronze' | 'premium' | 'platinum';
  hasAIFeatures: boolean;
  
  // Tags for discovery
  tags: string[];
  
  // Premium features
  isPublished: boolean;
  isPersonal: boolean;
  version: number;
};

// Sample community templates
export const communityTemplates: Template[] = [
  {
    id: 'tpl-1',
    title: 'Morning Mindfulness Routine',
    description: 'A peaceful 30-minute morning routine combining meditation, breathwork, and journaling to start your day with clarity.',
    category: 'meditation',
    difficulty: 'beginner',
    steps: [
      {
        id: 'step-1',
        title: 'Wake-Up Stretch',
        description: 'Gentle full-body stretching to wake up your muscles',
        duration: 5,
        optional: false,
        icon: '🧘',
      },
      {
        id: 'step-2',
        title: 'Breathing Exercise',
        description: '4-7-8 breathing technique for calm focus',
        duration: 5,
        optional: false,
        icon: '🌬️',
      },
      {
        id: 'step-3',
        title: 'Guided Meditation',
        description: 'Body scan meditation for present moment awareness',
        duration: 15,
        optional: false,
        icon: '🧠',
        aiSuggestion: 'Try our Delta Wave frequency track for deeper relaxation',
      },
      {
        id: 'step-4',
        title: 'Gratitude Journaling',
        description: 'Write 3 things you\'re grateful for',
        duration: 5,
        optional: true,
        icon: '📝',
      },
    ],
    totalDuration: 30,
    schedule: {
      frequency: 'daily',
      timeOfDay: '7:00 AM',
      reminders: true,
    },
    createdBy: 'Sarah Chen',
    createdByUserId: 'user-123',
    createdAt: '2025-10-01',
    downloads: 1847,
    rating: 4.8,
    reviews: 234,
    masteryPointsEarned: 920,
    requiredTier: 'free',
    hasAIFeatures: false,
    tags: ['morning', 'meditation', 'gratitude', 'breathwork'],
    isPublished: true,
    isPersonal: false,
    version: 2,
  },
  {
    id: 'tpl-2',
    title: 'Perfect Sleep Wind-Down',
    description: 'Evidence-based evening routine to optimize sleep quality. Includes blue light reduction, relaxation exercises, and sleep soundscapes.',
    category: 'sleep',
    difficulty: 'beginner',
    steps: [
      {
        id: 'step-1',
        title: 'Digital Sunset',
        description: 'Put away all screens and devices',
        duration: 0,
        optional: false,
        icon: '📵',
      },
      {
        id: 'step-2',
        title: 'Dim the Lights',
        description: 'Switch to warm, low lighting',
        duration: 0,
        optional: false,
        icon: '🔅',
      },
      {
        id: 'step-3',
        title: 'Gentle Yoga',
        description: 'Simple stretches to release tension',
        duration: 10,
        optional: true,
        icon: '🧘‍♀️',
      },
      {
        id: 'step-4',
        title: 'Reading Time',
        description: 'Read a physical book (no screens)',
        duration: 20,
        optional: false,
        icon: '📖',
      },
      {
        id: 'step-5',
        title: 'Sleep Soundscape',
        description: 'Play calming nature sounds or delta waves',
        duration: 45,
        optional: false,
        icon: '🌊',
        aiSuggestion: 'Based on your sleep data, we recommend Ocean Waves tonight',
      },
    ],
    totalDuration: 75,
    schedule: {
      frequency: 'daily',
      timeOfDay: '9:00 PM',
      reminders: true,
    },
    createdBy: 'Dr. Michael Torres',
    createdByUserId: 'user-456',
    createdAt: '2025-09-28',
    downloads: 2341,
    rating: 4.9,
    reviews: 412,
    masteryPointsEarned: 1560,
    requiredTier: 'bronze',
    hasAIFeatures: true,
    tags: ['sleep', 'evening', 'relaxation', 'soundscapes'],
    isPublished: true,
    isPersonal: false,
    version: 3,
  },
  {
    id: 'tpl-3',
    title: 'Deep Work Study Block',
    description: 'Maximize focus and productivity with this 90-minute deep work template. Includes warm-up, focused work, and strategic breaks.',
    category: 'study',
    difficulty: 'intermediate',
    steps: [
      {
        id: 'step-1',
        title: 'Preparation Phase',
        description: 'Clear workspace, gather materials, silence notifications',
        duration: 5,
        optional: false,
        icon: '🎯',
      },
      {
        id: 'step-2',
        title: 'Focus Audio Setup',
        description: 'Start binaural beats or focus frequency',
        duration: 0,
        optional: false,
        icon: '🎧',
        aiSuggestion: '40Hz Gamma waves proven to enhance concentration',
      },
      {
        id: 'step-3',
        title: 'Deep Work Session',
        description: 'Uninterrupted focus on single task',
        duration: 50,
        optional: false,
        icon: '💡',
      },
      {
        id: 'step-4',
        title: 'Active Break',
        description: 'Walk, stretch, hydrate - move your body',
        duration: 10,
        optional: false,
        icon: '🚶',
      },
      {
        id: 'step-5',
        title: 'Second Work Block',
        description: 'Continue focused work or review',
        duration: 25,
        optional: false,
        icon: '📚',
      },
    ],
    totalDuration: 90,
    schedule: {
      frequency: 'custom',
      daysOfWeek: [1, 2, 3, 4, 5], // Weekdays
      timeOfDay: '9:00 AM',
      reminders: true,
    },
    createdBy: 'Alex Rivera',
    createdByUserId: 'user-789',
    createdAt: '2025-10-05',
    downloads: 1523,
    rating: 4.7,
    reviews: 189,
    masteryPointsEarned: 760,
    requiredTier: 'premium',
    hasAIFeatures: true,
    tags: ['study', 'focus', 'productivity', 'deep work'],
    isPublished: true,
    isPersonal: false,
    version: 1,
  },
  {
    id: 'tpl-4',
    title: 'Quick Stress Reset',
    description: 'Fast 5-minute routine to reset during stressful moments. Perfect for busy schedules.',
    category: 'meditation',
    difficulty: 'beginner',
    steps: [
      {
        id: 'step-1',
        title: '5-4-3-2-1 Grounding',
        description: 'Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste',
        duration: 2,
        optional: false,
        icon: '👁️',
      },
      {
        id: 'step-2',
        title: 'Box Breathing',
        description: 'Inhale 4, hold 4, exhale 4, hold 4',
        duration: 3,
        optional: false,
        icon: '⬜',
      },
    ],
    totalDuration: 5,
    createdBy: 'Emma Watson',
    createdByUserId: 'user-321',
    createdAt: '2025-10-10',
    downloads: 3124,
    rating: 4.9,
    reviews: 567,
    masteryPointsEarned: 2080,
    requiredTier: 'free',
    hasAIFeatures: false,
    tags: ['quick', 'stress', 'breathing', 'meditation'],
    isPublished: true,
    isPersonal: false,
    version: 1,
  },
  {
    id: 'tpl-5',
    title: 'Family Dinner Routine',
    description: 'Create meaningful family connections at mealtime. Includes conversation starters and gratitude practice.',
    category: 'childcare',
    difficulty: 'beginner',
    steps: [
      {
        id: 'step-1',
        title: 'Device-Free Zone',
        description: 'Everyone puts phones in basket',
        duration: 0,
        optional: false,
        icon: '📱',
      },
      {
        id: 'step-2',
        title: 'Gratitude Round',
        description: 'Each person shares one good thing from their day',
        duration: 5,
        optional: false,
        icon: '🙏',
      },
      {
        id: 'step-3',
        title: 'Meal & Conversation',
        description: 'Enjoy food together with conversation prompts',
        duration: 25,
        optional: false,
        icon: '🍽️',
      },
      {
        id: 'step-4',
        title: 'Cleanup Together',
        description: 'Everyone helps clear and clean',
        duration: 10,
        optional: false,
        icon: '🧹',
      },
    ],
    totalDuration: 40,
    schedule: {
      frequency: 'daily',
      timeOfDay: '6:00 PM',
      reminders: true,
    },
    createdBy: 'Maria Santos',
    createdByUserId: 'user-654',
    createdAt: '2025-09-30',
    downloads: 892,
    rating: 4.6,
    reviews: 123,
    masteryPointsEarned: 445,
    requiredTier: 'free',
    hasAIFeatures: false,
    tags: ['family', 'connection', 'gratitude', 'childcare'],
    isPublished: true,
    isPersonal: false,
    version: 1,
  },
  {
    id: 'tpl-6',
    title: 'AI-Optimized Recovery Routine',
    description: 'Platinum-tier template with AI adaptation based on your stress levels, sleep quality, and activity data.',
    category: 'general',
    difficulty: 'advanced',
    steps: [
      {
        id: 'step-1',
        title: 'AI Health Check-In',
        description: 'AI analyzes your recent data and adjusts routine',
        duration: 0,
        optional: false,
        icon: '🤖',
        aiSuggestion: 'Your sleep debt is elevated. Extending meditation to 20 minutes.',
      },
      {
        id: 'step-2',
        title: 'Dynamic Meditation',
        description: 'Duration adjusts based on stress levels',
        duration: 15,
        optional: false,
        icon: '🧘',
        aiSuggestion: 'Recommended frequency: 528 Hz (healing)',
      },
      {
        id: 'step-3',
        title: 'Adaptive Movement',
        description: 'Gentle or active based on energy levels',
        duration: 15,
        optional: false,
        icon: '🏃',
        aiSuggestion: 'Energy detected: Low. Switching to gentle yoga.',
      },
      {
        id: 'step-4',
        title: 'Smart Nutrition',
        description: 'Meal suggestions based on activity & goals',
        duration: 0,
        optional: false,
        icon: '🥗',
        aiSuggestion: 'Protein needs elevated today. Suggesting high-protein snack.',
      },
      {
        id: 'step-5',
        title: 'Recovery Soundscape',
        description: 'AI-selected audio for your current state',
        duration: 20,
        optional: true,
        icon: '🎵',
        aiSuggestion: 'Playing: Theta Waves for deep relaxation',
      },
    ],
    totalDuration: 50,
    schedule: {
      frequency: 'daily',
      timeOfDay: '7:00 PM',
      reminders: true,
    },
    createdBy: 'Dr. AI Systems',
    createdByUserId: 'user-ai',
    createdAt: '2025-10-12',
    downloads: 567,
    rating: 5.0,
    reviews: 89,
    masteryPointsEarned: 1890,
    requiredTier: 'platinum',
    hasAIFeatures: true,
    tags: ['ai', 'adaptive', 'recovery', 'platinum', 'smart'],
    isPublished: true,
    isPersonal: false,
    version: 4,
  },
];

// Helper functions
export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return communityTemplates.filter(t => t.category === category);
}

export function getTemplatesByTier(tier: string): Template[] {
  const tierHierarchy = ['free', 'bronze', 'premium', 'platinum'];
  const userTierIndex = tierHierarchy.indexOf(tier);
  
  return communityTemplates.filter(t => {
    const templateTierIndex = tierHierarchy.indexOf(t.requiredTier);
    return templateTierIndex <= userTierIndex;
  });
}

export function getPopularTemplates(limit: number = 5): Template[] {
  return [...communityTemplates]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
}

export function getTopRatedTemplates(limit: number = 5): Template[] {
  return [...communityTemplates]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function calculateMasteryPoints(template: Template): number {
  // Creator earns MP based on downloads and ratings
  const downloadPoints = Math.floor(template.downloads / 10); // 1 MP per 10 downloads
  const ratingBonus = template.rating >= 4.5 ? 100 : 0;
  const reviewBonus = template.reviews > 100 ? 50 : 0;
  
  return downloadPoints + ratingBonus + reviewBonus;
}

// Tier feature checks
export function canCreateTemplate(userTier: string): boolean {
  // Available from Bronze tier onwards
  const tierHierarchy = ['free', 'bronze', 'premium', 'platinum'];
  return tierHierarchy.indexOf(userTier) >= 1;
}

export function getMaxSteps(userTier: string): number {
  switch(userTier) {
    case 'bronze': return 5;
    case 'premium': return 15;
    case 'platinum': return 999; // unlimited
    default: return 0;
  }
}

export function hasSchedulingFeature(userTier: string): boolean {
  return ['premium', 'platinum'].includes(userTier);
}

export function hasAIFeatures(userTier: string): boolean {
  return userTier === 'platinum';
}
