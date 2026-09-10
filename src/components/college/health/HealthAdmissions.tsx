import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { College } from '@/types/college';
import { admissionInfo } from '@/data/admissions';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from './healthMotion';

interface HealthAdmissionsProps {
  college: College;
}

export function HealthAdmissions({ college }: HealthAdmissionsProps) {
  const reduceMotion = useReducedMotion();
  const requirement = admissionInfo.requirements.find((r) => r.collegeId === college.id);
  const steps = admissionInfo.steps.slice(0, 3);

  return (
    <section
      className="border-b border-[#041c36]/10 bg-white py-16 lg:py-20"
      aria-labelledby="health-admissions-heading"
    >
      <Container size="wide">
        <motion.div
          variants={healthStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16"
        >
          <motion.div variants={healthFadeUp} className="lg:col-span-5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f7a5f]">
              Admissions
            </p>
            <h2
              id="health-admissions-heading"
              className="mt-4 font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#041c36] sm:text-4xl"
            >
              Your path to Adeshina
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-[#5c6570] sm:text-lg">
              Know the session, the entry bar, and the next action — then apply with confidence.
            </p>

            <div className="mt-8 rounded-md bg-[#eaf5fc] p-5 ring-1 ring-[#3d8fd1]/25">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d8fd1]">
                {admissionInfo.applicationOpen ? 'Applications open' : 'Applications closed'}
              </p>
              <p className="mt-2 font-serif text-lg leading-snug text-[#041c36]">
                {admissionInfo.session}
              </p>
            </div>

            {requirement && (
              <div className="mt-8">
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5c6570]">
                  {requirement.qualification}
                </p>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                  {requirement.requirements[0]}
                </p>
                <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#041c36]/70">
                  Core subjects: {requirement.mandatorySubjects.join(' · ')}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/colleges/${college.id}/apply`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white bg-[#eaf5fc] px-6 py-3.5 font-sans text-[14px] font-bold text-[#041c36] shadow-[0_12px_28px_-12px_rgba(61,143,209,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#d6ecf8]"
              >
                Start application
              </Link>
              <Link
                to={`/colleges/${college.id}/admissions`}
                className="inline-flex items-center justify-center rounded-2xl border border-[#041c36]/15 bg-white px-6 py-3.5 font-sans text-[14px] font-semibold text-[#041c36] transition-all hover:-translate-y-0.5 hover:border-[#3d8fd1] hover:text-[#2a73ad]"
              >
                Full admissions guide
              </Link>
            </div>
          </motion.div>

          <motion.div variants={healthFadeUp} className="lg:col-span-6 lg:col-start-7">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5c6570]">
              How applying works
            </p>
            <ol className="mt-6 space-y-3">
              {steps.map((step) => (
                <li
                  key={step.step}
                  className="grid grid-cols-[3rem_1fr] gap-4 rounded-md bg-[#f7f3ea] p-4 ring-1 ring-[#041c36]/6 sm:gap-5 sm:p-5"
                >
                  <span className="font-serif text-base tabular-nums text-[#10a37f]">{step.step}</span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold tracking-[-0.015em] text-[#041c36]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-[#5c6570]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
