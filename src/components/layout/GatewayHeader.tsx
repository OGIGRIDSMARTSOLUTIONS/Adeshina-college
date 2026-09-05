import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Stethoscope,
  BookOpen,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact / Support', path: '/contact' },
];

export function GatewayHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCollegesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCollegesOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled
          ? 'shadow-[0_4px_24px_-6px_rgba(8,20,38,0.14)] border-b border-slate-200/80'
          : 'border-b border-slate-200/90'
      }`}
    >
      <div className="hidden lg:block bg-[#05264c] text-[11px] text-sky-100/90 border-b border-sky-900/40">
        <Container size="wide" className="flex items-center justify-between h-9">
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3 h-3 text-sky-300" />
            {siteConfig.fullLocation}
          </span>
          <a
            href="tel:08135131503"
            className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold"
          >
            <Phone className="w-3 h-3 text-sky-300" />
            Admissions: 0813 513 1503
          </a>
        </Container>
      </div>

      <Container size="wide">
        <div className="flex items-center justify-between h-[4.25rem] sm:h-20 gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-adeshina-blue focus-visible:rounded-lg p-1 -ml-1 min-w-0"
          >
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt=""
                className="h-11 w-11 sm:h-14 sm:w-14 object-contain shrink-0 rounded-lg"
              />
            ) : (
              <div className="h-11 w-11 rounded-lg bg-navy text-white flex items-center justify-center font-black text-xl">
                A
              </div>
            )}
            <div className="flex flex-col leading-tight text-left min-w-0">
              <span className="font-serif font-black text-sm sm:text-lg tracking-tight text-[#05264c] group-hover:text-adeshina-blue transition-colors truncate">
                {siteConfig.institutionName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold">
                Share · Kwara State
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Group navigation">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCollegesOpen((o) => !o)}
                className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                  location.pathname.startsWith('/colleges/')
                    ? 'text-adeshina-blue bg-blue-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
                aria-expanded={collegesOpen}
              >
                Colleges
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${collegesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {collegesOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl border border-slate-200 shadow-lg py-2 z-50">
                  {colleges.map((c) => {
                    const id = c.id as CollegeId;
                    const Icon = id === 'health-technology' ? Stethoscope : BookOpen;
                    return (
                      <Link
                        key={c.id}
                        to={collegePath(id)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <Icon
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            id === 'health-technology' ? 'text-emerald-600' : 'text-adeshina-blue'
                          }`}
                        />
                        <span>
                          <span className="block text-xs font-bold text-navy">{c.shortName}</span>
                          <span className="block text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {c.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.map((item) => (
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
              to={siteConfig.portals.studentPortal.path}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#05264c] hover:bg-adeshina-blue text-white text-xs font-bold transition-colors shadow-sm"
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-300" />
              <span>{siteConfig.portals.studentPortal.label}</span>
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-navy hover:bg-slate-100"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
          <Container size="wide" className="py-4 space-y-1">
            <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Colleges
            </p>
            {colleges.map((c) => (
              <Link
                key={c.id}
                to={collegePath(c.id as CollegeId)}
                className="block px-3 py-2.5 text-sm font-bold text-navy rounded-lg hover:bg-slate-50"
              >
                {c.shortName}
              </Link>
            ))}
            <div className="border-t border-slate-100 my-2" />
            {navLinks.map((item) => (
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
              to="/portal"
              className="block mt-3 text-center px-4 py-3 rounded-xl bg-[#05264c] text-white text-sm font-bold"
            >
              Student Portal
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
