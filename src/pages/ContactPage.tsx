import { useScopedPath } from '@/context/CollegeContext';
import { GroupContact } from '@/components/group/GroupContact';
import { HealthSupportPage } from '@/components/college/health/HealthSupportPage';
import { EducationSupportPage } from '@/components/college/education/EducationSupportPage';

export function ContactPage() {
  const { college, isGroup } = useScopedPath();
  const collegeId = college?.collegeId;

  if (isGroup) {
    return <GroupContact />;
  }

  if (collegeId === 'health-technology') {
    return <HealthSupportPage />;
  }

  if (collegeId === 'education') {
    return <EducationSupportPage />;
  }

  return <EducationSupportPage />;
}
