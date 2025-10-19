import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function LogoMocks() {
  return (
    <div className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-teal-600 border-0 text-white">Logo Concepts</Badge>
          <h2 className="text-slate-900 mb-3">Modern Life Brand Identity</h2>
          <p className="text-slate-600">5 logo directions to explore</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Logo 1: ML Monogram */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Geometric ML monogram */}
                <circle cx="60" cy="60" r="55" fill="none" stroke="#14b8a6" strokeWidth="2"/>
                <path d="M35 70 L35 40 L45 55 L55 40 L55 70" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M65 70 L65 40 L85 40 L85 50 L75 50 L85 60 L85 70 L65 70" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Monogram Circle</p>
            <p className="text-xs text-center text-slate-500 mt-1">Classic & Professional</p>
          </Card>

          {/* Logo 2: Balance Symbol */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Abstract balance/harmony symbol */}
                <path d="M20 60 Q40 30 60 60 T100 60" stroke="#14b8a6" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M20 70 Q40 90 60 70 T100 70" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <circle cx="60" cy="60" r="8" fill="#0f172a"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Life Balance</p>
            <p className="text-xs text-center text-slate-500 mt-1">Flow & Harmony</p>
          </Card>

          {/* Logo 3: Growth Arc */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Progressive growth arcs */}
                <path d="M30 90 Q30 70 50 70" stroke="#cbd5e1" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M40 90 Q40 60 60 60" stroke="#94a3b8" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M50 90 Q50 50 70 50" stroke="#64748b" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M60 90 Q60 40 80 40" stroke="#14b8a6" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <circle cx="80" cy="40" r="6" fill="#f59e0b"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Mastery Path</p>
            <p className="text-xs text-center text-slate-500 mt-1">Achievement & Growth</p>
          </Card>

          {/* Logo 4: Interconnected System */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Interconnected circles representing holistic life */}
                <circle cx="60" cy="40" r="15" fill="none" stroke="#14b8a6" strokeWidth="3"/>
                <circle cx="40" cy="70" r="15" fill="none" stroke="#14b8a6" strokeWidth="3"/>
                <circle cx="80" cy="70" r="15" fill="none" stroke="#14b8a6" strokeWidth="3"/>
                <line x1="54" y1="52" x2="46" y2="62" stroke="#f59e0b" strokeWidth="2"/>
                <line x1="66" y1="52" x2="74" y2="62" stroke="#f59e0b" strokeWidth="2"/>
                <circle cx="60" cy="60" r="5" fill="#0f172a"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Connected Life</p>
            <p className="text-xs text-center text-slate-500 mt-1">Holistic System</p>
          </Card>

          {/* Logo 5: Modern Wordmark with Symbol */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Minimalist M+L with spark */}
                <rect x="20" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <rect x="28" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <path d="M22 55 L26 60 L30 55" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                <rect x="40" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <rect x="40" y="76" width="15" height="4" fill="#0f172a" rx="2"/>
                
                <path d="M65 45 L70 50 L65 55 M70 50 L75 45 M70 50 L75 55" stroke="#14b8a6" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="85" cy="45" r="2" fill="#f59e0b"/>
                <circle cx="88" cy="52" r="1.5" fill="#f59e0b"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">ML + Spark</p>
            <p className="text-xs text-center text-slate-500 mt-1">Clean & AI-Accent</p>
          </Card>
        </div>

        {/* Color Palette Reference */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200">
          <p className="text-sm text-slate-700 mb-4 text-center">Brand Color Palette</p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-slate-900 mb-2 border border-slate-200"></div>
              <p className="text-xs text-slate-600">Primary</p>
              <p className="text-xs text-slate-500">#0f172a</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-teal-500 mb-2"></div>
              <p className="text-xs text-slate-600">Accent</p>
              <p className="text-xs text-slate-500">#14b8a6</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-amber-500 mb-2"></div>
              <p className="text-xs text-slate-600">Energy</p>
              <p className="text-xs text-slate-500">#f59e0b</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-slate-200 mb-2 border border-slate-300"></div>
              <p className="text-xs text-slate-600">Neutral</p>
              <p className="text-xs text-slate-500">#e2e8f0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
