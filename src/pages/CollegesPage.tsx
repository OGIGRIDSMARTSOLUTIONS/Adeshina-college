import { colleges } from '@/data/colleges';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function CollegesPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          title="Colleges of Adeshina Group"
          subtitle="Explore our specialized academic institutions in Share"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="bg-surface rounded-lg p-8 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase font-semibold text-adeshina-blue tracking-wider">
                  Academic College
                </span>
                <h3 className="mt-2 text-2xl font-bold text-text">
                  {college.name}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {college.tagline}
                </p>
                <p className="mt-4 text-sm text-text leading-relaxed">
                  {college.description}
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button to={college.slug} variant="primary">
                  Explore College
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
