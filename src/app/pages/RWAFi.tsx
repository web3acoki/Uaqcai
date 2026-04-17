import { ArrowRight, Target, Layers, Coins, TrendingUp, Zap, Lock, ShieldCheck, Play, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { PowerCalculator } from '../components/PowerCalculator';
import { GlassReveal } from '../components/site/GlassReveal';

export function RWAFi() {
  const location = useLocation();
  const [isStaking, setIsStaking] = useState(false);

  useEffect(() => {
    if (location.hash !== '#product-4') return;
    const el = document.getElementById('product-4');
    if (!el) return;
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [location.hash]);

  return (
    <section className="section-shell min-h-screen bg-transparent">
      <div className="page-container">
        {/* DeFi Products */}
        <div className="mb-32">
          <div className="mb-4 text-center">
            <span className="brand-kicker mb-4">
              <span className="brand-dot" />
              RWAFi 门户
            </span>
            <h3 className="section-heading mb-3">
              RWAFi 门户
            </h3>
            <p className="font-[var(--font-body)] text-lg text-white/60 mb-2">
              连接传统资产与 Web3 股权的桥梁
            </p>
          </div>

          <div className="panel-grid mt-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '智赢先知预测市场',
                subtitle: 'NextTick',
                position: '链上流量入口',
                desc: '类 Polymarket 的极简预测市场，结合量化大模型交易机制',
                tag: '流量核武器',
                icon: <Target className="w-6 h-6" />,
                color: 'gold-light',
              },
              {
                title: '智赢时时宝策略',
                position: '稳健收益资金池',
                desc: '类 Web3"余额宝"产品，底层采用无风险套利与稳健型策略',
                tag: '已上线',
                icon: <Layers className="w-6 h-6" />,
                color: 'gold-champagne',
              },
              {
                title: '智赢比特币增强策略',
                position: 'BTC 持有者增强方案',
                desc: '以比特币本位计价，结合加权决策树算法进行套利增强',
                tag: '老钱入口',
                icon: <Coins className="w-6 h-6" />,
                color: 'gold-dark',
              },
              {
                title: '多币种趋势对冲策略先行版',
                position: '高波动趋势捕获',
                desc: '捕捉主流币异动周期中的趋势机会，增强策略攻击性',
                tag: '2026.03 上线',
                icon: <TrendingUp className="w-6 h-6" />,
                color: 'gold-light',
              },
              {
                title: '智赢量化基础模型',
                position: '生态算法试验田',
                desc: '基于最新 AI 模型进行全市场多维拟合，持续打磨高频套利因子',
                tag: '敏捷沙盒',
                icon: <Zap className="w-6 h-6" />,
                color: 'gold-champagne',
              },
              {
                title: '智赢创投策略',
                position: '早期项目差额交易',
                desc: '结合链上 BTC 净流入主流 CEX 等关键数据，对 Web3 早期项目进行差额交易',
                tag: '已封闭',
                icon: <Lock className="w-6 h-6" />,
                color: 'gold-dark',
              },
            ].map((product, i) => (
              <GlassReveal
                key={i}
                interactive
                id={product.title === '智赢时时宝策略' ? 'product-4' : undefined}
                variant="muted"
                className="panel-card group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] p-6 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-[var(--gold-champagne)]/10 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-black/50 rounded-lg" style={{ color: `var(--${product.color})` }}>
                      {product.icon}
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-[var(--font-body)] backdrop-blur-sm"
                      style={{
                        backgroundColor: `var(--${product.color})20`,
                        color: `var(--${product.color})`,
                        border: `1px solid var(--${product.color})40`,
                      }}
                    >
                      {product.tag}
                    </span>
                  </div>

                  <h4 className="mb-1 text-lg font-[var(--font-body)] font-semibold text-white transition-colors group-hover:text-[var(--gold-light)]">
                    {product.title}
                    {product.subtitle && (
                      <span className="ml-2 text-sm font-normal text-white/40">
                        {product.subtitle}
                      </span>
                    )}
                  </h4>

                  <p
                    className="text-sm mb-3 font-[var(--font-body)]"
                    style={{ color: 'var(--gold-light)' }}
                  >
                    {product.position}
                  </p>

                  <p className="text-sm text-white/60 font-[var(--font-body)] leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </GlassReveal>
            ))}
          </div>
        </div>

        {/* RWAFi Portal */}
        <div className="mb-32">
          {/* How it Works */}
          <div className="mb-16">
            <h3 className="content-block-title mb-12 text-center">
              运作原理
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: '法定资产', desc: 'USDC 或法币' },
                { step: '02', title: '认购基金', desc: '智赢 4 号合规基金' },
                { step: '03', title: '智能合约', desc: '1:1 链上映射' },
                { step: '04', title: '铸造资产', desc: '$uUAQC 链上资产' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <GlassReveal variant="muted" className="rounded-xl p-6 text-center">
                    <div
                      className="mb-3 text-4xl font-[var(--font-display)] opacity-30"
                      style={{ color: 'var(--gold-champagne)' }}
                    >
                      {item.step}
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </GlassReveal>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-[var(--gold-champagne)]/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Token Economics */}
          <GlassReveal interactive className="panel-card panel-card--featured mb-16 rounded-[var(--radius-panel)] p-8">
            <h3 className="content-block-title mb-6 text-center">双轨代币经济学</h3>
            <div className="w-full">
              <div className="flex flex-col items-center justify-between gap-8 xl:flex-row xl:gap-10">
                <div className="hidden xl:block xl:translate-x-4">
                  <div className="mb-4 ml-2 flex items-center gap-2 opacity-55">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--gold-dark)]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">收益入口</span>
                  </div>
                  <div className="w-72 overflow-hidden rounded-3xl border border-[var(--gold-dark)]/35 bg-black/35 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-[var(--gold-dark)]/15 p-2 text-[var(--gold-dark)]">
                        <TrendingUp size={20} />
                      </div>
                      <h4 className="text-xl font-bold tracking-tight text-white">$UAQ</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Core Utility</p>
                        <p className="text-lg font-semibold text-[var(--gold-dark)]">收益分配层</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Logic Attribute</p>
                        <p className="text-sm text-white/80">Passive Yield / 现金流基础</p>
                      </div>
                      <p className="text-xs leading-relaxed text-white/55">
                        持有 $UAQ 持续接入底层资产收益，构成 RWAFi 的稳定收益底盘。
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 ml-2 flex gap-3">
                    <div className="relative h-24 w-1 overflow-hidden rounded bg-white/10">
                      <motion.div
                        initial={false}
                        animate={{ height: isStaking ? '100%' : '28%' }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="absolute top-0 left-0 w-full bg-[var(--gold-dark)]/35"
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Liquidity Stream</div>
                  </div>
                </div>

                <section className="flex min-w-[300px] flex-1 flex-col items-center justify-center">
                  <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 md:text-sm">
                      Dual-Token Economic Loop
                    </p>
                  </div>

                  <div className="relative flex h-[360px] w-full flex-col items-center justify-center">
                    <motion.div
                      initial={false}
                      animate={{ y: isStaking ? -12 : 0, scale: isStaking ? 1.04 : 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="relative z-20 mb-10 flex flex-col items-center"
                    >
                      <div className="glass-surface flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--gold-champagne)]/50 bg-black/45 shadow-[0_0_30px_rgba(217,184,114,0.35)]">
                        <span className="text-2xl font-bold text-[var(--gold-champagne)]">$UAQC</span>
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[var(--gold-champagne)]/55">
                        治理权益层
                      </div>
                    </motion.div>

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <svg width="210" height="360" viewBox="0 0 210 360" className="opacity-30">
                        <motion.path
                          d="M105 44 L105 318"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          initial={false}
                          animate={{ opacity: isStaking ? 0.9 : 0.35 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.path
                          d="M40 316 Q105 180 170 316"
                          fill="none"
                          stroke="currentColor"
                          className="text-[var(--gold-dark)]"
                          initial={false}
                          animate={{ opacity: isStaking ? 0.95 : 0.45, strokeWidth: isStaking ? 2.1 : 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.path
                          d="M40 48 Q105 182 170 48"
                          fill="none"
                          stroke="currentColor"
                          className="text-[var(--gold-champagne)]"
                          initial={false}
                          animate={{ opacity: isStaking ? 0.95 : 0.45, strokeWidth: isStaking ? 2.1 : 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      </svg>
                    </div>

                    {isStaking && (
                      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                        {/* 主纵向链路泡泡 */}
                        {[0, 1, 2].map((idx) => (
                          <motion.div
                            key={`main-bubble-${idx}`}
                            className="absolute h-2.5 w-2.5 rounded-full bg-[var(--gold-champagne)]/80 shadow-[0_0_12px_rgba(217,184,114,0.8)]"
                            style={{ left: 'calc(50% - 5px)', top: '84px' }}
                            initial={{ y: 220, opacity: 0 }}
                            animate={{ y: [220, 120, 0], opacity: [0, 1, 0] }}
                            transition={{
                              duration: 1.6,
                              ease: 'linear',
                              repeat: Infinity,
                              delay: idx * 0.38,
                            }}
                          />
                        ))}

                        {/* 左弧线泡泡（UAQ -> Catalyst） */}
                        {[0, 1].map((idx) => (
                          <motion.div
                            key={`left-arc-bubble-${idx}`}
                            className="absolute h-2 w-2 rounded-full bg-[var(--gold-dark)]/90 shadow-[0_0_10px_rgba(180,151,90,0.7)]"
                            style={{ left: 'calc(50% - 65px)', top: '250px' }}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                              x: [0, 25, 48, 62],
                              y: [0, -34, -78, -114],
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              duration: 1.45,
                              ease: 'easeOut',
                              repeat: Infinity,
                              delay: idx * 0.5,
                            }}
                          />
                        ))}

                        {/* 右弧线泡泡（Catalyst -> UAQC） */}
                        {[0, 1].map((idx) => (
                          <motion.div
                            key={`right-arc-bubble-${idx}`}
                            className="absolute h-2 w-2 rounded-full bg-[var(--gold-champagne)]/90 shadow-[0_0_10px_rgba(217,184,114,0.7)]"
                            style={{ left: 'calc(50% + 56px)', top: '134px' }}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                              x: [0, -24, -48, -64],
                              y: [0, 34, 74, 112],
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              duration: 1.45,
                              ease: 'easeOut',
                              repeat: Infinity,
                              delay: 0.2 + idx * 0.5,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <motion.div
                      initial={false}
                      animate={{ scale: isStaking ? 1.14 : 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md"
                    >
                      {isStaking && (
                        <motion.div
                          className="absolute h-16 w-16 rounded-full border border-[var(--gold-champagne)]/60"
                          initial={{ scale: 0.9, opacity: 0.7 }}
                          animate={{ scale: 1.35, opacity: 0 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                      <div className="h-8 w-8 rounded-full bg-white/20 blur-md" />
                      <span className="absolute text-[10px] uppercase tracking-[0.15em] text-white/45">奖励</span>
                    </motion.div>

                    <motion.div
                      initial={false}
                      animate={{ y: isStaking ? 12 : 0, scale: isStaking ? 1.04 : 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="relative z-20 mt-10 flex flex-col items-center"
                    >
                      <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[var(--gold-dark)]/60">
                        分红权层
                      </div>
                      <div className="glass-surface flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--gold-dark)]/50 bg-black/45 shadow-[0_0_30px_rgba(180,151,90,0.3)]">
                        <span className="text-2xl font-bold text-[var(--gold-dark)]">$UAQ</span>
                      </div>
                    </motion.div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsStaking((prev) => !prev)}
                    className={`group relative mt-4 overflow-hidden rounded-full border px-10 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 ${
                      isStaking
                        ? 'border-[var(--gold-champagne)]/65 bg-[var(--gold-champagne)]/20 shadow-[0_0_26px_rgba(217,184,114,0.3)]'
                        : 'border-white/20 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isStaking ? <Pause size={16} /> : <Play size={16} />}
                      {isStaking ? '停止交互' : '质押 / 交互'}
                    </span>
                  </button>
                  <motion.p
                    initial={false}
                    animate={{ opacity: isStaking ? 1 : 0.58 }}
                    className="mt-3 text-xs tracking-[0.12em] text-white/60"
                  >
                    {isStaking ? '质押状态已激活，转化链路增强中' : '点击按钮，触发转化链路演示'}
                  </motion.p>
                </section>

                <div className="hidden xl:block xl:-translate-x-4">
                  <div className="mb-4 mr-2 flex items-center justify-end gap-2 opacity-55">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">治理出口</span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--gold-champagne)]" />
                  </div>
                  <div className="w-72 overflow-hidden rounded-3xl border border-[var(--gold-champagne)]/35 bg-black/35 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-[var(--gold-champagne)]/15 p-2 text-[var(--gold-champagne)]">
                        <ShieldCheck size={20} />
                      </div>
                      <h4 className="text-xl font-bold tracking-tight text-white">$UAQC</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Core Utility</p>
                        <p className="text-lg font-semibold text-[var(--gold-champagne)]">治理决策层</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Logic Attribute</p>
                        <p className="text-sm text-white/80">Systemic Control / 战略参与权</p>
                      </div>
                      <p className="text-xs leading-relaxed text-white/55">
                        通过质押与持续贡献获取 $UAQC，完成从收益参与到治理参与的角色跃迁。
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 mr-2 flex justify-end gap-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Governance Signal</div>
                    <div className="relative h-24 w-1 overflow-hidden rounded bg-white/10">
                      <motion.div
                        initial={false}
                        animate={{ height: isStaking ? '100%' : '28%' }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="absolute bottom-0 left-0 w-full bg-[var(--gold-champagne)]/35"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassReveal>

          {/* Power Calculator */}
          <div className="mt-16">
            <div className="mb-6 text-center">
              <h3 className="content-block-title mb-3 text-white">
                POW 算力机制
              </h3>
              <p className="mx-auto max-w-2xl font-[var(--font-body)] text-sm text-white/60">
                测算您的 40% 核心股权释放极差
              </p>
            </div>

            <PowerCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}