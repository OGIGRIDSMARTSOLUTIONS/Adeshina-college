export interface CollegeFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage?: string;
  accentColor?: string;
  features?: CollegeFeature[];
  trainingFoci?: string[];
}
