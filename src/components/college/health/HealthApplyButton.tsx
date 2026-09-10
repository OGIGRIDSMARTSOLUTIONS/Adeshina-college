import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const applyClass =
  'group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#041c36] via-[#0a2f54] to-[#3d8fd1] py-2.5 pl-6 pr-2.5 font-sans text-[14px] font-bold text-white shadow-[0_14px_28px_-12px_rgba(4,28,54,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-12px_rgba(61,143,209,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d8fd1]';

const frameClass =
  'pointer-events-none absolute -inset-[5px] rounded-[0.95rem] border border-[#f0c14b]/80 [border-style:dashed]';

const checkClass =
  'relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0c14b] text-[#041c36] shadow-[0_4px_10px_-4px_rgba(4,28,54,0.45)] transition-transform duration-300 group-hover:scale-105';

interface HealthApplyButtonProps {
  to?: string;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

/** Signature Apply CTA — blue gradient + check (option 2). */
export function HealthApplyButton({
  to,
  children = 'Apply now',
  className = '',
  type = 'button',
  onClick,
}: HealthApplyButtonProps) {
  const content = (
    <>
      <span className={frameClass} aria-hidden="true" />
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
