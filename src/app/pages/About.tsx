import { ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GlassReveal } from '../components/site/GlassReveal';
import { useT } from '@/i18n/locale';
import type { MessageKey } from '@/i18n/messages';

const LICENSE_IMAGE_SRCS = [
  '/assets/image/1.png',
  '/assets/image/2.png',
  '/assets/image/3.png',
  '/assets/image/4.png',
  '/assets/image/5.png',
  '/assets/image/6.png',
  '/assets/image/CMS100143.png',
  '/assets/image/CMS101383.png',
  '/assets/image/COLORADO.png',
  '/assets/image/FINCEN.png',
];

const TEAM_IMAGE_SRCS = [
  '/assets/image/Echo Zeng.png',
  '/assets/image/Calvin xu.png',
  '/assets/image/Ho Kar Loong, Kenneth.png',
  '/assets/image/wenna sun.jpg',
  '/assets/image/MAX GOH.png',
  '/assets/image/Kelvin Tan.png',
];

const TEAM_NAMES = ['Echo Zeng', 'Calvin Xu', 'Ho Kar Loong, Kenneth', '孙文娜', 'MAX GOH', 'Kelvin Tan'] as const;

export function About() {
  const t = useT();
  const [activeLicense, setActiveLicense] = useState<{ title: string; code: string; imageSrc: string } | null>(null);

  const licenses = useMemo(
    () =>
      LICENSE_IMAGE_SRCS.map((imageSrc, i) => ({
        title: t(`about.lic${i}.title` as MessageKey),
        code: t(`about.lic${i}.code` as MessageKey),
        imageSrc,
      })),
    [t],
  );

  const team = useMemo(
    () =>
      TEAM_IMAGE_SRCS.map((imageSrc, i) => ({
        name: TEAM_NAMES[i],
        role: t(`about.role${i}` as MessageKey),
        bio: t(`about.bio${i}` as MessageKey),
        initials: ['EZ', 'CX', 'HK', 'SW', 'MG', 'KT'][i],
        imageSrc,
      })),
    [t],
  );

  const roadmap = useMemo(
    () => [
      { year: '2026', title: t('about.road0.title'), desc: t('about.road0.desc'), color: 'gold-light' as const },
      { year: '2027', title: t('about.road1.title'), desc: t('about.road1.desc'), color: 'gold-champagne' as const },
      { year: '2028', title: t('about.road2.title'), desc: t('about.road2.desc'), color: 'gold-dark' as const },
    ],
    [t],
  );

  const newsItems = useMemo(
    () => [
      {
        date: '2026-04-10',
        tag: t('about.news0.tag'),
        title: t('about.news0.title'),
        desc: t('about.news0.desc'),
      },
      {
        date: '2026-03-28',
        tag: t('about.news1.tag'),
        title: t('about.news1.title'),
        desc: t('about.news1.desc'),
      },
      {
        date: '2026-03-15',
        tag: t('about.news2.tag'),
        title: t('about.news2.title'),
        desc: t('about.news2.desc'),
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!activeLicense) return;
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveLicense(null);
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [activeLicense]);

  useEffect(() => {
    const allImageSources = [...LICENSE_IMAGE_SRCS, ...TEAM_IMAGE_SRCS];

    allImageSources.forEach((src) => {
      const image = new Image();
      image.onload = () => {
        image.onload = null;
        image.onerror = null;
      };
      image.onerror = () => {
        console.warn(`[About] Missing image asset: ${src}`);
        image.onload = null;
        image.onerror = null;
      };
      image.src = src;
    });
  }, []);

  return (
    <section className="section-shell min-h-screen bg-transparent">
      <div className="page-container">
        <div className="mb-16 text-center">
          <span className="brand-kicker mb-4">
            <span className="brand-dot" />
            {t('about.kicker')}
          </span>
          <h2 className="section-heading mb-4">
            {t('about.heroTitle')}
          </h2>
          <p className="section-subheading font-[var(--font-body)]">
            {t('about.heroSub')}
          </p>
        </div>

        {/* Compliance & Licenses */}
        <div className="mb-20">
          <h3 className="content-block-title mb-8 text-center">
            {t('about.compWall')}
          </h3>

          <div className="panel-grid mb-8 md:grid-cols-4">
            {[
              { name: t('about.comp0.name'), license: t('about.comp0.license') },
              { name: t('about.comp1.name'), license: t('about.comp1.license') },
              { name: t('about.comp2.name'), license: t('about.comp2.license') },
              { name: t('about.comp3.name'), license: t('about.comp3.license') },
            ].map((item, i) => (
              <GlassReveal
                key={i}
                variant="muted"
                interactive
                className="panel-card rounded-[var(--radius-card)] p-6 text-center transition-all hover:border-[var(--line-gold)]"
              >
                <div className="mb-2 text-lg font-semibold text-white">{item.name}</div>
                <div className="text-sm text-[var(--gold-champagne)]">{item.license}</div>
              </GlassReveal>
            ))}
          </div>

          <div className="text-center text-sm text-white/60 font-[var(--font-body)]">
            <p>{t('about.entityLine')}</p>
            <p className="mt-2">{t('about.auditLine')}</p>
          </div>
        </div>

        {/* Licenses Gallery */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h3 className="content-block-title mb-3">{t('about.galleryTitle')}</h3>
            <p className="text-sm text-white/60 font-[var(--font-body)]">
              {t('about.gallerySub')}
            </p>
          </div>

          <div className="panel-grid md:grid-cols-5">
            {licenses.map((license) => (
              <GlassReveal
                key={license.imageSrc}
                interactive
                className="panel-card group cursor-pointer rounded-[var(--radius-card)] p-4 transition-all hover:-translate-y-1"
                onClick={() => setActiveLicense(license)}
              >
                <div className="mb-3 overflow-hidden rounded-lg border border-white/10 bg-black/30 p-2">
                  <ImageWithFallback
                    src={license.imageSrc}
                    alt={license.title}
                    className="h-28 w-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-white">{license.title}</h4>
                  <p className="mt-1 text-xs text-[var(--gold-champagne)]">{license.code}</p>
                </div>
              </GlassReveal>
            ))}
          </div>
        </div>

        {/* Capital Roadmap */}
        <div className="mb-20">
          <h3 className="content-block-title mb-12 text-center">
            {t('about.roadTitle')}
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gold-champagne)]/20 via-[var(--gold-champagne)] to-[var(--gold-champagne)]/20" />

            <div className="grid md:grid-cols-3 gap-8 relative">
              {roadmap.map((stage, i) => (
                <div key={i} className="relative text-center">
                  <div
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-4 bg-black relative z-10"
                    style={{ borderColor: `var(--${stage.color})` }}
                  >
                    <div
                      className="text-2xl font-[var(--font-display)] font-bold"
                      style={{ color: `var(--${stage.color})` }}
                    >
                      {stage.year}
                    </div>
                  </div>
                  <h4 className="text-xl font-[var(--font-body)] font-semibold mb-3 text-white">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-white/60 font-[var(--font-body)] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Algorithm Model */}
        <div className="panel-card mb-20 rounded-[var(--radius-panel)] p-8">
          <h3 className="content-block-title mb-6 text-center">
            {t('about.algoTitle')}
          </h3>
          <div className="text-center">
            <div className="inline-block p-6 bg-black/40 border border-[var(--gold-champagne)]/30 rounded-xl">
              <p className="text-lg font-[var(--font-body)] text-white/80 mb-4">
                {t('about.algoEq')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-white/90 font-[var(--font-body)]">
                <span className="px-4 py-2 bg-[var(--gold-light)]/20 border border-[var(--gold-light)]/40 rounded-lg">
                  {t('about.algoT')}
                </span>
                <span className="text-2xl" style={{ color: 'var(--gold-champagne)' }}>×</span>
                <span className="px-4 py-2 bg-[var(--gold-champagne)]/20 border border-[var(--gold-champagne)]/40 rounded-lg">
                  {t('about.algoS')}
                </span>
                <span className="text-2xl" style={{ color: 'var(--gold-champagne)' }}>×</span>
                <span className="px-4 py-2 bg-[var(--gold-dark)]/20 border border-[var(--gold-dark)]/40 rounded-lg">
                  {t('about.algoL')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h3 className="content-block-title mb-3">{t('about.teamTitle')}</h3>
            <p className="text-sm text-white/60 font-[var(--font-body)]">
              {t('about.teamSub')}
            </p>
          </div>

          <div className="panel-grid md:grid-cols-3">
            {team.map((member) => (
              <GlassReveal
                key={member.name}
                interactive
                className="panel-card rounded-[var(--radius-card)] p-6 transition-all hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-[var(--gold-champagne)]/50 bg-black/40">
                  <ImageWithFallback
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                  <p className="mt-1 text-sm text-[var(--gold-champagne)]">{member.role}</p>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">{member.bio}</p>
                  <p className="mt-2 text-[11px] text-white/35">{member.initials}</p>
                </div>
              </GlassReveal>
            ))}
          </div>
        </div>

        {/* Newsroom */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="content-block-title">
              {t('about.newsTitle')}
            </h3>
            <GlassReveal
              as="button"
              type="button"
              variant="muted"
              interactive
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--gold-champagne)] hover:underline"
            >
              {t('about.newsAll')} <ChevronRight className="h-4 w-4" />
            </GlassReveal>
          </div>

          <div className="panel-grid md:grid-cols-3">
            {newsItems.map((news, i) => (
              <GlassReveal
                key={i}
                interactive
                className="panel-card group cursor-pointer rounded-[var(--radius-card)] p-6 transition-all hover:scale-[1.02]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs text-white/40">{news.date}</span>
                  <span
                    className="rounded px-2 py-1 text-xs"
                    style={{
                      backgroundColor: 'var(--gold-champagne)20',
                      color: 'var(--gold-champagne)',
                    }}
                  >
                    {news.tag}
                  </span>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-[var(--gold-champagne)]">
                  {news.title}
                </h4>
                <p className="text-sm text-white/60">{news.desc}</p>
              </GlassReveal>
            ))}
          </div>
        </div>
      </div>

      {activeLicense && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setActiveLicense(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-black/80 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLicense(null)}
              className="absolute right-3 top-3 rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:text-white"
              aria-label={t('about.closeLicense')}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="max-h-[78vh] overflow-auto rounded-xl border border-white/10 bg-black/30 p-4">
              <ImageWithFallback
                src={activeLicense.imageSrc}
                alt={activeLicense.title}
                className="mx-auto h-auto max-h-[72vh] w-auto object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <div className="text-sm font-semibold text-white">{activeLicense.title}</div>
              <div className="text-xs text-[var(--gold-champagne)]">{activeLicense.code}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}