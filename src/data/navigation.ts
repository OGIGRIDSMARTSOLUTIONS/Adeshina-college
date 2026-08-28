import { NavItem, FooterSection } from '@/types/navigation';

export const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Colleges',
    path: '/colleges',
    children: [
      { label: 'College of Health Technology', path: '/colleges/health-technology' },
      { label: 'College of Education', path: '/colleges/education' },
    ],
  },
  { label: 'Programmes', path: '/programmes' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export const footerSections: FooterSection[] = [
  {
    title: 'Colleges',
    items: [
      { label: 'College of Health Technology', path: '/colleges/health-technology' },
      { label: 'College of Education', path: '/colleges/education' },
    ],
  },
  {
    title: 'Quick Links',
    items: [
      { label: 'About Us', path: '/about' },
      { label: 'All Programmes', path: '/programmes' },
      { label: 'Admissions', path: '/admissions' },
      { label: 'Student Portal', path: '/portal' },
      { label: 'News & Updates', path: '/news' },
      { label: 'Contact & Campus', path: '/contact' },
    ],
  },
];
