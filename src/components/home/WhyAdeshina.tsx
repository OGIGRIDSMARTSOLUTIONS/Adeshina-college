import { Container } from '@/components/common/Container';
import { Microscope, Users, BookOpen, Sparkles } from 'lucide-react';

const propositions = [
  {
    number: '01',
    title: 'Hands-on Practical Mastery',
    description:
      'Gain real clinical experience in diagnostic laboratories, health simulation suites, and student-centred teaching practice laboratories.',
    icon: Microscope,
  },
  {
    number: '02',
    title: 'Serene Campus Setting',
    description:
      'Foster your intellect, leadership, and moral character in a peaceful academic environment located in Share, Ifelodun LGA, Kwara State.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Professional Preparation',
    description:
      'Curricula aligned directly with standard national regulatory benchmarks in health technology disciplines and teacher education.',
    icon: BookOpen,
  },
  {
    number: '04',
    title: 'Direct Career Pathways',
    description:
      'Recognized diplomas and NCE qualifications opening immediate career avenues in healthcare institutions, clinics, and educational bodies.',
    icon: Sparkles,
  },
];

export function WhyAdeshina() {
  return (
    <section className="py-20 lg:py-28 bg-[#05264c] text-white border-b border-sky-900/50" aria-labelledby="why-adeshina-heading">
      <Container size="wide">
        {/* Section Heading with Light Sky Blue Accent */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-sky-400" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-sky-300">
              THE ADESHINA ADVANTAGE
            </span>
          </div>
          <h2
            id="why-adeshina-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-black tracking-tight text-white leading-tight"
          >
            A Foundation for Professional Impact.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-sky-100 max-w-xl leading-relaxed">
            A disciplined academic environment built on clinical healthcare mastery and pedagogical leadership.
          </p>
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
                  className="flex flex-col bg-white/10 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-white/15 shadow-md hover:border-sky-400/60 hover:bg-white/15 transition-all duration-200"
                >
                  {/* Clean Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-sky-400/20 text-sky-200 flex items-center justify-center mb-4 border border-sky-300/30">
                    <Icon className="w-5 h-5 text-sky-300" />
                  </div>

                  <span className="text-[11px] font-mono font-bold tracking-widest text-sky-300 mb-1 block">
                    {item.number}
                  </span>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Photographic Feature Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#073663] shadow-2xl border-2 border-white/20">
              <img
                src="/images/education/campus-gate.jpg"
                alt="Adeshina Campus Environment and Gate in Share, Kwara State"
                className="w-full h-full object-cover object-[center_top]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05264c] via-[#05264c]/40 via-40% to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-xl bg-[#05264c]/85 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-300 block mb-1">
                  MAIN CAMPUS GATE · SHARE, KWARA STATE
                </span>
                <p className="text-sm font-serif font-bold leading-snug text-white">
                  A serene campus dedicated to professional healthcare excellence and educator development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
