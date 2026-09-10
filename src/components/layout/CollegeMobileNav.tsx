import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ChevronDown,
  GraduationCap,
  Stethoscope,
  BookOpen,
  LayoutGrid,
  ArrowRight,
  X,
} from 'lucide-react';
import { colleges } from '@/data/colleges';
import { collegePath, CollegeId } from '@/lib/collegePaths';
import { NavItem } from '@/types/navigation';
import { siteConfig } from '@/data/siteConfig';

type CollegeMobileTheme = 'education' | 'health';

interface CollegeMobileNavProps {
  open: boolean;
  collegeId: CollegeId;
  collegeTitle: string;
  navItems: NavItem[];
  applyHref: string;
  isActive: (path: string) => boolean;
  onClose: () => void;
  theme: CollegeMobileTheme;
  applySlot?: React.ReactNode;
}

const themes = {
  education: {
    panel: 'bg-[#f4f8fc]',
    rail: 'bg-[#c9a227]',
    title: 'text-[#0c2340]',
    muted: 'text-[#5a6570]',
    link: 'text-[#0c2340]',
    linkActive: 'text-[#a8861a]',
    linkHover: 'hover:bg-[#0c2340]/[0.04]',
    portal:
      'border border-[#0c2340]/15 bg-[#0c2340] text-white hover:bg-[#1e6fa8]',
    morePanel: 'bg-white/80 ring-1 ring-[#0c2340]/08',
    moreLink: 'text-[#0c2340] hover:bg-[#eaf4fb]',
    apply:
      'inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#dfc04a] via-[#c9a227] to-[#a8861a] px-4 py-3.5 font-sans text-[15px] font-bold text-[#0c2340] shadow-[0_14px_28px_-14px_rgba(201,162,39,0.7)]',
    close: 'text-[#0c2340] hover:bg-[#0c2340]/[0.06]',
    footer: 'border-[#0c2340]/10 bg-[#f4f8fc]/95',
  },
  health: {
    panel: 'bg-[#f7f3ea]',
    rail: 'bg-[#3d8fd1]',
    title: 'text-[#051e39]',
    muted: 'text-[#64748b]',
    link: 'text-[#051e39]',
    linkActive: 'text-[#2a73ad]',
    linkHover: 'hover:bg-[#051e39]/[0.04]',
    portal:
      'border border-[#0f7a5f]/20 bg-[#0f7a5f] text-white hover:bg-[#0a5f4a]',
    morePanel: 'bg-white/80 ring-1 ring-[#051e39]/08',
    moreLink: 'text-[#051e39] hover:bg-[#eaf5fc]',
    apply:
      'inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#041c36] px-4 py-3.5 font-sans text-[15px] font-bold text-white',
    close: 'text-[#051e39] hover:bg-[#051e39]/[0.06]',
    footer: 'border-[#051e39]/10 bg-[#f7f3ea]/95',
  },
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

/** Shared college mobile drawer — slides in from the right. */
export function CollegeMobileNav({
  open,
  collegeId,
  collegeTitle,
  navItems,
  applyHref,
  isActive,
  onClose,
  theme,
  applySlot,
}: CollegeMobileNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = themes[theme];
  const otherColleges = colleges.filter((c) => c.id !== collegeId);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setMoreOpen(false);
      }}
    >
      {open ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="College menu">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[#071828]/45 backdrop-blur-[2px]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            onClick={onClose}
          />

          <motion.aside
            className={`absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col shadow-[-24px_0_60px_-28px_rgba(7,24,40,0.55)] ${t.panel}`}
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 380, damping: 34, mass: 0.85 }
            }
          >
            <span className={`absolute inset-y-0 left-0 w-1 ${t.rail}`} aria-hidden="true" />

            <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-5">
              <div className="flex min-w-0 items-center gap-3">
                {siteConfig.brand.logoUrl ? (
                  <img
                    src={siteConfig.brand.logoUrl}
                    alt=""
                    className="h-11 w-11 shrink-0 rounded-full object-contain ring-1 ring-black/5"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] ${t.muted}`}>
                    Menu
                  </p>
                  <p className={`mt-0.5 truncate font-serif text-[1.05rem] font-semibold leading-snug ${t.title}`}>
                    {collegeTitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${t.close}`}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4"
              aria-label="Mobile college navigation"
            >
              {navItems.map((item, index) => {
                const active = isActive(item.path);
                return (
                  <motion.div
                    key={item.path}
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.35, ease }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`relative flex items-center rounded-2xl px-4 py-3.5 font-sans text-[16px] font-semibold transition-colors ${
                        active ? t.linkActive : t.link
                      } ${t.linkHover}`}
                    >
                      {active ? (
                        <span
                          className={`absolute left-1.5 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full ${t.rail}`}
                          aria-hidden="true"
                        />
                      ) : null}
                      {item.label === 'Contact' ? 'Support' : item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navItems.length * 0.04, duration: 0.35, ease }}
                className="pt-2"
              >
                <Link
                  to="/portal"
                  onClick={onClose}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 font-sans text-[15px] font-semibold transition-colors ${t.portal}`}
                >
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Portal
                </Link>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.09 + navItems.length * 0.04, duration: 0.35, ease }}
                className="pt-1"
              >
                <button
                  type="button"
                  onClick={() => setMoreOpen((o) => !o)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 font-sans text-[16px] font-semibold transition-colors ${t.link} ${t.linkHover}`}
                  aria-expanded={moreOpen}
                >
                  More
                  <ChevronDown
                    className={`h-4 w-4 opacity-50 transition-transform duration-300 ${
                      moreOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {moreOpen ? (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-1 space-y-1 rounded-2xl p-2 ${t.morePanel}`}>
                        {otherColleges.map((c) => {
                          const Icon = c.id === 'health-technology' ? Stethoscope : BookOpen;
                          return (
                            <Link
                              key={c.id}
                              to={collegePath(c.id as CollegeId)}
                              onClick={onClose}
                              className={`flex items-center gap-3 rounded-xl px-3 py-3 font-sans text-[14px] font-semibold ${t.moreLink}`}
                            >
                              <Icon className="h-4 w-4 shrink-0 opacity-70" />
                              {c.shortName}
                            </Link>
                          );
                        })}
                        <Link
                          to="/"
                          onClick={onClose}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 font-sans text-[14px] font-semibold ${t.moreLink}`}
                        >
                          <LayoutGrid className="h-4 w-4 shrink-0 opacity-70" />
                          All Colleges
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </nav>

            <div className={`border-t px-4 py-4 backdrop-blur-sm ${t.footer}`}>
              {applySlot ?? (
                <Link to={applyHref} className={t.apply} onClick={onClose}>
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
