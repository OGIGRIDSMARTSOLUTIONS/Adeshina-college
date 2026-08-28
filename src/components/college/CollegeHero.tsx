import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Stethoscope, Compass } from 'lucide-react';
import { College } from '@/types/college';
import { Container } from '@/components/common/Container';

interface CollegeHeroProps {
  college: College;
}

export function CollegeHero({ college }: CollegeHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHealth = college.id === 'health-technology';

  const headline = isHealth
    ? 'Build Your Future in Health Sciences and Technology.'
    : 'Shape Tomorrow Through Excellence in Education.';

  const bottomNote = isHealth
    ? 'Join hundreds of students preparing for fulfilling careers in healthcare and community medicine across Nigeria.'
    : 'Join dedicated student teachers mastering instructional pedagogy and classroom leadership at our Share campus.';

  return (
    <section className="relative bg-[#081426] text-white overflow-hidden border-b border-slate-800" aria-label={`${college.name} Introduction`}>
      {/* Right Column Full-Height Photography Background */}
      <div className="absolute right-0 top-0 w-full lg:w-[50%] h-[320px] sm:h-[400px] lg:h-full z-0 overflow-hidden select-none">
        <img
          src={college.heroImage}
          alt={`${college.name} Training & Facilities`}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-[center_top] transition-opacity duration-700 ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Soft Left and Bottom Gradient Fades for seamless blend */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#081426] via-[#081426]/70 via-20% to-transparent to-55%" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#081426] via-[#081426]/75 via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081426] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Main Grid Content Container */}
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] py-12 sm:py-16 lg:py-20">
          {/* Left Column Content (Takes 7 cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-7 max-w-2xl pt-2 sm:pt-4">
            {/* Eyebrow Label */}
            <div className="mb-4 sm:mb-5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-[0.16em] ${
                  isHealth
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                }`}
              >
                {isHealth ? (
                  <Stethoscope className="w-3.5 h-3.5" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5" />
                )}
                <span>{college.name.toUpperCase()}</span>
              </span>
            </div>

            {/* Bold Confident White Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-black tracking-tight text-white leading-[1.12]">
              {headline}
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-[17px] text-slate-300 leading-relaxed max-w-xl font-normal">
              {college.description}
            </p>

            {/* Dual CTA Buttons (Matching Reference Design) */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-adeshina-blue text-white text-sm font-bold shadow-md hover:bg-navy hover:shadow-lg transition-all duration-200"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="#programmes-list"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-[#081426] hover:bg-adeshina-blue hover:text-white active:bg-adeshina-blue-dark text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="w-4 h-4 text-[#081426] group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Bottom Institutional Note */}
            <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-400 max-w-xl">
              <Compass className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">{bottomNote}</p>
            </div>
          </div>

          {/* Right Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
