import { useEffect, useMemo, useState } from 'react';

type HeroBalanceSceneProps = {
  className?: string;
};

export function HeroBalanceScene({ className = '' }: HeroBalanceSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const particles = useMemo(() => {
    const count = reducedMotion ? 20 : isMobile ? 30 : 48;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 35 + ((i * 17) % 65);
      const size = 2 + (i % 3);
      const duration = reducedMotion ? 20 : 12 + (i % 6);
      return {
        key: i,
        x: `calc(50% + ${Math.cos(angle) * radius}px)`,
        y: `calc(50% + ${Math.sin(angle) * radius}px)`,
        size,
        duration,
        delay: -i * 0.3,
        opacity: 0.18 + ((i * 13) % 60) / 100,
      };
    });
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 1024px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setIsMobile(mqMobile.matches);
      setReducedMotion(mqMotion.matches);
    };
    update();
    mqMobile.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden rounded-[40px] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/80" />

      <div
        className={`absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold-champagne)]/18 ${
          reducedMotion ? '' : 'animate-[spin_24s_linear_infinite]'
        }`}
      >
        <div className="absolute inset-[5%] rounded-full border border-[var(--gold-light)]/16" />
        <div className="absolute inset-[10%] rounded-full border border-[var(--gold-dark)]/20" />
      </div>

      <div
        className={`absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
          reducedMotion ? '' : 'animate-[spin_16s_linear_infinite]'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(212,175,55,0.72)_0deg,rgba(240,217,140,0.52)_140deg,rgba(0,0,0,0.18)_180deg,rgba(155,126,42,0.6)_280deg,rgba(212,175,55,0.72)_360deg)]" />
        <div className="absolute inset-[8%] rounded-full bg-black/55" />
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path
          d="M50 12 C68 12, 75 25, 67 40 C59 55, 38 53, 35 65 C33 74, 39 84, 50 88"
          fill="none"
          stroke="rgba(240,217,140,0.75)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className={reducedMotion ? '' : 'animate-[spin_20s_linear_infinite] origin-center'}
        />
        <path
          d="M50 12 C68 12, 75 25, 67 40 C59 55, 38 53, 35 65 C33 74, 39 84, 50 88"
          fill="none"
          stroke="rgba(212,175,55,0.45)"
          strokeWidth="0.8"
          strokeLinecap="round"
          className={reducedMotion ? '' : 'animate-[spin_26s_linear_infinite_reverse] origin-center'}
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-[135%] rounded-full bg-[var(--gold-light)] shadow-[0_0_26px_rgba(240,217,140,0.65)]" />
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 translate-y-[115%] rounded-full bg-[var(--gold-dark)] shadow-[0_0_20px_rgba(155,126,42,0.6)]" />

      {particles.map((p) => (
        <span
          key={p.key}
          className={`absolute rounded-full bg-[var(--gold-champagne)] ${reducedMotion ? '' : 'animate-[spin_18s_linear_infinite]'}`}
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 10px rgba(212,175,55,0.45)',
            transformOrigin: '50% 50%',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.26)_0%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_28%,rgba(240,217,140,0.16),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_74%,rgba(155,126,42,0.2),transparent_56%)]" />
    </div>
  );
}
