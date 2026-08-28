import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, ArrowRight, Phone, MapPin } from 'lucide-react';
import { mainNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesDropdownOpen, setCollegesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle elevation change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollegesDropdownOpen(false);
  }, [location.pathname]);

  // Handle clicking outside desktop dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCollegesDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(8,20,38,0.08)] border-b border-slate-200/80'
          : 'bg-white border-b border-slate-200/90'
      }`}
    >
      {/* Institutional Top Notification & Utility Bar */}
      <div className="bg-[#081426] text-white text-[11px] sm:text-xs py-2 px-4 hidden lg:block border-b border-slate-800/80">
        <Container size="wide" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] uppercase tracking-wider border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Admissions Open
            </span>
            <span className="text-slate-300">
              {siteConfig.institutionName} · Share, Kwara State
            </span>
            <span className="text-slate-600">•</span>
            <a
              href="tel:08135131503"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-accent-gold" />
              <span>Admissions Desk: <strong className="text-white font-semibold">0813 513 1503</strong></span>
            </a>
          </div>

          <div className="flex items-center gap-6 text-slate-300 font-medium">
            <Link
              to="/contact"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-accent-gold" />
              <span>Campus Directions</span>
            </Link>
            <Link
              to={siteConfig.portals.studentPortal.path}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-accent-gold hover:text-white font-semibold"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{siteConfig.portals.studentPortal.label}</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Header Bar */}
      <Container size="wide">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Brand Logo & Title */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-adeshina-blue focus-visible:rounded-lg p-1 -ml-1"
            aria-label={`${siteConfig.institutionName} - Home`}
          >
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt={`${siteConfig.institutionName} Emblem`}
                className="h-11 w-11 sm:h-13 sm:w-13 object-contain shrink-0 rounded-lg transition-transform duration-200 group-hover:scale-105"
                width="52"
                height="52"
              />
            ) : (
              <div className="h-11 w-11 rounded-lg bg-navy flex items-center justify-center text-white font-serif font-black text-xl">
                A
              </div>
            )}
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-black text-base sm:text-lg lg:text-[19px] tracking-tight text-navy group-hover:text-adeshina-blue transition-colors">
                {siteConfig.institutionName}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-slate-500 font-bold">
                {siteConfig.location} · KWARA STATE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Pill Active Indicators */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {mainNavItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));

              if (hasChildren) {
                return (
                  <div
                    key={item.path}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setCollegesDropdownOpen(true)}
                    onMouseLeave={() => setCollegesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setCollegesDropdownOpen((prev) => !prev)}
                      aria-expanded={collegesDropdownOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                        isActive
                          ? 'text-adeshina-blue bg-blue-50/80 font-bold'
                          : 'text-slate-700 hover:text-adeshina-blue hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          collegesDropdownOpen ? 'rotate-180 text-adeshina-blue' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {collegesDropdownOpen && (
                      <div
                        role="menu"
                        className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 overflow-hidden">
                          <Link
                            to={item.path}
                            role="menuitem"
                            className="block px-4 py-2.5 text-xs uppercase tracking-wider font-bold text-adeshina-blue hover:bg-blue-50/70 border-b border-slate-100"
                          >
                            All Academic Colleges &rarr;
                          </Link>
                          {item.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              role="menuitem"
                              className={`block px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                                location.pathname === child.path
                                  ? 'bg-blue-50 text-adeshina-blue font-bold'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                    isActive
                      ? 'text-adeshina-blue bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-adeshina-blue hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={siteConfig.portals.studentPortal.path}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50 hover:border-adeshina-blue text-navy hover:text-adeshina-blue text-xs sm:text-sm font-bold transition-all shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-accent-gold" />
              <span>{siteConfig.portals.studentPortal.label}</span>
            </Link>

            <Link
              to={siteConfig.portals.applyNow.path}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-adeshina-blue text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>{siteConfig.portals.applyNow.label}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to={siteConfig.portals.applyNow.path}
              className="px-3.5 py-2 rounded-lg bg-adeshina-blue text-white text-xs font-bold shadow-xs hover:bg-navy transition-colors"
            >
              Apply Now
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-navy hover:text-adeshina-blue hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] z-40 bg-navy/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto p-6 space-y-6">
            <nav className="space-y-1" aria-label="Mobile Navigation">
              {mainNavItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));

                return (
                  <div key={item.path} className="border-b border-slate-100 last:border-0 pb-2">
                    <Link
                      to={item.path}
                      className={`block py-2.5 px-3 rounded-lg text-sm font-bold ${
                        isActive
                          ? 'bg-blue-50 text-adeshina-blue'
                          : 'text-navy hover:text-adeshina-blue hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="ml-3 pl-3 border-l-2 border-slate-200 my-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block py-2 px-3 rounded-lg text-xs font-medium ${
                              location.pathname === child.path
                                ? 'text-adeshina-blue font-bold bg-blue-50/50'
                                : 'text-slate-600 hover:text-navy'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                to={siteConfig.portals.studentPortal.path}
                className="w-full py-3 rounded-xl border border-slate-300 text-center text-xs font-bold text-navy hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-accent-gold" />
                <span>{siteConfig.portals.studentPortal.label}</span>
              </Link>
              <Link
                to={siteConfig.portals.applyNow.path}
                className="w-full py-3 rounded-xl bg-adeshina-blue text-center text-xs font-bold text-white shadow-md hover:bg-navy flex items-center justify-center gap-2"
              >
                <span>{siteConfig.portals.applyNow.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
