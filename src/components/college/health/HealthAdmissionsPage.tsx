import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { admissionInfo } from '@/data/admissions';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from '@/components/college/health/healthMotion';
import { htBtnNavy } from '@/components/college/health/healthTheme';
import { HealthApplyButton } from '@/components/college/health/HealthApplyButton';

const healthFaqs = admissionInfo.faqs.filter(
  (faq) => !faq.question.toLowerCase().includes('nce')
);

/** Health Technology Admissions — short guide. */
export function HealthAdmissionsPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();
  const requirement = admissionInfo.requirements.find(
    (r) => r.collegeId === 'health-technology'
  );

  return (
    <div className="bg-[#f7f3ea] text-[#1a2332]">
      {/* Hero — pulls under floating header */}
      <section className="relative -mt-[5.5rem] overflow-hidden border-b border-[#041c36]/10 bg-[#041c36] sm:-mt-[6rem]">
        <img
          src="/images/health-technology/admissions-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] saturate-[0.92]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/88 to-[#041c36]/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#041c36]/50 via-transparent to-[#041c36]/25"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10 pb-14 pt-[7.5rem] sm:pb-16 sm:pt-[8.25rem] lg:pb-20">
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
              Admissions
            </motion.p>
            <motion.h1
              variants={healthFadeUp}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              How to join Adeshina Health Tech
            </motion.h1>
            <motion.p
              variants={healthFadeUp}
              className="mt-4 font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Entry requirements, application steps, and what to expect when applying to our Share
              campus.
            </motion.p>
            <motion.div
              variants={healthFadeUp}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-[#5ba8d9]" aria-hidden="true" />
              <span className="font-sans text-[13px] font-semibold text-white">
                {admissionInfo.applicationOpen ? 'Applications open' : 'Applications closed'} ·{' '}
                {admissionInfo.session}
              </span>
            </motion.div>
            <motion.div variants={healthFadeUp} className="mt-8">
              <HealthApplyButton to={path('apply')} className="w-full justify-between sm:w-auto">
                Start application
              </HealthApplyButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Steps */}
      <section className="border-b border-[#041c36]/10 bg-white py-12 lg:py-16">
        <Container size="wide">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d8fd1]">
                How to apply
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Five steps on the online form
              </h2>
            </motion.div>

            <ol className="mt-10 border-t border-[#041c36]/12">
              {admissionInfo.steps.map((step) => (
                <motion.li
                  key={step.step}
                  variants={healthFadeUp}
                  className="grid grid-cols-1 gap-2 border-b border-[#041c36]/12 py-6 sm:grid-cols-[4rem_minmax(0,14rem)_1fr] sm:gap-8 sm:py-7"
                >
                  <span className="font-serif text-2xl tabular-nums text-[#3d8fd1]">{step.step}</span>
                  <h3 className="font-serif text-xl font-semibold leading-snug text-[#041c36]">
                    {step.title}
                  </h3>
                  <p className="max-w-xl font-sans text-[15px] leading-relaxed text-[#5c6570] sm:pt-1">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </Container>
      </section>

      {/* Requirements */}
      {requirement ? (
        <section className="border-b border-[#041c36]/10 bg-[#eaf5fc] py-12 lg:py-16">
          <Container size="wide">
            <motion.div
              variants={healthStagger}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={healthFadeUp} className="max-w-2xl">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                  Entry requirements
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                  {requirement.qualification}
                </h2>
              </motion.div>

              <motion.ul
                variants={healthFadeUp}
                className="mt-8 flex flex-wrap gap-2"
              >
                {requirement.mandatorySubjects.map((subject) => (
                  <li
                    key={subject}
                    className="rounded-full bg-white px-3.5 py-2 font-sans text-[13px] font-semibold text-[#041c36] ring-1 ring-[#041c36]/10"
                  >
                    {subject}
                  </li>
                ))}
              </motion.ul>

              <motion.ul variants={healthFadeUp} className="mt-8 max-w-3xl space-y-3">
                {requirement.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-sans text-[15px] leading-relaxed text-[#5c6570]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d8fd1]" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-b border-[#041c36]/10 bg-white py-12 lg:py-16">
        <Container size="wide">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d8fd1]">
                Common questions
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Before you apply
              </h2>
            </motion.div>

            <dl className="mt-10 max-w-3xl divide-y divide-[#041c36]/12 border-t border-[#041c36]/12">
              {healthFaqs.map((faq) => (
                <motion.div key={faq.question} variants={healthFadeUp} className="py-6">
                  <dt className="font-serif text-lg font-semibold text-[#041c36]">{faq.question}</dt>
                  <dd className="mt-2 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                    {faq.answer}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-b border-[#041c36]/10 bg-[#eaf5fc] py-12 lg:py-14">
        <Container size="wide">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            <motion.div variants={healthFadeUp} className="lg:col-span-7">
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Ready to apply?
              </h2>
              <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-[#5c6570]">
                Submit your application online, or contact support if you need help with subjects or
                screening.
              </p>
              <p className="mt-3 font-sans text-[13px] text-[#041c36]/65">
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </p>
            </motion.div>
            <motion.div
              variants={healthFadeUp}
              className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end"
            >
              <HealthApplyButton to={path('apply')} className="w-full justify-between sm:w-auto" />
              <Link to={path('contact')} className={`${htBtnNavy} w-full sm:w-auto`}>
                Contact support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
