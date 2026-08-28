import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function ProgrammesPreview() {
  return (
    <section className="py-16 bg-surface border-y border-gray-100">
      <Container>
        <SectionHeading
          title="Academic Programmes"
          subtitle="Accredited and professional diploma, certificate, and degree courses"
        />
        {programmes.length === 0 ? (
          <div className="text-center py-8 text-muted bg-background rounded-lg border border-dashed border-gray-200">
            <p className="text-sm">Verified programme directory is currently being prepared.</p>
            <div className="mt-4">
              <Button to="/programmes" variant="outline">
                Browse Directory
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programmes.slice(0, 6).map((prog) => (
              <div key={prog.id} className="p-6 bg-background rounded-md border border-gray-200">
                <span className="text-xs font-semibold text-adeshina-blue uppercase tracking-wider">
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
