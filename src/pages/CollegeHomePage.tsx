import { CollegeHero } from '@/components/college/CollegeHero';
import { CollegeOverview } from '@/components/college/CollegeOverview';
import { CollegeProgrammes } from '@/components/college/CollegeProgrammes';
import { CollegeCTA } from '@/components/college/CollegeCTA';
import { useCollege } from '@/context/CollegeContext';

export function CollegeHomePage() {
  const { college } = useCollege();

  return (
    <>
      <CollegeHero college={college} />
      <CollegeOverview college={college} />
      <CollegeProgrammes college={college} />
      <CollegeCTA college={college} />
    </>
  );
}
