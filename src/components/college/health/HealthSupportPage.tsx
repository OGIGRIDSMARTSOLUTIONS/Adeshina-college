import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import { healthFadeUp, healthStagger } from '@/components/college/health/healthMotion';
import { htBtnSky } from '@/components/college/health/healthTheme';

const faqs = [
  {
    q: 'How do I apply?',
    a: 'Open Apply from the menu, choose your Health Technology programme, and complete the online steps.',
  },
  {
    q: 'How do I follow up on an application?',
    a: 'Keep your confirmation reference. Contact the registry with your full name, phone number, and reference.',
  },
  {
    q: 'Where is the campus?',
    a: `${siteConfig.contact.campusAddress}, ${siteConfig.contact.stateCountry}.`,
  },
];

/** Health Technology Support — contact + inquiry form. */
export function HealthSupportPage() {
  const { path } = useCollege();
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  const fieldClass =
    'w-full rounded-2xl border border-[#041c36]/12 bg-white px-4 py-3 font-sans text-[14px] text-[#041c36] placeholder:text-[#5c6570]/70 focus:border-[#3d8fd1] focus:outline-none focus:ring-2 focus:ring-[#3d8fd1]/25';

  return (
    <div className="bg-[#f7f3ea] text-[#1a2332]">
      {/* Hero */}
      <section className="relative -mt-[5.5rem] overflow-hidden border-b border-[#041c36]/10 bg-[#041c36] sm:-mt-[6rem]">
        <img
          src="/images/health-technology/health-campus-1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[42%_52%] saturate-[0.92]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/88 to-[#041c36]/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#041c36]/50 via-transparent to-[#041c36]/25"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10 pb-14 pt-[7.5rem] sm:pb-16 sm:pt-[8.25rem] lg:pb-20">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={healthFadeUp}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#5ba8d9]"
            >
              Support
            </motion.p>
            <motion.h1
              variants={healthFadeUp}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              We’re here to help
            </motion.h1>
            <motion.p
              variants={healthFadeUp}
              className="mt-4 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Admissions questions, application follow-up, campus visits, and registry services for
              Adeshina College of Health Tech.
            </motion.p>
            <motion.div variants={healthFadeUp} className="mt-8">
              <a href="#inquiry" className={`${htBtnSky} w-full sm:w-auto`}>
                Send a message
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact channels */}
      <section className="border-b border-[#041c36]/10 bg-white py-12 lg:py-16">
        <Container size="wide">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d8fd1]">
                Reach us
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Registry contacts
              </h2>
            </motion.div>

            <dl className="mt-10 grid grid-cols-1 gap-8 border-t border-[#041c36]/12 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div variants={healthFadeUp}>
                <dt className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#3d8fd1]">
                  Campus
                </dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                  {siteConfig.contact.campusAddress}, {siteConfig.contact.stateCountry}
                </dd>
              </motion.div>
              <motion.div variants={healthFadeUp}>
                <dt className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#3d8fd1]">
                  Phone
                </dt>
                <dd className="mt-2 space-y-1 font-sans text-[15px] font-semibold text-[#041c36]">
                  <a href="tel:08135131503" className="block transition-colors hover:text-[#2a73ad]">
                    0813 513 1503
                  </a>
                  <a href="tel:07018182681" className="block transition-colors hover:text-[#2a73ad]">
                    0701 818 2681
                  </a>
                </dd>
              </motion.div>
              <motion.div variants={healthFadeUp}>
                <dt className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#3d8fd1]">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="break-all font-sans text-[15px] font-semibold text-[#041c36] transition-colors hover:text-[#2a73ad]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </motion.div>
              <motion.div variants={healthFadeUp}>
                <dt className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#3d8fd1]">
                  Hours
                </dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                  {siteConfig.contact.officeHours}
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#041c36]/10 bg-[#eaf5fc] py-12 lg:py-16">
        <Container size="wide">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                Common questions
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Before you write
              </h2>
            </motion.div>

            <motion.ul
              variants={healthStagger}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            >
              {faqs.map((faq, index) => (
                <motion.li
                  key={faq.q}
                  variants={healthFadeUp}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-[#041c36]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(61,143,209,0.45)] hover:ring-[#3d8fd1]/35 sm:p-7"
                >
                  <span className="font-serif text-sm tabular-nums text-[#3d8fd1]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36]">
                    {faq.q}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                    {faq.a}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* Form */}
      <section
        id="inquiry"
        className="scroll-mt-28 border-b border-[#041c36]/10 bg-[#f7f3ea] py-12 lg:py-16"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d8fd1]">
                Inquiry
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Send a message
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-[#5c6570]">
                Tell us what you need help with. For urgent matters, call the registry during office
                hours.
              </p>
              <p className="mt-6 font-sans text-[13px] leading-relaxed text-[#041c36]/65">
                Prefer to apply now?{' '}
                <Link to={path('apply')} className="font-semibold text-[#2a73ad] hover:text-[#041c36]">
                  Start your application
                </Link>
                .
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-6 shadow-[0_24px_50px_-28px_rgba(4,28,54,0.35)] ring-1 ring-[#041c36]/10 sm:p-8 lg:p-9">
              {submitted ? (
                <div className="rounded-2xl bg-[#eaf5fc] p-8 text-center ring-1 ring-[#3d8fd1]/25">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-[#3d8fd1]" />
                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#041c36]">
                    Message received
                  </h3>
                  <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5c6570]">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been noted for the
                    registry team.
                  </p>
                  <p className="mt-2 font-sans text-sm text-[#5c6570]">
                    This form does not send email yet — please also call or email for urgent matters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#041c36] px-5 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-[#2a73ad]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5c6570]">
                        Full name *
                      </span>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                        className={fieldClass}
                        autoComplete="name"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5c6570]">
                        Phone *
                      </span>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                        className={fieldClass}
                        autoComplete="tel"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5c6570]">
                      Email
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      className={fieldClass}
                      autoComplete="email"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5c6570]">
                      Subject
                    </span>
                    <input
                      value={formData.subject}
                      onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
                      className={fieldClass}
                      placeholder="Admissions, application status, campus visit…"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5c6570]">
                      Message *
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className={`${fieldClass} resize-y`}
                    />
                  </label>
                  <button type="submit" className={`${htBtnSky} w-full sm:w-auto`}>
                    Submit inquiry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </form>
              )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
