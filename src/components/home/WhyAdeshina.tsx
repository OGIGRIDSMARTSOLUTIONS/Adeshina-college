import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';

export function WhyAdeshina() {
  return (
    <section className="py-16 bg-background">
      <Container>
        <SectionHeading
          title="Why Choose Adeshina"
          subtitle="Committed to academic excellence, practical skill acquisition, and community impact"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg text-adeshina-blue">Healthcare & Tech Focus</h3>
            <p className="mt-2 text-sm text-muted">
              Dedicated training designed to prepare students for real-world clinical and healthcare challenges.
            </p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg text-adeshina-blue">Educational Leadership</h3>
            <p className="mt-2 text-sm text-muted">
              Comprehensive educator training combining pedagogy, modern instructional methods, and practical teaching experience.
            </p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg text-adeshina-blue">Serene Campus Environment</h3>
            <p className="mt-2 text-sm text-muted">
              Located in Share, providing an environment conducive for learning, research, and character development.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
