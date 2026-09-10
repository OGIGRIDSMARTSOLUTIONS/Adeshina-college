import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import { siteConfig } from '@/data/siteConfig';
import {
  educationCardTilt,
  educationFadeUp,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from '@/components/college/education/educationMotion';
import { edBtnGold, edBtnInk } from '@/components/college/education/educationTheme';
import { EducationGeometricBg } from '@/components/college/education/EducationGeometricBg';

const focusAreas = [
  'Primary Education',
  'Early Childhood',
  'Science & Mathematics',
  'Business Education',
];

const recognitions = [
  {
    shortName: 'NCCE',
    name: 'National Commission for Colleges of Education',
    role: 'Main academic regulator',
    body: 'Sets standards for Colleges of Education and the Nigeria Certificate in Education (NCE) curriculum across the country.',
  },
  {
    shortName: 'TRCN',
    name: 'Teachers Registration Council of Nigeria',
    role: 'Professional council',
    body: 'Guides professional registration and practice standards for teachers after qualification and classroom preparation.',
  },
  {
    shortName: 'NCE pathway',
    name: 'Nigeria Certificate in Education',
    role: 'Qualification framework',
    body: 'Recognised for classroom teaching and for 200-Level Direct Entry into Bachelor of Education programmes in Nigerian universities.',
  },
];

/** College of Education About — story, focus, and teacher-education framework. */
export function EducationAboutPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();

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
              About the college
            </motion.p>
            <motion.h1
              variants={educationSlideIn}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              Adeshina College of Education
            </motion.h1>
            <motion.p
              variants={educationSlideIn}
              className="mt-4 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Based in Share, Kwara State — preparing classroom-ready teachers through strong subject
              foundations, modern pedagogy, and supervised teaching practice.
            </motion.p>
            <motion.div
              variants={educationSlideIn}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link to={path('programmes')} className={edBtnGold}>
                Explore programmes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={path('admissions')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/45 bg-white/10 px-7 py-3.5 font-sans text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
              >
                Admissions
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Purpose + focus */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="paper" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <motion.div variants={educationSlideIn} className="lg:col-span-4">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                  Our purpose
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                  Preparing disciplined teachers for Nigerian classrooms
                </h2>
              </motion.div>
              <motion.div variants={educationFadeUp} className="space-y-4 lg:col-span-7 lg:col-start-6">
                <p className="font-sans text-base leading-relaxed text-[#5a6570]">
                  We equip future teachers who combine strong subject knowledge with modern pedagogy and
                  professional ethics — ready to serve schools across Kwara State and Nigeria.
                </p>
                <p className="font-sans text-base leading-relaxed text-[#5a6570]">
                  As a College of Education in Share, our pathways sit within the national NCE framework —
                  distinct from conventional university degree routes, and focused on classroom practice.
                </p>
                <p className="font-sans text-base leading-relaxed text-[#5a6570]">
                  On campus, students build confidence through micro-teaching suites, instructional
                  technology, and structured teaching practice in partner schools.
                </p>
                <p className="pt-1 font-sans text-[13px] leading-relaxed text-[#0c2340]/65">
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </p>
              </motion.div>
            </div>

            <motion.ul
              variants={educationStaggerCards}
              className="mt-10 grid grid-cols-2 gap-3 border-t border-[#0c2340]/12 pt-8 sm:grid-cols-4 sm:gap-4 [perspective:1200px]"
            >
              {focusAreas.map((area, index) => (
                <motion.li
                  key={area}
                  variants={educationCardTilt}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -10,
                          rotateX: 5,
                          rotateY: index % 2 === 0 ? -4 : 4,
                          scale: 1.02,
                          transition: { type: 'spring', stiffness: 280, damping: 18 },
                        }
                  }
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative overflow-hidden rounded-2xl bg-white/95 p-5 shadow-[0_4px_0_0_#c9a227,0_16px_28px_-14px_rgba(12,35,64,0.35),0_32px_48px_-28px_rgba(12,35,64,0.4)] ring-1 ring-[#0c2340]/10 transition-[box-shadow] duration-300 hover:shadow-[0_6px_0_0_#3d8fd1,0_20px_36px_-12px_rgba(61,143,209,0.4),0_40px_56px_-24px_rgba(12,35,64,0.45)] sm:p-6"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#d4ebf8]/90"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#eaf4fb]/80 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-[#c9a227] to-[#3d8fd1]"
                    aria-hidden="true"
                  />
                  <span className="relative font-serif text-sm tabular-nums text-[#3d8fd1]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="relative mt-3 font-serif text-base font-semibold leading-snug text-[#0c2340] sm:text-lg">
                    {area}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* Framework */}
      <section
        className="relative overflow-hidden border-b border-[#0c2340]/10"
        aria-labelledby="education-framework-heading"
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
                Teacher-education framework
              </p>
              <h2
                id="education-framework-heading"
                className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]"
              >
                The bodies that shape NCE training
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-[#5a6570]">
                National standards guide Colleges of Education, while professional registration supports
                practice after graduation. Together they shape how we prepare classroom-ready teachers.
              </p>
            </motion.div>

            <motion.ul
              variants={educationStaggerCards}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5"
            >
              {recognitions.map((item) => (
                <motion.li
                  key={item.shortName}
                  variants={educationCardTilt}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/90 p-6 shadow-[0_18px_40px_-24px_rgba(12,35,64,0.35),0_4px_0_0_#c9a227] ring-1 ring-[#0c2340]/10"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3d8fd1]/50 to-transparent"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#3d8fd1]">
                    {item.role}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold tracking-[-0.015em] text-[#0c2340]">
                    {item.shortName}
                  </h3>
                  <p className="mt-3 font-sans text-[13px] font-semibold leading-snug text-[#0c2340]/85">
                    {item.name}
                  </p>
                  <p className="mt-2 flex-1 font-sans text-[14px] leading-relaxed text-[#5a6570]">
                    {item.body}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              variants={educationFadeUp}
              className="mt-8 max-w-3xl font-sans text-[13px] leading-relaxed text-[#5a6570]"
            >
              For programme-specific guidance on teaching practice, registration, or Direct Entry routes,
              contact Admissions on the Share campus.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Mission & vision */}
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
                Mission & vision
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                What drives our training
              </h2>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#0c2340]/12 md:grid-cols-2 md:gap-0">
              <motion.div
                variants={educationFadeUp}
                className="border-b border-[#0c2340]/12 py-7 md:border-b-0 md:border-r md:py-9 md:pr-10"
              >
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#c9a227]">
                  Mission
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[#0c2340] sm:text-2xl">
                  Competence with character
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                  Disciplined, career-focused teacher education that produces ethically grounded educators
                  equipped for Nigerian schools and instructional leadership.
                </p>
              </motion.div>
              <motion.div variants={educationFadeUp} className="py-7 md:py-9 md:pl-10">
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#c9a227]">
                  Vision
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[#0c2340] sm:text-2xl">
                  A trusted teacher-education college
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                  Recognised for graduate classroom readiness, strong pedagogical training, and a clear
                  standard of discipline in teacher education.
                </p>
              </motion.div>
            </div>
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
            <motion.div variants={educationSlideIn} className="lg:col-span-8">
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-[2.15rem]">
                Train for teaching on our Share campus
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/75">
                Micro-teaching suites, instructional technology, practicum support, and student services —
                in a calm setting built for focus.
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
              <Link to={path('programmes')} className={`${edBtnInk} w-full justify-center sm:w-auto`}>
                View programmes
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
