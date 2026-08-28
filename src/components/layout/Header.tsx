import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, ArrowRight } from 'lucide-react';
import { mainNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesDropdownOpen, setCollegesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle elevation change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
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
      className={`sticky top-0 z-50 w-full bg-surface transition-all duration-200 ${
        isScrolled
          ? 'shadow-header border-b border-border/80 backdrop-blur-md bg-surface/95'
          : 'border-b border-border'
      }`}
    >
      {/* Institutional top notification/utility bar */}
      <div className="bg-[#081426] text-white text-xs py-2 px-4 hidden lg:block border-b border-slate-800">
        <Container size="wide" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-slate-200">
              {siteConfig.institutionName} · {siteConfig.location}, Kwara State
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              Admissions Desk: <a href="tel:08135131503" className="hover:text-white font-medium">0813 513 1503</a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <Link
              to="/contact"
              className="hover:text-white transition-colors"
            >
              Campus Directions
            </Link>
            <Link
              to={siteConfig.portals.studentPortal.path}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent-gold" />
              <span>{siteConfig.portals.studentPortal.label}</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Header Container */}
      <Container size="wide">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Brand / Logo */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-adeshina-blue focus-visible:rounded-md p-1 -ml-1"
            aria-label={`${siteConfig.institutionName} - Home`}
          >
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt={`${siteConfig.institutionName} Emblem`}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0 rounded-md transition-transform duration-200 group-hover:scale-105"
                width="48"
                height="48"
              />
            ) : (
              <div className="h-11 w-11 rounded-md bg-adeshina-blue flex items-center justify-center text-white font-black text-lg">
                A
              </div>
            )}
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-text group-hover:text-adeshina-blue transition-colors">
                {siteConfig.institutionName}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-medium">
                {siteConfig.location}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
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
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                        isActive
                          ? 'text-adeshina-blue bg-blue-50/60'
                          : 'text-text-secondary hover:text-adeshina-blue hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          collegesDropdownOpen ? 'rotate-180 text-adeshina-blue' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {collegesDropdownOpen && (
                      <div
                        role="menu"
                        className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="bg-surface rounded-lg shadow-dropdown border border-border py-2">
                          <Link
                            to={item.path}
                            role="menuitem"
                            className="block px-4 py-2.5 text-xs uppercase tracking-wider font-bold text-adeshina-blue hover:bg-blue-50/70 border-b border-border-subtle"
                          >
                            All Academic Colleges &rarr;
                          </Link>
                          {item.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              role="menuitem"
                              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                                location.pathname === child.path
                                  ? 'bg-blue-50 text-adeshina-blue font-semibold'
                                  : 'text-text hover:bg-slate-50 hover:text-adeshina-blue'
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
                  className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? 'text-adeshina-blue bg-blue-50/60 font-bold'
                      : 'text-text-secondary hover:text-adeshina-blue hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              to={siteConfig.portals.studentPortal.path}
              variant="outline"
              size="sm"
              leftIcon={<GraduationCap className="w-4 h-4" />}
            >
              {siteConfig.portals.studentPortal.label}
            </Button>
            <Button
              to={siteConfig.portals.applyNow.path}
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {siteConfig.portals.applyNow.label}
            </Button>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              to={siteConfig.portals.applyNow.path}
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              Apply
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 text-text hover:text-adeshina-blue hover:bg-slate-100 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-adeshina-blue"
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

      {/* Mobile Drawer / Backdrop Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] z-40 bg-navy-dark/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface border-b border-border shadow-dropdown max-h-[calc(100vh-80px)] overflow-y-auto p-6 space-y-6">
            {/* Mobile Nav Links */}
            <nav className="space-y-1.5" aria-label="Mobile Navigation">
              {mainNavItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));

                return (
                  <div key={item.path} className="border-b border-border-subtle last:border-0 pb-2">
                    <Link
                      to={item.path}
                      className={`block py-2.5 px-3 rounded-md text-base font-bold ${
                        isActive
                          ? 'bg-blue-50 text-adeshina-blue'
                          : 'text-text hover:text-adeshina-blue hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="ml-3 pl-3 border-l-2 border-border my-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block py-2 px-3 rounded-md text-sm font-medium ${
                              location.pathname === child.path
                                ? 'text-adeshina-blue font-bold bg-blue-50/50'
                                : 'text-text-secondary hover:text-adeshina-blue'
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

            {/* Mobile Action CTAs */}
            <div className="pt-2 border-t border-border flex flex-col gap-3">
              <Button
                to={siteConfig.portals.studentPortal.path}
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<GraduationCap className="w-4 h-4" />}
              >
                {siteConfig.portals.studentPortal.label}
              </Button>
              <Button
                to={siteConfig.portals.applyNow.path}
                variant="primary"
                size="md"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {siteConfig.portals.applyNow.label}
              </Button>
            </div>

            {/* Institutional Meta */}
            <div className="text-center text-xs text-muted pt-4 border-t border-border-subtle">
              <p className="font-semibold text-text-secondary">{siteConfig.institutionName}</p>
              <p>{siteConfig.fullLocation}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
