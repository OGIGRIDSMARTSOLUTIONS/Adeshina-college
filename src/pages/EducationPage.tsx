import { colleges } from '@/data/colleges';
import { CollegeHero } from '@/components/college/CollegeHero';
import { CollegeOverview } from '@/components/college/CollegeOverview';
import { CollegeProgrammes } from '@/components/college/CollegeProgrammes';
import { CollegeCTA } from '@/components/college/CollegeCTA';
import { NotFoundPage } from './NotFoundPage';

export function EducationPage() {
  const college = colleges.find((c) => c.id === 'education');

  if (!college) {
    return <NotFoundPage />;
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
