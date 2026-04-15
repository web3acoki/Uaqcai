import { ArrowRight, Target, Layers, Coins, TrendingUp, Zap, Lock } from 'lucide-react';
import { PowerCalculator } from '../components/PowerCalculator';
import { PageSection, SectionHeader, SurfaceCard, SurfacePanel } from '../components/site/PageLayout';
import { deckNarrative } from '../../content/deckPublicContent';

export function RWAFi() {
  return (
    <div className="page-shell">
      <PageSection>
        {/* DeFi Products */}
        <div className="mb-32">
          <SectionHeader
            align="center"
            title="DeFi 流量引擎"
            subtitle="非标策略矩阵，放大增长上限"
            description="以敏捷迭代为核心，聚焦链上 C 端用户增长与资产效率提升"
          />

          <div className="mt-12 grid gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
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
              <SurfaceCard
                key={i}
                className="group relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-500 hover:scale-105 hover:border-[var(--gold-champagne)]/50"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--gold-champagne)]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-black/50 rounded-lg" style={{ color: `var(--${product.color})` }}>
                      {product.icon}
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-[var(--font-body)] rounded-full"
                      style={{
                        backgroundColor: `var(--${product.color})20`,
                        color: `var(--${product.color})`,
                        border: `1px solid var(--${product.color})40`,
                      }}
                    >
                      {product.tag}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold mb-1 text-white">
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
              </SurfaceCard>
            ))}
          </div>
        </div>

        <SurfacePanel className="mb-16 bg-gradient-to-br from-[var(--gold-champagne)]/6 to-black/25">
          <h3 className="text-2xl font-[var(--font-display)] text-[var(--gold-champagne)]">增长飞轮（公开版）</h3>
          <p className="mt-2 text-sm text-white/66">
            通过流量、资产与治理三层协同构建长期增长循环，以下为机制解释，不构成收益承诺。
          </p>
          <div className="mt-7 grid gap-[var(--grid-gap)] md:grid-cols-3">
            {deckNarrative.rwafiFlywheel.map((item) => (
              <SurfaceCard key={item.title} className="bg-black/32">
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/66">{item.desc}</p>
              </SurfaceCard>
            ))}
          </div>
        </SurfacePanel>

        {/* RWAFi Portal */}
        <div className="mb-32">
          <SectionHeader align="center" title="RWAFi 门户" subtitle="连接传统资产与 Web3 股权的桥梁" />

          {/* How it Works */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-12 text-center text-white">
              运作原理
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: '法定资产', desc: 'USDC 或法币' },
                { step: '02', title: '认购基金', desc: '智赢 4 号合规基金' },
                { step: '03', title: '智能合约', desc: '1:1 链上映射' },
                { step: '04', title: '铸造资产', desc: '$UAQC 链上资产' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <SurfaceCard className="bg-gradient-to-br from-white/5 to-transparent text-center">
                    <div
                      className="text-4xl font-[var(--font-display)] mb-3 opacity-30"
                      style={{ color: 'var(--gold-champagne)' }}
                    >
                      {item.step}
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </SurfaceCard>
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
          <SurfacePanel className="mb-16 bg-gradient-to-br from-[var(--gold-champagne)]/5 to-transparent p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              双轨代币经济学
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <SurfaceCard className="bg-black/30 border-[var(--gold-light)]/30">
                <div className="text-3xl mb-3" style={{ color: 'var(--gold-light)' }}>$UAQ</div>
                <p className="text-white/70 font-[var(--font-body)] text-sm">
                  底层资产分红权代币 · 持有即享受基金收益分配
                </p>
              </SurfaceCard>
              <SurfaceCard className="bg-black/30 border-[var(--gold-champagne)]/30">
                <div className="text-3xl mb-3" style={{ color: 'var(--gold-champagne)' }}>$UAQC</div>
                <p className="text-white/70 font-[var(--font-body)] text-sm">
                  顶层股权与治理代币 · 通过质押 $UAQ 获取，实现从理财客到股东的跨越
                </p>
              </SurfaceCard>
            </div>
          </SurfacePanel>

          <SurfacePanel className="mb-16">
            <h3 className="text-2xl font-[var(--font-display)] text-[var(--gold-champagne)]">Token Utility（公开口径）</h3>
            <div className="mt-5 grid gap-[var(--grid-gap)] md:grid-cols-3">
              {deckNarrative.tokenUtilityPublic.map((item) => (
                <SurfaceCard key={item} className="bg-black/30">
                  <p className="text-sm leading-relaxed text-white/68">{item}</p>
                </SurfaceCard>
              ))}
            </div>
          </SurfacePanel>

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
            <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-white/48">
              该测算仅用于机制演示，不构成对未来收益、价格或流动性的任何承诺。请结合风险偏好与适用法域要求审慎评估。
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
}