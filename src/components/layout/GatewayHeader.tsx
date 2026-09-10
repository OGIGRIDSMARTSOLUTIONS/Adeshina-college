import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Expand, Image as ImageIcon, Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

const overviewItems = [
  {
    id: 'gate',
    title: 'Main Gate',
    category: 'Our campus',
    image: '/images/education/campus-gate.jpg',
    description: 'The entrance to the Adeshina campus in Share, welcoming students, families and visitors.',
  },
  {
    id: 'health-campus',
    title: 'Health Technology Campus',
    category: 'Health sciences',
    image: '/images/health-technology/health-campus-1.jpg',
    description: 'A view of the health technology learning environment where practical professional training takes place.',
  },
  {
    id: 'health-campus-2',
    title: 'Health Technology Facilities',
    category: 'Learning environment',
    image: '/images/health-technology/health-campus-2.jpg',
    description: 'Campus facilities supporting practical learning, professional development and student experience.',
  },
  {
    id: 'campus-life',
    title: 'Campus Life',
    category: 'Student experience',
    image: '/images/campus/campus-life-1.jpg',
    description: 'A glimpse of the shared campus environment and the everyday life of the institution.',
  },
];

export function GatewayHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [overviewIndex, setOverviewIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const overviewCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = overviewItems[overviewIndex];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOverviewOpen(false);
    setLightboxOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (overviewCloseTimer.current) clearTimeout(overviewCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || lightboxOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowRight') changeOverview(1);
      if (event.key === 'ArrowLeft') changeOverview(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, overviewIndex]);

  const openOverview = () => {
    if (overviewCloseTimer.current) clearTimeout(overviewCloseTimer.current);
    setOverviewOpen(true);
  };

  const closeOverviewSoon = () => {
    if (overviewCloseTimer.current) clearTimeout(overviewCloseTimer.current);
    overviewCloseTimer.current = setTimeout(() => setOverviewOpen(false), 180);
  };

  const selectOverview = (index: number) => {
    setOverviewIndex(index);
    setPan({ x: 0, y: 0 });
  };

  const changeOverview = (direction: number) => {
    const next = (overviewIndex + direction + overviewItems.length) % overviewItems.length;
    selectOverview(next);
  };

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setPan({ x: x * 4, y: y * 4 });
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const linkClass = (active: boolean) =>
    `relative type-nav px-3 py-2 transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:bg-[#e8c56a] after:transition-transform after:duration-300 ${
      active
        ? 'text-white after:scale-x-100'
        : 'text-white/75 after:scale-x-0 hover:text-white hover:after:scale-x-100'
    }`;

  const overviewPanel = (mobile = false) => (
    <div
      id={mobile ? 'overview-mobile-panel' : 'overview-panel'}
      role="dialog"
      aria-label="Adeshina campus overview"
      onMouseEnter={!mobile ? openOverview : undefined}
      onMouseLeave={!mobile ? closeOverviewSoon : undefined}
      className={mobile
        ? 'relative overflow-hidden border-t border-white/10 bg-[#071f3a]'
        : 'absolute left-0 right-0 top-full z-50 hidden overflow-hidden border-b border-[#d7b35a]/30 bg-[#071f3a] shadow-[0_28px_70px_-30px_rgba(2,20,38,.75)] backdrop-blur-xl xl:block'}
      style={{
        backgroundImage: 'radial-gradient(circle at 12% 0%, rgba(232,197,106,.14), transparent 30%), radial-gradient(circle at 88% 10%, rgba(71,151,210,.14), transparent 28%), linear-gradient(135deg, #071f3a 0%, #05264c 55%, #03182c 100%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-16 h-56 w-56 rounded-full border border-[#e8c56a]/10" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full border border-sky-300/10" />
      </div>
      <Container size="wide" className={`relative z-10 ${mobile ? 'py-4' : 'py-5 sm:py-6'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">
              <ImageIcon className="h-4 w-4" /> A glimpse of Adeshina
            </div>
            <h2 className="mt-1 font-serif text-xl font-semibold tracking-[-.025em] text-white sm:text-2xl">Our Campus · Our People · Our Purpose</h2>
          </div>
          {!mobile && (
            <button
              type="button"
              onClick={() => setOverviewOpen(false)}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[#e8c56a] hover:bg-[#e8c56a] hover:text-[#05264c] sm:flex"
              aria-label="Close overview"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {overviewItems.map((item, index) => {
              const active = overviewIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => !mobile && selectOverview(index)}
                  onFocus={() => selectOverview(index)}
                  onClick={() => selectOverview(index)}
                  className={`group relative w-[104px] shrink-0 overflow-hidden rounded-lg border text-left transition-all duration-300 sm:w-[116px] ${active ? 'border-[#e8c56a] shadow-[0_8px_25px_-12px_rgba(232,197,106,.7)] ring-1 ring-[#e8c56a]/50' : 'border-white/10 hover:border-white/25'}`}
                  aria-pressed={active}
                >
                  <div className="aspect-[1.65] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`h-full w-full object-cover transition duration-500 ${active ? 'scale-105' : 'group-hover:scale-105'}`}
                    />
                  </div>
                  <div className={`border-t px-2 py-1.5 ${active ? 'bg-[#e8c56a] text-[#05264c]' : 'bg-[#0c2b4c]'}`}>
                    <span className={`block truncate font-serif text-xs font-semibold ${active ? 'text-[#05264c]' : 'text-white/90'}`}>{item.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="relative mt-3 overflow-hidden rounded-2xl bg-[#05264c]"
          >
            <div
              className="relative h-[280px] overflow-hidden sm:h-[350px] lg:h-[390px]"
              onPointerMove={handleImagePointerMove}
              onPointerLeave={() => setPan({ x: 0, y: 0 })}
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
                style={{ transform: `scale(1.08) translate3d(${-pan.x}%, ${-pan.y}%, 0)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031b32] via-[#031b32]/15 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-white/80 backdrop-blur-sm">
                Move across image to explore
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[10px] font-bold uppercase tracking-[.1em] text-[#05264c] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e8c56a]"
              >
                <Expand className="h-3.5 w-3.5" /> Full image
              </button>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">{activeItem.category}</span>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-white sm:text-3xl">{activeItem.title}</h3>
                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-white/75 sm:text-sm">{activeItem.description}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start lg:self-end">
                    <button type="button" onClick={() => changeOverview(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-[#05264c]" aria-label="Previous photograph">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="min-w-[56px] text-center text-[10px] font-bold tracking-[.15em] text-white/70">{String(overviewIndex + 1).padStart(2, '0')} / {String(overviewItems.length).padStart(2, '0')}</span>
                    <button type="button" onClick={() => changeOverview(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-[#05264c]" aria-label="Next photograph">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xs italic text-white/55">Tradition of excellence. A future of possibilities.</p>
          <Link to="/about" onClick={() => setOverviewOpen(false)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#e8c56a] hover:text-white">Explore more about our school <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </Container>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 relative border-b border-white/10 bg-[#041c36] transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <Container size="wide">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 xl:h-[5rem]">
          <Link to="/" className="group flex min-w-0 max-w-[58%] items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:max-w-none">
            {siteConfig.brand.logoUrl ? (
              <img src={siteConfig.brand.logoUrl} alt="" className="h-9 w-9 shrink-0 bg-white p-0.5 object-contain xl:h-10 xl:w-10" />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white font-serif text-lg font-bold text-[#05264c] xl:h-10 xl:w-10">A</div>
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
              <button type="button" onMouseEnter={openOverview} onFocus={openOverview} onClick={() => setOverviewOpen((open) => !open)} className={`${linkClass(false)} inline-flex items-center gap-1.5`} aria-expanded={overviewOpen} aria-controls="overview-panel">
                Overview
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${overviewOpen ? 'rotate-180' : ''}`} />
              </button>
              {navLinks.map((item) => (
                <Link key={item.path} to={item.path} className={linkClass(isActive(item.path))}>{item.label}</Link>
              ))}
            </nav>
            <Link to={siteConfig.portals.studentPortal.path} className="type-button-sm border border-white/25 px-3.5 py-2 text-white/85 transition-colors hover:border-white/50 hover:bg-white/5 hover:text-white">Portal</Link>
            <Link to={siteConfig.portals.applyNow.path} className="group inline-flex items-center gap-2 rounded-full bg-[#e8c56a] px-4 py-2.5 text-xs font-extrabold text-[#05264c] shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-white">Apply Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>
          </div>

          <button type="button" className="inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-white/10 xl:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {overviewOpen && overviewPanel(false)}

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 bg-[#041c36] xl:hidden">
          <Container size="wide" className="space-y-1 py-4">
            <button type="button" onClick={() => setOverviewOpen((open) => !open)} className="flex w-full items-center justify-between px-3 py-3 text-left text-[16px] font-semibold text-white/90 hover:text-white" aria-expanded={overviewOpen} aria-controls="overview-mobile-panel">
              <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-[#e8c56a]" /> Overview</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${overviewOpen ? 'rotate-180 text-[#e8c56a]' : ''}`} />
            </button>
            {overviewOpen && overviewPanel(true)}
            {navLinks.map((item) => (
              <Link key={item.path} to={item.path} className={`block px-3 py-3 text-[16px] font-medium ${isActive(item.path) ? 'text-white' : 'text-white/80 hover:text-white'}`}>{item.label}</Link>
            ))}
            <Link to="/#colleges" className="block px-3 py-3 text-[16px] font-medium text-white/80 hover:text-white">Our colleges</Link>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/portal" className="border border-white/20 px-3 py-3 text-center text-[14px] font-semibold text-white/90 hover:bg-white/5">Student Portal</Link>
              <Link to={siteConfig.portals.applyNow.path} className="inline-flex items-center justify-center gap-2 bg-[#e8c56a] px-3 py-3 text-center text-[14px] font-extrabold text-[#05264c] hover:bg-white">Apply Now <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Container>
        </div>
      )}

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#021322]/95 p-3 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-label={`Full image: ${activeItem.title}`}>
          <div className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#031b32] shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[.2em] text-[#e8c56a]">{activeItem.category}</span>
                <h2 className="font-serif text-xl text-white sm:text-2xl">{activeItem.title}</h2>
              </div>
              <button type="button" onClick={() => setLightboxOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#05264c]" aria-label="Close full image"><X className="h-5 w-5" /></button>
            </div>
            <div className="relative min-h-0 flex-1 p-3 sm:p-6">
              <img src={activeItem.image} alt={activeItem.title} className="h-full w-full object-contain" />
              <button type="button" onClick={() => changeOverview(-1)} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#031b32]/70 text-white backdrop-blur transition hover:bg-white hover:text-[#05264c] sm:left-7" aria-label="Previous photograph"><ArrowLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => changeOverview(1)} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#031b32]/70 text-white backdrop-blur transition hover:bg-white hover:text-[#05264c] sm:right-7" aria-label="Next photograph"><ArrowRight className="h-5 w-5" /></button>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-xs text-white/60 sm:px-6">
              <p className="hidden sm:block">Use the arrows or keyboard ← → to explore the campus.</p>
              <span className="ml-auto font-bold tracking-[.15em]">{String(overviewIndex + 1).padStart(2, '0')} / {String(overviewItems.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
