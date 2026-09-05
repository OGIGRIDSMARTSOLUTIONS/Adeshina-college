import { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  institutionName: 'Adeshina Group of Colleges',
  shortName: 'Adeshina Colleges',
  location: 'Share',
  fullLocation: 'Share, Kwara State, Nigeria',
  tagline: 'Centre of Excellence in Health Technology and Education',
  shortDescription: 'Dedicated to providing high-quality professional healthcare technology and teacher education programmes in a disciplined, supportive academic environment.',
  designerCredit: 'Designed by OGIGRID SMART SOLUTIONS',
  designerUrl: 'https://ogigridsmart.vercel.app/',
  brand: {
    // Single configurable logo path - pointing to the official Adeshina emblem asset
    logoUrl: '/LOGO/adeshina-logo.jpg',
    logoLightUrl: '/LOGO/adeshina-logo.jpg',
    faviconUrl: '/LOGO/adeshina-logo.jpg',
  },
  portals: {
    studentPortal: {
      label: 'Student Portal',
      path: '/portal',
    },
    applyNow: {
      label: 'Apply Now',
      path: '/',
    },
  },
  contact: {
    campusAddress: 'Layout B, Plot 1, Share-Okeode Road, Beside Ifelodun LG Secretariat, Share',
    stateCountry: 'Kwara State, Nigeria',
    email: 'adesinacoed@gmail.com',
    phone: '08135131503, 07018182681',
    officeHours: 'Monday – Friday: 8:00 AM – 4:30 PM',
  },
  socials: [],
};
