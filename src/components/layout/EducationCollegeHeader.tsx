import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Stethoscope, BookOpen, ArrowRight } from 'lucide-react';
import { getCollegeNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { useCollege } from '@/context/CollegeContext';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';
import { edBtnCoral } from '@/components/college/education/educationTheme';

/** Solid academic header — College of Education only. */
export function EducationCollegeHeader() {
  const { collegeId, path } = useCollege();
  const navItems = getCollegeNavItems(collegeId).filter((item) => item.label !== 'Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
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
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (itemPath: string) =>
    location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[#0f2744]/10 bg-white">
      <Container size="wide" className="flex min-h-[5.5rem] items-center justify-between gap-4 py-3 sm:min-h-[6.25rem] sm:py-4">
        <Link to={path()} className="flex min-w-0 items-center gap-3.5">
          {siteConfig.brand.logoUrl ? (
            <img
              src={siteConfig.brand.logoUrl}
              alt=""
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            />
          ) : null}
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-sans text-base font-bold tracking-[-0.02em] text-[#0f2744] sm:text-[17px]">
              Adeshina
            </span>
            <span className="truncate font-sans text-[13px] font-semibold text-[#0f2744]/70 sm:text-sm">
              College of Education
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="College">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-sans text-[14px] font-semibold transition-colors ${
                isActive(item.path)
                  ? 'text-[#e85d3b]'
                  : 'text-[#0f2744]/80 hover:text-[#0f2744]'
              }`}
            >
              {item.label === 'Contact' ? 'Support' : item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCollegesOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 font-sans text-[13px] font-semibold text-[#0f2744] transition-colors hover:bg-[#f3f1eb]"
              aria-expanded={collegesOpen}
            >
              Colleges
              <ChevronDown className={`h-4 w-4 transition-transform ${collegesOpen ? 'rotate-180' : ''}`} />
            </button>
            {collegesOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#0f2744]/10 bg-white shadow-[0_20px_40px_-20px_rgba(15,39,68,0.35)]">
                {colleges.map((c) => (
                  <Link
                    key={c.id}
                    to={collegePath(c.id as CollegeId)}
                    className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[#f3f1eb]"
                    onClick={() => setCollegesOpen(false)}
                  >
                    {c.id === 'health-technology' ? (
                      <Stethoscope className="h-4 w-4 text-[#3d8fd1]" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-[#e85d3b]" />
                    )}
                    <span className="font-sans text-[13px] font-semibold text-[#0f2744]">{c.shortName}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link to={path('apply')} className={`${edBtnCoral} hidden sm:inline-flex`}>
            Apply now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#0f2744] transition-colors hover:bg-[#f3f1eb] lg:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen ? (
        <div className="border-t border-[#0f2744]/10 bg-white lg:hidden">
          <Container size="wide" className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-xl px-4 py-3 font-sans text-[15px] font-semibold ${
                  isActive(item.path) ? 'bg-[#f3f1eb] text-[#e85d3b]' : 'text-[#0f2744]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label === 'Contact' ? 'Support' : item.label}
              </Link>
            ))}
            <Link
              to={path('apply')}
              className={`${edBtnCoral} mt-3 w-full`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
