interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  className = '',
  dark = false,
}: SectionHeadingProps) {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-10 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs uppercase tracking-widest font-bold mb-2 ${
            dark ? 'text-adeshina-blue-light' : 'text-adeshina-blue'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-text-onDark' : 'text-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-muted-onDark' : 'text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
