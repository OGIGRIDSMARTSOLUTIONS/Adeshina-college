import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, Plus, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_CAMPUS_IMAGE = '/images/education/campus-gate.jpg';

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const animationProps = (delay = 0) => {
    if (shouldReduceMotion) return {};
    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: 'easeOut' as const },
    };
  };

  const badgeAnimationProps = () => {
    if (shouldReduceMotion) return {};
    return {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, delay: 0.05, ease: 'easeOut' as const },
    };
  };

  return (
    <section
      className="relative bg-[#081426] text-white overflow-hidden pt-8 sm:pt-12 lg:pt-14 pb-16 lg:pb-20 border-b border-slate-800"
      aria-label="Institutional Introduction"
    >
      {/* 
        Right-Side Campus Photography Layer with Deep Navy Seamless Gradient Blend
      */}
      <div
        className="absolute right-0 top-0 w-full lg:w-[58%] h-[360px] sm:h-[450px] md:h-[520px] lg:h-full z-0 overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        {!imageError && (
          <img
            src={HERO_CAMPUS_IMAGE}
            alt="Adeshina Group of Colleges Campus Entrance Gate in Share"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-[center_top] md:object-[left_top] transition-opacity duration-700 ${
              imageLoaded ? 'opacity-85' : 'opacity-0'
            }`}
          />
        )}

        {/* Ambient fallback surface */}
        <div className="absolute inset-0 bg-[#081426] -z-10" />

        {/* Horizontal gradient blend from deep navy */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#081426] via-[#081426]/75 via-20% to-transparent to-55%" />

        {/* Vertical gradient blends for mobile & bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081426] via-[#081426]/80 to-transparent" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#081426] via-[#081426]/80 via-40% to-transparent" />
      </div>

      {/* Main Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper Hero Grid: Left Editorial Content + Right Photo Clearance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[460px]">
          {/* Left Content (Takes columns 1-7) */}
          <div className="lg:col-span-7 xl:col-span-7 max-w-xl lg:max-w-none pt-2 pb-4">
            {/* Eyebrow Pill Badge */}
            <motion.div {...badgeAnimationProps()} className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-blue-200 bg-white/10 border border-white/15 shadow-sm backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5 text-accent-gold" />
                <span>Two Colleges · One Campus · Share, Kwara State</span>
              </span>
            </motion.div>

            {/* Stately Editorial Headline */}
            <motion.h1
              {...animationProps(0)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-black tracking-tight text-white leading-[1.1] text-balance font-serif"
            >
              Where Educators and Health Professionals Are Made
            </motion.h1>

            {/* Gold Decorative Accent Bar */}
            <div className="w-14 h-1 bg-accent-gold rounded-full my-4 sm:my-5" aria-hidden="true" />

            {/* Supporting Copy */}
            <motion.p
              {...animationProps(0.12)}
              className="text-sm sm:text-base lg:text-[17px] text-slate-300 leading-relaxed font-normal max-w-lg"
            >
              Adeshina brings two specialised colleges together on one campus — creating direct professional pathways for students who want to build rewarding careers in education and healthcare.
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div
              {...animationProps(0.22)}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
            >
              <Link
                to="/programmes"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-adeshina-blue text-white text-sm font-bold shadow-md hover:bg-navy hover:shadow-lg transition-all duration-200"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#081426] text-sm font-bold hover:bg-adeshina-blue hover:text-white active:bg-adeshina-blue-dark transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 text-[#081426] group-hover:text-white transition-colors" />
              </Link>
            </motion.div>
          </div>

          {/* Right Spacer Column (Desktop photo clearance) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 pointer-events-none" aria-hidden="true" />
        </div>

        {/* 
          Floating Dual-College Pathway Card (Elevated Clean Container)
          - 2 clean responsive columns: College of Education & College of Health Technology
        */}
        <motion.div
          {...animationProps(0.3)}
          className="mt-8 sm:mt-10 lg:mt-12 bg-white rounded-2xl border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.25)] p-6 sm:p-8 lg:p-9 text-text"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 md:divide-x md:divide-slate-200/80">
            {/* College 01: College of Education */}
            <Link
              to="/colleges/education"
              className="flex items-center justify-between gap-4 sm:gap-6 group text-left"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-navy group-hover:text-adeshina-blue transition-colors">
                    College of Education
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                    Empowering future educators and instructional leaders through innovative pedagogy and character.
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-slate-400 group-hover:text-adeshina-blue group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </Link>

            {/* College 02: College of Health Technology */}
            <Link
              to="/colleges/health-technology"
              className="flex items-center justify-between gap-4 sm:gap-6 md:pl-8 lg:pl-10 group text-left"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-full bg-[#10a37f] flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Plus className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-navy group-hover:text-[#10a37f] transition-colors">
                    College of Health Technology
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                    Training skilled, ethical, and compassionate health professionals for healthcare institutions.
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-slate-400 group-hover:text-[#10a37f] group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
