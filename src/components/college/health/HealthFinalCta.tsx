import { motion, useReducedMotion } from 'framer-motion';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from './healthMotion';
import { HealthApplyButton } from './HealthApplyButton';

interface HealthFinalCtaProps {
  college: College;
}

/** Clinical training / care team — dark navy wash keeps copy readable. */
const CTA_BG =
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2000&q=80';

export function HealthFinalCta({ college }: HealthFinalCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-[#041c36]/20 bg-[#041c36] py-16 lg:py-20"
      aria-labelledby="health-final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={CTA_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        {/* Heavy navy veil — left denser for headline, right slightly open for depth */}
        <div className="absolute inset-0 bg-[#041c36]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/88 to-[#041c36]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/90 via-transparent to-[#041c36]/45" />
      </div>

      <Container size="wide" className="relative">
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
        >
          <motion.div variants={healthFadeUp} className="lg:col-span-8">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#5ba8d9]">
              Ready to begin?
            </p>
            <h2
              id="health-final-cta-heading"
              className="mt-4 max-w-xl font-serif text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white drop-shadow-[0_1px_12px_rgba(4,28,54,0.55)] sm:text-4xl lg:text-5xl"
            >
              Start your health career at Adeshina
            </h2>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-white/80 sm:text-lg">
              Confirm you meet entry requirements, then submit your application for the open session.
            </p>
          </motion.div>

          <motion.div variants={healthFadeUp} className="lg:col-span-4 lg:flex lg:justify-end">
            <HealthApplyButton
              to={`/colleges/${college.id}/apply`}
              className="w-full justify-between sm:w-auto sm:justify-center"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
