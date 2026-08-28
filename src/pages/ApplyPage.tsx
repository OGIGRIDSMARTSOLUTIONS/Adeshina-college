import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Phone, 
  Mail, 
  Upload, 
  FileText, 
  Trash2, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Printer, 
  Check,
  Sparkles
} from 'lucide-react';
import { programmes } from '@/data/programmes';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

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
  'Health Science'
];

const GRADE_OPTIONS = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9', 'Awaiting Result (AR)'];

export function ApplyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [stateOfOrigin, setStateOfOrigin] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Program Selection
  const [selectedCollege, setSelectedCollege] = useState<'health-technology' | 'education'>('health-technology');
  const [selectedProgramme, setSelectedProgramme] = useState('');
  const [intakePeriod, setIntakePeriod] = useState('2024/2025 Regular Session');

  // Step 3: Academic Background
  const [examType, setExamType] = useState('WAEC (SSCE)');
  const [sittings, setSittings] = useState('1 Sitting');
  const [schoolName, setSchoolName] = useState('');
  const [yearOfResult, setYearOfResult] = useState('2024');
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { id: '1', subject: 'English Language', grade: 'C4' },
    { id: '2', subject: 'Mathematics', grade: 'C5' },
    { id: '3', subject: 'Biology', grade: 'B3' },
    { id: '4', subject: 'Chemistry', grade: 'C4' },
    { id: '5', subject: 'Physics', grade: 'C6' },
  ]);

  // Step 4: Documents
  const [olevelFileName, setOlevelFileName] = useState<string | null>(null);
  const [passportFileName, setPassportFileName] = useState<string | null>(null);

  // Step 5: Submission & Ref
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableProgrammes = programmes.filter((p) => p.collegeId === selectedCollege);

  const handleAddSubject = () => {
    const nextId = String(Date.now());
    setSubjects((prev) => [
      ...prev,
      { id: nextId, subject: 'Select subject', grade: 'C5' }
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 2) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubjectChange = (id: string, field: 'subject' | 'grade', value: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!firstName || !lastName || !phone) {
        alert('Please fill in your first name, last name, and phone number.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!selectedProgramme) {
        alert('Please select your desired programme of study.');
        return;
      }
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please certify that your information is true and accurate.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const collegeCode = selectedCollege === 'health-technology' ? 'HT' : 'COE';
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const generated = `AD-${collegeCode}-${randomDigits}`;
      setSubmittedRef(generated);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const stepsList = [
    { num: 1, title: 'Personal Information' },
    { num: 2, title: 'Program Selection' },
    { num: 3, title: 'Academic Background' },
    { num: 4, title: 'Document Upload' },
    { num: 5, title: 'Review & Submit' },
  ];

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return { main: 'Apply Now', sub: 'Step 1: Personal Information' };
      case 2:
        return { main: 'Choose Program', sub: 'Step 2: Program Selection' };
      case 3:
        return { main: 'Education', sub: 'Step 3: Academic Background' };
      case 4:
        return { main: 'Verify Identity', sub: 'Step 4: Document Upload' };
      case 5:
        return { main: 'Review & Submit', sub: 'Step 5: Final Submission' };
      default:
        return { main: 'Apply Now', sub: '' };
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14">
      <Container size="wide">
        {submittedRef ? (
          /* ============================================================ */
          /* SUCCESS / PRINTABLE SLIP VIEW                                */
          /* ============================================================ */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10">
            <div className="text-center pb-6 border-b border-slate-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-2">
                APPLICATION SUBMITTED SUCCESSFULLY
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-navy">
                Provisional Application Registration Slip
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {siteConfig.institutionName} · {siteConfig.location}, Kwara State
              </p>
            </div>

            {/* Slip Reference Block */}
            <div className="my-6 p-5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Official Application Reference Code
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-adeshina-blue tracking-wider block mt-0.5">
                  {submittedRef}
                </span>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-adeshina-blue transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application Slip</span>
              </button>
            </div>

            {/* Applicant Summary */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <h2 className="font-serif font-bold text-navy text-base pb-2 border-b border-slate-100">
                Summary of Applicant Credentials
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50/70 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Full Name:</span>
                  <span className="font-bold text-navy">{firstName} {lastName}</span>
                </div>
                <div className="p-3 bg-slate-50/70 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Contact Phone / Email:</span>
                  <span className="font-bold text-navy">{phone} {email && `· ${email}`}</span>
                </div>
                <div className="p-3 bg-slate-50/70 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Selected College:</span>
                  <span className="font-bold text-navy">
                    {selectedCollege === 'health-technology' ? 'Adeshina College of Health Technology' : 'Adeshina College of Education'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50/70 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Programme of Study:</span>
                  <span className="font-bold text-navy">{selectedProgramme} (Full-time)</span>
                </div>
                <div className="p-3 bg-slate-50/70 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Target Session:</span>
                  <span className="font-bold text-navy">{intakePeriod}</span>
                </div>
                <div className="p-3 bg-slate-50/70 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Examination Type & Sittings:</span>
                  <span className="font-bold text-navy">{examType} · {sittings}</span>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="p-5 rounded-xl bg-blue-50/80 border border-blue-100 mt-6 space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-navy flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                  Next Steps for Physical Verification at Share Campus:
                </h3>
                <p>1. Present this reference code (<span className="font-mono font-bold text-navy">{submittedRef}</span>) at the Admissions Registry.</p>
                <p>2. Bring photocopies and original copies of your SSCE/WAEC/NECO result slips and two (2) passport photographs.</p>
                <p>3. Registry Telephone: <a href="tel:08135131503" className="font-bold text-adeshina-blue underline">0813 513 1503</a></p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="px-6 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-adeshina-blue transition-all"
                >
                  Return to Home
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  Campus Travel Directions
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* 5-STEP APPLICATION WIZARD (Matching Reference Layout)        */
          /* ============================================================ */
          <div className="space-y-4">
            {/* Top Back Navigation Bar */}
            <div className="flex items-center justify-between pb-2">
              <button
                type="button"
                onClick={() => (currentStep > 1 ? handlePrevStep() : navigate('/admissions'))}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300/80 text-navy text-xs font-bold transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{currentStep > 1 ? 'Go to Previous Step' : 'Back to Admissions'}</span>
              </button>

              <Link
                to="/"
                className="text-xs font-bold text-slate-500 hover:text-navy transition-colors"
              >
                Return to Home &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Active Form Step */}
            <div className="lg:col-span-8">
              {/* Header Title & Progress Counter */}
              <div className="mb-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-navy">
                      {getStepTitle().main}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {getStepTitle().sub}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 block">
                      PROGRESS
                    </span>
                    <span className="text-sm sm:text-base font-serif font-black text-navy">
                      {currentStep} of 5
                    </span>
                  </div>
                </div>

                {/* Blue Progress Bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-adeshina-blue h-full transition-all duration-300"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>

                {/* Autosaved Indicator */}
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 mt-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>All changes saved to session</span>
                </div>
              </div>

              {/* Main Step Form Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                {/* -------------------------------------------------- */}
                {/* STEP 1: Personal Information                       */}
                {/* -------------------------------------------------- */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="example@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 803 000 0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Gender
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">Use Day / Month / Year format</span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          State of Origin
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kwara State"
                          value={stateOfOrigin}
                          onChange={(e) => setStateOfOrigin(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Permanent Residential Address
                      </label>
                      <input
                        type="text"
                        placeholder="Street name, City, State"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600 mt-4">
                      <ShieldCheck className="w-4 h-4 text-adeshina-blue shrink-0 mt-0.5" />
                      <span>Please ensure your details match your government-issued ID or birth certificate. You will present original copies for screening.</span>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 2: Program Selection                          */}
                {/* -------------------------------------------------- */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                        Select Academic College / Faculty
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCollege('health-technology');
                            setSelectedProgramme('');
                          }}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            selectedCollege === 'health-technology'
                              ? 'border-adeshina-blue bg-blue-50/50 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                            College 01
                          </span>
                          <span className="block font-serif font-bold text-navy text-sm sm:text-base">
                            Adeshina College of Health Technology
                          </span>
                          <span className="block text-xs text-slate-500 mt-1">
                            CHEW, MLT, Pharmacy Tech, Environmental Health
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCollege('education');
                            setSelectedProgramme('');
                          }}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            selectedCollege === 'education'
                              ? 'border-adeshina-blue bg-blue-50/50 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="block text-xs font-bold text-adeshina-blue uppercase tracking-wider mb-1">
                            College 02
                          </span>
                          <span className="block font-serif font-bold text-navy text-sm sm:text-base">
                            Adeshina College of Education
                          </span>
                          <span className="block text-xs text-slate-500 mt-1">
                            Nigeria Certificate in Education (NCE)
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                        Select Program of Study <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedProgramme}
                        onChange={(e) => setSelectedProgramme(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-navy text-sm font-medium focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                      >
                        <option value="">-- Select Programme ({availableProgrammes.length} Available) --</option>
                        {availableProgrammes.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — ({p.level})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                        Intake Period / Session
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIntakePeriod('2024/2025 Regular Session')}
                          className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                            intakePeriod === '2024/2025 Regular Session'
                              ? 'border-navy bg-navy text-white shadow-xs'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          2024/2025 Regular Session
                        </button>
                        <button
                          type="button"
                          onClick={() => setIntakePeriod('2025/2026 Academic Session')}
                          className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                            intakePeriod === '2025/2026 Academic Session'
                              ? 'border-navy bg-navy text-white shadow-xs'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          2025/2026 Academic Session
                        </button>
                      </div>
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
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Examination Type
                        </label>
                        <select
                          value={examType}
                          onChange={(e) => setExamType(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        >
                          <option value="WAEC (SSCE)">WAEC (SSCE)</option>
                          <option value="NECO (SSCE)">NECO (SSCE)</option>
                          <option value="NABTEB">NABTEB</option>
                          <option value="GCE (O'Level)">GCE (O'Level)</option>
                          <option value="Combined Results">Combined Results</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Number of Sittings
                        </label>
                        <select
                          value={sittings}
                          onChange={(e) => setSittings(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        >
                          <option value="1 Sitting">1 Sitting</option>
                          <option value="2 Sittings">2 Sittings</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Name of Secondary School Attended
                        </label>
                        <input
                          type="text"
                          placeholder="Enter secondary school name"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Year of Result
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2024"
                          value={yearOfResult}
                          onChange={(e) => setYearOfResult(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* O'Level Subject Rows */}
                    <div className="pt-2">
                      <div className="mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                          O'Level Subjects & Grades
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Minimum of five credit passes, including English Language and Mathematics, obtained in not more than two sittings.
                        </span>
                      </div>

                      <div className="space-y-2.5 mt-3">
                        {subjects.map((item, index) => {
                          const isMandatory = index < 2;
                          return (
                            <div key={item.id} className="flex items-center gap-2">
                              <div className="flex-grow">
                                {isMandatory ? (
                                  <input
                                    type="text"
                                    disabled
                                    value={item.subject}
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 text-navy text-xs sm:text-sm font-semibold"
                                  />
                                ) : (
                                  <select
                                    value={item.subject}
                                    onChange={(e) => handleSubjectChange(item.id, 'subject', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-navy text-xs sm:text-sm focus:ring-2 focus:ring-adeshina-blue outline-none"
                                  >
                                    <option value="Select subject">Select Subject...</option>
                                    {COMMON_SUBJECTS.map((sub) => (
                                      <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                  </select>
                                )}
                              </div>

                              <div className="w-32 sm:w-40 shrink-0">
                                <select
                                  value={item.grade}
                                  onChange={(e) => handleSubjectChange(item.id, 'grade', e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-navy text-xs sm:text-sm font-bold focus:ring-2 focus:ring-adeshina-blue outline-none"
                                >
                                  {GRADE_OPTIONS.map((gr) => (
                                    <option key={gr} value={gr}>{gr}</option>
                                  ))}
                                </select>
                              </div>

                              {!isMandatory && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSubject(item.id)}
                                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                  aria-label="Remove subject"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={handleAddSubject}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-adeshina-blue hover:text-navy transition-colors py-1 px-2 rounded-md hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add another subject</span>
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                        Transcript / O'Level Result Slip
                      </label>
                      <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 text-adeshina-blue flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-navy block">
                              {olevelFileName ? olevelFileName : "O'Level Result Statement"}
                            </span>
                            <span className="text-xs text-slate-400 block">
                              PDF, JPG, or PNG up to 5MB
                            </span>
                          </div>
                        </div>

                        <label className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-adeshina-blue text-navy hover:text-adeshina-blue text-xs font-bold transition-all cursor-pointer shadow-2xs">
                          <span>{olevelFileName ? 'Replace File' : 'Upload File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setOlevelFileName(e.target.files[0].name);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Passport / ID Copy */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                        Passport / Identity Document
                      </label>
                      <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-navy block">
                              {passportFileName ? passportFileName : 'Recent Passport Photograph'}
                            </span>
                            <span className="text-xs text-slate-400 block">
                              Clear color photograph or ID scan (up to 5MB)
                            </span>
                          </div>
                        </div>

                        <label className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-adeshina-blue text-navy hover:text-adeshina-blue text-xs font-bold transition-all cursor-pointer shadow-2xs">
                          <span>{passportFileName ? 'Replace File' : 'Upload File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setPassportFileName(e.target.files[0].name);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <span>Ensure all text and stamps are clearly legible before submitting. Document upload is optional during online pre-registration and can be verified physically on campus.</span>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 5: Review & Submit                            */}
                {/* -------------------------------------------------- */}
                {currentStep === 5 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="font-serif font-bold text-navy text-base">
                        Please review your application summary before final submission:
                      </h2>

                      {/* Personal block */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <span className="font-bold text-navy uppercase tracking-wider block text-[11px] mb-1">
                          1. Personal Details
                        </span>
                        <p><span className="text-slate-400">Name:</span> <span className="font-semibold text-navy">{firstName} {lastName}</span></p>
                        <p><span className="text-slate-400">Phone / Email:</span> <span className="font-semibold text-navy">{phone} {email && `· ${email}`}</span></p>
                        <p><span className="text-slate-400">State / Gender:</span> <span className="font-semibold text-navy">{stateOfOrigin || 'N/A'} · {gender}</span></p>
                      </div>

                      {/* Program block */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <span className="font-bold text-navy uppercase tracking-wider block text-[11px] mb-1">
                          2. Chosen Academic Program
                        </span>
                        <p><span className="text-slate-400">College:</span> <span className="font-semibold text-navy">{selectedCollege === 'health-technology' ? 'Adeshina College of Health Technology' : 'Adeshina College of Education'}</span></p>
                        <p><span className="text-slate-400">Programme:</span> <span className="font-semibold text-navy">{selectedProgramme || 'Not selected'} (Full-time)</span></p>
                        <p><span className="text-slate-400">Intake Session:</span> <span className="font-semibold text-navy">{intakePeriod}</span></p>
                      </div>

                      {/* Academic block */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <span className="font-bold text-navy uppercase tracking-wider block text-[11px] mb-1">
                          3. Academic Credentials
                        </span>
                        <p><span className="text-slate-400">Exam & Sittings:</span> <span className="font-semibold text-navy">{examType} ({sittings}) · School: {schoolName || 'N/A'}</span></p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {subjects.map((sub) => (
                            <span key={sub.id} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium text-navy text-[11px]">
                              {sub.subject}: <strong>{sub.grade}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="pt-2 border-t border-slate-100">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded text-adeshina-blue focus:ring-adeshina-blue border-slate-300"
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I hereby certify that all information supplied above is complete, accurate, and represents my true academic and personal records.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button & Go Back */}
                    <div className="pt-2 flex flex-col items-center">
                      <button
                        type="submit"
                        disabled={isSubmitting || !termsAccepted}
                        className="w-full py-3.5 px-6 rounded-xl bg-adeshina-blue hover:bg-navy active:bg-navy-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Generating Official Slip...</span>
                        ) : (
                          <>
                            <span>Submit Application & Generate Slip</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="mt-3 text-xs sm:text-sm font-semibold text-slate-500 hover:text-navy hover:underline transition-colors py-1"
                      >
                        Go Back to Previous Step
                      </button>
                    </div>
                  </form>
                )}

                {/* Bottom Stepper Action Buttons (Matching Reference Design) */}
                {currentStep < 5 && (
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-3.5 px-6 rounded-xl bg-adeshina-blue hover:bg-navy text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>Save & Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => (currentStep > 1 ? handlePrevStep() : navigate('/admissions'))}
                      className="mt-3 text-xs sm:text-sm font-semibold text-slate-500 hover:text-navy hover:underline transition-colors py-1"
                    >
                      Go Back
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Steps Progress & Support Card */}
            <div className="lg:col-span-4 space-y-6">
              {/* Photo Card */}
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-navy relative shadow-sm border border-slate-200/90">
                <img
                  src="/images/education/campus-gate.jpg"
                  alt="Adeshina Campus Gate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent flex items-end p-4 text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent-gold block">
                      CAMPUS ENROLLMENT
                    </span>
                    <span className="font-serif font-bold text-sm">
                      {siteConfig.institutionName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical Steps List Card (Grand-Plus style) */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                  Application Steps
                </h3>

                <div className="space-y-4">
                  {stepsList.map((step) => {
                    const isPassed = currentStep > step.num;
                    const isCurrent = currentStep === step.num;

                    return (
                      <div key={step.num} className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                            isPassed
                              ? 'bg-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-navy text-white shadow-xs ring-4 ring-blue-100'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isCurrent
                              ? 'text-navy font-bold'
                              : isPassed
                              ? 'text-slate-700'
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

              {/* Need Help Card (Grand-Plus style) */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 text-center space-y-3">
                <h3 className="font-serif font-bold text-navy text-sm">
                  Need Help Applying?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our admissions officers can walk you through any step of the form.
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href="tel:08135131503"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-navy hover:text-adeshina-blue border border-slate-200/80 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent-gold" />
                    <span>0813 513 1503</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-navy hover:text-adeshina-blue border border-slate-200/80 transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-accent-gold" />
                    <span className="truncate">{siteConfig.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </Container>
    </div>
  );
}
