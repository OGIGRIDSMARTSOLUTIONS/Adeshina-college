import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export function Hero() {
  return (
    <section className="bg-surface border-b border-gray-100 py-16 sm:py-24">
      <Container className="text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text">
          {siteConfig.institutionName}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/colleges" variant="primary">
            Explore Colleges
          </Button>
          <Button to="/admissions" variant="outline">
            Admissions
          </Button>
        </div>
      </Container>
    </section>
  );
}
