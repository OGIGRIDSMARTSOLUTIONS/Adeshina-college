import { College } from '@/types/college';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

interface CollegeProgrammesProps {
  college: College;
}

export function CollegeProgrammes({ college }: CollegeProgrammesProps) {
  const collegeProgrammes = programmes.filter((p) => p.collegeId === college.id);

  return (
    <section className="py-16 bg-surface border-y border-gray-100">
      <Container>
        <SectionHeading
          title="Offered Programmes"
          subtitle={`Explore academic qualifications available at ${college.name}`}
        />
        {collegeProgrammes.length === 0 ? (
          <div className="text-center py-10 bg-background rounded-lg border border-dashed border-gray-200">
            <p className="text-sm text-muted">
              Official programme list for {college.name} will be displayed here once verified.
            </p>
            <div className="mt-4">
              <Button to="/admissions" variant="outline">
                Admission Inquiries
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeProgrammes.map((prog) => (
              <div key={prog.id} className="p-6 bg-background rounded-md border border-gray-200">
                <span className="text-xs font-semibold text-adeshina-blue uppercase">
                  {prog.level}
                </span>
                <h4 className="mt-2 text-lg font-bold text-text">{prog.name}</h4>
                <p className="mt-1 text-sm text-muted">{prog.duration}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
