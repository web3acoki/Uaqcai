import { AnimatePresence, motion, useReducedMotion, useSpring } from 'motion/react';
import { Activity, ArrowRight, Brain, ChartColumn, ShieldCheck, Target } from 'lucide-react';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

type OrbitSpec = {
  sizeClass: string;
  duration: number;
  rx: number;
  ry: number;
  borderColor: string;
  particleCount: number;
  particleColor: string;
  particleShadow: string;
};

export function RwafiHudHero() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 60, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * -30;
    rotateX.set(y);
    rotateY.set(x);
  };

  useEffect(() => {
    if (!reducedMotion) return;
    rotateX.set(0);
    rotateY.set(0);
  }, [reducedMotion, rotateX, rotateY]);

  const orbits: OrbitSpec[] = useMemo(
    () => [
      {
        sizeClass: 'w-full h-full',
        duration: 30,
        rx: 70,
        ry: 10,
        borderColor: 'rgba(168,176,196,0.20)',
        particleCount: 5,
        particleColor: 'rgb(188,195,209)',
        particleShadow: 'rgb(188,195,209) 0px 0px 10px',
      },
      {
        sizeClass: 'w-[90%] h-[90%]',
        duration: 25,
        rx: -40,
        ry: 40,
        borderColor: 'rgba(245,166,35,0.15)',
        particleCount: 4,
        particleColor: 'rgb(245,166,35)',
        particleShadow: 'rgb(245,166,35) 0px 0px 10px',
      },
      {
        sizeClass: 'w-[80%] h-[80%]',
        duration: 20,
        rx: 20,
        ry: -70,
        borderColor: 'rgba(255,255,255,0.10)',
        particleCount: 3,
        particleColor: 'rgb(188,195,209)',
        particleShadow: 'rgb(188,195,209) 0px 0px 10px',
      },
    ],
    [],
  );

  return (
    <div className="w-full max-w-[620px]" onMouseMove={handleMouseMove}>
      <div className="relative w-full perspective-2000">
        <motion.div
          style={reducedMotion ? undefined : { rotateX, rotateY }}
          className="relative group aspect-square w-full flex items-center justify-center preserve-3d"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            rotateX.set(0);
            rotateY.set(0);
          }}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.28 : 1,
              opacity: isHovered ? 0.34 : 0.18,
            }}
            className="absolute inset-0 rounded-full blur-[160px]"
            style={{ background: 'rgba(245,166,35,1)' }}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
            {orbits.map((orbit, idx) => (
              <motion.div
                key={orbit.sizeClass}
                animate={
                  reducedMotion
                    ? { rotateX: orbit.rx, rotateY: orbit.ry, rotateZ: 0 }
                    : { rotateZ: idx % 2 === 0 ? 360 : -360, rotateX: orbit.rx, rotateY: orbit.ry }
                }
                transition={{
                  rotateZ: reducedMotion ? { duration: 0 } : { duration: orbit.duration, repeat: Infinity, ease: 'linear' },
                  default: { duration: 0 },
                }}
                className={`absolute ${orbit.sizeClass} rounded-full border preserve-3d shadow-[0_0_20px_rgba(255,255,255,0.02)]`}
                style={{ borderColor: orbit.borderColor }}
                aria-hidden="true"
              >
                {Array.from({ length: orbit.particleCount }).map((_, nodeIdx) => (
                  <motion.div
                    key={nodeIdx}
                    className="absolute h-1.5 w-1.5 rounded-full"
                    style={{
                      left: '50%',
                      top: '-0.75px',
                      transform: `rotate(${nodeIdx * (360 / orbit.particleCount)}deg) translateY(-50%)`,
                      transformOrigin: '0 50% 0',
                      backgroundColor: orbit.particleColor,
                      boxShadow: orbit.particleShadow,
                    }}
                    animate={
                      reducedMotion
                        ? { opacity: 0.35, scale: 1 }
                        : { scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }
                    }
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 3 + idx, repeat: Infinity, delay: nodeIdx * 0.5 }
                    }
                  >
                    <div className="absolute right-0 h-[1px] w-8 -translate-y-1/2 bg-gradient-to-l from-current to-transparent opacity-40" />
                  </motion.div>
                ))}
              </motion.div>
            ))}

            <motion.div
              style={{ translateZ: 50 }}
              animate={{ scale: isHovered ? 1.1 : 1, rotateY: isHovered ? 10 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-[60%] w-[60%] items-center justify-center preserve-3d"
            >
              <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/20 bg-gradient-to-br from-white/15 to-transparent backdrop-blur-3xl shadow-[0_0_120px_rgba(188,195,209,0.15)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent_70%)]" />
                <div className="absolute inset-0 bg-[rgba(12,15,24,0.45)] grayscale mix-blend-multiply" />
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                  }}
                />
              </div>

              <div className="relative flex flex-col items-center gap-1 text-center transition-transform duration-1000 group-hover:scale-105">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={reducedMotion ? undefined : { opacity: [0.8, 1, 0.8] }}
                    transition={reducedMotion ? undefined : { duration: 4, repeat: Infinity }}
                    className="text-5xl font-black italic tracking-[0.3em] drop-shadow-[0_0_20px_rgba(188,195,209,0.4)]"
                    style={{ color: 'var(--taiji-ash)' }}
                  >
                    RWAF<span className="text-shadow-glow" style={{ color: 'var(--gold-champagne)' }}>i</span>
                  </motion.div>
                  <div
                    className="mb-2 mt-4 h-[2px] w-32 bg-gradient-to-r from-transparent via-[var(--gold-champagne)] to-transparent shadow-[0_0_10px_rgba(245,166,35,0.5)]"
                    aria-hidden="true"
                  />
                  <div
                    className="text-[11px] font-black uppercase tracking-[0.5em]"
                    style={{ color: 'rgba(245,166,35,0.8)' }}
                  >
                    Decentralized Yield
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: isHovered ? 120 : 100 }}
                className="absolute right-0 top-[20%] z-30 hidden w-60 md:block"
              >
                <div className="group/card overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
                  style={{ borderColor: 'rgba(168,176,196,0.10)', background: 'rgba(12,15,24,0.90)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100" />
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between" style={{ color: 'rgba(168,176,196,0.55)' }}>
                      <ChartColumn className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">BULLISH SIGNAL</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="font-mono text-xl font-bold" style={{ color: 'var(--taiji-ash)' }}>
                        +4.12%
                      </span>
                      <Activity className="h-4 w-4 text-green-500/50" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: 1, x: isHovered ? -120 : -100 }}
                className="absolute bottom-[25%] left-0 z-30 hidden w-60 md:block"
              >
                <div
                  className="group/card rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
                  style={{ borderColor: 'rgba(245,166,35,0.10)', background: 'rgba(12,15,24,0.90)' }}
                >
                  <div className="mb-2 flex items-center gap-3" style={{ color: 'rgba(245,166,35,0.60)' }}>
                    <Brain className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Core Efficiency</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between rounded-lg px-2 py-1" style={{ background: 'rgba(245,166,35,0.05)' }}>
                      <span className="text-[9px]" style={{ color: 'rgba(245,166,35,0.40)' }}>
                        L2 Verified
                      </span>
                      <ShieldCheck className="h-3 w-3" style={{ color: 'rgba(245,166,35,0.60)' }} />
                    </div>
                    <div className="h-1 w-full rounded-full" style={{ background: 'rgba(245,166,35,0.10)' }}>
                      <motion.div
                        animate={reducedMotion ? { width: '63%' } : { width: ['40%', '90%', '40%'] }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 5, repeat: Infinity }}
                        className="h-full shadow-[0_0_10px_#F5A623]"
                        style={{ background: 'var(--gold-champagne)' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="relative z-20 mt-8 flex w-full max-w-[480px] flex-col items-center gap-5 px-6">
        <motion.button
          type="button"
          onClick={() => navigate('/rwafi')}
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scale: 1.03,
                  y: -4,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.25), 0 0 30px rgba(245,166,35,0.10)',
                }
          }
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          className="group relative w-full overflow-hidden rounded-2xl border px-6 py-5 shadow-2xl transition-all"
          style={{
            borderColor: 'rgba(245,166,35,0.20)',
            background: 'linear-gradient(to bottom, rgba(245,166,35,0.10), transparent)',
          }}
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: 'rgba(245,166,35,0.10)' }} />
          <div className="relative flex items-center justify-center gap-4 text-sm font-black italic tracking-[0.2em]" style={{ color: 'var(--gold-champagne)' }}>
            ENTER RWAFI ECOSYSTEM
            <ArrowRight className="h-5 w-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3" />
          </div>
        </motion.button>

        <div className="grid w-full grid-cols-2 gap-5">
          <button
            type="button"
            onClick={() => navigate('/fund')}
            className="group flex h-12 items-center justify-center gap-3 rounded-xl border bg-white/5 text-[11px] font-black uppercase tracking-[0.2em] transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.50)' }}
          >
            <span className="h-2 w-2 rounded-full transition-colors group-hover:animate-pulse" style={{ background: 'rgba(168,176,196,0.20)' }} />
            View FUND
          </button>
          <button
            type="button"
            onClick={() => navigate('/fund#product-4')}
            className="group flex h-12 items-center justify-center gap-3 rounded-xl border text-[11px] font-black uppercase tracking-[0.2em] transition-all"
            style={{
              borderColor: 'rgba(245,166,35,0.10)',
              background: 'rgba(245,166,35,0.05)',
              color: 'rgba(245,166,35,0.65)',
            }}
          >
            <Target className="h-4 w-4 transition-transform group-hover:scale-125" />
            Product No.4
          </button>
        </div>
      </div>
    </div>
  );
}

