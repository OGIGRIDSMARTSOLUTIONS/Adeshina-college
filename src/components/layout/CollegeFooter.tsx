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

  if (isHealth) {
    return (
      <footer className="relative z-20 mt-auto border-t-[4px] border-[#3d8fd1] bg-[#041c36] text-white">
        <Container size="wide" className="py-7 sm:py-8">
          {/* Link columns — grouped toward centre */}
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5ba8d9]">
                  {section.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="font-sans text-[15px] text-white/75 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5ba8d9]">
                Get in touch
              </h3>
              <ul className="mt-3 space-y-2 font-sans text-[15px] text-white/75">
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
                <li>
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

          {/* Centred brand mark */}
          <div className="mt-7 flex flex-col items-center text-center sm:mt-8">
            <Link to={path()} className="group inline-flex flex-col items-center gap-2.5">
              <span className="max-w-md font-serif text-base font-semibold uppercase tracking-[0.1em] text-white transition-colors group-hover:text-white/90 sm:text-lg sm:tracking-[0.12em]">
                {college.name}
              </span>
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt=""
                  className="h-10 w-10 object-contain bg-white p-0.5 sm:h-11 sm:w-11"
                />
              ) : null}
            </Link>
            <p className="mt-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-white/55">
              {siteConfig.location} · Kwara State
            </p>
          </div>
        </Container>

        <div className="border-t border-white/10 py-3.5">
          <Container
            size="wide"
            className="flex flex-col items-center justify-between gap-1.5 text-center sm:flex-row sm:text-left"
          >
            <p className="font-sans text-[14px] text-white/55">
              &copy; {year} {college.name}. Part of {siteConfig.institutionName}.
            </p>
            {siteConfig.designerUrl ? (
              <a
                href={siteConfig.designerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] font-semibold tracking-wide text-[#5ba8d9] transition-colors hover:text-white sm:text-[14px]"
              >
                {siteConfig.designerCredit}
              </a>
            ) : (
              <p className="font-sans text-[13px] font-semibold tracking-wide text-[#5ba8d9] sm:text-[14px]">
                {siteConfig.designerCredit}
              </p>
            )}
          </Container>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-20 mt-auto bg-[#041c36] text-white">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="space-y-4 md:col-span-5">
            <Link to={path()} className="group inline-flex items-center gap-3">
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt=""
                  className="h-12 w-12 object-contain bg-white p-0.5"
                />
              ) : null}
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-semibold text-white transition-colors group-hover:text-white/90">
                  {college.name}
                </span>
                <span className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                  {siteConfig.location} · Kwara State
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-white/70">{college.tagline}</p>
            <ul className="space-y-2 pt-1 text-[15px] text-white/75">
              <li>
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </li>
              <li>
                <a href="tel:08135131503" className="transition-colors hover:text-white">
                  0813 513 1503
                </a>
                {' · '}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-3.5 md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c56a]">
                {section.title}
              </h3>
              <ul className="space-y-3 text-[15px]">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-white/75 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container
          size="wide"
          className="flex flex-col items-center justify-between gap-3 text-sm text-white/55 sm:flex-row"
        >
          <p>
            &copy; {year} {college.name}. Part of {siteConfig.institutionName}.
          </p>
          {siteConfig.designerUrl ? (
            <a
              href={siteConfig.designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold tracking-wide text-[#e8c56a] transition-colors duration-300 hover:text-white sm:text-sm"
            >
              {siteConfig.designerCredit}
            </a>
          ) : (
            <p className="text-[13px] font-semibold tracking-wide text-[#e8c56a] sm:text-sm">
              {siteConfig.designerCredit}
            </p>
          )}
        </Container>
      </div>
    </footer>
  );
}
