import { useState, useEffect } from 'react';
import { Clock, DollarSign, Lock } from 'lucide-react';

interface FactorOption {
  label: string;
  value: number;
}

const timeOptions: FactorOption[] = [
  { label: '2024 创世期', value: 1.8 },
  { label: '2025 早鸟期', value: 1.6 },
  { label: '2026 启动期', value: 1.4 },
  { label: '2027 成长期', value: 1.2 },
  { label: '2028 常规期', value: 1.0 },
];

const scaleOptions: FactorOption[] = [
  { label: '<10w 普通参与者', value: 1.0 },
  { label: '10w-50w 核心参与者', value: 1.1 },
  { label: '50w-100w 高净值用户', value: 1.2 },
  { label: '100w-500w 战略合伙人', value: 1.25 },
  { label: '>500w 战略大户', value: 1.3 },
];

const lockOptions: FactorOption[] = [
  { label: '不锁定/短期流动', value: 1.0 },
  { label: '6个月', value: 1.1 },
  { label: '1年', value: 1.25 },
  { label: '2-3年 长效资产', value: 1.5 },
  { label: '3年以上 深度绑定', value: 1.7 },
];

export function PowerCalculator() {
  const [timeFactor, setTimeFactor] = useState(1.4);
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const [lockFactor, setLockFactor] = useState(1.0);
  const [multiplier, setMultiplier] = useState(1.4);

  useEffect(() => {
    const calc = timeFactor * scaleFactor * lockFactor;
    setMultiplier(Number(calc.toFixed(2)));
  }, [timeFactor, scaleFactor, lockFactor]);

  const getCircleSize = (multiplier: number) => {
    const baseSize = 160;
    const scale = Math.min(multiplier / 4, 1);
    return baseSize + scale * 80;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-6">
        <div>
          <h3 className="text-3xl font-[var(--font-display)] mb-2" style={{ color: 'var(--gold-champagne)' }}>
            UAQC 核心股权算力权重模拟器
          </h3>
          <p className="text-white/60 text-sm font-[var(--font-body)] max-w-2xl">
            选择您的入场时间、资金规模与存续策略，立即查看在 POW 机制下的核心股权释放权重差距
          </p>
        </div>

        {/* Results - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {[
            { label: '时间因子', value: timeFactor, color: 'gold-light' },
            { label: '规模因子', value: scaleFactor, color: 'gold-champagne' },
            { label: '存续因子', value: lockFactor, color: 'gold-dark' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-white/50 mb-1">{item.label}</div>
              <div className="text-2xl font-bold font-[var(--font-display)]" style={{ color: `var(--${item.color})` }}>
                {item.value.toFixed(1)}
              </div>
            </div>
          ))}
          <div className="ml-4 pl-4 border-l border-white/20 text-center">
            <div className="text-xs text-white/50 mb-1">综合算力乘数</div>
            <div className="text-3xl font-bold font-[var(--font-display)]" style={{ color: 'var(--gold-champagne)' }}>
              {multiplier.toFixed(2)}x
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="relative flex items-center justify-center mb-16 h-[400px]">
        {/* Center Circle - Main Power */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            width: `${getCircleSize(multiplier)}px`,
            height: `${getCircleSize(multiplier)}px`,
            background: `radial-gradient(circle, var(--gold-champagne)40, var(--gold-champagne)10, transparent)`,
            boxShadow: `0 0 ${multiplier * 20}px var(--gold-champagne)60`,
          }}
        >
          <div className="text-center">
            <div className="text-sm text-white/70 font-[var(--font-body)] mb-1">综合算力</div>
            <div className="text-5xl font-bold font-[var(--font-display)]" style={{ color: 'var(--gold-champagne)' }}>
              {multiplier.toFixed(2)}x
            </div>
          </div>
        </div>

        {/* Factor Bubbles */}
        {[
          {
            icon: <Clock className="w-6 h-6" />,
            label: '时间因子',
            value: timeFactor,
            color: 'gold-light',
            position: { top: '15%', left: '15%' },
            tooltip: '越早参与,获得的 POW 权重越高',
          },
          {
            icon: <DollarSign className="w-6 h-6" />,
            label: '规模因子',
            value: scaleFactor,
            color: 'gold-champagne',
            position: { top: '15%', right: '15%' },
            tooltip: '更高资金规模对应更强战略节点权重',
          },
          {
            icon: <Lock className="w-6 h-6" />,
            label: '存续因子',
            value: lockFactor,
            color: 'gold-dark',
            position: { bottom: '15%', left: '50%', transform: 'translateX(-50%)' },
            tooltip: '锁定越久，算力释放越优',
          },
        ].map((factor, i) => (
          <div
            key={i}
            className="group absolute transition-all duration-700"
            style={factor.position}
          >
            {/* Connection Line */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '400px', height: '400px', zIndex: -1 }}>
              <line
                x1="200"
                y1="200"
                x2={i === 0 ? "50" : i === 1 ? "350" : "200"}
                y2={i === 0 ? "50" : i === 1 ? "50" : "350"}
                stroke={`var(--${factor.color})`}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
                className="animate-pulse"
              />
            </svg>

            {/* Bubble */}
            <div
              className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center backdrop-blur-md border transition-all duration-500 hover:scale-110 cursor-pointer"
              style={{
                background: `radial-gradient(circle, var(--${factor.color})30, var(--${factor.color})10)`,
                borderColor: `var(--${factor.color})`,
                boxShadow: `0 0 ${factor.value * 15}px var(--${factor.color})50`,
              }}
            >
              <div style={{ color: `var(--${factor.color})` }} className="mb-1">
                {factor.icon}
              </div>
              <div className="text-xl font-bold font-[var(--font-display)]" style={{ color: `var(--${factor.color})` }}>
                {factor.value.toFixed(1)}
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-black/90 rounded text-xs text-white/80 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {factor.tooltip}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Time Factor */}
        <div>
          <label className="block text-sm font-[var(--font-body)] mb-3 text-white/70">
            入场时间（时间因子）
          </label>
          <select
            value={timeFactor}
            onChange={(e) => setTimeFactor(Number(e.target.value))}
            className="w-full px-4 py-3 bg-black/50 border border-[var(--gold-light)]/30 rounded-lg text-white font-[var(--font-body)] focus:border-[var(--gold-light)] focus:outline-none transition-colors"
          >
            {timeOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>

        {/* Scale Factor */}
        <div>
          <label className="block text-sm font-[var(--font-body)] mb-3 text-white/70">
            资金规模（规模因子）
          </label>
          <select
            value={scaleFactor}
            onChange={(e) => setScaleFactor(Number(e.target.value))}
            className="w-full px-4 py-3 bg-black/50 border border-[var(--gold-champagne)]/30 rounded-lg text-white font-[var(--font-body)] focus:border-[var(--gold-champagne)] focus:outline-none transition-colors"
          >
            {scaleOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>

        {/* Lock Factor */}
        <div>
          <label className="block text-sm font-[var(--font-body)] mb-3 text-white/70">
            存续锁定（存续因子）
          </label>
          <select
            value={lockFactor}
            onChange={(e) => setLockFactor(Number(e.target.value))}
            className="w-full px-4 py-3 bg-black/50 border border-[var(--gold-dark)]/30 rounded-lg text-white font-[var(--font-body)] focus:border-[var(--gold-dark)] focus:outline-none transition-colors"
          >
            {lockOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results - Mobile */}
      <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
        {[
          { label: '时间因子', value: timeFactor, color: 'gold-light' },
          { label: '规模因子', value: scaleFactor, color: 'gold-champagne' },
          { label: '存续因子', value: lockFactor, color: 'gold-dark' },
          { label: '综合算力乘数', value: multiplier, color: 'gold-champagne', large: true },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-4 bg-black/30 border rounded-lg ${item.large ? 'col-span-2' : ''}`}
            style={{ borderColor: `var(--${item.color})30` }}
          >
            <div className="text-xs text-white/50 mb-1">{item.label}</div>
            <div className={`font-bold font-[var(--font-display)] ${item.large ? 'text-3xl' : 'text-xl'}`} style={{ color: `var(--${item.color})` }}>
              {item.value.toFixed(2)}{item.large ? 'x' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button className="w-full py-4 bg-gradient-to-r from-[var(--gold-champagne)] to-[var(--gold-light)] text-black font-[var(--font-body)] font-bold text-lg rounded-xl hover:shadow-[0_0_30px_var(--gold-champagne)50] transition-all duration-300">
        提交战略节点申请
      </button>

      {/* Info Text */}
      <div className="mt-6 p-4 bg-black/20 border border-white/10 rounded-lg">
        <p className="text-xs text-white/50 font-[var(--font-body)] text-center leading-relaxed">
          POW 算力机制：测算您的 40% 核心股权释放极差。早参与 ≠ 只早一点，而是释放效率显著拉开。
        </p>
      </div>
    </div>
  );
}