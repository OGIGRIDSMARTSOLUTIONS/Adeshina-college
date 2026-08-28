import { Hero } from '@/components/home/Hero';
import { CollegePaths } from '@/components/home/CollegePaths';
import { ProgrammesPreview } from '@/components/home/ProgrammesPreview';
import { WhyAdeshina } from '@/components/home/WhyAdeshina';
import { CampusLife } from '@/components/home/CampusLife';
import { AdmissionsCTA } from '@/components/home/AdmissionsCTA';
import { NewsPreview } from '@/components/home/NewsPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <CollegePaths />
      <ProgrammesPreview />
      <WhyAdeshina />
      <CampusLife />
      <AdmissionsCTA />
      <NewsPreview />
      <FinalCTA />
    </>
  );
}
