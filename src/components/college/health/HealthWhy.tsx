import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { healthCardIn, healthFadeUp, healthStagger } from './healthMotion';

const reasons = [
  {
    title: 'Learn by doing',
    body: 'Labs, clinical simulation, and supervised community postings — before you enter the workplace.',
    accent: 'bg-[#3d8fd1]',
    soft: 'bg-[#eaf5fc]',
  },
  {
    title: 'Clear career pathways',
    body: 'Programmes map to real roles in community health, laboratory science, pharmacy support, and related services.',
    accent: 'bg-[#0f7a5f]',
    soft: 'bg-[#e8f6f1]',
  },
  {
    title: 'A campus built for focus',
    body: 'Study in Share, Ifelodun LGA — a calm setting for discipline, character, and practical skill.',
    accent: 'bg-[#c68a18]',
    soft: 'bg-[#fbf4e6]',
  },
];

export function HealthWhy() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-[#041c36]/10 py-16 lg:py-20"
      aria-labelledby="health-why-heading"
      style={{
        backgroundColor: '#eef6fb',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(91,168,217,0.35) 0 8%, transparent 9%),
          radial-gradient(circle at 88% 18%, rgba(125,211,176,0.28) 0 7%, transparent 8%),
          radial-gradient(circle at 70% 85%, rgba(246,196,107,0.28) 0 8%, transparent 9%),
          linear-gradient(160deg, #eaf5fc 0%, #f7f3ea 55%, #eef6fb 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -left-6 top-10 h-24 w-36 rotate-[-10deg] rounded-[1.5rem] bg-[#5ba8d9]/25" />
        <span className="absolute right-8 top-16 h-16 w-16 rounded-full bg-[#7dd3b0]/30" />
        <span className="absolute bottom-8 left-1/3 h-12 w-20 rotate-[12deg] rounded-xl bg-[#f6c46b]/25" />
      </div>

      <Container size="wide" className="relative">
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={healthFadeUp} className="max-w-2xl">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#2a73ad]">
              Why Adeshina Health Tech
            </p>
            <h2
              id="health-why-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#041c36] sm:text-4xl"
            >
              Why study with us?
            </h2>
          </motion.div>

          <motion.ul
            variants={healthStagger}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {reasons.map((reason, index) => (
              <motion.li
                key={reason.title}
                variants={healthCardIn}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/95 p-6 shadow-[0_18px_40px_-28px_rgba(4,28,54,0.35)] ring-1 ring-[#041c36]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_rgba(61,143,209,0.4)] hover:ring-[#3d8fd1]/35 sm:p-7"
              >
                <span className={`mb-5 block h-1.5 w-12 rounded-full ${reason.accent}`} aria-hidden="true" />
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-serif text-lg tabular-nums text-[#041c36] ${reason.soft}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36] sm:text-[1.35rem]">
                  {reason.title}
                </h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                  {reason.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
