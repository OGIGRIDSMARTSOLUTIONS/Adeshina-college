import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';

export function CampusLife() {
  return (
    <section className="py-16 bg-surface border-y border-gray-100">
      <Container>
        <SectionHeading
          title="Campus Life & Facilities"
          subtitle="A vibrant student community centered on learning, collaboration, and personal growth"
        />
        <div className="text-center py-12 bg-background rounded-lg border border-dashed border-gray-200">
          <p className="text-sm text-muted">
            Campus photographs and facility tours will be presented here.
          </p>
        </div>
      </Container>
    </section>
  );
}
