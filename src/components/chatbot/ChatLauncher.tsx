import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useOptionalCollege } from '@/context/CollegeContext';

function AssistantMark({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <path
        d="M8.5 7.5h15a3.5 3.5 0 0 1 3.5 3.5v8a3.5 3.5 0 0 1-3.5 3.5H16l-4.8 3.4c-.7.5-1.7 0-1.7-.85V22.5H8.5A3.5 3.5 0 0 1 5 19V11a3.5 3.5 0 0 1 3.5-3.5Z"
        fill="currentColor"
        opacity="0.95"
      />
      <circle cx="12.2" cy="14.2" r="1.35" fill="#05264c" />
      <circle cx="16" cy="14.2" r="1.35" fill="#05264c" />
      <circle cx="19.8" cy="14.2" r="1.35" fill="#05264c" />
      <circle cx="24.8" cy="7.2" r="2.4" fill={accent} />
    </svg>
  );
}

export function ChatLauncher() {
  const college = useOptionalCollege();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const isHealth = college?.collegeId === 'health-technology';
  const isEducation = college?.collegeId === 'education';

  const accent = isHealth ? '#10a37f' : isEducation ? '#02509e' : '#e8c56a';
  const accentSoft = isHealth
    ? 'bg-[#10a37f]/15 text-[#0a7a5c]'
    : isEducation
      ? 'bg-[#02509e]/10 text-[#02509e]'
      : 'bg-[#c68a18]/15 text-[#9a6b12]';
  const title = isHealth
    ? 'Health Technology Assistant'
    : isEducation
      ? 'College of Education Assistant'
      : 'Adeshina Assistant';

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="pointer-events-none fixed bottom-20 right-5 z-[60] flex flex-col items-end gap-3 print:hidden sm:bottom-24 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={title}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[min(100vw-2.5rem,22rem)] origin-bottom-right overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_48px_-18px_rgba(5,38,76,0.45)]"
          >
            <div className="relative overflow-hidden bg-[#05264c] px-5 pb-5 pt-4 text-white">
              <div
                className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full opacity-30"
                style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20"
                    style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
                  >
                    <Sparkles className="h-5 w-5" style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="font-serif text-[17px] font-semibold leading-tight tracking-tight">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/70">Campus help · coming soon</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 bg-[#f8fafc] px-5 py-5">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${accentSoft}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                  Preview
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  Ask about programmes, admissions, or campus services. Full chat will connect here next.
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3.5 py-3 text-[13px] text-slate-400">
                Message Adeshina…
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? 'Close campus assistant' : 'Open campus assistant'}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-[#05264c] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c56a] focus-visible:ring-offset-2"
        style={{
          boxShadow: `0 18px 40px -14px rgba(5,38,76,0.6), 0 0 0 2px ${accent}40`,
        }}
      >
        <span
          className="pointer-events-none absolute inset-[3px] rounded-[0.95rem] border border-white/10"
          aria-hidden="true"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
            transition={{ duration: 0.16 }}
            className="relative flex"
          >
            {open ? <X className="h-6 w-6" /> : <AssistantMark accent={accent} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
