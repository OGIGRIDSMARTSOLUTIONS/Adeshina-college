import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { colleges } from '@/data/colleges';
import { newsArticles } from '@/data/news';
import { siteConfig } from '@/data/siteConfig';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { CampusLife } from '@/components/home/CampusLife';
import { Container } from '@/components/common/Container';

const joinSteps = [
  {
    n: '01',
    title: 'Choose your college',
    body: 'Health Technology or Education — enter the pathway that matches your calling.',
  },
  {
    n: '02',
    title: 'Explore programmes',
    body: 'Review courses, entry requirements, and admissions guidance inside that college.',
  },
  {
    n: '03',
    title: 'Apply',
    body: 'Complete your application from the college site when you are ready to begin.',
  },
];

export function GatewayPage() {
  const latestNews = newsArticles.slice(0, 3);

  return (
    <div className="relative flex flex-col bg-white">
      {/* Hero — Option A: Editorial split (refined) */}
      <section
        id="colleges"
        className="scroll-mt-24 bg-[#041c36]"
        aria-label="Adeshina Group of Colleges"
      >
        <div className="grid min-h-[min(88vh,840px)] grid-cols-1 lg:grid-cols-2">
          {/* Brand + pathways */}
          <div className="relative flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-14 xl:px-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="type-label text-[#e8c56a]">Share, Kwara State · Nigeria</p>
              <h1 className="mt-5 font-serif text-[2.55rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem]">
                Adeshina Group of Colleges
              </h1>
              <p className="mt-5 font-sans text-lg leading-relaxed text-white/75 sm:text-xl">
                Two colleges. One institution.
              </p>
              <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-white/60 sm:text-base">
                Professional pathways into health technology and teaching — on one Share campus.
              </p>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-12 space-y-0 border-t border-white/15"
              aria-label="Choose your college"
            >
              {colleges.map((college) => {
                const id = college.id as CollegeId;
                const isHealth = id === 'health-technology';
                const accent = isHealth ? '#10a37f' : '#5ba3e0';

                return (
                  <Link
                    key={college.id}
                    to={collegePath(id)}
                    className="group flex items-center justify-between gap-4 border-b border-white/15 py-5 transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-6"
                  >
                    <span className="min-w-0">
                      <span className="type-label block" style={{ color: accent }}>
                        {isHealth ? 'Health sciences' : 'Educator training'}
                      </span>
                      <span className="mt-1.5 block font-serif text-xl font-semibold tracking-[-0.02em] text-white sm:text-[1.35rem]">
                        {isHealth ? 'College of Health Technology' : 'College of Education'}
                      </span>
                    </span>
                    <span
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: accent }}
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </motion.nav>
          </div>

          {/* Framed campus photographs — fill panel height */}
          <div className="relative min-h-[440px] sm:min-h-[520px] lg:min-h-full">
            <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4">
              {colleges.map((college, index) => {
                const id = college.id as CollegeId;
                const isHealth = id === 'health-technology';
                const image = isHealth
                  ? '/images/health-technology/health-campus-1.jpg'
                  : '/images/education/campus-gate.jpg';

                return (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
                    className="relative h-full min-h-0 overflow-hidden"
                  >
                    <Link
                      to={collegePath(id)}
                      className="group absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                    >
                      <img
                        src={image}
                        alt={
                          isHealth
                            ? 'Adeshina College of Health Technology campus'
                            : 'Adeshina College of Education campus gate'
                        }
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/85 via-[#041c36]/10 to-transparent" />
                      <span className="absolute bottom-4 left-4 right-4 font-serif text-sm font-semibold leading-snug text-white sm:text-base lg:text-lg">
                        {isHealth ? 'Health Technology' : 'Education'}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section
        className="border-b border-slate-200 bg-[#f7f9fc] py-20 lg:py-28"
        aria-labelledby="about-group-heading"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="type-label text-[#c68a18]">The institution</p>
              <h2 id="about-group-heading" className="type-section-lg mt-3 text-[#05264c]">
                About the school
              </h2>
              <p className="type-body-lg mt-6 text-slate-600">{siteConfig.shortDescription}</p>
              <p className="type-body-lg mt-4 text-slate-600">
                On one Share campus in Kwara State, students train with discipline, character, and a
                clear path into professional life.
              </p>
              <Link
                to="/about"
                className="type-button mt-9 inline-flex items-center gap-2 text-[#02509e] transition-colors hover:text-[#05264c]"
              >
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#041c36] lg:col-span-7">
              <img
                src="/images/campus/campus-life-1.jpg"
                alt="Adeshina Group of Colleges campus in Share"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* B — How to join */}
      <section
        className="border-b border-slate-200 bg-white py-20 lg:py-24"
        aria-labelledby="how-to-join-heading"
      >
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="type-label text-[#c68a18]">Next steps</p>
            <h2 id="how-to-join-heading" className="type-section-lg mt-3 text-[#05264c]">
              How to join
            </h2>
            <p className="type-body-lg mt-4 text-slate-600">
              One simple path — choose a college, then apply from inside that college’s site.
            </p>
          </div>

          <ol className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {joinSteps.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-8"
              >
                <span className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#02509e] sm:col-span-2">
                  {step.n}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="type-card-title text-[#05264c]">{step.title}</h3>
                  <p className="type-body mt-2 max-w-2xl text-slate-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href="#colleges"
            className="type-button mt-10 inline-flex items-center gap-2 bg-[#05264c] px-6 py-3.5 text-white transition-colors hover:bg-[#02509e]"
          >
            Choose a college
            <ArrowRight className="h-4 w-4" />
          </a>
        </Container>
      </section>

      <CampusLife />

      <section className="bg-[#f7f9fc] py-20 lg:py-24" aria-labelledby="group-news-heading">
        <Container size="wide">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
            <div>
              <h2 id="group-news-heading" className="type-section-lg text-[#05264c]">
                News & updates
              </h2>
              <p className="type-body mt-3 text-slate-600">Campus notices for students and families.</p>
            </div>
            <Link
              to="/news"
              className="type-button inline-flex items-center gap-2 text-[#02509e] transition-colors hover:text-[#05264c]"
            >
              View all news
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="bg-white">
            {latestNews.map((article) => (
              <li key={article.id} className="border-b border-slate-100 last:border-0">
                <Link
                  to={`/news#${article.slug}`}
                  className="group flex flex-col gap-2 px-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <div className="min-w-0">
                    <span className="type-label text-[#02509e]">{article.category}</span>
                    <h3 className="type-card-title mt-2 text-[#05264c] transition-colors group-hover:text-[#02509e]">
                      {article.title}
                    </h3>
                  </div>
                  <time className="type-body-sm shrink-0 text-slate-500">{article.date}</time>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
