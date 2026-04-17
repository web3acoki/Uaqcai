import { ArrowRight, Target, Layers, Coins, TrendingUp, Zap, Lock, ShieldCheck, Play, Pause } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { PowerCalculator } from '../components/PowerCalculator';
import { GlassReveal } from '../components/site/GlassReveal';
import { useT } from '@/i18n/locale';

export function RWAFi() {
  const t = useT();
  const location = useLocation();
  const [isStaking, setIsStaking] = useState(false);

  const rwProducts = useMemo(
    () => [
      {
        key: 'p0',
        anchorId: undefined as string | undefined,
        title: t('rwafi.p0.title'),
        subtitle: t('rwafi.p0.sub'),
        position: t('rwafi.p0.position'),
        desc: t('rwafi.p0.desc'),
        tag: t('rwafi.p0.tag'),
        icon: <Target className="w-6 h-6" />,
        color: 'gold-light',
      },
      {
        key: 'p1',
        anchorId: 'product-4',
        title: t('rwafi.p1.title'),
        subtitle: undefined as string | undefined,
        position: t('rwafi.p1.position'),
        desc: t('rwafi.p1.desc'),
        tag: t('rwafi.p1.tag'),
        icon: <Layers className="w-6 h-6" />,
        color: 'gold-champagne',
      },
      {
        key: 'p2',
        anchorId: undefined as string | undefined,
        title: t('rwafi.p2.title'),
        subtitle: undefined as string | undefined,
        position: t('rwafi.p2.position'),
        desc: t('rwafi.p2.desc'),
        tag: t('rwafi.p2.tag'),
        icon: <Coins className="w-6 h-6" />,
        color: 'gold-dark',
      },
      {
        key: 'p3',
        anchorId: undefined as string | undefined,
        title: t('rwafi.p3.title'),
        subtitle: undefined as string | undefined,
        position: t('rwafi.p3.position'),
        desc: t('rwafi.p3.desc'),
        tag: t('rwafi.p3.tag'),
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'gold-light',
      },
      {
        key: 'p4',
        anchorId: undefined as string | undefined,
        title: t('rwafi.p4.title'),
        subtitle: undefined as string | undefined,
        position: t('rwafi.p4.position'),
        desc: t('rwafi.p4.desc'),
        tag: t('rwafi.p4.tag'),
        icon: <Zap className="w-6 h-6" />,
        color: 'gold-champagne',
      },
      {
        key: 'p5',
        anchorId: undefined as string | undefined,
        title: t('rwafi.p5.title'),
        subtitle: undefined as string | undefined,
        position: t('rwafi.p5.position'),
        desc: t('rwafi.p5.desc'),
        tag: t('rwafi.p5.tag'),
        icon: <Lock className="w-6 h-6" />,
        color: 'gold-dark',
      },
    ],
    [t],
  );

  const howSteps = useMemo(
    () => [
      { step: '01', title: t('rwafi.s0.title'), desc: t('rwafi.s0.desc') },
      { step: '02', title: t('rwafi.s1.title'), desc: t('rwafi.s1.desc') },
      { step: '03', title: t('rwafi.s2.title'), desc: t('rwafi.s2.desc') },
      { step: '04', title: t('rwafi.s3.title'), desc: t('rwafi.s3.desc') },
    ],
    [t],
  );

  useEffect(() => {
    if (location.hash !== '#product-4') return;
    const el = document.getElementById('product-4');
    if (!el) return;
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [location.hash]);

  return (
    <section className="section-shell min-h-screen bg-transparent !pt-[max(2rem,calc(var(--section-space)-1.5rem))] !pb-[var(--section-space)]">
      <div className="page-container">
        {/* DeFi Products */}
        <div className="mb-24 md:mb-28">
          <div className="mb-2 text-center md:mb-3">
            <h3 className="section-heading mb-3">
              {t('rwafi.title')}
            </h3>
            <p className="font-[var(--font-body)] text-lg text-white/60 mb-2">
              {t('rwafi.subtitle')}
            </p>
          </div>

          <div className="panel-grid mt-8 md:grid-cols-2 lg:grid-cols-3 md:mt-10">
            {rwProducts.map((product) => (
              <GlassReveal
                key={product.key}
                interactive
                id={product.anchorId}
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
              {t('rwafi.howTitle')}
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              {howSteps.map((item, i) => (
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
            <h3 className="content-block-title mb-6 text-center">{t('rwafi.tokenEco')}</h3>
            <div className="w-full">
              <div className="flex flex-col items-center justify-between gap-8 xl:flex-row xl:gap-10">
                <div className="hidden xl:block xl:translate-x-4">
                  <div className="mb-4 ml-2 flex items-center gap-2 opacity-55">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--gold-dark)]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{t('rwafi.yieldEntry')}</span>
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
                        <p className="text-lg font-semibold text-[var(--gold-dark)]">{t('rwafi.yieldLayer')}</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Logic Attribute</p>
                        <p className="text-sm text-white/80">{t('rwafi.passiveLine')}</p>
                      </div>
                      <p className="text-xs leading-relaxed text-white/55">
                        {t('rwafi.uaqBody')}
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
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">{t('rwafi.liquidityStream')}</div>
                  </div>
                </div>

                <section className="flex min-w-[300px] flex-1 flex-col items-center justify-center">
                  <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 md:text-sm">
                      {t('rwafi.dualLoop')}
                    </p>
                  </div>

                  <div className="relative flex h-[360px] w-full flex-col items-center justify-center">
                    <motion.div
                      initial={false}
                      animate={{ y: isStaking ? -12 : 0, scale: isStaking ? 1.04 : 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="relative z-20 mb-10 flex flex-col items-center"
                    >
                      <div className="glass-surface flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--gold-champagne)]/50 bg-black/45 shadow-[0_0_30px_rgba(245,166,35,0.38)]">
                        <span className="text-2xl font-bold text-[var(--gold-champagne)]">$UAQC</span>
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[var(--gold-champagne)]/55">
                        {t('rwafi.govLayer')}
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
                            className="absolute h-2.5 w-2.5 rounded-full bg-[var(--gold-champagne)]/80 shadow-[0_0_12px_rgba(245,166,35,0.85)]"
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
                            className="absolute h-2 w-2 rounded-full bg-[var(--gold-dark)]/90 shadow-[0_0_10px_rgba(194,120,10,0.72)]"
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
                            className="absolute h-2 w-2 rounded-full bg-[var(--gold-champagne)]/90 shadow-[0_0_10px_rgba(245,166,35,0.72)]"
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
                      <span className="absolute text-[10px] uppercase tracking-[0.15em] text-white/45">{t('rwafi.reward')}</span>
                    </motion.div>

                    <motion.div
                      initial={false}
                      animate={{ y: isStaking ? 12 : 0, scale: isStaking ? 1.04 : 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="relative z-20 mt-10 flex flex-col items-center"
                    >
                      <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[var(--gold-dark)]/60">
                        {t('rwafi.dividendLayer')}
                      </div>
                      <div className="glass-surface flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--gold-dark)]/50 bg-black/45 shadow-[0_0_30px_rgba(194,120,10,0.32)]">
                        <span className="text-2xl font-bold text-[var(--gold-dark)]">$UAQ</span>
                      </div>
                    </motion.div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsStaking((prev) => !prev)}
                    className={`group relative mt-4 overflow-hidden rounded-full border px-10 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 ${
                      isStaking
                        ? 'border-[var(--gold-champagne)]/65 bg-[var(--gold-champagne)]/20 shadow-[0_0_26px_rgba(245,166,35,0.32)]'
                        : 'border-white/20 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isStaking ? <Pause size={16} /> : <Play size={16} />}
                      {isStaking ? t('rwafi.stakePause') : t('rwafi.stakePlay')}
                    </span>
                  </button>
                  <motion.p
                    initial={false}
                    animate={{ opacity: isStaking ? 1 : 0.58 }}
                    className="mt-3 text-xs tracking-[0.12em] text-white/60"
                  >
                    {isStaking ? t('rwafi.stakeOn') : t('rwafi.stakeOff')}
                  </motion.p>
                </section>

                <div className="hidden xl:block xl:-translate-x-4">
                  <div className="mb-4 mr-2 flex items-center justify-end gap-2 opacity-55">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{t('rwafi.govExit')}</span>
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
                        <p className="text-lg font-semibold text-[var(--gold-champagne)]">{t('rwafi.govLayer2')}</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Logic Attribute</p>
                        <p className="text-sm text-white/80">{t('rwafi.govLine')}</p>
                      </div>
                      <p className="text-xs leading-relaxed text-white/55">
                        {t('rwafi.govBody')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 mr-2 flex justify-end gap-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">{t('rwafi.govSignal')}</div>
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
                {t('rwafi.powTitle')}
              </h3>
              <p className="mx-auto max-w-2xl font-[var(--font-body)] text-sm text-white/60">
                {t('rwafi.powSub')}
              </p>
            </div>

            <PowerCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}