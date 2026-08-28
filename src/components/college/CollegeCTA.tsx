import { College } from '@/types/college';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

interface CollegeCTAProps {
  college: College;
}

export function CollegeCTA({ college }: CollegeCTAProps) {
  return (
    <section className="py-16 bg-navy text-white">
      <Container className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Join {college.name}
        </h2>
        <p className="mt-3 text-blue-200 max-w-xl mx-auto text-sm sm:text-base">
          Start your application or contact the admissions department for guidance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/admissions" variant="primary">
            Apply Now
          </Button>
          <Button to="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
            Contact College
          </Button>
        </div>
      </Container>
    </section>
  );
}
