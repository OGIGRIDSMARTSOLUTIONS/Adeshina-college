import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { admissionInfo } from '@/data/admissions';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from './educationMotion';
import { edBtnGold, edBtnInk } from './educationTheme';
import { EducationGeometricBg } from './EducationGeometricBg';

interface EducationAdmissionsProps {
  college: College;
}

/** Admissions strip with step cards. */
export function EducationAdmissions({ college }: EducationAdmissionsProps) {
  const reduceMotion = useReducedMotion();
  const steps = admissionInfo.steps.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden border-b border-[#0c2340]/10"
      aria-labelledby="education-admissions-heading"
    >
      <EducationGeometricBg tone="paper" />

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
              Admissions
            </motion.p>
            <motion.h2
              id="education-admissions-heading"
              variants={educationSlideIn}
              className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0c2340] sm:text-4xl"
            >
            Start your NCE application.
          </motion.h2>
          <motion.p
            variants={educationSlideIn}
            className="mt-4 font-sans text-base leading-relaxed text-[#5a6570] sm:text-lg"
          >
            {admissionInfo.applicationOpen
              ? `Applications are open for the ${admissionInfo.session}.`
              : 'Check back for the next admissions window.'}{' '}
            Complete the online form, upload your credentials, and submit for review.
          </motion.p>
          <motion.div
            variants={educationSlideIn}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
              <Link to={`/colleges/${college.id}/apply`} className={edBtnGold}>
                Apply now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            <Link to={`/colleges/${college.id}/admissions`} className={edBtnInk}>
              Full admissions guide
            </Link>
          </motion.div>
        </motion.div>

        <motion.ol
          variants={educationStaggerCards}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {steps.map((step) => (
            <motion.li
              key={step.step}
              variants={educationCardTilt}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -10,
                      rotateX: 5,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 280, damping: 18 },
                    }
              }
              style={{ transformStyle: 'preserve-3d' }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#c9a227,0_16px_28px_-14px_rgba(12,35,64,0.35),0_32px_48px_-28px_rgba(12,35,64,0.4)] ring-1 ring-[#0c2340]/10 transition-[box-shadow] duration-300 hover:shadow-[0_6px_0_0_#3d8fd1,0_20px_36px_-12px_rgba(61,143,209,0.4)]"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#d4ebf8]/90"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-[#c9a227] to-[#3d8fd1]"
                aria-hidden="true"
              />
              <span className="relative font-serif text-2xl font-semibold text-[#3d8fd1]">
                {step.step}
              </span>
              <h3 className="relative mt-4 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0c2340]">
                {step.title}
              </h3>
              <p className="relative mt-2 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
