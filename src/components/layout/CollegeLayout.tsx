import { Outlet } from 'react-router-dom';
import { CollegeProvider, useCollege } from '@/context/CollegeContext';
import { CollegeHeader } from '@/components/layout/CollegeHeader';
import { HealthCollegeHeader } from '@/components/layout/HealthCollegeHeader';
import { EducationCollegeHeader } from '@/components/layout/EducationCollegeHeader';
import { CollegeFooter } from '@/components/layout/CollegeFooter';
import { ChatLauncher } from '@/components/chatbot/ChatLauncher';

function CollegeChrome() {
  const { collegeId } = useCollege();
  const isHealth = collegeId === 'health-technology';
  const isEducation = collegeId === 'education';

  return (
    <div
      className={`flex min-h-screen flex-col text-text ${
        isHealth ? 'bg-[#f7f3ea]' : isEducation ? 'bg-[#fbfaf7]' : 'bg-background'
      }`}
    >
      {isHealth ? (
        <HealthCollegeHeader />
      ) : isEducation ? (
        <EducationCollegeHeader />
      ) : (
        <CollegeHeader />
      )}
      <main className={`flex-grow ${isHealth ? 'pt-[5.5rem] sm:pt-[6rem]' : ''}`}>
        <Outlet />
      </main>
      <CollegeFooter />
      <ChatLauncher />
    </div>
  );
}

export function CollegeLayout() {
  return (
    <CollegeProvider>
      <CollegeChrome />
    </CollegeProvider>
  );
}
