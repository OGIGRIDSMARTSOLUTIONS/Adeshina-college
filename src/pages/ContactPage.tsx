import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';

export function ContactPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          title="Contact Us"
          subtitle="Reach out to Adeshina Group of Colleges"
        />

        <div className="bg-surface rounded-lg p-8 border border-gray-200 max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="font-semibold text-text">Campus Location</h3>
            <p className="mt-1 text-sm text-muted">
              {siteConfig.contact.campusAddress}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text">Inquiries</h3>
            <p className="mt-1 text-sm text-muted">
              Official institutional contact details and office directory will be updated here.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
