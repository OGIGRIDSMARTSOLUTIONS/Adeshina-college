import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80" aria-labelledby="final-cta-heading">
      <Container size="default" className="text-center">
        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
          TAKE THE NEXT STEP
        </span>
        <h2
          id="final-cta-heading"
          className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-navy mb-4"
        >
          Ready to Choose Your Path?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
          Begin your application or discover all programmes offered at Adeshina College of Health Technology and Adeshina College of Education.
        </p>

            {/* Dual Actions side by side */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/apply"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy text-white hover:bg-adeshina-blue active:bg-adeshina-blue-dark font-bold text-sm shadow-md hover:shadow-xl transition-all duration-200"
              >
                Apply Now
              </Link>

              <Link
                to="/programmes"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-navy border border-slate-300 hover:border-adeshina-blue hover:bg-adeshina-blue hover:text-white active:bg-adeshina-blue-dark font-bold text-sm transition-all duration-200 shadow-xs"
              >
                Explore Programmes
              </Link>
            </div>
      </Container>
    </section>
  );
}
