export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  content?: string;
  featuredImage?: string;
  collegeId?: string;
}
