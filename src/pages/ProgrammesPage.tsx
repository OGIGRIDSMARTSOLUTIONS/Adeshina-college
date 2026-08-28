import { programmes } from '@/data/programmes';
import { colleges } from '@/data/colleges';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function ProgrammesPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          title="Academic Programmes"
          subtitle="Comprehensive course offerings across Health Technology and Education"
        />

        {programmes.length === 0 ? (
          <div className="bg-surface rounded-lg p-12 border border-gray-200 text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-text">Programme Directory Under Preparation</h3>
            <p className="mt-2 text-sm text-muted">
              Complete list of departments, diploma, certificate, and NCE programmes will be published shortly.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              {colleges.map((c) => (
                <Button key={c.id} to={c.slug} variant="outline">
                  {c.shortName}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((prog) => (
              <div key={prog.id} className="bg-surface p-6 rounded-lg border border-gray-200">
                <span className="text-xs font-semibold text-adeshina-blue uppercase">
                  {prog.level}
                </span>
                <h3 className="mt-2 text-lg font-bold text-text">{prog.name}</h3>
                <p className="mt-1 text-sm text-muted">{prog.duration}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
