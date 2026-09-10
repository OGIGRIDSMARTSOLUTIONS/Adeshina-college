import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown, Stethoscope, BookOpen } from 'lucide-react';
import { getCollegeNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { useCollege } from '@/context/CollegeContext';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

export function CollegeHeader() {
  const { college, collegeId, path } = useCollege();
  const navItems = getCollegeNavItems(collegeId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHealth = collegeId === 'health-technology';
  const accent = isHealth ? '#10a37f' : '#02509e';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
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

  const isActive = (itemPath: string) => {
    if (itemPath === path()) {
      return location.pathname === itemPath || location.pathname === `${itemPath}/`;
    }
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  const navItemClass = (active: boolean) =>
    `type-nav inline-flex items-center px-2.5 py-2 rounded-md transition-all duration-200 ${
      isHealth
        ? active
          ? 'text-[#0f7a5f] bg-[#0f7a5f]/10'
          : 'text-[#5c6570] hover:text-[#0f7a5f] hover:bg-[#0f7a5f]/08'
        : active
          ? 'text-[#02509e] bg-[#e2eefb]'
          : 'text-slate-600 hover:text-[#02509e] hover:bg-[#e2eefb]'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        isHealth
          ? isScrolled
            ? 'bg-[#f4efe6]/95 border-[#041c36]/10 shadow-[0_10px_40px_-18px_rgba(4,28,54,0.18)]'
            : 'bg-[#f4efe6] border-transparent'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_10px_40px_-18px_rgba(5,38,76,0.28)]'
            : 'bg-white border-transparent shadow-[0_6px_24px_-14px_rgba(5,38,76,0.16)]'
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-3 h-[4.75rem] xl:h-[5.25rem]">
          <Link
            to={path()}
            className="flex items-center gap-3 group min-w-0 max-w-[55%] xl:max-w-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02509e]"
          >
            {siteConfig.brand.logoUrl ? (
              <span
                className="relative shrink-0 rounded-full p-[3px] shadow-[0_4px_14px_-6px_rgba(5,38,76,0.45)]"
                style={{
                  background: `linear-gradient(135deg, ${accent}99, #05264c66)`,
                }}
              >
                <img
                  src={siteConfig.brand.logoUrl}
                  alt=""
                  className="h-10 w-10 xl:h-11 xl:w-11 object-contain rounded-full bg-white"
                />
              </span>
            ) : (
              <div
                className="h-10 w-10 xl:h-11 xl:w-11 rounded-full text-white flex items-center justify-center font-serif font-bold text-xl shrink-0"
                style={{ backgroundColor: accent }}
              >
                A
              </div>
            )}
            <div className="flex flex-col text-left min-w-0 leading-none">
              <span className="type-brand text-[#05264c] truncate xl:whitespace-nowrap xl:overflow-visible transition-colors group-hover:text-[#02509e]">
                {isHealth ? (
                  <>
                    <span className="xl:hidden">Health Technology</span>
                    <span className="hidden xl:inline">{college.shortName}</span>
                  </>
                ) : (
                  <>
                    <span className="xl:hidden">College of Education</span>
                    <span className="hidden xl:inline">{college.shortName}</span>
                  </>
                )}
              </span>
              <span className="type-meta mt-1.5 xl:mt-2 inline-flex items-center gap-2 text-slate-500">
                <span className="h-px w-3 xl:w-3.5" style={{ backgroundColor: accent }} aria-hidden="true" />
                Adeshina · Share
              </span>
            </div>
          </Link>

          {/* Full desktop from xl — prevents crowded 1024–1279 layouts */}
          <div className="hidden xl:flex items-center gap-2.5 min-w-0">
            <nav className="flex items-center" aria-label="College navigation">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className={navItemClass(isActive(item.path))}>
                  {item.label === 'Contact' ? 'Support' : item.label}
                </Link>
              ))}
            </nav>

            <span className="h-7 w-px bg-slate-200 shrink-0" aria-hidden="true" />

            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                to={path('apply')}
                className={`type-button inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-3.5 text-white transition-colors duration-200 ${
                  isHealth
                    ? 'bg-[#10a37f] hover:bg-[#0a7a5c]'
                    : 'bg-[#02509e] hover:bg-[#013a75]'
                }`}
              >
                Apply Now
              </Link>
              <Link
                to="/portal"
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-3 text-[12px] font-semibold tracking-[0.03em] text-[#05264c] transition-colors duration-200 hover:border-slate-300 hover:bg-slate-100"
              >
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                <span>Portal</span>
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setCollegesOpen((o) => !o)}
                  className="inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-md border border-slate-300 bg-white px-3 text-[12px] font-semibold text-[#05264c] transition-colors duration-200 hover:border-[#05264c] hover:bg-[#05264c] hover:text-white"
                  aria-expanded={collegesOpen}
                >
                  Colleges
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                      collegesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {collegesOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-[20rem] overflow-hidden rounded-lg border border-slate-200/90 bg-white py-2 shadow-[0_20px_50px_-20px_rgba(5,38,76,0.35)]">
                    <p className="px-4 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
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
                          className={`mx-2 flex items-start gap-3 rounded-md px-3 py-3 transition-colors ${
                            current ? 'bg-[#f4f8fc]' : 'hover:bg-[#f4f8fc]'
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                              id === 'health-technology'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-[#eef5fc] text-[#02509e]'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#05264c]">
                              {c.shortName}
                              {current && (
                                <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                  Current
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-[12px] leading-relaxed text-slate-500">
                              {c.tagline}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                    <div className="mx-4 my-2 border-t border-slate-100" />
                    <Link
                      to="/"
                      className="mx-2 block rounded-md px-3 py-2.5 text-[13px] font-semibold text-[#02509e] transition-colors hover:bg-[#f4f8fc]"
                    >
                      All Colleges home
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-[#05264c] transition-colors hover:bg-[#f4f8fc]"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div
          className={`xl:hidden border-t max-h-[min(70vh,32rem)] overflow-y-auto ${
            isHealth
              ? 'border-[#041c36]/10 bg-[#f4efe6]'
              : 'border-slate-100 bg-white/98 backdrop-blur-sm'
          }`}
        >
          <Container size="wide" className="py-5 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Colleges
            </p>
            {colleges.map((c) => (
              <Link
                key={c.id}
                to={collegePath(c.id as CollegeId)}
                className={`block rounded-md px-3 py-3 text-[16px] font-medium ${
                  c.id === collegeId
                    ? 'bg-[#eef5fc] text-[#02509e]'
                    : 'text-[#05264c] hover:bg-[#f0f7ff] hover:text-[#02509e]'
                }`}
              >
                {c.shortName}
              </Link>
            ))}
            <Link
              to="/"
              className="block rounded-md px-3 py-3 text-[16px] font-medium text-[#05264c] hover:bg-[#f0f7ff] hover:text-[#02509e]"
            >
              All Colleges home
            </Link>
            <div className="border-t border-slate-100 my-3" />
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-md px-3 py-3 text-[16px] font-medium ${
                  isActive(item.path)
                    ? 'text-[#02509e] bg-[#eef5fc]'
                    : 'text-[#05264c] hover:bg-[#f0f7ff] hover:text-[#02509e]'
                }`}
              >
                {item.label === 'Contact' ? 'Support' : item.label}
              </Link>
            ))}
            <Link
              to={path('apply')}
              className="mt-4 block rounded-md px-4 py-3.5 text-center text-[14px] font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              Apply Now
            </Link>
            <Link
              to="/portal"
              className="mt-2 flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-semibold text-[#05264c] transition-colors hover:border-slate-300 hover:bg-slate-100"
            >
              <GraduationCap className="w-4 h-4 text-slate-500" />
              Student Portal
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
