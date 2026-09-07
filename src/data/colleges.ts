import { College } from '@/types/college';

export const colleges: College[] = [
  {
    id: 'health-technology',
    name: 'Adeshina College of Health Technology',
    shortName: 'College of Health Technology',
    slug: '/colleges/health-technology',
    tagline: 'Professional training in community healthcare, medical sciences, and health technology.',
    description:
      'Adeshina College of Health Technology, Share, trains students for practical careers in community health, clinical support services, environmental health, and related health-technology disciplines. On our Share campus in Ifelodun LGA — beside the Local Government Secretariat — learning is hands-on, disciplined, and focused on workplace readiness across Kwara State and Nigeria.',
    heroImage: '/images/health-technology/health-campus-1.jpg',
    accentColor: '#10a37f',
    trainingFoci: [
      'Community Health Practice & Primary Healthcare Delivery',
      'Diagnostic Clinical Laboratory Science & Pathology',
      'Pharmaceutical Technology & Dispensing Ethics',
      'Environmental Health, Sanitation & Public Safety',
      'Health Information Systems & Biostatistics Management',
    ],
    features: [
      {
        title: 'Clinical & Laboratory Suites',
        description:
          'Hands-on practical training suites equipped for diagnostic work, clinical simulation, and skills demonstration before field posting.',
      },
      {
        title: 'Field & Community Practice',
        description:
          'Supervised clinical and community postings that connect classroom learning to primary healthcare centres and local health services.',
      },
      {
        title: 'Professional Ethical Benchmarks',
        description:
          'Curriculum structured for professional competence, patient safety, and the ethical standards expected of health workers in Nigeria.',
      },
    ],
  },
  {
    id: 'education',
    name: 'Adeshina College of Education',
    shortName: 'College of Education',
    slug: '/colleges/education',
    tagline: 'Excellence in teacher training, pedagogical development, and instructional leadership.',
    description:
      'Adeshina College of Education, Share, prepares students for careers in teaching through strong subject foundations, modern pedagogical methods, and supervised classroom practice. On our Share campus in Ifelodun LGA — beside the Local Government Secretariat — learning is practical, disciplined, and focused on producing classroom-ready teachers for schools across Kwara State and Nigeria.',
    heroImage: '/images/education/campus-gate.jpg',
    accentColor: '#02509e',
    trainingFoci: [
      'Primary Education Pedagogy & Early Childhood Instruction',
      'Vocational, Business, and Entrepreneurship Education',
      'Science & Mathematics Teaching Methodologies',
      'Language Arts, Social Studies & Civic Education Pedagogy',
      'Educational Technology & Curriculum Assessment',
    ],
    features: [
      {
        title: 'Teaching Practice Suites',
        description:
          'Micro-teaching clinics and structured practical classroom delivery before real-school teaching practice.',
      },
      {
        title: 'Modern Instructional Technology',
        description:
          'Training that integrates digital classroom tools, lesson design, and multimedia pedagogy for today’s schools.',
      },
      {
        title: 'Character & Leadership Focus',
        description:
          'Instilling discipline, professional ethics, and instructional leadership expected of teachers in Nigerian schools.',
      },
    ],
  },
];
