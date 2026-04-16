import { motion } from 'motion/react';
import { Activity, BarChart3, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';

function BalanceAnimation() {
  const colorLong = 'var(--tech-green)';
  const colorShort = 'var(--gold-champagne)';
  const colorBg = 'var(--deep-black)';

  return (
    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[var(--tech-green)]/5 blur-[120px] rounded-full -translate-x-1/4" />
      <div className="absolute inset-0 bg-[var(--gold-champagne)]/5 blur-[120px] rounded-full translate-x-1/4" />

      {/* Main rotating container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {/* Long side */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,255,163,0.2)]" aria-hidden="true">
            <defs>
              <linearGradient id="uaqcLongGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorLong} stopOpacity="0.9" />
                <stop offset="100%" stopColor={colorLong} stopOpacity="0.1" />
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
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Short side */}
        <div className="absolute inset-0 flex items-center justify-center rotate-180">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]" aria-hidden="true">
            <defs>
              <linearGradient id="uaqcShortGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorShort} stopOpacity="0.9" />
                <stop offset="100%" stopColor={colorShort} stopOpacity="0.1" />
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
              fill={colorShort}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </div>

        {/* Flowing particles */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.circle
              key={`long-p-${i}`}
              r="1.2"
              fill={colorLong}
              initial={{ offsetDistance: `${(i * 100) / 8}%`, opacity: 0 }}
              animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.6, ease: 'linear' }}
              style={{ offsetPath: "path('M 100 0 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 200')" }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.circle
              key={`short-p-${i}`}
              r="1.2"
              fill={colorShort}
              initial={{ offsetDistance: `${(i * 100) / 8}%`, opacity: 0 }}
              animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.6 + 2.5, ease: 'linear' }}
              style={{ offsetPath: "path('M 100 200 A 50 50 0 0 1 100 100 A 50 50 0 0 0 100 0')" }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Central core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_#fff]" />
          </div>
          <motion.div
            className="absolute -inset-4 border border-[var(--gold-champagne)]/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-8 border border-[var(--tech-green)]/10 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--tech-green)] font-mono text-[10px] tracking-[0.3em] uppercase opacity-80"
        >
          RWAFi
        </motion.div>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--tech-green)]/30 to-transparent mx-auto mt-2" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 text-center pointer-events-none">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--gold-champagne)]/30 to-transparent mx-auto mb-2" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--gold-champagne)] font-mono text-[10px] tracking-[0.3em] uppercase opacity-80"
        >
          Fund
        </motion.div>
      </div>
    </div>
  );
}

export function ZenithBalanceHero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[480px] aspect-square group">
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-black/70 via-black/45 to-black/80" />

      <div className="absolute inset-0 flex items-center justify-center">
        <BalanceAnimation />
      </div>

      {/* Clickable poles */}
      <button
        type="button"
        onClick={() => navigate('/rwafi')}
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 w-[170px] h-[74px] rounded-[22px] pointer-events-auto transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tech-green)]/40"
        aria-label="前往 RWAFi"
      >
        <div className="absolute inset-0 rounded-[22px] bg-white/[0.03] backdrop-blur-md border border-[rgba(0,255,163,0.22)] shadow-[0_18px_40px_rgba(0,0,0,0.55)]" />
        <div className="relative z-10 h-full flex items-center justify-center gap-2">
          <Activity className="w-4 h-4 text-[var(--tech-green)]" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[var(--tech-green)]/90">
            RWAFi
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => navigate('/fund')}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-4 w-[190px] h-[80px] rounded-[24px] pointer-events-auto transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-champagne)]/40"
        aria-label="前往基金产品"
      >
        <div className="absolute inset-0 rounded-[24px] bg-white/[0.03] backdrop-blur-md border border-[rgba(212,175,55,0.24)] shadow-[0_18px_40px_rgba(0,0,0,0.55)]" />
        <div className="relative z-10 h-full flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-[var(--gold-champagne)]" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[var(--gold-champagne)]/90">
            FUND
          </span>
        </div>
      </button>

      {/* Floating data cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-0 p-4 rounded-2xl shadow-2xl max-w-[180px] bg-white/[0.03] backdrop-blur-md border border-[rgba(212,175,55,0.18)]"
      >
        <div className="flex items-center justify-between mb-2">
          <BarChart3 className="w-4 h-4 text-[var(--tech-green)]" />
          <span className="text-[10px] font-mono text-[var(--tech-green)]">+2.4%</span>
        </div>
        <div className="text-sm font-bold text-white/90">Bullish Momentum</div>
        <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--tech-green)]"
            animate={{ width: ['40%', '70%', '60%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-10 left-0 p-4 rounded-2xl shadow-2xl max-w-[180px] bg-white/[0.03] backdrop-blur-md border border-[rgba(212,175,55,0.18)]"
      >
        <div className="flex items-center justify-between mb-2">
          <Activity className="w-4 h-4 text-[var(--gold-champagne)]" />
          <span className="text-[10px] font-mono text-[var(--gold-champagne)]">-1.2%</span>
        </div>
        <div className="text-sm font-bold text-white/90">Bearish Hedge</div>
        <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--gold-champagne)]"
            animate={{ width: ['30%', '50%', '40%'] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[40px] border border-[var(--gold-champagne)]/14 shadow-[0_0_60px_rgba(235,213,169,0.05)]" />
    </div>
  );
}

