import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const applyClass =
  'group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#041c36] via-[#0a2f54] to-[#3d8fd1] py-2.5 pl-6 pr-2.5 font-sans text-[14px] font-bold text-white shadow-[0_14px_28px_-12px_rgba(4,28,54,0.55)] transition-all duration-300 hover:-translate-y-1 hover:from-[#0a2f54] hover:via-[#3d8fd1] hover:to-[#5ba8d9] hover:shadow-[0_22px_40px_-12px_rgba(61,143,209,0.75)] hover:ring-2 hover:ring-[#f0c14b]/70 hover:ring-offset-2 hover:ring-offset-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d8fd1] before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:skew-x-[-20deg] before:bg-white/25 before:transition-transform before:duration-500 hover:before:translate-x-[280%]';

const checkClass =
  'relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0c14b] text-[#041c36] shadow-[0_4px_10px_-4px_rgba(4,28,54,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ffe08a] group-hover:shadow-[0_8px_16px_-4px_rgba(240,193,75,0.8)]';

interface HealthApplyButtonProps {
  to?: string;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

/** Signature Apply CTA — blue gradient + check. */
export function HealthApplyButton({
  to,
  children = 'Apply now',
  className = '',
  type = 'button',
  onClick,
}: HealthApplyButtonProps) {
  const content = (
    <>
      <span className="relative z-[1]">{children}</span>
      <span className={checkClass} aria-hidden="true">
        <Check className="h-4 w-4 stroke-[2.75]" />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${applyClass} ${className}`.trim()}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${applyClass} ${className}`.trim()}>
      {content}
    </button>
  );
}
