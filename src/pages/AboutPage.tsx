import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, ShieldCheck, Award, Users, Microscope } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { GroupAbout } from '@/components/group/GroupAbout';
import { HealthAboutPage } from '@/components/college/health/HealthAboutPage';
import { useScopedPath } from '@/context/CollegeContext';

export function AboutPage() {
  const { college: scope, path, isGroup } = useScopedPath();

  // Group of Colleges — Design Direction v1 (college about unchanged below)
  if (isGroup) {
    return <GroupAbout />;
  }

  const collegeId = scope?.collegeId;
  const isHealth = collegeId === 'health-technology';

  if (isHealth) {
    return <HealthAboutPage />;
  }

  const isEducation = collegeId === 'education';
  const accent = '#e8c56a';
  const hoverRingClass = 'hover:ring-[#02509e]/35';

  const trainingFocusItems = isHealth
    ? [
        'Community Health',
        'Laboratory Science',
        'Pharmacy Technology',
        'Environmental Health',
      ]
    : isEducation
      ? [
          'Primary Education',
          'Science & Mathematics',
          'Language Arts',
          'Vocational Education',
        ]
      : null;
  const heroImage = isHealth
    ? '/images/health-technology/health-campus-1.jpg'
    : isEducation
      ? '/images/education/campus-gate.jpg'
      : '/images/education/campus-gate.jpg';

  const heroTitle = isHealth
    ? 'About the College of Health Technology'
    : isEducation
      ? 'About the College of Education'
      : 'About the school';

  const heroSubtitle = isHealth
    ? 'Professional training for Nigeria’s frontline health workforce'
    : isEducation
      ? 'Excellence in teacher training and instructional leadership'
      : 'A centre of excellence in healthcare & educator development';

  const heroDescription = isHealth
    ? 'Based in Share, Kwara State, Adeshina College of Health Technology prepares disciplined, ethically grounded practitioners for community health, clinical support, laboratory science, and related health-technology careers.'
    : isEducation
      ? 'Based in Share, Kwara State, Adeshina College of Education equips future teachers with strong academic foundations, modern pedagogy, and practical classroom experience.'
      : 'Located in Share, Kwara State, Adeshina brings two dedicated institutions together on one campus to forge ethical, highly skilled professionals.';

  const heroStats = isHealth
    ? [
        { value: 'Est. 2011', label: 'Institutional legacy' },
        { value: 'Diploma & Certificate', label: 'Health programmes' },
        { value: 'Clinical focus', label: 'Labs & community posting' },
        { value: 'Share, Kwara', label: 'Dedicated campus setting' },
      ]
    : isEducation
      ? [
          { value: 'Est. 2011', label: 'Institutional legacy' },
          { value: 'NCE pathways', label: 'Teacher education' },
          { value: 'Practicum-led', label: 'Classroom preparation' },
          { value: 'Share, Kwara', label: 'Dedicated campus setting' },
        ]
      : [
          { value: 'Est. 2011', label: 'Foundational legacy' },
          { value: '2 Colleges', label: 'Health Tech & Education' },
          { value: '40+', label: 'Academic programmes' },
          { value: 'Share, Kwara', label: 'Serene campus' },
        ];

  const purposeSubtitle = isHealth
    ? 'Training ethical, practice-ready health professionals.'
    : isEducation
      ? 'Preparing disciplined teachers for Nigerian classrooms.'
      : 'Two distinct colleges. One shared commitment to service.';

  const purposeParagraphs = isHealth
    ? [
        'Adeshina College of Health Technology exists to strengthen Nigeria’s primary healthcare workforce — producing graduates who can serve clinics, communities, and health facilities with competence and character.',
        'On our Share campus in Ifelodun LGA, students train in diagnostic labs, clinical simulation spaces, and supervised community postings. Learning stays practical, disciplined, and focused on workplace readiness across Kwara State and beyond.',
      ]
    : isEducation
      ? [
          'Adeshina College of Education exists to prepare teachers who combine strong subject knowledge with modern pedagogy and professional ethics for Nigerian schools.',
          'On our Share campus in Ifelodun LGA, students develop classroom confidence through micro-teaching suites, instructional technology, and structured teaching practice.',
        ]
      : [
          'Adeshina Group of Colleges was founded on the principle that national progress is driven by two indispensable pillars: quality basic healthcare and transformative classroom education.',
          'Situated in Share, Ifelodun Local Government Area of Kwara State, our campus offers a focused atmosphere free from city distractions. Students learn in specialised environments — from diagnostic labs and pharmacies to teaching practice suites and digital learning laboratories.',
        ];

  const purposeImage = isHealth
    ? '/images/health-technology/health-campus-1.jpg'
    : '/images/campus/campus-life-1.jpg';

  const purposeImageAlt = isHealth
    ? 'Adeshina College of Health Technology campus in Share'
    : isEducation
      ? 'Adeshina College of Education campus in Share'
      : 'Adeshina Group of Colleges campus in Share';

  const missionIntro = isHealth
    ? 'What drives our training, campus culture, and professional standards for health practice.'
    : isEducation
      ? 'What drives our teacher training, campus culture, and professional standards.'
      : 'What drives our teaching, campus culture, and professional standards.';

  const missionCard = isHealth
    ? {
        title: 'Competence with character in health practice',
        body: 'To provide disciplined, career-focused health-technology education that produces ethically grounded practitioners ready for clinics, laboratories, pharmacies, and community health services.',
      }
    : isEducation
      ? {
          title: 'Competence with character in the classroom',
          body: 'To provide disciplined, career-focused teacher education that produces ethically grounded educators equipped for Nigerian schools and instructional leadership.',
        }
      : {
          title: 'Empowering practical competence & character',
          body: 'To provide disciplined, career-focused tertiary education that produces ethically grounded healthcare practitioners and innovative educators equipped to meet contemporary community and national needs.',
        };

  const visionCard = isHealth
    ? {
        title: 'A trusted health-training college in Nigeria',
        body: 'To be recognised for the practical quality of our graduates, strong laboratory and clinical preparation, and a clear standard of discipline in health-technology education.',
      }
    : isEducation
      ? {
          title: 'A trusted teacher-education college in Nigeria',
          body: 'To be recognised for graduate classroom readiness, strong pedagogical training, and a clear standard of discipline in teacher education.',
        }
      : {
          title: 'A benchmark tertiary institution in Nigeria',
          body: 'To be recognised across Nigeria as a premier centre of vocational excellence, distinguished by the practical quality of our graduates, robust laboratory infrastructure, and unwavering standard of discipline.',
        };

  const coreValues = isHealth
    ? [
        {
          title: 'Practical Competency',
          description:
            'Prioritising hands-on laboratory work, clinical simulation, and supervised community postings over abstract theory alone.',
          icon: Microscope,
        },
        {
          title: 'Moral Integrity & Discipline',
          description:
            'Building professional ethics, accountability, and the character expected of health workers who serve patients and communities.',
          icon: ShieldCheck,
        },
        {
          title: 'Community Health Impact',
          description:
            'Addressing workforce needs in primary healthcare clinics and community health services across Kwara State and Nigeria.',
          icon: Users,
        },
        {
          title: 'Academic Rigour',
          description:
            'Structured Diploma and Certificate pathways aligned with professional health-training standards and workplace readiness.',
          icon: Award,
        },
      ]
    : isEducation
      ? [
          {
            title: 'Practical Competency',
            description:
              'Prioritising micro-teaching, instructional practice, and real-school practicums over abstract theory alone.',
            icon: Microscope,
          },
          {
            title: 'Moral Integrity & Discipline',
            description:
              'Fostering professional ethics, accountability, and the character expected of school educators.',
            icon: ShieldCheck,
          },
          {
            title: 'Community & Regional Impact',
            description:
              'Addressing teacher-workforce needs in basic education schools across Kwara State and Nigeria.',
            icon: Users,
          },
          {
            title: 'Academic Rigour',
            description:
              'Structured NCE pathways aligned with educational standards for classroom readiness and further study.',
            icon: Award,
          },
        ]
      : [
          {
            title: 'Practical Competency',
            description:
              'Prioritising hands-on diagnostic laboratory practice, clinical simulations, and real-school teaching practicums over abstract theory.',
            icon: Microscope,
          },
          {
            title: 'Moral Integrity & Discipline',
            description:
              'Fostering professional ethics, accountability, and high character benchmarks essential for healthcare practitioners and school educators.',
            icon: ShieldCheck,
          },
          {
            title: 'Community & Regional Impact',
            description:
              'Directly addressing workforce shortages in primary healthcare clinics and basic education schools across Kwara State and Nigeria.',
            icon: Users,
          },
          {
            title: 'Academic Rigour',
            description:
              'Structured curricula aligned with national vocational and educational regulatory standards for seamless career transition or Direct Entry.',
            icon: Award,
          },
        ];

  const valuesIntro = isHealth
    ? 'The principles that guide our faculty, health programmes, and student life on campus.'
    : isEducation
      ? 'The principles that guide our faculty, teacher-education programmes, and student life.'
      : 'The foundational pillars that guide our faculty, curricula, and student life.';

  const journeySubtitle = isHealth
    ? 'How Health Technology training has grown in Share'
    : isEducation
      ? 'How teacher education has grown in Share'
      : 'Growth & impact';

  const milestones = isHealth
    ? [
        {
          year: '2011',
          title: 'College foundations in Share',
          description:
            'Adeshina College of Health Technology began building accessible, high-standard pathways for students seeking careers in community health and health-technology practice.',
        },
        {
          year: 'Growth',
          title: 'Programmes across key health fields',
          description:
            'Diploma and Certificate pathways expanded across community health, laboratory science, pharmacy technology, environmental health, and related support roles.',
        },
        {
          year: 'Present',
          title: 'Practice-ready training today',
          description:
            'Students learn through clinical suites, diagnostic laboratories, and supervised community postings designed for real workplace readiness.',
        },
      ]
    : isEducation
      ? [
          {
            year: '2011',
            title: 'College foundations in Share',
            description:
              'Adeshina College of Education began building accessible teacher-education pathways for students preparing for Nigerian classrooms.',
          },
          {
            year: 'Growth',
            title: 'NCE pathways across core subjects',
            description:
              'Programmes expanded across primary education, science and mathematics teaching, languages, vocational education, and related fields.',
          },
          {
            year: 'Present',
            title: 'Classroom-ready training today',
            description:
              'Students develop confidence through micro-teaching suites, instructional technology, and structured teaching practice.',
          },
        ]
      : [
          {
            year: '2011',
            title: 'Foundational Establishment',
            description:
              'Adeshina was founded in Share, Kwara State, to create accessible, high-standard tertiary pathways for students seeking careers in education and health technology.',
          },
          {
            year: 'Expansion',
            title: 'Two Specialised Academic Divisions',
            description:
              'Integrated the College of Health Technology and the College of Education on one unified campus sharing central administrative infrastructure.',
          },
          {
            year: 'Present',
            title: 'Over 40 Distinct Disciplines',
            description:
              'Delivering comprehensive Diploma, NCE, and Certificate training with modern clinical suites, computer laboratories, and extensive clinical postings.',
          },
        ];

  const ctaTitle = isHealth
    ? 'Train for a health career on our Share campus'
    : isEducation
      ? 'Train for teaching on our Share campus'
      : 'A disciplined academic haven in Kwara State';

  const ctaBody = isHealth
    ? 'Our Share campus offers a calm setting for focused health training — diagnostic laboratories, clinical practice spaces, supervised community posting support, and student services.'
    : isEducation
      ? 'Our Share campus offers a calm setting for focused teacher training — micro-teaching suites, instructional technology, practicum support, and student services.'
      : 'Our Share campus combines tranquillity with comprehensive amenities — science laboratories, micro-teaching suites, a central registry, and student support services.';

  const ctaHighlights = isHealth
    ? ['Clinical & diagnostic labs', 'Community health postings', 'Student support services']
    : isEducation
      ? ['Teaching simulation suites', 'Practicum preparation', 'Student support services']
      : ['Clinical practical labs', 'Teaching simulation suites', 'Central registry support'];

  return (
    <div className="bg-white min-h-screen">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[#05264c]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/92 via-[#05264c]/70 to-[#05264c]/35" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Link
              to={path()}
              className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#05264c] hover:border-white"
            >
              <ArrowLeft className="w-4 h-4" />
              {isGroup ? 'Back to Home' : 'Back to College Home'}
            </Link>

            <h1 className="mt-6 font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] tracking-[-0.02em] leading-[1.12] text-white">
              {heroTitle}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#e8c56a] leading-snug tracking-[-0.01em]">
              {heroSubtitle}
            </p>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
              {heroDescription}
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/15">
              {heroStats.map((stat) => (
                <div key={stat.value}>
                  <p className="font-serif font-semibold text-xl text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Purpose */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#05264c] tracking-[-0.02em] leading-[1.12]">
                Our purpose
              </h2>
              <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
                {purposeSubtitle}
              </p>
              {purposeParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={`${index === 0 ? 'mt-5' : 'mt-4'} text-base sm:text-lg text-slate-600 leading-relaxed`}
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to={isGroup ? '/#colleges' : path('programmes')}
                  className="inline-flex items-center justify-center rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#02509e]"
                >
                  {isGroup ? 'Explore our colleges' : 'Explore programmes'}
                </Link>
                {!isGroup && (
                  <Link
                    to={path('admissions')}
                    className="inline-flex items-center justify-center rounded-md border border-[#05264c]/30 bg-white px-6 py-3.5 text-[14px] font-semibold text-[#05264c] transition-colors duration-300 hover:border-[#02509e] hover:bg-[#02509e] hover:text-white"
                  >
                    Admission
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_-12px_rgba(5,38,76,0.28)] ring-1 ring-slate-200/90">
                <div className="relative aspect-[16/11] bg-[#041c36]">
                  <img
                    src={purposeImage}
                    alt={purposeImageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#041c36]/55 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <p className="px-5 py-3.5 text-[14px] text-slate-600 leading-relaxed border-t border-slate-100">
                  Layout B, Plot 1, Share-Okeode Road, Beside Ifelodun LG Secretariat, Kwara State.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {trainingFocusItems && (
        <section className="border-b border-slate-200 bg-white">
          <Container size="wide" className="py-10 sm:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: isHealth ? '#0d8f6e' : '#02509e' }}
                >
                  Training focus
                </p>
                <h2 className="mt-2 font-serif font-semibold text-2xl sm:text-3xl text-[#05264c] tracking-[-0.02em] leading-snug">
                  {isHealth
                    ? 'Core areas of health-technology practice'
                    : 'Core areas of teacher preparation'}
                </h2>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingFocusItems.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200/90 bg-[#f8fafc] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    boxShadow: '0 8px 24px -14px rgba(5,38,76,0.18)',
                  }}
                >
                  <span
                    className="mb-3 block h-1 w-8 rounded-full"
                    style={{ backgroundColor: isHealth ? '#10a37f' : '#02509e' }}
                    aria-hidden="true"
                  />
                  <p className="font-serif font-semibold text-lg text-[#05264c] leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <Container size="wide">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#05264c] tracking-[-0.02em] leading-[1.12]">
              Mission & vision
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {missionIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="rounded-lg bg-[#f8fafc] p-8 sm:p-9 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.18)]">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-md bg-[#05264c]"
                style={{ color: accent }}
              >
                <Compass className="w-5 h-5" />
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c68a18]">
                Our mission
              </p>
              <h3 className="mt-3 font-serif font-semibold text-2xl text-[#05264c] leading-snug">
                {missionCard.title}
              </h3>
              <p className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                {missionCard.body}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8fafc] p-8 sm:p-9 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.18)]">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-md bg-[#05264c]"
                style={{ color: accent }}
              >
                <Award className="w-5 h-5" />
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c68a18]">
                Our vision
              </p>
              <h3 className="mt-3 font-serif font-semibold text-2xl text-[#05264c] leading-snug">
                {visionCard.title}
              </h3>
              <p className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                {visionCard.body}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200">
        <Container size="wide">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#05264c] tracking-[-0.02em] leading-[1.12]">
              Our values
            </h2>
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
              Guiding principles
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {valuesIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className={`flex h-full flex-col rounded-lg bg-white p-6 sm:p-7 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-16px_rgba(5,38,76,0.28)] ${hoverRingClass}`}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-md bg-[#05264c]"
                    style={{ color: accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-serif font-semibold text-lg text-[#05264c] leading-snug">
                    {val.title}
                  </h3>
                  <p className="mt-3 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Milestones */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <Container size="wide">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#05264c] tracking-[-0.02em] leading-[1.12]">
              Our journey
            </h2>
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
              {journeySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {milestones.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-lg bg-[#f8fafc] p-6 sm:p-8 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.18)]"
              >
                <span className="inline-flex w-fit rounded-md bg-[#05264c] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  {item.year}
                </span>
                <h3 className="mt-5 font-serif font-semibold text-xl text-[#05264c] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Campus CTA */}
      <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center rounded-lg bg-white p-8 sm:p-10 lg:p-12 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.22)]">
            <div className="lg:col-span-7">
              <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#05264c] tracking-[-0.02em] leading-snug">
                {ctaTitle}
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {ctaBody}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-slate-500">
                {ctaHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
              <Link
                to={isGroup ? '/#colleges' : path('apply')}
                className="inline-flex items-center justify-center rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#02509e]"
              >
                {isGroup ? 'Choose a college to apply' : 'Apply for admission'}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
