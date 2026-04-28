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
        date: '2026-04-20',
        tag: t('about.newsTechub1.tag'),
        title: t('about.newsTechub1.title'),
        excerpt: t('about.newsTechub1.desc'),
        href: 'https://www.techub.news/articleDetail/871661fa-ba06-46b6-b910-a6dc79687026',
        imageSrc: '/newsroom/2.png',
      },
      {
        date: '2026-01-30',
        tag: t('about.newsTechub0.tag'),
        title: t('about.newsTechub0.title'),
        excerpt: t('about.newsTechub0.desc'),
        href: 'https://www.techub.news/articleDetail/f95c45f6-5fed-41ed-bb41-3859bbf71f6f',
        imageSrc: '/newsroom/1.png',
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
    <section className="section-shell min-h-screen bg-transparent !pt-[max(2rem,calc(var(--section-space)-1.5rem))] !pb-[var(--section-space)]">
      <div className="page-container">
        <div className="mb-10 text-center md:mb-12">
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
                <div className="text-sm text-white/66">{item.license}</div>
              </GlassReveal>
            ))}
          </div>

          <div className="text-center text-sm text-white/60 font-[var(--font-body)]">
            <p>{t('about.entityLine')}</p>
            <p className="mt-2">{t('about.auditLine')}</p>
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
                className="panel-card rounded-[var(--radius-card)] p-6 transition-all hover:-translate-y-0.5"
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
                  <p className="mt-1 text-sm text-white/70">{member.role}</p>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">{member.bio}</p>
                  <p className="mt-2 text-[11px] text-white/35">{member.initials}</p>
                </div>
              </GlassReveal>
            ))}
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
                className="panel-card group cursor-pointer rounded-[var(--radius-card)] p-4 transition-all hover:-translate-y-0.5"
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
                  <p className="mt-1 text-xs text-white/58">{license.code}</p>
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
                as="a"
                interactive
                href={news.href}
                target={news.href?.startsWith('http') ? '_blank' : undefined}
                rel={news.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={news.title}
                className="panel-card group block rounded-[var(--radius-card)] p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                  <img
                    src={news.imageSrc}
                    alt={news.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
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
                <h4 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-white/92">
                  {news.title}
                </h4>
                <p className="text-sm text-white/60 line-clamp-3 break-words">{news.excerpt}</p>
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
            className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-black/80 p-4 shadow-[var(--shadow-3),var(--shadow-outline-gold)]"
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