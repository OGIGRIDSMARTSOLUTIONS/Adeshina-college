import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from './educationMotion';

const pillars = [
  {
    number: '01',
    title: 'Practice before the classroom',
    body: 'Micro-teaching clinics, lesson planning workshops, and supervised teaching practice move you from theory into real school environments.',
  },
  {
    number: '02',
    title: 'Subject depth, teaching craft',
    body: 'Strong foundations in your teaching subjects sit alongside pedagogy, assessment, and classroom leadership for Nigerian schools.',
  },
  {
    number: '03',
    title: 'Character and professional ethics',
    body: 'Discipline, care, and the standards expected of teachers — so graduates serve schools across Kwara State and wider Nigeria with integrity.',
  },
] as const;

/** How you learn — decorated mist cards with Education tilt motion. */
export function EducationWhy() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-[#0f2744]/10 bg-[#f3f1eb]"
      aria-labelledby="education-why-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -right-10 top-20 h-48 w-48 rounded-full bg-[#e85d3b]/8 blur-3xl" />
        <span className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#0f2744]/6 blur-3xl" />
      </div>

      <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={educationStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-2xl"
        >
          <motion.p
            variants={educationSlideIn}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#e85d3b]"
          >
            How you will learn
          </motion.p>
          <motion.h2
            id="education-why-heading"
            variants={educationSlideIn}
            className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0f2744] sm:text-4xl"
          >
            Pedagogy with purpose.
          </motion.h2>
          <motion.p
            variants={educationSlideIn}
            className="mt-4 font-sans text-base leading-relaxed text-[#5a6570] sm:text-lg"
          >
            Training that balances subject mastery with the craft of teaching — on a focused
            Share campus built for concentration and character.
          </motion.p>
        </motion.div>

        <motion.ol
          variants={educationStaggerCards}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        >
          {pillars.map((pillar) => (
            <motion.li
              key={pillar.number}
              variants={educationCardTilt}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#0f2744]/10 bg-white p-6 shadow-[0_20px_44px_-30px_rgba(15,39,68,0.5)] sm:p-7"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e85d3b] via-[#e85d3b]/70 to-transparent"
                aria-hidden="true"
              />
              <span className="font-serif text-3xl font-semibold tracking-[-0.03em] text-[#e85d3b]">
                {pillar.number}
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0f2744] sm:text-[1.35rem]">
                {pillar.title}
              </h3>
              <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                {pillar.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
