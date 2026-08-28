import { Link } from 'react-router-dom';
import { footerSections } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-adeshina-blue text-white mt-auto">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Institutional Info */}
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              {siteConfig.institutionName}
            </h3>
            <p className="mt-1 text-sm text-blue-100">
              {siteConfig.location}
            </p>
            <p className="mt-3 text-sm text-blue-100">
              {siteConfig.tagline}
            </p>
            {siteConfig.contact.campusAddress && (
              <p className="mt-3 text-xs text-blue-200">
                {siteConfig.contact.campusAddress}
              </p>
            )}
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-blue-200 mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-blue-100 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200 gap-4">
          <p>
            &copy; {currentYear} {siteConfig.institutionName}. All rights reserved.
          </p>
          <p className="font-medium tracking-wide">
            {siteConfig.designerCredit}
          </p>
        </div>
      </Container>
    </footer>
  );
}
