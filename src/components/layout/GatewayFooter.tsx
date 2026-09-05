import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { collegePath } from '@/lib/collegePaths';
import { Container } from '@/components/common/Container';

export function GatewayFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#05264c] text-white border-t border-sky-900/50">
      <Container size="wide" className="py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              {siteConfig.brand.logoLightUrl ? (
                <img
                  src={siteConfig.brand.logoLightUrl}
                  alt=""
                  className="h-11 w-11 object-contain rounded-md bg-white p-0.5"
                />
              ) : null}
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-black text-lg text-white group-hover:text-sky-200 transition-colors">
                  {siteConfig.institutionName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-sky-200/80 font-bold">
                  {siteConfig.location} · Nigeria
                </span>
              </div>
            </Link>
            <p className="text-sm text-sky-100/85 leading-relaxed max-w-sm">
              {siteConfig.tagline}. Enter either college below to explore programmes, admissions, and
              campus life.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sky-300">Colleges</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to={collegePath('health-technology')}
                  className="text-sky-100/85 hover:text-white transition-colors"
                >
                  College of Health Technology
                </Link>
              </li>
              <li>
                <Link
                  to={collegePath('education')}
                  className="text-sky-100/85 hover:text-white transition-colors"
                >
                  College of Education
                </Link>
              </li>
              <li>
                <Link to="/portal" className="text-sky-100/85 hover:text-white transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sky-300">Campus</h3>
            <ul className="space-y-3 text-sm text-sky-100/85">
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-300 shrink-0" />
                <a href="tel:08135131503" className="hover:text-white transition-colors">
                  0813 513 1503
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-300 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="bg-[#031933] border-t border-sky-900/40 py-5">
        <Container
          size="wide"
          className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sky-200/70"
        >
          <p>
            &copy; {year} {siteConfig.institutionName}. All rights reserved.
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
