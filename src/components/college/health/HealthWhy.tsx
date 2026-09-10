import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { healthCardIn, healthFadeUp, healthStagger } from './healthMotion';

const reasons = [
  {
    title: 'Learn by doing',
    body: 'Labs, clinical simulation, and supervised community postings — before you enter the workplace.',
    wash: 'from-[#041c36]/[0.14] via-[#3d8fd1]/[0.1] to-transparent',
  },
  {
    title: 'Clear career pathways',
    body: 'Programmes map to real roles in community health, laboratory science, pharmacy support, and related services.',
    wash: 'from-[#2a73ad]/[0.16] via-[#041c36]/[0.08] to-transparent',
  },
  {
    title: 'A campus built for focus',
    body: 'Study in Share, Ifelodun LGA — a calm setting for discipline, character, and practical skill.',
    wash: 'from-[#041c36]/[0.16] via-transparent to-[#3d8fd1]/[0.12]',
  },
];

export function HealthWhy() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#e8edf2] py-16 lg:py-20"
      aria-labelledby="health-why-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#dde4ec]" />
        <div
          className="absolute inset-y-[-8%] left-[-6%] w-[48%] bg-[#041c36]/[0.16]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 62% 100%, 0 100%)' }}
        />
        <div
          className="absolute -right-[10%] top-0 h-full w-[52%] bg-[#3d8fd1]/22"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div
          className="absolute right-[8%] top-[-15%] h-[70%] w-[28%] bg-[#041c36]/[0.12]"
          style={{ clipPath: 'polygon(45% 0, 100% 0, 70% 100%, 0 100%)' }}
        />
        <div className="absolute inset-y-[8%] right-[28%] w-[2px] bg-[#041c36]/30" style={{ transform: 'skewX(-12deg)' }} />
        <div className="absolute inset-y-[8%] right-[14%] w-[2px] bg-[#3d8fd1]/50" style={{ transform: 'skewX(-12deg)' }} />
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
              Why Adeshina Health Technology
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
                className="group relative flex h-full flex-col overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12 transition-all duration-300 hover:-translate-y-1 hover:ring-[#041c36]/25"
              >
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className={`absolute inset-0 bg-gradient-to-br ${reason.wash}`} />
                  <div
                    className="absolute -right-4 -top-8 h-44 w-44 bg-[#041c36]/[0.14]"
                    style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                  />
                  <div
                    className="absolute -right-2 bottom-[-10%] h-28 w-28 bg-[#3d8fd1]/20"
                    style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#041c36]/[0.08] to-transparent" />
                </div>

                <span
                  className="absolute inset-y-0 left-0 w-1 bg-[#041c36] transition-colors duration-300 group-hover:bg-[#3d8fd1]"
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col p-6 pl-7 sm:p-7 sm:pl-8">
                  <span className="inline-flex h-9 w-9 items-center justify-center bg-[#041c36] font-serif text-[13px] font-semibold tabular-nums tracking-wide text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36] sm:text-[1.35rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#4a5560]">
                    {reason.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
