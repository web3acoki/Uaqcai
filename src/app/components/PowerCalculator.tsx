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

  return (
    <div className="panel-card panel-card--featured relative mx-auto w-full max-w-5xl rounded-[var(--radius-panel)] p-6 md:p-10">
      <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="mb-2 text-3xl font-[var(--font-display)]" style={{ color: 'var(--gold-champagne)' }}>
            UAQC 核心股权算力权重模拟器
          </h3>
          <p className="max-w-2xl text-sm font-[var(--font-body)] text-white/60">
            基于时间、规模、存续三因子，实时测算 POW 机制下核心股权释放效率与预计代币份额。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:min-w-[360px]">
          <div className="rounded-xl border border-[var(--gold-light)]/30 bg-black/35 p-3">
            <div className="mb-1 text-xs text-white/50">时间因子</div>
            <div className="text-xl font-[var(--font-display)] font-bold" style={{ color: 'var(--gold-light)' }}>
              {timeFactor.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--gold-champagne)]/30 bg-black/35 p-3">
            <div className="mb-1 text-xs text-white/50">规模因子</div>
            <div className="text-xl font-[var(--font-display)] font-bold" style={{ color: 'var(--gold-champagne)' }}>
              {scaleFactor.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--gold-dark)]/30 bg-black/35 p-3">
            <div className="mb-1 text-xs text-white/50">存续因子(月数/24)</div>
            <div className="text-xl font-[var(--font-display)] font-bold" style={{ color: 'var(--gold-dark)' }}>
              {lockFactor.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--gold-champagne)]/40 bg-black/45 p-3">
            <div className="mb-1 text-xs text-white/50">综合算力乘数</div>
            <div className="text-2xl font-[var(--font-display)] font-bold transition-all duration-300" style={{ color: 'var(--gold-champagne)' }}>
              {multiplier.toFixed(2)}x
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative flex h-[310px] items-center justify-center md:h-[360px]">
          <div
            className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${getCircleSize(multiplier)}px`,
              height: `${getCircleSize(multiplier)}px`,
              background: 'radial-gradient(circle, var(--gold-champagne)40, var(--gold-champagne)10, transparent)',
              boxShadow: `0 0 ${18 + multiplier * 12}px var(--gold-champagne)45`,
            }}
          >
            <div className="text-center">
              <div className="mb-1 text-sm font-[var(--font-body)] text-white/70">综合算力</div>
              <div className="text-4xl font-[var(--font-display)] font-bold md:text-5xl" style={{ color: 'var(--gold-champagne)' }}>
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
                  style={{ width: '400px', height: '400px', zIndex: -1 }}
                >
                  <line
                    x1="200"
                    y1="200"
                    x2={factor.lineTo.x2}
                    y2={factor.lineTo.y2}
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
                  className="relative flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
                  style={{
                    background: `radial-gradient(circle, var(--${factor.color})30, var(--${factor.color})08)`,
                    borderColor: `var(--${factor.color})`,
                    boxShadow: `0 0 ${10 + factor.value * 10}px var(--${factor.color})45`,
                  }}
                  aria-label={`${factor.label}，当前 ${factor.value.toFixed(2)}`}
                >
                  <div className="mb-1" style={{ color: `var(--${factor.color})` }}>
                    {factor.icon}
                  </div>
                  <div className="text-xl font-[var(--font-display)] font-bold" style={{ color: `var(--${factor.color})` }}>
                    {factor.value.toFixed(1)}
                  </div>
                </button>

                <div
                  className={`absolute top-full left-1/2 mt-2 w-48 -translate-x-1/2 rounded bg-black/90 p-2 text-center text-xs text-white/80 transition-opacity ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  {factor.tooltip}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[var(--gold-champagne)]/30 bg-black/25 p-5">
          <div className="mb-4 text-sm font-[var(--font-body)] text-white/60">预计释放结果</div>
          <div className="mb-5 rounded-xl border border-[var(--gold-champagne)]/25 bg-black/35 p-4">
            <div className="mb-1 text-xs text-white/50">预计可释放核心股权代币数量</div>
            <div className="text-3xl font-[var(--font-display)] font-bold leading-tight transition-all duration-300" style={{ color: 'var(--gold-champagne)' }}>
              {invalidInvestment ? '--' : formatNumber(tokenAmount, 2)}
            </div>
            <div className="mt-1 text-xs text-white/45">单位：UAQC（模拟测算）</div>
          </div>

          <div className="space-y-2 text-sm font-[var(--font-body)] text-white/70">
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2">
              <span>投资额占资金盘比例</span>
              <span className="font-semibold text-white">{participationRatio.toFixed(4)}%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2">
              <span>核心释放池</span>
              <span className="font-semibold text-white">{formatNumber(CORE_TOKEN_POOL, 0)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2">
              <span>存续周期</span>
              <span className="font-semibold text-white">{months} 个月</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-7 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-[var(--font-body)] text-white/70">
            入场时间（时间因子）
          </label>
          <select
            value={timeFactor}
            onChange={(e) => setTimeFactor(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--gold-light)]/30 bg-black/50 px-4 py-3 font-[var(--font-body)] text-white transition-colors focus:border-[var(--gold-light)] focus:outline-none"
          >
            {timeOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-[var(--font-body)] text-white/70">
            资金规模（规模因子）
          </label>
          <select
            value={scaleFactor}
            onChange={(e) => setScaleFactor(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--gold-champagne)]/30 bg-black/50 px-4 py-3 font-[var(--font-body)] text-white transition-colors focus:border-[var(--gold-champagne)] focus:outline-none"
          >
            {scaleOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-[var(--font-body)] text-white/70">
            投资额（美元）
          </label>
          <input
            type="number"
            min={1}
            max={MAX_INVESTMENT}
            step={10_000}
            value={investment}
            onChange={(e) => setInvestment(clamp(Number(e.target.value), 0, MAX_INVESTMENT))}
            className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 font-[var(--font-body)] text-white transition-colors focus:border-[var(--gold-light)] focus:outline-none"
          />
          <p className="mt-2 text-xs font-[var(--font-body)] text-white/45">
            建议输入范围：100,000 ~ 500,000,000。当前：{formatNumber(investment, 0)} 美元
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-[var(--font-body)] text-white/70">
            存续周期（月）
          </label>
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
              className="w-24 rounded-lg border border-[var(--gold-dark)]/40 bg-black/50 px-3 py-2 text-right font-[var(--font-body)] text-white focus:border-[var(--gold-dark)] focus:outline-none"
            />
          </div>
          <p className="mt-2 text-xs font-[var(--font-body)] text-white/45">
            存续因子 = {months} / 24 = {lockFactor.toFixed(4)}
          </p>
        </div>
      </div>

      {invalidInvestment && (
        <div className="mb-5 rounded-lg border border-red-300/40 bg-red-950/30 px-4 py-3 text-sm text-red-100/90">
          投资额需大于 0 才能进行测算，请输入有效数字。
        </div>
      )}

      <div className="rounded-xl border border-white/15 bg-black/20 p-4">
        <h4 className="mb-3 text-lg font-[var(--font-body)] font-semibold" style={{ color: 'var(--gold-champagne)' }}>
          计算公式拆解
        </h4>
        <div className="space-y-2 font-[var(--font-body)] text-sm text-white/70">
          <p>
            代币数量 = 投资额 ÷ 10亿 × 4000万 × 时间因子 × 规模因子 × (存续月数 ÷ 24)
          </p>
          <p className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
            = {formatNumber(investment, 0)} ÷ {formatNumber(TOTAL_CAPITAL, 0)} × {formatNumber(CORE_TOKEN_POOL, 0)} × {timeFactor.toFixed(2)} × {scaleFactor.toFixed(2)} × ({months} ÷ 24)
          </p>
          <p className="rounded-lg border border-[var(--gold-champagne)]/30 bg-black/40 px-3 py-2 text-base font-semibold text-white">
            结果：{invalidInvestment ? '--' : `${formatNumber(tokenAmount, 2)} UAQC`}
          </p>
        </div>
      </div>

      <button className="lux-button mt-6 w-full py-4 text-lg font-[var(--font-body)] font-bold">
        提交战略节点申请
      </button>

      <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
        <p className="text-center text-xs leading-relaxed text-white/55">
          模拟结果用于战略节点评估参考，实际释放规则以链上与治理公告为准。
        </p>
      </div>
    </div>
  );
}