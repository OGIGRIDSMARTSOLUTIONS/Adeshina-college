/** Layered geometric atmosphere — light-blue academic planes. */
export function EducationGeometricBg({
  tone = 'paper',
}: {
  tone?: 'paper' | 'mist' | 'ink';
}) {
  const isInk = tone === 'ink';
  const isMist = tone === 'mist';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base wash — soft sky paper */}
      <div
        className={`absolute inset-0 ${
          isInk
            ? 'bg-[#0c2340]'
            : isMist
              ? 'bg-[#d7e8f5]'
              : 'bg-[#eaf4fb]'
        }`}
      />

      {/* Soft curved planes */}
      <div
        className={`absolute -right-[18%] -top-[35%] h-[85%] w-[70%] rounded-[45%] ${
          isInk ? 'bg-[#3d8fd1]/20' : 'bg-[#b7d7ee]/70'
        }`}
        style={{ transform: 'rotate(-18deg)' }}
      />
      <div
        className={`absolute -bottom-[40%] -left-[20%] h-[75%] w-[65%] rounded-[48%] ${
          isInk ? 'bg-white/[0.06]' : 'bg-[#9ec9e8]/45'
        }`}
        style={{ transform: 'rotate(12deg)' }}
      />

      {/* Sharp diagonal slabs */}
      <div
        className={`absolute inset-y-[-10%] right-[-5%] w-[48%] ${
          isInk ? 'bg-white/[0.05]' : 'bg-white/75'
        }`}
        style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 8% 100%)' }}
      />
      <div
        className={`absolute inset-y-[-10%] right-[8%] w-[36%] ${
          isInk ? 'bg-[#5ba8d9]/15' : 'bg-[#c5e0f4]/80'
        }`}
        style={{ clipPath: 'polygon(55% 0, 100% 0, 72% 100%, 12% 100%)' }}
      />
      <div
        className={`absolute left-[-12%] top-[-20%] h-[70%] w-[55%] ${
          isInk ? 'bg-[#3d8fd1]/18' : 'bg-[#d4ebf8]/90'
        }`}
        style={{ clipPath: 'polygon(0 0, 78% 0, 42% 100%, 0 100%)' }}
      />
      <div
        className={`absolute bottom-[-15%] left-[20%] h-[55%] w-[50%] ${
          isInk ? 'bg-white/[0.04]' : 'bg-[#a8d0ea]/40'
        }`}
        style={{ clipPath: 'polygon(20% 0, 100% 18%, 85% 100%, 0 100%)' }}
      />

      {/* Fine edge lines */}
      <div
        className={`absolute inset-y-0 right-[42%] w-px ${
          isInk ? 'bg-white/10' : 'bg-[#3d8fd1]/20'
        }`}
        style={{ transform: 'skewX(-18deg)' }}
      />
      <div
        className={`absolute inset-y-0 right-[18%] w-px ${
          isInk ? 'bg-[#c9a227]/20' : 'bg-[#5ba8d9]/35'
        }`}
        style={{ transform: 'skewX(-18deg)' }}
      />
    </div>
  );
}
