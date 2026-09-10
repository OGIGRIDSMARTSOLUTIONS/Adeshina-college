import { College } from '@/types/college';
import { EducationHero } from './EducationHero';
import { EducationLead } from './EducationLead';
import { EducationProgrammes } from './EducationProgrammes';
import { EducationWhy } from './EducationWhy';
import { EducationCampus } from './EducationCampus';
import { EducationAdmissions } from './EducationAdmissions';
import { EducationFinalCta } from './EducationFinalCta';

interface EducationHomePageProps {
  college: College;
}

/** Education homepage — Editorial Oxford body under the locked hero. */
export function EducationHomePage({ college }: EducationHomePageProps) {
  return (
    <div className="bg-[#fbfaf7] text-[#0f2744]">
      <EducationHero college={college} />
      <EducationLead college={college} />
      <EducationProgrammes college={college} />
      <EducationWhy />
      <EducationCampus />
      <EducationAdmissions college={college} />
      <EducationFinalCta college={college} />
    </div>
  );
}
