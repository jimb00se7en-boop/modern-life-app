import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Apple,
  Plus,
  Camera,
  TrendingUp,
  Target,
  Droplet,
  Flame,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export function NutritionHub() {
  const todayNutrition = {
    calories: { consumed: 1420, target: 2000, unit: 'kcal' },
    protein: { consumed: 68, target: 120, unit: 'g' },
    carbs: { consumed: 145, target: 200, unit: 'g' },
    fats: { consumed: 52, target: 65, unit: 'g' },
    water: { consumed: 6, target: 8, unit: 'glasses' },
  };

  const meals = [
    {
      id: '1',
      name: 'Breakfast',
      time: '7:30 AM',
      items: ['Oatmeal with berries', 'Greek yogurt', 'Black coffee'],
      calories: 380,
      logged: true,
    },
    {
      id: '2',
      name: 'Mid-Morning Snack',
      time: '10:00 AM',
      items: ['Apple', 'Almonds (1/4 cup)'],
      calories: 220,
      logged: true,
    },
    {
      id: '3',
      name: 'Lunch',
      time: '12:30 PM',
      items: ['Grilled chicken salad', 'Quinoa', 'Olive oil dressing'],
      calories: 520,
      logged: true,
    },
    {
      id: '4',
      name: 'Afternoon Snack',
      time: '3:00 PM',
      items: ['Protein shake', 'Banana'],
      calories: 300,
      logged: true,
    },
    {
      id: '5',
      name: 'Dinner',
      time: '7:00 PM',
      items: [],
      calories: 0,
      logged: false,
      planned: true,
    },
  ];

  const weeklyProgress = [
    { day: 'Mon', adherence: 95 },
    { day: 'Tue', adherence: 88 },
    { day: 'Wed', adherence: 92 },
    { day: 'Thu', adherence: 85 },
    { day: 'Fri', adherence: 90 },
    { day: 'Sat', adherence: 78 },
    { day: 'Sun', adherence: 94 },
  ];

  const goals = [
    {
      name: 'Protein Target',
      current: 68,
      target: 120,
      unit: 'g',
      status: 'in-progress',
    },
    {
      name: 'Vegetable Servings',
      current: 3,
      target: 5,
      unit: 'servings',
      status: 'in-progress',
    },
    {
      name: 'Water Intake',
      current: 6,
      target: 8,
      unit: 'glasses',
      status: 'in-progress',
    },
  ];

  const mealSuggestions = [
    {
      name: 'Grilled Salmon Bowl',
      calories: 580,
      protein: 45,
      time: '25 min',
      tags: ['High Protein', 'Omega-3'],
    },
    {
      name: 'Vegetarian Stir Fry',
      calories: 420,
      protein: 18,
      time: '15 min',
      tags: ['Quick', 'Fiber Rich'],
    },
    {
      name: 'Turkey & Avocado Wrap',
      calories: 490,
      protein: 32,
      time: '10 min',
      tags: ['Quick', 'Balanced'],
    },
  ];

  return (
    <div className="space-y-6 chakra-nutrition">
      {/* Header - Root Chakra (Red) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900">Nutrition Tracker</h2>
                <span className="text-xs text-red-600 px-2 py-1 bg-red-50 rounded-full border border-red-200">Root Chakra 🔴</span>
              </div>
              <p className="text-sm text-slate-600">Ground yourself, nourish your foundation</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Scan Meal
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Log Food
          </Button>
        </div>
      </div>

      {/* Daily Overview */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900">Today's Nutrition</h3>
          <Badge className="bg-green-100 text-green-700 border-0">
            On Track
          </Badge>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Calories */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${
                    (todayNutrition.calories.consumed / todayNutrition.calories.target) *
                    251.2
                  } 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <p className="text-lg text-slate-900">
                    {todayNutrition.calories.consumed}
                  </p>
                  <p className="text-xs text-slate-500">
                    /{todayNutrition.calories.target}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600">Calories</p>
          </div>

          {/* Macros */}
          {['protein', 'carbs', 'fats', 'water'].map((macro) => {
            const data = todayNutrition[macro as keyof typeof todayNutrition];
            return (
              <div key={macro}>
                <div className="flex items-center gap-2 mb-2">
                  {macro === 'protein' && <Flame className="w-4 h-4 text-red-500" />}
                  {macro === 'carbs' && <Target className="w-4 h-4 text-amber-500" />}
                  {macro === 'fats' && <Sparkles className="w-4 h-4 text-purple-500" />}
                  {macro === 'water' && <Droplet className="w-4 h-4 text-blue-500" />}
                  <p className="text-sm text-slate-600 capitalize">{macro}</p>
                </div>
                <p className="text-2xl text-slate-900 mb-1">
                  {data.consumed}
                  <span className="text-sm text-slate-500">/{data.target}</span>
                </p>
                <p className="text-xs text-slate-500 mb-2">{data.unit}</p>
                <Progress
                  value={(data.consumed / data.target) * 100}
                  className="h-2"
                />
              </div>
            );
          })}
        </div>
      </Card>

      <Tabs defaultValue="meals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Meals Log */}
        <TabsContent value="meals" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-slate-900 mb-4">Today's Meals</h3>
              {meals.map((meal) => (
                <Card
                  key={meal.id}
                  className={`p-4 ${
                    meal.logged
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50 border-slate-200 border-dashed'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-slate-900">{meal.name}</p>
                        {meal.logged && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {meal.time}
                        </span>
                        {meal.logged && (
                          <>
                            <span>•</span>
                            <span>{meal.calories} kcal</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {meal.logged ? (
                    <div className="space-y-1">
                      {meal.items.map((item, index) => (
                        <p key={index} className="text-sm text-slate-600">
                          • {item}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      Log {meal.name}
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            {/* Meal Suggestions */}
            <div>
              <Card className="p-6 bg-white border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h3 className="text-slate-900">Dinner Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {mealSuggestions.map((suggestion, index) => (
                    <Card
                      key={index}
                      className="p-3 bg-slate-50 border-slate-200 hover:border-teal-300 cursor-pointer transition-all"
                    >
                      <p className="text-sm text-slate-900 mb-2">{suggestion.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span>{suggestion.calories} kcal</span>
                        <span>•</span>
                        <span>{suggestion.protein}g protein</span>
                        <span>•</span>
                        <span>{suggestion.time}</span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {suggestion.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Goals */}
        <TabsContent value="goals" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Daily Goals</h3>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-900">{goal.name}</p>
                      <p className="text-sm text-slate-600">
                        {goal.current}/{goal.target} {goal.unit}
                      </p>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white border-0">
                <Target className="w-4 h-4 mr-2" />
                Set New Goal
              </Button>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Weekly Adherence</h3>
              <div className="space-y-3">
                {weeklyProgress.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">{day.day}</span>
                      <span className="text-sm text-slate-900">{day.adherence}%</span>
                    </div>
                    <Progress value={day.adherence} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Nutritional Trends</h3>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <p className="text-sm text-slate-900">Protein intake improving</p>
                  </div>
                  <p className="text-xs text-slate-600">
                    +15% increase compared to last week
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <p className="text-sm text-slate-900">Hydration needs attention</p>
                  </div>
                  <p className="text-xs text-slate-600">
                    Average 6.2 glasses/day, target is 8
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="text-slate-900">AI Nutrition Coach</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-slate-700">
                  Based on your activity level and goals, we recommend:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Increase protein by 20g for muscle recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Add more leafy greens for micronutrients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Time carbs around your workout windows</span>
                  </li>
                </ul>
                <Badge className="bg-amber-100 text-amber-700 border-0 mt-3">
                  Unlock at Architect tier
                </Badge>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
