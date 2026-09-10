import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  Upload,
  FileText,
  Plus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Printer,
  Check,
  X,
} from 'lucide-react';
import { programmes } from '@/data/programmes';
import { colleges } from '@/data/colleges';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { useOptionalCollege } from '@/context/CollegeContext';
import { CollegeId, collegePath } from '@/lib/collegePaths';
import { EducationGeometricBg } from '@/components/college/education/EducationGeometricBg';

interface SubjectGrade {
  id: string;
  subject: string;
  grade: string;
}

const COMMON_SUBJECTS = [
  'Biology',
  'Chemistry',
  'Physics',
  'Agricultural Science',
  'Economics',
  'Government',
  'Literature in English',
  'Commerce',
  'Financial Accounting',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'Yoruba Language',
  'Arabic',
  'Civic Education',
  'Geography',
  'Computer Studies',
  'Health Science',
];

const GRADE_OPTIONS = [
  'A1',
  'B2',
  'B3',
  'C4',
  'C5',
  'C6',
  'D7',
  'E8',
  'F9',
  'AR (Awaiting Result)',
];

const NAME_RE = /^[A-Za-z][A-Za-z\s'-]{1,59}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:\+?234|0)[789][01]\d{8}$/;
const YEAR_RE = /^(19|20)\d{2}$/;

function normalizePhone(value: string) {
  return value.replace(/[\s\-()]/g, '');
}

function isValidDob(value: string) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const age =
    (now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return age >= 15 && age <= 65 && date < now;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 font-sans text-[12px] font-medium text-red-600">{message}</p>;
}
function CollegeApplyPicker() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#f4f7fb] py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#eef4fb_0%,#f7f9fc_42%,#fff8e8_100%)]" />
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[#3d8fd1]/15 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#e8c56a]/25 blur-3xl" />
        <div
          className="absolute right-0 top-0 h-72 w-72 bg-[#041c36]/[0.07] sm:h-96 sm:w-96"
          style={{ clipPath: 'polygon(42% 0, 100% 0, 100% 100%, 0 58%)' }}
        />
        <div
          className="absolute bottom-10 left-0 h-56 w-56 bg-[#3d8fd1]/[0.12] sm:h-72 sm:w-72"
          style={{ clipPath: 'polygon(0 18%, 78% 0, 100% 72%, 0 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(5,38,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(5,38,76,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 78%)',
          }}
        />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#02509e]">
            Start an application
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#05264c] sm:text-4xl">
            Choose your college
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-slate-600">
            Applications are college-specific. Select Health Technology or Education to continue.
          </p>
        </div>
        <div className="mx-auto mt-12 grid w-full gap-6 sm:grid-cols-2 lg:gap-8">
          {colleges.map((c) => {
            const id = c.id as CollegeId;
            const isHealthCollege = id === 'health-technology';
            return (
              <Link
                key={c.id}
                to={collegePath(id, 'apply')}
                className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border bg-white/95 px-10 py-10 text-left shadow-[0_22px_50px_-28px_rgba(5,38,76,0.5)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:min-h-[320px] sm:px-12 sm:py-12 ${
                  isHealthCollege
                    ? 'border-[#3d8fd1]/25 hover:border-[#3d8fd1]/55'
                    : 'border-[#c9a227]/30 hover:border-[#c9a227]/60'
                }`}
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1.5 ${
                    isHealthCollege ? 'bg-[#041c36]' : 'bg-[#c9a227]'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`pointer-events-none absolute -right-8 -top-10 h-40 w-40 ${
                    isHealthCollege ? 'bg-[#3d8fd1]/10' : 'bg-[#e8c56a]/20'
                  }`}
                  style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 55%)' }}
                  aria-hidden="true"
                />
                <span
                  className={`relative font-sans text-xs font-bold uppercase tracking-[0.16em] ${
                    isHealthCollege ? 'text-[#2a73ad]' : 'text-[#a8861a]'
                  }`}
                >
                  {isHealthCollege ? 'Health sciences' : 'Educator training'}
                </span>
                <h2 className="relative mt-4 font-serif text-2xl font-semibold tracking-[-0.02em] text-[#05264c] group-hover:text-[#02509e] sm:text-3xl">
                  {c.shortName}
                </h2>
                <p className="relative mt-4 max-w-md flex-1 font-sans text-base leading-relaxed text-slate-600">
                  {c.tagline}
                </p>
                <span className="relative mt-8 inline-flex items-center gap-2 font-sans text-base font-bold text-[#02509e]">
                  Continue to apply
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-center">
          <Link to="/#colleges" className="font-sans text-sm font-semibold text-slate-500 hover:text-[#05264c]">
            Back to colleges overview
          </Link>
        </p>
      </Container>
    </div>
  );
}

export function ApplyPage() {
  const collegeCtx = useOptionalCollege();
  if (!collegeCtx) return <CollegeApplyPicker />;
  return <CollegeApplyForm collegeCtx={collegeCtx} />;
}

function CollegeApplyForm({
  collegeCtx,
}: {
  collegeCtx: NonNullable<ReturnType<typeof useOptionalCollege>>;
}) {
  const navigate = useNavigate();
  const { college, collegeId, path } = collegeCtx;
  const isHealth = collegeId === 'health-technology';
  const isEducation = collegeId === 'education';
  /** Single-column college shells — not the Grandplus-style sidebar layout. */
  const isCollegeShell = isHealth || isEducation;

  const primaryBtn = isHealth
    ? 'rounded-md bg-[#041c36] text-white hover:bg-[#2a73ad]'
    : isEducation
      ? 'bg-gradient-to-br from-[#dfc04a] via-[#c9a227] to-[#a8861a] text-[#0c2340] shadow-[0_14px_32px_-12px_rgba(201,162,39,0.55)] hover:brightness-[1.03]'
      : 'bg-[#02509e] hover:bg-[#013a75] text-white';
  const progressBar = isHealth ? 'bg-[#3d8fd1]' : isEducation ? 'bg-[#c9a227]' : 'bg-[#02509e]';
  const focusRing = isHealth
    ? 'focus:border-[#3d8fd1] focus:ring-2 focus:ring-[#3d8fd1]/25'
    : isEducation
      ? 'focus:border-[#3d8fd1] focus:ring-2 focus:ring-[#3d8fd1]/25'
      : 'focus:border-[#02509e] focus:ring-1 focus:ring-[#02509e]';
  const inputClass = isHealth
    ? `w-full rounded-md border border-[#041c36]/15 bg-white px-4 py-3 font-sans text-[14px] text-[#041c36] outline-none transition-colors placeholder:text-[#4a5560]/70 ${focusRing}`
    : isEducation
      ? `w-full rounded-2xl border border-[#0c2340]/12 bg-white px-4 py-3 font-sans text-[14px] text-[#0c2340] outline-none transition-colors placeholder:text-[#5a6570]/70 ${focusRing}`
      : `w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-[14px] text-[#05264c] outline-none transition-colors placeholder:text-slate-400 ${focusRing}`;
  const inputErrorExtra = ' !border-red-500 !ring-1 !ring-red-200';
  const labelClass = isCollegeShell
    ? 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#4a5560]'
    : 'mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500';
  const outlineBtn = isHealth
    ? 'inline-flex items-center gap-2 rounded-md border border-[#041c36]/15 bg-white px-4 py-2.5 font-sans text-[13px] font-semibold text-[#041c36] transition-colors hover:border-[#3d8fd1] hover:bg-[#eaf5fc]'
    : isEducation
      ? 'inline-flex items-center gap-2 rounded-2xl border border-[#0c2340]/15 bg-white px-4 py-2.5 font-sans text-[13px] font-semibold text-[#0c2340] transition-colors hover:border-[#3d8fd1] hover:bg-[#eaf4fb]'
      : 'inline-flex items-center gap-2 rounded-md border border-[#05264c]/20 bg-white px-4 py-2.5 text-[13px] font-semibold text-[#05264c] transition-colors hover:border-[#05264c]/40 hover:bg-slate-50';
  const cardClass = isHealth
    ? 'relative overflow-hidden rounded-md bg-[#f7f9fb] p-6 ring-1 ring-[#041c36]/12 sm:p-8'
    : isEducation
      ? 'relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#c9a227,0_20px_40px_-20px_rgba(12,35,64,0.35)] ring-1 ring-[#0c2340]/10 sm:p-8'
      : 'rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8';
  const accentIcon = isHealth ? 'text-[#3d8fd1]' : isEducation ? 'text-[#3d8fd1]' : 'text-[#02509e]';
  const titleColor = isCollegeShell ? 'text-[#041c36]' : 'text-[#05264c]';
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Step 1: Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('');
  const [address, setAddress] = useState('');
  const [ndpaConsent, setNdpaConsent] = useState(false);

  // Step 2: Programme Selection — college locked by route
  const selectedCollege = collegeId as CollegeId;
  const [selectedProgramme, setSelectedProgramme] = useState('');
  const [intakePeriod, setIntakePeriod] = useState('');

  // Step 3: Academic Background
  const [examType, setExamType] = useState('');
  const [sittings, setSittings] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [yearOfResult, setYearOfResult] = useState('');
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { id: '1', subject: 'English Language', grade: '' },
    { id: '2', subject: 'Mathematics', grade: '' },
    { id: '3', subject: '', grade: '' },
    { id: '4', subject: '', grade: '' },
    { id: '5', subject: '', grade: '' },
  ]);

  // Step 4: Documents
  const [olevelFileName, setOlevelFileName] = useState<string | null>(null);
  const [passportFileName, setPassportFileName] = useState<string | null>(null);

  // Step 5: Submission & Ref
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableProgrammes = programmes.filter((p) => p.collegeId === selectedCollege);

  const clearError = (key: string) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!firstName.trim()) errors.firstName = 'First name is required.';
      else if (!NAME_RE.test(firstName.trim())) errors.firstName = 'Enter a valid first name.';

      if (!lastName.trim()) errors.lastName = 'Last name is required.';
      else if (!NAME_RE.test(lastName.trim())) errors.lastName = 'Enter a valid last name.';

      if (!email.trim()) errors.email = 'Email address is required.';
      else if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.';

      const phoneNorm = normalizePhone(phone);
      if (!phone.trim()) errors.phone = 'Phone number is required.';
      else if (!PHONE_RE.test(phoneNorm)) {
        errors.phone = 'Enter a valid Nigerian phone number (e.g. 0803… or +234…).';
      }

      if (!dob) errors.dob = 'Date of birth is required.';
      else if (!isValidDob(dob)) errors.dob = 'Enter a valid date of birth (age 15–65).';

      if (!gender) errors.gender = 'Select your gender.';

      if (!stateOfOrigin.trim()) errors.stateOfOrigin = 'State of origin is required.';
      else if (stateOfOrigin.trim().length < 3) errors.stateOfOrigin = 'Enter a valid state of origin.';

      if (!address.trim()) errors.address = 'Residential address is required.';
      else if (address.trim().length < 8) errors.address = 'Enter a complete residential address.';

      if (!ndpaConsent) {
        errors.ndpaConsent = 'You must accept the NDPA data-rights notice to continue.';
      }
    }

    if (step === 2) {
      if (!selectedProgramme) errors.selectedProgramme = 'Select a programme of study.';
      if (!intakePeriod) errors.intakePeriod = 'Select an intake session.';
    }

    if (step === 3) {
      if (!examType) errors.examType = 'Select examination type.';
      if (!sittings) errors.sittings = 'Select number of sittings.';
      if (!schoolName.trim()) errors.schoolName = 'Secondary school name is required.';
      else if (schoolName.trim().length < 3) errors.schoolName = 'Enter a valid school name.';

      if (!yearOfResult.trim()) errors.yearOfResult = 'Year of result is required.';
      else if (!YEAR_RE.test(yearOfResult.trim())) errors.yearOfResult = 'Enter a valid year (e.g. 2024).';
      else {
        const y = Number(yearOfResult.trim());
        const maxY = new Date().getFullYear() + 1;
        if (y < 1990 || y > maxY) errors.yearOfResult = `Year must be between 1990 and ${maxY}.`;
      }

      if (subjects.length < 5) errors.subjects = 'Provide at least five O’Level subjects.';
      subjects.forEach((s, index) => {
        if (!s.subject.trim()) errors[`subject-${s.id}`] = `Subject ${index + 1} is required.`;
        if (!s.grade) {
          errors[`grade-${s.id}`] = `Select a grade for subject ${index + 1}.`;
        }
      });
      const filledSubjects = subjects.map((s) => s.subject.trim().toLowerCase()).filter(Boolean);
      if (new Set(filledSubjects).size !== filledSubjects.length) {
        errors.subjects = 'Each subject can only be entered once.';
      }
    }

    if (step === 4) {
      if (!olevelFileName) errors.olevelFile = 'Upload your O’Level result slip.';
      if (!passportFileName) errors.passportFile = 'Upload your passport photograph.';
    }

    if (step === 5) {
      if (!ndpaConsent) errors.ndpaConsent = 'NDPA data-rights consent is required.';
      if (!termsAccepted) errors.termsAccepted = 'You must certify that your information is accurate.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubject = () => {
    const nextId = String(Date.now());
    setSubjects((prev) => [...prev, { id: nextId, subject: '', grade: '' }]);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 5) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubjectChange = (id: string, field: 'subject' | 'grade', value: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    clearError(field === 'subject' ? `subject-${id}` : `grade-${id}`);
    clearError('subjects');
  };

  const handleNextStep = () => {
    if (!validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentStep < 5) {
      setFieldErrors({});
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setFieldErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const step of [1, 2, 3, 4, 5] as const) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const collegeCode = selectedCollege === 'health-technology' ? 'HT' : 'COE';
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const generated = `AD-${collegeCode}-${randomDigits}`;
      setSubmittedRef(generated);
      setSubmissionDate(
        new Date().toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const stepsList = [
    { num: 1, title: 'Personal Information' },
    { num: 2, title: 'Programme Selection' },
    { num: 3, title: 'Academic Background' },
    { num: 4, title: 'Document Upload' },
    { num: 5, title: 'Review & Submit' },
  ];

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return { main: 'Apply Now', sub: 'Step 1: Personal Information' };
      case 2:
        return { main: 'Choose Programme', sub: 'Step 2: Programme Selection' };
      case 3:
        return { main: 'Academic Background', sub: 'Step 3: O’Level results' };
      case 4:
        return { main: 'Verify Identity', sub: 'Step 4: Document Upload' };
      case 5:
        return { main: 'Review & Submit', sub: 'Step 5: Final Submission' };
      default:
        return { main: 'Apply Now', sub: '' };
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isHealth
          ? 'relative bg-[#e8edf2]'
          : isEducation
            ? 'relative bg-[#eaf4fb]'
            : 'bg-[#f8fafc] py-10 sm:py-14'
      }`}
    >
      {isCollegeShell && !submittedRef ? (
        <section
          data-college-hero={isHealth ? '' : undefined}
          className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#041c36]"
        >
          <img
            src={
              isHealth
                ? '/images/health-technology/health-campus-1.jpg'
                : '/images/education/campus-gate.jpg'
            }
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[48%_40%] opacity-35 saturate-[0.9]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/92 to-[#041c36]/55"
            aria-hidden="true"
          />
          <Container size="wide" className="relative z-10 py-10 sm:py-12">
            <p
              className={`font-sans text-[11px] font-bold uppercase tracking-[0.16em] ${
                isHealth ? 'text-[#5ba8d9]' : 'text-[#c9a227]'
              }`}
            >
              {isHealth ? 'Health Technology application' : 'NCE application'}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {isHealth
                ? 'Apply to Adeshina College of Health Technology'
                : 'Apply to Adeshina College of Education'}
            </h1>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/80">
              Complete the five steps below. Your details stay with the Share campus registry for
              screening.
            </p>
          </Container>
        </section>
      ) : null}

      <div className={isCollegeShell ? 'relative' : undefined}>
        {isCollegeShell && !submittedRef ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {isEducation ? <EducationGeometricBg tone="paper" /> : null}
            {isHealth ? (
              <>
                <div className="absolute inset-0 bg-[#dde4ec]" />
                <div
                  className="absolute inset-y-[-8%] right-[-8%] w-[52%] bg-[#041c36]/[0.14]"
                  style={{ clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0 100%)' }}
                />
                <div
                  className="absolute inset-y-[-8%] right-[4%] w-[34%] bg-[#3d8fd1]/24"
                  style={{ clipPath: 'polygon(38% 0, 100% 0, 78% 100%, 5% 100%)' }}
                />
                <div
                  className="absolute left-[-10%] top-[-20%] h-[65%] w-[42%] bg-[#041c36]/[0.1]"
                  style={{ clipPath: 'polygon(0 0, 78% 0, 42% 100%, 0 100%)' }}
                />
                <div
                  className="absolute inset-y-[10%] right-[28%] w-[2px] bg-[#041c36]/28"
                  style={{ transform: 'skewX(-12deg)' }}
                />
                <div
                  className="absolute inset-y-[10%] right-[14%] w-[2px] bg-[#3d8fd1]/50"
                  style={{ transform: 'skewX(-12deg)' }}
                />
              </>
            ) : null}
          </div>
        ) : null}
        <Container
          size="wide"
          className={`relative ${isCollegeShell ? 'py-10 sm:py-12' : ''}`}
        >
        {submittedRef ? (
          /* ============================================================ */
          /* OFFICIAL INSTITUTIONAL PRINTABLE SLIP VIEW                   */
          /* ============================================================ */
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Top Action Bar (hidden in print) */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm print:hidden">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${isHealth ? 'bg-[#3d8fd1]' : 'bg-emerald-500'}`} />
                <span className="text-[13px] font-semibold text-slate-700">
                  Application slip ready
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-semibold text-white transition-colors ${primaryBtn}`}
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Official Slip</span>
                </button>
                <Link to={path()} className={outlineBtn}>
                  College Home
                </Link>
              </div>
            </div>

            {/* Official Institutional Slip Paper */}
            <div className="relative space-y-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-10 print:border-none print:p-0 print:shadow-none">
              {/* Institutional Header with Official Emblem */}
              <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-b border-slate-200 pb-6 text-center sm:flex-row sm:text-left">
                <div className="flex items-center gap-4">
                  {siteConfig.brand.logoUrl ? (
                    <img
                      src={siteConfig.brand.logoUrl}
                      alt={siteConfig.institutionName}
                      className="h-16 w-16 rounded-md border border-slate-200 bg-white object-contain p-1 sm:h-20 sm:w-20"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#05264c] font-serif text-2xl font-semibold text-white">
                      A
                    </div>
                  )}
                  <div>
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] ${
                        isHealth ? 'text-[#2a73ad]' : 'text-[#02509e]'
                      }`}
                    >
                      Official Admission Registry
                    </span>
                    <h1 className="font-serif text-xl font-semibold leading-tight tracking-tight text-[#05264c] sm:text-2xl">
                      {siteConfig.institutionName}
                    </h1>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Share Campus, Ifelodun LGA, Kwara State · {siteConfig.contact.email}
                    </p>
                  </div>
                </div>

                <div className="flex h-28 w-24 shrink-0 flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-2 text-center sm:h-32 sm:w-28">
                  <span className="text-[10px] font-semibold uppercase leading-tight text-slate-400">
                    Applicant Passport
                  </span>
                  <span className="mt-1 text-[9px] text-slate-400">
                    {passportFileName ? 'Uploaded' : 'Affix Photo'}
                  </span>
                </div>
              </div>

              <div
                className={`flex flex-col items-center justify-between gap-4 rounded-md border px-4 py-3 sm:flex-row ${
                  isHealth
                    ? 'border-[#3d8fd1]/25 bg-[#3d8fd1]/5'
                    : 'border-[#02509e]/20 bg-[#02509e]/5'
                }`}
              >
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Document Type
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#05264c]">
                    Provisional Online Application Registration Slip
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Application Reference ID
                  </span>
                  <span
                    className={`font-mono text-base tracking-widest sm:text-lg ${
                      isHealth ? 'font-semibold text-[#2a73ad]' : 'font-semibold text-[#02509e]'
                    }`}
                  >
                    {submittedRef}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="rounded-md bg-slate-100 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#05264c]">
                  1. Candidate Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block text-[11px] text-slate-400">Full Name:</span>
                    <span className="font-semibold text-[#05264c]">{firstName} {lastName}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Phone Number:</span>
                    <span className="font-semibold text-[#05264c]">{phone}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Email Address:</span>
                    <span className="font-semibold text-[#05264c]">{email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Gender:</span>
                    <span className="font-semibold text-[#05264c]">{gender}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">State of Origin:</span>
                    <span className="font-semibold text-[#05264c]">{stateOfOrigin || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Submission Date:</span>
                    <span className="font-semibold text-[#05264c]">{submissionDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="rounded-md bg-slate-100 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#05264c]">
                  2. Academic Choice & College Information
                </h2>
                <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block text-[11px] text-slate-400">Chosen College:</span>
                    <span className="font-semibold text-[#05264c]">
                      {selectedCollege === 'health-technology' ? 'Adeshina College of Health Technology' : 'Adeshina College of Education'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Programme Applied:</span>
                    <span className="font-semibold text-[#05264c]">{selectedProgramme}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Mode / Session:</span>
                    <span className="font-semibold text-[#05264c]">Full-Time · {intakePeriod}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="rounded-md bg-slate-100 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#05264c]">
                  3. O'Level Academic Credentials
                </h2>
                <div className="mb-2 text-xs">
                  <span className="text-slate-500">Examination Body & Sittings: </span>
                  <strong className="text-[#05264c]">{examType} ({sittings})</strong>
                  {schoolName && <span className="text-slate-500"> · School: <strong className="text-[#05264c]">{schoolName}</strong></span>}
                </div>

                <div className="overflow-hidden rounded-md border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                      <tr>
                        <th className="w-12 px-3 py-2 text-center">S/N</th>
                        <th className="px-3 py-2">Subject</th>
                        <th className="w-28 px-3 py-2 text-center">Grade Awarded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjects.map((sub, idx) => (
                        <tr key={sub.id}>
                          <td className="px-3 py-2 text-center font-mono text-slate-400">{idx + 1}</td>
                          <td className="px-3 py-2 font-medium text-[#05264c]">{sub.subject || 'Not Specified'}</td>
                          <td className={`px-3 py-2 text-center font-mono font-semibold ${isHealth ? 'text-[#2a73ad]' : 'text-[#02509e]'}`}>
                            {sub.grade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#05264c]">
                  <ShieldCheck className={`h-4 w-4 ${accentIcon}`} />
                  <span>Important Instructions for Physical Verification & Screening</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  1. Print two (2) coloured copies of this registration slip and bring them along with your original O'Level certificate/statement of result and birth certificate.
                </p>
                <p className="leading-relaxed text-slate-600">
                  2. Screening venue: Admissions Registry, Adeshina Group of Colleges, Layout B, Plot 1, Share-Okeode Road, Share, Kwara State.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-6 text-xs">
                <div className="space-y-10">
                  <div className="w-48 border-b border-slate-400" />
                  <span className="block font-semibold text-slate-700">Candidate Signature & Date</span>
                </div>
                <div className="space-y-10 text-right">
                  <div className="ml-auto w-48 border-b border-slate-400" />
                  <span className="block font-semibold text-slate-700">Admissions Officer Stamp & Date</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* APPLICATION WIZARD                                           */
          /* ============================================================ */
          <div className="space-y-6">
            {/* Top Back Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
              <button
                type="button"
                onClick={() => (currentStep > 1 ? handlePrevStep() : navigate(path('admissions')))}
                className={outlineBtn}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentStep > 1 ? 'Previous Step' : 'Back to Admissions'}</span>
              </button>

              <Link
                to={path()}
                className={`${outlineBtn} ${isCollegeShell ? '' : 'border-transparent bg-transparent hover:bg-slate-100'}`}
              >
                College Home
              </Link>
            </div>

            {isCollegeShell ? (
              <ol
                className={`grid grid-cols-5 gap-2 p-3 ring-1 sm:gap-3 sm:p-4 ${
                  isHealth
                    ? 'rounded-md bg-[#f7f9fb] ring-[#041c36]/12'
                    : 'rounded-2xl bg-white/80 shadow-[0_4px_0_0_#c9a227,0_14px_28px_-18px_rgba(12,35,64,0.3)] ring-[#0c2340]/10'
                }`}
              >
                {stepsList.map((step) => {
                  const isPassed = currentStep > step.num;
                  const isCurrent = currentStep === step.num;
                  return (
                    <li key={step.num} className="min-w-0 text-center">
                      <div
                        className={`mx-auto flex h-9 w-9 items-center justify-center font-sans text-[13px] font-bold transition-colors ${
                          isHealth ? 'rounded-md' : 'rounded-full'
                        } ${
                          isPassed
                            ? isHealth
                              ? 'bg-[#3d8fd1] text-white'
                              : 'bg-[#c9a227] text-[#0c2340]'
                            : isCurrent
                              ? 'bg-[#041c36] text-white'
                              : isHealth
                                ? 'bg-[#e8edf2] text-[#4a5560]'
                                : 'bg-[#eaf4fb] text-[#5a6570]'
                        }`}
                      >
                        {isPassed ? <Check className="h-4 w-4 stroke-[3]" /> : step.num}
                      </div>
                      <p
                        className={`mt-2 truncate font-sans text-[10px] font-semibold sm:text-[11px] ${
                          isCurrent ? 'text-[#041c36]' : 'text-[#4a5560]'
                        }`}
                      >
                        {step.title}
                      </p>
                    </li>
                  );
                })}
              </ol>
            ) : null}

            <div
              className={`grid grid-cols-1 gap-8 ${
                isCollegeShell ? 'lg:grid-cols-1 lg:gap-8' : 'lg:grid-cols-12 lg:gap-10'
              }`}
            >
            {/* Left Column: Active Form Step */}
            <div className={isCollegeShell ? 'mx-auto w-full max-w-3xl' : 'lg:col-span-8'}>
              {/* Header Title & Progress Counter */}
              <div className="mb-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h1
                      className={`font-serif text-2xl font-semibold tracking-tight sm:text-3xl ${titleColor}`}
                    >
                      {getStepTitle().main}
                    </h1>
                    <p
                      className={`mt-1 text-sm ${
                        isCollegeShell ? 'text-[#4a5560]' : 'text-slate-500'
                      }`}
                    >
                      {getStepTitle().sub}
                    </p>
                  </div>
                  <p
                    className={`shrink-0 text-sm font-semibold ${
                      isHealth
                        ? 'text-[#2a73ad]'
                        : isEducation
                          ? 'text-[#a8861a]'
                          : 'text-slate-500'
                    }`}
                  >
                    Step {currentStep} of 5
                  </p>
                </div>

                <div
                  className={`mt-4 h-1.5 w-full overflow-hidden rounded-full ${
                    isCollegeShell ? 'bg-[#d7e8f5]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${progressBar}`}
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Main Step Form Card */}
              <div className={cardClass}>
                {isHealth ? (
                  <>
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.08] via-transparent to-[#3d8fd1]/[0.08]" />
                      <div
                        className="absolute -right-4 -top-8 h-40 w-40 bg-[#041c36]/[0.12]"
                        style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                      />
                    </div>
                    <span className="absolute inset-y-0 left-0 w-1 bg-[#041c36]" aria-hidden="true" />
                  </>
                ) : null}
                {isEducation ? (
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    aria-hidden="true"
                  />
                ) : null}
                <div className={isHealth ? 'relative' : undefined}>
                {Object.keys(fieldErrors).length > 0 ? (
                  <div
                    role="alert"
                    className="mb-4 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 font-sans text-[13px] font-medium text-red-700"
                  >
                    Please correct the highlighted fields before continuing.
                  </div>
                ) : null}
                {/* -------------------------------------------------- */}
                {/* STEP 1: Personal Information                       */}
                {/* -------------------------------------------------- */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="given-name"
                          placeholder="Enter first name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            clearError('firstName');
                          }}
                          aria-invalid={Boolean(fieldErrors.firstName)}
                          className={`${inputClass}${fieldErrors.firstName ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.firstName} />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="family-name"
                          placeholder="Enter last name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            clearError('lastName');
                          }}
                          aria-invalid={Boolean(fieldErrors.lastName)}
                          className={`${inputClass}${fieldErrors.lastName ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.lastName} />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError('email');
                        }}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className={`${inputClass}${fieldErrors.email ? inputErrorExtra : ''}`}
                      />
                      <FieldError message={fieldErrors.email} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          autoComplete="tel"
                          placeholder="0803 000 0000"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            clearError('phone');
                          }}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          className={`${inputClass}${fieldErrors.phone ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.phone} />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => {
                            setGender(e.target.value);
                            clearError('gender');
                          }}
                          aria-invalid={Boolean(fieldErrors.gender)}
                          className={`${inputClass}${fieldErrors.gender ? inputErrorExtra : ''}${!gender ? ' text-slate-400' : ''}`}
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <FieldError message={fieldErrors.gender} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => {
                            setDob(e.target.value);
                            clearError('dob');
                          }}
                          aria-invalid={Boolean(fieldErrors.dob)}
                          className={`${inputClass}${fieldErrors.dob ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.dob} />
                      </div>
                      <div>
                        <label className={labelClass}>
                          State of Origin <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kwara State"
                          value={stateOfOrigin}
                          onChange={(e) => {
                            setStateOfOrigin(e.target.value);
                            clearError('stateOfOrigin');
                          }}
                          aria-invalid={Boolean(fieldErrors.stateOfOrigin)}
                          className={`${inputClass}${fieldErrors.stateOfOrigin ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.stateOfOrigin} />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Permanent Residential Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Street name, City, State"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          clearError('address');
                        }}
                        aria-invalid={Boolean(fieldErrors.address)}
                        className={`${inputClass}${fieldErrors.address ? inputErrorExtra : ''}`}
                      />
                      <FieldError message={fieldErrors.address} />
                    </div>

                    <div
                      className={`rounded-md border p-3.5 ${
                        fieldErrors.ndpaConsent
                          ? 'border-red-300 bg-red-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={ndpaConsent}
                          onChange={(e) => {
                            setNdpaConsent(e.target.checked);
                            clearError('ndpaConsent');
                          }}
                          className={`mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 ${
                            isHealth
                              ? 'text-[#3d8fd1] focus:ring-[#3d8fd1]'
                              : isEducation
                                ? 'text-[#c9a227] focus:ring-[#c9a227]'
                                : 'text-[#02509e] focus:ring-[#02509e]'
                          }`}
                        />
                        <span className="text-xs leading-relaxed text-slate-600">
                          <span className="font-semibold text-[#05264c]">
                            Nigeria Data Protection Act (NDPA) consent.{' '}
                          </span>
                          I consent to Adeshina College collecting and processing my personal data for
                          admissions. I understand my rights to access, correct, or request deletion of
                          my data under the NDPA.
                          <span className="text-red-500"> *</span>
                        </span>
                      </label>
                      <FieldError message={fieldErrors.ndpaConsent} />
                    </div>

                    <div className="flex items-start gap-2.5 rounded-md border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
                      <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${accentIcon}`} />
                      <span>Please ensure your details match your government-issued ID or birth certificate. You will present original copies for screening.</span>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 2: Programme Selection                        */}
                {/* -------------------------------------------------- */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>
                        Academic College
                      </label>
                      <div
                        className={`rounded-2xl border p-4 text-left ${
                          isHealth
                            ? 'border-[#3d8fd1]/40 bg-[#3d8fd1]/5'
                            : isEducation
                              ? 'border-[#c9a227]/45 bg-[#fff8e8]'
                              : 'border-[#02509e]/35 bg-[#02509e]/5'
                        }`}
                      >
                        <span
                          className={`mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] ${
                            isHealth
                              ? 'text-[#2a73ad]'
                              : isEducation
                                ? 'text-[#a8861a]'
                                : 'text-[#02509e]'
                          }`}
                        >
                          Applying to
                        </span>
                        <span className={`block font-serif text-base font-semibold ${titleColor}`}>
                          {college.name}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">{college.tagline}</span>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Select Programme of Study <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedProgramme}
                        onChange={(e) => {
                          setSelectedProgramme(e.target.value);
                          clearError('selectedProgramme');
                        }}
                        aria-invalid={Boolean(fieldErrors.selectedProgramme)}
                        className={`${inputClass}${fieldErrors.selectedProgramme ? inputErrorExtra : ''}${!selectedProgramme ? ' text-slate-400' : ''}`}
                      >
                        <option value="">-- Select Programme ({availableProgrammes.length} Available) --</option>
                        {availableProgrammes.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — ({p.level})
                          </option>
                        ))}
                      </select>
                      <FieldError message={fieldErrors.selectedProgramme} />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Intake Period / Session <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIntakePeriod('2025/2026 Academic Session');
                            clearError('intakePeriod');
                          }}
                          className={`rounded-2xl border px-4 py-3 text-left text-[13px] font-semibold transition-colors ${
                            intakePeriod === '2025/2026 Academic Session'
                              ? isEducation
                                ? 'border-[#0c2340] bg-[#0c2340] text-white'
                                : 'border-[#05264c] bg-[#05264c] text-white'
                              : isEducation
                                ? 'border-[#0c2340]/12 bg-white text-[#0c2340] hover:border-[#3d8fd1] hover:bg-[#eaf4fb]'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }${fieldErrors.intakePeriod && !intakePeriod ? ' !border-red-400' : ''}`}
                        >
                          2025/2026 Academic Session
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIntakePeriod('2026/2027 Academic Session');
                            clearError('intakePeriod');
                          }}
                          className={`rounded-2xl border px-4 py-3 text-left text-[13px] font-semibold transition-colors ${
                            intakePeriod === '2026/2027 Academic Session'
                              ? isEducation
                                ? 'border-[#0c2340] bg-[#0c2340] text-white'
                                : 'border-[#05264c] bg-[#05264c] text-white'
                              : isEducation
                                ? 'border-[#0c2340]/12 bg-white text-[#0c2340] hover:border-[#3d8fd1] hover:bg-[#eaf4fb]'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }${fieldErrors.intakePeriod && !intakePeriod ? ' !border-red-400' : ''}`}
                        >
                          2026/2027 Academic Session
                        </button>
                      </div>
                      <FieldError message={fieldErrors.intakePeriod} />
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 3: Academic Background (O'Level & Grades)     */}
                {/* -------------------------------------------------- */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Examination Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={examType}
                          onChange={(e) => {
                            setExamType(e.target.value);
                            clearError('examType');
                          }}
                          aria-invalid={Boolean(fieldErrors.examType)}
                          className={`${inputClass}${fieldErrors.examType ? inputErrorExtra : ''}${!examType ? ' text-slate-400' : ''}`}
                        >
                          <option value="">Select examination type</option>
                          <option value="WAEC (SSCE)">WAEC (SSCE)</option>
                          <option value="NECO (SSCE)">NECO (SSCE)</option>
                          <option value="NABTEB">NABTEB</option>
                          <option value="GCE (O'Level)">GCE (O'Level)</option>
                          <option value="Combined Results">Combined Results</option>
                        </select>
                        <FieldError message={fieldErrors.examType} />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Number of Sittings <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={sittings}
                          onChange={(e) => {
                            setSittings(e.target.value);
                            clearError('sittings');
                          }}
                          aria-invalid={Boolean(fieldErrors.sittings)}
                          className={`${inputClass}${fieldErrors.sittings ? inputErrorExtra : ''}${!sittings ? ' text-slate-400' : ''}`}
                        >
                          <option value="">Select sittings</option>
                          <option value="1 Sitting">1 Sitting</option>
                          <option value="2 Sittings">2 Sittings</option>
                        </select>
                        <FieldError message={fieldErrors.sittings} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>
                          Name of Secondary School Attended <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter secondary school name"
                          value={schoolName}
                          onChange={(e) => {
                            setSchoolName(e.target.value);
                            clearError('schoolName');
                          }}
                          aria-invalid={Boolean(fieldErrors.schoolName)}
                          className={`${inputClass}${fieldErrors.schoolName ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.schoolName} />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Year of Result <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g. 2024"
                          value={yearOfResult}
                          onChange={(e) => {
                            setYearOfResult(e.target.value);
                            clearError('yearOfResult');
                          }}
                          aria-invalid={Boolean(fieldErrors.yearOfResult)}
                          className={`${inputClass}${fieldErrors.yearOfResult ? inputErrorExtra : ''}`}
                        />
                        <FieldError message={fieldErrors.yearOfResult} />
                      </div>
                    </div>

                    {/* O'Level Subject Rows */}
                    <div className="pt-2">
                      <div className="mb-2">
                        <label className={labelClass}>
                          O'Level Subjects & Grades <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Minimum of five credit passes, including English Language and Mathematics, obtained in not more than two sittings.
                        </span>
                        <FieldError message={fieldErrors.subjects} />
                      </div>

                      <div className="mt-3 space-y-2">
                        {subjects.map((item, index) => {
                          const isMandatory = index < 2;
                          const subjectErr = fieldErrors[`subject-${item.id}`];
                          const gradeErr = fieldErrors[`grade-${item.id}`];
                          return (
                            <div key={item.id} className="space-y-1">
                              <div className="flex items-center gap-2.5">
                                <div className="flex-grow">
                                  {isMandatory ? (
                                    <input
                                      type="text"
                                      disabled
                                      value={item.subject}
                                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-[13px] font-medium text-slate-700"
                                    />
                                  ) : (
                                    <select
                                      value={item.subject}
                                      onChange={(e) => handleSubjectChange(item.id, 'subject', e.target.value)}
                                      aria-invalid={Boolean(subjectErr)}
                                      className={`${inputClass}${subjectErr ? inputErrorExtra : ''}${!item.subject ? ' text-slate-400' : ''}`}
                                    >
                                      <option value="">Select Subject...</option>
                                      {COMMON_SUBJECTS.map((sub) => (
                                        <option key={sub} value={sub}>{sub}</option>
                                      ))}
                                    </select>
                                  )}
                                </div>

                                <div className="w-28 shrink-0 sm:w-36">
                                  <select
                                    value={item.grade}
                                    onChange={(e) => handleSubjectChange(item.id, 'grade', e.target.value)}
                                    aria-invalid={Boolean(gradeErr)}
                                    className={`${inputClass}${gradeErr ? inputErrorExtra : ''}${
                                      !item.grade ? ' text-slate-400' : ''
                                    }`}
                                  >
                                    <option value="">Select grade</option>
                                    {GRADE_OPTIONS.map((gr) => (
                                      <option key={gr} value={gr}>
                                        {gr}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="flex w-8 shrink-0 items-center justify-center">
                                  {!isMandatory ? (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveSubject(item.id)}
                                      className="rounded p-1 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                                      title="Remove subject"
                                      aria-label="Remove subject"
                                    >
                                      <X className="h-4 w-4 stroke-[2.5]" />
                                    </button>
                                  ) : (
                                    <span className="w-4" />
                                  )}
                                </div>
                              </div>
                              {(subjectErr || gradeErr) && (
                                <p className="font-sans text-[12px] font-medium text-red-600">
                                  {[subjectErr, gradeErr].filter(Boolean).join(' ')}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={handleAddSubject}
                        className={`mt-3.5 inline-flex items-center gap-1.5 rounded-2xl border border-dashed px-3 py-2 text-[12px] font-semibold transition-colors ${
                          isHealth
                            ? 'border-[#3d8fd1]/40 text-[#2a73ad] hover:border-[#3d8fd1] hover:bg-[#3d8fd1]/5'
                            : isEducation
                              ? 'border-[#c9a227]/50 text-[#a8861a] hover:border-[#c9a227] hover:bg-[#fff8e8]'
                              : 'border-[#02509e]/35 text-[#02509e] hover:border-[#02509e] hover:bg-[#02509e]/5'
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Subject</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 4: Document Upload                            */}
                {/* -------------------------------------------------- */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    {/* Transcript / O'Level Slip */}
                    <div>
                      <label className={labelClass}>
                        Transcript / O'Level Result Slip <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex flex-col items-center justify-between gap-4 rounded-lg border border-dashed bg-slate-50/80 p-5 sm:flex-row ${
                          fieldErrors.olevelFile ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              isHealth
                                ? 'bg-[#3d8fd1]/15 text-[#2a73ad]'
                                : isEducation
                                  ? 'bg-[#eaf4fb] text-[#3d8fd1]'
                                  : 'bg-[#02509e]/10 text-[#02509e]'
                            }`}
                          >
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-[#05264c]">
                              {olevelFileName ? olevelFileName : "O'Level Result Statement"}
                            </span>
                            <span className="block text-xs text-slate-400">
                              PDF, JPG, or PNG up to 5MB
                            </span>
                          </div>
                        </div>

                        <label className={`${outlineBtn} cursor-pointer`}>
                          <span>{olevelFileName ? 'Replace File' : 'Upload File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setOlevelFileName(e.target.files[0].name);
                                clearError('olevelFile');
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <FieldError message={fieldErrors.olevelFile} />
                    </div>

                    {/* Passport / ID Copy */}
                    <div>
                      <label className={labelClass}>
                        Passport / Identity Document <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex flex-col items-center justify-between gap-4 rounded-lg border border-dashed bg-slate-50/80 p-5 sm:flex-row ${
                          fieldErrors.passportFile ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-slate-200/80 text-slate-600">
                            <Upload className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-[#05264c]">
                              {passportFileName ? passportFileName : 'Recent Passport Photograph'}
                            </span>
                            <span className="block text-xs text-slate-400">
                              Clear color photograph or ID scan (up to 5MB)
                            </span>
                          </div>
                        </div>

                        <label className={`${outlineBtn} cursor-pointer`}>
                          <span>{passportFileName ? 'Replace File' : 'Upload File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setPassportFileName(e.target.files[0].name);
                                clearError('passportFile');
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <FieldError message={fieldErrors.passportFile} />
                    </div>

                    <div className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      <span>Ensure all text and stamps are clearly legible. Both documents are required to continue. Originals will be verified on campus.</span>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 5: Review & Submit                            */}
                {/* -------------------------------------------------- */}
                {currentStep === 5 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="font-serif text-base font-semibold text-[#05264c]">
                        Please review your application summary before final submission:
                      </h2>

                      <div className="space-y-1.5 rounded-md border border-slate-200 bg-slate-50 p-4 text-xs">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          1. Personal Details
                        </span>
                        <p><span className="text-slate-400">Name:</span> <span className="font-semibold text-[#05264c]">{firstName} {lastName}</span></p>
                        <p><span className="text-slate-400">Phone / Email:</span> <span className="font-semibold text-[#05264c]">{phone} {email && `· ${email}`}</span></p>
                        <p><span className="text-slate-400">State / Gender:</span> <span className="font-semibold text-[#05264c]">{stateOfOrigin || 'N/A'} · {gender}</span></p>
                      </div>

                      <div className="space-y-1.5 rounded-md border border-slate-200 bg-slate-50 p-4 text-xs">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          2. Chosen Academic Programme
                        </span>
                        <p><span className="text-slate-400">College:</span> <span className="font-semibold text-[#05264c]">{selectedCollege === 'health-technology' ? 'Adeshina College of Health Technology' : 'Adeshina College of Education'}</span></p>
                        <p><span className="text-slate-400">Programme:</span> <span className="font-semibold text-[#05264c]">{selectedProgramme || 'Not selected'} (Full-time)</span></p>
                        <p><span className="text-slate-400">Intake Session:</span> <span className="font-semibold text-[#05264c]">{intakePeriod}</span></p>
                      </div>

                      <div className="space-y-1.5 rounded-md border border-slate-200 bg-slate-50 p-4 text-xs">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          3. Academic Credentials
                        </span>
                        <p><span className="text-slate-400">Exam & Sittings:</span> <span className="font-semibold text-[#05264c]">{examType} ({sittings}) · School: {schoolName || 'N/A'}</span></p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {subjects.map((sub) => (
                            <span key={sub.id} className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-[#05264c]">
                              {sub.subject}: <strong>{sub.grade}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 border-t border-slate-100 pt-2">
                      <div
                        className={`rounded-md border p-3.5 ${
                          fieldErrors.ndpaConsent
                            ? 'border-red-300 bg-red-50'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={ndpaConsent}
                            onChange={(e) => {
                              setNdpaConsent(e.target.checked);
                              clearError('ndpaConsent');
                            }}
                            className={`mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 ${
                              isHealth
                                ? 'text-[#3d8fd1] focus:ring-[#3d8fd1]'
                                : isEducation
                                  ? 'text-[#c9a227] focus:ring-[#c9a227]'
                                  : 'text-[#02509e] focus:ring-[#02509e]'
                            }`}
                          />
                          <span className="text-xs leading-relaxed text-slate-600">
                            <span className="font-semibold text-[#05264c]">NDPA confirmation. </span>
                            I reaffirm consent under the Nigeria Data Protection Act for processing my
                            application data, and I understand my data-subject rights.
                            <span className="text-red-500"> *</span>
                          </span>
                        </label>
                        <FieldError message={fieldErrors.ndpaConsent} />
                      </div>

                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-3.5 ${
                          fieldErrors.termsAccepted
                            ? 'border-red-300 bg-red-50'
                            : 'border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            clearError('termsAccepted');
                          }}
                          className={`mt-0.5 h-4 w-4 rounded border-slate-300 ${
                            isHealth
                              ? 'text-[#3d8fd1] focus:ring-[#3d8fd1]'
                              : isEducation
                                ? 'text-[#c9a227] focus:ring-[#c9a227]'
                                : 'text-[#02509e] focus:ring-[#02509e]'
                          }`}
                        />
                        <span className="text-xs leading-relaxed text-slate-600">
                          I hereby certify that all information supplied above is complete, accurate, and represents my true academic and personal records.
                          <span className="text-red-500"> *</span>
                        </span>
                      </label>
                      <FieldError message={fieldErrors.termsAccepted} />
                    </div>

                    <div className="flex flex-col items-center pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !termsAccepted || !ndpaConsent}
                        className={`flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[14px] font-semibold text-white transition-colors disabled:opacity-50 ${primaryBtn}`}
                      >
                        {isSubmitting ? (
                          <span>Generating Official Slip...</span>
                        ) : (
                          <>
                            <span>Submit Application & Generate Slip</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="mt-3 py-1 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[#05264c]"
                      >
                        Previous Step
                      </button>
                    </div>
                  </form>
                )}

                {currentStep < 5 && (
                  <div className="mt-8 flex flex-col items-center border-t border-slate-100 pt-6">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={`flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[14px] font-semibold text-white transition-colors ${primaryBtn}`}
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => (currentStep > 1 ? handlePrevStep() : navigate(path('admissions')))}
                      className="mt-3 py-1 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[#05264c]"
                    >
                      {currentStep > 1 ? 'Previous Step' : 'Back to Admissions'}
                    </button>
                  </div>
                )}
                </div>
              </div>
            </div>

            {/* Right Column: default / non-college shell only */}
            {!isCollegeShell ? (
            <div className="space-y-6 lg:col-span-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-[#05264c] shadow-sm">
                <img
                  src="/images/education/campus-gate.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#05264c] via-[#05264c]/45 to-transparent p-4 text-white">
                  <div>
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200">
                      Campus Enrollment
                    </span>
                    <span className="font-serif text-sm font-semibold">{college.name}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Application Steps
                </h3>

                <div className="space-y-3.5">
                  {stepsList.map((step) => {
                    const isPassed = currentStep > step.num;
                    const isCurrent = currentStep === step.num;

                    return (
                      <div key={step.num} className="flex items-center gap-3">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                            isPassed
                              ? 'bg-[#02509e] text-white'
                              : isCurrent
                              ? 'bg-[#05264c] text-white'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isPassed ? <Check className="h-4 w-4 stroke-[3]" /> : step.num}
                        </div>
                        <span
                          className={`text-sm ${
                            isCurrent
                              ? 'font-semibold text-[#05264c]'
                              : isPassed
                              ? 'font-medium text-slate-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
                <h3 className="font-serif text-sm font-semibold text-[#05264c]">
                  Need Help Applying?
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  Our admissions officers can walk you through any step of the form.
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href="tel:08135131503"
                    className="flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-[#05264c] transition-colors hover:border-slate-300 hover:bg-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#02509e]" />
                    <span>0813 513 1503</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center justify-center gap-2 truncate rounded-md border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-[#05264c] transition-colors hover:border-slate-300 hover:bg-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#02509e]" />
                    <span className="truncate">{siteConfig.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>
            ) : isHealth ? (
              <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
                <a
                  href="tel:08135131503"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-md bg-[#f7f9fb] px-4 py-4 ring-1 ring-[#041c36]/12 transition-colors hover:ring-[#041c36]/25"
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-[#041c36]" aria-hidden="true" />
                  <Phone className="relative h-4 w-4 text-[#3d8fd1]" />
                  <span className="relative">
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4a5560]">
                      Registry phone
                    </span>
                    <span className="font-sans text-[14px] font-semibold text-[#041c36]">
                      0813 513 1503
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-md bg-[#f7f9fb] px-4 py-4 ring-1 ring-[#041c36]/12 transition-colors hover:ring-[#041c36]/25"
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-[#041c36]" aria-hidden="true" />
                  <Mail className="relative h-4 w-4 text-[#3d8fd1]" />
                  <span className="relative min-w-0">
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4a5560]">
                      Registry email
                    </span>
                    <span className="block truncate font-sans text-[14px] font-semibold text-[#041c36]">
                      {siteConfig.contact.email}
                    </span>
                  </span>
                </a>
              </div>
            ) : (
              <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
                <a
                  href="tel:08135131503"
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-[0_4px_0_0_#0c2340,0_14px_28px_-18px_rgba(12,35,64,0.3)] ring-1 ring-[#0c2340]/10 transition-colors hover:bg-[#f3f8fc]"
                >
                  <Phone className="h-4 w-4 text-[#c9a227]" />
                  <span>
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#5a6570]">
                      Registry phone
                    </span>
                    <span className="font-sans text-[14px] font-semibold text-[#0c2340]">
                      0813 513 1503
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-[0_4px_0_0_#c9a227,0_14px_28px_-18px_rgba(12,35,64,0.3)] ring-1 ring-[#0c2340]/10 transition-colors hover:bg-[#f3f8fc]"
                >
                  <Mail className="h-4 w-4 text-[#3d8fd1]" />
                  <span className="min-w-0">
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#5a6570]">
                      Registry email
                    </span>
                    <span className="block truncate font-sans text-[14px] font-semibold text-[#0c2340]">
                      {siteConfig.contact.email}
                    </span>
                  </span>
                </a>
              </div>
            )}
          </div>
          </div>
        )}
        </Container>
      </div>
    </div>
  );
}
