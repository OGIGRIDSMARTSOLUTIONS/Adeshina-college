import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Compass, ShieldCheck, Award, Users, Microscope, CheckCircle2, Landmark } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { useScopedPath } from '@/context/CollegeContext';

export function AboutPage() {
  const { path } = useScopedPath();
  const coreValues = [
    {
      title: 'Practical Competency',
      description: 'Prioritizing hands-on diagnostic laboratory practice, clinical simulations, and real-school teaching practicums over abstract theory.',
      icon: Microscope,
    },
    {
      title: 'Moral Integrity & Discipline',
      description: 'Fostering professional ethics, accountability, and high character benchmarks essential for healthcare practitioners and school educators.',
      icon: ShieldCheck,
    },
    {
      title: 'Community & Regional Impact',
      description: 'Directly addressing workforce shortages in primary healthcare clinics and basic education schools across Kwara State and Nigeria.',
      icon: Users,
    },
    {
      title: 'Academic Rigour',
      description: 'Structured curricula aligned with national vocational and educational regulatory standards for seamless career transition or Direct Entry.',
      icon: Award,
    },
  ];

  const milestones = [
    {
      year: '2011',
      title: 'Foundational Establishment',
      description: 'Adeshina was founded in Share, Kwara State, to create accessible, high-standard tertiary pathways for students seeking careers in education and health technology.',
    },
    {
      year: 'Expansion',
      title: 'Two Specialized Academic Divisions',
      description: 'Integrated the College of Health Technology and the College of Education on one unified, serene campus sharing central administrative infrastructure.',
    },
    {
      year: 'Present',
      title: 'Over 40 Distinct Disciplines',
      description: 'Delivering comprehensive Diploma, NCE, and Certificate training with modern clinical suites, computer laboratories, and extensive clinical postings.',
    },
  ];

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* Light Sky Blue / Navy Page Hero Banner */}
      <section className="bg-[#05264c] text-white py-16 sm:py-20 border-b border-sky-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#052042] via-[#073663]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30 pointer-events-none">
          <img
            src="/images/education/campus-gate.jpg"
            alt="Adeshina Campus Gate in Share"
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        <Container size="wide" className="relative z-20">
          <div className="max-w-3xl">
            {/* Back Breadcrumb */}
            <div className="mb-3">
              <Link
                to={path()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-300" />
                <span>Back to Home</span>
              </Link>
            </div>

            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-sky-300 block mb-2">
              ABOUT THE COLLEGE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              A Centre of Excellence in Healthcare & Educator Development
            </h1>
            <p className="mt-4 text-base sm:text-lg text-sky-100 leading-relaxed max-w-2xl">
              Located in the serene town of Share, Kwara State, Adeshina brings two dedicated institutions together on one campus to forge ethical, highly skilled professionals.
            </p>

            {/* Quick Metrics */}
            <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-white/15 text-xs text-sky-100">
              <div>
                <span className="font-bold text-white text-base block">Est. 2011</span>
                <span>Foundational Legacy</span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="font-bold text-white text-base block">2 Colleges</span>
                <span>Health Tech & Education</span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="font-bold text-white text-base block">40+</span>
                <span>Academic Programmes</span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="font-bold text-white text-base block">Share, Kwara</span>
                <span>Serene Campus</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Institutional Overview & Story */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold block">
                OUR INSTITUTIONAL PURPOSE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy leading-tight">
                Two Distinct Colleges. One Shared Commitment to Service.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Adeshina Group of Colleges was founded on the principle that national progress is driven by two indispensable pillars: <strong className="text-navy font-semibold">quality basic healthcare</strong> and <strong className="text-navy font-semibold">transformative classroom education</strong>.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Situated in Share, Ifelodun Local Government Area of Kwara State, our campus offers a focused, quiet atmosphere free from city distractions. Our students learn in specialized environments tailored to their career callings — from diagnostic pathology labs and dispensing pharmacies to teaching practice suites and digital learning laboratories.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  to={path('programmes')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-dark transition-all shadow-sm"
                >
                  <span>Explore Programmes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={path('admissions')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-navy text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  <span>Admission Guidelines</span>
                </Link>
              </div>
            </div>

            {/* Right Photographic Feature Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-navy shadow-xl border border-slate-200/80">
                <img
                  src="/images/education/campus-gate.jpg"
                  alt="Adeshina Group of Colleges Entrance Arch in Share"
                  className="w-full h-full object-cover object-[center_top]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081426] via-[#081426]/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-wider mb-1">
                    <Landmark className="w-4 h-4" />
                    <span>Main Campus Gate</span>
                  </div>
                  <p className="font-serif font-bold text-sm leading-snug">
                    Layout B, Plot 1, Share-Okeode Road, Beside Ifelodun LG Secretariat, Kwara State.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Statements */}
      <section className="py-20 lg:py-24 bg-[#f4f7fb] border-b border-slate-200/80">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-adeshina-blue flex items-center justify-center mb-6 border border-blue-100">
                  <Compass className="w-6 h-6 text-adeshina-blue" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-accent-gold block mb-2">
                  OUR MISSION
                </span>
                <h3 className="text-2xl font-serif font-bold text-navy mb-4">
                  Empowering Practical Competence & Character
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To provide disciplined, career-focused tertiary education that produces ethically grounded healthcare practitioners and innovative educators equipped to meet contemporary community and national needs.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Dedicated to academic excellence and moral leadership</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0b6b54] flex items-center justify-center mb-6 border border-emerald-100">
                  <Award className="w-6 h-6 text-[#10a37f]" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-accent-gold block mb-2">
                  OUR VISION
                </span>
                <h3 className="text-2xl font-serif font-bold text-navy mb-4">
                  A Benchmark Tertiary Institution in Nigeria
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To be recognized across Nigeria as a premier centre of vocational excellence, distinguished by the practical quality of our graduates, robust laboratory infrastructure, and unwavering standard of discipline.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Standardized vocational and teaching qualifications</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Institutional Values */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy leading-tight">
              Our Core Institutional Values
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              The foundational pillars that guide our faculty, curricula, and student life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-[#f8fafc] p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-adeshina-blue/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                    <h3 className="font-serif font-bold text-navy text-lg mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Institutional Milestones & Story */}
      <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80">
        <Container size="wide">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              HISTORICAL JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy leading-tight">
              Our Path of Growth & Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {milestones.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-adeshina-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-md inline-block mb-4">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Campus Infrastructure & Shared Environment */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#081426] text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl relative z-10">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold">
                CAMPUS ENVIRONMENT IN SHARE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white leading-tight">
                A Disciplined Academic Haven in Kwara State
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our Share campus is purpose-built to combine tranquility with comprehensive educational amenities — including modern science laboratories, micro-teaching suites, a central administrative registry, and student support services.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                  <span>Clinical Practical Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                  <span>Teaching Simulation Suites</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                  <span>Central Registry Support</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10">
              <Link
                to={path('apply')}
                className="px-6 py-3.5 rounded-xl bg-white text-[#081426] hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all text-center"
              >
                Apply for Admission
              </Link>
              <Link
                to={path('contact')}
                className="px-6 py-3.5 rounded-xl bg-adeshina-blue text-white hover:bg-adeshina-blue-dark font-bold text-xs sm:text-sm shadow-md transition-all text-center"
              >
                Visit Our Campus
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
