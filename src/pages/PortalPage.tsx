import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  FileCheck2, 
  BookOpen, 
  ReceiptText, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { Container } from '@/components/common/Container';

type PortalTab = 'student' | 'staff';

export function PortalPage() {
  const [activeTab, setActiveTab] = useState<PortalTab>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setErrorMessage('Please enter your credentials and password.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage(
        activeTab === 'staff'
          ? 'Staff ICT authentication gateway active. Please contact the campus ICT administrator for authorized session token.'
          : 'Student database session active: Matriculation credentials verified. Course registrations and fee records synchronized.'
      );
    }, 700);
  };

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-80px)] py-10 sm:py-14">
      <Container size="default">
        {/* Back Link */}
        <div className="mb-6 max-w-md mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300/80 text-navy text-xs font-bold transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#081426] text-white mb-4 shadow-md">
            <GraduationCap className="w-8 h-8 text-accent-gold" />
          </div>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-1.5">
            INSTITUTIONAL GATEWAY
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-navy">
            Adeshina Portal Access
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Secure login gateway for registered students and academic staff across our colleges in Share.
          </p>
        </div>

        {/* Central Auth Container */}
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Top Segmented Tab Switcher (2 Tabs: Student & Staff) */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setErrorMessage('');
              }}
              className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'student'
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('staff');
                setErrorMessage('');
              }}
              className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'staff'
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-100'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Staff Portal</span>
            </button>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-serif font-bold text-navy">
                {activeTab === 'student' ? 'Student Portal Login' : 'Staff & Faculty ICT Access'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeTab === 'student'
                  ? 'Enter your Matriculation Number or Registration ID to access semester course registration and result records.'
                  : 'Institutional staff credentials for grading, departmental records, and administrative duties.'}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-slate-800 text-xs flex items-start gap-2.5 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-adeshina-blue shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier Input */}
              <div>
                <label
                  htmlFor="portal-identifier"
                  className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5"
                >
                  {activeTab === 'student' ? 'Matriculation / Registration No.' : 'Staff ID / Email Address'}
                </label>
                <input
                  id="portal-identifier"
                  type="text"
                  required
                  placeholder={
                    activeTab === 'student'
                      ? 'e.g. AD/HT/2024/0142'
                      : 'e.g. staff.id@adeshina.edu.ng'
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue focus:border-adeshina-blue outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="portal-password"
                    className="block text-xs font-bold uppercase tracking-wider text-navy"
                  >
                    Password
                  </label>
                  <a
                    href="tel:08135131503"
                    className="text-[11px] font-semibold text-adeshina-blue hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="portal-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white border border-slate-300 text-navy text-sm focus:ring-2 focus:ring-adeshina-blue focus:border-adeshina-blue outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-adeshina-blue focus:ring-adeshina-blue border-slate-300"
                  />
                  <span className="text-xs text-slate-600">Keep me signed in</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-5 rounded-xl bg-adeshina-blue hover:bg-navy text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <span>Sign In to {activeTab === 'student' ? 'Student' : 'Staff'} Portal</span>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Helper Links for Applicants looking for admissions */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Are you a prospective applicant seeking admission?
              </p>
              <Link
                to="/apply"
                className="inline-block mt-1.5 text-xs font-bold text-adeshina-blue hover:underline"
              >
                Go to Online Application Form &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom Features Info */}
          <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-200/80">
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 font-medium">
              <div className="flex flex-col items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5 text-accent-gold" />
                <span>Course Reg</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ReceiptText className="w-3.5 h-3.5 text-accent-gold" />
                <span>Fee Receipts</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-accent-gold" />
                <span>Grade Sheets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Registry & ICT Support Desk */}
        <div className="mt-8 max-w-md mx-auto text-center space-y-2 text-xs text-slate-500">
          <div className="flex items-center justify-center gap-1.5 text-slate-600 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure SSL Encrypted Institutional Gateway</span>
          </div>
          <p>
            For portal login issues or pin retrieval, contact the ICT unit:{' '}
            <a href="tel:08135131503" className="text-adeshina-blue font-bold hover:underline">
              0813 513 1503
            </a>{' '}
            or visit the registry on campus in Share.
          </p>
        </div>
      </Container>
    </div>
  );
}
