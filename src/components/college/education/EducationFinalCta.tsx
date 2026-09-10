import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { educationFadeUp, educationStagger } from './educationMotion';
import { edBtnCoral } from './educationTheme';

interface EducationFinalCtaProps {
  college: College;
}

/** Closing ink band — Apply + Support. */
export function EducationFinalCta({ college }: EducationFinalCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#0f2744]" aria-labelledby="education-final-cta-heading">
      <Container size="wide" className="py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={educationStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={educationFadeUp}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#e85d3b]"
          >
            Begin here
          </motion.p>
          <motion.h2
            id="education-final-cta-heading"
            variants={educationFadeUp}
            className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
          >
            Ready to train as a teacher?
          </motion.h2>
          <motion.p
            variants={educationFadeUp}
            className="mt-5 font-sans text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Join Adeshina College of Education in Share — practical pedagogy for Nigerian
            classrooms.
          </motion.p>
          <motion.div
            variants={educationFadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to={`/colleges/${college.id}/apply`} className={edBtnCoral}>
              Apply now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={`/colleges/${college.id}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-transparent px-6 py-3 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-[#0f2744]"
            >
              Contact support
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
