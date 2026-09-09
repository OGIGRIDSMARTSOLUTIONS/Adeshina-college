import {
  CheckCircle2,
  MapPin,
  Microscope,
  Users,
  HeartPulse,
  BookOpen,
  Presentation,
  GraduationCap,
} from 'lucide-react';
import { College } from '@/types/college';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

interface CollegeOverviewProps {
  college: College;
}

export function CollegeOverview({ college }: CollegeOverviewProps) {
  const isHealth = college.id === 'health-technology';

  const healthWhy = [
    {
      title: 'Share campus, focused training',
      description:
        'Study in a calm academic setting in Share, Ifelodun LGA — close to the Local Government Secretariat — built for concentration, character, and practical skill.',
      icon: MapPin,
    },
    {
      title: 'Practice before the workplace',
      description:
        'Laboratory sessions, clinical simulations, and supervised community postings help you move from theory to real health-service environments.',
      icon: Microscope,
    },
    {
      title: 'Pathways into health careers',
      description:
        'Programmes span community health, laboratory science, pharmacy technology, environmental health, health information, and related support roles.',
      icon: HeartPulse,
    },
    {
      title: 'Service to communities',
      description:
        'Graduates are prepared to support primary healthcare delivery and public-health needs across Kwara State and wider Nigeria.',
      icon: Users,
    },
  ];

  const educationWhy = [
    {
      title: 'Share campus, focused training',
      description:
        'Study in a calm academic setting in Share, Ifelodun LGA — close to the Local Government Secretariat — built for concentration, character, and classroom readiness.',
      icon: MapPin,
    },
    {
      title: 'Practice before the classroom',
      description:
        'Micro-teaching clinics, lesson planning workshops, and supervised teaching practice help you move from theory to real school environments.',
      icon: Presentation,
    },
    {
      title: 'NCE pathways into teaching',
      description:
        'Programmes span primary education, early childhood, sciences, languages, social studies, vocational education, and related NCE subject combinations.',
      icon: GraduationCap,
    },
    {
      title: 'Service to schools',
      description:
        'Graduates are prepared to teach with discipline, care, and professional ethics in schools across Kwara State and wider Nigeria.',
      icon: BookOpen,
    },
  ];

  const whyCards = isHealth ? healthWhy : educationWhy;

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200">
      <Container size="wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="type-section-lg text-[#05264c]">
            {isHealth ? 'About Health Technology' : 'About the College of Education'}
          </h2>
          <p className="type-subtitle mt-4 text-[#02509e]">
            {isHealth
              ? 'Training skilled health workers for Nigeria’s frontline services'
              : 'Preparing teachers for Nigerian classrooms with strong subject mastery and practical pedagogy'}
          </p>
          <p className="type-body-lg mt-5 text-slate-600">
            {college.description}
          </p>
          {isHealth ? (
            <p className="type-body-lg mt-4 text-slate-600">
              As part of Adeshina Group of Colleges, the College of Health Technology shares the Share
              campus with the College of Education while keeping a clear professional focus: producing
              disciplined, ethically grounded practitioners who can serve clinics, communities, and
              health facilities with competence.
            </p>
          ) : (
            <p className="type-body-lg mt-4 text-slate-600">
              As part of Adeshina Group of Colleges, the College of Education shares the Share campus
              with the College of Health Technology while keeping a clear professional focus: producing
              disciplined, classroom-ready teachers who can serve primary and junior secondary schools
              with competence and care.
            </p>
          )}
        </div>

        <div className="mb-12 md:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {whyCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg bg-white p-6 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-md bg-[#05264c] ${
                    isHealth ? 'text-[#10a37f]' : 'text-[#e8c56a]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                  <h3 className="type-card-title mt-5 text-[#05264c]">
                    {item.title}
                  </h3>
                  <p className="type-body-sm mt-3 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.015em] text-[#05264c]">
              How we train
            </h3>
            {college.features?.map((feature, idx) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-lg bg-white p-6 sm:p-7 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-serif font-semibold text-sm ${
                    isHealth
                      ? 'bg-emerald-50 text-[#0b6b54]'
                      : 'bg-[#eef5fc] text-[#02509e]'
                  }`}
                >
                  {`0${idx + 1}`}
                </div>
                <div>
                  <h4 className="type-card-title text-[#05264c]">{feature.title}</h4>
                  <p className="type-body-sm mt-2 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-lg bg-white p-7 sm:p-8 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]">
              <p className="type-label text-[#c68a18]">
                Training focus areas
              </p>
              <h3 className="type-card-title mt-3 text-xl text-[#05264c]">
                {isHealth ? 'Core health competencies' : 'Core teaching competencies'}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {college.trainingFoci?.map((focus) => (
                  <li key={focus} className="flex items-start gap-3 text-[15px] text-slate-600">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        isHealth ? 'text-[#10a37f]' : 'text-[#02509e]'
                      }`}
                    />
                    <span className="leading-relaxed">{focus}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-slate-100 pt-5">
                <p className="text-[13px] font-semibold text-[#05264c]">Campus address</p>
                <p className="mt-1.5 text-[14px] text-slate-600 leading-relaxed">
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
