import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/colleges/health-technology" element={<HealthTechnologyPage />} />
          <Route path="/colleges/education" element={<EducationPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
