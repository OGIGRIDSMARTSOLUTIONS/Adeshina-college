import { motion, useReducedMotion } from 'framer-motion';
import { College } from '@/types/college';
import { healthEase } from './healthMotion';

interface HealthHeroProps {
  college: College;
}

/** Photo-led hero — elite campus presence; header carries brand + Apply. */
export function HealthHero({ college }: HealthHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative -mt-[5.5rem] min-h-[min(58vh,520px)] overflow-hidden bg-[#041c36] sm:-mt-[6rem] sm:min-h-[min(62vh,560px)]"
      aria-label={`${college.shortName} campus`}
    >
      <motion.img
        src="/images/health-technology/health-campus-1.jpg"
        alt="Adeshina College of Health Technology campus entrance, Share"
        className="absolute inset-0 h-full w-full object-cover object-[42%_52%] saturate-[0.92] contrast-[1.05]"
        initial={reduceMotion ? false : { scale: 1.08, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.25, ease: healthEase }}
      />

      {/* Soft bottom veil only — keeps photo dominant, caption readable */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#041c36]/70 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 sm:px-10 lg:px-12">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: healthEase }}
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-[12px]"
        >
          Share campus · Ifelodun LGA · Kwara State
        </motion.p>
      </div>
    </section>
  );
}
