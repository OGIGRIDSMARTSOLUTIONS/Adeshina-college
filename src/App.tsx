import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { PageLayout } from '@/components/layout/PageLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { CollegesPage } from '@/pages/CollegesPage';
import { HealthTechnologyPage } from '@/pages/HealthTechnologyPage';
import { EducationPage } from '@/pages/EducationPage';
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
        {/* Dedicated Full-Screen Portal (Standalone: No Main Website Header/Footer) */}
        <Route path="/portal" element={<PortalPage />} />

        {/* Public Website Routes (Rendered inside Global Header & Footer) */}
        <Route
          path="/*"
          element={
            <PageLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/colleges" element={<CollegesPage />} />
                <Route path="/colleges/health-technology" element={<HealthTechnologyPage />} />
                <Route path="/colleges/education" element={<EducationPage />} />
                <Route path="/programmes" element={<ProgrammesPage />} />
                <Route path="/admissions" element={<AdmissionsPage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
