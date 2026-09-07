import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, X } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { NewsArticle } from '@/types/news';
import { Container } from '@/components/common/Container';
import { useScopedPath } from '@/context/CollegeContext';

export function NewsPage() {
  const { college, path, isGroup } = useScopedPath();
  const collegeId = college?.collegeId;
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const collegeArticles = useMemo(
    () =>
      collegeId
        ? newsArticles.filter((a) => !a.collegeId || a.collegeId === collegeId)
        : newsArticles,
    [collegeId]
  );

  const newsBase = path('news');

  const openArticle = (article: NewsArticle) => {
    setActiveArticle(article);
    if (location.hash !== `#${article.slug}`) {
      navigate(`${newsBase}#${article.slug}`, { replace: true });
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (location.hash) {
      navigate(newsBase, { replace: true });
    }
  };

  useEffect(() => {
    const slug = location.hash.replace(/^#/, '');
    if (!slug) {
      setActiveArticle(null);
      return;
    }
    const match = collegeArticles.find((a) => a.slug === slug);
    if (match) {
      setActiveArticle(match);
    }
  }, [location.hash, collegeArticles]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    collegeArticles.forEach((a) => set.add(a.category));
    return ['all', ...Array.from(set)];
  }, [collegeArticles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return collegeArticles;
    return collegeArticles.filter((article) => article.category === selectedCategory);
  }, [collegeArticles, selectedCategory]);

  const isHealth = collegeId === 'health-technology';
  const heroImage = isHealth
    ? '/images/health-technology/health-campus-1.jpg'
    : '/images/education/campus-gate.jpg';

  return (
    <div className="bg-white min-h-screen">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[#05264c]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/92 via-[#05264c]/70 to-[#05264c]/35" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Link
              to={path()}
              className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#05264c] hover:border-white"
            >
              <ArrowLeft className="w-4 h-4" />
              {isGroup ? 'Back to Home' : 'Back to College Home'}
            </Link>

            <h1 className="mt-6 font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] tracking-[-0.02em] leading-[1.12] text-white">
              News & updates
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#e8c56a] leading-snug tracking-[-0.01em]">
              {isHealth
                ? 'Health Technology campus notices'
                : isGroup
                  ? 'Campus notices'
                  : 'College of Education campus notices'}
            </p>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
              {isHealth
                ? 'Admissions lists, clinical postings, matriculation, and official updates from Adeshina College of Health Technology, Share.'
                : isGroup
                  ? 'Stay informed on matriculation, admissions lists, and official campus developments.'
                  : 'Admissions lists, teaching practice notices, matriculation, and official updates from Adeshina College of Education, Share.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Notices */}
      <section className="py-12 sm:py-14 bg-[#f8fafc] border-b border-slate-200">
        <Container size="wide">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-md border px-4 py-2.5 text-[13px] font-semibold capitalize transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'border-[#05264c] bg-[#05264c] text-white'
                    : 'border-slate-300 bg-white text-[#05264c] hover:border-[#02509e] hover:text-[#02509e]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-[0_10px_28px_-12px_rgba(5,38,76,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(5,38,76,0.34)]"
              >
                <div className="relative aspect-[16/10] bg-[#041c36]">
                  <img
                    src={
                      article.featuredImage ||
                      (isHealth
                        ? '/images/health-technology/health-campus-1.jpg'
                        : '/images/education/campus-gate.jpg')
                    }
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
                    <span
                      className={`font-semibold uppercase tracking-[0.08em] ${
                        isHealth ? 'text-[#0a7a5c]' : 'text-[#02509e]'
                      }`}
                    >
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif font-semibold text-xl text-[#05264c] leading-snug">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-[14px] text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => openArticle(article)}
                    className={`mt-auto pt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors ${
                      isHealth
                        ? 'text-[#0a7a5c] hover:text-[#05264c]'
                        : 'text-[#02509e] hover:text-[#05264c]'
                    }`}
                  >
                    Read notice
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}

            {filteredArticles.length === 0 && (
              <p className="md:col-span-2 lg:col-span-3 rounded-lg border border-slate-200 bg-white px-5 py-8 text-center text-[15px] text-slate-500">
                No notices in this category yet.
              </p>
            )}
          </div>
        </Container>
      </section>

      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#041c36]/65 p-4 backdrop-blur-sm"
          onClick={closeArticle}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(5,38,76,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[#02509e]">
                    {activeArticle.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.date}</span>
                </div>
                <h3 className="mt-2 font-serif font-semibold text-2xl text-[#05264c] leading-snug">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeArticle}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#05264c]"
                aria-label="Close notice"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="py-6 text-[15px] text-slate-600 leading-relaxed">
              {activeArticle.content || activeArticle.summary}
            </p>

            <div className="border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={closeArticle}
                className="inline-flex items-center justify-center rounded-md bg-[#05264c] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#02509e]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
