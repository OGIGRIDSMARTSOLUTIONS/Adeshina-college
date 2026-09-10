import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Search,
  X,
} from 'lucide-react';
import { programmes } from '@/data/programmes';
import { Programme } from '@/types/programme';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import {
  healthCardIn,
  healthEase,
  healthFadeUp,
  healthStagger,
} from '@/components/college/health/healthMotion';
import { htBtnNavy } from '@/components/college/health/healthTheme';
import { HealthApplyButton } from '@/components/college/health/HealthApplyButton';

/** Health Technology Programmes — directory matching homepage craft. */
export function HealthProgrammesPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProgramme, setActiveProgramme] = useState<Programme | null>(null);

  const collegeProgrammes = useMemo(
    () => programmes.filter((p) => p.collegeId === 'health-technology'),
    []
  );

  const availableLevels = useMemo(() => {
    const levels = new Set(collegeProgrammes.map((p) => p.level));
    return ['all', ...Array.from(levels)];
  }, [collegeProgrammes]);

  const filteredProgrammes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return collegeProgrammes.filter((prog) => {
      const matchesLevel = selectedLevel === 'all' || prog.level === selectedLevel;
      const matchesSearch =
        q === '' ||
        prog.name.toLowerCase().includes(q) ||
        prog.level.toLowerCase().includes(q) ||
        (prog.description?.toLowerCase().includes(q) ?? false);
      return matchesLevel && matchesSearch;
    });
  }, [collegeProgrammes, selectedLevel, searchQuery]);

  const clearFilters = () => {
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#f7f3ea] text-[#1a2332]">
      {/* Hero — pulls under floating header */}
      <section
        data-college-hero
        className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#041c36] lg:-mt-[6rem]"
      >
        <img
          src="/images/health-technology/programmes-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.92]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/88 to-[#041c36]/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#041c36]/50 via-transparent to-[#041c36]/25"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10 pb-14 pt-12 sm:pb-16 lg:pb-20 lg:pt-[8.25rem]">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={healthFadeUp}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#5ba8d9]"
            >
              Programmes
            </motion.p>
            <motion.h1
              variants={healthFadeUp}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              Find your path in health
            </motion.h1>
            <motion.p
              variants={healthFadeUp}
              className="mt-4 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Diploma and Certificate pathways in community health, laboratory science, pharmacy
              technology, and related fields at our Share campus.
            </motion.p>
            <motion.div variants={healthFadeUp} className="mt-7">
                <HealthApplyButton to={path('apply')} className="w-full justify-between sm:w-auto" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-[#041c36]/10 bg-[#f7f3ea]">
        <Container size="wide" className="py-4 sm:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="flex min-w-0 flex-1 flex-wrap gap-2">
              {availableLevels.map((level) => {
                const active = selectedLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={`rounded-full px-4 py-2 font-sans text-[13px] font-semibold transition-colors ${
                      active
                        ? 'bg-[#041c36] text-white'
                        : 'bg-white text-[#041c36] ring-1 ring-[#041c36]/12 hover:ring-[#3d8fd1]/40'
                    }`}
                  >
                    {level === 'all' ? 'All' : level}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full shrink-0 lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c6570]" />
              <input
                type="search"
                placeholder="Search programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#041c36]/12 bg-white py-2.5 pl-9 pr-9 font-sans text-[14px] text-[#041c36] placeholder:text-[#5c6570]/70 focus:border-[#3d8fd1] focus:outline-none focus:ring-2 focus:ring-[#3d8fd1]/25"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#5c6570] hover:text-[#041c36]"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="border-b border-[#041c36]/10 bg-[#eaf5fc] py-10 lg:py-12">
        <Container size="wide">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-sans text-[13px] text-[#5c6570]">
            <span>
              Showing{' '}
              <strong className="font-semibold text-[#041c36]">{filteredProgrammes.length}</strong> of{' '}
              {collegeProgrammes.length} programmes
            </span>
            {(selectedLevel !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={clearFilters}
                className="font-semibold text-[#2a73ad] transition-colors hover:text-[#041c36]"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProgrammes.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl bg-white px-6 py-12 text-center ring-1 ring-[#041c36]/10">
              <GraduationCap className="mx-auto h-10 w-10 text-[#3d8fd1]/50" />
              <h2 className="mt-4 font-serif text-xl font-semibold text-[#041c36]">
                No programmes match
              </h2>
              <p className="mt-2 font-sans text-[14px] text-[#5c6570]">
                Try another level or clear your search.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#041c36] px-5 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-[#2a73ad]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.ul
              variants={healthStagger}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
            >
              {filteredProgrammes.map((prog) => (
                <motion.li key={prog.id} variants={healthCardIn}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#041c36]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(61,143,209,0.4)] hover:ring-[#3d8fd1]/45">
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
                        <h2 className="font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36] sm:text-[1.35rem]">
                          {prog.name}
                        </h2>
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf5fc] text-[#3d8fd1]">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      {prog.description ? (
                        <p className="mt-3 line-clamp-2 font-sans text-[14px] leading-relaxed text-[#5c6570] sm:text-[15px]">
                          {prog.description}
                        </p>
                      ) : null}
                      <p className="mt-3 font-sans text-[13px] text-[#5c6570]">
                        {prog.mode.join(', ')}
                      </p>

                      <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                        <button
                          type="button"
                          onClick={() => setActiveProgramme(prog)}
                          className="inline-flex items-center justify-center rounded-2xl bg-[#041c36] px-3 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#2a73ad]"
                        >
                          View details
                        </button>
                        <Link
                          to={path('apply')}
                          className="inline-flex items-center justify-center rounded-2xl border border-[#041c36]/15 bg-white px-3 py-2.5 font-sans text-[13px] font-semibold text-[#041c36] transition-colors hover:border-[#3d8fd1] hover:text-[#2a73ad]"
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="border-b border-[#041c36]/10 bg-white py-12 lg:py-14">
        <Container size="wide">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            <motion.div variants={healthFadeUp} className="lg:col-span-8">
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Ready to apply?
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-[#5c6570]">
                Review entry requirements for your pathway, then submit your application for the open
                session.
              </p>
            </motion.div>
            <motion.div
              variants={healthFadeUp}
              className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end"
            >
              <Link to={path('admissions')} className={`${htBtnNavy} w-full sm:w-auto`}>
                Admissions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
                <HealthApplyButton to={path('apply')} className="w-full justify-between sm:w-auto" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Details modal */}
      {activeProgramme ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#041c36]/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setActiveProgramme(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="health-programme-detail-title"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: healthEase }}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#041c36]/10 pb-4">
              <div>
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3d8fd1]">
                  {activeProgramme.level} · {activeProgramme.duration}
                </p>
                <h2
                  id="health-programme-detail-title"
                  className="mt-2 font-serif text-2xl font-semibold leading-snug text-[#041c36]"
                >
                  {activeProgramme.name}
                </h2>
                <p className="mt-1 font-sans text-[13px] text-[#5c6570]">
                  {activeProgramme.mode.join(', ')} · Share campus, Kwara State
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="rounded-xl p-1.5 text-[#5c6570] transition-colors hover:bg-[#eaf5fc] hover:text-[#041c36]"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeProgramme.description ? (
              <div className="border-b border-[#041c36]/10 py-5">
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5c6570]">
                  Overview
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                  {activeProgramme.description}
                </p>
              </div>
            ) : null}

            {activeProgramme.entryRequirements && activeProgramme.entryRequirements.length > 0 ? (
              <div className="border-b border-[#041c36]/10 py-5">
                <h3 className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5c6570]">
                  <CheckCircle2 className="h-4 w-4 text-[#3d8fd1]" />
                  Entry requirements
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {activeProgramme.entryRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5 font-sans text-[14px] text-[#5c6570]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d8fd1]" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {activeProgramme.careerOpportunities &&
            activeProgramme.careerOpportunities.length > 0 ? (
              <div className="py-5">
                <h3 className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5c6570]">
                  <Briefcase className="h-4 w-4 text-[#3d8fd1]" />
                  Career pathways
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProgramme.careerOpportunities.map((career) => (
                    <span
                      key={career}
                      className="rounded-full bg-[#eaf5fc] px-3 py-1.5 font-sans text-[13px] font-medium text-[#041c36]"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#041c36]/10 pt-5">
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="rounded-2xl px-4 py-2.5 font-sans text-[13px] font-semibold text-[#5c6570] transition-colors hover:text-[#041c36]"
              >
                Close
              </button>
              <Link
                to={path('apply')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#041c36] px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#2a73ad]"
              >
                Apply for this programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
