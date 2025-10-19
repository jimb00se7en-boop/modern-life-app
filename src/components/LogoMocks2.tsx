import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function LogoMocks2() {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-teal-600 border-0 text-white">Round 2: Typography Focus</Badge>
          <h2 className="text-slate-900 mb-3">Clean Wordmark Variations</h2>
          <p className="text-slate-600">Simple, strong, custom text treatments</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Logo 6: Geometric Modern */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 80" className="w-full h-auto">
                {/* MODERN with geometric M */}
                <path d="M10 60 L10 25 L20 38 L30 25 L30 60" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="40" y="60" fontFamily="system-ui, -apple-system" fontSize="32" fontWeight="700" fill="#0f172a" letterSpacing="-1">ODERN</text>
                
                {/* LIFE below */}
                <text x="10" y="75" fontFamily="system-ui, -apple-system" fontSize="24" fontWeight="300" fill="#64748b" letterSpacing="2">LIFE</text>
                
                {/* Teal accent dot */}
                <circle cx="190" cy="28" r="4" fill="#14b8a6"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Geometric M</p>
            <p className="text-xs text-center text-slate-500 mt-1">Bold + Light Mix</p>
          </Card>

          {/* Logo 7: Split Level */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 80" className="w-full h-auto">
                {/* MOD in bold, ERN in light */}
                <text x="10" y="45" fontFamily="system-ui, -apple-system" fontSize="28" fontWeight="800" fill="#0f172a" letterSpacing="-0.5">MOD</text>
                <text x="75" y="45" fontFamily="system-ui, -apple-system" fontSize="28" fontWeight="300" fill="#0f172a" letterSpacing="-0.5">ERN</text>
                
                {/* LIFE with teal accent */}
                <text x="10" y="70" fontFamily="system-ui, -apple-system" fontSize="28" fontWeight="800" fill="#14b8a6" letterSpacing="-0.5">LIFE</text>
                
                {/* Spark element */}
                <path d="M175 35 L180 40 L175 45" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Split Weight</p>
            <p className="text-xs text-center text-slate-500 mt-1">Teal "LIFE" Pop</p>
          </Card>

          {/* Logo 8: Slash Divider */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 80" className="w-full h-auto">
                {/* MODERN / LIFE with slash */}
                <text x="10" y="50" fontFamily="system-ui, -apple-system" fontSize="26" fontWeight="600" fill="#0f172a" letterSpacing="-0.5">MODERN</text>
                <line x1="130" y1="25" x2="145" y2="55" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round"/>
                <text x="150" y="50" fontFamily="system-ui, -apple-system" fontSize="26" fontWeight="600" fill="#0f172a" letterSpacing="-0.5">LIFE</text>
                
                {/* Subtle underline accent */}
                <line x1="10" y1="58" x2="60" y2="58" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Slash Divide</p>
            <p className="text-xs text-center text-slate-500 mt-1">Dynamic Separator</p>
          </Card>

          {/* Logo 9: Dot Accent ML */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 80" className="w-full h-auto">
                {/* ML monogram large */}
                <text x="15" y="55" fontFamily="system-ui, -apple-system" fontSize="48" fontWeight="800" fill="#0f172a" letterSpacing="-2">ML</text>
                
                {/* Dot between M and L */}
                <circle cx="95" cy="35" r="5" fill="#14b8a6"/>
                
                {/* modern life small underneath */}
                <text x="15" y="72" fontFamily="system-ui, -apple-system" fontSize="12" fontWeight="400" fill="#64748b" letterSpacing="1.5">MODERN LIFE</text>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">ML Monogram</p>
            <p className="text-xs text-center text-slate-500 mt-1">Teal Dot Accent</p>
          </Card>

          {/* Logo 10: Stacked Minimal */}
          <Card className="p-8 bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <div className="aspect-square flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 80" className="w-full h-auto">
                {/* MODERN stacked over LIFE */}
                <text x="20" y="40" fontFamily="system-ui, -apple-system" fontSize="24" fontWeight="700" fill="#0f172a" letterSpacing="0">MODERN</text>
                <text x="20" y="65" fontFamily="system-ui, -apple-system" fontSize="24" fontWeight="700" fill="#0f172a" letterSpacing="0">LIFE</text>
                
                {/* Gradient bar between */}
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#14b8a6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <rect x="20" y="47" width="90" height="3" fill="url(#grad1)" rx="1.5"/>
              </svg>
            </div>
            <p className="text-xs text-center text-slate-600">Stacked Stack</p>
            <p className="text-xs text-center text-slate-500 mt-1">Gradient Divider</p>
          </Card>
        </div>

        {/* Typography Guidelines */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-700 mb-4 text-center">Typography System</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mb-3">
                <svg viewBox="0 0 120 40" className="w-full h-auto">
                  <text x="10" y="30" fontFamily="system-ui, -apple-system" fontSize="24" fontWeight="800" fill="#0f172a">Aa</text>
                </svg>
              </div>
              <p className="text-xs text-slate-600">Primary Weight</p>
              <p className="text-xs text-slate-500">700-800 Bold</p>
            </div>
            <div className="text-center">
              <div className="mb-3">
                <svg viewBox="0 0 120 40" className="w-full h-auto">
                  <text x="10" y="30" fontFamily="system-ui, -apple-system" fontSize="24" fontWeight="300" fill="#64748b">Aa</text>
                </svg>
              </div>
              <p className="text-xs text-slate-600">Secondary Weight</p>
              <p className="text-xs text-slate-500">300-400 Light</p>
            </div>
            <div className="text-center">
              <div className="mb-3">
                <svg viewBox="0 0 120 40" className="w-full h-auto">
                  <circle cx="20" cy="20" r="6" fill="#14b8a6"/>
                  <line x1="35" y1="20" x2="55" y2="20" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-xs text-slate-600">Accent Elements</p>
              <p className="text-xs text-slate-500">Teal + Amber</p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border-slate-200">
            <p className="text-xs text-slate-900 mb-2">✓ Use Cases:</p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• App icon: ML Monogram (#9)</li>
              <li>• Website header: Slash Divider (#8)</li>
              <li>• Marketing: Geometric M (#6)</li>
            </ul>
          </Card>
          <Card className="p-4 bg-white border-slate-200">
            <p className="text-xs text-slate-900 mb-2">Design Notes:</p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Keep weight contrast strong</li>
              <li>• Limit accent colors to small areas</li>
              <li>• Ensure scalability at all sizes</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
