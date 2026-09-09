import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Stethoscope } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';

interface CollegeHeroProps {
  college: College;
}

export function CollegeHero({ college }: CollegeHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHealth = college.id === 'health-technology';

  const headline = isHealth
    ? 'Build your future in health sciences and technology'
    : 'Build your future as a classroom-ready teacher';

  // Prefer campus photography (same treatment as Group homepage hero)
  const heroImage = isHealth
    ? '/images/health-technology/health-campus-1.jpg'
    : '/images/education/campus-gate.jpg';

  return (
    <section
      className="relative overflow-hidden bg-[#05264c] min-h-[min(68vh,620px)] flex items-center"
      aria-label={`${college.name} Introduction`}
    >
      <img
        src={heroImage}
        alt=""
        onLoad={() => setImageLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-center scale-105 transition-opacity duration-700 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Homepage-style colour overlay — photography stays visible */}
      <div className="absolute inset-0 bg-[#05264c]/35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#041c36]/80 via-[#05264c]/50 to-[#05264c]/15"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-5 sm:mb-6">
            <span
              className={`type-label inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isHealth
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/35'
                  : 'bg-sky-500/20 text-sky-200 border border-sky-400/35'
              }`}
            >
              {isHealth ? <Stethoscope className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              <span>{college.name.toUpperCase()}</span>
            </span>
          </div>

          <h1 className="type-hero text-white">
            {headline}
          </h1>

          <p className="type-body-lg mt-6 text-white/85 max-w-xl">
            {college.description}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <Link
              to={`/colleges/${college.id}/apply`}
              className="type-button group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#05264c] px-8 py-3.5 text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.55)] ring-1 ring-[#c68a18]/70 transition-all duration-300 hover:bg-[#041830] hover:ring-[#e8c56a]"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8c56a] to-transparent"
                aria-hidden="true"
              />
              <span>Apply Now</span>
              <ArrowRight className="w-0 h-4 opacity-0 overflow-hidden transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" />
            </Link>
            <a
              href="#programmes-list"
              className="type-button inline-flex items-center justify-center rounded-md border border-white/45 bg-white/10 px-8 py-3.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#05264c] hover:border-white"
            >
              Explore Programmes
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
