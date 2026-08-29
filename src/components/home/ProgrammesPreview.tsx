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
    <section className="py-20 lg:py-28 bg-[#f8fbff] border-b border-sky-100" aria-labelledby="programmes-preview-heading">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-sky-500" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
                ACADEMIC PROGRAMMES
              </span>
            </div>
            <h2
              id="programmes-preview-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-[#05264c] leading-tight"
            >
              Confirmed Academic Programmes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Explore the college's verified professional diploma and NCE qualifications across health sciences and education.
            </p>
          </div>

          {/* Academic Selector Filter (Light Sky Blue Pill Style) */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-sky-200 shadow-xs shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#05264c] text-sky-200 shadow-sm'
                  : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50'
              }`}
            >
              All Programmes
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('health-technology')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeFilter === 'health-technology'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Health Technology
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('education')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeFilter === 'education'
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50'
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
                className={`bg-white rounded-xl p-6 sm:p-7 border border-sky-100 shadow-[0_3px_14px_-2px_rgba(2,132,199,0.06)] hover:shadow-xl hover:border-sky-200 transition-all duration-200 flex flex-col justify-between group border-t-4 ${
                  isHealth ? 'border-t-emerald-500' : 'border-t-sky-500'
                }`}
              >
                <div>
                  {/* Top: Category Tag + Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        isHealth
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : 'bg-sky-50 text-sky-800 border border-sky-200/80'
                      }`}
                    >
                      {isHealth ? (
                        <Stethoscope className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <BookOpen className="w-3 h-3 text-sky-600" />
                      )}
                      <span>{isHealth ? 'Health Tech' : 'Education (NCE)'}</span>
                    </span>

                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      {prog.level}
                    </span>
                  </div>

                  {/* Programme Name */}
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#05264c] group-hover:text-sky-700 transition-colors leading-snug">
                    <Link to={`/programmes?college=${prog.collegeId}`}>
                      {prog.name}
                    </Link>
                  </h3>

                  {/* Faculty Meta */}
                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    {college?.name}
                  </p>

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
                      <span className="font-semibold text-[#05264c]">{prog.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Study mode:</span>
                      <span className="font-semibold text-[#05264c]">{prog.mode.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Duration:</span>
                      <span className="font-semibold text-[#05264c]">{prog.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Dual Action Buttons (View Details + Apply Now) */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                  <Link
                    to={`/programmes?college=${prog.collegeId}`}
                    className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-sky-800 bg-sky-50/70 hover:bg-sky-100/80 rounded-lg border border-sky-200 transition-colors text-center"
                  >
                    View Details
                  </Link>

                  <Link
                    to="/apply"
                    className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-[#05264c] hover:bg-sky-500 hover:text-[#05264c] rounded-lg shadow-xs hover:shadow-md transition-all duration-200 text-center"
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
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#05264c] hover:text-white hover:bg-[#05264c] transition-all py-3.5 px-8 rounded-xl bg-white border border-sky-200 shadow-sm hover:shadow-md"
          >
            <span>View Full Programmes Directory</span>
            <ArrowRight className="w-4 h-4 text-sky-500" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
