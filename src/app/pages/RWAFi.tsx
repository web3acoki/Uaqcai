import { ArrowRight, Target, Layers, Coins, TrendingUp, Zap, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { PowerCalculator } from '../components/PowerCalculator';
import { GlassReveal } from '../components/site/GlassReveal';

export function RWAFi() {
  const location = useLocation();

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
            <h3 className="content-block-title mb-6">双轨代币经济学</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--gold-light)]/28 bg-black/25 p-6">
                <div className="mb-3 text-3xl" style={{ color: 'var(--gold-light)' }}>
                  $UAQ
                </div>
                <p className="text-sm text-white/70">底层资产分红权代币 · 持有即享受基金收益分配</p>
              </div>
              <div className="rounded-xl border border-[var(--gold-champagne)]/28 bg-black/25 p-6">
                <div className="mb-3 text-3xl" style={{ color: 'var(--gold-champagne)' }}>
                  $UAQC
                </div>
                <p className="text-sm text-white/70">顶层股权与治理代币 · 通过质押 $UAQ 获取，实现从理财客到股东的跨越</p>
              </div>
            </div>
          </GlassReveal>

          {/* Power Calculator */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-[var(--font-display)] mb-4" style={{ color: 'var(--gold-champagne)' }}>
                POW 算力机制
              </h3>
              <p className="text-white/60 font-[var(--font-body)] max-w-2xl mx-auto">
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