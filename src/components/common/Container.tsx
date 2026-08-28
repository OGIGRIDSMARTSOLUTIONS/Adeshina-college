import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  id?: string;
}

export function Container({
  children,
  size = 'default',
  className = '',
  id,
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-8xl',
    full: 'max-w-full',
  }[size];

  return (
    <div
      id={id}
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
    >
      {children}
    </div>
  );
}
