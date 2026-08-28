import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Stethoscope, CheckCircle2, Building2 } from 'lucide-react';
import { colleges } from '@/data/colleges';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';

export function CollegesPage() {
  const healthCollege = colleges.find((c) => c.id === 'health-technology') || colleges[0];
  const eduCollege = colleges.find((c) => c.id === 'education') || colleges[1];

  const healthProgs = programmes.filter((p) => p.collegeId === 'health-technology');
  const eduProgs = programmes.filter((p) => p.collegeId === 'education');

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="max-w-3xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              ACADEMIC DIVISIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-navy leading-tight">
              Colleges of Adeshina Group
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Two specialized institutions sharing one serene campus in Share, Kwara State — preparing dedicated professionals in healthcare sciences and education.
            </p>
          </div>
        </Container>
      </section>

      {/* Main 2-College Symmetrical Breakdown Section */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200/80">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* College 01: Health Technology */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between group">
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/10] bg-navy overflow-hidden">
                  <img
                    src={healthCollege.heroImage || '/images/education/campus-gate.jpg'}
                    alt={healthCollege.name}
                    className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
                      <Stethoscope className="w-3.5 h-3.5" />
                      College 01
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                      {healthCollege.name}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {healthCollege.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Featured Training Areas ({healthProgs.length} Programmes)
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {healthCollege.trainingFoci?.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10a37f] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/50">
                <Link
                  to={healthCollege.slug}
                  className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-adeshina-blue transition-colors"
                >
                  <span>Explore Health Tech</span>
                  <ArrowRight className="w-4 h-4 text-adeshina-blue" />
                </Link>

                <Link
                  to="/apply"
                  className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold hover:bg-adeshina-blue active:bg-adeshina-blue-dark transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* College 02: Education */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between group">
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/10] bg-navy overflow-hidden">
                  <img
                    src={eduCollege.heroImage || '/images/education/campus-gate.jpg'}
                    alt={eduCollege.name}
                    className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-adeshina-blue text-white shadow-sm">
                      <BookOpen className="w-3.5 h-3.5" />
                      College 02
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                      {eduCollege.name}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {eduCollege.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Featured Training Areas ({eduProgs.length} Programmes)
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {eduCollege.trainingFoci?.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-adeshina-blue shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/50">
                <Link
                  to={eduCollege.slug}
                  className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-adeshina-blue transition-colors"
                >
                  <span>Explore Education</span>
                  <ArrowRight className="w-4 h-4 text-adeshina-blue" />
                </Link>

                <Link
                  to="/apply"
                  className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold hover:bg-adeshina-blue active:bg-adeshina-blue-dark transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Shared Campus Advantage Banner */}
          <div className="mt-14 p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-navy flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-accent-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-navy text-lg">
                  Shared Central Infrastructure in Share
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
                  Students across both colleges benefit from combined administrative support, campus health facilities, lecture suites, and security infrastructure.
                </p>
              </div>
            </div>

            <Link
              to="/admissions"
              className="px-6 py-3 rounded-xl bg-adeshina-blue text-white text-xs sm:text-sm font-bold hover:bg-adeshina-blue-dark transition-all shrink-0 shadow-xs"
            >
              Start Admission Process
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
