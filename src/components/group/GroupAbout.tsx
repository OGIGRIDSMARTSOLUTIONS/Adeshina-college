import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Eye,
  GraduationCap,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
} from 'lucide-react';
import { colleges } from '@/data/colleges';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

const values = [
  {
    number: '01',
    title: 'Practical competency',
    body: 'We connect classroom knowledge to real professional practice through laboratories, clinical exposure, teaching practice and supervised field experience.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Integrity & discipline',
    body: 'We develop the character, accountability and professional ethics required of people entrusted with the health and education of their communities.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Community impact',
    body: 'Our training is shaped around the needs of communities in Kwara State and Nigeria, preparing graduates who can contribute with competence and service.',
    icon: HeartHandshake,
  },
  {
    number: '04',
    title: 'Academic rigour',
    body: 'Our programmes are structured to build strong foundations, professional confidence, workplace readiness and pathways for continued learning.',
    icon: Award,
  },
];

const milestones = [
  {
    year: '2011',
    title: 'A vision takes root in Share',
    body: 'Adeshina was established with a clear commitment to accessible, disciplined professional education in health technology and teacher education.',
  },
  {
    year: 'Growth',
    title: 'Two specialised colleges',
    body: 'The institution developed two distinct academic pathways — health technology and education — united by a shared campus and standard of excellence.',
  },
  {
    year: 'Today',
    title: 'Training for service and impact',
    body: 'Students now pursue a broad range of professional programmes supported by practical learning environments, dedicated staff and a focused campus community.',
  },
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GroupAbout() {
  return (
    <div className="min-h-screen bg-white text-[#05264c]">
      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[#031b32] text-white">
        <div className="absolute inset-0">
          <img
            src="/images/campus/campus-life-1.jpg"
            alt="Adeshina Group of Colleges campus in Share"
            className="h-full w-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,18,35,.98)_0%,rgba(3,27,50,.88)_43%,rgba(3,27,50,.40)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b32] via-transparent to-[#031b32]/25" />
          <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-28">
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] text-[#e8c56a] sm:text-xs">
                <span className="h-px w-10 bg-[#e8c56a]" />
                The institution · Share, Kwara State
              </div>
              <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[.98] tracking-[-.04em] text-white sm:text-6xl lg:text-[5.6rem]">
                About Adeshina
                <span className="block text-white/75">Group of Colleges.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-serif text-xl leading-snug text-[#e8c56a] sm:text-2xl">
                Two colleges. One campus. A shared commitment to professional excellence.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-sky-100/75 sm:text-base">
                Adeshina brings health technology and teacher education together in Share, creating a focused academic environment where knowledge, practical skill, character and service grow together.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <div className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-4">
                {[
                  { value: '02', label: 'Professional colleges' },
                  { value: '40+', label: 'Programme pathways' },
                  { value: '01', label: 'Share campus' },
                  { value: '2011', label: 'Institutional foundation' },
                ].map((item) => (
                  <div key={item.label} className="border-r border-white/10 px-4 py-5 first:pl-0 sm:px-5">
                    <p className="font-serif text-2xl font-semibold text-white sm:text-3xl">{item.value}</p>
                    <p className="mt-1 text-[11px] leading-5 text-white/55 sm:text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who we are */}
      <section className="bg-[#f6f8fb] py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#c68a18]">Our story</p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-[1.05] tracking-[-.03em] text-[#05264c] sm:text-5xl">
                Built around two professions that shape communities.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Adeshina Group of Colleges was founded on a simple conviction: strong communities need both competent healthcare professionals and well-prepared educators.
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                From our campus in Share, Ifelodun Local Government Area of Kwara State, students are given room to learn seriously, practise deliberately and develop the character required to serve others well.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/#colleges" className="group inline-flex items-center gap-2 rounded-full bg-[#05264c] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#02509e]">
                  Explore our colleges <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#05264c]/20 bg-white px-5 py-3 text-sm font-bold text-[#05264c] transition-colors hover:border-[#02509e] hover:text-[#02509e]">
                  Visit the campus
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#05264c] shadow-[0_30px_80px_-35px_rgba(5,38,76,.55)]">
                <img src="/images/education/campus-gate.jpg" alt="Adeshina College of Education campus gate" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031b32]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">Our home</p>
                      <p className="mt-1 font-serif text-2xl font-semibold text-white">Share, Kwara State</p>
                    </div>
                    <MapPin className="mb-1 h-6 w-6 text-sky-200" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission + vision */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#c68a18]">Our direction</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-.03em] text-[#05264c] sm:text-5xl">Purpose before prestige.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Everything we do is designed around the kind of graduate we want to release into society.</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="group h-full rounded-[1.5rem] border border-slate-200 bg-[#f6f8fb] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_-30px_rgba(5,38,76,.4)] sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#05264c] text-[#e8c56a]"><Target className="h-5 w-5" /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[.2em] text-[#c68a18]">Our mission</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#05264c] sm:text-3xl">Competence with character.</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">To provide disciplined, career-focused tertiary education that produces ethically grounded healthcare practitioners and educators equipped to meet contemporary community and national needs.</p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="group h-full rounded-[1.5rem] border border-[#02509e]/15 bg-[#05264c] p-7 text-white shadow-[0_25px_55px_-30px_rgba(5,38,76,.5)] transition-all duration-300 hover:-translate-y-1 sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#e8c56a]"><Eye className="h-5 w-5" /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">Our vision</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight sm:text-3xl">A benchmark for practical excellence.</h3>
                <p className="mt-4 text-base leading-7 text-white/70">To be recognised for the practical quality of our graduates, the strength of our professional preparation and our unwavering standard of discipline across health technology and teacher education.</p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#f6f8fb] py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#c68a18]">The Adeshina standard</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-.03em] text-[#05264c] sm:text-5xl">What guides us.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-500">The principles below shape our teaching, campus culture and expectations of every student.</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.05}>
                  <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_50px_-30px_rgba(5,38,76,.4)] sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#05264c] text-sky-200 transition-colors group-hover:bg-[#02509e]"><Icon className="h-5 w-5" /></div>
                      <span className="font-serif text-2xl text-slate-200">{item.number}</span>
                    </div>
                    <h3 className="mt-7 font-serif text-xl font-semibold text-[#05264c] sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{item.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Journey */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#c68a18]">Our journey</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-[-.03em] text-[#05264c] sm:text-5xl">Growing with purpose.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">From a foundational vision in Share to a growing professional education community, our story is still being written.</p>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="relative ml-2 border-l border-slate-200 pl-7 sm:pl-10">
                {milestones.map((item, index) => (
                  <Reveal key={item.year} delay={index * 0.08} className="relative pb-10 last:pb-0">
                    <span className="absolute -left-[2.15rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-[#02509e] shadow-sm sm:-left-[2.65rem]" />
                    <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#c68a18]">{item.year}</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[#05264c]">{item.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{item.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Colleges */}
      <section className="bg-[#f6f8fb] py-16 sm:py-20 lg:py-28" aria-label="Our colleges">
        <Container size="wide">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#c68a18]">Two pathways</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-.03em] text-[#05264c] sm:text-5xl">Choose where your future begins.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Both colleges share the Adeshina standard, but each has its own professional identity, programmes and learning environment.</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {colleges.map((college, index) => {
              const id = college.id as CollegeId;
              const isHealth = id === 'health-technology';
              return (
                <Reveal key={college.id} delay={index * 0.08}>
                  <Link to={collegePath(id)} className="group relative block overflow-hidden rounded-[1.5rem] bg-[#05264c] shadow-[0_25px_60px_-30px_rgba(5,38,76,.55)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={college.heroImage} alt={`${college.name} campus`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#031b32] via-[#031b32]/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-[.2em] ${isHealth ? 'text-emerald-300' : 'text-sky-300'}`}>
                            {isHealth ? 'Health sciences' : 'Educator training'}
                          </span>
                          <h3 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">{college.shortName}</h3>
                          <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">{college.tagline}</p>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#05264c]">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Campus promise */}
      <section className="relative overflow-hidden bg-[#041c36] py-16 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <img src="/images/health-technology/health-campus-2.jpg" alt="Adeshina health technology campus" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041c36] to-transparent" />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">The Share campus</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-.03em] sm:text-5xl">A place to learn seriously.</h2>
            <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">Our campus gives students a focused setting for study, practical work, professional development and community. The goal is simple: leave better prepared than you arrived.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Building2, text: 'Focused campus environment' },
                { icon: Stethoscope, text: 'Health practical learning' },
                { icon: GraduationCap, text: 'Teacher-training practice' },
                { icon: CheckCircle2, text: 'Student support services' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] px-4 py-3 text-sm text-white/75 backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-[#e8c56a]" />
                  {text}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/apply" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#041c36] transition-all hover:-translate-y-0.5 hover:bg-[#e8c56a]">
                Start your application <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Contact the campus
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
