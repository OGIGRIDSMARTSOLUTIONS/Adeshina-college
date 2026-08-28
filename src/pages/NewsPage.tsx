import { newsArticles } from '@/data/news';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';

export function NewsPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          title="News & Announcements"
          subtitle="Latest updates from Adeshina Group of Colleges"
        />

        {newsArticles.length === 0 ? (
          <div className="bg-surface rounded-lg p-12 border border-gray-200 text-center max-w-2xl mx-auto">
            <p className="text-sm text-muted">
              There are no published news articles at this time. Please check back for updates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-surface p-6 rounded-lg border border-gray-200">
                <span className="text-xs text-muted">{article.date}</span>
                <h3 className="mt-2 text-lg font-bold text-text">{article.title}</h3>
                <p className="mt-2 text-sm text-muted">{article.summary}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
