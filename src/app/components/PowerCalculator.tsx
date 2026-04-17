import { useEffect, useMemo, useState } from 'react';
import { Clock, DollarSign, Lock } from 'lucide-react';
import { useLocale, useT, type Locale } from '@/i18n/locale';

interface FactorOption {
  label: string;
  value: number;
}

const TOTAL_CAPITAL = 1_000_000_000;
const CORE_TOKEN_POOL = 40_000_000;
const MIN_MONTHS = 1;
const MAX_MONTHS = 60;
const MAX_INVESTMENT = 999_999_999;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function calculateMultiplier(timeFactor: number, scaleFactor: number, months: number) {
  const lockFactor = months / 24;
  return Number((timeFactor * scaleFactor * lockFactor).toFixed(4));
}

function calculateTokenAmount(investment: number, timeFactor: number, scaleFactor: number, months: number) {
  const lockFactor = months / 24;
  const amount =
    (investment / TOTAL_CAPITAL) * CORE_TOKEN_POOL * timeFactor * scaleFactor * lockFactor;
  return Number(amount.toFixed(2));
}

function formatNumber(value: number, locale: Locale, maximumFractionDigits = 2) {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

export function PowerCalculator() {
  const { locale } = useLocale();
  const t = useT();
  const [timeFactor, setTimeFactor] = useState(1.4);
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const [investment, setInvestment] = useState(10_000_000);
  const [months, setMonths] = useState(24);
  const [activeTip, setActiveTip] = useState<'time' | 'scale' | 'lock' | null>(null);
  const [showFormulaDetail, setShowFormulaDetail] = useState(false);
  const [valueBump, setValueBump] = useState(false);

  const lockFactor = useMemo(() => Number((months / 24).toFixed(4)), [months]);
  const multiplier = useMemo(
    () => calculateMultiplier(timeFactor, scaleFactor, months),
    [timeFactor, scaleFactor, months],
  );
  const tokenAmount = useMemo(
    () => calculateTokenAmount(investment, timeFactor, scaleFactor, months),
    [investment, timeFactor, scaleFactor, months],
  );

  const participationRatio = useMemo(
    () => Number(((investment / TOTAL_CAPITAL) * 100).toFixed(4)),
    [investment],
  );
  const invalidInvestment = investment <= 0 || Number.isNaN(investment);

  useEffect(() => {
    setValueBump(true);
    const timer = window.setTimeout(() => setValueBump(false), 220);
    return () => window.clearTimeout(timer);
  }, [timeFactor, scaleFactor, months, tokenAmount, multiplier]);

  const timeOptions = useMemo<FactorOption[]>(
    () => [
      { label: t('power.time2026'), value: 1.4 },
      { label: t('power.time2027'), value: 1.0 },
      { label: t('power.time2028'), value: 0.6 },
    ],
    [t],
  );

  const scaleOptions = useMemo<FactorOption[]>(
    () => [
      { label: t('power.scaleGe500'), value: 1.3 },
      { label: t('power.scale100500'), value: 1.0 },
      { label: t('power.scaleLt100'), value: 0.7 },
    ],
    [t],
  );

  const getCircleSize = (value: number) => {
    const baseSize = 142;
    const scale = clamp(value / 2.5, 0.2, 1.15);
    return baseSize + scale * 52;
  };

  const factorItems = useMemo(
    () => [
      {
        id: 'time' as const,
        icon: <Clock className="w-6 h-6" />,
        label: t('power.timeLabel'),
        value: timeFactor,
        color: 'gold-light',
        position: { top: '11%', left: '11%' },
        tooltip: t('power.timeTip'),
        lineTo: { x2: '50', y2: '50' },
      },
      {
        id: 'scale' as const,
        icon: <DollarSign className="w-6 h-6" />,
        label: t('power.scaleLabel'),
        value: scaleFactor,
        color: 'gold-champagne',
        position: { top: '11%', right: '11%' },
        tooltip: t('power.scaleTip'),
        lineTo: { x2: '350', y2: '50' },
      },
      {
        id: 'lock' as const,
        icon: <Lock className="w-6 h-6" />,
        label: t('power.lockLabel'),
        value: lockFactor,
        color: 'gold-dark',
        position: { bottom: '18%', left: '50%', transform: 'translateX(-50%)' },
        tooltip: t('power.lockTip'),
        lineTo: { x2: '200', y2: '350' },
      },
    ],
    [t, timeFactor, scaleFactor, lockFactor],
  );

  const capsuleClass =
    'h-13 w-full rounded-full border bg-black/45 px-5 text-sm font-[var(--font-body)] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out focus:outline-none focus:-translate-y-[1px]';
  const summaryCapsuleClass =
    'group relative flex h-14 items-center justify-between gap-4 overflow-hidden rounded-full px-5 py-3 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-black/55 hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] focus-within:-translate-y-[2px] focus-within:ring-2 focus-within:ring-[var(--gold-alpha-22)]';
  const luxuryValueClass = `text-lg font-[var(--font-display)] font-bold tracking-[0.08em] transition-all duration-300 ${valueBump ? 'scale-[1.08] drop-shadow-[0_0_8px_rgba(245,166,35,0.48)]' : 'scale-100'}`;

  return (
    <div className="panel-card panel-card--featured relative w-full rounded-[var(--radius-panel)] p-6 md:p-7">
      <div className="mb-6 rounded-[var(--radius-card)] border border-white/10 bg-black/20 p-4">
        <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/45">{t('power.snapshot')}</div>
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
          <div className={`border border-[var(--gold-light)]/45 bg-gradient-to-b from-black/50 to-black/35 ${summaryCapsuleClass} hover:border-[var(--gold-light)]/70`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,255,255,0.16),transparent_48%)] opacity-80" />
            <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
            <div className="text-[13px] tracking-[0.06em] text-white/60">{t('power.timeLabel')}</div>
            <div className={luxuryValueClass} style={{ color: 'var(--gold-light)' }}>
              {timeFactor.toFixed(2)}
            </div>
          </div>
          <div className={`border border-[var(--gold-champagne)]/45 bg-gradient-to-b from-black/50 to-black/35 ${summaryCapsuleClass} hover:border-[var(--gold-champagne)]/72`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,255,255,0.16),transparent_48%)] opacity-80" />
            <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
            <div className="text-[13px] tracking-[0.06em] text-white/60">{t('power.scaleLabel')}</div>
            <div className={luxuryValueClass} style={{ color: 'var(--gold-champagne)' }}>
              {scaleFactor.toFixed(2)}
            </div>
          </div>
          <div className={`border border-[var(--gold-dark)]/45 bg-gradient-to-b from-black/50 to-black/35 ${summaryCapsuleClass} hover:border-[var(--gold-dark)]/72`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,255,255,0.16),transparent_48%)] opacity-80" />
            <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
            <div className="text-[13px] tracking-[0.06em] text-white/60">{t('power.lockLabel')}</div>
            <div className={luxuryValueClass} style={{ color: 'var(--gold-dark)' }}>
              {lockFactor.toFixed(2)}
            </div>
          </div>
          <div className="group relative flex h-14 items-center justify-between gap-4 overflow-hidden rounded-full border border-[var(--gold-champagne)]/55 bg-gradient-to-b from-black/58 to-black/40 px-5 py-3 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-[var(--gold-champagne)]/80 hover:bg-black/58 hover:shadow-[0_10px_30px_rgba(245,166,35,0.22)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.2),transparent_48%)] opacity-90" />
            <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-[var(--gold-champagne)]/18 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
            <div className="text-[13px] tracking-[0.06em] text-white/60">{t('power.multiplier')}</div>
            <div className={luxuryValueClass} style={{ color: 'var(--gold-champagne)' }}>
              {multiplier.toFixed(2)}x
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3 xl:items-stretch">
        <div className="min-w-0 rounded-[var(--radius-card)] border border-white/10 bg-black/20 p-4">
          <div className="mb-3 text-xs uppercase tracking-[0.16em] text-white/45">{t('power.params')}</div>
          <div className="space-y-3">
            <select
              value={timeFactor}
              onChange={(e) => setTimeFactor(Number(e.target.value))}
              className={`${capsuleClass} border-[var(--gold-light)]/35 focus:border-[var(--gold-light)] focus:bg-black/60 focus:ring-2 focus:ring-[var(--gold-alpha-22)]`}
              aria-label={t('power.ariaTime')}
            >
              {timeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.value})
                </option>
              ))}
            </select>

            <select
              value={scaleFactor}
              onChange={(e) => setScaleFactor(Number(e.target.value))}
              className={`${capsuleClass} border-[var(--gold-champagne)]/35 focus:border-[var(--gold-champagne)] focus:bg-black/60 focus:ring-2 focus:ring-[var(--gold-alpha-22)]`}
              aria-label={t('power.ariaScale')}
            >
              {scaleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.value})
                </option>
              ))}
            </select>

            <div className="relative rounded-[var(--radius-card)] border border-[var(--gold-light)]/45 bg-[radial-gradient(circle_at_8%_28%,rgba(245,166,35,0.3),transparent_58%)] p-2 shadow-[0_10px_28px_rgba(245,166,35,0.14)]">
              <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] border border-[var(--gold-light)]/25 opacity-70" />
              <div className="pointer-events-none absolute -inset-[1px] rounded-[var(--radius-card)] border border-[var(--gold-light)]/22 animate-pulse" />
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--gold-light)]">{t('power.step1')}</span>
                <span className="rounded-full border border-[var(--gold-light)]/35 bg-black/35 px-2 py-0.5 text-[10px] text-white/70">
                  {t('power.keyInput')}
                </span>
              </div>
              <div className="group relative">
                <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-sm font-semibold tracking-[0.08em] text-[var(--gold-light)]/90">
                  $
                </span>
                <input
                  type="number"
                  min={1}
                  max={MAX_INVESTMENT}
                  step={10_000}
                  inputMode="numeric"
                  value={investment}
                  onChange={(e) => setInvestment(clamp(Number(e.target.value), 0, MAX_INVESTMENT))}
                  className={`${capsuleClass} border-[var(--gold-light)]/45 bg-black/55 pl-10 pr-24 text-base font-semibold tracking-[0.03em] shadow-[0_0_0_1px_rgba(245,166,35,0.2),0_10px_24px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[var(--gold-light)]/65 hover:bg-black/62 focus:border-[var(--gold-light)] focus:bg-black/68 focus:ring-2 focus:ring-[var(--gold-alpha-22)]`}
                  aria-label={t('power.ariaInvest')}
                />
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[10px] tracking-[0.06em] text-white/65 transition-colors duration-300 group-focus-within:border-[var(--gold-light)]/45 group-focus-within:text-[var(--gold-light)]/85">
                  +10,000
                </span>
              </div>
              <p className="mt-2 px-2 text-[11px] text-[var(--gold-light)]/85">
                {t('power.investHint')}
              </p>
            </div>

            <div className="rounded-[var(--radius-card)] border border-[var(--gold-dark)]/30 bg-black/35 px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-white/60">{t('power.monthsLabel')}</span>
                <span className="text-xs font-semibold text-[var(--gold-dark)]">
                  {months} {t('power.monthsUnit')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={MIN_MONTHS}
                  max={MAX_MONTHS}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full accent-[var(--gold-dark)]"
                />
                <input
                  type="number"
                  min={MIN_MONTHS}
                  max={MAX_MONTHS}
                  value={months}
                  onChange={(e) => setMonths(clamp(Number(e.target.value), MIN_MONTHS, MAX_MONTHS))}
                  className="h-10 w-22 rounded-full border border-[var(--gold-dark)]/35 bg-black/50 px-4 text-right text-sm text-white transition-all duration-300 focus:-translate-y-[1px] focus:border-[var(--gold-dark)] focus:bg-black/60 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-white/45">
            {t('power.rangeHint').replace('{v}', formatNumber(investment, locale, 0))}
          </p>
          {invalidInvestment && (
            <p className="mt-2 rounded-full border border-red-300/40 bg-red-950/30 px-3 py-1 text-[11px] text-red-100/90">
              {t('power.investInvalid')}
            </p>
          )}
        </div>

        <div className="relative flex min-h-[320px] min-w-0 items-center justify-center rounded-[var(--radius-card)] border border-white/10 bg-black/20 p-5 md:min-h-[360px] md:p-6">
          <div
            className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${valueBump ? 'scale-105 opacity-95' : 'scale-100 opacity-75'}`}
            style={{
              width: `${getCircleSize(multiplier) + 44}px`,
              height: `${getCircleSize(multiplier) + 44}px`,
              background:
                'radial-gradient(circle, rgba(245,166,35,0.24) 0%, rgba(245,166,35,0.11) 36%, rgba(245,166,35,0.05) 56%, transparent 74%)',
              filter: 'blur(1px)',
            }}
          />
          <div
            className="absolute top-[42%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${getCircleSize(multiplier) - 22}px`,
              height: `${getCircleSize(multiplier) - 22}px`,
              background: 'radial-gradient(circle, var(--gold-champagne)40, var(--gold-champagne)10, transparent)',
              boxShadow: `0 0 ${10 + multiplier * 6}px var(--gold-champagne)30`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(245,166,35,0.38)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -10px 20px rgba(0,0,0,0.25), 0 0 28px rgba(245,166,35,0.2)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-[10px] rounded-full border border-white/12"
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), rgba(255,255,255,0.02) 38%, transparent 58%)',
              }}
            />
            <div className="text-center">
              <div className="mb-1 text-xs font-[var(--font-body)] text-white/70">{t('power.totalPower')}</div>
              <div
                className={`text-3xl font-[var(--font-display)] font-bold transition-all duration-300 md:text-4xl ${valueBump ? 'scale-105 drop-shadow-[0_0_12px_rgba(245,166,35,0.52)]' : 'scale-100'}`}
                style={{ color: 'var(--gold-champagne)' }}
              >
                {multiplier.toFixed(2)}x
              </div>
            </div>
          </div>

          {factorItems.map((factor) => {
            const isActive = activeTip === factor.id;
            return (
              <div key={factor.id} className="absolute transition-all duration-300" style={factor.position}>
                <svg
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: '360px', height: '360px', zIndex: -1 }}
                >
                  <line
                    x1="180"
                    y1="180"
                    x2={factor.id === 'time' ? '44' : factor.id === 'scale' ? '316' : '180'}
                    y2={factor.id === 'lock' ? '316' : '44'}
                    stroke={`var(--${factor.color})`}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.35"
                  />
                </svg>

                <button
                  type="button"
                  onClick={() => setActiveTip(isActive ? null : factor.id)}
                  onMouseEnter={() => setActiveTip(factor.id)}
                  onMouseLeave={() => setActiveTip((prev) => (prev === factor.id ? null : prev))}
                  onFocus={() => setActiveTip(factor.id)}
                  onBlur={() => setActiveTip((prev) => (prev === factor.id ? null : prev))}
                  className="relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--gold-alpha-22)]"
                  style={{
                    background: `radial-gradient(circle, var(--${factor.color})30, var(--${factor.color})08)`,
                    borderColor: `var(--${factor.color})`,
                    boxShadow: `0 0 ${5 + factor.value * 5}px var(--${factor.color})30`,
                  }}
                  aria-label={t('power.ariaFactor')
                    .replace('{label}', factor.label)
                    .replace('{v}', factor.value.toFixed(2))}
                >
                  <div style={{ color: `var(--${factor.color})` }}>
                    {factor.id === 'time' && <Clock className="h-4 w-4" />}
                    {factor.id === 'scale' && <DollarSign className="h-4 w-4" />}
                    {factor.id === 'lock' && <Lock className="h-4 w-4" />}
                  </div>
                  <div className="text-sm font-[var(--font-display)] font-bold" style={{ color: `var(--${factor.color})` }}>
                    {factor.value.toFixed(1)}
                  </div>
                </button>

                <div
                  className={`absolute top-full left-1/2 mt-2 w-40 -translate-x-1/2 rounded bg-black/90 p-2 text-center text-[11px] text-white/80 transition-opacity ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  {factor.tooltip}
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            <div className="group relative inline-flex h-12 items-center justify-between overflow-hidden rounded-full border border-[var(--gold-light)]/45 bg-gradient-to-b from-black/52 to-black/35 px-4 text-[12px] text-white/82 transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--gold-light)]/72 hover:bg-black/58">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.18),transparent_50%)] opacity-80" />
              <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
              <span className="text-white/60">{t('power.lblTime')}</span>
              <span className="font-semibold">{timeFactor.toFixed(1)}</span>
            </div>
            <div className="group relative inline-flex h-12 items-center justify-between overflow-hidden rounded-full border border-[var(--gold-champagne)]/45 bg-gradient-to-b from-black/52 to-black/35 px-4 text-[12px] text-white/82 transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--gold-champagne)]/72 hover:bg-black/58">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.18),transparent_50%)] opacity-80" />
              <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
              <span className="text-white/60">{t('power.lblScale')}</span>
              <span className="font-semibold">{scaleFactor.toFixed(1)}</span>
            </div>
            <div className="group relative inline-flex h-12 items-center justify-between overflow-hidden rounded-full border border-[var(--gold-dark)]/45 bg-gradient-to-b from-black/52 to-black/35 px-4 text-[12px] text-white/82 transition-all duration-300 hover:-translate-y-[1px] hover:border-[var(--gold-dark)]/72 hover:bg-black/58">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.18),transparent_50%)] opacity-80" />
              <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-1000 group-hover:translate-x-[130%]" />
              <span className="text-white/60">{t('power.lblLock')}</span>
              <span className="font-semibold">{lockFactor.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-[var(--radius-card)] border border-[var(--gold-champagne)]/24 bg-black/20 p-4">
          <div className="mb-3 text-xs uppercase tracking-[0.16em] text-white/45">{t('power.results')}</div>
          <div className="rounded-[var(--radius-card)] border border-[var(--gold-champagne)]/24 bg-black/35 p-4">
            <div className="text-[11px] text-white/50">{t('power.estTokens')}</div>
            <div className="text-3xl font-[var(--font-display)] font-bold leading-tight transition-all duration-300" style={{ color: 'var(--gold-champagne)' }}>
              {invalidInvestment ? '--' : formatNumber(tokenAmount, locale, 2)}
            </div>
            <div className="text-[11px] text-white/45">{t('power.unitNote')}</div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-[var(--font-body)] text-white/70">
            <div className="rounded-[var(--radius-node)] border border-white/10 bg-black/25 px-2 py-2 text-center">
              <div className="text-white/45">{t('power.share')}</div>
              <div className="font-semibold text-white">{participationRatio.toFixed(4)}%</div>
            </div>
            <div className="rounded-[var(--radius-node)] border border-white/10 bg-black/25 px-2 py-2 text-center">
              <div className="text-white/45">{t('power.pool')}</div>
              <div className="font-semibold text-white">{formatNumber(CORE_TOKEN_POOL, locale, 0)}</div>
            </div>
            <div className="rounded-[var(--radius-node)] border border-white/10 bg-black/25 px-2 py-2 text-center">
              <div className="text-white/45">{t('power.duration')}</div>
              <div className="font-semibold text-white">{t('power.monthsShort').replace('{n}', String(months))}</div>
            </div>
          </div>
          <div className="mt-3 rounded-[var(--radius-node)] border border-white/10 bg-black/25 p-3">
            <div className="text-[11px] text-white/50">{t('power.formulaTitle')}</div>
            <p className="mt-1 text-xs text-white/80">
              {t('power.formulaLine')}
            </p>
            <button
              type="button"
              onClick={() => setShowFormulaDetail((prev) => !prev)}
              className="mt-2 h-[var(--pill-h-md)] rounded-full border border-white/20 px-[var(--pill-px-md)] text-xs text-white/80 transition-colors hover:border-[var(--gold-champagne)]/40 hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-[var(--gold-alpha-22)]"
            >
              {showFormulaDetail ? t('power.formulaCollapse') : t('power.formulaExpand')}
            </button>
            {showFormulaDetail && (
              <p className="mt-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/70">
                = {formatNumber(investment, locale, 0)} ÷ {formatNumber(TOTAL_CAPITAL, locale, 0)} ×{' '}
                {formatNumber(CORE_TOKEN_POOL, locale, 0)} × {timeFactor.toFixed(2)} × {scaleFactor.toFixed(2)} × ({months} ÷ 24)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-[var(--radius-card)] border border-white/10 bg-black/15 p-3 md:flex-row md:items-center md:justify-between">
        <button className="lux-button text-sm font-[var(--font-body)] font-bold md:w-auto">
          {t('power.submit')}
        </button>
        <p className="text-[11px] text-white/50 md:text-right">
          {t('power.disclaimer')}
        </p>
      </div>
    </div>
  );
}