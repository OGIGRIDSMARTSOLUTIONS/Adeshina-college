import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, GraduationCap, ArrowRight, Phone } from 'lucide-react';
import { getCollegeNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';

export function CollegeHeader() {
  const { college, collegeId, path } = useCollege();
  const navItems = getCollegeNavItems(collegeId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHealth = collegeId === 'health-technology';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (itemPath: string) => {
    if (itemPath === path()) {
      return location.pathname === itemPath || location.pathname === `${itemPath}/`;
    }
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(8,20,38,0.08)] border-b border-slate-200/80'
          : 'bg-white border-b border-slate-200/90'
      }`}
    >
      <div className="bg-[#05264c] text-white text-[11px] sm:text-xs py-2 px-4 hidden lg:block border-b border-sky-900/50">
        <Container size="wide" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sky-200 hover:text-white transition-colors font-semibold"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>All Colleges</span>
            </Link>
            <span className="text-sky-400/60">•</span>
            <span className="text-sky-100/90">{college.shortName}</span>
            <span className="text-sky-400/60">•</span>
            <a
              href="tel:08135131503"
              className="text-sky-100/90 hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-sky-300" />
              <span>0813 513 1503</span>
            </a>
          </div>
          <Link
            to="/portal"
            className="hover:text-white transition-colors flex items-center gap-1.5 text-sky-300 font-semibold"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{siteConfig.portals.studentPortal.label}</span>
          </Link>
        </Container>
      </div>

      <Container size="wide">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            to={path()}
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-adeshina-blue focus-visible:rounded-lg p-1 -ml-1 min-w-0"
          >
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt=""
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0 rounded-lg"
              />
            ) : (
              <div
                className="h-10 w-10 rounded-lg text-white flex items-center justify-center font-black text-lg shrink-0"
                style={{ backgroundColor: college.accentColor || '#02509e' }}
              >
                A
              </div>
            )}
            <div className="flex flex-col leading-tight min-w-0 text-left">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-navy truncate group-hover:text-adeshina-blue transition-colors">
                {college.shortName}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold truncate">
                Adeshina · Share
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="College navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-adeshina-blue bg-blue-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={path('apply')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-sm transition-all ${
                isHealth ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-adeshina-blue hover:bg-navy'
              }`}
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-navy hover:bg-slate-100"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
          <Container size="wide" className="py-4 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-sky-700 rounded-lg hover:bg-sky-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Colleges
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2.5 text-sm font-bold rounded-lg ${
                  isActive(item.path) ? 'bg-blue-50 text-adeshina-blue' : 'text-navy hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={path('apply')}
              className={`block text-center mt-3 px-4 py-3 rounded-xl text-white text-sm font-bold ${
                isHealth ? 'bg-emerald-600' : 'bg-adeshina-blue'
              }`}
            >
              Apply Now
            </Link>
            <Link to="/portal" className="block text-center px-4 py-2 text-xs font-bold text-slate-600">
              Student Portal
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
