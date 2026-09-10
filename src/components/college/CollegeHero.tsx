import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';

interface CollegeHeroProps {
  college: College;
}

export function CollegeHero({ college }: CollegeHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHealth = college.id === 'health-technology';

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
      <div className="absolute inset-0 bg-[#05264c]/35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#041c36]/85 via-[#05264c]/55 to-[#05264c]/20"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="type-meta text-white/70">
            Adeshina Group of Colleges · Share, Kwara
          </p>

          <h1 className="type-hero mt-4 text-white">
            {college.shortName}
          </h1>

          <p className="type-body-lg mt-6 text-white/85 max-w-xl">
            {college.tagline}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <Link
              to={`/colleges/${college.id}/apply`}
              className={`type-button group inline-flex items-center justify-center rounded-md px-8 py-3.5 text-white transition-colors duration-300 ${
                isHealth
                  ? 'bg-[#10a37f] hover:bg-[#0a7a5c] shadow-[0_12px_28px_-12px_rgba(16,163,127,0.55)]'
                  : 'bg-[#02509e] hover:bg-[#013a75] shadow-[0_12px_28px_-12px_rgba(2,80,158,0.45)]'
              }`}
            >
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
