import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

/** Group of Colleges contact — Design Direction v1 */
export function GroupContact() {
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
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/95 via-[#05264c]/75 to-[#05264c]/40" />
        <Container size="wide" className="relative z-10 py-20 sm:py-24">
          <p className="type-label text-[#e8c56a]">Adeshina Group of Colleges</p>
          <h1 className="type-hero mt-4 text-white">Contact</h1>
          <p className="type-body-lg mt-5 max-w-2xl text-white/85">
            Reach the Share campus registry for admissions questions, campus visits, and student
            services.
          </p>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f9fc] py-16 lg:py-20">
        <Container size="wide">
          <div className="max-w-2xl">
            <h2 className="type-section text-[#05264c]">How to reach us</h2>
            <p className="type-body mt-3 text-slate-600">
              Prefer calling or visiting during registry hours for urgent matters.
            </p>
          </div>

          <dl className="mt-12 divide-y divide-slate-200 border-y border-slate-200 bg-white">
            <div className="grid grid-cols-1 gap-2 px-5 py-6 sm:grid-cols-12 sm:gap-8 sm:px-7">
              <dt className="type-label text-slate-500 sm:col-span-3">Campus</dt>
              <dd className="type-body text-[#05264c] sm:col-span-9">
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 px-5 py-6 sm:grid-cols-12 sm:gap-8 sm:px-7">
              <dt className="type-label text-slate-500 sm:col-span-3">Phone</dt>
              <dd className="type-body sm:col-span-9">
                <a href="tel:08135131503" className="text-[#02509e] hover:text-[#05264c]">
                  0813 513 1503
                </a>
                <span className="text-slate-400"> · </span>
                <a href="tel:07018182681" className="text-[#02509e] hover:text-[#05264c]">
                  0701 818 2681
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 px-5 py-6 sm:grid-cols-12 sm:gap-8 sm:px-7">
              <dt className="type-label text-slate-500 sm:col-span-3">Email</dt>
              <dd className="type-body sm:col-span-9">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all text-[#02509e] hover:text-[#05264c]"
                >
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 px-5 py-6 sm:grid-cols-12 sm:gap-8 sm:px-7">
              <dt className="type-label text-slate-500 sm:col-span-3">Hours</dt>
              <dd className="type-body text-[#05264c] sm:col-span-9">
                {siteConfig.contact.officeHours}
              </dd>
            </div>
          </dl>

          <p className="type-body-sm mt-8 text-slate-500">
            Looking for a programme?{' '}
            <Link to="/#colleges" className="font-semibold text-[#02509e] hover:text-[#05264c]">
              Choose Health Technology or Education
            </Link>
            , then open Admissions inside that college.
          </p>
        </Container>
      </section>

      <section id="inquiry" className="scroll-mt-28 bg-white py-16 lg:py-24">
        <Container size="wide">
          <div className="mx-auto max-w-2xl">
            <h2 className="type-section text-[#05264c]">Send a message</h2>
            <p className="type-body mt-3 text-slate-600">
              Leave your details and the registry team will follow up. For urgent help, call during
              office hours.
            </p>

            {submitted ? (
              <div className="mt-10 border border-slate-200 bg-[#f7f9fc] px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-[#02509e]" />
                <h3 className="type-card-title mt-4 text-[#05264c]">Message noted</h3>
                <p className="type-body mt-2 text-slate-600">
                  Thank you, <strong>{formData.name}</strong>. Please also call or email the registry
                  for urgent matters — this form does not send email yet.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="type-button mt-6 text-[#02509e] hover:text-[#05264c]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="type-label text-slate-500">Full name</span>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 type-body text-[#05264c] outline-none focus:border-[#02509e]"
                    />
                  </label>
                  <label className="block">
                    <span className="type-label text-slate-500">Phone</span>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                      className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 type-body text-[#05264c] outline-none focus:border-[#02509e]"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="type-label text-slate-500">Email (optional)</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 type-body text-[#05264c] outline-none focus:border-[#02509e]"
                  />
                </label>
                <label className="block">
                  <span className="type-label text-slate-500">Interest</span>
                  <select
                    value={formData.collegeInterest}
                    onChange={(e) => setFormData((d) => ({ ...d, collegeInterest: e.target.value }))}
                    className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 type-body text-[#05264c] outline-none focus:border-[#02509e]"
                  >
                    <option value="general">General enquiry</option>
                    <option value="health-technology">College of Health Technology</option>
                    <option value="education">College of Education</option>
                  </select>
                </label>
                <label className="block">
                  <span className="type-label text-slate-500">Subject (optional)</span>
                  <input
                    value={formData.subject}
                    onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
                    className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 type-body text-[#05264c] outline-none focus:border-[#02509e]"
                  />
                </label>
                <label className="block">
                  <span className="type-label text-slate-500">Message</span>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    className="mt-2 w-full resize-y border border-slate-300 bg-white px-4 py-3 type-body text-[#05264c] outline-none focus:border-[#02509e]"
                  />
                </label>
                <button
                  type="submit"
                  className="type-button bg-[#05264c] px-7 py-3.5 text-white transition-colors hover:bg-[#02509e]"
                >
                  Submit enquiry
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
