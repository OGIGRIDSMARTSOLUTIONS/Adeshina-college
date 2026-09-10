import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { educationEase, educationFadeUp, educationSlideIn, educationStagger } from './educationMotion';
import { edBtnGold } from './educationTheme';

interface EducationHeroProps {
  college: College;
}

/**
 * Full-bleed Education hero — campus photograph as the plane,
 * soft ink wash for type (no side panel box).
 */
export function EducationHero({ college }: EducationHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-[min(58vh,480px)] overflow-hidden bg-[#0c2340] sm:min-h-[min(62vh,560px)]"
      aria-label={`${college.shortName} introduction`}
    >
      <motion.img
        src="/images/education/campus-gate.jpg"
        alt="Adeshina College of Education campus gate, Share"
        className="absolute inset-0 h-full w-full object-cover object-[52%_38%] saturate-[0.95] contrast-[1.04]"
        initial={reduceMotion ? false : { scale: 1.1, opacity: 0.75 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: educationEase }}
      />

      {/* Atmospheric washes — keep the gate visible on the right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#071828]/95 via-[#0c2340]/72 to-[#0c2340]/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#071828]/75 via-transparent to-[#0c2340]/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#c9a227]/55 to-transparent opacity-80 sm:left-[min(4%,2rem)]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10 flex min-h-[min(58vh,480px)] items-end pb-10 pt-12 sm:min-h-[min(62vh,560px)] sm:items-center sm:pb-14 sm:pt-16 lg:pb-16">
        <motion.div
          variants={educationStagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={educationSlideIn}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a227]"
          >
            Share · Kwara State
          </motion.p>

          <motion.h1
            variants={educationSlideIn}
            className="mt-4 font-serif text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]"
          >
            Adeshina College of Education
          </motion.h1>

          <motion.div
            variants={educationFadeUp}
            className="mt-5 h-px w-16 bg-[#c9a227]"
            aria-hidden="true"
          />

          <motion.p
            variants={educationFadeUp}
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Practical pedagogy for Nigerian classrooms — train to teach on our Share campus.
          </motion.p>

          <motion.div
            variants={educationFadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link to={`/colleges/${college.id}/apply`} className={`${edBtnGold} w-full sm:w-auto`}>
              Apply now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={`/colleges/${college.id}/programmes`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 font-sans text-[14px] font-bold text-white backdrop-blur-[2px] transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#0c2340] sm:w-auto"
            >
              Explore programmes
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
