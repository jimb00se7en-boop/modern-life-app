import { AlertCircle, Calendar, Brain, Apple, Baby, BookOpen } from 'lucide-react';
import { Card } from './ui/card';

const painPoints = [
  {
    icon: Calendar,
    title: 'Meditation Scheduling',
    points: [
      'Forget to meditate despite best intentions',
      'Can\'t find consistent time slots in busy schedule',
      'Lose motivation when missing sessions',
      'No accountability or progress tracking',
    ],
  },
  {
    icon: Brain,
    title: 'Mental Health Tracking',
    points: [
      'Difficult to identify mood patterns over time',
      'No structured way to log emotional states',
      'Therapy sessions lack data-driven insights',
      'Struggling to connect triggers with reactions',
    ],
  },
  {
    icon: Apple,
    title: 'Dietary Management',
    points: [
      'Confusing macronutrient percentile targets',
      'Inconsistent meal logging habits',
      'Can\'t visualize nutrition trends',
      'Overwhelmed by conflicting diet advice',
    ],
  },
  {
    icon: Baby,
    title: 'Childcare Coordination',
    points: [
      'Juggling multiple caregivers and schedules',
      'Last-minute changes cause chaos',
      'No central communication hub',
      'Missing important developmental milestones',
    ],
  },
  {
    icon: BookOpen,
    title: 'Study Management',
    points: [
      'Procrastination leads to missed deadlines',
      'No clear view of workload distribution',
      'Cramming instead of spaced repetition',
      'Burnout from poor time estimation',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Sleep Quality',
    points: [
      'Irregular sleep schedules disrupt routines',
      'No insight into sleep cycle quality',
      'Racing thoughts prevent deep rest',
      'Morning grogginess affects productivity',
    ],
  },
];

export function PainPoints() {
  // Show only top 4 most critical pain points
  const topPainPoints = painPoints.slice(0, 4);

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-slate-900 mb-3">
            Life Shouldn't Feel This Overwhelming
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            You're juggling too much. We help you master what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topPainPoints.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card key={idx} className="p-4 bg-white border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-slate-900 text-sm">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  {category.points[0]}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
