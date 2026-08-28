import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Compass, Navigation } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeInterest: 'general',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Deep Navy Page Hero Banner */}
      <section className="bg-[#081426] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#081426] via-[#081426]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-20 pointer-events-none">
          <img
            src="/images/education/campus-gate.jpg"
            alt="Adeshina Campus Gate in Share"
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        <Container size="wide" className="relative z-20">
          <div className="max-w-3xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Contact Adeshina Group of Colleges
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Have questions regarding admissions, programme requirements, or campus visits? Reach out to our central registry or visit our campus in Share, Kwara State.
            </p>
          </div>
        </Container>
      </section>

      {/* 4 Contact Channels Cards */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center mb-4 shadow-2xs">
                  <MapPin className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-serif font-bold text-navy text-base mb-1">
                  Main Campus
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </p>
              </div>
            </div>

            {/* Phone Lines */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center mb-4 shadow-2xs">
                  <Phone className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-serif font-bold text-navy text-base mb-1">
                  Admissions Lines
                </h3>
                <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                  <a href="tel:08135131503" className="block hover:text-adeshina-blue font-semibold">
                    0813 513 1503
                  </a>
                  <a href="tel:07018182681" className="block hover:text-adeshina-blue font-semibold">
                    0701 818 2681
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center mb-4 shadow-2xs">
                  <Mail className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-serif font-bold text-navy text-base mb-1">
                  Registry Email
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xs sm:text-sm text-slate-600 hover:text-adeshina-blue font-semibold break-all leading-relaxed"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center mb-4 shadow-2xs">
                  <Clock className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-serif font-bold text-navy text-base mb-1">
                  Registry Hours
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {siteConfig.contact.officeHours}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Grid: Left Inquiry Form + Right Location & Travel Guide */}
      <section className="py-16 lg:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: Interactive Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
                ONLINE CONSULTATION & INQUIRIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-navy leading-tight mb-2">
                Send a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-8 leading-relaxed">
                Submit your inquiry and our admissions officers will follow up with you directly.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy">
                    Message Submitted Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-navy">{formData.name}</strong>. Your inquiry regarding <strong className="text-navy">{formData.collegeInterest === 'health-technology' ? 'College of Health Technology' : formData.collegeInterest === 'education' ? 'College of Education' : 'Adeshina Colleges'}</strong> has been received by our Admissions Registry.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        collegeInterest: 'general',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-navy text-white text-xs font-bold hover:bg-navy-dark transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Ibrahim Adeleke"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g., 08012345678"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., student@gmail.com"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue"
                      />
                    </div>

                    {/* College of Interest */}
                    <div>
                      <label htmlFor="collegeInterest" className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                        College / Area of Interest
                      </label>
                      <select
                        id="collegeInterest"
                        value={formData.collegeInterest}
                        onChange={(e) => setFormData({ ...formData, collegeInterest: e.target.value })}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue font-medium"
                      >
                        <option value="general">General Inquiries / Group Admission</option>
                        <option value="health-technology">Adeshina College of Health Technology</option>
                        <option value="education">Adeshina College of Education</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Inquiry on CHEW Diploma Admission"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include any specific questions regarding entry requirements, tuition, or application procedures..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-hidden focus:ring-2 focus:ring-adeshina-blue"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-navy text-white font-bold text-xs sm:text-sm hover:bg-navy-dark transition-all shadow-md"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Location & Campus Travel Directions Guide (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Travel Directions Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-accent-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    Directions to Share Campus
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-navy">
                  How to Locate the Campus
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80">
                    <strong className="text-navy font-bold block mb-1">From Ilorin (State Capital):</strong>
                    <span>Take the Ilorin–Share highway to Share junction. Head along Share-Okeode Road towards the Ifelodun Local Government Secretariat. The college campus gate is situated directly beside the Secretariat complex.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80">
                    <strong className="text-navy font-bold block mb-1">From Offa / Ajase-Ipo:</strong>
                    <span>Board transit to Share via Oke-Ode route. The campus gate is readily accessible on the main road before central Share town.</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Compass className="w-4 h-4 text-accent-gold shrink-0" />
                  <span>Landmark: Beside Ifelodun Local Government Secretariat, Share.</span>
                </div>
              </div>

              {/* Physical Screening Desk Note */}
              <div className="bg-[#081426] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-md space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Admissions Physical Desk
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white">
                  Physical Verification & Inquiries
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Prospective candidates can purchase admission forms physically, submit original credentials for verification, and meet admissions officers at the Share Registry during official working hours.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
