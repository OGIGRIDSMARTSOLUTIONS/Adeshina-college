import { newsArticles } from '@/data/news';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function NewsPreview() {
  return (
    <section className="py-16 bg-surface border-t border-gray-100">
      <Container>
        <SectionHeading
          title="News & Updates"
          subtitle="Latest notices and announcements from Adeshina Group of Colleges"
        />
        {newsArticles.length === 0 ? (
          <div className="text-center py-8 text-muted bg-background rounded-lg border border-dashed border-gray-200">
            <p className="text-sm">Official announcements and news updates will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.slice(0, 3).map((article) => (
              <div key={article.id} className="p-6 bg-background rounded-md border border-gray-200">
                <span className="text-xs text-muted">{article.date}</span>
                <h4 className="mt-2 text-base font-bold text-text">{article.title}</h4>
                <p className="mt-1 text-sm text-muted">{article.summary}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Button to="/news" variant="outline">
            View All News
          </Button>
        </div>
      </Container>
    </section>
  );
}
