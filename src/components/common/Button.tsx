import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline' | 'text' | 'ghost-dark' | 'outline-light';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    to?: never;
    href?: never;
  };

type ButtonAsInternalLink = BaseButtonProps & {
  to: string;
  href?: never;
  replace?: boolean;
};

type ButtonAsExternalLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    to?: never;
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsInternalLink | ButtonAsExternalLink;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[34px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px]',
  }[size];

  const variantStyles = {
    primary:
      'bg-navy text-white hover:bg-adeshina-blue active:bg-adeshina-blue-dark hover:shadow-md transition-all duration-200 focus-visible:ring-adeshina-blue shadow-sm',
    secondary:
      'bg-adeshina-blue text-white hover:bg-navy active:bg-navy-dark hover:shadow-md transition-all duration-200 focus-visible:ring-adeshina-blue shadow-sm',
    white:
      'bg-white text-navy hover:bg-adeshina-blue hover:text-white active:bg-adeshina-blue-dark hover:shadow-lg transition-all duration-200 focus-visible:ring-white shadow-md',
    outline:
      'border-2 border-adeshina-blue text-adeshina-blue bg-transparent hover:bg-adeshina-blue hover:text-white focus-visible:ring-adeshina-blue',
    'outline-light':
      'border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-navy focus-visible:ring-white',
    text:
      'text-adeshina-blue hover:text-adeshina-blue-dark underline-offset-4 hover:underline p-0 min-h-0 bg-transparent',
    'ghost-dark':
      'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-white/50 bg-transparent',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim();

  if ('to' in props && props.to) {
    const { to, replace, ...rest } = props;
    return (
      <Link to={to} replace={replace} className={combinedClasses} {...rest}>
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props;
    const defaultRel = target === '_blank' ? 'noopener noreferrer' : rel;
    return (
      <a
        href={href}
        target={target}
        rel={defaultRel}
        className={combinedClasses}
        {...rest}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={buttonProps.type || 'button'}
      className={combinedClasses}
      {...buttonProps}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
}
