import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import { siteConfig } from '@/data/siteConfig';
import {
  healthCardIn,
  healthFadeUp,
  healthStagger,
} from '@/components/college/health/healthMotion';
import { htBtnSky } from '@/components/college/health/healthTheme';
import { HealthApplyButton } from '@/components/college/health/HealthApplyButton';

const focusAreas = [
  'Community Health',
  'Laboratory Science',
  'Pharmacy Technology',
  'Environmental Health',
];

const recognitions = [
  {
    shortName: 'NBTE',
    name: 'National Board for Technical Education',
    role: 'Main academic regulator',
    body: 'Grants institutional accreditation and standardises National Diploma (ND) and Higher National Diploma (HND) curricula for technical colleges.',
    logo: '/images/accreditations/nbte.svg',
  },
  {
    shortName: 'CHPRBN',
    name: 'Community Health Practitioners Registration Board of Nigeria',
    role: 'Professional council',
    body: 'Oversees licensing and examinations for Community Health Extension Workers (CHEW & JCHEW).',
    logo: '/images/accreditations/chprbn.svg',
  },
  {
    shortName: 'MLSCN',
    name: 'Medical Laboratory Science Council of Nigeria',
    role: 'Professional council',
    body: 'Standardises and accredits Medical Laboratory Technician programmes and related practice pathways.',
    logo: '/images/accreditations/mlscn.svg',
  },
  {
    shortName: 'PCN',
    name: 'Pharmacy Council of Nigeria',
    role: 'Professional council',
    body: 'Regulates training and licensing guidelines for Pharmacy Technician students.',
    logo: '/images/accreditations/pcn.svg',
  },
  {
    shortName: 'HRORBN',
    name: 'Health Records Officers Registration Board of Nigeria',
    role: 'Professional council',
    body: 'Sets parameters for Health Information Management (HIM) certifications and professional practice.',
    logo: '/images/accreditations/hrorbn.svg',
  },
  {
    shortName: 'EHCON',
    name: 'Environmental Health Officers Registration Council of Nigeria',
    role: 'Professional council',
    body: 'Validates curriculum and operational standards for Environmental Health Technologists.',
    logo: '/images/accreditations/ehcon.svg',
  },
];

const CTA_BG =
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2000&q=80';

function SectionGeometry({ variant = 'slate' }: { variant?: 'slate' | 'sky' }) {
  const base = variant === 'sky' ? 'bg-[#e8eef4]' : 'bg-[#dde4ec]';
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className={`absolute inset-0 ${base}`} />
      <div
        className="absolute inset-y-[-8%] right-[-8%] w-[52%] bg-[#041c36]/[0.14]"
        style={{ clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div
        className="absolute inset-y-[-8%] right-[4%] w-[34%] bg-[#3d8fd1]/24"
        style={{ clipPath: 'polygon(38% 0, 100% 0, 78% 100%, 5% 100%)' }}
      />
      <div
        className="absolute left-[-10%] top-[-20%] h-[65%] w-[42%] bg-[#041c36]/[0.1]"
        style={{ clipPath: 'polygon(0 0, 78% 0, 42% 100%, 0 100%)' }}
      />
      <div className="absolute inset-y-[10%] right-[28%] w-[2px] bg-[#041c36]/28" style={{ transform: 'skewX(-12deg)' }} />
      <div className="absolute inset-y-[10%] right-[14%] w-[2px] bg-[#3d8fd1]/50" style={{ transform: 'skewX(-12deg)' }} />
    </div>
  );
}

/** Health Technology About — brief story + recognition framework. */
export function HealthAboutPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-[#e8edf2] text-[#1a2332]">
      <section
        data-college-hero
        className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#041c36] lg:-mt-[6rem]"
      >
        <img
          src="/images/health-technology/health-campus-2.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[48%_35%] saturate-[0.9]"
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
              About the college
            </motion.p>
            <motion.h1
              variants={healthFadeUp}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              Adeshina College of Health Technology
            </motion.h1>
            <motion.p
              variants={healthFadeUp}
              className="mt-4 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Based in Share, Kwara State — training disciplined, ethically grounded practitioners for
              community health, clinical support, laboratory science, and related careers.
            </motion.p>
            <motion.div
              variants={healthFadeUp}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link to={path('programmes')} className={`${htBtnSky} w-full sm:w-auto`}>
                Explore programmes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={path('admissions')}
                className="inline-flex w-full items-center justify-center gap-2 border border-white/45 bg-white/10 px-7 py-3.5 font-sans text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
              >
                Admissions
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#e8eef4] py-12 lg:py-16">
        <SectionGeometry variant="sky" />
        <Container size="wide" className="relative">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <motion.div variants={healthFadeUp} className="lg:col-span-4">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                  Our purpose
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                  Training ethical, practice-ready health professionals
                </h2>
              </motion.div>
              <motion.div variants={healthFadeUp} className="space-y-4 lg:col-span-7 lg:col-start-6">
                <p className="font-sans text-base leading-relaxed text-[#4a5560]">
                  We strengthen Nigeria’s primary healthcare workforce — graduates who serve clinics,
                  communities, and health facilities with competence and character.
                </p>
                <p className="font-sans text-base leading-relaxed text-[#4a5560]">
                  As a College of Health Technology in Share, Kwara State, our operations sit within the
                  national framework for medical, technical, and vocational education — distinct from
                  conventional university pathways.
                </p>
                <p className="font-sans text-base leading-relaxed text-[#4a5560]">
                  On campus, students train in diagnostic labs, clinical simulation spaces, and supervised
                  community postings — practical, disciplined, and workplace-ready.
                </p>
                <p className="pt-1 font-sans text-[13px] leading-relaxed text-[#041c36]/70">
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </p>
              </motion.div>
            </div>

            <motion.ul
              variants={healthStagger}
              className="mt-10 grid grid-cols-2 gap-3 border-t border-[#041c36]/15 pt-8 sm:grid-cols-4 sm:gap-4"
            >
              {focusAreas.map((area, index) => (
                <motion.li
                  key={area}
                  variants={healthCardIn}
                  className="group relative overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12"
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.12] via-transparent to-[#3d8fd1]/[0.1]" />
                    <div
                      className="absolute -right-3 -top-6 h-28 w-28 bg-[#041c36]/[0.14]"
                      style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                    />
                  </div>
                  <span className="absolute inset-y-0 left-0 w-1 bg-[#041c36]" aria-hidden="true" />
                  <div className="relative p-4 pl-5 sm:p-5 sm:pl-6">
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-[#041c36] font-serif text-[12px] font-semibold tabular-nums text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-3 font-serif text-base font-semibold leading-snug text-[#041c36] sm:text-lg">
                      {area}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#dde4ec] py-12 lg:py-16"
        aria-labelledby="health-recognitions-heading"
      >
        <SectionGeometry />
        <Container size="wide" className="relative">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                Accreditations & recognitions
              </p>
              <h2
                id="health-recognitions-heading"
                className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]"
              >
                The bodies that govern health-technology training
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-[#4a5560]">
                Academic standards are set nationally, while professional councils guide programme-specific
                licensing after graduation. Together they shape how Colleges of Health Technology prepare
                students for practice.
              </p>
            </motion.div>

            <motion.ul
              variants={healthStagger}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            >
              {recognitions.map((item) => (
                <motion.li
                  key={item.shortName}
                  variants={healthCardIn}
                  className="group relative flex h-full flex-col overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12 transition-all duration-300 hover:-translate-y-1 hover:ring-[#041c36]/25"
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.12] via-transparent to-[#3d8fd1]/[0.1]" />
                    <div
                      className="absolute -right-4 -top-8 h-40 w-40 bg-[#041c36]/[0.14]"
                      style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                    />
                  </div>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-[#041c36] transition-colors duration-300 group-hover:bg-[#3d8fd1]"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col p-5 pl-6 sm:p-6 sm:pl-7">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.logo}
                        alt=""
                        className="h-14 w-14 shrink-0 bg-white object-contain p-1.5 ring-1 ring-[#041c36]/12"
                      />
                      <div className="min-w-0">
                        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#2a73ad]">
                          {item.role}
                        </p>
                        <h3 className="mt-1 font-serif text-xl font-semibold tracking-[-0.015em] text-[#041c36]">
                          {item.shortName}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 font-sans text-[13px] font-semibold leading-snug text-[#041c36]/85">
                      {item.name}
                    </p>
                    <p className="mt-2 flex-1 font-sans text-[14px] leading-relaxed text-[#4a5560]">
                      {item.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              variants={healthFadeUp}
              className="mt-8 max-w-3xl font-sans text-[13px] leading-relaxed text-[#4a5560]"
            >
              Programme pathways may also sit within Federal and State Ministry of Health approvals and
              JAMB listing for ND admission screening. For a specific department, contact admissions to
              confirm the council that handles its licensing.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#e8eef4] py-12 lg:py-16">
        <SectionGeometry variant="sky" />
        <Container size="wide" className="relative">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                Mission & vision
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                What drives our training
              </h2>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {[
                {
                  label: 'Mission',
                  title: 'Competence with character',
                  body: 'Disciplined, career-focused health-technology education that produces ethically grounded practitioners ready for clinics, laboratories, pharmacies, and community health services.',
                },
                {
                  label: 'Vision',
                  title: 'A trusted health-training college',
                  body: 'Recognised for practical graduate quality, strong laboratory and clinical preparation, and a clear standard of discipline in health-technology education.',
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={healthCardIn}
                  className="group relative overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12"
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.12] via-transparent to-[#3d8fd1]/[0.1]" />
                    <div
                      className="absolute -right-4 -top-8 h-40 w-40 bg-[#041c36]/[0.14]"
                      style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                    />
                  </div>
                  <span className="absolute inset-y-0 left-0 w-1 bg-[#041c36]" aria-hidden="true" />
                  <div className="relative p-6 pl-7 sm:p-8 sm:pl-9">
                    <p className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#2a73ad]">
                      {item.label}
                    </p>
                    <h3 className="mt-3 font-serif text-xl font-semibold text-[#041c36] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#4a5560]">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-[#041c36]/20 bg-[#041c36] py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <img src={CTA_BG} alt="" className="absolute inset-0 h-full w-full object-cover object-[center_35%]" />
          <div className="absolute inset-0 bg-[#041c36]/78" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/88 to-[#041c36]/55" />
        </div>
        <Container size="wide" className="relative">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            <motion.div variants={healthFadeUp} className="lg:col-span-8">
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-[2.15rem]">
                Train for a health career on our Share campus
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/80">
                Labs, clinical practice spaces, community posting support, and student services — in a calm
                setting built for focus.
              </p>
            </motion.div>
            <motion.div variants={healthFadeUp} className="lg:col-span-4 lg:flex lg:justify-end">
              <HealthApplyButton to={path('apply')} className="w-full justify-between sm:w-auto">
                Apply for admission
              </HealthApplyButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
