import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Stethoscope } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { programmes } from '@/data/programmes';
import { colleges } from '@/data/colleges';

type CollegeFilter = 'all' | 'health-technology' | 'education';

export function ProgrammesPreview() {
  const [activeFilter, setActiveFilter] = useState<CollegeFilter>('all');

  // Balanced 6-card display: 3 Health Tech + 3 Education interleaved
  const displayedProgrammes = useMemo(() => {
    if (activeFilter === 'health-technology') {
      return programmes.filter((p) => p.collegeId === 'health-technology').slice(0, 6);
    }
    if (activeFilter === 'education') {
      return programmes.filter((p) => p.collegeId === 'education').slice(0, 6);
    }

    const health = programmes.filter((p) => p.collegeId === 'health-technology');
    const education = programmes.filter((p) => p.collegeId === 'education');
    const balanced: typeof programmes = [];
    const maxLen = Math.max(health.length, education.length);

    for (let i = 0; i < maxLen; i++) {
      if (health[i]) balanced.push(health[i]);
      if (education[i]) balanced.push(education[i]);
    }

    return balanced.slice(0, 6);
  }, [activeFilter]);

  return (
    <section className="py-20 lg:py-28 bg-[#e2e8f0] border-b border-slate-300/80" aria-labelledby="programmes-preview-heading">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-[#B3A369]" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-[#8c7b44]">
                ACADEMIC PROGRAMMES
              </span>
            </div>
            <h2
              id="programmes-preview-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-[#001730] leading-tight"
            >
              Confirmed Academic Programmes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Explore the college's verified professional diploma and NCE qualifications across health sciences and education.
            </p>
          </div>

          {/* Academic Selector Filter (Collegiate Pill Style) */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-300 shadow-sm shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#001730] text-[#E5D7A3] shadow-sm'
                  : 'text-slate-600 hover:text-[#001730] hover:bg-slate-50'
              }`}
            >
              All Programmes
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('health-technology')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeFilter === 'health-technology'
                  ? 'bg-[#0b6b54] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#001730] hover:bg-slate-50'
              }`}
            >
              Health Technology
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('education')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeFilter === 'education'
                  ? 'bg-[#002244] text-[#E5D7A3] shadow-sm'
                  : 'text-slate-600 hover:text-[#001730] hover:bg-slate-50'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* 3-Column Structured Academic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {displayedProgrammes.map((prog) => {
            const college = colleges.find((c) => c.id === prog.collegeId);
            const isHealth = prog.collegeId === 'health-technology';

            return (
              <div
                key={prog.id}
                className={`bg-white rounded-xl p-6 sm:p-7 border border-slate-300/90 shadow-[0_3px_12px_-2px_rgba(0,23,48,0.06)] hover:shadow-xl transition-all duration-200 flex flex-col justify-between group border-t-4 ${
                  isHealth ? 'border-t-[#0b6b54]' : 'border-t-[#B3A369]'
                }`}
              >
                <div>
                  {/* Top: Category Tag + Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        isHealth
                          ? 'bg-emerald-50 text-[#0b6b54] border border-emerald-200/80'
                          : 'bg-amber-50 text-[#8c7b44] border border-amber-200/80'
                      }`}
                    >
                      {isHealth ? <Stethoscope className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                      {college?.shortName || prog.collegeId}
                    </span>
                  </div>

                  {/* Programme Title */}
                  <h3 className="text-lg font-serif font-bold text-[#001730] leading-snug group-hover:text-adeshina-blue transition-colors">
                    {prog.name}
                  </h3>

                  {/* Summary / Description */}
                  {prog.description && (
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {prog.description}
                    </p>
                  )}

                  {/* Structured Key-Value Metadata Block */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Award:</span>
                      <span className="font-semibold text-[#001730]">{prog.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Study mode:</span>
                      <span className="font-semibold text-[#001730]">{prog.mode.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Duration:</span>
                      <span className="font-semibold text-[#001730]">{prog.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Dual Action Buttons (View Details + Apply Now) */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                  <Link
                    to={`/programmes?college=${prog.collegeId}`}
                    className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-[#001730] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors text-center"
                  >
                    View Details
                  </Link>

                  <Link
                    to="/apply"
                    className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-[#001730] hover:bg-[#B3A369] hover:text-[#001730] rounded-lg shadow-xs hover:shadow-md transition-all duration-200 text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Directory Action */}
        <div className="mt-12 text-center">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#001730] hover:text-white hover:bg-[#001730] transition-all py-3 px-8 rounded-xl bg-white border border-slate-300 shadow-sm"
          >
            <span>View Full Programmes Directory</span>
            <ArrowRight className="w-4 h-4 text-[#B3A369]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
