import { Link } from 'react-router-dom';
import { getCollegeFooterSections } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';

export function CollegeFooter() {
  const { college, collegeId, path } = useCollege();
  const sections = getCollegeFooterSections(collegeId);
  const year = new Date().getFullYear();
  const isHealth = collegeId === 'health-technology';
  const isEducation = collegeId === 'education';

  const accent = isHealth ? 'text-[#5ba8d9]' : isEducation ? 'text-[#c9a227]' : 'text-[#e8c56a]';
  const borderTop = isHealth
    ? 'border-t-[3px] border-[#3d8fd1]'
    : isEducation
      ? 'border-t-[3px] border-[#c9a227]'
      : '';

  return (
    <footer className={`relative z-20 mt-auto bg-[#041c36] text-white ${borderTop}`}>
      <Container size="wide" className="py-5 sm:py-8 lg:py-10">
        {/* Brand — compact on mobile */}
        <div className="flex items-center gap-3">
          <Link to={path()} className="inline-flex min-w-0 items-center gap-2.5">
            {siteConfig.brand.logoLightUrl ? (
              <img
                src={siteConfig.brand.logoLightUrl}
                alt=""
                className="h-9 w-9 shrink-0 object-contain bg-white p-0.5 sm:h-11 sm:w-11"
              />
            ) : null}
            <span className="min-w-0">
              <span className="block truncate font-serif text-[15px] font-semibold leading-snug text-white sm:text-lg">
                {college.shortName}
              </span>
              <span className="mt-0.5 block font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-white/50 sm:text-[11px]">
                {siteConfig.location} · Kwara
              </span>
            </span>
          </Link>
        </div>

        {/* Links — tight grid on mobile */}
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-7 sm:grid-cols-3 sm:gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3
                className={`font-sans text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${accent}`}
              >
                {section.title}
              </h3>
              <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="font-sans text-[13px] text-white/70 transition-colors hover:text-white sm:text-[14px]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h3
              className={`font-sans text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${accent}`}
            >
              Get in touch
            </h3>
            <ul className="mt-2 space-y-1.5 font-sans text-[13px] text-white/70 sm:mt-3 sm:space-y-2 sm:text-[14px]">
              <li>
                <Link to={path('contact')} className="transition-colors hover:text-white">
                  Contact & campus
                </Link>
              </li>
              <li>
                <a href="tel:08135131503" className="transition-colors hover:text-white">
                  0813 513 1503
                </a>
              </li>
              <li className="hidden sm:list-item">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-2.5 sm:py-3.5">
        <Container
          size="wide"
          className="flex flex-col items-center justify-between gap-1 text-center sm:flex-row sm:gap-2 sm:text-left"
        >
          <p className="font-sans text-[11px] text-white/50 sm:text-[13px]">
            &copy; {year} {college.shortName}
            <span className="hidden sm:inline">. Part of {siteConfig.institutionName}.</span>
          </p>
          {siteConfig.designerUrl ? (
            <a
              href={siteConfig.designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-sans text-[11px] font-semibold tracking-wide transition-colors hover:text-white sm:text-[13px] ${accent}`}
            >
              {siteConfig.designerCredit}
            </a>
          ) : (
            <p className={`font-sans text-[11px] font-semibold tracking-wide sm:text-[13px] ${accent}`}>
              {siteConfig.designerCredit}
            </p>
          )}
        </Container>
      </div>
    </footer>
  );
}
