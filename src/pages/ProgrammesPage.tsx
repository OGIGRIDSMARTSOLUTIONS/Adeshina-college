import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, Stethoscope, ArrowRight, ArrowLeft, CheckCircle2, Briefcase, GraduationCap, X, Info } from 'lucide-react';
import { programmes } from '@/data/programmes';
import { colleges } from '@/data/colleges';
import { Container } from '@/components/common/Container';
import { Programme } from '@/types/programme';

export function ProgrammesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collegeParam = searchParams.get('college');

  const [selectedCollege, setSelectedCollege] = useState<string>(collegeParam || 'all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProgramme, setActiveProgramme] = useState<Programme | null>(null);

  // Sync state if query param changes
  useEffect(() => {
    if (collegeParam && (collegeParam === 'health-technology' || collegeParam === 'education')) {
      setSelectedCollege(collegeParam);
    }
  }, [collegeParam]);

  const handleCollegeChange = (id: string) => {
    setSelectedCollege(id);
    if (id === 'all') {
      searchParams.delete('college');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ college: id });
    }
  };

  // Available unique levels
  const availableLevels = useMemo(() => {
    const levels = new Set<string>();
    programmes.forEach((p) => levels.add(p.level));
    return ['all', ...Array.from(levels)];
  }, []);

  // Filtered programmes
  const filteredProgrammes = useMemo(() => {
    return programmes.filter((prog) => {
      const matchesCollege = selectedCollege === 'all' || prog.collegeId === selectedCollege;
      const matchesLevel = selectedLevel === 'all' || prog.level === selectedLevel;
      const matchesSearch =
        searchQuery.trim() === '' ||
        prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prog.description && prog.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prog.level.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCollege && matchesLevel && matchesSearch;
    });
  }, [selectedCollege, selectedLevel, searchQuery]);

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* Light Sky Blue / Navy Page Hero Banner */}
      <section className="bg-[#05264c] text-white py-16 sm:py-20 border-b border-sky-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#052042] via-[#073663]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30 pointer-events-none">
          <img
            src="/images/education/campus-gate.jpg"
            alt="Adeshina Campus"
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        <Container size="wide" className="relative z-20">
          <div className="max-w-3xl">
            {/* Back Breadcrumb */}
            <div className="mb-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-300" />
                <span>Back to Home</span>
              </Link>
            </div>

            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-sky-300 block mb-2">
              ACADEMIC PROGRAMMES DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Explore Professional Qualifications
            </h1>
            <p className="mt-4 text-base sm:text-lg text-sky-100 leading-relaxed max-w-2xl">
              Discover accredited Diploma, NCE, and Certificate programmes offered across Adeshina College of Health Technology and Adeshina College of Education in Share, Kwara State.
            </p>

            {/* Quick Metrics */}
            <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-white/15 text-xs text-sky-100">
              <div>
                <span className="font-bold text-white text-base block">{programmes.length}</span>
                <span>Offered Programmes</span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="font-bold text-white text-base block">15 Health Tech</span>
                <span>Health Sciences Courses</span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="font-bold text-white text-base block">25 Education NCE</span>
                <span>Teaching Disciplines</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="sticky top-16 z-30 bg-white border-b border-slate-200/90 shadow-xs py-4">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* College Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                type="button"
                onClick={() => handleCollegeChange('all')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 ${
                  selectedCollege === 'all'
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                }`}
              >
                All Colleges ({programmes.length})
              </button>

              <button
                type="button"
                onClick={() => handleCollegeChange('health-technology')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 ${
                  selectedCollege === 'health-technology'
                    ? 'bg-[#10a37f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Health Technology (15)</span>
              </button>

              <button
                type="button"
                onClick={() => handleCollegeChange('education')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 ${
                  selectedCollege === 'education'
                    ? 'bg-adeshina-blue text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>College of Education (25)</span>
              </button>
            </div>

            {/* Search Input & Qualification Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Level Filter Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full sm:w-auto text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue"
                  aria-label="Filter by Qualification Award Level"
                >
                  <option value="all">All Qualifications</option>
                  {availableLevels.filter((l) => l !== 'all').map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search text box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search programmes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Programme Card Directory Grid */}
      <section className="py-12 sm:py-16">
        <Container size="wide">
          {/* Active Filter Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-xs text-slate-500">
            <span>
              Showing <strong className="text-navy font-bold">{filteredProgrammes.length}</strong> of {programmes.length} programmes
            </span>

            {(selectedCollege !== 'all' || selectedLevel !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCollege('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                  searchParams.delete('college');
                  setSearchParams(searchParams);
                }}
                className="text-adeshina-blue hover:underline font-bold self-start sm:self-auto"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Health Technology Research-Found Notice Callout */}
          {selectedCollege === 'health-technology' && (
            <div className="mb-8 p-4 sm:p-5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <Info className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Health Technology Programme Directory Note</p>
                <p className="mt-0.5 text-amber-800 leading-relaxed">
                  The health technology programmes listed below reflect current institutional offerings documented across academic registries. Candidates are encouraged to confirm specific session admission quotas and physical screening schedules with the Admissions Registry in Share.
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredProgrammes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/90 shadow-sm max-w-lg mx-auto my-8">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-serif font-bold text-navy text-lg">No programmes match your filter</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try clearing your search term or changing the college/qualification level filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCollege('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                  searchParams.delete('college');
                  setSearchParams(searchParams);
                }}
                className="mt-5 px-5 py-2.5 rounded-lg bg-navy text-white text-xs font-bold hover:bg-navy-dark transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {filteredProgrammes.map((prog) => {
                const isHealth = prog.collegeId === 'health-technology';
                const college = colleges.find((c) => c.id === prog.collegeId);

                return (
                  <div
                    key={prog.id}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-adeshina-blue/30 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badge & Duration */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                            isHealth
                              ? 'bg-emerald-50 text-[#0b6b54] border border-emerald-100/80'
                              : 'bg-blue-50 text-adeshina-blue border border-blue-100/80'
                          }`}
                        >
                          {isHealth ? (
                            <Stethoscope className="w-3 h-3 text-[#10a37f]" />
                          ) : (
                            <BookOpen className="w-3 h-3 text-adeshina-blue" />
                          )}
                          <span>{college?.shortName || prog.collegeId}</span>
                        </span>

                        <span className="text-[11px] font-semibold text-slate-400">
                          {prog.duration}
                        </span>
                      </div>

                      {/* Programme Name */}
                      <h2 className="text-lg font-serif font-bold text-navy leading-snug group-hover:text-adeshina-blue transition-colors">
                        {prog.name}
                      </h2>

                      {/* Summary */}
                      {prog.description && (
                        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {prog.description}
                        </p>
                      )}

                      {/* Structured Metadata block */}
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Award / Qualification:</span>
                          <span className="font-semibold text-navy">{prog.level}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Study Mode:</span>
                          <span className="font-semibold text-navy">{prog.mode.join(', ')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Campus:</span>
                          <span className="font-semibold text-navy">Share, Kwara State</span>
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setActiveProgramme(prog)}
                        className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-navy bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-center"
                      >
                        View Requirements
                      </button>

                      <Link
                        to="/apply"
                        className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-navy hover:bg-adeshina-blue active:bg-adeshina-blue-dark rounded-lg shadow-xs hover:shadow-md transition-all duration-200 text-center"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Guidance Card */}
          <div className="mt-14 p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif font-bold text-navy text-xl">
                Ready to Apply for the 2024/2025 or 2025/2026 Academic Session?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Review verified admission guidelines, O'Level subject requirements, and step-by-step application instructions.
              </p>
            </div>

            <Link
              to="/admissions"
              className="px-6 py-3 rounded-xl bg-adeshina-blue text-white text-xs sm:text-sm font-bold hover:bg-adeshina-blue-dark transition-all shrink-0 shadow-xs inline-flex items-center gap-2"
            >
              <span>Go to Admissions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Programme Details & Curriculum Modal */}
      {activeProgramme && (
        <div
          className="fixed inset-0 z-50 bg-[#05264c]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveProgramme(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold bg-sky-50 text-sky-800 border border-sky-200">
                  {activeProgramme.collegeId === 'health-technology' ? 'Health Technology' : 'College of Education'} · {activeProgramme.level}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#05264c] mt-2">
                  {activeProgramme.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Duration: <strong className="text-slate-800">{activeProgramme.duration}</strong> · Study Mode: <strong className="text-slate-800">{activeProgramme.mode.join(', ')}</strong> · Location: <strong className="text-slate-800">Share Campus, Kwara State</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            {activeProgramme.description && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Curriculum Overview & Scope
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeProgramme.description}
                </p>
              </div>
            )}

            {/* Sample Curriculum Modules Breakdown */}
            <div className="py-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#05264c] mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>Key Curriculum Modules & Practical Areas</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-0.5">Foundation & Theory (Part I)</span>
                  <span className="text-slate-500">Core disciplinary theory, anatomy/pedagogy principles, and foundational ICT skills.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-0.5">Clinical / Teaching Practicum (Part II)</span>
                  <span className="text-slate-500">Hands-on hospital clinical postings, laboratory diagnosis, or supervised classroom teaching practice.</span>
                </div>
              </div>
            </div>

            {/* Entry Requirements */}
            {activeProgramme.entryRequirements && activeProgramme.entryRequirements.length > 0 && (
              <div className="py-3 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#05264c] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Entry Requirements (O'Level Credits)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeProgramme.entryRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Opportunities */}
            {activeProgramme.careerOpportunities && activeProgramme.careerOpportunities.length > 0 && (
              <div className="py-3 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#05264c] mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-sky-600" />
                  <span>Direct Career Opportunities</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProgramme.careerOpportunities.map((career, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs bg-sky-50 border border-sky-200 text-sky-900 font-medium"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveProgramme(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <Link
                to="/apply"
                className="px-6 py-2.5 rounded-xl bg-[#05264c] text-white text-xs font-bold hover:bg-sky-600 transition-all duration-200 shadow-sm"
              >
                Apply for this Programme &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
