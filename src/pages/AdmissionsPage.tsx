import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { admissionInfo } from '@/data/admissions';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { Container } from '@/components/common/Container';
import { useOptionalCollege } from '@/context/CollegeContext';
import { HealthAdmissionsPage } from '@/components/college/health/HealthAdmissionsPage';
import { EducationAdmissionsPage } from '@/components/college/education/EducationAdmissionsPage';

const stepIcons = [UserRound, ClipboardCheck, GraduationCap, FileText, ShieldCheck];

export function AdmissionsPage() {
  const collegeContext = useOptionalCollege();
  const college = collegeContext?.college;
  const collegeId = collegeContext?.collegeId;
  const path = collegeContext?.path;
  const isCollegePage = Boolean(college);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (collegeId === 'health-technology') {
    return <HealthAdmissionsPage />;
  }

  if (collegeId === 'education') {
    return <EducationAdmissionsPage />;
  }

  const activeRequirement = collegeId
    ? admissionInfo.requirements.find((item) => item.collegeId === collegeId)
    : null;

  const heroImage = college?.heroImage ?? '/images/campus/campus-life-1.jpg';
  const accent = '#02509e';

  const applyHref = isCollegePage && path ? path('apply') : '/apply';
  const contactHref = isCollegePage && path ? path('contact') : '/contact';
  const homeHref = isCollegePage && path ? path() : '/';

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#05264c]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#05264c] text-white">
        <img
          src={heroImage}
          alt="Adeshina campus"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#031b34]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03172d]/95 via-[#05264c]/80 to-[#05264c]/30" />
        <div className="absolute -right-32 top-10 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-20 top-24 h-56 w-56 rounded-full border border-[#e8c56a]/20" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            {isCollegePage ? (
              <Link
                to={homeHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-semibold backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#05264c]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to College Home
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c56a]/35 bg-[#e8c56a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4d98d]">
                <Sparkles className="h-3.5 w-3.5" />
                Admissions &amp; Enrolment
              </span>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1"
                style={{ backgroundColor: `${accent}22`, color: '#fff', boxShadow: `inset 0 0 0 1px ${accent}55` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                Applications Open · {admissionInfo.session}
              </span>
            </div>

            <h1 className="type-hero mt-6 max-w-4xl text-white">
              {isCollegePage && college
                ? `Begin your journey at ${college.shortName}`
                : 'Your next chapter starts at Adeshina.'}
            </h1>
            <p className="type-body-lg mt-5 max-w-2xl text-white/80">
              {isCollegePage && college
                ? `Explore requirements, application steps and programme guidance for ${college.name}, Share.`
                : admissionInfo.generalNotice}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={applyHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#e8c56a] px-7 py-3.5 text-[13px] font-bold text-[#05264c] shadow-[0_12px_30px_-12px_rgba(232,197,106,0.65)] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Start Application
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#requirements"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-[13px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15"
              >
                View Requirements
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick orientation */}
      <section className="border-b border-slate-200 bg-white">
        <Container size="wide" className="py-7">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Choose your pathway', 'Health Technology or Education ΓÇö start with the college that fits your ambition.'],
              ['02', 'Prepare your credentials', 'Have your O’Level details and supporting documents ready before you begin.'],
              ['03', 'Apply with confidence', 'Complete the form carefully and keep your application reference safe.'],
            ].map(([number, title, text]) => (
              <div key={number} className="flex gap-4 rounded-2xl bg-[#f8fafc] p-5 ring-1 ring-slate-200/80">
                <span className="font-serif text-2xl font-semibold text-[#c68a18]">{number}</span>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[#05264c]">{title}</h2>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How to apply */}
      <section className="py-16 lg:py-20">
        <Container size="wide">
          <div className="max-w-2xl">
            <span className="type-label text-[#c68a18]">The application journey</span>
            <h2 className="type-section mt-3 text-[#05264c]">Five simple steps to get started.</h2>
            <p className="mt-4 type-body text-slate-600">
              We have kept the process clear so you can focus on choosing the right programme and submitting accurate information.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {admissionInfo.steps.map((item, index) => {
              const Icon = stepIcons[index] ?? FileText;
              return (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_18px_45px_-28px_rgba(5,38,76,0.45)] transition-all duration-300 hover:-translate-y-1 hover:ring-[#c68a18]/40"
                >
                  <span className="absolute right-4 top-3 font-serif text-6xl font-semibold leading-none text-slate-100 transition-colors group-hover:text-[#f7edd0]">
                    {item.step}
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#05264c] text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-7 font-serif text-xl font-semibold leading-snug text-[#05264c]">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-600">{item.description}</p>
                </motion.li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* College pathways on group admissions */}
      {!isCollegePage && (
        <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
          <Container size="wide">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="type-label text-[#c68a18]">Choose your college</span>
                <h2 className="type-section mt-3 text-[#05264c]">Two pathways. One Adeshina standard.</h2>
                <p className="mt-4 type-body text-slate-600">Explore the pathway that matches the professional future you want to build.</p>
              </div>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {colleges.map((item) => (
                <Link
                  key={item.id}
                  to={item.slug + '/admissions'}
                  className="group relative min-h-[330px] overflow-hidden rounded-3xl bg-[#05264c]"
                >
                  <img src={item.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03172d] via-[#05264c]/45 to-transparent" />
                  <div className="relative flex min-h-[330px] flex-col justify-end p-7 sm:p-9">
                    <span className="type-label text-white/65">{item.id === 'health-technology' ? 'Healthcare pathway' : 'Education pathway'}</span>
                    <h3 className="mt-2 max-w-md font-serif text-2xl font-semibold text-white sm:text-3xl">{item.shortName}</h3>
                    <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/75">{item.tagline}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#f1d788]">
                      View admissions <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Requirements */}
      <section id="requirements" className="scroll-mt-24 py-16 lg:py-20">
        <Container size="wide">
          <div className="max-w-2xl">
            <span className="type-label text-[#c68a18]">Entry requirements</span>
            <h2 className="type-section mt-3 text-[#05264c]">
              {isCollegePage && college
                ? `What you need for ${college.shortName}`
                : 'Prepare the right credentials.'}
            </h2>
            <p className="mt-4 type-body text-slate-600">
              {isCollegePage
                ? 'Review the current O’Level benchmarks before submitting your application.'
                : 'Requirements vary by college and programme. Start with the pathway you intend to join.'}
            </p>
          </div>

          {isCollegePage && activeRequirement ? (
            <RequirementCard requirement={activeRequirement} accent={accent} />
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {admissionInfo.requirements.map((requirement) => (
                <RequirementCard key={requirement.collegeId} requirement={requirement} accent={requirement.collegeId === 'health-technology' ? '#10a37f' : '#02509e'} compact />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="type-label text-[#c68a18]">Need clarity?</span>
              <h2 className="type-section mt-3 text-[#05264c]">Frequently asked questions.</h2>
              <p className="mt-4 type-body text-slate-600">A few answers before you begin your application.</p>
              <Link to={contactHref} className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#02509e] hover:underline">
                Speak with Admissions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {admissionInfo.faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      aria-expanded={open}
                    >
                      <span className="font-serif text-[16px] font-semibold leading-snug text-[#05264c]">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-[#02509e] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="border-t border-slate-200 px-5 pb-5 pt-4 text-[14px] leading-relaxed text-slate-600 sm:px-6">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#05264c] py-14 text-white lg:py-16">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#07345f] to-[#03182e] px-6 py-9 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
            <div className="relative z-10 max-w-2xl">
              <span className="type-label text-[#e8c56a]">Ready when you are</span>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Take the first step towards your future.</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">Complete your application online or contact the Admissions team if you need help.</p>
              <p className="mt-4 flex items-start gap-2 text-[12px] text-white/55"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e8c56a]" />{siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}</p>
            </div>
            <div className="relative z-10 mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:ml-8 lg:shrink-0">
              <Link to={applyHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#e8c56a] px-7 py-3.5 text-[13px] font-bold text-[#05264c] transition-all hover:-translate-y-0.5 hover:bg-white">
                Apply Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to={contactHref} className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-[#05264c]">
                Contact Admissions
              </Link>
            </div>
            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#e8c56a]/10" />
          </div>
        </Container>
      </section>
    </div>
  );
}

function RequirementCard({ requirement, accent, compact = false }: { requirement: (typeof admissionInfo.requirements)[number]; accent: string; compact?: boolean }) {
  return (
    <div className={`mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(5,38,76,0.5)] sm:p-8 ${compact ? 'mt-0' : ''}`}>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <span className="type-label" style={{ color: accent }}>Qualification</span>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-[#05264c]">{requirement.collegeName}</h3>
        </div>
        <span className="inline-flex shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: accent, backgroundColor: `${accent}14` }}>
          {requirement.qualification}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Core subject credits</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {requirement.mandatorySubjects.map((subject) => (
              <span key={subject} className="rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-2 text-[12px] font-semibold text-[#05264c]">{subject}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Eligibility</h4>
          <ul className="mt-3 space-y-3">
            {requirement.requirements.map((item) => (
              <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-slate-600">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
