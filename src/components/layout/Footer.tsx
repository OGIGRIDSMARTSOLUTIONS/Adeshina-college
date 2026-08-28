import { Link } from 'react-router-dom';
import { footerSections } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121926] text-white mt-auto border-t border-slate-800">
      {/* Upper Main Footer Content */}
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Institutional Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-md p-1 -ml-1"
              aria-label={`${siteConfig.institutionName} - Home`}
            >
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt={`${siteConfig.institutionName} Emblem`}
                  className="h-10 w-10 object-contain shrink-0 rounded-md bg-white p-1"
                  width="40"
                  height="40"
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-white text-navy flex items-center justify-center font-black text-lg">
                  A
                </div>
              )}
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-slate-200 transition-colors">
                  {siteConfig.institutionName}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {siteConfig.location}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm pt-1">
              {siteConfig.shortDescription}
            </p>

                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <p>{siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}</p>
                  <p>Inquiries: <a href="tel:08135131503" className="text-slate-300 hover:text-white font-medium">0813 513 1503</a> · <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-300 hover:text-white font-medium">{siteConfig.contact.email}</a></p>
                </div>
          </div>

          {/* Navigation Columns (3-4 cols each) */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-3 sm:col-span-1">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-300 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-400 hover:text-white transition-colors block"
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

      {/* Sub-Footer / Copyright & Designer Credit */}
      <div className="bg-[#0b101b] py-6 border-t border-slate-800/80">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {siteConfig.institutionName}. All rights reserved.
          </p>

          <p className="font-semibold tracking-wide text-center sm:text-right text-slate-400">
            {siteConfig.designerUrl ? (
              <a
                href={siteConfig.designerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                {siteConfig.designerCredit}
              </a>
            ) : (
              siteConfig.designerCredit
            )}
          </p>
        </Container>
      </div>
    </footer>
  );
}
