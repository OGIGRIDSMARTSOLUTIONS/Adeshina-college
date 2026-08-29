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
import { siteConfig } from '@/data/siteConfig';

type PortalTab = 'student' | 'staff';

// High-resolution campus graduation/students background image from Unsplash
const PORTAL_BG_IMAGE = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80';

export function PortalPage() {
  const [activeTab, setActiveTab] = useState<PortalTab>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#071322]">
      {/* Full-Screen Photography Background with Dark Gradient Overlay */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src={PORTAL_BG_IMAGE}
          alt="Adeshina Academic Community Background"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-40' : 'opacity-0'
          }`}
        />
        {/* Cinematic dark blue overlay for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071322]/90 via-[#071322]/75 to-[#071322]/95" />
      </div>

      {/* Top Header Row with Logo & Return to Main Website Link */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-2 sm:py-4">
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
          title="Return to Main Website"
        >
          {siteConfig.brand.logoUrl ? (
            <img
              src={siteConfig.brand.logoUrl}
              alt={siteConfig.institutionName}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg shadow-sm bg-white p-0.5"
            />
          ) : (
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-navy flex items-center justify-center text-white font-serif font-black text-xl">
              A
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="text-white font-serif font-black text-sm sm:text-base tracking-tight leading-tight group-hover:text-sky-300 transition-colors">
              {siteConfig.institutionName}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-bold">
              {siteConfig.location} · Kwara State
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-300" />
          <span>Return to Website</span>
        </Link>
      </header>

      {/* Center Main Content: Institutional Header & Login Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-6 sm:my-8">
        {/* Header Title with Official School Logo */}
        <div className="text-center mb-6">
          <div className="inline-block p-1.5 rounded-2xl bg-white shadow-lg border border-white/20 mb-3">
            {siteConfig.brand.logoUrl ? (
              <img
                src={siteConfig.brand.logoUrl}
                alt={`${siteConfig.institutionName} Official Emblem`}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-xl mx-auto"
              />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-navy flex items-center justify-center text-white font-serif font-black text-2xl">
                A
              </div>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-sky-300 block mb-1">
            INSTITUTIONAL GATEWAY
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
            Adeshina Portal Access
          </h1>
          <p className="mt-1.5 text-xs text-slate-300 max-w-sm mx-auto">
            Secure login gateway for registered students and academic staff across our colleges in Share.
          </p>
        </div>

        {/* Central Auth Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden">
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
            <div className="mb-5">
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
              <div className="mb-4 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-slate-800 text-xs flex items-start gap-2.5 leading-relaxed">
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
                  {activeTab === 'student' ? 'MATRICULATION / REGISTRATION NO.' : 'STAFF ID / EMAIL ADDRESS'}
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
                    PASSWORD
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
              <div className="flex items-center justify-between pt-0.5">
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

            {/* Helper link pointing prospective applicants to online application */}
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Are you a prospective applicant seeking admission?
              </p>
              <Link
                to="/apply"
                className="inline-block mt-1 text-xs font-bold text-adeshina-blue hover:underline"
              >
                Go to Online Application Form &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom Features Info */}
          <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-200/80">
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 font-medium">
              <div className="flex flex-col items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Course Reg</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ReceiptText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fee Receipts</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Grade Sheets</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Portal Footer */}
      <footer className="relative z-10 w-full max-w-md mx-auto text-center space-y-1.5 text-xs text-slate-300 pb-2">
        <div className="flex items-center justify-center gap-1.5 text-slate-200 font-semibold text-[11px]">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Secure SSL Encrypted Institutional Gateway</span>
        </div>
        <p className="text-[11px] text-slate-400">
          For portal login issues or pin retrieval, contact the ICT unit:{' '}
          <a
            href="tel:08135131503"
            className="font-bold text-white hover:underline"
          >
            0813 513 1503
          </a>
        </p>
      </footer>
    </div>
  );
}
