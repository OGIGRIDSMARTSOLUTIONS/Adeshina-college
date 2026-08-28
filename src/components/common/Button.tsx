import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  to,
  className = '',
  ...rest
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors px-5 py-2.5 rounded-md text-sm';
  
  const variantStyles = {
    primary: 'bg-adeshina-blue text-white hover:bg-adeshina-blue-dark',
    secondary: 'bg-navy text-white hover:bg-opacity-90',
    outline: 'border border-adeshina-blue text-adeshina-blue hover:bg-adeshina-blue hover:text-white',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...rest}>
      {children}
    </button>
  );
}
