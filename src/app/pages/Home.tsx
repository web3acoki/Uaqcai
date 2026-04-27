import { motion, useReducedMotion } from 'motion/react';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { ImpossibleTriangle } from '../components/ImpossibleTriangle';
import { GlassReveal } from '../components/site/GlassReveal';
import { RwafiHudHero } from '../components/RwafiHudHero';
import { ComplianceMarquee } from '../components/ComplianceMarquee';
import { useT } from '@/i18n/locale';
import tgChannelQr from '@/public/tg-channel.png';
import tgCommunityQr from '@/public/tg-community-.png';
import xQr from '@/public/x.png';

export function Home() {
  const t = useT();
  const reducedMotion = useReducedMotion();

  const community = {
    website: 'https://www.uaqc.net',
    x: 'https://x.com/UAQCAI',
    youtube: 'https://youtube.com/@UAQC',
    telegramCommunity: 'https://t.me/',
    telegramChannel: 'https://t.me/',
  };

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
        {/* Full-bleed halo atmosphere for first screen (no rectangular edges). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 left-1/2 w-screen -translate-x-1/2"
        >
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                'radial-gradient(circle at 50% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 78%)',
              WebkitMaskImage:
                'radial-gradient(circle at 50% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 78%)',
            }}
          >
            <div
              className="absolute left-1/2 top-[-38%] h-[1100px] w-[1100px] -translate-x-1/2 rounded-full blur-[170px]"
              style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 62%)' }}
            />
            <div
              className="absolute right-[-22%] top-[-30%] h-[980px] w-[980px] rounded-full blur-[190px]"
              style={{ background: 'radial-gradient(circle, rgba(168,176,196,0.14) 0%, transparent 60%)' }}
            />
            <div
              className="absolute bottom-[-42%] left-[-24%] h-[980px] w-[980px] rounded-full blur-[200px]"
              style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 64%)' }}
            />
          </div>
          <div
            className="absolute inset-0 opacity-[0.55]"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.035) 0%, transparent 55%), linear-gradient(180deg, rgba(5,6,12,0.04) 0%, rgba(5,6,12,0.42) 100%)',
            }}
          />
        </div>
        <div className="page-container">
          <div
            className="hero-shell hero-shell--bare hero-shell--no-clip min-h-[var(--hero-min-h-mobile)] px-5 py-[var(--hero-block-pad-y-mobile)] md:min-h-[var(--hero-min-h-desktop)] md:px-10 md:py-[var(--hero-block-pad-y-desktop)]"
          >
            <div className="grid items-center gap-12 md:gap-14 lg:gap-[var(--hero-grid-gap-desktop)] lg:grid-cols-[1.04fr_0.96fr]">
              <motion.div {...reveal(0.04)}>
                <motion.h1
                  className="mb-7 font-[var(--font-body)] font-bold leading-[1.02] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(2.9rem,4.7vw,4.6rem)' }}
                  {...reveal(0.16)}
                >
                  <span className="block bg-gradient-to-r from-white to-[#48586f] bg-clip-text text-transparent">
                    {t('home.h1a')}
                  </span>
                  <span className="block bg-gradient-to-r from-white to-[#48586f] bg-clip-text text-transparent">
                    {t('home.h1b')}
                  </span>
                  <span className="block text-[var(--gold-light)]/92">{t('home.h1c')}</span>
                </motion.h1>
                <motion.div className="gold-divider mb-8 max-w-[220px]" {...reveal(0.22)} />
                <motion.h2 className="section-subheading mb-10 max-w-[560px]" {...reveal(0.28)}>
                  {t('home.subtitle')}
                </motion.h2>
                <motion.div
                  className="mb-8 grid max-w-[560px] gap-3 text-[12px] tracking-[0.12em] text-white/56 sm:mb-10 sm:grid-cols-2 sm:text-[13px] sm:tracking-[0.14em]"
                  {...reveal(0.34)}
                >
                  <span className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.01] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/65" />
                    {t('home.badge1')}
                  </span>
                  <span className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.01] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-light)]/70" />
                    {t('home.badge2')}
                  </span>
                </motion.div>
                <motion.div className="max-w-[560px] border-l border-white/16 pl-5" {...reveal(0.4)}>
                  <p className="relative text-[14px] leading-relaxed text-white/70">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/56">{t('home.visionLabel')}</span>
                    {t('home.visionBody')}
                  </p>
                </motion.div>
              </motion.div>
              <motion.div className="flex flex-col items-center gap-14 md:gap-16" {...reveal(0.22)}>
                <RwafiHudHero />
              </motion.div>
            </div>
          </div>
        </div>
        <ComplianceMarquee />
      </section>

      <section className="section-shell bg-gradient-to-b from-transparent via-[rgba(10,11,16,0.72)] to-[rgba(14,15,22,0.94)]">
        <div className="page-container">
          <motion.h3 className="section-heading mb-5 text-center text-white/92" {...reveal(0.08)}>
            {t('home.triangleTitle')}
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

          <div className="panel-grid--lux">
            <GlassReveal
              interactive
              revealDelay={0.24}
              className="panel-card panel-card--featured group rounded-[var(--radius-card)] p-8 md:p-9"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--gold-light)]/30 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--gold-light)]/88">
                <Shield className="h-3.5 w-3.5" />
                Core Thesis
              </div>
              <h4 className="mb-3 text-2xl font-semibold text-white">{t('home.card1Title')}</h4>
              <p className="max-w-2xl text-sm leading-relaxed text-white/68">{t('home.card1Desc')}</p>
            </GlassReveal>

            <div className="grid gap-3">
              {[
                {
                  icon: <TrendingUp className="h-4.5 w-4.5" />,
                  title: t('home.card2Title'),
                  desc: t('home.card2Desc'),
                },
                {
                  icon: <Zap className="h-4.5 w-4.5" />,
                  title: t('home.card3Title'),
                  desc: t('home.card3Desc'),
                },
              ].map((card, i) => (
                <GlassReveal
                  key={card.title}
                  interactive
                  revealDelay={0.3 + i * 0.08}
                  className="panel-card group rounded-[var(--radius-card)] p-6 md:p-7"
                >
                  <div className="mb-3 inline-flex items-center justify-center text-white/72 transition-colors duration-300 group-hover:text-[var(--gold-light)]/85">
                    {card.icon}
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-white">{card.title}</h4>
                  <p className="text-sm leading-relaxed text-white/60">{card.desc}</p>
                </GlassReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}