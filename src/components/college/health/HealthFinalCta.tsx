import { motion, useReducedMotion } from 'framer-motion';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from './healthMotion';
import { HealthApplyButton } from './HealthApplyButton';

interface HealthFinalCtaProps {
  college: College;
}

export function HealthFinalCta({ college }: HealthFinalCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-[#041c36]/10 py-20 lg:py-24"
      aria-labelledby="health-final-cta-heading"
      style={{
        backgroundColor: '#eaf5fc',
        backgroundImage: `
          radial-gradient(circle at 88% 45%, rgba(91,168,217,0.45) 0 18%, transparent 42%),
          radial-gradient(circle at 12% 80%, rgba(125,211,176,0.28) 0 12%, transparent 35%),
          radial-gradient(circle at 30% 15%, rgba(246,196,107,0.22) 0 10%, transparent 30%),
          linear-gradient(115deg, #eef6fb 0%, #eaf5fc 45%, #dceef9 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-[#5ba8d9]/35 blur-2xl" />
        <span className="absolute right-[18%] bottom-0 h-28 w-28 rounded-full bg-[#7dd3b0]/30 blur-xl" />
        <span className="absolute left-[8%] top-10 h-20 w-32 rotate-[-14deg] rounded-[1.5rem] bg-[#a7c9e8]/40" />
        <span className="absolute left-[22%] bottom-8 h-14 w-14 rounded-full bg-[#f6c46b]/30" />
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
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#2a73ad]">
              Ready to begin?
            </p>
            <h2
              id="health-final-cta-heading"
              className="mt-4 max-w-xl font-serif text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#041c36] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] sm:text-4xl lg:text-5xl"
            >
              Start your health career at Adeshina
            </h2>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-[#3d4654] sm:text-lg">
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
