import { Link } from 'react-router-dom';
import { BookOpen, Stethoscope } from 'lucide-react';
import { College } from '@/types/college';
import { programmes } from '@/data/programmes';
import { Container } from '@/components/common/Container';

interface CollegeProgrammesProps {
  college: College;
}

export function CollegeProgrammes({ college }: CollegeProgrammesProps) {
  const isHealth = college.id === 'health-technology';
  const collegeProgrammes = programmes.filter((p) => p.collegeId === college.id);
  const previewProgrammes = collegeProgrammes.slice(0, 3);

  return (
    <section id="programmes-list" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-3xl">
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl text-[#05264c] tracking-[-0.02em] leading-[1.12]">
              Our programmes
            </h2>
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#02509e] leading-snug tracking-[-0.01em]">
              {isHealth
                ? 'Health training pathways for clinical and community practice'
                : 'Teacher education pathways for classroom leadership'}
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {isHealth
                ? 'Adeshina College of Health Technology prepares students for roles in community health, laboratory science, pharmacy support, environmental health, and related services. Below are a few of our pathways — open the full list for every programme, duration, and study mode.'
                : 'Adeshina College of Education prepares students for teaching practice, pedagogy, and instructional leadership. Below are a few of our pathways — open the full list for every programme, duration, and study mode.'}
            </p>
          </div>

          <Link
            to={`/colleges/${college.id}/programmes`}
            className="inline-flex items-center justify-center rounded-md bg-[#05264c] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#02509e] shrink-0 self-start md:self-auto"
          >
            View all programmes
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {previewProgrammes.map((prog, index) => (
            <Link
              key={prog.id}
              to={`/colleges/${college.id}/programmes`}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/90 shadow-[0_10px_28px_-12px_rgba(5,38,76,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(5,38,76,0.35)] hover:ring-[#02509e]/45"
            >
              <div className="relative aspect-[16/10] bg-[#041c36]">
                <img
                  src={
                    prog.image ||
                    (isHealth
                      ? '/images/health-technology/health-campus-1.jpg'
                      : '/images/education/campus-gate.jpg')
                  }
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#05264c] text-[12px] font-semibold text-white shadow-sm">
                  {index + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      isHealth
                        ? 'bg-emerald-50 text-[#0b6b54]'
                        : 'bg-[#eef5fc] text-[#02509e]'
                    }`}
                  >
                    {isHealth ? (
                      <Stethoscope className="w-3 h-3" />
                    ) : (
                      <BookOpen className="w-3 h-3" />
                    )}
                    {prog.level}
                  </span>
                  <span className="text-[12px] font-medium text-slate-500">{prog.duration}</span>
                </div>

                <h3 className="mt-4 font-serif font-semibold text-xl sm:text-[1.35rem] text-[#05264c] leading-snug transition-colors group-hover:text-[#02509e]">
                  {prog.name}
                </h3>
                {prog.description && (
                  <p className="mt-3 text-[15px] text-slate-600 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                )}

                <div className="mt-auto pt-6">
                  <span className="text-[14px] font-semibold text-[#02509e] transition-colors group-hover:text-[#05264c]">
                    Programme details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
