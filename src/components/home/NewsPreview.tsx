import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { newsArticles } from '@/data/news';

export function NewsPreview() {
  return (
    <section className="py-20 lg:py-28 bg-[#f4f7fb] border-b border-slate-200/80" aria-labelledby="news-updates-heading">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              LATEST UPDATES
            </span>
            <h2
              id="news-updates-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-navy leading-tight"
            >
              Latest News & Bulletins
            </h2>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-adeshina-blue transition-colors group"
          >
            <span>View All Bulletins</span>
            <ArrowRight className="w-4 h-4 text-adeshina-blue group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column News Card Grid Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col justify-between bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-adeshina-blue/40 transition-all duration-200 group"
            >
              <div>
                {/* Category Badge & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-adeshina-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {article.category}
                  </span>
                  <time className="text-xs text-slate-400 font-medium">
                    {article.date}
                  </time>
                </div>

                {/* Article Headline */}
                <h3 className="text-lg font-serif font-bold text-navy leading-snug group-hover:text-adeshina-blue transition-colors">
                  <Link to={`/news#${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to={`/news#${article.slug}`}
                  className="text-xs font-bold text-navy group-hover:text-adeshina-blue inline-flex items-center gap-1 transition-colors"
                >
                  <span>Read Notice</span>
                  <ArrowRight className="w-3.5 h-3.5 text-adeshina-blue group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
