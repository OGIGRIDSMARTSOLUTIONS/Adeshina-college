import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  GraduationCap,
  MapPin,
  Newspaper,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { colleges } from '@/data/colleges';
import { newsArticles } from '@/data/news';
import { admissionInfo } from '@/data/admissions';
import { siteConfig } from '@/data/siteConfig';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

const joinSteps = [
  {
    n: '01',
    title: 'Choose your college',
    body: 'Select Health Technology or Education according to your career direction.',
  },
  {
    n: '02',
    title: 'Explore programmes',
    body: 'Review available programmes, entry requirements and the academic pathway for your chosen college.',
  },
  {
    n: '03',
    title: 'Apply with confidence',
    body: 'Complete your application online and follow the admissions guidance provided by the college.',
  },
];

const accordionItems = [
  { id: 'about', label: 'About the School', eyebrow: 'Our institution', icon: ShieldCheck },
  { id: 'join', label: 'How to Join', eyebrow: 'Admissions journey', icon: GraduationCap },
  { id: 'colleges', label: 'Choose a College', eyebrow: 'Two professional pathways', icon: BookOpen },
  { id: 'news', label: 'News & Updates', eyebrow: 'Latest from campus', icon: Newspaper },
] as const;

type AccordionId = (typeof accordionItems)[number]['id'];

export function GatewayPage() {
  const [activeSection, setActiveSection] = useState<AccordionId | null>('about');
  const [hoveredCollege, setHoveredCollege] = useState<CollegeId>('health-technology');

  const toggleSection = (id: AccordionId) => {
    setActiveSection((current) => (current === id ? null : id));
  };

  const previewCollege = colleges.find((college) => college.id === hoveredCollege) ?? colleges[0];
  const latestNews = newsArticles.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-white text-[#05264c]">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#031b32]" aria-label="Adeshina Group of Colleges introduction">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={previewCollege.id}
              src={previewCollege.heroImage}
              alt=""
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="h-full w-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,20,38,.98)_0%,rgba(3,27,50,.92)_35%,rgba(3,27,50,.62)_62%,rgba(3,27,50,.30)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b32] via-transparent to-[#031b32]/30" />
          <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <Container size="wide" className="relative z-10 flex min-h-[calc(100vh-80px)] items-end py-12 sm:py-16 lg:items-center lg:py-20">
          <div className="grid w-full gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7 xl:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
              >
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] text-[#e8c56a] sm:text-xs">
                  <span className="h-px w-9 bg-[#e8c56a]" />
                  Share, Kwara State · Nigeria
                </div>

                <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[.98] tracking-[-.04em] text-white sm:text-6xl lg:text-[5.25rem]">
                  Adeshina Group
                  <span className="block text-white/90">of Colleges</span>
                </h1>

                <p className="mt-6 max-w-xl font-serif text-xl leading-snug text-white/80 sm:text-2xl">
                  Two colleges. One institution. One place to build your professional future.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/75 sm:text-base">
                  Professional pathways in health technology and teacher education, grounded in discipline,
                  practical learning, character and service.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#discover"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#05264c] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[#e8c56a]"
                  >
                    Discover Adeshina
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <Link
                    to="/portal"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/15"
                  >
                    Student Portal
                  </Link>
                </div>

                <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-xs font-medium text-white/65 sm:text-sm">
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-300" /> Share Campus</span>
                  <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sky-300" /> Professional Training</span>
                </div>
              </motion.div>
            </div>

            {/* Hover-driven college preview */}
            <div className="lg:col-span-5 lg:self-end xl:col-span-5 xl:col-start-8">
              <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-white/50">
                <span>Choose your pathway</span>
                <span className="hidden sm:inline">Hover to preview</span>
              </div>

              <div className="space-y-2">
                {colleges.map((college) => {
                  const id = college.id as CollegeId;
                  const isHealth = id === 'health-technology';
                  const active = hoveredCollege === id;

                  return (
                    <Link
                      key={college.id}
                      to={collegePath(id)}
                      onMouseEnter={() => setHoveredCollege(id)}
                      onFocus={() => setHoveredCollege(id)}
                      className={`group block overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 sm:p-5 ${
                        active
                          ? 'border-white/45 bg-white/[.15] shadow-2xl'
                          : 'border-white/15 bg-black/20 hover:border-white/30 hover:bg-white/[.10]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${isHealth ? 'border-emerald-300/30 bg-emerald-400/15 text-emerald-200' : 'border-sky-300/30 bg-sky-400/15 text-sky-200'}`}>
                          {isHealth ? <Stethoscope className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className={`block text-[10px] font-bold uppercase tracking-[.18em] ${isHealth ? 'text-emerald-300' : 'text-sky-300'}`}>
                            {isHealth ? 'Health sciences' : 'Educator training'}
                          </span>
                          <h2 className="mt-1 font-serif text-lg font-semibold text-white sm:text-xl">{college.shortName}</h2>
                        </div>
                        <ArrowRight className={`h-5 w-5 shrink-0 text-white/60 transition-all duration-300 ${active ? 'translate-x-1 text-white' : 'group-hover:translate-x-1 group-hover:text-white'}`} />
                      </div>

                      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{college.tagline}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(college.trainingFoci ?? []).slice(0, 2).map((focus) => (
                              <span key={focus} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/65">
                                {focus}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <p className="mt-3 text-[11px] text-white/45">Move across either college to reveal its campus image and programme focus.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* COLLAPSIBLE DISCOVERY */}
      <section id="discover" className="scroll-mt-20 bg-[#f6f8fb] py-14 sm:py-20 lg:py-24" aria-label="Explore Adeshina Group of Colleges">
        <Container size="wide">
          <div className="mb-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#c68a18]">Explore the institution</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-.03em] text-[#05264c] sm:text-5xl">Everything you need, in one place.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Open a section to discover the school, understand admission, choose your college and keep up with campus updates.</p>
            </div>
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:min-w-[25rem]">
              <div className="px-4 py-4 text-center sm:px-5"><span className="block font-serif text-2xl font-semibold text-[#05264c]">02</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.14em] text-slate-400">Colleges</span></div>
              <div className="border-x border-slate-200 px-4 py-4 text-center sm:px-5"><span className="block font-serif text-2xl font-semibold text-[#05264c]">01</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.14em] text-slate-400">Campus</span></div>
              <div className="px-4 py-4 text-center sm:px-5"><span className="block font-serif text-2xl font-semibold text-[#05264c]">∞</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.14em] text-slate-400">Possibility</span></div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_-40px_rgba(5,38,76,.35)]">
            {accordionItems.map((item, index) => {
              const Icon = item.icon;
              const open = activeSection === item.id;

              return (
                <div key={item.id} className={index > 0 ? 'border-t border-slate-200' : ''}>
                  <button
                    type="button"
                    onClick={() => toggleSection(item.id)}
                    className={`group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors sm:px-7 sm:py-6 ${open ? 'bg-[#05264c] text-white' : index % 2 === 0 ? 'bg-white hover:bg-[#fff8e8]' : 'bg-[#fff8e8] hover:bg-[#fff3d6]'}`}
                    aria-expanded={open}
                    aria-controls={`panel-${item.id}`}
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${open ? 'border-white/15 bg-white/10 text-[#e8c56a]' : index % 2 === 0 ? 'border-slate-200 bg-slate-50 text-[#02509e]' : 'border-[#e8c56a]/35 bg-[#e8c56a]/15 text-[#a86f0a]'}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`hidden text-[10px] font-bold tabular-nums sm:block ${open ? 'text-white/35' : 'text-slate-300'}`}>0{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[10px] font-bold uppercase tracking-[.18em] ${open ? 'text-[#e8c56a]' : 'text-[#c68a18]'}`}>{item.eyebrow}</span>
                      <span className={`mt-1 block font-serif text-xl font-semibold sm:text-2xl ${open ? 'text-white' : 'text-[#05264c]'}`}>{item.label}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-[#e8c56a]' : 'text-slate-400 group-hover:text-[#02509e]'}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`panel-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        {item.id === 'about' && (
                          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12">
                            <div className="lg:col-span-5">
                              <p className="text-2xl font-serif font-semibold leading-tight text-[#05264c]">A focused institution for professional education.</p>
                              <p className="mt-4 text-sm leading-7 text-slate-600">{siteConfig.shortDescription}</p>
                              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#02509e] hover:text-[#05264c]">Read about the school <ArrowRight className="h-4 w-4" /></Link>
                            </div>
                            <div className="relative min-h-[250px] overflow-hidden rounded-2xl lg:col-span-7">
                              <img src="/images/campus/campus-life-1.jpg" alt="Adeshina Group of Colleges campus" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#05264c]/75 to-transparent" />
                              <div className="absolute bottom-5 left-5 text-white"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#e8c56a]">One Share campus</p><p className="mt-1 font-serif text-xl font-semibold">Health Technology + Education</p></div>
                            </div>
                          </div>
                        )}

                        {item.id === 'join' && (
                          <div className="p-5 sm:p-8">
                            <div className="grid gap-4 md:grid-cols-3">
                              {joinSteps.map((step) => (
                                <div key={step.n} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg">
                                  <span className="font-serif text-3xl font-semibold text-[#02509e]">{step.n}</span>
                                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#05264c]">{step.title}</h3>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-[#05264c] p-5 text-white sm:p-6">
                              <div className="flex-1"><p className="font-serif text-lg font-semibold">Applications are currently open.</p><p className="mt-1 text-sm text-white/65">{admissionInfo.session}</p></div>
                              <Link to="/colleges/health-technology/apply" className="inline-flex items-center gap-2 rounded-full bg-[#e8c56a] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#05264c] hover:bg-white">Start an application <ArrowRight className="h-4 w-4" /></Link>
                            </div>
                          </div>
                        )}

                        {item.id === 'colleges' && (
                          <div className="grid gap-4 p-5 sm:p-8 md:grid-cols-2">
                            {colleges.map((college) => {
                              const id = college.id as CollegeId;
                              const isHealth = id === 'health-technology';
                              return (
                                <Link
                                  key={college.id}
                                  to={collegePath(id)}
                                  onMouseEnter={() => setHoveredCollege(id)}
                                  className="group relative min-h-[360px] overflow-hidden rounded-2xl bg-[#05264c]"
                                >
                                  <img src={college.heroImage} alt={college.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#031b32] via-[#031b32]/35 to-transparent" />
                                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                                    <span className={`text-[10px] font-bold uppercase tracking-[.2em] ${isHealth ? 'text-emerald-300' : 'text-sky-300'}`}>{isHealth ? 'Health sciences' : 'Educator training'}</span>
                                    <h3 className="mt-2 font-serif text-2xl font-semibold text-white">{college.shortName}</h3>
                                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">{college.tagline}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">Explore college <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}

                        {item.id === 'news' && (
                          <div className="p-5 sm:p-8">
                            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                              {latestNews.map((article) => (
                                <Link key={article.id} to={`/news#${article.slug}`} className="group flex flex-col gap-4 p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center">
                                  <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28">
                                    <img src={article.featuredImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-3"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#02509e]">{article.category}</span><span className="text-xs text-slate-400">{article.date}</span></div>
                                    <h3 className="mt-2 font-serif text-lg font-semibold text-[#05264c] group-hover:text-[#02509e]">{article.title}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{article.summary}</p>
                                  </div>
                                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#02509e] sm:block" />
                                </Link>
                              ))}
                            </div>
                            <Link to="/news" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#02509e] hover:text-[#05264c]">View all news and updates <ArrowRight className="h-4 w-4" /></Link>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Closing institutional statement */}
      <section className="relative overflow-hidden bg-[#05264c] py-16 text-white sm:py-20">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(91,163,224,.16),transparent_62%)]" />
        <Container size="wide" className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">Adeshina Group of Colleges</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-[-.02em] sm:text-4xl">Build knowledge. Build character. Build your future.</h2>
          </div>
          <Link to="#discover" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:bg-white hover:text-[#05264c]">Explore the school <ArrowRight className="h-4 w-4" /></Link>
        </Container>
      </section>
    </div>
  );
}
