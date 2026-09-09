import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { NewsArticle } from '@/types/news';
import { Container } from '@/components/common/Container';

/** Group of Colleges news — Design Direction v1 (quiet list, not card grid) */
export function GroupNews() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    newsArticles.forEach((a) => set.add(a.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return newsArticles;
    return newsArticles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  const openArticle = (article: NewsArticle) => {
    setActiveArticle(article);
    if (location.hash !== `#${article.slug}`) {
      navigate(`/news#${article.slug}`, { replace: true });
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (location.hash) {
      navigate('/news', { replace: true });
    }
  };

  useEffect(() => {
    const slug = location.hash.replace(/^#/, '');
    if (!slug) {
      setActiveArticle(null);
      return;
    }
    const match = newsArticles.find((a) => a.slug === slug);
    if (match) setActiveArticle(match);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/95 via-[#05264c]/75 to-[#05264c]/40" />
        <Container size="wide" className="relative z-10 py-20 sm:py-24">
          <p className="type-label text-[#e8c56a]">Adeshina Group of Colleges</p>
          <h1 className="type-hero mt-4 text-white">News & updates</h1>
          <p className="type-body-lg mt-5 max-w-2xl text-white/85">
            Campus notices for students and families — admissions lists, matriculation, and official
            developments from Share.
          </p>
        </Container>
      </section>

      <section className="bg-[#f7f9fc] py-14 sm:py-16">
        <Container size="wide">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`type-button-sm border px-4 py-2.5 capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'border-[#05264c] bg-[#05264c] text-white'
                    : 'border-slate-300 bg-white text-[#05264c] hover:border-[#02509e]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <ul className="border-y border-slate-200 bg-white">
            {filteredArticles.map((article) => (
              <li key={article.id} className="border-b border-slate-100 last:border-0">
                <button
                  type="button"
                  onClick={() => openArticle(article)}
                  className="group flex w-full flex-col gap-2 px-5 py-6 text-left transition-colors hover:bg-[#f7f9fc] sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 sm:px-7"
                >
                  <div className="min-w-0">
                    <span className="type-label text-[#02509e]">{article.category}</span>
                    <h2 className="type-card-title mt-2 text-[#05264c] transition-colors group-hover:text-[#02509e]">
                      {article.title}
                    </h2>
                    <p className="type-body-sm mt-2 line-clamp-2 text-slate-600">{article.summary}</p>
                  </div>
                  <span className="type-body-sm inline-flex shrink-0 items-center gap-2 text-slate-500">
                    {article.date}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                </button>
              </li>
            ))}
            {filteredArticles.length === 0 && (
              <li className="px-5 py-10 text-center type-body text-slate-500">
                No notices in this category yet.
              </li>
            )}
          </ul>
        </Container>
      </section>

      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#041c36]/65 p-4"
          onClick={closeArticle}
          role="dialog"
          aria-modal="true"
          aria-labelledby="group-news-dialog-title"
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-slate-200 bg-white p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="type-label text-[#02509e]">{activeArticle.category}</span>
                <h3
                  id="group-news-dialog-title"
                  className="type-section mt-2 text-[#05264c]"
                >
                  {activeArticle.title}
                </h3>
                <p className="type-body-sm mt-2 text-slate-500">{activeArticle.date}</p>
              </div>
              <button
                type="button"
                onClick={closeArticle}
                className="p-1.5 text-slate-400 transition-colors hover:text-[#05264c]"
                aria-label="Close notice"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="type-body py-6 text-slate-600">
              {activeArticle.content || activeArticle.summary}
            </p>
            <button
              type="button"
              onClick={closeArticle}
              className="type-button bg-[#05264c] px-5 py-2.5 text-white transition-colors hover:bg-[#02509e]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
