import { CheckCircle2, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';

interface CollegeOverviewProps {
  college: College;
}

export function CollegeOverview({ college }: CollegeOverviewProps) {
  const isHealth = college.id === 'health-technology';

  return (
    <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
            COLLEGE OVERVIEW & ACADEMIC STANDARDS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-serif font-black tracking-tight text-navy leading-tight">
            Built for Rigorous Professional Competency
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {college.description}
          </p>
        </div>

        {/* 2-Column Grid: Left Core Pillars + Right Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: 3 Feature Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {college.features?.map((feature, idx) => (
              <div
                key={feature.title}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] flex items-start gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-serif font-bold text-base ${
                    isHealth
                      ? 'bg-emerald-50 text-[#0b6b54] border border-emerald-100'
                      : 'bg-blue-50 text-navy border border-blue-100'
                  }`}
                >
                  {`0${idx + 1}`}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Core Academic Foci Block (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-accent-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    Key Curricular Foci
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-navy mb-5">
                  Core Professional Competencies
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                  {college.trainingFoci?.map((focus) => (
                    <li key={focus} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isHealth ? 'text-[#10a37f]' : 'text-adeshina-blue'
                        }`}
                      />
                      <span className="leading-relaxed">{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Serene Location Badge */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <Compass className="w-4 h-4 text-accent-gold" />
                  <span>Share Campus Learning Environment</span>
                </span>
                <Sparkles className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
