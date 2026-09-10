import { College } from '@/types/college';
import { HealthHero } from './HealthHero';
import { HealthLead } from './HealthLead';
import { HealthTrust } from './HealthTrust';
import { HealthProgrammes } from './HealthProgrammes';
import { HealthWhy } from './HealthWhy';
import { HealthCampus } from './HealthCampus';
import { HealthAdmissions } from './HealthAdmissions';
import { HealthFinalCta } from './HealthFinalCta';

interface HealthHomePageProps {
  college: College;
}

/** Health Technology homepage — tight conversion funnel. */
export function HealthHomePage({ college }: HealthHomePageProps) {
  return (
    <div className="bg-[#f7f3ea] text-[#1a2332]">
      <HealthHero college={college} />
      <HealthLead college={college} />
      <HealthTrust />
      <HealthProgrammes college={college} />
      <HealthWhy />
      <HealthCampus />
      <HealthAdmissions college={college} />
      <HealthFinalCta college={college} />
    </div>
  );
}
