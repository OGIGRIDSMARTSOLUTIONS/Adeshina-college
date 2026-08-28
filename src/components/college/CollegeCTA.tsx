import { Link } from 'react-router-dom';
import { Compass, ShieldCheck } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';

interface CollegeCTAProps {
  college: College;
}

export function CollegeCTA({ college }: CollegeCTAProps) {
  return (
    <section className="py-20 lg:py-24 bg-navy text-white relative overflow-hidden" aria-labelledby="college-cta-heading">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-dark pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-adeshina-blue/20 rounded-full blur-3xl pointer-events-none" />

      <Container size="default" className="relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-blue-200 border border-white/15 mb-6 backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5 text-accent-gold" />
          <span>Adeshina Group of Colleges · Share Campus</span>
        </div>

        {/* Heading */}
        <h2
          id="college-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight max-w-2xl mx-auto"
        >
          Begin Your Career at {college.shortName}
        </h2>

        {/* Copy */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Applications for the upcoming academic session are currently open. Join a disciplined, student-focused academic environment dedicated to your future.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/apply"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-navy hover:bg-navy hover:text-white active:bg-navy-dark font-bold text-sm shadow-md hover:shadow-xl transition-all duration-200"
          >
            Apply to {college.shortName}
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent text-white border border-white/30 hover:bg-white/10 font-bold text-sm transition-all"
          >
            Contact Admissions Desk
          </Link>
        </div>

        {/* Assurance */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-accent-gold" />
          <span>Professional Training · Disciplined Academic Environment · Share, Kwara State</span>
        </div>
      </Container>
    </section>
  );
}
