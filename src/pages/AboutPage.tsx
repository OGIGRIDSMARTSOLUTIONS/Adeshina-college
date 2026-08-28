import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function AboutPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          title="About Adeshina Group of Colleges"
          subtitle={`Located in ${siteConfig.location}, dedicated to quality education and healthcare workforce development.`}
        />
        
        <div className="bg-surface p-8 rounded-lg border border-gray-200 max-w-3xl mx-auto space-y-6">
          <p className="text-text leading-relaxed">
            Adeshina Group of Colleges encompasses two specialized institutions: Adeshina College of Health Technology and Adeshina College of Education.
          </p>
          <p className="text-text leading-relaxed">
            Our mission is to foster an environment of academic excellence, discipline, and practical vocational competency to empower students for purposeful careers.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button to="/colleges" variant="primary">
              Our Colleges
            </Button>
            <Button to="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
