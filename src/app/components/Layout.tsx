import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { X } from 'lucide-react';

export function Layout() {
  const [tickerVisible, setTickerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      setNavCompact(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--deep-black)] text-white overflow-x-hidden">
      {/* Global Ticker */}
      {tickerVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/10 h-[40px] flex items-center justify-center px-6 animate-fade-in transition-all">
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
        className={`fixed left-0 right-0 z-40 flex justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          tickerVisible ? 'top-[40px]' : 'top-0'
        }`}
        style={{
          paddingTop: scrolled ? '20px' : '0px',
        }}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled 
              ? 'w-full max-w-[780px] h-[64px] bg-transparent backdrop-blur-md border border-white/10 rounded-[20px] px-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)]' 
              : 'w-full max-w-[1400px] h-[80px] bg-transparent border-transparent rounded-none shadow-none px-6 md:px-10'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="z-10 shrink-0">
            <div
              className="transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center"
              style={{
                paddingLeft: scrolled ? '12px' : '0px'
              }}
            >
              <span
                className="font-[var(--font-display)] tracking-wider font-bold transition-all duration-[1500ms]"
                style={{ 
                  color: 'var(--gold-champagne)',
                  fontSize: '24px' 
                }}
              >
                UAQC
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div 
            className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              gap: scrolled ? '2.5rem' : '3.5rem'
            }}
          >
            {['Home', 'Fund', 'RWAFi', 'About'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              
              return (
                <Link
                  key={item}
                  to={path}
                  className={`relative group transition-colors duration-300 ${isActive ? 'text-[var(--gold-champagne)]' : 'text-white/80 hover:text-[var(--gold-champagne)]'}`}
                >
                  <span 
                    className="font-[var(--font-body)] tracking-wide font-medium transition-all duration-[1500ms]"
                    style={{ fontSize: '15px' }}
                  >
                    {item}
                  </span>
                  <div className={`absolute -bottom-1.5 left-0 h-[2px] bg-[var(--gold-champagne)] transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
                </Link>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="flex items-center z-10 shrink-0">
            <button 
              className="flex items-center justify-center font-[var(--font-body)] font-bold bg-[var(--gold-champagne)] text-black rounded-lg hover:bg-[#FFF5D1] transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_15px_rgba(235,213,169,0.15)] hover:shadow-[0_0_25px_rgba(235,213,169,0.4)] text-[15px] px-6 h-[40px]"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: tickerVisible ? '128px' : '88px', minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-8">
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
