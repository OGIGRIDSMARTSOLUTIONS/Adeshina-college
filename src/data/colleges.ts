import { College } from '@/types/college';

export const colleges: College[] = [
  {
    id: 'health-technology',
    name: 'Adeshina College of Health Technology',
    shortName: 'College of Health Technology',
    slug: '/colleges/health-technology',
    tagline: 'Professional training in community healthcare, medical sciences, and health technology.',
    description: 'Providing career-focused professional education designed to prepare skilled healthcare workers for clinical practice, community health services, and medical technology roles across Nigeria.',
    heroImage: '/images/health-technology/health-campus-1.jpg',
    accentColor: '#10a37f',
    trainingFoci: ['Community Health Practice & Primary Healthcare Delivery', 'Diagnostic Clinical Laboratory Science & Pathology', 'Pharmaceutical Technology & Dispensing Ethics', 'Environmental Health, Sanitation & Public Safety', 'Health Information Systems & Biostatistics Management'],
    features: [
      {
        title: 'Clinical & Laboratory Suites',
        description: 'Hands-on practical training suites equipped with modern diagnostic tools and clinical simulation environments.',
      },
      {
        title: 'Field & Community Practice',
        description: 'Supervised clinical postings to primary healthcare centres and community clinics across Kwara State.',
      },
      {
        title: 'Professional Ethical Benchmarks',
        description: 'Curriculum structured to satisfy rigorous national healthcare regulatory and vocational benchmarks.',
      }
    ],
  },
  {
    id: 'education',
    name: 'Adeshina College of Education',
    shortName: 'College of Education',
    slug: '/colleges/education',
    tagline: 'Excellence in teacher training, pedagogical development, and instructional leadership.',
    description: 'Equipping future educators with rigorous academic foundations, modern pedagogical methods, and practical classroom teaching experience across core subject disciplines.',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
    accentColor: '#02509e',
    trainingFoci: ['Primary Education Pedagogy & Early Childhood Instruction', 'Vocational, Business, and Entrepreneurship Education', 'Science & Mathematics Teaching Methodologies', 'Language Arts, Social Studies & Civic Education Pedagogy', 'Educational Technology & Curriculum Assessment'],
    features: [
      {
        title: 'Teaching Practice Suites',
        description: 'Micro-teaching clinics and structured practical classroom delivery before real-school practicum.',
      },
      {
        title: 'Modern Instructional Technology',
        description: 'Integrating digital classroom tools, computational thinking, and multimedia pedagogy.',
      },
      {
        title: 'Character & Leadership Focus',
        description: 'Instilling discipline, professional ethics, and instructional leadership for school environments.',
      }
    ],
  },
];
