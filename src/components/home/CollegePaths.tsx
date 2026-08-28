import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, GraduationCap } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { colleges } from '@/data/colleges';

export function CollegePaths() {
  const [healthImgError, setHealthImgError] = useState(false);
  const [eduImgError, setEduImgError] = useState(false);

  const healthCollege = colleges.find((c) => c.id === 'health-technology') || colleges[0];
  const eduCollege = colleges.find((c) => c.id === 'education') || colleges[1];

  return (
    <section className="py-20 lg:py-28 bg-[#edf1f6] border-b border-slate-300/80" aria-labelledby="academic-paths-heading">
      <Container size="wide">
        {/* Centered Editorial Header with Tech Gold Accent */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-6 h-0.5 bg-[#B3A369]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-[#8c7b44]">
              THE ACADEMIC PATHS
            </span>
            <span className="w-6 h-0.5 bg-[#B3A369]" aria-hidden="true" />
          </div>
          <h2
            id="academic-paths-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-[#001730] leading-tight"
          >
            Two Colleges. One Direction.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Adeshina Group of Colleges integrates rigorous training in healthcare and educator development on one campus in Share.
          </p>
        </div>

        {/* 2 Symmetrical Large Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* COLLEGE 01 - Health Technology */}
          <div className="flex flex-col bg-white rounded-2xl border border-slate-300/90 shadow-[0_4px_20px_-4px_rgba(0,23,48,0.06)] hover:shadow-[0_12px_36px_-8px_rgba(0,23,48,0.15)] transition-all duration-300 overflow-hidden group">
            {/* Image Container */}
            <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full bg-[#001730] overflow-hidden">
              {!healthImgError && healthCollege?.heroImage ? (
                <img
                  src={healthCollege.heroImage}
                  alt={healthCollege.name}
                  onError={() => setHealthImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#001730] via-[#002244] to-[#0f3a47] flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="text-center z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white mb-2 border border-white/20">
                      <Stethoscope className="w-7 h-7 text-emerald-300" />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">
                      Health Sciences & Technology
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#0b6b54] px-3 py-1 rounded-md inline-block shadow-sm">
                  College 01 · Health Sciences
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#001730] group-hover:text-adeshina-blue transition-colors">
                  {healthCollege.name}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {healthCollege.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={healthCollege.slug}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#001730] hover:text-adeshina-blue group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Health Tech</span>
                  <ArrowRight className="w-4 h-4 text-[#0b6b54]" />
                </Link>
                <Link
                  to="/apply"
                  className="text-xs font-extrabold uppercase tracking-wider text-[#0b6b54] hover:underline"
                >
                  Apply Now &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* COLLEGE 02 - Education */}
          <div className="flex flex-col bg-white rounded-2xl border border-slate-300/90 shadow-[0_4px_20px_-4px_rgba(0,23,48,0.06)] hover:shadow-[0_12px_36px_-8px_rgba(0,23,48,0.15)] transition-all duration-300 overflow-hidden group">
            {/* Image Container */}
            <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full bg-[#001730] overflow-hidden">
              {!eduImgError && eduCollege?.heroImage ? (
                <img
                  src={eduCollege.heroImage}
                  alt={eduCollege.name}
                  onError={() => setEduImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#001730] via-[#002244] to-[#003366] flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="text-center z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white mb-2 border border-white/20">
                      <GraduationCap className="w-7 h-7 text-[#E5D7A3]" />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#E5D7A3]">
                      Teacher Training & Pedagogy
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#002244] px-3 py-1 rounded-md inline-block shadow-sm">
                  College 02 · Educator Training
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#001730] group-hover:text-adeshina-blue transition-colors">
                  {eduCollege.name}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {eduCollege.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={eduCollege.slug}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#001730] hover:text-adeshina-blue group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Education</span>
                  <ArrowRight className="w-4 h-4 text-[#B3A369]" />
                </Link>
                <Link
                  to="/apply"
                  className="text-xs font-extrabold uppercase tracking-wider text-[#001730] hover:underline"
                >
                  Apply Now &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
