import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import uaqcNavLogo from '@/public/UAQC2.png';
import tgChannelQr from '@/public/tg-channel.png';
import tgCommunityQr from '@/public/tg-community-.png';
import xQr from '@/public/x.png';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { LocaleProvider, useLocale, useT } from '@/i18n/locale';
import type { MessageKey } from '@/i18n/messages';

/** ms; keep in sync with `--nav-duration-enter` / `--nav-duration-exit` */
const MORPH_ENTER_MS = 520;
const MORPH_EXIT_MS = 900;
/** 向下超过该值进入胶囊；上滚用更低阈值滞回，避免在边界反复形变 */
const SCROLL_COMPACT_PX = 8;
const SCROLL_EXPAND_PX = 4;

/** Only morph these — not `all` (cuts subpixel jitter / horizontal “snap”) */
const NAV_SHELL_TRANSITION_PROPERTY =
  'max-width, padding-left, padding-right, border-radius, border-color, background-color, box-shadow, backdrop-filter' as const;

type NavMorphPhase = 'idle' | 'toCompact' | 'toExpanded';

/**
 * CSS transition for the bar: must match the morph **in flight**, not only `scrolled`.
 * Otherwise expanded→pill wrongly picks exit easing (overshoot) → horizontal snap/jerk.
 */
function navChromeTransition(phase: NavMorphPhase, scrolled: boolean) {
  if (phase === 'toCompact') {
    return {
      transitionDuration: 'var(--nav-duration-enter)',
      transitionTimingFunction: 'var(--nav-ease-enter)',
    } as const;
  }
  if (phase === 'toExpanded') {
    return {
      transitionDuration: 'var(--nav-duration-exit)',
      transitionTimingFunction: 'var(--nav-ease-exit)',
    } as const;
  }
  return scrolled
    ? {
        transitionDuration: 'var(--nav-duration-exit)',
        transitionTimingFunction: 'var(--nav-ease-exit)',
      }
    : {
        transitionDuration: 'var(--nav-duration-enter)',
        transitionTimingFunction: 'var(--nav-ease-enter)',
      };
}

const NAV_ITEMS = ['Home', 'Fund', 'RWAFi', 'About'] as const;

const NAV_LABEL_KEY: Record<(typeof NAV_ITEMS)[number], MessageKey> = {
  Home: 'nav.routeHome',
  Fund: 'nav.routeFund',
  RWAFi: 'nav.routeRWAFi',
  About: 'nav.routeAbout',
};

export function Layout() {
  return (
    <LocaleProvider>
      <LayoutContent />
    </LocaleProvider>
  );
}

function LayoutContent() {
  const t = useT();
  const { locale, setLocale } = useLocale();
  const [tickerVisible, setTickerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [morphPhase, setMorphPhase] = useState<NavMorphPhase>('idle');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const scrolledRef = useRef(false);
  const morphTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chromeTx = navChromeTransition(morphPhase, scrolled);

  useEffect(() => {
    const clearMorphTimer = () => {
      if (morphTimeoutRef.current != null) {
        window.clearTimeout(morphTimeoutRef.current);
        morphTimeoutRef.current = null;
      }
    };

    const applyScroll = () => {
      const y = window.scrollY;
      const prev = scrolledRef.current;
      const next = prev ? y > SCROLL_EXPAND_PX : y > SCROLL_COMPACT_PX;
      if (prev === next) return;

      scrolledRef.current = next;
      setScrolled(next);
      clearMorphTimer();

      if (next) {
        setMorphPhase('toCompact');
        morphTimeoutRef.current = window.setTimeout(() => {
          setMorphPhase('idle');
          morphTimeoutRef.current = null;
        }, MORPH_ENTER_MS);
      } else {
        setMorphPhase('toExpanded');
        morphTimeoutRef.current = window.setTimeout(() => {
          setMorphPhase('idle');
          morphTimeoutRef.current = null;
        }, MORPH_EXIT_MS);
      }
    };

    applyScroll();
    window.addEventListener('scroll', applyScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', applyScroll);
      clearMorphTimer();
    };
  }, []);

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
    scrolledRef.current = false;
    setScrolled(false);
    setMorphPhase('idle');
    setMobileNavOpen(false);
    if (morphTimeoutRef.current != null) {
      window.clearTimeout(morphTimeoutRef.current);
      morphTimeoutRef.current = null;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--deep-black)] text-white">
      {/* Global Ticker */}
      {tickerVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 flex h-[36px] items-center justify-center border-b border-white/7 bg-[rgba(7,8,12,0.72)] px-6 backdrop-blur-md animate-fade-in transition-all">
          <div className="flex items-center gap-3 text-[11px] font-[var(--font-body)] text-white/66 md:text-xs">
            <span className="hidden sm:inline tracking-[0.06em]">UAQC Bring Tokenized Securities to Hundreds of Millions</span>
            <span className="sm:hidden truncate max-w-[200px] tracking-[0.06em]">Tokenized Securities Live on Binance</span>
            <a href="https://uaqc.io/" target="_blank" rel="noopener noreferrer" className="ml-1.5 flex items-center gap-1 font-medium text-[var(--gold-light)]/72 transition-colors hover:text-[var(--gold-light)]/88">
              Learn More
              <svg width="14px" height="14px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.33936 19.2393L14.5394 12.0393L7.33936 4.83934L8.40002 3.77868L16.6607 12.0393L8.40002 20.3L7.33936 19.2393Z" fill="currentColor" />
              </svg>
            </a>
          </div>
          <button
            onClick={() => setTickerVisible(false)}
            className="absolute right-4 rounded-full p-1 text-white/40 transition-colors hover:text-white/66"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sticky Navigation */}
      <nav
        className={`fixed left-0 right-0 z-40 flex justify-center ${
          tickerVisible ? 'top-[36px]' : 'top-0'
        }`}
        style={{
          paddingTop: scrolled ? '20px' : '0px',
          transitionProperty: 'padding-top',
          ...chromeTx,
        }}
      >
        <div 
          className={`flex items-center justify-between ${
            scrolled 
              ? 'h-[58px] w-full max-w-[min(var(--nav-pill-max),calc(100%-2rem))] rounded-[12px] border border-[var(--line-strong)] bg-[rgba(9,9,12,0.56)] px-4 shadow-[0_14px_42px_rgba(0,0,0,0.34),var(--shadow-outline-gold),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-7'
              : 'h-[58px] w-full max-w-[min(100%,var(--layout-page-max))] rounded-none border border-transparent bg-transparent px-[var(--layout-page-gutter)] shadow-none'
          }`}
          style={{
            ...chromeTx,
            transitionProperty: NAV_SHELL_TRANSITION_PROPERTY,
          }}
        >
          {/* Logo — no horizontal Motion here (was fighting max-width shrink → rightward jerk) */}
          <Link to="/" className="z-10 shrink-0">
            <div className="flex items-center">
              <img
                src={uaqcNavLogo}
                alt="UAQC"
                className="h-9 w-auto object-contain md:h-11"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          {/* Center Links */}
          <div 
            className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center justify-center md:flex"
            style={{
              gap: scrolled ? '2.5rem' : '3.5rem',
              ...chromeTx,
              transitionProperty: 'gap',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              
              return (
                <Link
                  key={item}
                  to={path}
                  className={`group relative transition-colors duration-200 ease-[var(--nav-ease)] ${isActive ? 'text-[var(--gold-light)]/95' : 'text-white/78 hover:text-white/92'}`}
                >
                  <span className="font-[var(--font-body)] text-[15px] font-medium tracking-[0.06em]">
                    {t(NAV_LABEL_KEY[item])}
                  </span>
                  <div
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-[var(--gold-champagne)]/55 transition-all ease-[var(--nav-ease)] ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                    style={{ transitionDuration: 'var(--nav-link-underline-ms)' }}
                  />
                </Link>
              );
            })}
          </div>

          <div className="z-10 flex shrink-0 items-center gap-2 md:gap-3">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/14 bg-white/[0.06] text-white transition-colors hover:bg-white/10 md:hidden"
              aria-label={t('nav.openMenu')}
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              className="flex h-10 shrink-0 items-center justify-center rounded-lg border border-white/14 bg-white/[0.04] px-2.5 text-[11px] font-medium tracking-wide text-white/85 transition-colors hover:border-white/22 hover:bg-white/[0.08] md:h-9 md:px-3 md:text-xs"
              aria-label={locale === 'zh' ? t('nav.langToEnAria') : t('nav.langToZhAria')}
            >
              {locale === 'zh' ? t('nav.langToEn') : t('nav.langToZh')}
            </button>
            <button
              type="button"
              className="lux-button flex h-10 min-h-[40px] min-w-0 items-center justify-center px-3 text-xs md:h-9 md:px-5 md:text-sm"
            >
              {t('nav.launchApp')}
            </button>
          </div>
        </div>
      </nav>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="right"
          className="z-[100] flex h-full max-h-[100dvh] w-[min(100%,20rem)] flex-col gap-0 border-l border-[var(--line-subtle)] bg-[var(--surface-1)] p-0 text-white sm:max-w-sm [&>button]:text-white/70 [&>button]:hover:text-[var(--gold-champagne)]"
        >
          <SheetHeader className="shrink-0 border-b border-white/10 px-5 py-4 text-left">
            <SheetTitle className="font-[var(--font-body)] text-base font-semibold tracking-wide text-white">
              {t('nav.sheetTitle')}
            </SheetTitle>
            <SheetDescription className="sr-only">{t('nav.sheetDesc')}</SheetDescription>
          </SheetHeader>
          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 py-3" aria-label={t('nav.mainNav')}>
            {NAV_ITEMS.map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={item}
                  to={path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`rounded-lg px-4 py-3.5 text-[15px] font-medium font-[var(--font-body)] transition-colors hover:text-[var(--gold-light)] ${
                    isActive ? 'bg-white/[0.06] text-[var(--gold-light)]/95' : 'text-white/80 active:bg-white/5'
                  }`}
                >
                  {t(NAV_LABEL_KEY[item])}
                </Link>
              );
            })}
          </nav>
          <div className="shrink-0 space-y-2 border-t border-white/10 p-4">
            <button
              type="button"
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              className="flex h-11 w-full items-center justify-center rounded-lg border border-white/14 bg-white/[0.04] text-sm font-medium text-white/88 transition-colors hover:bg-white/[0.08]"
              aria-label={locale === 'zh' ? t('nav.langToEnAria') : t('nav.langToZhAria')}
            >
              {locale === 'zh' ? t('nav.langToEn') : t('nav.langToZh')}
            </button>
            <button
              type="button"
              className="lux-button flex h-12 w-full items-center justify-center text-[15px]"
              onClick={() => setMobileNavOpen(false)}
            >
              {t('nav.launchApp')}
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main style={{ paddingTop: tickerVisible ? '122px' : '84px', minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--line-subtle)] bg-[var(--surface-0)] py-16 md:py-20">
        <div className="page-container">
          <div className="px-2 py-[calc(var(--footer-shell-pad-y)*0.9)] md:px-4">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-white/68">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--taiji-gold-soft)]/85 shadow-[0_0_6px_rgba(245,166,35,0.35)]" />
                  UAQC Investor Desk
                </span>
                <p className="text-sm text-white/50">Institutional gateway for compliant digital asset operations</p>
              </div>
              <span className="text-[10px] tracking-[0.14em] text-white/34">GLOBAL COMPLIANCE RAIL</span>
            </div>
            <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            <div className="mb-10 grid gap-[calc(var(--footer-grid-gap)*0.88)] md:grid-cols-3">
              <div>
                <h4 className="mb-2 text-[12px] font-[var(--font-body)] font-medium tracking-[0.08em] text-white/76">
                  {t('footer.institutional')}
                </h4>
                <p className="text-sm text-white/58">institutional@uaqc.net</p>
                <p className="mt-1.5 text-xs text-white/38">{t('footer.institutionalSub')}</p>
              </div>
              <div>
                <h4 className="mb-2 text-[12px] font-[var(--font-body)] font-medium tracking-[0.08em] text-white/76">
                  {t('footer.ops')}
                </h4>
                <p className="text-sm leading-relaxed text-white/58 whitespace-pre-line">
                  {t('footer.opsBody')}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-[12px] font-[var(--font-body)] font-medium tracking-[0.08em] text-white/76">
                  {t('footer.community')}
                </h4>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    {
                      label: 'Website',
                      href: 'https://www.uaqc.net',
                      icon: (
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm7.938 9h-3.07a15.6 15.6 0 0 0-1.48-6.02A8.024 8.024 0 0 1 19.938 11ZM12 4.062c.86 1.145 1.74 3.32 2.126 6.938H9.874C10.26 7.382 11.14 5.207 12 4.062ZM4.062 13h3.07a15.6 15.6 0 0 0 1.48 6.02A8.024 8.024 0 0 1 4.062 13Zm0-2a8.024 8.024 0 0 1 4.55-6.02A15.6 15.6 0 0 0 7.132 11Zm5.812 2h4.252C13.74 16.618 12.86 18.793 12 19.938 11.14 18.793 10.26 16.618 9.874 13Zm7.994 0h3.07a8.024 8.024 0 0 1-4.55 6.02A15.6 15.6 0 0 0 16.868 13Zm-1.742 0h-8.252a19.16 19.16 0 0 1 0-2h8.252a19.16 19.16 0 0 1 0 2Zm-7.514 6.02A15.6 15.6 0 0 0 7.132 13h3.07c.234 2.326.82 4.43 1.538 6.02a8.09 8.09 0 0 1-3.128 0Zm6.648 0a8.09 8.09 0 0 1-3.128 0c.718-1.59 1.304-3.694 1.538-6.02h3.07a15.6 15.6 0 0 0-1.48 6.02Z"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: 'X',
                      href: 'https://x.com/UAQCAI',
                      icon: (
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M18.9 2H22l-6.78 7.75L23 22h-6.8l-5.32-6.95L4.8 22H2l7.36-8.4L1 2h7l4.82 6.25L18.9 2Zm-1.2 18h1.86L7.24 3.92H5.26L17.7 20Z"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: 'YouTube',
                      href: 'https://youtube.com/@UAQC',
                      icon: (
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.94C17.93 4.75 12 4.75 12 4.75s-5.93 0-7.64.5A2.75 2.75 0 0 0 2.42 7.19 28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.94c1.71.5 7.64.5 7.64.5s5.93 0 7.64-.5a2.75 2.75 0 0 0 1.94-1.94A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81ZM10.25 15.02V8.98L15.5 12l-5.25 3.02Z"
                          />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/70 transition-colors hover:border-white/18 hover:bg-white/[0.07] hover:text-white/88 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-light)]/55"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Telegram Community', img: tgCommunityQr, alt: 'Telegram Community QR Code' },
                    { label: 'Telegram Channel', img: tgChannelQr, alt: 'Telegram Channel QR Code' },
                    { label: 'X', img: xQr, alt: 'X QR Code' },
                  ].map((item) => (
                    <div key={item.label} className="group">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2 transition-colors group-hover:border-white/16">
                        <img
                          src={item.img}
                          alt={item.alt}
                          loading="lazy"
                          className="aspect-square w-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="mt-2 text-center text-[11px] tracking-[0.08em] text-white/44">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-2.5 pt-4 text-center text-xs text-white/34 md:flex-row md:text-left">
              <p>© 2026 UAQC. Regulated by SFC/MAS. All rights reserved.</p>
              <p className="tracking-[0.12em] text-white/28">COMPLIANCE · SECURITY · TRANSPARENCY</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
