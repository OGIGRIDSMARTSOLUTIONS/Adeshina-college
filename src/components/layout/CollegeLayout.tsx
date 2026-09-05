import { Outlet } from 'react-router-dom';
import { CollegeProvider } from '@/context/CollegeContext';
import { CollegeHeader } from '@/components/layout/CollegeHeader';
import { CollegeFooter } from '@/components/layout/CollegeFooter';

export function CollegeLayout() {
  return (
    <CollegeProvider>
      <div className="min-h-screen flex flex-col bg-background text-text">
        <CollegeHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <CollegeFooter />
      </div>
    </CollegeProvider>
  );
}
