import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from './healthMotion';

export function HealthCampus() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-[#041c36]/10 bg-[#eaf5fc] py-14 lg:py-16"
      aria-labelledby="health-campus-heading"
    >
      <Container size="wide">
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <motion.div variants={healthFadeUp} className="lg:col-span-5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d8fd1]">
              Campus
            </p>
            <h2
              id="health-campus-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#041c36] sm:text-4xl"
            >
              Belong in Share
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[#5c6570]">
              A focused college community beside the Ifelodun Local Government Secretariat — built for
              serious health training, not city noise.
            </p>
            <p className="mt-6 font-sans text-[13px] leading-relaxed text-[#041c36]/65">
              {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
            </p>
          </motion.div>

          <motion.div
            variants={healthFadeUp}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#041c36]/10 bg-[#041c36] lg:col-span-7 lg:aspect-[16/9] lg:max-h-[20rem]"
          >
            <img
              src="/images/health-technology/health-campus-2.jpg"
              alt="Students on the Share campus of Adeshina College of Health Technology"
              className="absolute inset-0 h-full w-full object-cover object-[48%_32%] saturate-[0.9]"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
