import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { colleges } from '@/data/colleges';
import { newsArticles } from '@/data/news';
import { siteConfig } from '@/data/siteConfig';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { CampusLife } from '@/components/home/CampusLife';
import { Container } from '@/components/common/Container';

const doorMeta: Record<CollegeId, { imageFallback: string }> = {
  'health-technology': {
    imageFallback: '/images/health-technology/health-campus-1.jpg',
  },
  education: {
    imageFallback: '/images/education/campus-gate.jpg',
  },
};

export function GatewayPage() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const latestNews = newsArticles.slice(0, 3);

  return (
    <div className="relative flex flex-col bg-white">
      {/* 1. Hero — institutional welcome */}
      <section className="relative overflow-hidden bg-[#05264c] min-h-[min(68vh,620px)] flex items-center">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#05264c]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/80 via-[#05264c]/50 to-[#05264c]/15" />

        <Container size="wide" className="relative z-10 py-20 sm:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#e8c56a] mb-5">
              Share, Kwara State · Nigeria
            </p>
            <h1 className="font-serif font-semibold text-[2.35rem] sm:text-5xl lg:text-[3.35rem] tracking-[-0.02em] text-white leading-[1.12]">
              Centre of excellence in health technology and education
            </h1>
            <p className="mt-6 text-[15px] sm:text-lg text-white/85 leading-relaxed max-w-xl font-normal">
              Two specialised colleges on one campus — professional training with discipline,
              character, and career focus.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
              <a
                href="#colleges"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#05264c] px-8 py-3.5 text-[15px] font-semibold tracking-[0.02em] text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.55)] ring-1 ring-[#c68a18]/70 transition-all duration-300 hover:bg-[#041830] hover:ring-[#e8c56a]"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8c56a] to-transparent"
                  aria-hidden="true"
                />
                <span>Explore our colleges</span>
                <ArrowRight className="w-0 h-4 opacity-0 overflow-hidden transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" />
              </a>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md border border-white/45 bg-white/10 px-8 py-3.5 text-[15px] font-semibold tracking-[0.02em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#05264c] hover:border-white"
              >
                About the school
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. College doorway — full section cards */}
      <section
        id="colleges"
        className="relative scroll-mt-28 py-12 md:py-16 bg-[#eef2f7] border-b border-slate-200"
        aria-label="Enter a college"
      >
        <Container size="full" className="max-w-[96rem] px-3 sm:px-5 lg:px-6">
          <div className="mb-8 md:mb-10 max-w-3xl">
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] text-[#05264c] tracking-[-0.02em] leading-[1.12]">
              Our colleges
            </h2>
            <p className="mt-3 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
              Choose your pathway
            </p>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Two specialised colleges on one Share campus. Enter the school that matches your
              calling. Whether you are preparing for healthcare practice or the classroom, each
              college offers focused training, disciplined learning, and a clear path into
              professional life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
            {colleges.map((college) => {
              const id = college.id as CollegeId;
              const meta = doorMeta[id];
              const image = meta.imageFallback;
              const isHealth = id === 'health-technology';
              const accent = isHealth ? '#10a37f' : '#02509e';
              const badge = isHealth
                ? 'College 01 · Health Sciences'
                : 'College 02 · Educator Training';
              const exploreLabel = isHealth ? 'Explore Health Tech' : 'Explore Education';

              return (
                <Link
                  key={college.id}
                  to={collegePath(id)}
                  className={`group relative flex h-full min-h-[620px] lg:min-h-[680px] flex-col overflow-hidden rounded-lg bg-white ring-1 ring-slate-300/80 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-16px_rgba(5,38,76,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02509e] ${
                    isHealth ? 'hover:ring-[#10a37f]/70' : 'hover:ring-[#02509e]/70'
                  }`}
                >
                  <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] shrink-0 overflow-hidden bg-[#041c36]">
                    <img
                      src={image}
                      alt=""
                      onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
                      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                        loaded[id] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#041c36]/45 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute left-5 bottom-5 inline-flex px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white rounded-md"
                      style={{ backgroundColor: accent }}
                    >
                      {badge}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-7 py-7 sm:px-8 sm:py-8 bg-white transition-colors duration-300 group-hover:bg-[#fafcfe]">
                    <h3 className="font-serif font-semibold text-2xl sm:text-[1.75rem] text-[#05264c] leading-snug tracking-[-0.015em] transition-colors duration-300 group-hover:text-[#02509e]">
                      {college.name}
                    </h3>
                    <p className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                      {college.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <span
                        className={`inline-flex items-center justify-center rounded-md px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 ${
                          isHealth
                            ? 'bg-[#10a37f] group-hover:bg-[#0c8a6a]'
                            : 'bg-[#02509e] group-hover:bg-[#013a75]'
                        }`}
                      >
                        {exploreLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. About the Group */}
      <section
        className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200"
        aria-labelledby="about-group-heading"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <h2
                id="about-group-heading"
                className="font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] text-[#05264c] tracking-[-0.02em] leading-[1.12]"
              >
                About the school
              </h2>
              <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
                One campus. Two pathways. One standard of excellence.
              </p>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {siteConfig.shortDescription}
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Situated in Share, Ifelodun LGA, Kwara State, students train in a focused environment
                dedicated to professional competence, discipline, and character — preparing graduates
                for real service in healthcare and education.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#02509e]"
              >
                Read our story
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-lg shadow-[0_8px_24px_-12px_rgba(5,38,76,0.28)] ring-1 ring-slate-200/90 bg-white">
                <div className="relative aspect-[16/11] bg-[#041c36]">
                  <img
                    src="/images/campus/campus-life-1.jpg"
                    alt="Adeshina Group of Colleges campus in Share"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#041c36]/50 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <p className="px-5 py-3 text-[13px] text-slate-500 border-t border-slate-100">
                  Share Campus, Kwara State
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-white ring-1 ring-slate-200/90 px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c68a18]">
                    Share Campus
                  </p>
                  <p className="mt-2.5 text-[14px] text-slate-600 leading-relaxed">
                    {siteConfig.contact.campusAddress}
                  </p>
                </div>
                <div className="rounded-lg bg-white ring-1 ring-slate-200/90 px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#02509e]">
                    Professional focus
                  </p>
                  <p className="mt-2.5 text-[14px] text-slate-600 leading-relaxed">
                    Health technology and teacher education programmes built for workplace readiness.
                  </p>
                </div>
                <div className="rounded-lg bg-white ring-1 ring-slate-200/90 px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#10a37f]">
                    Two pathways
                  </p>
                  <p className="mt-2.5 text-[14px] text-slate-600 leading-relaxed">
                    College of Health Technology and College of Education — one shared campus standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Campus life */}
      <CampusLife />

      {/* 5. Admissions nudge */}
      <section className="py-20 sm:py-24 bg-[#041c36] text-white">
        <Container size="wide" className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#e8c56a] mb-4">
            Admissions
          </p>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl leading-snug tracking-[-0.02em]">
            Ready to begin your application?
          </h2>
          <p className="mt-5 text-[15px] text-white/75 leading-relaxed">
            Choose Health Technology or Education, then complete your application inside that
            college’s site.
          </p>
          <a
            href="#colleges"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-[13px] font-semibold text-[#041c36] bg-white hover:bg-slate-100 transition-colors"
          >
            Choose a college to apply
            <ArrowRight className="w-4 h-4" />
          </a>
        </Container>
      </section>

      {/* 6. News teaser */}
      <section className="py-20 lg:py-28 bg-[#f8fafc]" aria-labelledby="group-news-heading">
        <Container size="full" className="max-w-[96rem] px-3 sm:px-5 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
            <div className="max-w-3xl">
              <h2
                id="group-news-heading"
                className="font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] text-[#05264c] tracking-[-0.02em] leading-[1.12]"
              >
                News & updates
              </h2>
              <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
                Campus notices
              </p>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center justify-center rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#02509e] shrink-0"
            >
              View all news
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {latestNews.map((article) => (
              <Link
                key={article.id}
                to={`/news#${article.slug}`}
                className="group flex h-full flex-col rounded-lg bg-white p-6 sm:p-7 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-16px_rgba(5,38,76,0.3)] hover:ring-[#02509e]/40"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#02509e]">
                  {article.category}
                </span>
                <h3 className="mt-3 font-serif font-semibold text-[#05264c] text-lg sm:text-xl leading-snug transition-colors duration-300 group-hover:text-[#02509e]">
                  {article.title}
                </h3>
                <p className="mt-auto pt-5 text-sm text-slate-500">{article.date}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
