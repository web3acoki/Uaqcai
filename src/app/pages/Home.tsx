import { useNavigate } from 'react-router';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { ImpossibleTriangle } from '../components/ImpossibleTriangle';
import { PageSection, SectionHeader, SurfaceCard, SurfacePanel } from '../components/site/PageLayout';
import { deckNarrative } from '../../content/deckPublicContent';
import { HeroBalanceScene } from '../components/HeroBalanceScene';

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative -mt-8 flex min-h-[calc(100vh-128px)] items-center justify-center overflow-hidden py-10"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--deep-black)] via-[#0a0a0a] to-[var(--deep-black)]" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(var(--gold-champagne) 1px, transparent 1px),
                                linear-gradient(90deg, var(--gold-champagne) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Content */}
        <div className="page-container-wide relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          
          {/* Left Column: 3D Balance Scene */}
          <div className="order-2 flex w-full flex-col items-center justify-center animate-fade-in-up lg:order-1">
            <div className="group relative w-full max-w-[560px] aspect-square overflow-hidden rounded-[40px] border border-[var(--gold-champagne)]/20 shadow-[0_0_60px_rgba(235,213,169,0.08)] transition-all duration-700 hover:border-[var(--gold-champagne)]/40 hover:shadow-[0_0_90px_rgba(235,213,169,0.18)]">
              <HeroBalanceScene />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />

              <div className="absolute inset-0 z-20 grid grid-cols-[1fr_auto] p-6 md:p-8">
                <div className="flex items-end">
                  <button
                    onClick={() => navigate('/fund')}
                    className="pointer-events-auto group/btn relative w-[170px] h-[170px] rounded-full border border-[var(--gold-dark)]/50 bg-black/45 backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:border-[var(--gold-dark)] hover:bg-black/55"
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(155,126,42,0.35),transparent_70%)]" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold-dark)]/60 bg-black/40 text-[var(--gold-dark)]">
                        <Zap className="h-6 w-6" />
                      </div>
                      <span className="text-[14px] font-medium tracking-widest text-white">探索基金产品</span>
                    </div>
                  </button>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <button
                    onClick={() => navigate('/rwafi')}
                    className="pointer-events-auto group/btn relative h-[110px] w-[180px] rounded-[22px] border border-[var(--gold-champagne)]/45 bg-black/45 backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:border-[var(--gold-champagne)]/70"
                  >
                    <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_30%_25%,rgba(212,175,55,0.3),transparent_72%)]" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold-champagne)]/45 bg-black/35 text-[var(--gold-champagne)]">
                        <Shield className="h-5 w-5" />
                      </div>
                      <span className="text-[13px] font-medium tracking-wide text-white">了解 RWAFi</span>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/rwafi')}
                    className="pointer-events-auto group/btn relative h-[110px] w-[180px] rounded-[22px] border border-[var(--gold-light)]/45 bg-black/45 backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:border-[var(--gold-light)]/70"
                  >
                    <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_30%_25%,rgba(240,217,140,0.26),transparent_72%)]" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold-light)]/45 bg-black/35 text-[var(--gold-light)]">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <span className="text-[13px] font-medium tracking-wide text-white">智赢先知预测</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Vision Statement (Below Balance Board) */}
            <SurfacePanel className="relative z-10 mt-10 w-full max-w-[460px] text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-champagne)]/50 to-transparent mb-6" />
              <p className="text-[14px] leading-relaxed font-[var(--font-body)] text-white/70 relative pt-5">
                <span className="absolute -left-2 top-0 text-[var(--gold-champagne)] opacity-30 text-4xl font-[var(--font-heading)] leading-none">"</span>
                <span className="text-[var(--gold-champagne)] font-semibold block mb-3 tracking-[0.2em] uppercase text-xs">愿景赋能</span>
                通过 UAQC 最佳实践，以金融科技赋能现实世界资产，共建开放的 <span className="text-white font-medium">RWAFi</span> 产业生态
                <span className="absolute -right-2 bottom-0 text-[var(--gold-champagne)] opacity-30 text-4xl font-[var(--font-heading)] leading-none rotate-180">"</span>
              </p>
            </SurfacePanel>

          </div>

          {/* Right Column: Title & Subtitle */}
          <SurfacePanel className="order-1 w-full animate-fade-in-up lg:order-2" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold-champagne)]/20 bg-gradient-to-r from-[var(--gold-champagne)]/10 to-transparent text-[var(--gold-champagne)] text-[13px] tracking-widest font-[var(--font-body)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-champagne)] animate-pulse" />
              WEB3 资管引擎枢纽
            </div>

            <h1
              className="font-[var(--font-display)] mb-6 leading-[1.1] tracking-wide"
              style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                color: 'var(--gold-champagne)',
              }}
            >
              全球领先的<br />
              <span className="text-white">合规去中心化</span><br />
              AI 资管引擎
            </h1>

            <div className="w-24 h-[2px] bg-gradient-to-r from-[var(--gold-champagne)] to-transparent mb-6 opacity-50" />

            <h2 className="text-xl md:text-2xl mb-10 text-white/80 font-light tracking-wide">
              重塑资本主权，定义 Web3 资管枢纽
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-[var(--font-body)] text-[13px] tracking-widest text-white/40">
              <span className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[var(--gold-light)] shadow-[0_0_8px_var(--gold-light)]" />
                AI 驱动 ALPHA
              </span>
              <span className="hidden sm:block text-white/20">|</span>
              <span className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[var(--gold-champagne)] shadow-[0_0_8px_var(--gold-champagne)]" />
                WEB3 飞轮价值
              </span>
            </div>
          </div>
          </SurfacePanel>
          
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm">
            <div className="w-1 h-1.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      <PageSection className="py-10">
        <SectionHeader
          kicker={deckNarrative.marketWindow.title}
          title="资产合法化之后，收益基础设施正在重构"
          description="市场从“资产上链”进入“收益验证”阶段，合规、透明与资产效率将成为下一阶段竞争核心。"
        />
        <div className="grid gap-[var(--grid-gap)] md:grid-cols-3">
          {deckNarrative.marketWindow.points.map((point) => (
            <SurfaceCard key={point} className="h-full bg-black/35">
              <p className="text-sm leading-relaxed text-white/72">{point}</p>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      <PageSection className="py-8">
        <SectionHeader
          title="Proof Snapshot"
          subtitle="公开口径关键指标"
          description="用于帮助机构与合作方快速理解平台结构与能力边界，不作为收益承诺。"
          align="center"
        />
        <div className="grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-4">
          {deckNarrative.proofSnapshot.map((item) => (
            <SurfaceCard key={item.label} className="text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">{item.label}</p>
              <p className="mt-3 text-3xl font-[var(--font-display)] text-[var(--gold-champagne)]">{item.value}</p>
              <p className="mt-2 text-xs text-white/56">{item.note}</p>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      <PageSection className="py-8">
        <SectionHeader
          title="Who We Serve"
          subtitle="不同角色，不同路径"
          description="在统一基础设施之上，提供面向机构、渠道与链上用户的差异化协作方式。"
        />
        <div className="grid gap-[var(--grid-gap)] md:grid-cols-3">
          {deckNarrative.whoWeServe.map((role) => (
            <SurfaceCard key={role.title} className="flex h-full flex-col justify-between bg-black/30">
              <div>
                <h4 className="text-xl font-semibold text-white">{role.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-white/66">{role.desc}</p>
              </div>
              <button className="mt-6 inline-flex w-fit items-center rounded-lg border border-[var(--layout-border-strong)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--gold-light)] transition-colors hover:bg-black/40">
                {role.cta}
              </button>
            </SurfaceCard>
          ))}
        </div>
      </PageSection>

      {/* Moat Section */}
      <PageSection className="bg-gradient-to-b from-[var(--deep-black)] to-[var(--space-gray)]">
        <SectionHeader align="center" title='突破"不可能三角"' className="mb-10" />

          {/* 3D Impossible Triangle */}
          <ImpossibleTriangle />

          {/* Moat Cards */}
          <div className="mt-10 grid gap-[var(--grid-gap)] md:grid-cols-3">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: '通信级架构',
                desc: '来自华为、中兴骨干，保障毫秒级低延迟',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: '百亿量化血统',
                desc: '源自幻方量化等头部私募的算法专家',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: '跨周期商业大脑',
                desc: '10+ 年经验及 IPO 操盘背景的合规领袖',
              },
            ].map((card, i) => (
              <SurfaceCard
                key={i}
                className="group bg-gradient-to-br from-black/60 to-[var(--muted-gray)]/40 p-8 transition-all duration-500 hover:scale-105 hover:border-[var(--gold-champagne)]/50"
              >
                <div className="mb-4 text-[var(--gold-champagne)] group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">
                  {card.title}
                </h4>
                <p className="text-white/60 font-[var(--font-body)] text-sm leading-relaxed">
                  {card.desc}
                </p>
              </SurfaceCard>
            ))}
          </div>
      </PageSection>
    </>
  );
}