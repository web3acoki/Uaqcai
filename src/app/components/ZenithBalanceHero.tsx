import { motion } from 'motion/react';
import { Activity, ArrowRight, BarChart3, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import uaqcLogoMark from '@/public/UAQC2.png';
import { useT } from '@/i18n/locale';

const MotionLink = motion.create(Link);

function BalanceAnimation() {
  const colorLong = 'var(--taiji-ash)';
  const colorShort = 'var(--taiji-ash)';
  const colorAccent = 'var(--taiji-gold-soft)';
  const colorBg = 'var(--taiji-ink)';

  return (
    <div
      className="relative flex aspect-square w-full max-w-[600px] items-center justify-center"
      style={{ animation: 'zenith-float 9s ease-in-out infinite' }}
    >
      {/* Main rotating container */}
      <div
        className="relative w-full h-full"
        style={{ animation: 'spin-slow 42s linear infinite' }}
      >
        {/* Long side */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_10px_rgba(188,195,209,0.08)]" aria-hidden="true">
            <defs>
              <linearGradient id="uaqcLongGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorLong} stopOpacity="0.64" />
              <stop offset="100%" stopColor={colorLong} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d="M 100 0 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 200 A 100 100 0 0 1 100 0"
              fill="url(#uaqcLongGradient)"
            />
            <circle cx="100" cy="50" r="12" fill={colorBg} />
            <circle cx="100" cy="50" r="4" fill={colorShort} opacity="0.32" />
          </svg>
        </div>

        {/* Short side */}
        <div className="absolute inset-0 flex items-center justify-center rotate-180">
          <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_12px_rgba(188,195,209,0.1)]" aria-hidden="true">
            <defs>
              <linearGradient id="uaqcShortGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorShort} stopOpacity="0.74" />
                <stop offset="100%" stopColor={colorShort} stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <path
              d="M 100 0 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 200 A 100 100 0 0 1 100 0"
              fill="url(#uaqcShortGradient)"
            />
            <circle cx="100" cy="50" r="12" fill={colorBg} />
            <circle cx="100" cy="50" r="4" fill={colorAccent} opacity="0.34" />
          </svg>
        </div>

        {/* Flowing particles */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={`long-p-${i}`}
              r="1.2"
              fill={i % 3 === 0 ? colorAccent : colorShort}
              opacity={i % 3 === 0 ? '0.32' : '0.22'}
              style={{
                offsetPath: "path('M 100 0 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 200')",
                offsetDistance: `${12 + i * 12}%`,
                animation: 'zenith-particle-long 18s linear infinite',
                animationDelay: `${-i * 2.4}s`,
              }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={`short-p-${i}`}
              r="1.2"
              fill={i % 2 === 0 ? colorShort : colorAccent}
              opacity={i % 2 === 0 ? '0.24' : '0.34'}
              style={{
                offsetPath: "path('M 100 200 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 0')",
                offsetDistance: `${10 + i * 13}%`,
                animation: 'zenith-particle-short 20s linear infinite',
                animationDelay: `${-i * 2.6}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Labels removed */}
    </div>
  );
}

export function ZenithBalanceHero() {
  const t = useT();
  const navigate = useNavigate();
  const [fxReady, setFxReady] = useState(false);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setFxReady(true);
      });
    });
    return () => {
      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div className="group relative aspect-square w-full max-w-[480px]">

      <div
        className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-200 ${
          fxReady ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!fxReady}
      >
        <BalanceAnimation />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-[6%]">
        <MotionLink
          to="/rwafi"
          aria-label={t('zenith.enterRwafiAria')}
          className="pointer-events-auto inline-flex max-h-[64%] w-[68%] origin-center select-none rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-champagne)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(5,6,12,0.6)] transform-gpu opacity-[0.38] transition-shadow"
          initial={false}
          whileHover={{ scale: 1.03, opacity: 0.42, filter: 'brightness(1.02)' }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <img
            src={uaqcLogoMark}
            alt=""
            width={520}
            height={160}
            draggable={false}
            className="h-auto w-full object-contain"
          />
        </MotionLink>
      </div>

      {/* Pole quick actions removed */}

      {/* Side status cards */}
      <div
        className="absolute right-0 top-10 z-[6] hidden w-[220px] translate-x-3 rounded-2xl border bg-[linear-gradient(160deg,rgba(12,13,17,0.68)_0%,rgba(12,13,17,0.48)_58%,rgba(12,13,17,0.28)_100%)] px-4 py-3 shadow-[0_6px_18px_rgba(0,0,0,0.2)] backdrop-blur-[2px] md:block md:translate-x-8"
        style={{ borderColor: 'rgba(168,176,196,0.16)' }}
        aria-hidden={!fxReady}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[var(--taiji-ash)]/82">
            <BarChart3 className="h-3.5 w-3.5 text-[var(--taiji-ash)]/82" />
            <span className="text-[11px] tracking-[0.04em]">Bullish Momentum</span>
          </div>
          <span className="font-mono text-[17px] font-semibold text-[var(--taiji-ash)]/88">+2.4%</span>
        </div>
        <div className="mt-1 h-[2px] w-full overflow-hidden rounded-full bg-[var(--taiji-ash)]/16">
          <div className="h-full w-[62%] bg-[linear-gradient(90deg,rgba(168,176,196,0.16),rgba(168,176,196,0.66),rgba(168,176,196,0.24))]" />
        </div>
      </div>

      <div
        className="absolute bottom-10 left-0 z-[6] hidden w-[220px] -translate-x-3 rounded-2xl border bg-[linear-gradient(160deg,rgba(12,13,17,0.68)_0%,rgba(12,13,17,0.48)_58%,rgba(12,13,17,0.28)_100%)] px-4 py-3 shadow-[0_6px_18px_rgba(0,0,0,0.2)] backdrop-blur-[2px] md:block md:-translate-x-5"
        style={{ borderColor: 'rgba(245,166,35,0.1)' }}
        aria-hidden={!fxReady}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/82">
            <Activity className="h-3.5 w-3.5 text-[var(--taiji-gold-soft)]/72" />
            <span className="text-[11px] tracking-[0.04em]">Bearish Hedge</span>
          </div>
          <span className="font-mono text-[17px] font-semibold text-[var(--taiji-gold-soft)]/82">-1.2%</span>
        </div>
        <div className="mt-1 h-[2px] w-full overflow-hidden rounded-full bg-[rgba(245,166,35,0.14)]">
          <div className="h-full w-[41%] bg-[linear-gradient(90deg,rgba(245,166,35,0.22),rgba(245,166,35,0.72),rgba(245,166,35,0.26))]" />
        </div>
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[40px] border border-transparent shadow-none" />

      {/* Primary action row */}
      <div className="absolute -bottom-20 left-1/2 z-20 flex w-full max-w-[420px] -translate-x-1/2 flex-col gap-3 px-4 md:-bottom-24">
        <button
          type="button"
          onClick={() => navigate('/rwafi')}
          className="lux-button flex h-11 items-center justify-center gap-2 text-[14px] tracking-[0.08em]"
        >
          {t('zenith.enterRwafi')}
          <ArrowRight className="h-4 w-4" />
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => navigate('/fund')}
            className="flex h-10 items-center justify-center rounded-lg border border-white/12 bg-transparent text-xs tracking-[0.08em] text-white/80 transition-colors hover:border-white/22 hover:text-white"
          >
            {t('zenith.viewFund')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/fund#product-4')}
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[var(--taiji-gold-soft)]/24 bg-[rgba(245,166,35,0.08)] px-2 text-[12px] font-medium tracking-[0.07em] text-[var(--taiji-gold-soft)]/96 transition-colors hover:border-[var(--taiji-gold-soft)]/38 hover:bg-[rgba(245,166,35,0.12)]"
          >
            <Target className="h-4 w-4" />
            {t('zenith.product4')}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes zenith-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes zenith-particle-long {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        @keyframes zenith-particle-short {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}

