import { Link } from 'react-router-dom';
import { getCollegeFooterSections } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';

export function CollegeFooter() {
  const { college, collegeId, path } = useCollege();
  const sections = getCollegeFooterSections(collegeId);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#041c36] text-white mt-auto">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5 space-y-4">
            <Link to={path()} className="inline-flex items-center gap-3 group">
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt=""
                  className="h-12 w-12 object-contain bg-white p-0.5"
                />
              ) : null}
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-semibold text-xl text-white group-hover:text-white/90 transition-colors">
                  {college.name}
                </span>
                <span className="mt-1.5 text-xs uppercase tracking-[0.16em] text-white/60 font-medium">
                  {siteConfig.location} · Kwara State
                </span>
              </div>
            </Link>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-sm">{college.tagline}</p>
            <ul className="space-y-2 text-[15px] text-white/75 pt-1">
              <li>
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </li>
              <li>
                <a href="tel:08135131503" className="hover:text-white transition-colors">
                  0813 513 1503
                </a>
                {' · '}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="md:col-span-3 space-y-3.5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c56a]">
                {section.title}
              </h3>
              <ul className="space-y-3 text-[15px]">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-white/75 hover:text-white transition-colors"
                    >
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
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/55"
        >
          <p>
            &copy; {year} {college.name}. Part of {siteConfig.institutionName}.
          </p>
          {siteConfig.designerUrl ? (
            <a
              href={siteConfig.designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] sm:text-sm font-semibold tracking-wide text-[#e8c56a] transition-colors duration-300 hover:text-white"
            >
              {siteConfig.designerCredit}
            </a>
          ) : (
            <p className="text-[13px] sm:text-sm font-semibold tracking-wide text-[#e8c56a]">
              {siteConfig.designerCredit}
            </p>
          )}
        </Container>
      </div>
    </footer>
  );
}
