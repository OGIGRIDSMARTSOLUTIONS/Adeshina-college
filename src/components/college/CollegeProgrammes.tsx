import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Stethoscope, CheckCircle2 } from 'lucide-react';
import { College } from '@/types/college';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';

interface CollegeProgrammesProps {
  college: College;
}

export function CollegeProgrammes({ college }: CollegeProgrammesProps) {
  const isHealth = college.id === 'health-technology';
  const collegeProgrammes = programmes.filter((p) => p.collegeId === college.id);

  return (
    <section id="programmes-list" className="py-20 lg:py-28 bg-[#f4f7fb] border-b border-slate-200/80">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              ACADEMIC OFFERINGS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-navy leading-tight">
              Programmes at {college.shortName}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Accredited and structured programmes designed for professional competency and immediate career readiness.
            </p>
          </div>

          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-dark transition-all shrink-0 self-start md:self-auto shadow-sm"
          >
            <span>Admission Guidelines</span>
            <ArrowRight className="w-4 h-4 text-accent-gold" />
          </Link>
        </div>

        {/* 3-Column Structured Grand-Plus Style Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {collegeProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-adeshina-blue/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      isHealth
                        ? 'bg-emerald-50 text-[#0b6b54] border border-emerald-100/80'
                        : 'bg-blue-50 text-navy border border-blue-100/80'
                    }`}
                  >
                    {isHealth ? (
                      <Stethoscope className="w-3 h-3 text-[#10a37f]" />
                    ) : (
                      <BookOpen className="w-3 h-3 text-adeshina-blue" />
                    )}
                    {prog.level}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400">
                    {prog.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-navy leading-snug group-hover:text-adeshina-blue transition-colors">
                  {prog.name}
                </h3>

                {/* Description */}
                {prog.description && (
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {prog.description}
                  </p>
                )}

                {/* Structured Metadata block */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Award / Qualification:</span>
                    <span className="font-semibold text-navy">{prog.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Study Mode:</span>
                    <span className="font-semibold text-navy">{prog.mode.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Duration:</span>
                    <span className="font-semibold text-navy">{prog.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                <Link
                  to={`/programmes?college=${prog.collegeId}`}
                  className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-navy bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-center"
                >
                  View Details
                </Link>

                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-navy hover:bg-adeshina-blue active:bg-adeshina-blue-dark rounded-lg shadow-xs hover:shadow-md transition-all duration-200 text-center"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout: Shared Requirements Note */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <p className="font-bold text-navy text-sm sm:text-base">Need Entry Requirement Clarifications?</p>
              <p className="text-xs sm:text-sm text-slate-500">Review SSCE O'Level requirements and admission guidelines at the central admissions portal.</p>
            </div>
          </div>

          <Link
            to="/admissions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-adeshina-blue uppercase tracking-wider shrink-0 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span>Review Admissions</span>
            <ArrowRight className="w-4 h-4 text-adeshina-blue" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
