import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { X } from 'lucide-react';

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

export function Layout() {
  const [tickerVisible, setTickerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [morphPhase, setMorphPhase] = useState<NavMorphPhase>('idle');
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
    if (morphTimeoutRef.current != null) {
      window.clearTimeout(morphTimeoutRef.current);
      morphTimeoutRef.current = null;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--deep-black)] text-white">
      {/* Global Ticker */}
      {tickerVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 flex h-[40px] items-center justify-center border-b border-white/10 bg-[rgba(8,8,12,0.82)] px-6 backdrop-blur-xl animate-fade-in transition-all">
          <div className="flex items-center gap-3 text-xs md:text-sm font-[var(--font-body)] text-white/90">
            <span className="hidden sm:inline tracking-wide">Ondo and Binance Bring Tokenized Securities to Hundreds of Millions</span>
            <span className="sm:hidden truncate max-w-[200px] tracking-wide">Tokenized Securities Live on Binance</span>
            <a href="https://ondo.finance/blog/tokenized-stocks-live-on-binance" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[var(--gold-champagne)] hover:opacity-80 transition-opacity font-semibold ml-2">
              Learn More
              <svg width="14px" height="14px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.33936 19.2393L14.5394 12.0393L7.33936 4.83934L8.40002 3.77868L16.6607 12.0393L8.40002 20.3L7.33936 19.2393Z" fill="currentColor" />
              </svg>
            </a>
          </div>
          <button
            onClick={() => setTickerVisible(false)}
            className="absolute right-4 p-1.5 text-white/50 hover:text-[var(--gold-champagne)] rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Sticky Navigation */}
      <nav
        className={`fixed left-0 right-0 z-40 flex justify-center ${
          tickerVisible ? 'top-[40px]' : 'top-0'
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
              ? 'h-[58px] w-full max-w-[min(var(--nav-pill-max),calc(100%-2rem))] rounded-[12px] border border-[rgba(255,255,255,0.12)] bg-[rgba(10,10,14,0.42)] px-7 shadow-[0_14px_42px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl' 
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
              <span
                className="font-[var(--font-display)] font-bold tracking-wider text-[var(--gold-champagne)] text-[24px]"
              >
                UAQC
              </span>
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
            {['Home', 'Fund', 'RWAFi', 'About'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              
              return (
                <Link
                  key={item}
                  to={path}
                  className={`group relative transition-colors duration-200 ease-[var(--nav-ease)] ${isActive ? 'text-[var(--gold-champagne)]' : 'text-white/78 hover:text-[var(--gold-light)]'}`}
                >
                  <span className="font-[var(--font-body)] font-medium tracking-wide text-[15px]">
                    {item}
                  </span>
                  <div
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-[var(--gold-champagne)] transition-all ease-[var(--nav-ease)] ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                    style={{ transitionDuration: 'var(--nav-link-underline-ms)' }}
                  />
                </Link>
              );
            })}
          </div>

          <div className="z-10 flex shrink-0 items-center">
            <button
              type="button"
              className="flex h-[40px] items-center justify-center rounded-lg bg-[var(--gold-champagne)] px-6 text-[15px] font-bold text-black shadow-[0_8px_24px_rgba(212,175,55,0.2)] transition-colors duration-200 ease-[var(--nav-ease)] hover:bg-[#FFF1C8] hover:shadow-[0_10px_30px_rgba(235,213,169,0.38)]"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: tickerVisible ? '120px' : '80px', minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-black py-16">
        <div className="page-container">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="font-[var(--font-body)] font-semibold mb-4 text-white">
                机构业务
              </h4>
              <p className="text-sm text-white/60">institutional@uaqc.net</p>
            </div>
            <div>
              <h4 className="font-[var(--font-body)] font-semibold mb-4 text-white">
                全球运营中心
              </h4>
              <p className="text-sm text-white/60">
                新加坡总枢纽 · 香港 Web3 中心
                <br />
                日本东京研发中心 · 美国
              </p>
            </div>
            <div>
              <h4 className="font-[var(--font-body)] font-semibold mb-4 text-white">
                社群链接
              </h4>
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-[var(--tech-cyan)] transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-white/60 hover:text-[var(--tech-cyan)] transition-colors">
                  Discord
                </a>
                <a href="#" className="text-white/60 hover:text-[var(--tech-cyan)] transition-colors">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-xs text-white/40 font-[var(--font-body)]">
            <p>© 2026 UAQC. Regulated by SFC/MAS. All rights reserved.</p>
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
