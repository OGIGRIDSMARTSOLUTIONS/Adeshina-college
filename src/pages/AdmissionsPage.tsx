import { admissionInfo } from '@/data/admissions';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export function AdmissionsPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          title="Admissions"
          subtitle="Information on entry requirements, application procedures, and deadlines"
        />

        <div className="bg-surface rounded-lg p-8 border border-gray-200 max-w-3xl mx-auto space-y-6">
          <p className="text-text leading-relaxed">
            {admissionInfo.generalNotice}
          </p>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-semibold text-base text-text">Need Guidance?</h3>
            <p className="mt-1 text-sm text-muted">
              Contact our admissions team for inquiries about requirements and entry procedures.
            </p>
            <div className="mt-4">
              <Button to="/contact" variant="primary">
                Contact Admissions
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
