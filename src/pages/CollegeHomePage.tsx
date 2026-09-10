import { useCollege } from '@/context/CollegeContext';
import { HealthHomePage } from '@/components/college/health/HealthHomePage';
import { EducationHomePage } from '@/components/college/education/EducationHomePage';
import { CollegeHero } from '@/components/college/CollegeHero';
import { CollegeOverview } from '@/components/college/CollegeOverview';
import { CollegeProgrammes } from '@/components/college/CollegeProgrammes';
import { CollegeCTA } from '@/components/college/CollegeCTA';

export function CollegeHomePage() {
  const { college } = useCollege();

  if (college.id === 'health-technology') {
    return <HealthHomePage college={college} />;
  }

  if (college.id === 'education') {
    return <EducationHomePage college={college} />;
  }

  return (
    <>
      <CollegeHero college={college} />
      <CollegeOverview college={college} />
      <CollegeProgrammes college={college} />
      <CollegeCTA college={college} />
    </>
  );
}
