import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { healthEase, healthFadeUp, healthStagger } from './healthMotion';
import { HealthApplyButton } from './HealthApplyButton';

interface HealthHeroProps {
  college: College;
}

/**
 * Full-bleed Health hero — campus photo as plane, soft navy/sky wash for type.
 * Distinct from Education (sky accents, floating-header pull-up).
 */
export function HealthHero({ college }: HealthHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-college-hero
      className="relative isolate min-h-[min(58vh,480px)] overflow-hidden bg-[#041c36] lg:-mt-[6rem] sm:min-h-[min(62vh,560px)]"
      aria-label={`${college.name} introduction`}
    >
      <motion.img
        src="/images/health-technology/health-campus-1.jpg"
        alt="Adeshina College of Health Technology campus entrance, Share"
        className="absolute inset-0 h-full w-full object-cover object-[46%_48%] saturate-[0.94] contrast-[1.06]"
        initial={reduceMotion ? false : { scale: 1.1, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.35, ease: healthEase }}
      />

      {/* Atmosphere — left readable, campus monument stays visible right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/78 to-[#041c36]/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#041c36]/80 via-transparent to-[#041c36]/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(61,143,209,0.22),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-[18%] left-0 w-px bg-gradient-to-b from-transparent via-[#5ba8d9]/70 to-transparent sm:left-[min(4%,2rem)]"
        aria-hidden="true"
      />

      <Container
        size="wide"
        className="relative z-10 flex min-h-[min(58vh,480px)] items-end pb-10 pt-10 sm:min-h-[min(62vh,560px)] sm:items-center sm:pb-14 lg:pb-16 lg:pt-[7.5rem]"
      >
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={healthFadeUp}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#5ba8d9]"
          >
            Share campus · Kwara State
          </motion.p>

          <motion.h1
            variants={healthFadeUp}
            className="mt-4 font-serif text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.02]"
          >
            Adeshina College of Health Technology
          </motion.h1>

          <motion.div
            variants={healthFadeUp}
            className="mt-5 h-px w-16 bg-[#3d8fd1]"
            aria-hidden="true"
          />

          <motion.p
            variants={healthFadeUp}
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Practice-ready health training for clinics, labs, and community care across Nigeria.
          </motion.p>

          <motion.div
            variants={healthFadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <HealthApplyButton to={`/colleges/${college.id}/apply`} className="w-full justify-between sm:w-auto">
              Apply now
            </HealthApplyButton>
            <Link
              to={`/colleges/${college.id}/programmes`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 font-sans text-[14px] font-bold text-white backdrop-blur-[2px] transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#041c36] sm:w-auto"
            >
              Explore programmes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
