import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, BookOpen, MapPin, ShieldCheck } from 'lucide-react';
import { colleges } from '@/data/colleges';
import { newsArticles } from '@/data/news';
import { siteConfig } from '@/data/siteConfig';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { CampusLife } from '@/components/home/CampusLife';
import { Container } from '@/components/common/Container';

const doorMeta: Record<
  CollegeId,
  { eyebrow: string; cta: string; icon: typeof Stethoscope; imageFallback: string }
> = {
  'health-technology': {
    eyebrow: 'College 01 · Health Sciences',
    cta: 'Enter Health Technology',
    icon: Stethoscope,
    imageFallback: '/images/health-technology/health-campus-1.jpg',
  },
  education: {
    eyebrow: 'College 02 · Education Training',
    cta: 'Enter College of Education',
    icon: BookOpen,
    imageFallback: '/images/education/campus-gate.jpg',
  },
};

export function GatewayPage() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const latestNews = newsArticles.slice(0, 3);

  return (
    <div className="relative flex flex-col bg-[#f8fbff]">
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-sky-900/30 bg-[#05264c] min-h-[min(62vh,560px)] flex items-end">
        <img
          src="/images/campus/campus-life-1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05264c] via-[#05264c]/88 to-[#05264c]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05264c] via-transparent to-[#05264c]/40" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-sky-300 mb-4"
          >
            Welcome to Share, Kwara State
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] max-w-3xl"
          >
            {siteConfig.institutionName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg text-sky-100/95 max-w-xl leading-relaxed"
          >
            {siteConfig.tagline}. A disciplined academic home for healthcare technology and teacher
            education — enter either college to explore its full experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#colleges"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#052042] text-sm font-extrabold transition-colors"
            >
              Explore Our Colleges
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-bold transition-colors"
            >
              About the School
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* 2. College doorway */}
      <section
        id="colleges"
        className="relative grid grid-cols-1 md:grid-cols-2 min-h-[min(72vh,640px)] scroll-mt-24"
        aria-label="Enter a college"
      >
        {colleges.map((college, index) => {
          const id = college.id as CollegeId;
          const meta = doorMeta[id];
          const Icon = meta.icon;
          const image = college.heroImage || meta.imageFallback;
          const isHealth = id === 'health-technology';

          return (
            <Link
              key={college.id}
              to={collegePath(id)}
              className={`group relative flex flex-col justify-end min-h-[400px] md:min-h-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-sky-300 ${
                index === 0 ? 'md:border-r md:border-white/20' : ''
              }`}
            >
              <img
                src={image}
                alt=""
                onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  loaded[id] ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div
                className={`absolute inset-0 ${
                  isHealth
                    ? 'bg-gradient-to-t from-[#042f2e] via-[#042f2e]/55 to-black/20'
                    : 'bg-gradient-to-t from-[#05264c] via-[#05264c]/55 to-black/20'
                }`}
              />
              <div className="relative z-10 p-7 sm:p-10 lg:p-12 max-w-xl">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4 border backdrop-blur-sm ${
                    isHealth
                      ? 'bg-emerald-500/25 text-emerald-100 border-emerald-300/35'
                      : 'bg-sky-500/25 text-sky-100 border-sky-300/35'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {meta.eyebrow}
                </span>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-white leading-tight">
                  {college.name}
                </h2>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">{college.tagline}</p>
                <span
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-extrabold ${
                    isHealth ? 'text-emerald-200' : 'text-sky-200'
                  }`}
                >
                  {meta.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* 3. About the Group */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80" aria-labelledby="about-group-heading">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold mb-3">
                About the School
              </p>
              <h2
                id="about-group-heading"
                className="font-serif font-black text-3xl sm:text-4xl text-[#05264c] leading-tight"
              >
                One campus. Two pathways. One standard of excellence.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {siteConfig.shortDescription} Situated in Share, Ifelodun LGA, students train in a
                focused environment dedicated to professional competence and character.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-adeshina-blue hover:text-navy"
              >
                Read our story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#f0f7ff] border border-sky-100">
                <MapPin className="w-5 h-5 text-adeshina-blue mb-3" />
                <h3 className="font-bold text-navy text-sm">Share Campus</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {siteConfig.contact.campusAddress}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f0f7ff] border border-sky-100">
                <ShieldCheck className="w-5 h-5 text-accent-gold mb-3" />
                <h3 className="font-bold text-navy text-sm">Professional Focus</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Health technology and teacher education programmes built for real workplace
                  readiness.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Campus life */}
      <CampusLife />

      {/* 5. Admissions nudge */}
      <section className="py-16 sm:py-20 bg-[#05264c] text-white border-b border-sky-900/40">
        <Container size="wide" className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sky-300 mb-3">
            Admissions
          </p>
          <h2 className="font-serif font-black text-3xl sm:text-4xl leading-tight">
            Ready to begin your application?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-sky-100/90 leading-relaxed">
            Choose the college you want to join — Health Technology or Education — then complete
            the application inside that school’s site.
          </p>
          <a
            href="#colleges"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#052042] text-sm font-extrabold transition-colors"
          >
            Choose a College to Apply
            <ArrowRight className="w-4 h-4" />
          </a>
        </Container>
      </section>

      {/* 6. News teaser */}
      <section className="py-20 lg:py-24 bg-white" aria-labelledby="group-news-heading">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold mb-2">
                News & Updates
              </p>
              <h2
                id="group-news-heading"
                className="font-serif font-black text-3xl sm:text-4xl text-[#05264c]"
              >
                Campus notices
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-adeshina-blue hover:text-navy"
            >
              View all news
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <Link
                key={article.id}
                to={`/news#${article.slug}`}
                className="group p-6 rounded-2xl border border-slate-200/90 bg-[#f8fbff] hover:border-adeshina-blue/30 hover:shadow-md transition-all"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-adeshina-blue">
                  {article.category}
                </span>
                <h3 className="mt-2 font-serif font-bold text-navy text-lg leading-snug group-hover:text-adeshina-blue transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500">{article.date}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
