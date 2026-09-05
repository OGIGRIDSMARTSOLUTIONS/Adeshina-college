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
    <footer className="bg-[#05264c] text-white mt-auto border-t border-sky-900/50">
      <Container size="wide" className="py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            <Link to={path()} className="inline-flex items-center gap-3 group">
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt=""
                  className="h-10 w-10 object-contain shrink-0 rounded-md bg-white p-1"
                />
              ) : null}
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-sky-200 transition-colors">
                  {college.name}
                </span>
                <span className="text-xs uppercase tracking-widest text-sky-200/80 font-semibold">
                  {siteConfig.location} · Kwara State
                </span>
              </div>
            </Link>
            <p className="text-sm text-sky-100/90 leading-relaxed max-w-sm">{college.tagline}</p>
            <div className="pt-2 text-xs text-sky-200/80 space-y-1">
              <p>
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </p>
              <p>
                Inquiries:{' '}
                <a href="tel:08135131503" className="text-white hover:text-sky-300 font-medium">
                  0813 513 1503
                </a>{' '}
                ·{' '}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white hover:text-sky-300 font-medium"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="lg:col-span-3 sm:col-span-1">
              <h3 className="text-xs font-bold tracking-widest uppercase text-sky-300 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-sky-100/80 hover:text-white transition-colors block"
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

      <div className="bg-[#031933] py-5 border-t border-sky-900/40">
        <Container
          size="wide"
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-200/70"
        >
          <p>
            &copy; {year} {college.name}. Part of {siteConfig.institutionName}.
          </p>
          {siteConfig.designerUrl ? (
            <a
              href={siteConfig.designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-white transition-colors"
            >
              {siteConfig.designerCredit}
            </a>
          ) : (
            <p>{siteConfig.designerCredit}</p>
          )}
        </Container>
      </div>
    </footer>
  );
}
