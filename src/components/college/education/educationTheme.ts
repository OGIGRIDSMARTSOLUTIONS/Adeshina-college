/** College of Education palette — institutional navy + gold + light blue. */
export const ed = {
  ink: '#0c2340',
  inkDeep: '#071828',
  paper: '#eaf4fb',
  mist: '#d7e8f5',
  teal: '#3d8fd1',
  tealSoft: '#d4ebf8',
  gold: '#c9a227',
  goldDeep: '#a8861a',
  muted: '#5a6570',
  white: '#ffffff',
} as const;

/** Decorated gold Apply CTA. */
export const edBtnGold =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-[#dfc04a] via-[#c9a227] to-[#a8861a] px-7 py-3.5 font-sans text-[14px] font-bold text-[#0c2340] shadow-[0_14px_32px_-12px_rgba(201,162,39,0.65),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(201,162,39,0.75)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:skew-x-[-20deg] before:bg-white/25 before:transition-transform before:duration-500 hover:before:translate-x-[220%]';

/** @deprecated Prefer edBtnGold */
export const edBtnCoral = edBtnGold;

/** Decorated ink / sky outline secondary (View programmes). */
export const edBtnInk =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-[#3d8fd1]/35 bg-white px-7 py-3.5 font-sans text-[14px] font-bold text-[#0c2340] shadow-[0_12px_28px_-16px_rgba(61,143,209,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3d8fd1] hover:bg-[#eaf4fb] hover:text-[#1e6fa8] after:pointer-events-none after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[#c9a227] after:transition-transform after:duration-300 hover:after:scale-x-100';
