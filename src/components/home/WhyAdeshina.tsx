import { Container } from '@/components/common/Container';
import { Microscope, Users, BookOpen, Sparkles } from 'lucide-react';

const propositions = [
  {
    number: '01',
    title: 'Hands-on Training',
    description:
      'Gain real practical experience in modern diagnostic laboratories, clinical health environments, and student-centred teaching suites.',
    icon: Microscope,
  },
  {
    number: '02',
    title: 'Serene Environment',
    description:
      'Foster your intellectual skills and character in a peaceful academic environment located in Share, Kwara State.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Professional Preparation',
    description:
      'Curricula designed to meet standard professional benchmarks in medical sciences, health technology, and Nigerian education.',
    icon: BookOpen,
  },
  {
    number: '04',
    title: 'Direct Career Pathways',
    description:
      'Clear, accredited diploma and NCE qualifications opening direct career avenues in public healthcare, hospitals, and schools.',
    icon: Sparkles,
  },
];

export function WhyAdeshina() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80" aria-labelledby="why-adeshina-heading">
      <Container size="wide">
        {/* Section Heading matching Reference */}
        <div className="mb-14 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
            THE ADESHINA EXPERIENCE
          </span>
          <h2
            id="why-adeshina-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-navy leading-tight"
          >
            A Foundation for Professional Impact
          </h2>
        </div>

        {/* 2-Column Asymmetrical Grid: Left 2x2 Props + Right Photographic Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left 2x2 Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
            {propositions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col bg-[#f8fafc] p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-adeshina-blue/30 transition-all duration-200"
                >
                  {/* Clean Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center mb-4 shadow-xs">
                    <Icon className="w-5 h-5 text-accent-gold" />
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-navy mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Photographic Feature Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-navy shadow-lg border border-slate-200/80">
              <img
                src="/images/education/campus-gate.jpg"
                alt="Adeshina Campus Environment and Students in Share"
                className="w-full h-full object-cover object-[center_top]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent-gold block mb-1">
                  Share, Kwara State
                </span>
                <p className="text-sm font-serif font-bold leading-snug">
                  A serene campus focused on academic excellence, integrity, and student character.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
