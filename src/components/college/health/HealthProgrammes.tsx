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
      className="relative scroll-mt-24 overflow-hidden border-b border-[#041c36]/10 bg-[#e8edf2] py-16 lg:py-20"
      aria-labelledby="health-programmes-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#dde4ec]" />
        <div
          className="absolute inset-y-[-8%] right-[-8%] w-[54%] bg-[#041c36]/[0.15]"
          style={{ clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div
          className="absolute inset-y-[-8%] right-[4%] w-[36%] bg-[#3d8fd1]/24"
          style={{ clipPath: 'polygon(38% 0, 100% 0, 78% 100%, 5% 100%)' }}
        />
        <div
          className="absolute left-[-8%] bottom-[-20%] h-[55%] w-[40%] bg-[#041c36]/[0.1]"
          style={{ clipPath: 'polygon(0 20%, 100% 0, 80% 100%, 0 100%)' }}
        />
        <div className="absolute inset-y-[8%] left-[36%] w-[2px] bg-[#041c36]/28" style={{ transform: 'skewX(-12deg)' }} />
        <div className="absolute inset-y-[8%] left-[48%] w-[2px] bg-[#3d8fd1]/45" style={{ transform: 'skewX(-12deg)' }} />
      </div>

      <Container size="wide" className="relative">
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
              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#4a5560]">
                Pathways into community health, laboratory science, pharmacy support, and more.
              </p>
            </motion.div>

            <motion.div variants={healthFadeUp}>
              <Link
                to={`/colleges/${college.id}/programmes`}
                className="inline-flex items-center gap-2 bg-[#041c36] px-5 py-3.5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-[#2a73ad]"
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12 transition-all duration-300 hover:-translate-y-1 hover:ring-[#041c36]/25"
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.12] via-transparent to-[#3d8fd1]/[0.1]" />
                    <div
                      className="absolute -right-6 bottom-0 h-40 w-40 bg-[#041c36]/[0.14]"
                      style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 70%)' }}
                    />
                    <div
                      className="absolute right-0 top-0 h-24 w-24 bg-[#3d8fd1]/18"
                      style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%)' }}
                    />
                  </div>

                  <span
                    className="absolute inset-y-0 left-0 z-10 w-1 bg-[#041c36] transition-colors duration-300 group-hover:bg-[#3d8fd1]"
                    aria-hidden="true"
                  />

                  <div className="relative aspect-[16/9] overflow-hidden bg-[#041c36] sm:aspect-[2/1]">
                    <img
                      src={prog.image || '/images/health-technology/health-campus-1.jpg'}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/70 via-[#041c36]/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                      <span className="bg-[#041c36] px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                        {prog.level}
                      </span>
                      <span className="font-sans text-[12px] font-semibold text-white/90">
                        {prog.duration}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-5 pl-6 sm:p-6 sm:pl-7">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36] transition-colors group-hover:text-[#2a73ad] sm:text-[1.35rem]">
                        {prog.name}
                      </h3>
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-[#041c36] text-white transition-colors group-hover:bg-[#3d8fd1]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    {prog.description && (
                      <p className="mt-3 line-clamp-2 font-sans text-[14px] leading-relaxed text-[#4a5560] sm:text-[15px]">
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
              className="mt-8 font-sans text-sm text-[#4a5560]"
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
