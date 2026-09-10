import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from './educationMotion';
import { edBtnGold, edBtnInk } from './educationTheme';
import { EducationGeometricBg } from './EducationGeometricBg';

interface EducationLeadProps {
  college: College;
}

/** Lead — layered geometric paper ground + feature cards. */
export function EducationLead({ college }: EducationLeadProps) {
  const reduceMotion = useReducedMotion();
  const cards = (college.features ?? []).slice(0, 3);

  return (
    <section
      className="relative overflow-hidden border-b border-[#0c2340]/10"
      aria-labelledby="education-lead-heading"
    >
      <EducationGeometricBg tone="paper" />

      <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5"
          >
            <motion.p
              variants={educationSlideIn}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#a8861a]"
            >
              Teacher education
            </motion.p>
            <motion.h2
              id="education-lead-heading"
              variants={educationSlideIn}
              className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0c2340] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
            >
              Classroom-ready teachers for Nigerian schools.
            </motion.h2>
            <motion.p
              variants={educationSlideIn}
              className="mt-5 font-sans text-base leading-relaxed text-[#5a6570] sm:text-lg"
            >
              {college.description}
            </motion.p>
            <motion.div
              variants={educationSlideIn}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link to={`/colleges/${college.id}/admissions`} className={edBtnGold}>
                How to apply
              </Link>
              <Link to={`/colleges/${college.id}/about`} className={edBtnInk}>
                About the college
              </Link>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={educationStaggerCards}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 lg:gap-5"
          >
            {cards.map((feature, index) => {
              const tones = [
                {
                  tint: 'bg-[#e8f4fc]',
                  shape: 'bg-[#7eb8e0]/35',
                  shapeDeep: 'bg-[#3d8fd1]/22',
                  pill: 'bg-white/85 text-[#1e6fa8]',
                },
                {
                  tint: 'bg-[#dff0fa]',
                  shape: 'bg-[#5ba8d9]/35',
                  shapeDeep: 'bg-[#2f7fbf]/20',
                  pill: 'bg-white/85 text-[#1a6499]',
                },
                {
                  tint: 'bg-[#d4ebf8]',
                  shape: 'bg-[#3d8fd1]/28',
                  shapeDeep: 'bg-[#0c2340]/10',
                  pill: 'bg-white/85 text-[#0c2340]',
                },
              ] as const;
              const tone = tones[index] ?? tones[0];

              return (
                <motion.li
                  key={feature.title}
                  variants={educationCardTilt}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className={`group relative min-h-[168px] overflow-hidden rounded-[1.35rem] ${tone.tint} p-5 shadow-[0_16px_36px_-22px_rgba(61,143,209,0.4)] sm:p-6 ${
                    index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-[42%]"
                    aria-hidden="true"
                  >
                    <span className={`absolute -right-4 top-4 h-20 w-20 rounded-full ${tone.shape}`} />
                    <span className={`absolute right-6 top-16 h-12 w-12 rounded-full ${tone.shapeDeep}`} />
                    <span
                      className={`absolute bottom-6 right-3 h-16 w-8 rounded-full ${tone.shape}`}
                      style={{ transform: 'rotate(16deg)' }}
                    />
                  </div>

                  <div className="relative z-10 max-w-[18rem]">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.1em] ${tone.pill}`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0c2340]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#4a5a68]">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
