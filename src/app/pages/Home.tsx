import { motion, useReducedMotion } from 'motion/react';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { ImpossibleTriangle } from '../components/ImpossibleTriangle';
import { GlassReveal } from '../components/site/GlassReveal';
import { ZenithBalanceHero } from '../components/ZenithBalanceHero';

export function Home() {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12% 0px' },
          transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <>
      <section
        id="home"
        className="section-shell relative -mt-4 px-2 pt-4 md:-mt-6 md:pt-6"
        style={{ paddingBottom: 'var(--hero-to-next-gap)' }}
      >
        <div className="page-container">
          <div
            className="hero-shell hero-shell--bare min-h-[var(--hero-min-h-mobile)] px-5 py-[var(--hero-block-pad-y-mobile)] md:min-h-[var(--hero-min-h-desktop)] md:px-10 md:py-[var(--hero-block-pad-y-desktop)]"
          >
            <div className="grid items-center gap-12 md:gap-14 lg:gap-[var(--hero-grid-gap-desktop)] lg:grid-cols-[1.04fr_0.96fr]">
              <motion.div {...reveal(0.04)}>
                <motion.span className="brand-kicker mb-6 md:mb-8" {...reveal(0.1)}>
                  <span className="brand-dot" />
                  WEB3 资管引擎枢纽
                </motion.span>
                <motion.h1
                  className="mb-7 font-[var(--font-body)] font-semibold leading-[1.04] tracking-[0.01em] text-white"
                  style={{ fontSize: 'clamp(2.9rem,4.7vw,4.6rem)' }}
                  {...reveal(0.16)}
                >
                  全球领先的
                  <br />
                  <span className="text-white/78">合规去中心化</span>
                  <br />
                  <span className="text-[var(--gold-light)]/92">AI 资管引擎</span>
                </motion.h1>
                <motion.div className="gold-divider mb-8 max-w-[220px]" {...reveal(0.22)} />
                <motion.h2 className="section-subheading mb-10 max-w-[560px]" {...reveal(0.28)}>
                  重塑资本主权，定义 Web3 资管枢纽
                </motion.h2>
                <motion.div
                  className="mb-8 grid max-w-[560px] gap-3 text-[12px] tracking-[0.12em] text-white/56 sm:mb-10 sm:grid-cols-2 sm:text-[13px] sm:tracking-[0.14em]"
                  {...reveal(0.34)}
                >
                  <span className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.01] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/65" />
                    AI 驱动 ALPHA
                  </span>
                  <span className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.01] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-light)]/70" />
                    WEB3 飞轮价值
                  </span>
                </motion.div>
                <motion.div className="max-w-[560px] border-l border-white/16 pl-5" {...reveal(0.4)}>
                  <p className="relative text-[14px] leading-relaxed text-white/70">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/56">生态远景</span>
                    通过 UAQC 最佳实践，以金融科技赋能现实世界资产，共建开放的 <span className="font-medium text-white">RWAFi</span> 产业生态
                  </p>
                </motion.div>
              </motion.div>
              <motion.div className="flex flex-col items-center gap-14 md:gap-16" {...reveal(0.22)}>
                <ZenithBalanceHero />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-gradient-to-b from-transparent via-[rgba(10,11,16,0.72)] to-[rgba(14,15,22,0.94)]">
        <div className="page-container">
          <motion.h3 className="section-heading mb-5 text-center text-white/92" {...reveal(0.08)}>
            突破"不可能三角"
          </motion.h3>
          <motion.p
            className="mx-auto mb-12 max-w-2xl text-center text-sm tracking-[0.08em] text-white/48"
            {...reveal(0.16)}
          >
            TRIANGLE BALANCE ENGINE
          </motion.p>

          <motion.div {...reveal(0.24)}>
            <ImpossibleTriangle />
          </motion.div>

          <div className="panel-grid md:grid-cols-3">
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
                revealDelay={0.2 + i * 0.1}
                className="panel-card group rounded-[var(--radius-card)] p-8 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="mb-4 inline-flex items-center justify-center text-[var(--taiji-gold-soft)] transition-transform duration-300 ease-out transform-gpu origin-center group-hover:scale-110">
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