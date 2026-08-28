import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export function FinalCTA() {
  return (
    <section className="py-16 bg-navy text-white">
      <Container className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Ready to Take the Next Step?
        </h2>
        <p className="mt-3 text-blue-200 max-w-xl mx-auto text-sm sm:text-base">
          Get in touch with our admissions office or visit our campus in Share.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/contact" variant="primary">
            Contact Us
          </Button>
          <Button to="/programmes" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
            View All Programmes
          </Button>
        </div>
      </Container>
    </section>
  );
}
