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
import { edBtnCoral, edBtnInk } from './educationTheme';

interface EducationLeadProps {
  college: College;
}

/** Lead with lined-paper atmosphere + feature cards (Education motion, not Health). */
export function EducationLead({ college }: EducationLeadProps) {
  const reduceMotion = useReducedMotion();
  const cards = college.features.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden border-b border-[#0f2744]/10"
      aria-labelledby="education-lead-heading"
      style={{
        backgroundColor: '#f7f3ea',
        backgroundImage: `
          linear-gradient(180deg, rgba(15,39,68,0.03) 0%, transparent 42%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 27px,
            rgba(15,39,68,0.045) 27px,
            rgba(15,39,68,0.045) 28px
          )
        `,
      }}
    >
      {/* Soft academic washes — coral / ink / leaf, not Health sky blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#e85d3b]/10 blur-3xl" />
        <span className="absolute right-[-4rem] top-1/3 h-64 w-64 rounded-full bg-[#0f2744]/08 blur-3xl" />
        <span className="absolute bottom-0 left-1/3 h-40 w-72 rounded-full bg-[#3d7a5c]/10 blur-3xl" />
        <span className="absolute right-10 top-8 h-24 w-24 rotate-12 rounded-2xl border border-[#e85d3b]/25 bg-[#e85d3b]/5" />
        <span className="absolute bottom-16 left-6 hidden h-16 w-16 -rotate-6 rounded-xl border border-[#0f2744]/10 bg-white/40 sm:block" />
      </div>

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
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#e85d3b]"
            >
              Teacher education
            </motion.p>
            <motion.h2
              id="education-lead-heading"
              variants={educationSlideIn}
              className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0f2744] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
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
              <Link to={`/colleges/${college.id}/admissions`} className={edBtnCoral}>
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
            {cards.map((feature, index) => (
              <motion.li
                key={feature.title}
                variants={educationCardTilt}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className={`group relative overflow-hidden rounded-2xl border border-[#0f2744]/10 bg-white/90 p-5 shadow-[0_18px_40px_-28px_rgba(15,39,68,0.45)] backdrop-blur-[2px] sm:p-6 ${
                  index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-[#e85d3b] transition-all duration-300 group-hover:w-1.5"
                  aria-hidden="true"
                />
                <span className="font-serif text-2xl font-semibold tracking-[-0.03em] text-[#e85d3b]/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0f2744]">
                  {feature.title}
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                  {feature.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
