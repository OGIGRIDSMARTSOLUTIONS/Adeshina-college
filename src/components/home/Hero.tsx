import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, Stethoscope, Award, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_CAMPUS_IMAGE = '/images/education/campus-gate.jpg';

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const animationProps = (delay = 0) => {
    if (shouldReduceMotion) return {};
    return {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: 'easeOut' as const },
    };
  };

  return (
    <section
      className="relative bg-[#001f3f] text-white overflow-hidden border-b border-slate-800"
      aria-label="Adeshina Institutional Introduction"
    >
      {/* 
        Full-Bleed Institutional Campus Photography Canvas (Georgia Tech Archetype)
        - Crisp authentic photography with natural lighting
        - Directional dark navy & charcoal vignette for authoritative contrast
      */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src={HERO_CAMPUS_IMAGE}
          alt="Adeshina Group of Colleges Campus Gate in Share, Kwara State"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-[center_28%] sm:object-[center_35%] lg:object-[center_25%] transition-opacity duration-700 ${
            imageLoaded ? 'opacity-70' : 'opacity-0'
          }`}
        />

        {/* Georgia Tech Style Multi-layer Vignette: Deep Navy to dark charcoal */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001730] via-[#001f3f]/90 via-45% to-[#001f3f]/40 to-90%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001730] via-transparent via-50% to-[#001730]/60" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow Label with Tech Gold Accent Line */}
          <motion.div {...animationProps(0.05)} className="flex items-center gap-3">
            <span className="w-8 sm:w-10 h-0.5 bg-[#B3A369]" aria-hidden="true" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#E5D7A3]">
              ONE CAMPUS · TWO COLLEGES · SHARE, KWARA STATE
            </span>
          </motion.div>

          {/* Stately Collegiate Headline */}
          <motion.h1
            {...animationProps(0.1)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-black tracking-tight text-white leading-[1.12]"
          >
            Where Educators and Health Professionals Are Made.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            {...animationProps(0.16)}
            className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl"
          >
            Adeshina Group of Colleges unites specialised training in teacher education and healthcare technology on a disciplined, state-of-the-art campus in Share, Kwara State.
          </motion.p>

          {/* Action CTAs (Georgia Tech Gold & High-Contrast White) */}
          <motion.div
            {...animationProps(0.22)}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
          >
            <Link
              to="/programmes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#B3A369] text-[#001730] text-sm font-extrabold uppercase tracking-wider shadow-lg hover:bg-white hover:text-[#001730] transition-all duration-200 group"
            >
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/10 text-white hover:bg-white hover:text-[#001730] border border-white/30 text-sm font-extrabold uppercase tracking-wider backdrop-blur-sm transition-all duration-200"
            >
              <span>Apply Online</span>
            </Link>
          </motion.div>

          {/* Institutional Highlights Metadata Bar */}
          <motion.div
            {...animationProps(0.28)}
            className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs sm:text-sm text-slate-300 font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B3A369]" />
              <span>NCCE Accredited Institution</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B3A369]" />
              <span>Clinical & Laboratory Mastery</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B3A369]" />
              <span>Share Campus, Kwara State</span>
            </div>
          </motion.div>
        </div>

        {/* 
          Georgia Tech Style Dual Academic Gateway Cards
          - Solid collegiate structure with gold accent borders and direct action links
        */}
        <motion.div
          {...animationProps(0.34)}
          className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {/* College 01: Education */}
          <Link
            to="/colleges/education"
            className="bg-[#001730]/90 hover:bg-[#001f3f] border-l-4 border-l-[#B3A369] border border-white/15 rounded-xl p-6 sm:p-7 transition-all duration-200 shadow-xl group flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 text-[#E5D7A3] flex items-center justify-center shrink-0 group-hover:bg-[#B3A369] group-hover:text-[#001730] transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#B3A369] block mb-1">
                  FACULTY & PATHWAYS
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#E5D7A3] transition-colors">
                  Adeshina College of Education
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  Empowering future educators and instructional leaders through rigorous Nigerian Certificate in Education (NCE) curricula.
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-1 text-slate-400 group-hover:text-[#B3A369] group-hover:translate-x-1 transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* College 02: Health Technology */}
          <Link
            to="/colleges/health-technology"
            className="bg-[#001730]/90 hover:bg-[#001f3f] border-l-4 border-l-[#10a37f] border border-white/15 rounded-xl p-6 sm:p-7 transition-all duration-200 shadow-xl group flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-[#10a37f] group-hover:text-white transition-colors">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-400 block mb-1">
                  HEALTH SCIENCES & TECHNOLOGY
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Adeshina College of Health Technology
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  Practical healthcare training in Community Health (CHEW), Pharmacy, Medical Lab, and Environmental Health disciplines.
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-1 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
