import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { educationEase, educationFadeUp, educationStagger } from './educationMotion';
import { edBtnCoral } from './educationTheme';

interface EducationHeroProps {
  college: College;
}

/**
 * Education hero — Oxford-style left ink panel over full-bleed campus photo.
 * Panel is ~half width and ~4/5 of section height (photo still shows around it).
 */
export function EducationHero({ college }: EducationHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative h-[min(62vh,560px)] overflow-hidden bg-[#0f2744]"
      aria-label={`${college.shortName} introduction`}
    >
      <motion.img
        src="/images/education/campus-gate.jpg"
        alt="Adeshina College of Education campus gate, Share"
        className="absolute inset-0 h-full w-full object-cover object-[58%_40%]"
        initial={reduceMotion ? false : { scale: 1.06, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.15, ease: educationEase }}
      />

      <div className="relative z-10 flex h-full items-center">
        {/* Breadth ~48–52% · Length ~80% of hero — photo remains top/bottom/right */}
        <div className="h-[80%] w-full px-4 sm:px-6 lg:w-[50%] lg:max-w-[46rem] lg:px-0 lg:pl-0">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            className="flex h-full flex-col justify-center rounded-2xl bg-[#0f2744] px-7 py-10 text-white shadow-[0_28px_60px_-24px_rgba(10,28,51,0.7)] sm:px-9 lg:rounded-none lg:rounded-r-[1.75rem] lg:px-12 lg:py-12"
          >
            <motion.p
              variants={educationFadeUp}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#e85d3b]"
            >
              Adeshina · Share
            </motion.p>
            <motion.h1
              variants={educationFadeUp}
              className="mt-4 max-w-xl font-serif text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem]"
            >
              Welcome to Adeshina College of Education.
            </motion.h1>
            <motion.p
              variants={educationFadeUp}
              className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Train to teach — practical pedagogy for Nigerian classrooms.
            </motion.p>
            <motion.div
              variants={educationFadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link to={`/colleges/${college.id}/apply`} className={`${edBtnCoral} w-full sm:w-auto`}>
                Apply now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#programmes-list"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-[#0f2744] sm:w-auto"
              >
                Explore programmes
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
