import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { admissionInfo } from '@/data/admissions';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from './healthMotion';
import { htBtnNavy } from './healthTheme';
import { HealthApplyButton } from './HealthApplyButton';

interface HealthLeadProps {
  college: College;
}

const pathwayChips = ['Diploma', 'Certificate', 'Full-time'];

/** Conversion copy sits under the photo-led hero. */
export function HealthLead({ college }: HealthLeadProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-[#041c36]/10"
      aria-labelledby="health-lead-heading"
      style={{
        backgroundColor: '#eef6fb',
        backgroundImage: `
          radial-gradient(circle at 8% 18%, rgba(91,168,217,0.55) 0 9%, transparent 10%),
          radial-gradient(circle at 22% 72%, rgba(125,211,176,0.42) 0 7%, transparent 8%),
          radial-gradient(circle at 78% 22%, rgba(246,196,107,0.38) 0 8%, transparent 9%),
          radial-gradient(circle at 92% 68%, rgba(61,143,209,0.4) 0 10%, transparent 11%),
          radial-gradient(circle at 48% 12%, rgba(167,201,232,0.55) 0 6%, transparent 7%),
          radial-gradient(circle at 58% 88%, rgba(143,190,168,0.35) 0 8%, transparent 9%),
          linear-gradient(135deg, #eaf5fc 0%, #f4f8f5 42%, #eef3fa 100%)
        `,
      }}
    >
      {/* Soft colour blocks — abstract, not a logo pattern */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -left-8 top-6 h-28 w-40 rotate-[-12deg] rounded-[1.75rem] bg-[#5ba8d9]/35" />
        <span className="absolute left-[18%] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#7dd3b0]/40" />
        <span className="absolute right-[12%] top-8 h-20 w-28 rotate-[18deg] rounded-2xl bg-[#f6c46b]/35" />
        <span className="absolute bottom-4 right-[28%] h-14 w-14 rounded-full bg-[#3d8fd1]/30" />
        <span className="absolute bottom-10 left-[42%] h-10 w-24 rotate-[-8deg] rounded-xl bg-[#a7c9e8]/45" />
        <span className="absolute right-4 bottom-16 h-24 w-16 rotate-[8deg] rounded-[1.25rem] bg-[#8fbea8]/30" />
      </div>

      {/* Light veil so type stays readable */}
      <div
        className="pointer-events-none absolute inset-0 bg-white/45 backdrop-blur-[1px]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative py-12 sm:py-14 lg:py-16">
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            <motion.p
              variants={healthFadeUp}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#2a73ad]"
            >
              Adeshina College of Health Tech
            </motion.p>

            {admissionInfo.applicationOpen ? (
              <motion.div
                variants={healthFadeUp}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 shadow-[0_10px_28px_-14px_rgba(4,28,54,0.35)] ring-1 ring-[#3d8fd1]/25"
              >
                <span className="h-2 w-2 rounded-full bg-[#3d8fd1]" aria-hidden="true" />
                <span className="font-sans text-[12px] font-semibold text-[#041c36]">
                  Applications open · {admissionInfo.session}
                </span>
              </motion.div>
            ) : null}

            <motion.h1
              id="health-lead-heading"
              variants={healthFadeUp}
              className="mt-5 max-w-2xl font-serif text-[2.45rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#041c36] drop-shadow-[0_1px_0_rgba(255,255,255,0.65)] sm:text-5xl lg:text-[3.25rem]"
            >
              Prepare for a career in healthcare.
            </motion.h1>
            <motion.p
              variants={healthFadeUp}
              className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[#3d4654] sm:text-lg"
            >
              Practical training for community health, clinical support, and health-technology roles
              across Kwara State and Nigeria.
            </motion.p>

            <motion.ul
              variants={healthFadeUp}
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Study pathways"
            >
              {pathwayChips.map((chip, index) => {
                const tones = [
                  'border-[#3d8fd1]/35 text-[#2a73ad]',
                  'border-[#0f7a5f]/30 text-[#0f7a5f]',
                  'border-[#c68a18]/35 text-[#8a6112]',
                ];
                return (
                  <li
                    key={chip}
                    className={`rounded-full border bg-white/95 px-3.5 py-1.5 font-sans text-[12px] font-semibold shadow-[0_8px_20px_-14px_rgba(4,28,54,0.4)] ${tones[index % tones.length]}`}
                  >
                    {chip}
                  </li>
                );
              })}
            </motion.ul>
          </div>

          <motion.div
            variants={healthFadeUp}
            className="flex flex-col gap-3.5 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end"
          >
            <a href="#programmes" className={htBtnNavy}>
              Explore programmes
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <HealthApplyButton to={`/colleges/${college.id}/apply`} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
