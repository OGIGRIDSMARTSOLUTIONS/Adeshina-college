import { Link } from 'react-router-dom';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';

interface CollegeCTAProps {
  college: College;
}

export function CollegeCTA({ college }: CollegeCTAProps) {
  const isHealth = college.id === 'health-technology';

  return (
    <section
      className="py-20 lg:py-24 bg-[#05264c] text-white relative overflow-hidden"
      aria-labelledby="college-cta-heading"
    >
      <Container size="default" className="relative z-10 text-center">
        <p className="type-meta text-white/60">Adeshina Group of Colleges · Share Campus</p>

        <h2
          id="college-cta-heading"
          className="type-section-lg mt-4 text-white max-w-2xl mx-auto"
        >
          Begin at {college.shortName}
        </h2>

        <p className="type-body-lg mt-5 text-white/75 max-w-xl mx-auto">
          Applications for the upcoming academic session are open. Join a disciplined,
          student-focused environment built for workplace readiness.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to={`/colleges/${college.id}/apply`}
            className={`type-button w-full sm:w-auto inline-flex items-center justify-center rounded-md px-8 py-3.5 text-white transition-colors duration-300 ${
              isHealth
                ? 'bg-[#10a37f] hover:bg-[#0a7a5c]'
                : 'bg-[#02509e] hover:bg-[#013a75]'
            }`}
          >
            Apply Now
          </Link>

          <Link
            to={`/colleges/${college.id}/admissions`}
            className="type-button w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-white/30 bg-white/5 px-8 py-3.5 text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/45"
          >
            Admissions
          </Link>
        </div>

        <p className="mt-12 pt-8 border-t border-white/10 text-[13px] text-white/55">
          Professional training · Disciplined academic environment · Share, Kwara State
        </p>
      </Container>
    </section>
  );
}
