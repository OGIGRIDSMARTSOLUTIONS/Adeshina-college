import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
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

  const linkClass = (active: boolean) =>
    `relative type-nav px-3 py-2 transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:bg-[#e8c56a] after:transition-transform after:duration-300 ${
      active
        ? 'text-white after:scale-x-100'
        : 'text-white/75 after:scale-x-0 hover:text-white hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-[#041c36] transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <Container size="wide">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 xl:h-[5rem]">
          <Link
            to="/"
            className="group flex min-w-0 max-w-[58%] items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:max-w-none"
          >
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt=""
                className="h-9 w-9 shrink-0 object-contain bg-white p-0.5 xl:h-10 xl:w-10"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white font-serif text-lg font-bold text-[#05264c] xl:h-10 xl:w-10">
                A
              </div>
            )}
            <div className="flex min-w-0 flex-col text-left leading-none">
              <span className="type-brand truncate text-white transition-opacity group-hover:opacity-90">
                <span className="xl:hidden">{siteConfig.shortName}</span>
                <span className="hidden xl:inline">{siteConfig.institutionName}</span>
              </span>
              <span className="type-meta mt-1.5 text-white/45 xl:mt-2">Share · Kwara</span>
            </div>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            <nav className="flex items-center gap-0.5" aria-label="Group navigation">
              {navLinks.map((item) => (
                <Link key={item.path} to={item.path} className={linkClass(isActive(item.path))}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              to={siteConfig.portals.studentPortal.path}
              className="type-button-sm border border-white/25 px-3.5 py-2 text-white/85 transition-colors hover:border-white/50 hover:bg-white/5 hover:text-white"
            >
              Portal
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-white/10 xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto border-t border-white/10 bg-[#041c36] xl:hidden">
          <Container size="wide" className="space-y-1 py-5">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-3 text-[16px] font-medium ${
                  isActive(item.path) ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/#colleges"
              className="block px-3 py-3 text-[16px] font-medium text-white/80 hover:text-white"
            >
              Our colleges
            </Link>
            <Link
              to="/portal"
              className="mt-2 block border border-white/20 px-3 py-3 text-center text-[15px] font-semibold text-white/90 hover:bg-white/5"
            >
              Student Portal
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
