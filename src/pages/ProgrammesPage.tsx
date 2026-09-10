import { useCollege } from '@/context/CollegeContext';
import { HealthProgrammesPage } from '@/components/college/health/HealthProgrammesPage';
import { EducationProgrammesPage } from '@/components/college/education/EducationProgrammesPage';

export function ProgrammesPage() {
  const { collegeId } = useCollege();

  if (collegeId === 'health-technology') {
    return <HealthProgrammesPage />;
  }

  return <EducationProgrammesPage />;
}
