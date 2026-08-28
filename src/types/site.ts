export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface ContactInfo {
  campusAddress: string;
  email: string;
  phone: string;
  officeHours?: string;
}

export interface SiteConfig {
  institutionName: string;
  location: string;
  tagline: string;
  designerCredit: string;
  contact: ContactInfo;
  socials: SocialLink[];
}
