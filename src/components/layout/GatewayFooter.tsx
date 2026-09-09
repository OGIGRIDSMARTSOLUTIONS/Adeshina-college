import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';
import { collegePath } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

export function GatewayFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#041c36] text-white">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link to="/" className="group inline-flex items-center gap-3">
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt=""
                  className="h-11 w-11 object-contain bg-white p-0.5"
                />
              ) : null}
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-semibold text-white transition-colors group-hover:text-white/90">
                  {siteConfig.institutionName}
                </span>
                <span className="type-meta mt-1.5 text-white/55">
                  {siteConfig.location} · Nigeria
                </span>
              </div>
            </Link>
            <p className="type-body mt-5 max-w-sm text-white/65">
              {siteConfig.tagline}. Enter either college for programmes, admissions, and campus life.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="type-label text-[#e8c56a]">Explore</h3>
            <ul className="mt-4 space-y-3 type-body">
              <li>
                <Link to="/about" className="text-white/75 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={collegePath('health-technology')}
                  className="text-white/75 transition-colors hover:text-white"
                >
                  Health Technology
                </Link>
              </li>
              <li>
                <Link
                  to={collegePath('education')}
                  className="text-white/75 transition-colors hover:text-white"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-white/75 transition-colors hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="type-label text-[#e8c56a]">Campus</h3>
            <ul className="mt-4 space-y-3 type-body text-white/75">
              <li>
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
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
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container
          size="wide"
          className="flex flex-col items-center justify-between gap-3 text-sm text-white/55 sm:flex-row"
        >
          <p>
            &copy; {year} {siteConfig.institutionName}. All rights reserved.
          </p>
          {siteConfig.designerUrl ? (
            <a
              href={siteConfig.designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="type-button-sm text-[#e8c56a] transition-colors hover:text-white"
            >
              {siteConfig.designerCredit}
            </a>
          ) : (
            <p className="type-button-sm text-[#e8c56a]">{siteConfig.designerCredit}</p>
          )}
        </Container>
      </div>
    </footer>
  );
}
