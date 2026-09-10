import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, Clock3, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { newsArticles } from '@/data/news';
import { NewsArticle } from '@/types/news';
import { Container } from '@/components/common/Container';

export function GroupNews() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(newsArticles.map((article) => article.category)));
    return ['all', ...unique];
  }, []);

  const filteredArticles = useMemo(
    () => selectedCategory === 'all'
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory),
    [selectedCategory]
  );

  const featuredArticle = newsArticles[0];
  const secondaryArticles = filteredArticles.filter((article) => article.id !== featuredArticle.id);

  const openArticle = (article: NewsArticle) => {
    setActiveArticle(article);
    navigate(`/news#${article.slug}`, { replace: true });
  };

  const closeArticle = () => {
    setActiveArticle(null);
    navigate('/news', { replace: true });
  };

  useEffect(() => {
    const slug = location.hash.replace(/^#/, '');
    if (!slug) {
      setActiveArticle(null);
      return;
    }
    const match = newsArticles.find((article) => article.slug === slug);
    if (match) setActiveArticle(match);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src={featuredArticle.featuredImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031a32]/95 via-[#05264c]/78 to-[#05264c]/40" />
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#e8c56a]/20" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-semibold backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white hover:text-[#05264c]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Adeshina Group
          </Link>

          <div className="mt-8 max-w-4xl">
            <p className="type-label text-[#e8c56a]">Adeshina Group of Colleges · Share, Kwara State</p>
            <h1 className="type-hero mt-4 text-white sm:text-6xl">News & updates</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
              The official newsroom for academic notices, admissions, campus developments and the moments that shape life at Adeshina.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Official campus updates
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8c56a]/15 px-4 py-2 text-xs text-[#f5d98d] backdrop-blur-sm">
              <Calendar className="h-3.5 w-3.5" />
              2026 / 2027 session
            </div>
          </div>
        </Container>
      </section>

      {/* Featured story */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="type-label text-[#c68a18]">Featured</p>
              <h2 className="type-section mt-2 text-[#05264c]">From the campus</h2>
            </div>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">
              Official newsroom
            </span>
          </div>

          <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] shadow-[0_24px_60px_-30px_rgba(5,38,76,0.38)]">
            <div className="grid lg:grid-cols-[1.25fr_1fr]">
              <button type="button" onClick={() => openArticle(featuredArticle)} className="relative min-h-[300px] overflow-hidden text-left sm:min-h-[380px] lg:min-h-[470px]">
                <img
                  src={featuredArticle.featuredImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/75 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#05264c] backdrop-blur sm:bottom-7 sm:left-7">
                  {featuredArticle.category}
                </span>
              </button>

              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {featuredArticle.date}
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#05264c] sm:text-3xl lg:text-4xl">
                  {featuredArticle.title}
                </h3>
                <p className="mt-5 text-[15px] leading-7 text-slate-600 sm:text-base">
                  {featuredArticle.summary}
                </p>
                <button
                  type="button"
                  onClick={() => openArticle(featuredArticle)}
                  className="group/link mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#05264c] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#02509e]"
                >
                  Read full notice
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Newsroom */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-12 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="type-label text-[#02509e]">Browse the newsroom</p>
              <h2 className="type-section mt-2 text-[#05264c]">Latest announcements</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Find the information you need quickly. Filter by category, then open any notice for the full official message.
              </p>
            </div>

            <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="tablist" aria-label="News categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all ${
                    selectedCategory === category
                      ? 'border-[#05264c] bg-[#05264c] text-white shadow-sm'
                      : 'border-slate-300 bg-white text-[#05264c] hover:border-[#02509e] hover:text-[#02509e]'
                  }`}
                >
                  {category === 'all' ? 'All updates' : category}
                </button>
              ))}
            </div>
          </div>

          {secondaryArticles.length > 0 ? (
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {secondaryArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_35px_-24px_rgba(5,38,76,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-22px_rgba(5,38,76,0.42)] ${
                    index % 2 === 1 ? 'lg:translate-y-4' : ''
                  }`}
                >
                  <button type="button" onClick={() => openArticle(article)} className="relative aspect-[16/10] overflow-hidden text-left">
                    <img
                      src={article.featuredImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/55 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#05264c]">
                      {article.category}
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#05264c] transition-colors group-hover:text-[#02509e]">
                      {article.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.summary}</p>
                    <button
                      type="button"
                      onClick={() => openArticle(article)}
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.08em] text-[#02509e]"
                    >
                      Read notice
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-9 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
              No notices in this category yet.
            </div>
          )}
        </Container>
      </section>

      {/* Editorial reassurance */}
      <section className="bg-white py-12 sm:py-16">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Official', 'Information published here represents official Group communications.'],
              ['Current', 'Admissions, academic and campus notices are presented with their publication dates.'],
              ['Accessible', 'Open a notice directly and share the page with students, families or colleagues.'],
            ].map(([title, text], index) => (
              <div key={title} className={`rounded-2xl border p-6 ${index === 1 ? 'border-[#e8c56a]/60 bg-[#fffaf0]' : 'border-slate-200 bg-[#f8fafc]'}`}>
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#05264c] text-xs font-bold text-[#e8c56a]">
                  0{index + 1}
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#05264c]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {activeArticle && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#041c36]/70 p-4 backdrop-blur-sm"
          onClick={closeArticle}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-dialog-title"
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-25px_rgba(5,38,76,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/7] overflow-hidden bg-[#05264c]">
              <img src={activeArticle.featuredImage} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041c36]/80 to-transparent" />
              <button
                type="button"
                onClick={closeArticle}
                aria-label="Close notice"
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#05264c] shadow-lg transition-transform hover:scale-105"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.08em] text-[#02509e]">
                <span>{activeArticle.category}</span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {activeArticle.date}
                </span>
              </div>
              <h2 id="news-dialog-title" className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#05264c] sm:text-4xl">
                {activeArticle.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-600">{activeArticle.content || activeArticle.summary}</p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Official Adeshina update
                </span>
                <button
                  type="button"
                  onClick={closeArticle}
                  className="inline-flex items-center gap-2 rounded-full bg-[#05264c] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#02509e]"
                >
                  Close notice
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
