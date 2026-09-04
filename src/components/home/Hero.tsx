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
      className="relative bg-[#05264c] text-white overflow-hidden border-b border-sky-900/50"
      aria-label="Adeshina Institutional Introduction"
    >
      {/* 
        Full-Bleed Vibrant Campus Photography Canvas (Light Sky Blue Atmosphere)
        - Crisp authentic campus gate photography
        - Luminous light blue & frosted white ambient glow to remove dull dark royal blue vibes
      */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src={HERO_CAMPUS_IMAGE}
          alt="Adeshina Group of Colleges Campus Gate in Share, Kwara State"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-[center_28%] sm:object-[center_35%] lg:object-[center_25%] transition-opacity duration-700 ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Crisp Light Blue / Cyan Gradient with Frosted Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052042] via-[#073663]/85 via-50% to-[#0284c7]/25 to-90%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#052042] via-transparent via-45% to-[#0284c7]/20" />
        
        {/* Soft cyan/sky radial highlight for fresh modern energy */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow Label with Light Sky & Gold Accent */}
          <motion.div {...animationProps(0.05)} className="flex items-center gap-3">
            <span className="w-8 sm:w-10 h-0.5 bg-sky-300" aria-hidden="true" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-sky-200">
              ONE CAMPUS · TWO COLLEGES · SHARE, KWARA STATE
            </span>
          </motion.div>

          {/* Stately Collegiate Headline */}
          <motion.h1
            {...animationProps(0.1)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-black tracking-tight text-white leading-[1.12] drop-shadow-sm"
          >
            Where Educators and Health Professionals Are Made.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            {...animationProps(0.16)}
            className="text-sm sm:text-base lg:text-lg text-sky-100 leading-relaxed font-normal max-w-2xl"
          >
            Adeshina Group of Colleges unites specialised training in teacher education and healthcare technology on a disciplined, state-of-the-art campus in Share, Kwara State.
          </motion.p>

          {/* Action CTAs (Vibrant Light Sky & Frosted White Glass) */}
          <motion.div
            {...animationProps(0.22)}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
          >
            <Link
              to="/programmes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#052042] text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 transition-all duration-200 group"
            >
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-sm font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md transition-all duration-200"
            >
              <span>Apply Online</span>
            </Link>
          </motion.div>

          {/* Institutional Highlights Metadata Bar */}
          <motion.div
            {...animationProps(0.28)}
            className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs sm:text-sm text-sky-100 font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span>NCCE Accredited Institution</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-300" />
              <span>Clinical & Laboratory Mastery</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-300" />
              <span>Share Campus, Kwara State</span>
            </div>
          </motion.div>
        </div>

        {/* 
          Dual Academic Gateway Cards (Frosted Light White/Sky Blur Glassmorphism)
        */}
        <motion.div
          {...animationProps(0.34)}
          className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {/* College 01: Education */}
          <Link
            to="/colleges/education"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border-l-4 border-l-sky-400 border border-white/25 rounded-2xl p-6 sm:p-7 transition-all duration-200 shadow-2xl group flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-400/20 text-sky-200 flex items-center justify-center shrink-0 group-hover:bg-sky-400 group-hover:text-[#052042] transition-colors border border-sky-300/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-sky-300 block mb-1">
                  FACULTY & PATHWAYS
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-sky-200 transition-colors">
                  Adeshina College of Education
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-md">
                  Empowering future educators and instructional leaders through rigorous Nigerian Certificate in Education (NCE) curricula.
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-1 text-sky-300 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* College 02: Health Technology */}
          <Link
            to="/colleges/health-technology"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border-l-4 border-l-emerald-400 border border-white/25 rounded-2xl p-6 sm:p-7 transition-all duration-200 shadow-2xl group flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-400 group-hover:text-[#052042] transition-colors border border-emerald-300/30">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-300 block mb-1">
                  HEALTH SCIENCES & TECHNOLOGY
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-emerald-200 transition-colors">
                  Adeshina College of Health Technology
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-md">
                  Practical healthcare training in Community Health (CHEW), Pharmacy, Medical Lab, and Environmental Health disciplines.
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-1 text-emerald-300 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
