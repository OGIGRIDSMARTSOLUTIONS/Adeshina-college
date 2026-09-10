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

const pathwayChips = [
  { label: 'Diploma', className: 'border-[#3d8fd1]/40 text-[#2a73ad]' },
  { label: 'Certificate', className: 'border-[#041c36]/20 text-[#041c36]' },
  { label: 'Full-time', className: 'border-[#5ba8d9]/45 text-[#1e5f8f]' },
];

/** Conversion copy under the photo hero — institutional navy/sky ground. */
export function HealthLead({ college }: HealthLeadProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#eaf5fc]"
      aria-labelledby="health-lead-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#e8eef4]" />
        <div
          className="absolute inset-y-[-10%] right-[-8%] w-[56%] bg-[#041c36]/[0.14]"
          style={{ clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div
          className="absolute inset-y-[-10%] right-[6%] w-[38%] bg-[#3d8fd1]/28"
          style={{ clipPath: 'polygon(40% 0, 100% 0, 78% 100%, 6% 100%)' }}
        />
        <div
          className="absolute left-[-12%] top-[-30%] h-[78%] w-[52%] bg-[#5ba8d9]/30"
          style={{ clipPath: 'polygon(0 0, 78% 0, 42% 100%, 0 100%)' }}
        />
        <div
          className="absolute bottom-[-20%] left-[18%] h-[48%] w-[34%] bg-[#041c36]/[0.1]"
          style={{ clipPath: 'polygon(18% 0, 100% 22%, 82% 100%, 0 100%)' }}
        />
        <div className="absolute inset-y-0 right-[38%] w-[2px] bg-[#041c36]/25" style={{ transform: 'skewX(-16deg)' }} />
        <div className="absolute inset-y-0 right-[16%] w-[2px] bg-[#3d8fd1]/55" style={{ transform: 'skewX(-16deg)' }} />
        <div className="absolute inset-y-0 right-[52%] w-px bg-[#041c36]/18" style={{ transform: 'skewX(-16deg)' }} />
      </div>

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
              Adeshina College of Health Technology
            </motion.p>

            {admissionInfo.applicationOpen ? (
              <motion.div
                variants={healthFadeUp}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 ring-1 ring-[#041c36]/12"
              >
                <span className="h-2 w-2 rounded-full bg-[#3d8fd1]" aria-hidden="true" />
                <span className="font-sans text-[12px] font-semibold text-[#041c36]">
                  Applications open · {admissionInfo.session}
                </span>
              </motion.div>
            ) : null}

            <motion.h2
              id="health-lead-heading"
              variants={healthFadeUp}
              className="mt-5 max-w-2xl font-serif text-[2.45rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#041c36] sm:text-5xl lg:text-[3.25rem]"
            >
              Prepare for a career in healthcare.
            </motion.h2>
            <motion.p
              variants={healthFadeUp}
              className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[#5c6570] sm:text-lg"
            >
              Practical training for community health, clinical support, and health-technology roles
              across Kwara State and Nigeria.
            </motion.p>

            <motion.ul
              variants={healthFadeUp}
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Study pathways"
            >
              {pathwayChips.map((chip) => (
                <li
                  key={chip.label}
                  className={`rounded-full border bg-white px-3.5 py-1.5 font-sans text-[12px] font-semibold ${chip.className}`}
                >
                  {chip.label}
                </li>
              ))}
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
