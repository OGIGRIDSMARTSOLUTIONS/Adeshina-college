import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import {
  healthCardIn,
  healthFadeUp,
  healthStagger,
} from '@/components/college/health/healthMotion';
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

const contactCards = [
  {
    label: 'Campus',
    body: `${siteConfig.contact.campusAddress}, ${siteConfig.contact.stateCountry}`,
  },
  {
    label: 'Phone',
    links: [
      { href: 'tel:08135131503', text: '0813 513 1503' },
      { href: 'tel:07018182681', text: '0701 818 2681' },
    ],
  },
  {
    label: 'Email',
    links: [{ href: `mailto:${siteConfig.contact.email}`, text: siteConfig.contact.email }],
  },
  {
    label: 'Hours',
    body: siteConfig.contact.officeHours,
  },
] as const;

function SectionGeometry() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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
      <div className="absolute inset-y-[10%] right-[28%] w-[2px] bg-[#041c36]/28" style={{ transform: 'skewX(-12deg)' }} />
      <div className="absolute inset-y-[10%] right-[14%] w-[2px] bg-[#3d8fd1]/50" style={{ transform: 'skewX(-12deg)' }} />
    </div>
  );
}

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
    <div className="bg-[#e8edf2] text-[#1a2332]">
      <section
        data-college-hero
        className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#041c36] lg:-mt-[6rem]"
      >
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
        <Container size="wide" className="relative z-10 pb-14 pt-12 sm:pb-16 lg:pb-20 lg:pt-[8.25rem]">
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
              Adeshina College of Health Technology.
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

      <section className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#dde4ec] py-12 lg:py-16">
        <SectionGeometry />
        <Container size="wide" className="relative">
          <motion.div
            variants={healthStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={healthFadeUp} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a73ad]">
                Reach us
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#041c36] sm:text-[2.15rem]">
                Registry contacts
              </h2>
            </motion.div>

            <motion.dl
              variants={healthStagger}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            >
              {contactCards.map((card) => (
                <motion.div
                  key={card.label}
                  variants={healthCardIn}
                  className="group relative overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12 transition-all duration-300 hover:-translate-y-1 hover:ring-[#041c36]/25"
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.12] via-transparent to-[#3d8fd1]/[0.1]" />
                    <div
                      className="absolute -right-4 -top-8 h-36 w-36 bg-[#041c36]/[0.14]"
                      style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                    />
                  </div>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-[#041c36] transition-colors duration-300 group-hover:bg-[#3d8fd1]"
                    aria-hidden="true"
                  />
                  <div className="relative p-5 pl-6 sm:p-6 sm:pl-7">
                    <dt className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#2a73ad]">
                      {card.label}
                    </dt>
                    <dd className="mt-3">
                      {'links' in card && card.links ? (
                        <div className="space-y-1.5 font-sans text-[15px] font-semibold text-[#041c36]">
                          {card.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              className="block break-all transition-colors hover:text-[#2a73ad]"
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="font-sans text-[15px] leading-relaxed text-[#4a5560]">
                          {'body' in card ? card.body : null}
                        </p>
                      )}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-[#041c36]/10 bg-[#dde4ec] py-12 lg:py-16">
        <SectionGeometry />
        <Container size="wide" className="relative">
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
                  variants={healthCardIn}
                  className="group relative flex h-full flex-col overflow-hidden rounded-md bg-[#f7f9fb] ring-1 ring-[#041c36]/12 transition-all duration-300 hover:-translate-y-1 hover:ring-[#041c36]/25"
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#041c36]/[0.12] via-transparent to-[#3d8fd1]/[0.1]" />
                    <div
                      className="absolute -right-4 -top-8 h-40 w-40 bg-[#041c36]/[0.14]"
                      style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 52%)' }}
                    />
                  </div>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-[#041c36] transition-colors duration-300 group-hover:bg-[#3d8fd1]"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col p-5 pl-6 sm:p-6 sm:pl-7">
                    <span className="inline-flex h-9 w-9 items-center justify-center bg-[#041c36] font-serif text-[13px] font-semibold tabular-nums text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#041c36]">
                      {faq.q}
                    </h3>
                    <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#4a5560]">
                      {faq.a}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* Form */}
      <section
        id="inquiry"
        className="scroll-mt-28 border-b border-[#041c36]/10 bg-[#e8edf2] py-12 lg:py-16"
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
