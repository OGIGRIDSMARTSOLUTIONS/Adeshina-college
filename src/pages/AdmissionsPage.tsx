import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';
import { admissionInfo } from '@/data/admissions';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { useCollege } from '@/context/CollegeContext';
import { HealthAdmissionsPage } from '@/components/college/health/HealthAdmissionsPage';

export function AdmissionsPage() {
  const { college, collegeId, path } = useCollege();

  if (collegeId === 'health-technology') {
    return <HealthAdmissionsPage />;
  }

  return <EducationAdmissionsPage college={college} path={path} />;
}

function EducationAdmissionsPage({
  college,
  path,
}: {
  college: ReturnType<typeof useCollege>['college'];
  path: ReturnType<typeof useCollege>['path'];
}) {
  const requirement = admissionInfo.requirements.find((r) => r.collegeId === 'education');
  const applyClass = 'bg-[#02509e] hover:bg-[#013a75]';

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[#05264c]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/92 via-[#05264c]/70 to-[#05264c]/35" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Link
              to={path()}
              className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#05264c]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to College Home
            </Link>

            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-md bg-[#02509e]/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ec5e8] ring-1 ring-[#02509e]/40">
                <span className="h-2 w-2 rounded-full bg-[#5ba3e0]" aria-hidden="true" />
                Admissions Open · {admissionInfo.session}
              </span>
            </div>

            <h1 className="type-hero mt-6 text-white">Admissions at {college.shortName}</h1>

            <p className="type-body-lg mt-5 max-w-2xl text-white/85">
              Entry requirements, application steps, and guidance for candidates applying to Adeshina
              College of Education, Share.
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

      <section className="border-b border-slate-200 bg-[#f8fafc] py-14 lg:py-16">
        <Container size="wide">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#05264c] sm:text-4xl">
              How to apply
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              The same five steps you will complete on the online application form.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-5">
            {admissionInfo.steps.map((item) => (
              <li
                key={item.step}
                className="flex min-h-[220px] flex-col rounded-lg bg-white p-6 shadow-[0_10px_28px_-10px_rgba(5,38,76,0.28)] ring-1 ring-slate-200/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(5,38,76,0.34)] hover:ring-[#02509e]/30 sm:p-7"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#05264c] text-[13px] font-semibold text-white">
                  {item.step}
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold leading-snug text-[#05264c]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {requirement ? (
        <section className="border-b border-slate-200 bg-[#f1f5f9] py-14 lg:py-16">
          <Container size="wide">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#05264c] sm:text-4xl">
                Entry requirements
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                O&apos;Level benchmarks for admission into {college.shortName}.
              </p>
            </div>

            <div className="rounded-lg border border-slate-300 bg-white p-7 shadow-[0_14px_36px_-12px_rgba(5,38,76,0.32)] ring-1 ring-slate-200/80 sm:p-9">
              <p className="inline-flex rounded-md bg-[#02509e]/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#02509e] ring-1 ring-[#02509e]/25">
                {requirement.qualification}
              </p>

              <div className="mt-7">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Core subject credits
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-2.5">
                  {requirement.mandatorySubjects.map((subject) => (
                    <li
                      key={subject}
                      className="rounded-md border border-slate-300 bg-[#f8fafc] px-3.5 py-2 text-[13px] font-semibold text-[#05264c] shadow-[0_1px_2px_rgba(5,38,76,0.06)]"
                    >
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-slate-300 pt-7">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Eligibility
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {requirement.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02509e]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-slate-200 bg-[#f8fafc] py-12 lg:py-14">
        <Container size="wide">
          <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)] ring-1 ring-slate-200/90 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#05264c] sm:text-3xl">
                Ready to apply?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Start your online application, or contact Support if you need help with subjects or
                screening.
              </p>
              <p className="mt-3 inline-flex items-start gap-2 text-[13px] text-slate-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#02509e]" />
                <span>
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </span>
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                to={path('apply')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 ${applyClass}`}
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={path('contact')}
                className="inline-flex items-center justify-center rounded-md border border-[#05264c]/30 bg-white px-6 py-3.5 text-[14px] font-semibold text-[#05264c] transition-colors duration-300 hover:border-[#02509e] hover:bg-[#02509e] hover:text-white"
              >
                Support
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
