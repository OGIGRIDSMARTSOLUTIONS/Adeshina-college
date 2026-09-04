import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, MapPin } from 'lucide-react';
import { Container } from '@/components/common/Container';

const galleryCards = [
  {
    category: 'Health Sciences',
    title: 'Student Common Area & SRC Pavilion',
    subtitle: 'A shaded outdoor meeting space on campus where Health Technology students gather between lectures and activities.',
    image: '/images/health-technology/health-campus-2.jpg',
    icon: Users,
    tagColor: 'bg-emerald-50 text-[#0b6b54] border-emerald-200/80',
  },
  {
    category: 'Educator Training',
    title: 'Modern Instructional & Lecture Suites',
    subtitle: 'Interactive learning spaces designed to nurture pedagogical delivery and classroom leadership.',
    image: '/images/education/campus-gate.jpg',
    icon: BookOpen,
    tagColor: 'bg-blue-50 text-navy border-blue-200/80',
  },
  {
    category: 'Campus Environment',
    title: 'Serene Academic Grounds in Share',
    subtitle: 'A peaceful, disciplined campus setting in Kwara State that fosters intellectual growth and character.',
    image: '/images/campus/campus-life-1.jpg',
    icon: MapPin,
    tagColor: 'bg-amber-50 text-[#8c7b44] border-amber-200/80',
  },
];

export function CampusLife() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="py-20 lg:py-28 bg-[#f0f7ff] border-b border-sky-100" aria-labelledby="campus-life-heading">
      <Container size="wide">
        {/* Centered Editorial Header with Light Blue Accent */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-sky-500" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
              CAMPUS LIFE & FACILITIES
            </span>
            <span className="w-6 h-0.5 bg-sky-500" aria-hidden="true" />
          </div>
          <h2
            id="campus-life-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-[#05264c] leading-tight"
          >
            Learn. Practise. Excel.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
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
                className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#001730] shadow-md hover:shadow-2xl transition-all duration-300 group border border-slate-300 flex flex-col justify-between p-6"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#05264c] via-[#05264c]/50 via-40% to-transparent pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="relative z-10 self-start">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#05264c] shadow-sm border border-white/40 backdrop-blur-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-600" />
                    <span>{card.category}</span>
                  </span>
                </div>

                {/* Bottom Card Copy */}
                <div className="relative z-10 text-white pt-6">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2 leading-snug group-hover:text-sky-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-100 font-normal leading-relaxed line-clamp-3">
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
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#05264c] hover:text-white hover:bg-[#05264c] transition-all py-3.5 px-8 rounded-xl bg-white border border-sky-200 shadow-sm hover:shadow-md"
          >
            <span>Explore Campus Programmes & Requirements</span>
            <ArrowRight className="w-4 h-4 text-sky-500" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
