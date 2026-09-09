import { Container } from '@/components/common/Container';

export function CampusLife() {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200 bg-[#041c36]"
      aria-labelledby="campus-life-heading"
    >
      <img
        src="/images/campus/campus-life-1.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_40%] opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041c36] via-[#041c36]/80 to-[#041c36]/30" />

      <Container size="wide" className="relative z-10 py-24 lg:py-28">
        <div className="max-w-xl">
          <p className="type-label text-[#e8c56a]">Share campus</p>
          <h2 id="campus-life-heading" className="type-section-lg mt-3 text-white">
            A focused place to learn
          </h2>
          <p className="type-body-lg mt-5 text-white/80">
            Laboratories, lecture suites, and a disciplined academic community — one campus for health
            technology and teacher education in Kwara State.
          </p>
          <a
            href="#colleges"
            className="type-button mt-9 inline-flex items-center border border-white/40 px-6 py-3.5 text-white transition-colors hover:border-white hover:bg-white hover:text-[#05264c]"
          >
            Choose a college
          </a>
        </div>
      </Container>
    </section>
  );
}
