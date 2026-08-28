import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

interface CollegeHeroProps {
  college: College;
}

export function CollegeHero({ college }: CollegeHeroProps) {
  return (
    <section className="bg-surface border-b border-gray-100 py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-semibold text-adeshina-blue">
            Adeshina Group of Colleges
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-text">
            {college.name}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {college.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/admissions" variant="primary">
              Apply to {college.shortName}
            </Button>
            <Button to="/programmes" variant="outline">
              View Programmes
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
