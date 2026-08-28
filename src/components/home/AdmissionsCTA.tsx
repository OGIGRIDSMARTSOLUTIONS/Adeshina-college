import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export function AdmissionsCTA() {
  return (
    <section className="py-16 bg-background">
      <Container className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-text">
          Start Your Academic Journey
        </h2>
        <p className="mt-3 text-muted max-w-xl mx-auto text-sm sm:text-base">
          Discover admission requirements and application steps for both Health Technology and Education colleges.
        </p>
        <div className="mt-6">
          <Button to="/admissions" variant="primary">
            Admissions Information
          </Button>
        </div>
      </Container>
    </section>
  );
}
