import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Stethoscope, BookOpen, GraduationCap } from 'lucide-react';
import { getCollegeNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { colleges } from '@/data/colleges';
import { useCollege } from '@/context/CollegeContext';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { HealthApplyButton } from '@/components/college/health/HealthApplyButton';
import { CollegeMobileNav } from '@/components/layout/CollegeMobileNav';
import { Container } from '@/components/common/Container';

/** Pixels of scroll after the hero ends to finish expanding to full width (desktop). */
const MORPH_RANGE = 220;
const DESKTOP_MQ = '(min-width: 1024px)';

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** Health Technology header — sticky normal on mobile, floating morph on desktop. */
export function HealthCollegeHeader() {
  const { collegeId, path } = useCollege();
  const navItems = getCollegeNavItems(collegeId).filter((item) => item.label !== 'Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const otherColleges = colleges.filter((c) => c.id !== collegeId);

  useEffect(() => {
    let frame = 0;
    let lastT = -1;
    const mq = window.matchMedia(DESKTOP_MQ);

    const applyMorph = (t: number) => {
      const shell = shellRef.current;
      const bar = barRef.current;
      if (!shell || !bar) return;

      const eased = smoothstep(t);
      if (Math.abs(eased - lastT) < 0.0008) return;
      lastT = eased;

      const insetX = 16 * (1 - eased);
      const insetT = 12 * (1 - eased);
      const radius = 999 * (1 - eased);

      shell.style.paddingLeft = `${insetX}px`;
      shell.style.paddingRight = `${insetX}px`;
      shell.style.paddingTop = `${insetT}px`;

      bar.style.borderRadius = `${radius}px`;
      bar.style.backgroundColor = `rgba(255, 255, 255, ${0.75 + eased * 0.2})`;
      bar.style.borderColor =
        eased > 0.85 ? 'rgba(5, 30, 57, 0.12)' : 'rgba(255, 255, 255, 0.8)';
      bar.style.borderLeftWidth = eased > 0.92 ? '0px' : '1px';
      bar.style.borderRightWidth = eased > 0.92 ? '0px' : '1px';
      bar.style.borderTopWidth = eased > 0.92 ? '0px' : '1px';
      bar.style.boxShadow =
        eased > 0.45
          ? `0 12px 40px -18px rgba(5, 30, 57, ${0.28 + eased * 0.1})`
          : '0 22px 55px -22px rgba(5, 30, 57, 0.5)';
    };

    const update = () => {
      frame = 0;
      if (!mq.matches) {
        lastT = -1;
        return;
      }

      const hero = document.querySelector<HTMLElement>('[data-college-hero]');
      let t = 0;

      if (!hero) {
        t = window.scrollY > 24 ? 1 : 0;
      } else {
        const bottom = hero.getBoundingClientRect().bottom;
        t = bottom > 0 ? 0 : Math.min(1, -bottom / MORPH_RANGE);
      }

      applyMorph(t);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    mq.addEventListener('change', onScroll);
    lastT = -1;
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

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

  const mobileNav = (
    <CollegeMobileNav
      open={mobileMenuOpen}
      collegeId={collegeId}
      collegeTitle="Adeshina College of Health Technology"
      navItems={navItems}
      applyHref={path('apply')}
      isActive={isActive}
      onClose={() => setMobileMenuOpen(false)}
      theme="health"
      applySlot={
        <HealthApplyButton to={path('apply')} className="w-full justify-between">
          Apply Now
        </HealthApplyButton>
      }
    />
  );

  return (
    <>
      {/* Mobile / tablet — normal sticky header */}
      <header className="sticky top-0 z-50 border-b border-[#041c36]/10 bg-white lg:hidden">
        <Container size="wide" className="flex min-h-[4.5rem] items-center justify-between gap-3 py-2.5">
          <Link to={path()} className="flex min-w-0 items-center gap-2.5">
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt=""
                className="h-10 w-10 shrink-0 object-contain"
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#041c36] font-serif text-lg font-bold text-white">
                A
              </span>
            )}
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-sans text-[15px] font-bold tracking-[-0.02em] text-[#041c36]">
                Adeshina
              </span>
              <span className="truncate font-sans text-[12px] font-semibold text-[#041c36]/70">
                College of Health Technology
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              to={path('apply')}
              className="inline-flex h-10 items-center bg-[#041c36] px-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#2a73ad]"
            >
              Apply
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-[#041c36] transition-colors hover:bg-[#eaf5fc]"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Desktop — floating morph header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden lg:block">
        <div
          ref={shellRef}
          className="pointer-events-auto mx-auto w-full max-w-none will-change-[padding]"
          style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12 }}
        >
          <div
            ref={barRef}
            className="flex min-h-[4.75rem] items-center justify-between gap-5 border border-b px-6 py-3.5 backdrop-blur-xl will-change-[border-radius,background-color,box-shadow] lg:px-8"
            style={{
              borderRadius: 999,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 22px 55px -22px rgba(5, 30, 57, 0.5)',
            }}
          >
            <Link
              to={path()}
              className="flex min-w-0 max-w-[40%] items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d8fd1]"
            >
              {siteConfig.brand.logoUrl ? (
                <img
                  src={siteConfig.brand.logoUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full bg-white object-contain ring-1 ring-[#051e39]/12"
                />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3d8fd1] font-serif text-xl font-bold text-[#051e39]">
                  A
                </span>
              )}
              <span className="min-w-0">
                <span className="block font-serif text-[1.05rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#051e39] xl:text-[1.15rem]">
                  Adeshina College of Health Technology
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

            <div className="flex shrink-0 items-center gap-2.5">
              <div className="relative" ref={dropdownRef}>
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
                    {otherColleges.map((c) => {
                      const id = c.id as CollegeId;
                      const Icon = id === 'health-technology' ? Stethoscope : BookOpen;
                      return (
                        <Link
                          key={c.id}
                          to={collegePath(id)}
                          className="mx-2 flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#f7f3ea]"
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
                      All Colleges
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/portal"
                className="inline-flex h-11 items-center gap-1.5 rounded-full border-2 border-[#051e39] bg-white px-4 font-sans text-[13px] font-bold text-[#051e39] transition-colors hover:bg-[#051e39] hover:text-white"
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
        </div>
      </header>

      {mobileNav}
    </>
  );
}
