import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';

export function AdmissionsCTA() {
  return (
    <section className="py-20 lg:py-24 bg-[#02509e] text-white relative overflow-hidden" aria-labelledby="admissions-cta-heading">
      {/* Subtle Blueprint Grid Pattern Background Matching Reference */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container size="default" className="relative z-10 text-center">
        <h2
          id="admissions-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight"
        >
          Your Future Starts With a Decision.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
          Take the first step towards a rewarding career in healthcare or education. Applications for the upcoming academic session are now open.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-navy hover:bg-navy hover:text-white active:bg-navy-dark font-bold text-sm shadow-md hover:shadow-xl transition-all duration-200"
          >
            <span>Begin Your Application</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
