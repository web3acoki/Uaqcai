import { motion, useReducedMotion } from 'motion/react';
import { Activity, ArrowRight, BarChart3, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import uaqcLogoMark from '@/public/UAQC2.png';
import { useT } from '@/i18n/locale';

const MotionLink = motion.create(Link);

function BalanceAnimation() {
  const colorLong = 'var(--taiji-white)';
  const colorShort = 'var(--taiji-ash)';
  const colorAccent = 'var(--taiji-gold-soft)';
  const colorBg = 'var(--taiji-ink)';

  return (
    <div className="relative flex aspect-square w-full max-w-[600px] items-center justify-center">
      {/* Main rotating container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {/* Long side */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_12px_rgba(231,235,242,0.12)]" aria-hidden="true">
            <defs>
              <linearGradient id="uaqcLongGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorLong} stopOpacity="0.82" />
              <stop offset="100%" stopColor={colorLong} stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <path
              d="M 100 0 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 200 A 100 100 0 0 1 100 0"
              fill="url(#uaqcLongGradient)"
            />
            <circle cx="100" cy="50" r="12" fill={colorBg} />
            <motion.circle
              cx="100"
              cy="50"
              r="4"
              fill={colorLong}
              animate={{ scale: [1, 1.42, 1], opacity: [0.42, 0.88, 0.42] }}
              transition={{ duration: 3.6, repeat: Infinity }}
            />
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
            <motion.circle
              cx="100"
              cy="50"
              r="4"
              fill={colorAccent}
              animate={{ scale: [1, 1.42, 1], opacity: [0.34, 0.7, 0.34] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: 1.8 }}
            />
          </svg>
        </div>

        {/* Flowing particles */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={`long-p-${i}`}
              r="1.2"
              fill={colorLong}
              initial={{ offsetDistance: `${(i * 100) / 8}%`, opacity: 0 }}
              animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 0.82, 0.82, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: i * 0.9, ease: 'linear' }}
              style={{ offsetPath: "path('M 100 0 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 200')" }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={`short-p-${i}`}
              r="1.2"
              fill={i % 5 === 0 ? colorAccent : colorShort}
              initial={{ offsetDistance: `${(i * 100) / 8}%`, opacity: 0 }}
              animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 0.8, 0.8, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: i * 0.9 + 3.4, ease: 'linear' }}
              style={{ offsetPath: "path('M 100 200 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 0')" }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Central core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 rounded-full border border-white/12 bg-[rgba(255,255,255,0.02)] shadow-[0_0_10px_rgba(255,255,255,0.04)] backdrop-blur-[1px]"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--taiji-gold-soft)] shadow-[0_0_12px_rgba(245,166,35,0.35)]" />
          </div>
          <motion.div
            className="absolute -inset-4 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-8 rounded-full border border-[var(--taiji-gold-soft)]/12"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Labels removed */}
    </div>
  );
}

export function ZenithBalanceHero() {
  const t = useT();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  return (
    <div className="group relative aspect-square w-full max-w-[480px]">

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <BalanceAnimation />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-[6%]">
        <MotionLink
          to="/rwafi"
          aria-label={t('zenith.enterRwafiAria')}
          className="pointer-events-auto inline-flex max-h-[64%] w-[68%] origin-center select-none rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-champagne)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(5,6,12,0.6)] transform-gpu opacity-[0.38] transition-shadow"
          initial={false}
          whileHover={
            reducedMotion
              ? { opacity: 0.46 }
              : { scale: 1.08, opacity: 0.48, filter: 'brightness(1.06)' }
          }
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
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
      <motion.div
        animate={
          reducedMotion
            ? { opacity: [0.88, 1, 0.88] }
            : { opacity: [0.88, 1, 0.88], y: [0, -8, 0] }
        }
        transition={
          reducedMotion
            ? { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
            : {
                opacity: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 },
              }
        }
        whileHover={
          reducedMotion
            ? undefined
            : { y: -6, boxShadow: '0 14px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)' }
        }
        className="absolute right-0 top-10 z-[6] hidden w-[220px] translate-x-3 rounded-2xl border border-white/16 bg-[linear-gradient(160deg,rgba(12,13,17,0.72)_0%,rgba(12,13,17,0.5)_58%,rgba(12,13,17,0.3)_100%)] px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.22)] backdrop-blur-[3px] transition-shadow duration-300 md:block md:translate-x-8"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/82">
            <BarChart3 className="h-3.5 w-3.5 text-white/82" />
            <span className="text-[11px] tracking-[0.04em]">Bullish Momentum</span>
          </div>
          <span className="font-mono text-[17px] font-semibold text-white/92">+2.4%</span>
        </div>
        <div className="mt-1 h-[2px] w-full overflow-hidden rounded-full bg-white/12">
          <motion.div
            className="h-full bg-[linear-gradient(90deg,rgba(231,235,242,0.2),rgba(231,235,242,0.9),rgba(231,235,242,0.28))]"
            animate={{ width: ['58%', '66%', '62%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      <motion.div
        animate={
          reducedMotion
            ? { opacity: [0.88, 1, 0.88] }
            : { opacity: [0.88, 1, 0.88], y: [0, -8, 0] }
        }
        transition={
          reducedMotion
            ? { duration: 5.9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }
            : {
                opacity: { duration: 5.9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
              }
        }
        whileHover={
          reducedMotion
            ? undefined
            : { y: -6, boxShadow: '0 14px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(245,166,35,0.12)' }
        }
        className="absolute bottom-10 left-0 z-[6] hidden w-[220px] -translate-x-3 rounded-2xl border border-[var(--taiji-gold-soft)]/14 bg-[linear-gradient(160deg,rgba(12,13,17,0.72)_0%,rgba(12,13,17,0.5)_58%,rgba(12,13,17,0.3)_100%)] px-4 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.22)] backdrop-blur-[3px] transition-shadow duration-300 md:block md:-translate-x-5"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/82">
            <Activity className="h-3.5 w-3.5 text-[var(--taiji-gold-soft)]/72" />
            <span className="text-[11px] tracking-[0.04em]">Bearish Hedge</span>
          </div>
          <span className="font-mono text-[17px] font-semibold text-[var(--taiji-gold-soft)]/82">-1.2%</span>
        </div>
        <div className="mt-1 h-[2px] w-full overflow-hidden rounded-full bg-white/12">
          <motion.div
            className="h-full bg-[linear-gradient(90deg,rgba(245,166,35,0.22),rgba(245,166,35,0.72),rgba(245,166,35,0.26))]"
            animate={{ width: ['36%', '46%', '41%'] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

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
    </div>
  );
}

