import { useState, useMemo } from 'react';
import { Search, ArrowRight, Calendar, X, Megaphone } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { NewsArticle } from '@/types/news';
import { Container } from '@/components/common/Container';

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  // Available unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    newsArticles.forEach((a) => set.add(a.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return newsArticles.filter((article) => {
      const matchesCat = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = newsArticles[0];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Deep Navy Page Hero Banner */}
      <section className="bg-[#081426] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081426] via-[#081426]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-20 pointer-events-none">
          <img
            src="/images/education/campus-gate.jpg"
            alt="Adeshina Campus Gate in Share"
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        <Container size="wide" className="relative z-20">
          <div className="max-w-3xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              NEWS, BULLETINS & ANNOUNCEMENTS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Institutional Updates & Campus Notices
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Stay informed on matriculation ceremonies, admissions lists, teaching practice orientations, clinical practical postings, and official campus developments.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-16 z-30 bg-white border-b border-slate-200/90 shadow-xs py-4">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 capitalize ${
                    selectedCategory === cat
                      ? 'bg-navy text-white shadow-xs'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  {cat === 'all' ? 'All Bulletins' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bulletins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <Container size="wide">
          {/* Featured Headline Announcement (only if no active search) */}
          {selectedCategory === 'all' && searchQuery === '' && featuredArticle && (
            <div className="mb-12 bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-navy">
                <img
                  src={featuredArticle.featuredImage || '/images/education/campus-gate.jpg'}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover object-[center_top]"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-gold text-white shadow-sm">
                    Featured Notice
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="font-bold text-adeshina-blue uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.date}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-navy leading-tight mb-3">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-dark transition-all shadow-xs"
                  >
                    <span>Read Full Bulletin</span>
                    <ArrowRight className="w-4 h-4 text-accent-gold" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grid of All News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-adeshina-blue/30 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Category and Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-adeshina-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <time className="text-xs text-slate-400 font-medium">
                      {article.date}
                    </time>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg font-serif font-bold text-navy leading-snug group-hover:text-adeshina-blue transition-colors mb-2.5">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="text-xs font-bold text-navy group-hover:text-adeshina-blue inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Notice</span>
                    <ArrowRight className="w-3.5 h-3.5 text-adeshina-blue group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Bulletin Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-adeshina-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeArticle.date}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy mt-1 leading-snug">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 shrink-0"
                aria-label="Close bulletin"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Content */}
            <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeArticle.content ? (
                <p>{activeArticle.content}</p>
              ) : (
                <p>{activeArticle.summary}</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-accent-gold" />
                <span>Published by Central Senate & Registry, Share Campus</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-lg bg-navy text-white font-bold hover:bg-navy-dark transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
