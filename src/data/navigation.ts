import { NavItem, FooterSection } from '@/types/navigation';
import { CollegeId, collegePath } from '@/lib/collegePaths';

export const gatewayNavItems: NavItem[] = [
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact / Support', path: '/contact' },
  { label: 'Student Portal', path: '/portal' },
];

export function getCollegeNavItems(collegeId: CollegeId): NavItem[] {
  return [
    { label: 'Home', path: collegePath(collegeId) },
    { label: 'About', path: collegePath(collegeId, 'about') },
    { label: 'Programmes', path: collegePath(collegeId, 'programmes') },
    { label: 'Admissions', path: collegePath(collegeId, 'admissions') },
    { label: 'News', path: collegePath(collegeId, 'news') },
    { label: 'Contact', path: collegePath(collegeId, 'contact') },
  ];
}

export function getCollegeFooterSections(collegeId: CollegeId): FooterSection[] {
  return [
    {
      title: 'Explore',
      items: [
        { label: 'About the College', path: collegePath(collegeId, 'about') },
        { label: 'Programmes', path: collegePath(collegeId, 'programmes') },
        { label: 'Admissions', path: collegePath(collegeId, 'admissions') },
        { label: 'News & Updates', path: collegePath(collegeId, 'news') },
      ],
    },
    {
      title: 'Quick Links',
      items: [
        { label: 'Apply Now', path: collegePath(collegeId, 'apply') },
        { label: 'Contact & Campus', path: collegePath(collegeId, 'contact') },
        { label: 'Student Portal', path: '/portal' },
        { label: 'All Colleges', path: '/' },
      ],
    },
  ];
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact / Support', path: '/contact' },
  { label: 'Student Portal', path: '/portal' },
];

export const footerSections: FooterSection[] = [
  {
    title: 'Colleges',
    items: [
      { label: 'College of Health Technology', path: collegePath('health-technology') },
      { label: 'College of Education', path: collegePath('education') },
    ],
  },
  {
    title: 'Quick Links',
    items: [
      { label: 'About', path: '/about' },
      { label: 'News', path: '/news' },
      { label: 'Contact / Support', path: '/contact' },
      { label: 'Student Portal', path: '/portal' },
    ],
  },
];
