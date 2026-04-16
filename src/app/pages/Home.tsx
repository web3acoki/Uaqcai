import { Shield, TrendingUp, Zap } from 'lucide-react';
import { ImpossibleTriangle } from '../components/ImpossibleTriangle';
import { GlassReveal } from '../components/site/GlassReveal';
import { ZenithBalanceHero } from '../components/ZenithBalanceHero';

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative -mt-8 flex min-h-[calc(100vh-128px)] items-center justify-center overflow-hidden px-2"
      >
        {/* Atmospheric Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[var(--atmosphere-base)]" />
          <div className="absolute inset-0 bg-[var(--atmosphere-mist)] opacity-80" />
          <div className="absolute -left-[20%] top-[-16%] h-[72vh] w-[72vw] rounded-full bg-[radial-gradient(circle,_rgba(240,217,140,0.2)_0%,_rgba(240,217,140,0)_72%)] blur-3xl" />
          <div className="absolute -right-[12%] top-[30%] h-[58vh] w-[58vw] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.16)_0%,_rgba(212,175,55,0)_70%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'var(--atmosphere-grid)',
              backgroundSize: '72px 72px',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,9,0.05)_0%,rgba(5,5,9,0.38)_56%,rgba(5,5,9,0.68)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,var(--layout-page-max))] flex-col-reverse items-center justify-between gap-16 px-[var(--layout-page-gutter)] lg:flex-row lg:gap-24">
          
          {/* Left Column: Digital Yin-Yang Balance Board */}
          <div className="flex w-full flex-col items-center justify-center animate-fade-in-up lg:w-1/2">
            
            <ZenithBalanceHero />

            {/* Vision Statement (Below Balance Board) */}
            <div className="relative z-10 mt-16 max-w-[440px] px-6 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-champagne)]/50 to-transparent mb-6" />
              <p className="text-[14px] leading-relaxed font-[var(--font-body)] text-white/70 relative pt-5">
                <span className="absolute -left-2 top-0 text-[var(--gold-champagne)] opacity-30 text-4xl font-[var(--font-heading)] leading-none">"</span>
                <span className="text-[var(--gold-champagne)] font-semibold block mb-3 tracking-[0.2em] uppercase text-xs">愿景赋能</span>
                通过 UAQC 最佳实践，以金融科技赋能现实世界资产，共建开放的 <span className="text-white font-medium">RWAFi</span> 产业生态
                <span className="absolute -right-2 bottom-0 text-[var(--gold-champagne)] opacity-30 text-4xl font-[var(--font-heading)] leading-none rotate-180">"</span>
              </p>
            </div>

          </div>

          {/* Right Column: Title & Subtitle */}
          <div className="flex w-full flex-col items-start text-left animate-fade-in-up lg:w-1/2" style={{ animationDelay: '0.2s' }}>
            <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-[var(--gold-champagne)]/30 bg-gradient-to-r from-[var(--gold-champagne)]/14 to-transparent px-4 py-1.5 text-[13px] tracking-[0.22em] text-[var(--gold-champagne)]">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-champagne)] animate-pulse" />
              WEB3 资管引擎枢纽
            </div>

            <h1
              className="mb-7 font-[var(--font-display)] leading-[1.08] tracking-[0.02em]"
              style={{
                fontSize: 'clamp(3.1rem, 5vw, 4.8rem)',
                color: 'var(--gold-champagne)',
              }}
            >
              全球领先的<br />
              <span className="text-white">合规去中心化</span><br />
              AI 资管引擎
            </h1>

            <div className="mb-7 h-[2px] w-28 bg-gradient-to-r from-[var(--gold-champagne)]/90 to-transparent opacity-50" />

            <h2 className="mb-12 max-w-[580px] text-xl font-light tracking-[0.02em] text-white/84 md:text-2xl">
              重塑资本主权，定义 Web3 资管枢纽
            </h2>

            <div className="flex flex-col items-start gap-6 text-[13px] tracking-[0.18em] text-white/46 sm:flex-row sm:items-center">
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
          
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm">
            <div className="w-1 h-1.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Moat Section */}
      <section className="bg-gradient-to-b from-transparent via-[rgba(10,10,15,0.7)] to-[rgba(16,16,24,0.9)] py-24">
        <div className="page-container">
          <h3
            className="text-center font-[var(--font-display)] text-4xl mb-12"
            style={{ color: 'var(--gold-champagne)' }}
          >
            突破"不可能三角"
          </h3>

          {/* 3D Impossible Triangle */}
          <ImpossibleTriangle />

          {/* Moat Cards */}
          <div className="grid md:grid-cols-3 gap-8">
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
              <GlassReveal
                key={i}
                interactive
                className="group rounded-xl p-8 transition-all duration-500 hover:scale-105"
              >
                <div className="mb-4 text-[var(--gold-champagne)] transition-transform group-hover:scale-110">
                  {card.icon}
                </div>
                <h4 className="mb-3 text-xl font-semibold text-white">{card.title}</h4>
                <p className="text-sm leading-relaxed text-white/60">{card.desc}</p>
              </GlassReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}