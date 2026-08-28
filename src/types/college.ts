export interface College {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage?: string;
  establishedYear?: number;
  departmentsCount?: number;
  programmesCount?: number;
}
