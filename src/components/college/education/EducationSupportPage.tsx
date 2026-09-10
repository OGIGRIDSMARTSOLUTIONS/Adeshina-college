import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useCollege } from '@/context/CollegeContext';
import { Container } from '@/components/common/Container';
import {
  educationCardTilt,
  educationFadeUp,
  educationSlideIn,
  educationStagger,
  educationStaggerCards,
} from '@/components/college/education/educationMotion';
import { edBtnGold } from '@/components/college/education/educationTheme';
import { EducationGeometricBg } from '@/components/college/education/EducationGeometricBg';

const faqs = [
  {
    q: 'How do I apply?',
    a: 'Open Apply from the menu, choose your NCE programme, and complete the online steps.',
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

const channels = [
  {
    title: 'Campus',
    icon: MapPin,
    body: `${siteConfig.contact.campusAddress}, ${siteConfig.contact.stateCountry}`,
  },
  {
    title: 'Phone',
    icon: Phone,
    body: null as string | null,
  },
  {
    title: 'Email',
    icon: Mail,
    body: siteConfig.contact.email,
  },
  {
    title: 'Hours',
    icon: Clock,
    body: siteConfig.contact.officeHours,
  },
];

/** College of Education Support — contact + inquiry form. */
export function EducationSupportPage() {
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
    'w-full rounded-2xl border border-[#0c2340]/12 bg-white px-4 py-3 font-sans text-[14px] text-[#0c2340] placeholder:text-[#5a6570]/70 focus:border-[#3d8fd1] focus:outline-none focus:ring-2 focus:ring-[#3d8fd1]/25';

  return (
    <div className="bg-[#eaf4fb] text-[#0c2340]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10 bg-[#0c2340]">
        <img
          src="/images/education/campus-gate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[48%_40%] saturate-[0.92]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0c2340] via-[#0c2340]/90 to-[#0c2340]/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/55 via-transparent to-[#0c2340]/30"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10 py-16 sm:py-20 lg:py-24">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={educationSlideIn}
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#c9a227]"
            >
              Support
            </motion.p>
            <motion.h1
              variants={educationSlideIn}
              className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
            >
              We’re here to help
            </motion.h1>
            <motion.p
              variants={educationSlideIn}
              className="mt-4 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Admissions questions, application follow-up, campus visits, and registry services for
              Adeshina College of Education.
            </motion.p>
            <motion.div variants={educationSlideIn} className="mt-8">
              <a href="#inquiry" className={edBtnGold}>
                Send a message
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact channels */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="paper" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={educationSlideIn} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                Reach us
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                Registry contacts
              </h2>
            </motion.div>

            <motion.ul
              variants={educationStaggerCards}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              style={{ perspective: 1200 }}
            >
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.li
                    key={channel.title}
                    variants={educationCardTilt}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -10,
                            rotateX: 5,
                            rotateY: index % 2 === 0 ? -3 : 3,
                            scale: 1.02,
                            transition: { type: 'spring', stiffness: 280, damping: 18 },
                          }
                    }
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#c9a227,0_16px_28px_-14px_rgba(12,35,64,0.35)] ring-1 ring-[#0c2340]/10"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#d4ebf8]/90"
                      aria-hidden="true"
                    />
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0c2340] text-[#c9a227]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="relative mt-4 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#3d8fd1]">
                      {channel.title}
                    </p>
                    {channel.title === 'Phone' ? (
                      <div className="relative mt-2 space-y-1 font-sans text-[15px] font-semibold text-[#0c2340]">
                        <a href="tel:08135131503" className="block hover:text-[#1e6fa8]">
                          0813 513 1503
                        </a>
                        <a href="tel:07018182681" className="block hover:text-[#1e6fa8]">
                          0701 818 2681
                        </a>
                      </div>
                    ) : channel.title === 'Email' ? (
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="relative mt-2 block break-all font-sans text-[15px] font-semibold text-[#0c2340] hover:text-[#1e6fa8]"
                      >
                        {channel.body}
                      </a>
                    ) : (
                      <p className="relative mt-2 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                        {channel.body}
                      </p>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden border-b border-[#0c2340]/10">
        <EducationGeometricBg tone="mist" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <motion.div
            variants={educationStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={educationSlideIn} className="max-w-2xl">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                Common questions
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                Before you write
              </h2>
            </motion.div>

            <motion.ul
              variants={educationStaggerCards}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
              style={{ perspective: 1200 }}
            >
              {faqs.map((faq, index) => (
                <motion.li
                  key={faq.q}
                  variants={educationCardTilt}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -10,
                          rotateX: 5,
                          scale: 1.02,
                          transition: { type: 'spring', stiffness: 280, damping: 18 },
                        }
                  }
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#0c2340,0_16px_28px_-14px_rgba(12,35,64,0.35)] ring-1 ring-[#0c2340]/10 sm:p-7"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-sm tabular-nums text-[#3d8fd1]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-[-0.015em] text-[#0c2340]">
                    {faq.q}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#5a6570]">
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
        className="relative scroll-mt-28 overflow-hidden border-b border-[#0c2340]/10"
      >
        <EducationGeometricBg tone="paper" />
        <Container size="wide" className="relative py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8861a]">
                Inquiry
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0c2340] sm:text-[2.15rem]">
                Send a message
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-[#5a6570]">
                Tell us what you need help with. For urgent matters, call the registry during office
                hours.
              </p>
              <p className="mt-6 font-sans text-[13px] leading-relaxed text-[#0c2340]/65">
                Prefer to apply now?{' '}
                <Link to={path('apply')} className="font-semibold text-[#1e6fa8] hover:text-[#0c2340]">
                  Start your application
                </Link>
                .
              </p>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                variants={educationFadeUp}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_0_0_#c9a227,0_24px_48px_-20px_rgba(12,35,64,0.4)] ring-1 ring-[#0c2340]/10 sm:p-8 lg:p-9"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  aria-hidden="true"
                />
                {submitted ? (
                  <div className="rounded-2xl bg-[#eaf4fb] p-8 text-center ring-1 ring-[#3d8fd1]/25">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-[#3d8fd1]" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-[#0c2340]">
                      Message received
                    </h3>
                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5a6570]">
                      Thank you, <strong>{formData.name}</strong>. Your inquiry has been noted for the
                      registry team.
                    </p>
                    <p className="mt-2 font-sans text-sm text-[#5a6570]">
                      This form does not send email yet — please also call or email for urgent
                      matters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#0c2340] px-5 py-2.5 font-sans text-[13px] font-semibold text-white hover:bg-[#1e6fa8]"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5a6570]">
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
                        <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5a6570]">
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
                      <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5a6570]">
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
                      <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5a6570]">
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
                      <span className="mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5a6570]">
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
                    <button type="submit" className={`${edBtnGold} w-full sm:w-auto`}>
                      Submit inquiry
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
