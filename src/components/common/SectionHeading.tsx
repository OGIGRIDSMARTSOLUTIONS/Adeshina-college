interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align];

  return (
    <div className={`max-w-3xl mb-8 ${alignmentClass} ${className}`}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
