import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { GroupLayout } from '@/components/layout/GroupLayout';
import { CollegeLayout } from '@/components/layout/CollegeLayout';
import { GatewayPage } from '@/pages/GatewayPage';
import { CollegeHomePage } from '@/pages/CollegeHomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProgrammesPage } from '@/pages/ProgrammesPage';
import { AdmissionsPage } from '@/pages/AdmissionsPage';
import { NewsPage } from '@/pages/NewsPage';
import { ContactPage } from '@/pages/ContactPage';
import { PortalPage } from '@/pages/PortalPage';
import { ApplyPage } from '@/pages/ApplyPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/portal" element={<PortalPage />} />

        <Route element={<GroupLayout />}>
          <Route path="/" element={<GatewayPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/colleges/:collegeId" element={<CollegeLayout />}>
          <Route index element={<CollegeHomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="programmes" element={<ProgrammesPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="apply" element={<ApplyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/colleges" element={<Navigate to="/#colleges" replace />} />
        <Route path="/programmes" element={<Navigate to="/#colleges" replace />} />
        <Route path="/admissions" element={<Navigate to="/#colleges" replace />} />
        <Route path="/apply" element={<Navigate to="/#colleges" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
