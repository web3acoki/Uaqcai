import { useMemo, useState } from 'react';
import { Clock, DollarSign, Lock } from 'lucide-react';

interface FactorOption {
  label: string;
  value: number;
}

const TOTAL_CAPITAL = 1_000_000_000;
const CORE_TOKEN_POOL = 40_000_000;
const MIN_MONTHS = 1;
const MAX_MONTHS = 60;
const MAX_INVESTMENT = 999_999_999;

const timeOptions: FactorOption[] = [
  { label: '2026 启动期', value: 1.4 },
  { label: '2027 成长期', value: 1.0 },
  { label: '2028 常规期', value: 0.6 },
];

const scaleOptions: FactorOption[] = [
  { label: '>=500万 美元', value: 1.3 },
  { label: '100-500万 美元', value: 1.0 },
  { label: '<100万 美元', value: 0.7 },
];

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

function formatNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

export function PowerCalculator() {
  const [timeFactor, setTimeFactor] = useState(1.4);
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const [investment, setInvestment] = useState(10_000_000);
  const [months, setMonths] = useState(24);
  const [activeTip, setActiveTip] = useState<'time' | 'scale' | 'lock' | null>(null);
  const [showFormulaDetail, setShowFormulaDetail] = useState(false);

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

  const getCircleSize = (value: number) => {
    const baseSize = 156;
    const scale = clamp(value / 2.5, 0.2, 1.2);
    return baseSize + scale * 60;
  };

  const factorItems = [
    {
      id: 'time' as const,
      icon: <Clock className="w-6 h-6" />,
      label: '时间因子',
      value: timeFactor,
      color: 'gold-light',
      position: { top: '15%', left: '15%' },
      tooltip: '越早参与，获得的 POW 权重越高',
      lineTo: { x2: '50', y2: '50' },
    },
    {
      id: 'scale' as const,
      icon: <DollarSign className="w-6 h-6" />,
      label: '规模因子',
      value: scaleFactor,
      color: 'gold-champagne',
      position: { top: '15%', right: '15%' },
      tooltip: '更高资金规模对应更强战略节点权重',
      lineTo: { x2: '350', y2: '50' },
    },
    {
      id: 'lock' as const,
      icon: <Lock className="w-6 h-6" />,
      label: '存续因子',
      value: lockFactor,
      color: 'gold-dark',
      position: { bottom: '15%', left: '50%', transform: 'translateX(-50%)' },
      tooltip: '存续周期越长，综合释放效率越优',
      lineTo: { x2: '200', y2: '350' },
    },
  ];

  const capsuleClass =
    'h-12 w-full rounded-full border bg-black/45 px-6 text-sm font-[var(--font-body)] text-white transition-colors focus:outline-none';

  return (
    <div className="panel-card panel-card--featured relative mx-auto w-full max-w-6xl rounded-[var(--radius-panel)] p-5 md:p-6">
      <div className="mb-4 flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <h3 className="mb-1 text-2xl font-[var(--font-display)] md:text-3xl" style={{ color: 'var(--gold-champagne)' }}>
            UAQC 核心股权算力权重模拟器
          </h3>
          <p className="max-w-2xl text-xs font-[var(--font-body)] text-white/60 md:text-sm">
            时间、规模、存续三因子实时联动，快速得到核心股权释放效率与预计代币份额。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 xl:w-[360px]">
          <div className="rounded-full border border-[var(--gold-light)]/30 bg-black/35 px-4 py-2">
            <div className="text-[11px] text-white/45">时间因子</div>
            <div className="text-base font-[var(--font-display)] font-bold" style={{ color: 'var(--gold-light)' }}>
              {timeFactor.toFixed(2)}
            </div>
          </div>
          <div className="rounded-full border border-[var(--gold-champagne)]/30 bg-black/35 px-4 py-2">
            <div className="text-[11px] text-white/45">规模因子</div>
            <div className="text-base font-[var(--font-display)] font-bold" style={{ color: 'var(--gold-champagne)' }}>
              {scaleFactor.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr_1.05fr]">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 text-xs uppercase tracking-[0.16em] text-white/45">参数输入</div>
          <div className="space-y-3">
            <select
              value={timeFactor}
              onChange={(e) => setTimeFactor(Number(e.target.value))}
              className={`${capsuleClass} border-[var(--gold-light)]/35 focus:border-[var(--gold-light)]`}
              aria-label="入场时间（时间因子）"
            >
              {timeOptions.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label} ({opt.value})
                </option>
              ))}
            </select>

            <select
              value={scaleFactor}
              onChange={(e) => setScaleFactor(Number(e.target.value))}
              className={`${capsuleClass} border-[var(--gold-champagne)]/35 focus:border-[var(--gold-champagne)]`}
              aria-label="资金规模（规模因子）"
            >
              {scaleOptions.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label} ({opt.value})
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              max={MAX_INVESTMENT}
              step={10_000}
              value={investment}
              onChange={(e) => setInvestment(clamp(Number(e.target.value), 0, MAX_INVESTMENT))}
              className={`${capsuleClass} border-white/20 focus:border-[var(--gold-light)]`}
              aria-label="投资额（美元）"
            />

            <div className="rounded-3xl border border-[var(--gold-dark)]/35 bg-black/35 px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-white/60">存续周期（月）</span>
                <span className="text-xs font-semibold text-[var(--gold-dark)]">{months} 月</span>
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
                  className="h-10 w-20 rounded-full border border-[var(--gold-dark)]/45 bg-black/45 px-3 text-right text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-white/45">
            建议投资区间 100,000 ~ 500,000,000，当前 {formatNumber(investment, 0)} 美元。
          </p>
          {invalidInvestment && (
            <p className="mt-2 rounded-full border border-red-300/40 bg-red-950/30 px-3 py-1 text-[11px] text-red-100/90">
              投资额需大于 0。
            </p>
          )}
        </div>

        <div className="relative flex h-[250px] items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-4">
          <div
            className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${getCircleSize(multiplier) - 22}px`,
              height: `${getCircleSize(multiplier) - 22}px`,
              background: 'radial-gradient(circle, var(--gold-champagne)40, var(--gold-champagne)10, transparent)',
              boxShadow: `0 0 ${14 + multiplier * 9}px var(--gold-champagne)45`,
            }}
          >
            <div className="text-center">
              <div className="mb-1 text-xs font-[var(--font-body)] text-white/70">综合算力</div>
              <div className="text-3xl font-[var(--font-display)] font-bold md:text-4xl" style={{ color: 'var(--gold-champagne)' }}>
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
                  style={{ width: '300px', height: '300px', zIndex: -1 }}
                >
                  <line
                    x1="150"
                    y1="150"
                    x2={factor.id === 'time' ? '36' : factor.id === 'scale' ? '264' : '150'}
                    y2={factor.id === 'lock' ? '264' : '36'}
                    stroke={`var(--${factor.color})`}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.35"
                  />
                </svg>

                <button
                  type="button"
                  onClick={() => setActiveTip(isActive ? null : factor.id)}
                  onBlur={() => setActiveTip((prev) => (prev === factor.id ? null : prev))}
                  className="relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
                  style={{
                    background: `radial-gradient(circle, var(--${factor.color})30, var(--${factor.color})08)`,
                    borderColor: `var(--${factor.color})`,
                    boxShadow: `0 0 ${8 + factor.value * 8}px var(--${factor.color})45`,
                  }}
                  aria-label={`${factor.label}，当前 ${factor.value.toFixed(2)}`}
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

          <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
            <div className="rounded-full border border-[var(--gold-light)]/30 bg-black/35 px-3 py-1 text-center text-[11px] text-white/80">
              时间 {timeFactor.toFixed(1)}
            </div>
            <div className="rounded-full border border-[var(--gold-champagne)]/30 bg-black/35 px-3 py-1 text-center text-[11px] text-white/80">
              规模 {scaleFactor.toFixed(1)}
            </div>
            <div className="rounded-full border border-[var(--gold-dark)]/30 bg-black/35 px-3 py-1 text-center text-[11px] text-white/80">
              存续 {lockFactor.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--gold-champagne)]/30 bg-black/20 p-4">
          <div className="mb-3 text-xs uppercase tracking-[0.16em] text-white/45">结果输出</div>
          <div className="rounded-3xl border border-[var(--gold-champagne)]/30 bg-black/35 p-4">
            <div className="text-[11px] text-white/50">预计可释放核心股权代币数量</div>
            <div className="text-3xl font-[var(--font-display)] font-bold leading-tight transition-all duration-300" style={{ color: 'var(--gold-champagne)' }}>
              {invalidInvestment ? '--' : formatNumber(tokenAmount, 2)}
            </div>
            <div className="text-[11px] text-white/45">单位：UAQC（模拟测算）</div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-[var(--font-body)] text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/25 px-2 py-2 text-center">
              <div className="text-white/45">资金占比</div>
              <div className="font-semibold text-white">{participationRatio.toFixed(4)}%</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 px-2 py-2 text-center">
              <div className="text-white/45">释放池</div>
              <div className="font-semibold text-white">{formatNumber(CORE_TOKEN_POOL, 0)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 px-2 py-2 text-center">
              <div className="text-white/45">存续周期</div>
              <div className="font-semibold text-white">{months}个月</div>
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-3">
            <div className="text-[11px] text-white/50">简式公式</div>
            <p className="mt-1 text-xs text-white/80">
              代币数量 = 投资额 ÷ 10亿 × 4000万 × 时间因子 × 规模因子 × 存续因子
            </p>
            <button
              type="button"
              onClick={() => setShowFormulaDetail((prev) => !prev)}
              className="mt-2 h-9 rounded-full border border-white/20 px-4 text-xs text-white/80 transition-colors hover:border-[var(--gold-champagne)]/40"
            >
              {showFormulaDetail ? '收起详细拆解' : '查看详细拆解'}
            </button>
            {showFormulaDetail && (
              <p className="mt-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/70">
                = {formatNumber(investment, 0)} ÷ {formatNumber(TOTAL_CAPITAL, 0)} × {formatNumber(CORE_TOKEN_POOL, 0)} × {timeFactor.toFixed(2)} × {scaleFactor.toFixed(2)} × ({months} ÷ 24)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/15 p-3 md:flex-row md:items-center md:justify-between">
        <button className="lux-button h-12 rounded-full px-8 text-sm font-[var(--font-body)] font-bold md:w-auto">
          提交战略节点申请
        </button>
        <p className="text-[11px] text-white/50 md:text-right">
          模拟结果仅供战略节点评估参考，实际释放规则以链上与治理公告为准。
        </p>
      </div>
    </div>
  );
}