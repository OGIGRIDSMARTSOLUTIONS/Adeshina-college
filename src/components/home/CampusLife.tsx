import { useState } from 'react';
import { Container } from '@/components/common/Container';

const galleryCards = [
  {
    category: 'Health sciences',
    title: 'Student common area & SRC pavilion',
    subtitle:
      'A shaded outdoor meeting space where Health Technology students gather between lectures and activities.',
    image: '/images/health-technology/health-campus-2.jpg',
  },
  {
    category: 'Educator training',
    title: 'Instructional & lecture suites',
    subtitle:
      'Learning spaces designed for pedagogical delivery, classroom practice, and professional leadership.',
    image: '/images/education/campus-gate.jpg',
  },
  {
    category: 'Campus environment',
    title: 'Academic grounds in Share',
    subtitle:
      'A focused campus setting in Kwara State that supports intellectual growth and character.',
    image: '/images/campus/campus-life-1.jpg',
  },
];

export function CampusLife() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      className="py-20 lg:py-28 bg-white border-b border-slate-200"
      aria-labelledby="campus-life-heading"
    >
      <Container size="full" className="max-w-[96rem] px-3 sm:px-5 lg:px-6">
        <div className="max-w-3xl mb-10 md:mb-12">
          <h2
            id="campus-life-heading"
            className="font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] text-[#05264c] tracking-[-0.02em] leading-[1.12]"
          >
            Campus life
          </h2>
          <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
            Learn. Practise. Excel.
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Laboratories, lecture suites, and a disciplined academic community on one Share campus —
            spaces designed for study, practice, and student life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {galleryCards.map((card) => (
            <article
              key={card.title}
              className="relative min-h-[460px] lg:min-h-[520px] overflow-hidden rounded-lg bg-[#041c36] shadow-[0_8px_24px_-12px_rgba(5,38,76,0.28)] ring-1 ring-slate-200/80"
            >
              <img
                src={card.image}
                alt=""
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [card.title]: true }))}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  loadedImages[card.title] ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#041c36] via-[#041c36]/55 to-[#041c36]/10"
                aria-hidden="true"
              />

              <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-8 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e8c56a]">
                  {card.category}
                </p>
                <h3 className="mt-3 font-serif font-semibold text-xl sm:text-2xl leading-snug tracking-[-0.01em]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#colleges"
            className="inline-flex items-center justify-center rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#02509e]"
          >
            Explore our colleges
          </a>
        </div>
      </Container>
    </section>
  );
}
