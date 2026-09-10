import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from './educationMotion';
import { EducationGeometricBg } from './EducationGeometricBg';

const pillars = [
  {
    number: '01',
    label: 'Practice',
    title: 'Practice before the classroom',
    body: 'Micro-teaching clinics, lesson planning workshops, and supervised teaching practice move you from theory into real school environments.',
    tint: 'bg-[#e8f4fc]',
    shape: 'bg-[#7eb8e0]/35',
    shapeDeep: 'bg-[#3d8fd1]/25',
    pill: 'bg-white/80 text-[#1e6fa8]',
  },
  {
    number: '02',
    label: 'Craft',
    title: 'Subject depth, teaching craft',
    body: 'Strong foundations in your teaching subjects sit alongside pedagogy, assessment, and classroom leadership for Nigerian schools.',
    tint: 'bg-[#dff0fa]',
    shape: 'bg-[#5ba8d9]/35',
    shapeDeep: 'bg-[#2f7fbf]/22',
    pill: 'bg-white/80 text-[#1a6499]',
  },
  {
    number: '03',
    label: 'Character',
    title: 'Character and professional ethics',
    body: 'Discipline, care, and the standards expected of teachers — so graduates serve schools across Kwara State and wider Nigeria with integrity.',
    tint: 'bg-[#d4ebf8]',
    shape: 'bg-[#3d8fd1]/30',
    shapeDeep: 'bg-[#0c2340]/12',
    pill: 'bg-white/80 text-[#0c2340]',
  },
] as const;

/** How you learn — soft light-blue cards with geometric card art. */
export function EducationWhy() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-[#0c2340]/10"
      aria-labelledby="education-why-heading"
    >
      <EducationGeometricBg tone="mist" />

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
            className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#a8861a]"
          >
            How you will learn
          </motion.p>
          <motion.h2
            id="education-why-heading"
            variants={educationSlideIn}
            className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0c2340] sm:text-4xl"
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
              className={`group relative min-h-[280px] overflow-hidden rounded-[1.35rem] ${pillar.tint} p-6 shadow-[0_18px_40px_-24px_rgba(61,143,209,0.45)] sm:p-7`}
            >
              {/* Soft geometric card art — right side */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%]" aria-hidden="true">
                <span
                  className={`absolute -right-6 top-8 h-28 w-28 rounded-full ${pillar.shape}`}
                />
                <span
                  className={`absolute right-8 top-24 h-16 w-16 rounded-full ${pillar.shapeDeep}`}
                />
                <span
                  className={`absolute bottom-10 right-4 h-24 w-10 rounded-full ${pillar.shape}`}
                  style={{ transform: 'rotate(18deg)' }}
                />
                <span
                  className={`absolute -bottom-4 right-16 h-20 w-20 rounded-[1.25rem] ${pillar.shapeDeep}`}
                  style={{ transform: 'rotate(-12deg)' }}
                />
              </div>

              <div className="relative z-10 max-w-[16rem]">
                <span
                  className={`inline-flex rounded-full px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.1em] ${pillar.pill}`}
                >
                  {pillar.number} · {pillar.label}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[1.35rem]">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#4a5a68]">
                  {pillar.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
