import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  X,
} from 'lucide-react';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';
import { Programme } from '@/types/programme';
import { useCollege } from '@/context/CollegeContext';

export function ProgrammesPage() {
  const { collegeId, path } = useCollege();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProgramme, setActiveProgramme] = useState<Programme | null>(null);

  const collegeProgrammes = useMemo(
    () => programmes.filter((p) => p.collegeId === collegeId),
    [collegeId]
  );

  const availableLevels = useMemo(() => {
    const levels = new Set<string>();
    collegeProgrammes.forEach((p) => levels.add(p.level));
    return ['all', ...Array.from(levels)];
  }, [collegeProgrammes]);

  const filteredProgrammes = useMemo(() => {
    return collegeProgrammes.filter((prog) => {
      const matchesLevel = selectedLevel === 'all' || prog.level === selectedLevel;
      const matchesSearch =
        searchQuery.trim() === '' ||
        prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prog.description && prog.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prog.level.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesLevel && matchesSearch;
    });
  }, [collegeProgrammes, selectedLevel, searchQuery]);

  const isHealth = collegeId === 'health-technology';
  const applyClass = isHealth
    ? 'bg-[#10a37f] hover:bg-[#0a7a5c]'
    : 'bg-[#02509e] hover:bg-[#013a75]';
  const accentText = isHealth ? 'text-[#0a7a5c]' : 'text-[#02509e]';

  const clearFilters = () => {
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src={
            isHealth
              ? '/images/health-technology/health-campus-1.jpg'
              : '/images/education/campus-gate.jpg'
          }
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[#05264c]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/92 via-[#05264c]/70 to-[#05264c]/35" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Link
              to={path()}
              className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#05264c] hover:border-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to College Home
            </Link>

            <h1 className="type-hero mt-6 text-white">
              {isHealth ? 'Health Technology programmes' : 'NCE programmes'}
            </h1>
            <p className="type-subtitle mt-4 text-[#e8c56a]">
              {isHealth
                ? 'Diploma & Certificate pathways'
                : 'Teacher education pathways'}
            </p>
            <p className="type-body-lg mt-5 text-white/85 max-w-2xl">
              {isHealth
                ? 'Diploma and Certificate pathways in community health, laboratory science, pharmacy technology, and related health fields at Adeshina College of Health Technology, Share.'
                : 'Nigeria Certificate in Education pathways in primary education, early childhood, sciences, languages, social studies, and related teaching combinations at Adeshina College of Education, Share.'}
            </p>

            <div className="mt-8">
              <Link
                to={path('apply')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 ${applyClass}`}
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <Container size="wide" className="py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {availableLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-md border px-4 py-2.5 text-[13px] font-semibold transition-colors shrink-0 ${
                    selectedLevel === level
                      ? 'border-[#05264c] bg-[#05264c] text-white'
                      : 'border-slate-300 bg-white text-[#05264c] hover:border-[#02509e] hover:text-[#02509e]'
                  }`}
                >
                  {level === 'all' ? 'All' : level}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-9 text-[13px] text-[#05264c] placeholder:text-slate-400 focus:border-[#02509e] focus:outline-none focus:ring-1 focus:ring-[#02509e]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-[#05264c]"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Programme grid */}
      <section className="border-b border-slate-200 bg-[#f8fafc] py-12 sm:py-14">
        <Container size="wide">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-[13px] text-slate-500">
            <span>
              Showing{' '}
              <strong className="font-semibold text-[#05264c]">{filteredProgrammes.length}</strong> of{' '}
              {collegeProgrammes.length} programmes
            </span>
            {(selectedLevel !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={clearFilters}
                className={`font-semibold ${accentText} hover:text-[#05264c]`}
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProgrammes.length === 0 ? (
            <div className="mx-auto max-w-md rounded-lg border border-slate-300 bg-white px-6 py-12 text-center shadow-[0_10px_28px_-12px_rgba(5,38,76,0.22)]">
              <GraduationCap className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-4 font-serif font-semibold text-xl text-[#05264c]">
                No programmes match
              </h3>
              <p className="mt-2 text-[14px] text-slate-600">
                Try another qualification level or clear your search.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center justify-center rounded-md bg-[#05264c] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#02509e]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {filteredProgrammes.map((prog, index) => (
                <div
                  key={prog.id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-[0_10px_28px_-12px_rgba(5,38,76,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(5,38,76,0.34)]"
                >
                  <div className="relative aspect-[16/10] bg-[#041c36]">
                    <img
                      src={
                        prog.image ||
                        (isHealth
                          ? '/images/health-technology/health-campus-1.jpg'
                          : '/images/education/campus-gate.jpg')
                      }
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#05264c] text-[12px] font-semibold text-white shadow-sm">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${accentText}`}
                      >
                        {prog.level}
                      </span>
                      <span className="text-[12px] font-medium text-slate-500">{prog.duration}</span>
                    </div>

                    <h2 className="mt-3 font-serif font-semibold text-xl text-[#05264c] leading-snug">
                      {prog.name}
                    </h2>

                    {prog.description && (
                      <p className="mt-2.5 line-clamp-3 text-[14px] text-slate-600 leading-relaxed">
                        {prog.description}
                      </p>
                    )}

                    <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-[13px]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-slate-500">Duration</span>
                        <span className="font-medium text-[#05264c]">{prog.duration}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2">
                        <span className="text-slate-500">Mode</span>
                        <span className="font-medium text-[#05264c]">{prog.mode.join(', ')}</span>
                      </div>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                      <button
                        type="button"
                        onClick={() => setActiveProgramme(prog)}
                        className="inline-flex items-center justify-center rounded-md bg-[#02509e] px-3 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#013a75]"
                      >
                        View details
                      </button>
                      <Link
                        to={path('apply')}
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2.5 text-[13px] font-semibold text-[#05264c] transition-colors hover:border-[#02509e] hover:text-[#02509e]"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Closing CTA */}
          <div className="mt-12 flex flex-col gap-6 rounded-lg border border-slate-300 bg-white p-6 sm:p-8 shadow-[0_10px_28px_-12px_rgba(5,38,76,0.22)] lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#05264c] tracking-[-0.02em] leading-snug">
                Ready to apply?
              </h2>
              <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                Check entry requirements and application steps, then start your online form.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <Link
                to={path('apply')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[14px] font-semibold text-white transition-colors ${applyClass}`}
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Details modal */}
      {activeProgramme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#041c36]/65 p-4 backdrop-blur-sm"
          onClick={() => setActiveProgramme(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(5,38,76,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${accentText}`}>
                  {activeProgramme.level} · {activeProgramme.duration}
                </p>
                <h3 className="mt-2 font-serif font-semibold text-2xl text-[#05264c] leading-snug">
                  {activeProgramme.name}
                </h3>
                <p className="mt-1 text-[13px] text-slate-500">
                  {activeProgramme.mode.join(', ')} · Share Campus, Kwara State
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#05264c]"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeProgramme.description && (
              <div className="border-b border-slate-200 py-5">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Overview
                </h4>
                <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                  {activeProgramme.description}
                </p>
              </div>
            )}

            {activeProgramme.entryRequirements && activeProgramme.entryRequirements.length > 0 && (
              <div className="border-b border-slate-200 py-5">
                <h4 className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <CheckCircle2 className={`h-4 w-4 ${accentText}`} />
                  Entry requirements
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {activeProgramme.entryRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5 text-[14px] text-slate-600">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isHealth ? 'bg-[#10a37f]' : 'bg-[#02509e]'
                        }`}
                      />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeProgramme.careerOpportunities &&
              activeProgramme.careerOpportunities.length > 0 && (
                <div className="py-5">
                  <h4 className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    <Briefcase className={`h-4 w-4 ${accentText}`} />
                    Career pathways
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeProgramme.careerOpportunities.map((career) => (
                      <span
                        key={career}
                        className="rounded-md border border-slate-200 bg-[#f8fafc] px-3 py-1.5 text-[13px] font-medium text-[#05264c]"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="rounded-md px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#05264c]"
              >
                Close
              </button>
              <Link
                to={path('apply')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-semibold text-white transition-colors ${applyClass}`}
              >
                Apply for this programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
