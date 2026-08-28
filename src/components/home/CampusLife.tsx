import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, BookOpen, MapPin } from 'lucide-react';
import { Container } from '@/components/common/Container';

const galleryCards = [
  {
    category: 'Health Sciences',
    title: 'Diagnostic & Clinical Practical Suites',
    subtitle: 'Modern laboratory benches and clinical simulation equipment for hands-on medical training.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
    icon: Microscope,
    tagColor: 'bg-emerald-50 text-[#0b6b54] border-emerald-200/80',
  },
  {
    category: 'Educator Training',
    title: 'Modern Instructional & Lecture Suites',
    subtitle: 'Interactive learning spaces designed to nurture pedagogical delivery and classroom leadership.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen,
    tagColor: 'bg-blue-50 text-adeshina-blue border-blue-200/80',
  },
  {
    category: 'Campus Environment',
    title: 'Serene Academic Grounds in Share',
    subtitle: 'A peaceful, disciplined campus setting in Kwara State that fosters intellectual growth and character.',
    image: '/images/education/campus-gate.jpg',
    icon: MapPin,
    tagColor: 'bg-amber-50 text-accent-gold border-amber-200/80',
  },
];

export function CampusLife() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200/80" aria-labelledby="campus-life-heading">
      <Container size="wide">
        {/* Centered Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
            CAMPUS LIFE & FACILITIES
          </span>
          <h2
            id="campus-life-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-navy leading-tight"
          >
            Learn. Practise. Excel.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A vibrant, disciplined academic community with specialised laboratories, lecture suites, and dedicated faculty.
          </p>
        </div>

        {/* 3-Column Image Cards with Rounded Corners and Floating Overlay Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {galleryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-navy shadow-md hover:shadow-2xl transition-all duration-300 group border border-slate-200/80 flex flex-col justify-between p-6"
              >
                {/* Background Photography with Zoom Hover */}
                <img
                  src={card.image}
                  alt={card.title}
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [card.title]: true }))}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    loadedImages[card.title] ? 'opacity-90' : 'opacity-60'
                  }`}
                />

                {/* Dark Gradient Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081426] via-[#081426]/50 via-40% to-transparent pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="relative z-10 self-start">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-navy shadow-sm border border-white/40 backdrop-blur-xs`}
                  >
                    <Icon className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{card.category}</span>
                  </span>
                </div>

                {/* Bottom Card Copy */}
                <div className="relative z-10 text-white pt-6">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2 leading-snug group-hover:text-blue-100 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed line-clamp-3">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner linking to Programmes & Admissions */}
        <div className="mt-12 text-center">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-navy hover:text-adeshina-blue transition-colors py-3 px-7 rounded-xl bg-white border border-slate-200/90 hover:border-adeshina-blue shadow-xs"
          >
            <span>Explore Campus Programmes & Requirements</span>
            <ArrowRight className="w-4 h-4 text-adeshina-blue" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
