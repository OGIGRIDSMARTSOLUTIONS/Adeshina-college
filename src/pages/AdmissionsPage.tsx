import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, MapPin, ShieldCheck, ArrowLeft } from 'lucide-react';
import { admissionInfo } from '@/data/admissions';
import { Container } from '@/components/common/Container';
import { useCollege } from '@/context/CollegeContext';

export function AdmissionsPage() {
  const { college, collegeId, path } = useCollege();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredRequirements = admissionInfo.requirements.filter((r) => r.collegeId === collegeId);

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* Light Sky Blue / Navy Page Hero Banner */}
      <section className="bg-[#05264c] text-white py-16 sm:py-20 border-b border-sky-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#052042] via-[#073663]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30 pointer-events-none">
          <img
            src="/images/education/campus-gate.jpg"
            alt="Adeshina Campus Gate"
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        <Container size="wide" className="relative z-20">
          <div className="max-w-3xl">
            {/* Back to Home Breadcrumb */}
            <div className="mb-4">
              <Link
                to={path()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-300" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Session Open Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admissions Open · {admissionInfo.session}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Admissions at Adeshina Group of Colleges
            </h1>

            <p className="mt-4 text-base sm:text-lg text-sky-100 leading-relaxed max-w-2xl">
              Complete entry benchmarks, application workflow, and academic guidelines for candidates applying to Adeshina College of Health Technology and Adeshina College of Education.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to={path('apply')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#052042] text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-sky-500/20 transition-all duration-200"
              >
                <span>Apply Now (Online Form)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#application-steps"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#05264c] text-sm font-bold hover:bg-sky-50 transition-all shadow-md"
              >
                <span>Application Steps</span>
              </a>

              <a
                href="#entry-requirements"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-all"
              >
                <span>Requirements</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* General Admissions Notice Card */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-accent-gold" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-navy text-base sm:text-lg">
                  Official Central Registry Announcement
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  {admissionInfo.generalNotice}
                </p>
              </div>
            </div>

            <Link
              to={path('apply')}
              className="px-6 py-3 rounded-xl bg-adeshina-blue text-white text-xs font-bold hover:bg-navy shrink-0 transition-all shadow-sm"
            >
              Start Application
            </Link>
          </div>
        </Container>
      </section>

      {/* Step-by-Step Application Process */}
      <section id="application-steps" className="py-20 lg:py-24 border-b border-slate-200/80">
        <Container size="wide">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              APPLICATION WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy leading-tight">
              Four Clear Steps to Enrolment
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Follow this structured sequence to apply, verify your credentials, and secure your admission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionInfo.steps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-xl bg-navy text-white font-serif font-black text-lg flex items-center justify-center mb-5 shadow-sm group-hover:bg-adeshina-blue transition-colors">
                    {item.step}
                  </div>

                  <h3 className="font-serif font-bold text-navy text-lg leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.details && (
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic leading-relaxed">
                    {item.details}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to={path('apply')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy text-white hover:bg-adeshina-blue font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Begin Step 1: Online Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Detailed Entry Requirements Matrix */}
      <section id="entry-requirements" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
                ACADEMIC ELIGIBILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy leading-tight">
                General Entry Requirements
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
                O'Level benchmarks required for admission into {college.shortName}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRequirements.map((req) => {
              const isHealth = req.collegeId === 'health-technology';
              return (
                <div
                  key={req.collegeId}
                  className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md ${
                          isHealth
                            ? 'bg-emerald-50 text-[#0b6b54] border border-emerald-200/80'
                            : 'bg-blue-50 text-adeshina-blue border border-blue-200/80'
                        }`}
                      >
                        {req.qualification}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy mb-4">
                      {req.collegeName}
                    </h3>

                    {/* Mandatory subjects */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Core Subject Credits Required
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {req.mandatorySubjects.map((sub, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-200 text-navy"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requirements checklist */}
                    <div className="space-y-3 pt-4 border-t border-slate-200/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Eligibility Criteria
                      </h4>
                      {req.requirements.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isHealth ? 'text-[#10a37f]' : 'text-adeshina-blue'
                            }`}
                          />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer links */}
                  <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <Link
                      to={path()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-adeshina-blue transition-colors"
                    >
                      <span>View Departments</span>
                      <ArrowRight className="w-3.5 h-3.5 text-adeshina-blue" />
                    </Link>

                    <Link
                      to={path('apply')}
                      className="px-4 py-2 rounded-lg bg-adeshina-blue text-white text-xs font-bold hover:bg-navy transition-all shadow-sm"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Admissions FAQ Accordion */}
      <section className="py-20 lg:py-24 border-b border-slate-200/80">
        <Container size="wide">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy leading-tight">
              Admissions Questions & Answers
            </h2>
          </div>

          <div className="max-w-3xl space-y-4">
            {admissionInfo.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-bold text-navy text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-navy" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Campus Physical Registry Desk Callout */}
      <section className="py-16 bg-[#081426] text-white">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold">
                PHYSICAL ENROLLMENT & ASSISTANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Visit the Admissions Registry in Share
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Admissions officers are available at the Share Campus to provide physical admission application forms, O'Level subject consultations, and guided orientation.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400 pt-2">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                <span>Share-Okeode Road, Beside Ifelodun LG Secretariat, Share, Kwara State</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                to={path('apply')}
                className="px-6 py-3.5 rounded-xl bg-adeshina-blue hover:bg-navy font-bold text-xs sm:text-sm shadow-md transition-all text-center"
              >
                Apply Online Now
              </Link>
              <Link
                to={path('contact')}
                className="px-6 py-3.5 rounded-xl bg-white text-[#081426] hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all text-center"
              >
                Contact Admissions Desk
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
