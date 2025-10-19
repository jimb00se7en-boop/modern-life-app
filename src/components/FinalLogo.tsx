import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function FinalLogo() {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm mb-4">
            ✨ Enhanced Option 5
          </div>
          <h2 className="text-slate-900 mb-3">Modern Life Final Logo</h2>
          <p className="text-slate-600">ML wordmark with orbital rings</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Primary Version - Full Color */}
          <Card className="p-8 bg-white border-slate-200 shadow-lg">
            <div className="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Three Elliptic Rings - Neutral Palette */}
                <ellipse cx="77" cy="48" rx="22" ry="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.6" transform="rotate(-15 77 48)"/>
                <ellipse cx="77" cy="48" rx="16" ry="11" fill="none" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.7" transform="rotate(-15 77 48)"/>
                <ellipse cx="77" cy="48" rx="10" ry="7" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.8" transform="rotate(-15 77 48)"/>
                
                {/* ML Letterforms */}
                <rect x="20" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <rect x="28" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <path d="M22 55 L26 60 L30 55" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                <rect x="40" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <rect x="40" y="76" width="15" height="4" fill="#0f172a" rx="2"/>
                
                {/* Spark/X Element with Teal */}
                <path d="M65 45 L70 50 L65 55 M70 50 L75 45 M70 50 L75 55" stroke="#14b8a6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Dots with Amber */}
                <circle cx="85" cy="45" r="2.5" fill="#f59e0b"/>
                <circle cx="88" cy="52" r="1.8" fill="#f59e0b"/>
                <circle cx="82" cy="51" r="1.3" fill="#f59e0b" opacity="0.7"/>
              </svg>
            </div>
            <p className="text-sm text-center text-slate-900 mb-1">Primary Logo</p>
            <p className="text-xs text-center text-slate-500">Full color version</p>
          </Card>

          {/* Monochrome Version */}
          <Card className="p-8 bg-slate-900 border-slate-800 shadow-lg">
            <div className="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Three Elliptic Rings - Monochrome */}
                <ellipse cx="77" cy="48" rx="22" ry="16" fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.4" transform="rotate(-15 77 48)"/>
                <ellipse cx="77" cy="48" rx="16" ry="11" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.5" transform="rotate(-15 77 48)"/>
                <ellipse cx="77" cy="48" rx="10" ry="7" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6" transform="rotate(-15 77 48)"/>
                
                {/* ML Letterforms */}
                <rect x="20" y="50" width="4" height="30" fill="#ffffff" rx="2"/>
                <rect x="28" y="50" width="4" height="30" fill="#ffffff" rx="2"/>
                <path d="M22 55 L26 60 L30 55" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                <rect x="40" y="50" width="4" height="30" fill="#ffffff" rx="2"/>
                <rect x="40" y="76" width="15" height="4" fill="#ffffff" rx="2"/>
                
                {/* Spark/X Element */}
                <path d="M65 45 L70 50 L65 55 M70 50 L75 45 M70 50 L75 55" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Dots */}
                <circle cx="85" cy="45" r="2.5" fill="#ffffff"/>
                <circle cx="88" cy="52" r="1.8" fill="#ffffff"/>
                <circle cx="82" cy="51" r="1.3" fill="#ffffff" opacity="0.7"/>
              </svg>
            </div>
            <p className="text-sm text-center text-white mb-1">Dark Mode</p>
            <p className="text-xs text-center text-slate-400">Monochrome reverse</p>
          </Card>

          {/* Icon Version - Simplified */}
          <Card className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 shadow-lg">
            <div className="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Simplified rings for small sizes */}
                <ellipse cx="60" cy="60" rx="45" ry="33" fill="none" stroke="#cbd5e1" strokeWidth="2" opacity="0.5" transform="rotate(-15 60 60)"/>
                <ellipse cx="60" cy="60" rx="32" ry="23" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.6" transform="rotate(-15 60 60)"/>
                
                {/* Centered ML */}
                <rect x="35" y="45" width="5" height="30" fill="#0f172a" rx="2"/>
                <rect x="45" y="45" width="5" height="30" fill="#0f172a" rx="2"/>
                <path d="M37 51 L42.5 58 L48 51" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                
                <rect x="58" y="45" width="5" height="30" fill="#0f172a" rx="2"/>
                <rect x="58" y="70" width="20" height="5" fill="#0f172a" rx="2"/>
                
                {/* Simple spark */}
                <path d="M85 55 L90 60 L85 65" stroke="#14b8a6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="95" cy="60" r="3" fill="#f59e0b"/>
              </svg>
            </div>
            <p className="text-sm text-center text-slate-900 mb-1">App Icon</p>
            <p className="text-xs text-center text-slate-600">Simplified for small sizes</p>
          </Card>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4 text-sm">Design Elements</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-slate-100 shrink-0 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <ellipse cx="8" cy="8" rx="6" ry="4" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-900">Orbital Rings</p>
                  <p>3 elliptic rings represent life balance, growth paths, and interconnected systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-teal-100 shrink-0 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M6 6 L8 8 L6 10" stroke="#14b8a6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-900">Spark Element</p>
                  <p>Represents AI assistance and forward momentum</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-amber-100 shrink-0 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="2" fill="#f59e0b"/>
                  </svg>
                </div>
                <div>
                  <p className="text-slate-900">Energy Dots</p>
                  <p>Achievement points and mastery milestones</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4 text-sm">Usage Specifications</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <p className="text-slate-900 mb-1">Minimum Size</p>
                <p>24px height (rings remain visible)</p>
              </div>
              <div>
                <p className="text-slate-900 mb-1">Clear Space</p>
                <p>Maintain 8px padding on all sides</p>
              </div>
              <div>
                <p className="text-slate-900 mb-1">Color Modes</p>
                <p>Primary (color), Dark (white), Icon (simplified)</p>
              </div>
              <div>
                <p className="text-slate-900 mb-1">File Formats</p>
                <p>SVG for web/app, PNG for social media</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Color Reference */}
        <div className="mt-6 p-6 bg-slate-900 rounded-xl">
          <p className="text-white text-sm mb-4">Logo Color Palette</p>
          <div className="grid grid-cols-6 gap-3">
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-slate-900 border border-slate-700 mb-2"></div>
              <p className="text-xs text-slate-400">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-teal-500 mb-2"></div>
              <p className="text-xs text-slate-400">Accent</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-amber-500 mb-2"></div>
              <p className="text-xs text-slate-400">Energy</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-slate-300 border border-slate-400 mb-2"></div>
              <p className="text-xs text-slate-400">Ring 1</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-slate-400 mb-2"></div>
              <p className="text-xs text-slate-400">Ring 2</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-slate-500 mb-2"></div>
              <p className="text-xs text-slate-400">Ring 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
