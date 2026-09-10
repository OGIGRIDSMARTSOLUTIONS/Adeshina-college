import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { College } from '@/types/college';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';
import { healthCardIn, healthEase, healthFadeUp, healthStagger } from './healthMotion';

interface HealthProgrammesProps {
  college: College;
}

export function HealthProgrammes({ college }: HealthProgrammesProps) {
  const reduceMotion = useReducedMotion();
  const collegeProgrammes = programmes.filter((p) => p.collegeId === college.id);
  const preview = collegeProgrammes.slice(0, 4);

  return (
    <section
      id="programmes"
      className="scroll-mt-24 border-b border-[#041c36]/10 bg-[#eaf5fc] py-16 lg:py-20"
      aria-labelledby="health-programmes-heading"
    >
      <Container size="wide">
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                Programmes
              </p>
              <h2
                id="health-programmes-heading"
                className="mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#041c36] sm:text-4xl"
              >
                Find your path in health
              </h2>
              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#5c6570]">
                Pathways into community health, laboratory science, pharmacy support, and more.
              </p>
            </motion.div>

            <motion.div variants={healthFadeUp}>
              <Link
                to={`/colleges/${college.id}/programmes`}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#041c36] px-5 py-3.5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-[#2a73ad]"
              >
                View all programmes
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <motion.ul
            variants={healthStagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {preview.map((prog) => (
              <motion.li key={prog.id} variants={healthCardIn}>
                <Link
                  to={`/colleges/${college.id}/programmes`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#041c36]/8 transition-all duration-300 hover:-translate-y-1 hover:ring-[#3d8fd1]/45 hover:shadow-[0_24px_50px_-20px_rgba(61,143,209,0.4)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#041c36] sm:aspect-[2/1]">
                    <img
                      src={prog.image || '/images/health-technology/health-campus-1.jpg'}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/55 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                      <span className="rounded-full border border-white/80 bg-white/95 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#041c36]">
                        {prog.level}
                      </span>
                      <span className="font-sans text-[12px] font-semibold text-white/90">
                        {prog.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36] transition-colors group-hover:text-[#2a73ad] sm:text-[1.35rem]">
                        {prog.name}
                      </h3>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf5fc] text-[#3d8fd1] transition-colors group-hover:bg-[#3d8fd1] group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    {prog.description && (
                      <p className="mt-3 line-clamp-2 font-sans text-[14px] leading-relaxed text-[#5c6570] sm:text-[15px]">
                        {prog.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {collegeProgrammes.length > preview.length && (
            <motion.p
              variants={healthFadeUp}
              className="mt-8 font-sans text-sm text-[#5c6570]"
              transition={{ ease: healthEase }}
            >
              Showing {preview.length} of {collegeProgrammes.length} programmes.
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
