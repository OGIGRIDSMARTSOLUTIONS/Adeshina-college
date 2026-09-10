import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { educationEase, educationFadeUp, educationStagger } from './educationMotion';

/** Full-bleed campus band — one photo, one caption. */
export function EducationCampus() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#0f2744]"
      aria-labelledby="education-campus-heading"
    >
      <div className="relative min-h-[min(52vh,420px)]">
        <motion.img
          src="/images/education/campus-gate.jpg"
          alt="Adeshina College of Education campus, Share"
          className="absolute inset-0 h-full w-full object-cover object-center"
          initial={reduceMotion ? false : { scale: 1.04, opacity: 0.85 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: educationEase }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0f2744]/90 via-[#0f2744]/35 to-[#0f2744]/15"
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10 flex min-h-[min(52vh,420px)] items-end pb-12 pt-24 sm:pb-14 lg:pb-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="max-w-xl text-white"
          >
            <motion.p
              variants={educationFadeUp}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#e85d3b]"
            >
              Share, Kwara State
            </motion.p>
            <motion.h2
              id="education-campus-heading"
              variants={educationFadeUp}
              className="mt-3 font-serif text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
            >
              A campus for focused teacher training.
            </motion.h2>
            <motion.p
              variants={educationFadeUp}
              className="mt-4 font-sans text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Beside the Ifelodun Local Government Secretariat — a calm setting for pedagogy,
              practice, and professional formation.
            </motion.p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
