import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { healthCardIn, healthEase, healthFadeUp } from './healthMotion';

const trustPoints = [
  {
    label: 'Clear pathways',
    body: 'Diploma, ND, and certificate programmes that map to real health roles — community care, labs, pharmacy support, and more.',
    tone: 'bg-[#5ba8d9]',
  },
  {
    label: 'Hands-on training',
    body: 'You practise before you practise for pay: lab sessions, clinical simulations, and supervised community postings.',
    tone: 'bg-[#3d8fd1]',
  },
  {
    label: 'Share campus',
    body: 'A focused college setting in Ifelodun LGA — calm enough to study hard, close enough for family visits.',
    tone: 'bg-[#2a73ad]',
  },
];

const cardStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

const trustCardIn = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: healthEase },
  },
};

export function HealthTrust() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#041c36]" aria-label="Why students trust this college">
      <Container size="wide" className="py-12 lg:py-14">
        <motion.p
          variants={healthFadeUp}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-2xl font-serif text-2xl leading-snug tracking-[-0.015em] text-white sm:text-3xl"
        >
          Recognised training.{' '}
          <span className="text-[#5ba8d9]">Practical preparation.</span>
        </motion.p>

        <motion.ul
          variants={cardStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-80px', amount: 0.25 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        >
          {trustPoints.map((point) => (
            <motion.li
              key={point.label}
              variants={reduceMotion ? healthCardIn : trustCardIn}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.25, ease: healthEase } }
              }
              className="rounded-md bg-white/[0.07] p-6 ring-1 ring-white/15 transition-colors hover:bg-white/10"
            >
              <motion.span
                className={`mb-5 block h-1 w-10 origin-left rounded-full ${point.tone}`}
                aria-hidden="true"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2, ease: healthEase }}
              />
              <p className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#9ec9ea]">
                {point.label}
              </p>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/90 sm:text-base">
                {point.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
