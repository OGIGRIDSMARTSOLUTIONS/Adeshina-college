export interface AdmissionStep {
  step: string;
  title: string;
  description: string;
  details?: string;
}

export interface AdmissionFAQ {
  question: string;
  answer: string;
}

export interface AdmissionRequirementCategory {
  collegeId: string;
  collegeName: string;
  qualification: string;
  requirements: string[];
  mandatorySubjects: string[];
}

export interface AdmissionInfo {
  session: string;
  applicationOpen: boolean;
  generalNotice: string;
  steps: AdmissionStep[];
  requirements: AdmissionRequirementCategory[];
  faqs: AdmissionFAQ[];
}

export const admissionInfo: AdmissionInfo = {
  session: '2025/2026 & 2026/2027 Academic Sessions',
  applicationOpen: true,
  generalNotice: 'Applications are currently invited from suitably qualified candidates for admission into various accredited Diploma, NCE, and Certificate programmes at Adeshina College of Health Technology and Adeshina College of Education, Share, Kwara State.',
  steps: [
    {
      step: '01',
      title: 'Personal Information',
      description:
        'Enter your name, contact details, date of birth, gender, state of origin, and home address on the online application form.',
    },
    {
      step: '02',
      title: 'Programme Selection',
      description:
        'Choose your preferred programme for this college and confirm the intake session you are applying for.',
    },
    {
      step: '03',
      title: 'Academic Background',
      description:
        'Provide your O’Level exam type, sittings, school name, year of result, and subject grades (WAEC, NECO, or NABTEB).',
    },
    {
      step: '04',
      title: 'Document Upload',
      description:
        'Upload your O’Level result slip and passport photograph so the Admissions Registry can verify your credentials.',
    },
    {
      step: '05',
      title: 'Review & Submit',
      description:
        'Check your application summary carefully, accept the terms, and submit to receive your application reference.',
    },
  ],
  requirements: [
    {
      collegeId: 'health-technology',
      collegeName: 'Adeshina College of Health Technology',
      qualification: 'Diploma & National Diploma (ND) / Certificate',
      mandatorySubjects: ['English Language', 'Mathematics', 'Biology / Health Science', 'Chemistry', 'Physics'],
      requirements: ['Candidate must possess a minimum of five (5) credit passes in SSCE/WAEC/NECO/NABTEB at not more than two (2) sittings.', 'Credits must include English Language, Mathematics, Biology, Chemistry, and Physics.', 'For Certificate programmes (e.g. JCHEW), a minimum of 3 credit passes in core science subjects is required.', 'Candidates awaiting O\'Level results may apply on condition of presenting verified results at registration.'],
    },
    {
      collegeId: 'education',
      collegeName: 'Adeshina College of Education',
      qualification: 'Nigeria Certificate in Education (NCE)',
      mandatorySubjects: ['English Language', 'Mathematics', 'Relevant Subject Area Credits (3)'],
      requirements: ['Candidate must possess a minimum of five (5) credit passes in SSCE/WAEC/NECO/NABTEB at not more than two (2) sittings.', 'Credits must include English Language, Mathematics, and three (3) subjects relevant to the intended teaching discipline.', 'For Science/Maths combinations, credits in Mathematics, Physics/Chemistry/Biology are required.', 'For Commercial/Arts combinations, credits in Economics, Government, Literature, or Business Studies are required.'],
    }
  ],
  faqs: [
    {
      question: 'Where is the Adeshina Group of Colleges campus located for physical screening?',
      answer: 'The campus is located along Share-Okeode Road, beside the Ifelodun Local Government Secretariat, Share, Kwara State, Nigeria.',
    },
    {
      question: 'Can I combine results from WAEC and NECO?',
      answer: 'Yes, a combination of results from WAEC, NECO, and NABTEB is acceptable provided the total number of sittings does not exceed two (2).',
    },
    {
      question: 'What is the duration of programmes offered at the colleges?',
      answer: 'Standard Diploma and NCE programmes run for three (3) academic years on a full-time semester schedule. Certificate programmes (such as JCHEW) run for two (2) years.',
    },
    {
      question: 'Can NCE graduates from Adeshina College of Education gain Direct Entry into universities?',
      answer: 'Yes. The Nigeria Certificate in Education (NCE) is recognized for 200-Level Direct Entry admission into Bachelor of Education (B.Ed / B.A.Ed / B.Sc.Ed) degree programmes across Nigerian universities.',
    },
    {
      question: 'How do I reach the Admissions Registry if I need assistance?',
      answer: 'You can visit the Admissions Registry on campus in Share or reach out through our Contact Page to submit an inquiry.',
    }
  ],
};
