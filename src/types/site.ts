export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface ContactInfo {
  campusAddress: string;
  stateCountry: string;
  email: string;
  phone: string;
  officeHours?: string;
}

export interface BrandAssets {
  logoUrl?: string;
  logoLightUrl?: string;
  faviconUrl: string;
}

export interface PortalLink {
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface SiteConfig {
  institutionName: string;
  shortName: string;
  location: string;
  fullLocation: string;
  tagline: string;
  shortDescription: string;
  designerCredit: string;
  designerUrl?: string;
  brand: BrandAssets;
  portals: {
    studentPortal: PortalLink;
    applyNow: PortalLink;
  };
  contact: ContactInfo;
  socials: SocialLink[];
}
