import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-26 bg-[#05264c] text-white relative overflow-hidden border-t border-sky-900/50" aria-labelledby="final-cta-heading">
      {/* Subtle Cyan Grid Watermark Accent */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(56,189,248,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.2) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <Container size="default" className="text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-0.5 bg-sky-400" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-sky-300">
            TAKE THE NEXT STEP
          </span>
          <span className="w-8 h-0.5 bg-sky-400" aria-hidden="true" />
        </div>

        <h2
          id="final-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white mb-4 leading-tight"
        >
          Ready to Choose Your Academic Path?
        </h2>
        <p className="text-sm sm:text-base text-sky-100 max-w-lg mx-auto mb-8 leading-relaxed">
          Begin your application online or discover the comprehensive curriculum across our two colleges in Share.
        </p>

        {/* Dual Actions side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-400 text-[#052042] hover:bg-sky-300 transition-all font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/20"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/programmes"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 text-white border border-white/25 hover:bg-white hover:text-[#052042] font-extrabold text-sm uppercase tracking-wider transition-all shadow-xs backdrop-blur-sm"
          >
            Explore Programmes
          </Link>
        </div>
      </Container>
    </section>
  );
}
