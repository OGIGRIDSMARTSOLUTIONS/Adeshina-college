import { Link, useParams } from 'react-router-dom';
import { Home, ArrowLeft, Compass } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { isCollegeId, collegePath } from '@/lib/collegePaths';

export function NotFoundPage() {
  const { collegeId } = useParams<{ collegeId?: string }>();
  const homePath = isCollegeId(collegeId) ? collegePath(collegeId) : '/';
  const programmesPath = isCollegeId(collegeId) ? collegePath(collegeId, 'programmes') : '/';

  return (
    <div className="py-24 sm:py-32 bg-[#f8fafc] min-h-[70vh] flex items-center">
      <Container size="default" className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-adeshina-blue border border-blue-100 mb-6">
          <Compass className="w-3.5 h-3.5 text-accent-gold" />
          <span>Error 404</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-serif font-black text-navy tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to={homePath}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-dark transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>{isCollegeId(collegeId) ? 'College Home' : 'Choose a College'}</span>
          </Link>

          <Link
            to={programmesPath}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-navy border border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isCollegeId(collegeId) ? 'Explore Programmes' : 'Group Gateway'}</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
