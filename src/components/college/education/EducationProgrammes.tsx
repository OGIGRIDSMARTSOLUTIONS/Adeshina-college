import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
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
import { EducationGeometricBg } from './EducationGeometricBg';

interface EducationProgrammesProps {
  college: College;
}

/** Three featured pathways with photography. */
const FEATURED_IDS = [
  'primary-education-studies',
  'early-childhood-care-education',
  'business-education',
] as const;

/** Featured programmes — image-led prospectus cards. */
export function EducationProgrammes({ college }: EducationProgrammesProps) {
  const reduceMotion = useReducedMotion();
  const featured = FEATURED_IDS.map((id) => programmes.find((p) => p.id === id)).filter(
    Boolean,
  ) as typeof programmes;
  const total = programmes.filter((p) => p.collegeId === college.id).length;

  return (
    <section
      id="programmes-list"
      className="relative scroll-mt-28 overflow-hidden border-b border-[#0c2340]/10"
      aria-labelledby="education-programmes-heading"
    >
      <EducationGeometricBg tone="paper" />
      <div className="pointer-events-none absolute inset-0 bg-white/45" aria-hidden="true" />

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
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#a8861a]"
            >
              NCE pathways
            </motion.p>
            <motion.h2
              id="education-programmes-heading"
              variants={educationSlideIn}
              className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0c2340] sm:text-4xl"
            >
              Programmes of study
            </motion.h2>
            <motion.p
              variants={educationSlideIn}
              className="mt-4 font-sans text-base leading-relaxed text-[#5a6570] sm:text-lg"
            >
              A focused look at flagship pathways — explore the full catalogue for every NCE
              combination.
            </motion.p>
          </div>
          <motion.div variants={educationSlideIn}>
            <Link to={`/colleges/${college.id}/programmes`} className={edBtnInk}>
              <Sparkles className="h-4 w-4 text-[#c9a227] transition-transform group-hover:rotate-12" />
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
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7"
          style={{ perspective: 1200 }}
        >
          {featured.map((programme, index) => (
            <motion.li
              key={programme.id}
              variants={educationCardTilt}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -14,
                      rotateX: 6,
                      rotateY: index === 0 ? -5 : index === 2 ? 5 : 0,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 260, damping: 18 },
                    }
              }
              style={{ transformStyle: 'preserve-3d' }}
              className="[transform-style:preserve-3d]"
            >
              <Link
                to={`/colleges/${college.id}/programmes`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white [transform-style:preserve-3d] shadow-[0_4px_0_0_#0c2340,0_18px_28px_-12px_rgba(12,35,64,0.35),0_40px_64px_-28px_rgba(12,35,64,0.45)] ring-1 ring-[#0c2340]/10 transition-[box-shadow,ring-color] duration-300 hover:shadow-[0_6px_0_0_#1e6fa8,0_22px_36px_-10px_rgba(61,143,209,0.4),0_48px_72px_-24px_rgba(12,35,64,0.5)] hover:ring-[#3d8fd1]/45"
              >
                {/* Soft top highlight for 3D face */}
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-y-3 left-0 z-20 w-px bg-gradient-to-b from-white/70 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <div className="relative aspect-[16/10] overflow-hidden bg-[#0c2340]">
                  <img
                    src={programme.image || '/images/education/campus-gate.jpg'}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/85 via-[#0c2340]/20 to-black/10"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <span className="rounded-full border border-white/70 bg-white/95 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#0c2340] shadow-sm">
                      {programme.level}
                    </span>
                    <span className="font-sans text-[12px] font-semibold text-white/90 drop-shadow">
                      {programme.duration}
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col bg-gradient-to-b from-white to-[#f3f8fc] px-5 py-5 sm:px-6 sm:py-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0c2340] transition-colors group-hover:text-[#1e6fa8] sm:text-[1.3rem]">
                      {programme.name}
                    </h3>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf4fb] text-[#3d8fd1] shadow-[0_4px_10px_-4px_rgba(61,143,209,0.6)] transition-all group-hover:bg-[#3d8fd1] group-hover:text-white group-hover:shadow-[0_8px_16px_-6px_rgba(61,143,209,0.7)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 flex-1 font-sans text-[14px] leading-relaxed text-[#5a6570] sm:text-[15px]">
                    {programme.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-[#0c2340]/08 pt-4 font-sans text-[13px] font-bold text-[#0c2340] transition-colors group-hover:text-[#1e6fa8]">
                    View pathway
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
