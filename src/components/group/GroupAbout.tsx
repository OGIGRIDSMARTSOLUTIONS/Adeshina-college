import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

const values = [
  {
    title: 'Practical competency',
    body: 'Hands-on preparation for clinics, laboratories, and Nigerian classrooms — not theory alone.',
  },
  {
    title: 'Integrity & discipline',
    body: 'Professional ethics and character expected of health workers and teachers who serve communities.',
  },
  {
    title: 'Community impact',
    body: 'Training that strengthens primary healthcare and basic education across Kwara State and beyond.',
  },
  {
    title: 'Academic rigour',
    body: 'Structured Diploma, Certificate, and NCE pathways built for workplace readiness and further study.',
  },
];

/** Group of Colleges only — Design Direction v1 */
export function GroupAbout() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/95 via-[#05264c]/75 to-[#05264c]/40" />

        <Container size="wide" className="relative z-10 py-20 sm:py-24 lg:py-28">
          <p className="type-label text-[#e8c56a]">Adeshina Group of Colleges</p>
          <h1 className="type-hero mt-4 max-w-3xl text-white">About the school</h1>
          <p className="type-subtitle mt-5 max-w-2xl text-[#e8c56a]/95">
            One campus. Two pathways. One standard of excellence.
          </p>
          <p className="type-body-lg mt-6 max-w-2xl text-white/85">
            Located in Share, Kwara State, Adeshina brings two dedicated colleges together to prepare
            ethical, skilled professionals for healthcare and education.
          </p>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f9fc] py-20 lg:py-28">
        <Container size="wide">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="type-label text-[#c68a18]">Our purpose</p>
              <h2 className="type-section-lg mt-3 text-[#05264c]">Who we are</h2>
              <p className="type-body-lg mt-6 text-slate-600">
                Adeshina Group of Colleges was founded on the principle that national progress rests on
                two pillars: quality basic healthcare and transformative classroom education.
              </p>
              <p className="type-body-lg mt-4 text-slate-600">
                On our Share campus in Ifelodun LGA, students learn in specialised environments — from
                diagnostic labs to teaching practice — with discipline, character, and career focus.
              </p>
              <p className="type-body mt-6 text-slate-500">
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#041c36] lg:col-span-6">
              <img
                src="/images/campus/campus-life-1.jpg"
                alt="Adeshina Group of Colleges campus in Share"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-white py-20 lg:py-28">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="type-label text-[#c68a18]">Mission & vision</p>
            <h2 className="type-section-lg mt-3 text-[#05264c]">Why it matters</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 border-t border-slate-200 pt-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="type-card-title text-[#05264c]">Mission</h3>
              <p className="type-body-lg mt-4 text-slate-600">
                To provide disciplined, career-focused tertiary education that produces ethically
                grounded healthcare practitioners and educators ready for community and national needs.
              </p>
            </div>
            <div>
              <h3 className="type-card-title text-[#05264c]">Vision</h3>
              <p className="type-body-lg mt-4 text-slate-600">
                To be recognised for the practical quality of our graduates, strong preparation for
                work, and a clear standard of discipline in health technology and teacher education.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f9fc] py-20 lg:py-28">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="type-label text-[#c68a18]">What guides us</p>
            <h2 className="type-section-lg mt-3 text-[#05264c]">Core values</h2>
          </div>
          <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {values.map((item) => (
              <li key={item.title} className="grid grid-cols-1 gap-3 py-7 sm:grid-cols-12 sm:gap-8">
                <h3 className="type-card-title text-[#05264c] sm:col-span-4">{item.title}</h3>
                <p className="type-body text-slate-600 sm:col-span-8">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-white py-20 lg:py-28" aria-label="Our colleges">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="type-label text-[#c68a18]">What we offer</p>
            <h2 className="type-section-lg mt-3 text-[#05264c]">Two colleges</h2>
            <p className="type-body-lg mt-5 text-slate-600">
              Enter the college that matches your calling. Programmes, admissions, and applications
              live inside each college site.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 border border-slate-200 sm:grid-cols-2">
            {colleges.map((college, index) => {
              const id = college.id as CollegeId;
              const isHealth = id === 'health-technology';
              return (
                <Link
                  key={college.id}
                  to={collegePath(id)}
                  className={`group flex items-center justify-between gap-4 px-6 py-8 transition-colors hover:bg-[#f7f9fc] sm:px-8 ${
                    index === 0 ? 'border-b border-slate-200 sm:border-b-0 sm:border-r' : ''
                  }`}
                >
                  <span className="min-w-0 border-l-2 pl-4" style={{ borderColor: isHealth ? '#10a37f' : '#02509e' }}>
                    <span className="type-label text-slate-500">
                      {isHealth ? 'Health sciences' : 'Educator training'}
                    </span>
                    <span className="type-card-title mt-2 block text-[#05264c] transition-colors group-hover:text-[#02509e]">
                      {college.shortName}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#02509e]" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#041c36] py-20 text-white lg:py-24">
        <Container size="wide" className="max-w-2xl">
          <h2 className="type-section text-white">Visit or enquire</h2>
          <p className="type-body-lg mt-5 text-white/75">
            Registry hours: {siteConfig.contact.officeHours}. Call or write when you are ready to take
            the next step.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="type-button inline-flex items-center justify-center bg-white px-6 py-3.5 text-[#041c36] transition-colors hover:bg-slate-100"
            >
              Contact the campus
            </Link>
            <Link
              to="/#colleges"
              className="type-button inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Choose a college
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
