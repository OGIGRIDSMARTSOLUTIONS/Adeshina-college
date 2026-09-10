import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from './educationMotion';
import { edBtnInk } from './educationTheme';

interface EducationProgrammesProps {
  college: College;
}

const FEATURED_IDS = [
  'primary-education-studies',
  'early-childhood-care-education',
  'business-education',
  'social-studies-double-major',
  'integrated-science-mathematics-education',
  'english-social-studies',
] as const;

/** Featured programmes as decorated interactive cards. */
export function EducationProgrammes({ college }: EducationProgrammesProps) {
  const reduceMotion = useReducedMotion();
  const featured = FEATURED_IDS.map((id) => programmes.find((p) => p.id === id)).filter(
    Boolean,
  ) as typeof programmes;
  const total = programmes.filter((p) => p.collegeId === college.id).length;

  return (
    <section
      id="programmes-list"
      className="relative scroll-mt-28 overflow-hidden border-b border-[#0f2744]/10 bg-white"
      aria-labelledby="education-programmes-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-px w-[min(70%,40rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#e85d3b]/35 to-transparent" />
        <span className="absolute -left-20 bottom-10 h-52 w-52 rounded-full bg-[#f7f3ea] blur-2xl" />
      </div>

      <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={educationStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="max-w-xl">
            <motion.p
              variants={educationSlideIn}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#e85d3b]"
            >
              NCE pathways
            </motion.p>
            <motion.h2
              id="education-programmes-heading"
              variants={educationSlideIn}
              className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0f2744] sm:text-4xl"
            >
              Programmes of study
            </motion.h2>
            <motion.p
              variants={educationSlideIn}
              className="mt-4 font-sans text-base leading-relaxed text-[#5a6570] sm:text-lg"
            >
              Subject combinations that prepare you to teach with confidence — from primary
              education to sciences, languages, and vocational pathways.
            </motion.p>
          </div>
          <motion.div variants={educationSlideIn}>
            <Link to={`/colleges/${college.id}/programmes`} className={edBtnInk}>
              View all {total} programmes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={educationStaggerCards}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {featured.map((programme) => (
            <motion.li
              key={programme.id}
              variants={educationCardTilt}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                to={`/colleges/${college.id}/programmes`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0f2744]/10 bg-[#fbfaf7] p-6 shadow-[0_18px_40px_-28px_rgba(15,39,68,0.4)] transition-colors hover:border-[#e85d3b]/40 hover:bg-white sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#e85d3b]">
                    {programme.level}
                  </span>
                  <span className="font-sans text-[12px] font-semibold text-[#5a6570]">
                    {programme.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0f2744] transition-colors group-hover:text-[#e85d3b] sm:text-[1.3rem]">
                  {programme.name}
                </h3>
                <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-[#5a6570] sm:text-[15px]">
                  {programme.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-[13px] font-bold text-[#0f2744] transition-colors group-hover:text-[#e85d3b]">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
