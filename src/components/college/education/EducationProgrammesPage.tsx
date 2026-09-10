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
  educationCardTilt,
  educationEase,
  educationFadeUp,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from '@/components/college/education/educationMotion';
import { edBtnGold, edBtnInk } from '@/components/college/education/educationTheme';
import { EducationGeometricBg } from '@/components/college/education/EducationGeometricBg';

/** College of Education Programmes — NCE directory with 3D prospectus cards. */
export function EducationProgrammesPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProgramme, setActiveProgramme] = useState<Programme | null>(null);

  const collegeProgrammes = useMemo(
    () => programmes.filter((p) => p.collegeId === 'education'),
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
    <div className="bg-[#eaf4fb] text-[#0c2340]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10 bg-[#0c2340]">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[48%_40%] saturate-[0.92]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0c2340] via-[#0c2340]/90 to-[#0c2340]/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/55 via-transparent to-[#0c2340]/30"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={educationSlideIn}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#c9a227]"
            >
              Programmes
            </motion.p>
            <motion.h1
              variants={educationSlideIn}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              NCE pathways for teachers
            </motion.h1>
            <motion.p
              variants={educationSlideIn}
              className="mt-4 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Nigeria Certificate in Education combinations across primary, early childhood, sciences,
              languages, and vocational teaching at our Share campus.
            </motion.p>
            <motion.div variants={educationSlideIn} className="mt-7">
              <Link to={path('apply')} className={edBtnGold}>
                Apply now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="paper" />
        <Container size="wide" className="relative py-4 sm:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
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
                        ? 'bg-[#0c2340] text-white shadow-[0_8px_18px_-10px_rgba(12,35,64,0.55)]'
                        : 'bg-white/90 text-[#0c2340] ring-1 ring-[#0c2340]/12 hover:ring-[#3d8fd1]/45'
                    }`}
                  >
                    {level === 'all' ? 'All' : level}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full shrink-0 lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a6570]" />
              <input
                type="search"
                placeholder="Search programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#0c2340]/12 bg-white py-2.5 pl-9 pr-9 font-sans text-[14px] text-[#0c2340] placeholder:text-[#5a6570]/70 focus:border-[#3d8fd1] focus:outline-none focus:ring-2 focus:ring-[#3d8fd1]/25"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#5a6570] hover:text-[#0c2340]"
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
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="mist" />
        <Container size="wide" className="relative py-10 lg:py-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-sans text-[13px] text-[#5a6570]">
            <span>
              Showing{' '}
              <strong className="font-semibold text-[#0c2340]">{filteredProgrammes.length}</strong> of{' '}
              {collegeProgrammes.length} programmes
            </span>
            {(selectedLevel !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={clearFilters}
                className="font-semibold text-[#1e6fa8] transition-colors hover:text-[#0c2340]"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProgrammes.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl bg-white px-6 py-12 text-center shadow-[0_4px_0_0_#c9a227,0_18px_36px_-20px_rgba(12,35,64,0.35)] ring-1 ring-[#0c2340]/10">
              <GraduationCap className="mx-auto h-10 w-10 text-[#3d8fd1]/55" />
              <h2 className="mt-4 font-serif text-xl font-semibold text-[#0c2340]">
                No programmes match
              </h2>
              <p className="mt-2 font-sans text-[14px] text-[#5a6570]">
                Try another level or clear your search.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#0c2340] px-5 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-[#1e6fa8]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.ul
              variants={educationStaggerCards}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
              style={{ perspective: 1200 }}
            >
              {filteredProgrammes.map((prog, index) => (
                <motion.li
                  key={prog.id}
                  variants={educationCardTilt}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -12,
                          rotateX: 5,
                          rotateY: index % 3 === 0 ? -4 : index % 3 === 2 ? 4 : 0,
                          scale: 1.015,
                          transition: { type: 'spring', stiffness: 260, damping: 18 },
                        }
                  }
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_4px_0_0_#0c2340,0_18px_28px_-12px_rgba(12,35,64,0.35),0_40px_64px_-28px_rgba(12,35,64,0.45)] ring-1 ring-[#0c2340]/10 transition-[box-shadow,ring-color] duration-300 hover:shadow-[0_6px_0_0_#1e6fa8,0_22px_36px_-10px_rgba(61,143,209,0.4),0_48px_72px_-24px_rgba(12,35,64,0.5)] hover:ring-[#3d8fd1]/45">
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute inset-y-3 left-0 z-20 w-px bg-gradient-to-b from-white/70 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0c2340]">
                      <img
                        src={prog.image || '/images/education/campus-gate.jpg'}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/85 via-[#0c2340]/20 to-black/10"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                        <span className="rounded-full border border-white/70 bg-white/95 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#0c2340] shadow-sm">
                          {prog.level}
                        </span>
                        <span className="font-sans text-[12px] font-semibold text-white/90 drop-shadow">
                          {prog.duration}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex flex-1 flex-col bg-gradient-to-b from-white to-[#f3f8fc] px-5 py-5 sm:px-6 sm:py-6">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0c2340] transition-colors group-hover:text-[#1e6fa8] sm:text-[1.25rem]">
                          {prog.name}
                        </h2>
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf4fb] text-[#3d8fd1] shadow-[0_4px_10px_-4px_rgba(61,143,209,0.55)] transition-all group-hover:bg-[#3d8fd1] group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      {prog.description ? (
                        <p className="mt-3 line-clamp-2 font-sans text-[14px] leading-relaxed text-[#5a6570]">
                          {prog.description}
                        </p>
                      ) : null}
                      <p className="mt-3 font-sans text-[13px] text-[#5a6570]">{prog.mode.join(', ')}</p>

                      <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                        <button
                          type="button"
                          onClick={() => setActiveProgramme(prog)}
                          className="inline-flex items-center justify-center rounded-2xl bg-[#0c2340] px-3 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#1e6fa8]"
                        >
                          View details
                        </button>
                        <Link
                          to={path('apply')}
                          className="inline-flex items-center justify-center rounded-2xl border border-[#0c2340]/15 bg-white px-3 py-2.5 font-sans text-[13px] font-semibold text-[#0c2340] transition-colors hover:border-[#3d8fd1] hover:text-[#1e6fa8]"
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
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="ink" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            <motion.div variants={educationSlideIn} className="lg:col-span-8">
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-[2.15rem]">
                Ready to apply?
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/75">
                Review entry requirements for your pathway, then submit your application for the open
                session.
              </p>
            </motion.div>
            <motion.div
              variants={educationFadeUp}
              className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch lg:justify-end"
            >
              <Link to={path('apply')} className={`${edBtnGold} w-full justify-center sm:w-auto`}>
                Apply for admission
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to={path('admissions')} className={`${edBtnInk} w-full justify-center sm:w-auto`}>
                Admissions guide
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Details modal */}
      {activeProgramme ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0c2340]/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setActiveProgramme(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="education-programme-detail-title"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: educationEase }}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 shadow-[0_4px_0_0_#c9a227,0_24px_48px_-20px_rgba(12,35,64,0.45)] sm:rounded-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#0c2340]/10 pb-4">
              <div>
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#c9a227]">
                  {activeProgramme.level} · {activeProgramme.duration}
                </p>
                <h2
                  id="education-programme-detail-title"
                  className="mt-2 font-serif text-2xl font-semibold leading-snug text-[#0c2340]"
                >
                  {activeProgramme.name}
                </h2>
                <p className="mt-1 font-sans text-[13px] text-[#5a6570]">
                  {activeProgramme.mode.join(', ')} · Share campus, Kwara State
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="rounded-xl p-1.5 text-[#5a6570] transition-colors hover:bg-[#eaf4fb] hover:text-[#0c2340]"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeProgramme.description ? (
              <div className="border-b border-[#0c2340]/10 py-5">
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5a6570]">
                  Overview
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                  {activeProgramme.description}
                </p>
              </div>
            ) : null}

            {activeProgramme.entryRequirements && activeProgramme.entryRequirements.length > 0 ? (
              <div className="border-b border-[#0c2340]/10 py-5">
                <h3 className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5a6570]">
                  <CheckCircle2 className="h-4 w-4 text-[#3d8fd1]" />
                  Entry requirements
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {activeProgramme.entryRequirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 font-sans text-[14px] text-[#5a6570]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {activeProgramme.careerOpportunities &&
            activeProgramme.careerOpportunities.length > 0 ? (
              <div className="py-5">
                <h3 className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5a6570]">
                  <Briefcase className="h-4 w-4 text-[#3d8fd1]" />
                  Career pathways
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProgramme.careerOpportunities.map((career) => (
                    <span
                      key={career}
                      className="rounded-full bg-[#eaf4fb] px-3 py-1.5 font-sans text-[13px] font-medium text-[#0c2340] ring-1 ring-[#0c2340]/08"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#0c2340]/10 pt-5">
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="rounded-2xl px-4 py-2.5 font-sans text-[13px] font-semibold text-[#5a6570] transition-colors hover:text-[#0c2340]"
              >
                Close
              </button>
              <Link
                to={path('apply')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0c2340] px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#1e6fa8]"
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
