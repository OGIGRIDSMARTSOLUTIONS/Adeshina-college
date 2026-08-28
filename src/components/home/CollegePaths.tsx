import { colleges } from '@/data/colleges';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function CollegePaths() {
  return (
    <section className="py-16 bg-background">
      <Container>
        <SectionHeading
          title="Our Academic Colleges"
          subtitle="Explore distinct professional and educational pathways at Adeshina"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="bg-surface rounded-lg p-8 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-adeshina-blue">
                  {college.name}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {college.tagline}
                </p>
                <p className="mt-4 text-sm text-text">
                  {college.description}
                </p>
              </div>
              <div className="mt-6">
                <Button to={college.slug} variant="outline" className="w-full sm:w-auto">
                  View College Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
