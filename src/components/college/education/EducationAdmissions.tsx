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
import { edBtnCoral, edBtnInk } from './educationTheme';

interface EducationAdmissionsProps {
  college: College;
}

/** Admissions strip with step cards. */
export function EducationAdmissions({ college }: EducationAdmissionsProps) {
  const reduceMotion = useReducedMotion();
  const steps = admissionInfo.steps.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden border-b border-[#0f2744]/10 bg-[#fbfaf7]"
      aria-labelledby="education-admissions-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#e85d3b]/7 blur-3xl" />
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
            Admissions
          </motion.p>
          <motion.h2
            id="education-admissions-heading"
            variants={educationSlideIn}
            className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#0f2744] sm:text-4xl"
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
            <Link to={`/colleges/${college.id}/apply`} className={edBtnCoral}>
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
        >
          {steps.map((step) => (
            <motion.li
              key={step.step}
              variants={educationCardTilt}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-2xl border border-[#0f2744]/10 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(15,39,68,0.45)]"
            >
              <span
                className="absolute bottom-0 left-0 top-0 w-1 bg-[#0f2744]"
                aria-hidden="true"
              />
              <span className="font-serif text-2xl font-semibold text-[#e85d3b]">{step.step}</span>
              <h3 className="mt-4 font-serif text-xl font-semibold tracking-[-0.02em] text-[#0f2744]">
                {step.title}
              </h3>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
