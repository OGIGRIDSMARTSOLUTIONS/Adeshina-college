import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  GraduationCap,
  FileSearch,
  MonitorSmartphone,
  Building2,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';
import { GroupContact } from '@/components/group/GroupContact';
import { useScopedPath } from '@/context/CollegeContext';

export function ContactPage() {
  const { college, path, isGroup } = useScopedPath();
  const collegeId = college?.collegeId;
  const isHealth = collegeId === 'health-technology';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeInterest: college?.collegeId ?? 'general',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitted(true);
  };

  if (isGroup) {
    return <GroupContact />;
  }

  const quickHelp = [
    {
      title: 'Admissions Help',
      description: isGroup
        ? 'Entry requirements, application steps, deadlines, and guidance on Health Technology or Education pathways.'
        : isHealth
          ? 'Entry requirements, application steps, and guidance for Health Technology programmes.'
          : 'Entry requirements, application steps, and guidance for NCE programmes and teaching pathways.',
      answer: isGroup
        ? 'Choose a college under Our colleges on the home page, then open Admissions inside that college for entry requirements and how to apply. You can also call the registry on 0813 513 1503 or 0701 818 2681 during office hours.'
        : isHealth
          ? 'Open Admissions in this college’s menu for Health Technology entry requirements, documents, and application steps. For further help, call the registry on 0813 513 1503 or 0701 818 2681, or send a message below.'
          : 'Open Admissions in this college’s menu for NCE entry requirements, documents, and application steps. For teaching-practice or programme questions, call the registry on 0813 513 1503 or 0701 818 2681, or send a message below.',
      icon: GraduationCap,
    },
    {
      title: 'Application Status',
      description:
        'Questions about a submitted application, required documents, or next steps after applying.',
      answer:
        'Keep the reference number from your application confirmation slip. For updates, contact the registry with your full name, phone number, and reference using the form below or by calling 0813 513 1503. A live status tracker is not available yet.',
      icon: FileSearch,
    },
    {
      title: 'Technical Support',
      description:
        'Help with Student Portal access, form submission issues, or trouble using the website.',
      answer:
        'Try refreshing the page or using another browser. For Student Portal login issues, use the portal page and contact the registry if you still cannot access your account. Website or form problems can be reported with the form below — include the page you were on and what went wrong.',
      icon: MonitorSmartphone,
    },
    {
      title: 'Campus & Registry',
      description:
        'Campus visits, registry hours, phone lines, and how to reach the Share campus office.',
      answer: `Visit Layout B, Plot 1, Share-Okeode Road, beside Ifelodun LG Secretariat, Share. Registry hours: ${siteConfig.contact.officeHours}. Call 0813 513 1503 / 0701 818 2681 or email ${siteConfig.contact.email}.`,
      icon: Building2,
    },
  ];

  const commonIssues = [
    {
      title: 'How do I apply?',
      description: isGroup
        ? 'Choose Health Technology or Education on the home page, then complete the application inside that college’s site.'
        : isHealth
          ? 'Open Apply from this college’s menu, select your Health Technology programme, and complete the application steps.'
          : 'Open Apply from this college’s menu, select your NCE programme, and complete the application steps.',
    },
    {
      title: 'How do I track my application?',
      description:
        'Keep your application reference from the confirmation slip. For follow-up, contact the registry with your full name and phone number using the form below.',
    },
    {
      title: 'I need help choosing a college.',
      description: isGroup
        ? 'Health Technology focuses on healthcare training; Education prepares teachers. Compare pathways under Our colleges, then enter the school that matches your calling.'
        : isHealth
          ? 'Browse Programmes and Admissions for Health Technology pathways, entry requirements, and course options. Contact the registry if you still need guidance.'
          : 'Browse Programmes and Admissions for NCE subject combinations, entry requirements, and teaching pathways. Contact the registry if you still need guidance.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#05264c] text-white">
        <img
          src={
            isHealth
              ? '/images/health-technology/health-campus-1.jpg'
              : '/images/education/campus-gate.jpg'
          }
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[#05264c]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c36]/92 via-[#05264c]/70 to-[#05264c]/35" />

        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Link
              to={path()}
              className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#05264c] hover:border-white"
            >
              <ArrowLeft className="w-4 h-4" />
              {isGroup ? 'Back to Home' : 'Back to College Home'}
            </Link>

            <h1 className="mt-6 font-serif font-semibold text-4xl sm:text-5xl md:text-[3.25rem] tracking-[-0.02em] leading-[1.12] text-white">
              Support
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#e8c56a] leading-snug tracking-[-0.01em]">
              {isHealth
                ? 'Help for Health Technology students & applicants'
                : isGroup
                  ? 'Admissions, applications & campus help'
                  : 'Help for Education students & applicants'}
            </p>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
              {isHealth
                ? 'Get help with Health Technology admissions, applications, clinical posting questions, campus visits, and registry services in Share.'
                : isGroup
                  ? 'Get help with admissions, applications, campus visits, and student services.'
                  : 'Get help with NCE admissions, applications, teaching practice questions, campus visits, and registry services in Share.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Help Options */}
      <section className="py-16 lg:py-20 bg-[#f8fafc] border-b border-slate-200">
        <Container size="wide">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#05264c] tracking-[-0.02em]">
              Quick help options
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Short answers for common support topics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {quickHelp.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex h-full flex-col rounded-lg bg-white p-6 sm:p-7 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.18)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#05264c] text-[#e8c56a]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-serif font-semibold text-xl text-[#05264c] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{item.description}</p>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-[14px] text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Common Issues */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <Container size="wide">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#05264c] tracking-[-0.02em]">
              Common issues
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Short answers to questions applicants ask most often.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {commonIssues.map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-[#f8fafc] p-6 sm:p-7 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]"
              >
                <h3 className="font-serif font-semibold text-lg sm:text-xl text-[#05264c] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact channels */}
      <section
        id="contact-channels"
        className="py-16 lg:py-20 bg-[#f8fafc] border-b border-slate-200 scroll-mt-28"
      >
        <Container size="wide">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#05264c] tracking-[-0.02em]">
              Contact channels
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Reach the Share campus registry during office hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <div className="rounded-lg bg-white p-6 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]">
              <MapPin className="w-5 h-5 text-[#c68a18]" />
              <h3 className="mt-4 font-serif font-semibold text-[#05264c] text-lg">Main campus</h3>
              <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">
                {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]">
              <Phone className="w-5 h-5 text-[#c68a18]" />
              <h3 className="mt-4 font-serif font-semibold text-[#05264c] text-lg">Admissions lines</h3>
              <div className="mt-2 space-y-1 text-[14px] font-semibold text-slate-600">
                <a href="tel:08135131503" className="block hover:text-[#02509e]">
                  0813 513 1503
                </a>
                <a href="tel:07018182681" className="block hover:text-[#02509e]">
                  0701 818 2681
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]">
              <Mail className="w-5 h-5 text-[#c68a18]" />
              <h3 className="mt-4 font-serif font-semibold text-[#05264c] text-lg">Registry email</h3>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 block text-[14px] font-semibold text-slate-600 break-all hover:text-[#02509e]"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="rounded-lg bg-white p-6 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]">
              <Clock className="w-5 h-5 text-[#c68a18]" />
              <h3 className="mt-4 font-serif font-semibold text-[#05264c] text-lg">Registry hours</h3>
              <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">
                {siteConfig.contact.officeHours}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="py-16 lg:py-24 bg-white scroll-mt-28">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-7 rounded-lg bg-[#f8fafc] p-7 sm:p-9 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.18)]">
              <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-[#05264c] tracking-[-0.02em]">
                Send a message
              </h2>
              <p className="mt-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                Submit your inquiry and our admissions officers will follow up with you.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-7 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                  <h3 className="mt-4 font-serif font-semibold text-xl text-[#05264c]">
                    Message received
                  </h3>
                  <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been noted for the
                    registry team.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Note: this form does not send email yet — please also call or email the registry
                    for urgent matters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        collegeInterest: college?.collegeId ?? 'general',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="mt-5 inline-flex items-center justify-center rounded-md bg-[#05264c] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#02509e] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-[#05264c]"
                      >
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#05264c] focus:outline-none focus:ring-2 focus:ring-[#02509e]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-[#05264c]"
                      >
                        Phone number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#05264c] focus:outline-none focus:ring-2 focus:ring-[#02509e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-[#05264c]"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#05264c] focus:outline-none focus:ring-2 focus:ring-[#02509e]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="collegeInterest"
                        className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-[#05264c]"
                      >
                        College / area of interest
                      </label>
                      {isGroup ? (
                        <select
                          id="collegeInterest"
                          value={formData.collegeInterest}
                          onChange={(e) =>
                            setFormData({ ...formData, collegeInterest: e.target.value })
                          }
                          className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] font-medium text-[#05264c] focus:outline-none focus:ring-2 focus:ring-[#02509e]"
                        >
                          <option value="general">General inquiries</option>
                          <option value="health-technology">
                            College of Health Technology
                          </option>
                          <option value="education">College of Education</option>
                        </select>
                      ) : (
                        <div className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 text-[14px] font-medium text-[#05264c]">
                          {college?.college.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-[#05264c]"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Admission, application, or campus inquiry"
                      className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#05264c] focus:outline-none focus:ring-2 focus:ring-[#02509e]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-[#05264c]"
                    >
                      Your message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter your message"
                      className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#05264c] focus:outline-none focus:ring-2 focus:ring-[#02509e]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#02509e]"
                  >
                    <span>Submit inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-lg bg-[#f8fafc] p-7 sm:p-8 ring-1 ring-slate-200/90 shadow-[0_8px_24px_-12px_rgba(5,38,76,0.16)]">
                <h3 className="font-serif font-semibold text-xl text-[#05264c]">
                  Directions to Share campus
                </h3>
                <div className="mt-5 space-y-4 text-[14px] text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-[#05264c]">From Ilorin:</strong> Take the Ilorin–Share
                    highway to Share junction, then Share-Okeode Road toward Ifelodun LG Secretariat.
                    The campus gate is beside the Secretariat.
                  </p>
                  <p>
                    <strong className="text-[#05264c]">From Offa / Ajase-Ipo:</strong> Transit to
                    Share via Oke-Ode. The gate is accessible on the main road before central Share
                    town.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-[#041c36] p-7 sm:p-8 text-white">
                <h3 className="font-serif font-semibold text-xl">Physical registry desk</h3>
                <p className="mt-3 text-[14px] text-white/75 leading-relaxed">
                  Prospective candidates can inquire in person, verify credentials, and speak with
                  admissions officers at the Share registry during official working hours.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
