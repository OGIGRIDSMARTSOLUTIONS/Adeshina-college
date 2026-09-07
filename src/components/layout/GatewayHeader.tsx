import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Support', path: '/contact' },
];

const collegeLinks = [
  { id: 'health-technology' as CollegeId, label: 'Health Tech' },
  { id: 'education' as CollegeId, label: 'Education' },
];

export function GatewayHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navItemClass = (active: boolean) =>
    `relative inline-flex items-center px-2.5 py-2 text-[14px] font-semibold tracking-[-0.01em] rounded-md transition-all duration-200 ${
      active
        ? 'text-[#02509e] bg-[#e2eefb]'
        : 'text-slate-600 hover:text-[#02509e] hover:bg-[#e2eefb]'
    }`;

  const collegeButtonClass = (id: CollegeId) => {
    const active = location.pathname.startsWith(`/colleges/${id}`);
    if (id === 'health-technology') {
      return `inline-flex h-9 items-center whitespace-nowrap rounded-md px-3 text-[12px] font-semibold transition-colors duration-200 ${
        active
          ? 'bg-[#10a37f] text-white'
          : 'border border-slate-300 bg-white text-[#05264c] hover:border-[#10a37f] hover:bg-[#10a37f] hover:text-white'
      }`;
    }
    return `inline-flex h-9 items-center whitespace-nowrap rounded-md px-3 text-[12px] font-semibold transition-colors duration-200 ${
      active
        ? 'bg-[#02509e] text-white'
        : 'border border-slate-300 bg-white text-[#05264c] hover:border-[#02509e] hover:bg-[#02509e] hover:text-white'
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-[0_10px_40px_-18px_rgba(5,38,76,0.28)]'
          : 'bg-white border-transparent shadow-[0_6px_24px_-14px_rgba(5,38,76,0.16)]'
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-4 h-[4.75rem] xl:h-[5.25rem]">
          <Link
            to="/"
            className="flex items-center gap-3 group min-w-0 max-w-[48%] xl:max-w-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02509e]"
          >
            {siteConfig.brand.logoUrl ? (
              <span className="relative shrink-0 rounded-full p-[3px] bg-gradient-to-br from-[#c68a18]/70 via-[#02509e]/25 to-[#05264c]/40 shadow-[0_4px_14px_-6px_rgba(5,38,76,0.45)]">
                <img
                  src={siteConfig.brand.logoUrl}
                  alt=""
                  className="h-10 w-10 xl:h-12 xl:w-12 object-contain rounded-full bg-white"
                />
              </span>
            ) : (
              <div className="h-10 w-10 xl:h-12 xl:w-12 rounded-full bg-[#05264c] text-white flex items-center justify-center font-serif font-bold text-xl shrink-0">
                A
              </div>
            )}
            <div className="flex flex-col text-left min-w-0 leading-none">
              <span className="font-serif font-semibold text-[1.05rem] xl:text-[1.3rem] text-[#05264c] tracking-[-0.02em] truncate transition-colors group-hover:text-[#02509e]">
                <span className="xl:hidden">Adeshina Colleges</span>
                <span className="hidden xl:inline">{siteConfig.institutionName}</span>
              </span>
              <span className="mt-1.5 xl:mt-2 inline-flex items-center gap-2 text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span className="h-px w-3 xl:w-4 bg-[#c68a18]" aria-hidden="true" />
                Share · Kwara
              </span>
            </div>
          </Link>

          {/* Full desktop nav from xl only — avoids crowding at 1024–1279 */}
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              {collegeLinks.map((college) => (
                <Link
                  key={college.id}
                  to={collegePath(college.id)}
                  className={collegeButtonClass(college.id)}
                >
                  {college.label}
                </Link>
              ))}
            </div>

            <span className="h-7 w-px bg-slate-200" aria-hidden="true" />

            <nav className="flex items-center" aria-label="Group navigation">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={navItemClass(isActive(item.path))}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <span className="h-7 w-px bg-slate-200" aria-hidden="true" />

            <Link
              to={siteConfig.portals.studentPortal.path}
              className="group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-md bg-[#05264c] px-3.5 text-[12px] font-semibold tracking-[0.03em] text-white ring-1 ring-[#c68a18]/60 transition-all duration-300 hover:bg-[#041830] hover:ring-[#e8c56a]"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#e8c56a] transition-transform duration-300 group-hover:scale-110" />
              <span>Portal</span>
            </Link>
          </div>

          <button
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-[#05264c] transition-colors hover:bg-[#f4f8fc]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white/98 backdrop-blur-sm max-h-[min(70vh,32rem)] overflow-y-auto">
          <Container size="wide" className="py-5 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Colleges
            </p>
            {colleges.map((c) => (
              <Link
                key={c.id}
                to={collegePath(c.id as CollegeId)}
                className="block rounded-md px-3 py-3 text-[16px] font-medium text-[#05264c] hover:bg-[#f0f7ff] hover:text-[#02509e]"
              >
                {c.shortName}
              </Link>
            ))}
            <div className="border-t border-slate-100 my-3" />
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-md px-3 py-3 text-[16px] font-medium ${
                  isActive(item.path)
                    ? 'text-[#02509e] bg-[#eef5fc]'
                    : 'text-[#05264c] hover:bg-[#f0f7ff] hover:text-[#02509e]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/portal"
              className="mt-4 flex items-center justify-center gap-2.5 rounded-md px-6 py-4 text-[14px] font-semibold tracking-[0.03em] text-white bg-[#05264c] ring-1 ring-[#c68a18]/55 hover:bg-[#041830] hover:ring-[#e8c56a] transition-all"
            >
              <GraduationCap className="w-4 h-4 text-[#e8c56a]" />
              Student Portal
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
