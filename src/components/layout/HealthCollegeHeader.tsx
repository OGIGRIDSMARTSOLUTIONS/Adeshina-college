import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Stethoscope, BookOpen, GraduationCap } from 'lucide-react';
import { getCollegeNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { useCollege } from '@/context/CollegeContext';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { HealthApplyButton } from '@/components/college/health/HealthApplyButton';

/** Floating institutional header — Health Technology only. */
export function HealthCollegeHeader() {
  const { collegeId, path } = useCollege();
  const navItems = getCollegeNavItems(collegeId).filter((item) => item.label !== 'Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto mx-auto w-full transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'max-w-none px-0 pt-0'
            : 'max-w-[100rem] px-2 pt-2 sm:px-3 sm:pt-3 lg:px-4'
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 border backdrop-blur-xl transition-[min-height,border-radius,padding,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-5 ${
            isScrolled
              ? 'min-h-[4.75rem] rounded-none border-x-0 border-t-0 border-[#051e39]/12 bg-white/95 px-4 py-3 shadow-[0_12px_40px_-18px_rgba(5,30,57,0.35)] sm:min-h-[5.25rem] sm:px-6 lg:px-10'
              : 'min-h-[4.25rem] rounded-full border-white/80 bg-white/75 px-4 py-3 shadow-[0_22px_55px_-22px_rgba(5,30,57,0.5)] sm:min-h-[4.75rem] sm:px-6 sm:py-3.5 lg:px-8'
          }`}
        >
          <Link
            to={path()}
            className="flex min-w-0 max-w-[42%] items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d8fd1] xl:max-w-[36%]"
          >
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt=""
                className="h-11 w-11 shrink-0 rounded-full bg-white object-contain ring-1 ring-[#051e39]/12 sm:h-12 sm:w-12"
              />
            ) : (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3d8fd1] font-serif text-xl font-bold text-[#051e39] sm:h-12 sm:w-12">
                A
              </span>
            )}
            <span className="min-w-0">
              <span className="block font-serif text-[0.95rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#051e39] sm:text-[1.1rem] lg:text-[1.2rem]">
                <span className="xl:hidden">Adeshina College of Health Tech</span>
                <span className="hidden xl:inline">Adeshina College of Health Tech</span>
              </span>
            </span>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
            aria-label="College navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-full px-3.5 py-2 font-sans text-[15px] font-semibold tracking-[-0.01em] transition-all duration-200 2xl:px-4 2xl:text-[16px] ${
                    active
                      ? 'bg-[#051e39] text-white'
                      : 'text-[#334155] hover:bg-[#3d8fd1]/20 hover:text-[#051e39]'
                  }`}
                >
                  {item.label === 'Contact' ? 'Support' : item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCollegesOpen((o) => !o)}
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-3.5 font-sans text-[14px] font-semibold text-[#051e39] transition-colors hover:bg-[#3d8fd1]/18"
                aria-expanded={collegesOpen}
              >
                Colleges
                <ChevronDown
                  className={`h-4 w-4 opacity-60 transition-transform duration-200 ${
                    collegesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {collegesOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-[20rem] overflow-hidden rounded-2xl border border-[#051e39]/10 bg-white py-2 shadow-[0_24px_60px_-20px_rgba(5,30,57,0.4)]">
                  <p className="px-4 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                    Switch college
                  </p>
                  {colleges.map((c) => {
                    const id = c.id as CollegeId;
                    const Icon = id === 'health-technology' ? Stethoscope : BookOpen;
                    const current = id === collegeId;
                    return (
                      <Link
                        key={c.id}
                        to={collegePath(id)}
                        className={`mx-2 flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${
                          current ? 'bg-[#f7f3ea]' : 'hover:bg-[#f7f3ea]'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            id === 'health-technology'
                              ? 'bg-[#ecf8f3] text-[#0f7a5f]'
                              : 'bg-[#eef5fc] text-[#02509e]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="flex items-center gap-2 text-[13px] font-semibold text-[#051e39]">
                            {c.shortName}
                            {current && (
                              <span className="rounded-full bg-[#3d8fd1]/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#2a73ad]">
                                Current
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block text-[12px] leading-relaxed text-[#64748b]">
                            {c.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                  <div className="mx-4 my-2 border-t border-[#051e39]/08" />
                  <Link
                    to="/"
                    className="mx-2 block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#051e39] transition-colors hover:bg-[#f7f3ea]"
                  >
                    All Colleges home
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/portal"
              className="hidden h-11 items-center gap-1.5 rounded-full border-2 border-[#051e39] bg-white px-4 font-sans text-[13px] font-bold text-[#051e39] transition-colors hover:bg-[#051e39] hover:text-white sm:inline-flex"
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Portal
            </Link>

            <HealthApplyButton to={path('apply')}>Apply Now</HealthApplyButton>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#051e39] transition-colors hover:bg-[#3d8fd1]/18 xl:hidden"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`overflow-hidden border border-[#051e39]/10 bg-white/95 shadow-[0_24px_60px_-20px_rgba(5,30,57,0.4)] backdrop-blur-xl xl:hidden ${
              isScrolled
                ? 'mt-0 rounded-none border-x-0'
                : 'mt-2 rounded-3xl'
            }`}
          >
            <div className="max-h-[min(70vh,30rem)] space-y-1 overflow-y-auto px-3 py-4">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3d8fd1]">
                Colleges
              </p>
              {colleges.map((c) => (
                <Link
                  key={c.id}
                  to={collegePath(c.id as CollegeId)}
                  className={`block rounded-xl px-3 py-3.5 text-[16px] font-semibold ${
                    c.id === collegeId
                      ? 'bg-[#f7f3ea] text-[#051e39]'
                      : 'text-[#475569] hover:bg-[#3d8fd1]/15 hover:text-[#051e39]'
                  }`}
                >
                  {c.shortName}
                </Link>
              ))}
              <Link
                to="/"
                className="block rounded-xl px-3 py-3.5 text-[16px] font-semibold text-[#051e39] hover:bg-[#3d8fd1]/15"
              >
                All Colleges home
              </Link>
              <div className="my-2 border-t border-[#051e39]/08" />
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block rounded-xl px-3 py-3.5 text-[16px] font-semibold ${
                    isActive(item.path)
                      ? 'bg-[#051e39] text-white'
                      : 'text-[#475569] hover:bg-[#3d8fd1]/18 hover:text-[#051e39]'
                  }`}
                >
                  {item.label === 'Contact' ? 'Support' : item.label}
                </Link>
              ))}
              <Link
                to="/portal"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border-2 border-[#051e39] px-4 py-3.5 text-[15px] font-bold text-[#051e39]"
              >
                <GraduationCap className="h-4 w-4" />
                Portal
              </Link>
              <HealthApplyButton to={path('apply')} className="mt-2 w-full justify-between">
                Apply Now
              </HealthApplyButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
