import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';

export function AdmissionsCTA() {
  return (
    <section className="py-20 lg:py-24 bg-[#05264c] text-white relative overflow-hidden border-b border-sky-900/50" aria-labelledby="admissions-cta-heading">
      {/* Subtle Cyan Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(56,189,248,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.25) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <Container size="default" className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-0.5 bg-sky-400" aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-300">
            2024/2025 ADMISSIONS IN PROGRESS
          </span>
          <span className="w-8 h-0.5 bg-sky-400" aria-hidden="true" />
        </div>

        <h2
          id="admissions-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight"
        >
          Your Future Starts With a Decision.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-sky-100 max-w-xl mx-auto leading-relaxed">
          Take the first step towards a rewarding career in healthcare or education. Applications for the upcoming academic session are now open online and on campus.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-400 text-[#052042] hover:bg-sky-300 transition-all font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/20"
          >
            <span>Begin Your Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-white hover:text-[#052042] border border-white/20 font-extrabold text-sm uppercase tracking-wider transition-all backdrop-blur-sm"
          >
            <span>View Entry Requirements</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
