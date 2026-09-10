import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { admissionInfo } from '@/data/admissions';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationFadeUp,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from '@/components/college/education/educationMotion';
import { edBtnGold, edBtnInk } from '@/components/college/education/educationTheme';
import { EducationGeometricBg } from '@/components/college/education/EducationGeometricBg';

const stepIcons = [UserRound, ClipboardCheck, GraduationCap, FileText, ShieldCheck];

const educationFaqs = admissionInfo.faqs.filter(
  (faq) => !faq.question.toLowerCase().includes('jchew')
);

/** College of Education Admissions — guide with decorated 3D cards. */
export function EducationAdmissionsPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const requirement = admissionInfo.requirements.find((r) => r.collegeId === 'education');

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
              Admissions
            </motion.p>
            <motion.h1
              variants={educationSlideIn}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              How to join Adeshina College of Education
            </motion.h1>
            <motion.p
              variants={educationSlideIn}
              className="mt-4 font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Entry requirements, application steps, and what to expect when applying for NCE
              pathways on our Share campus.
            </motion.p>
            <motion.div
              variants={educationSlideIn}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-[#c9a227]" aria-hidden="true" />
              <span className="font-sans text-[13px] font-semibold text-white">
                {admissionInfo.applicationOpen ? 'Applications open' : 'Applications closed'} ·{' '}
                {admissionInfo.session}
              </span>
            </motion.div>
            <motion.div variants={educationSlideIn} className="mt-8">
              <Link to={path('apply')} className={edBtnGold}>
                Start application
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="paper" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={educationSlideIn} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                How to apply
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                Five steps on the online form
              </h2>
            </motion.div>

            <motion.ol
              variants={educationStaggerCards}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              style={{ perspective: 1200 }}
            >
              {admissionInfo.steps.map((step, index) => {
                const Icon = stepIcons[index] ?? FileText;
                return (
                  <motion.li
                    key={step.step}
                    variants={educationCardTilt}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -10,
                            rotateX: 5,
                            scale: 1.02,
                            transition: { type: 'spring', stiffness: 280, damping: 18 },
                          }
                    }
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_0_0_#c9a227,0_16px_28px_-14px_rgba(12,35,64,0.35),0_32px_48px_-28px_rgba(12,35,64,0.4)] ring-1 ring-[#0c2340]/10 transition-[box-shadow] duration-300 hover:shadow-[0_6px_0_0_#3d8fd1,0_20px_36px_-12px_rgba(61,143,209,0.4),0_40px_56px_-24px_rgba(12,35,64,0.45)] sm:p-6"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute -right-4 -top-6 h-20 w-20 rounded-full bg-[#d4ebf8]/80"
                      aria-hidden="true"
                    />
                    <span className="absolute right-3 top-2 font-serif text-5xl font-semibold leading-none text-[#eaf4fb]">
                      {step.step}
                    </span>
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#0c2340] text-[#c9a227] shadow-[0_10px_20px_-10px_rgba(12,35,64,0.6)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative mt-6 font-serif text-lg font-semibold leading-snug text-[#0c2340]">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 flex-1 font-sans text-[13px] leading-relaxed text-[#5a6570]">
                      {step.description}
                    </p>
                  </motion.li>
                );
              })}
            </motion.ol>
          </motion.div>
        </Container>
      </section>

      {/* Requirements */}
      {requirement ? (
        <section
          id="requirements"
          className="relative scroll-mt-28 overflow-hidden border-b border-[#0c2340]/10"
        >
          <EducationGeometricBg tone="mist" />
          <Container size="wide" className="relative py-14 lg:py-16">
            <motion.div
              variants={educationStagger}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={educationSlideIn} className="max-w-2xl">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                  Entry requirements
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                  {requirement.qualification}
                </h2>
              </motion.div>

              <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12" style={{ perspective: 1200 }}>
                <motion.div
                  variants={educationCardTilt}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -8,
                          rotateX: 4,
                          transition: { type: 'spring', stiffness: 280, damping: 18 },
                        }
                  }
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#0c2340,0_18px_32px_-16px_rgba(12,35,64,0.35)] ring-1 ring-[#0c2340]/10 lg:col-span-4 sm:p-7"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#3d8fd1]">
                    Core subject credits
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {requirement.mandatorySubjects.map((subject) => (
                      <li
                        key={subject}
                        className="rounded-xl bg-[#eaf4fb] px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#0c2340] ring-1 ring-[#0c2340]/08"
                      >
                        {subject}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={educationCardTilt}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -8,
                          rotateX: 4,
                          transition: { type: 'spring', stiffness: 280, damping: 18 },
                        }
                  }
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#c9a227,0_18px_32px_-16px_rgba(12,35,64,0.35)] ring-1 ring-[#0c2340]/10 lg:col-span-8 sm:p-7"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#a8861a]">
                    Eligibility
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {requirement.requirements.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-sans text-[15px] leading-relaxed text-[#5a6570]"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3d8fd1]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="paper" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={educationSlideIn} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                Common questions
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                Before you apply
              </h2>
            </motion.div>

            <motion.div
              variants={educationStaggerCards}
              className="mt-10 max-w-3xl space-y-3"
              style={{ perspective: 1000 }}
            >
              {educationFaqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <motion.div
                    key={faq.question}
                    variants={educationCardTilt}
                    className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_0_0_#c9a227,0_14px_28px_-16px_rgba(12,35,64,0.32)] ring-1 ring-[#0c2340]/10"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      aria-expanded={open}
                    >
                      <span className="font-serif text-[16px] font-semibold leading-snug text-[#0c2340]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#3d8fd1] transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-[#0c2340]/08 px-5 pb-5 pt-4 font-sans text-[14px] leading-relaxed text-[#5a6570] sm:px-6">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
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
            <motion.div variants={educationSlideIn} className="lg:col-span-7">
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-[2.15rem]">
                Ready to apply?
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/75">
                Submit your NCE application online, or contact support if you need help with subjects
                or screening.
              </p>
              <p className="mt-3 font-sans text-[13px] text-white/55">
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </p>
            </motion.div>
            <motion.div
              variants={educationFadeUp}
              className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch lg:justify-end"
            >
              <Link to={path('apply')} className={`${edBtnGold} w-full justify-center sm:w-auto`}>
                Apply for admission
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to={path('contact')} className={`${edBtnInk} w-full justify-center sm:w-auto`}>
                Contact support
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
