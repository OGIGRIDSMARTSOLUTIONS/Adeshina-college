import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';

interface CollegeOverviewProps {
  college: College;
}

export function CollegeOverview({ college }: CollegeOverviewProps) {
  return (
    <section className="py-16 bg-background">
      <Container>
        <SectionHeading
          title="About the College"
          subtitle={college.name}
          align="left"
        />
        <div className="bg-surface p-8 rounded-lg border border-gray-200">
          <p className="text-base text-text leading-relaxed">
            {college.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
