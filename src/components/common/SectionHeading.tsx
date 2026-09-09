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
          className={`type-label mb-2 ${
            dark ? 'text-adeshina-blue-light' : 'text-adeshina-blue'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`type-section ${
          dark ? 'text-text-onDark' : 'text-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`type-body-lg mt-3 ${
            dark ? 'text-muted-onDark' : 'text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
