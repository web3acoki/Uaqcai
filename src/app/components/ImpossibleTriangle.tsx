import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Line,
  MeshDistortMaterial,
  PresentationControls,
  Text,
} from '@react-three/drei';
import { motion } from 'motion/react';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GlassReveal } from './site/GlassReveal';
import { useT } from '@/i18n/locale';

type PillarPointProps = {
  position: [number, number, number];
  label: string;
  subtitle: string;
  description: string;
  color: string;
};

function PillarPoint({ position, label, subtitle, description, color }: PillarPointProps) {
  return (
    <Float speed={1.7} rotationIntensity={0.35} floatIntensity={0.78}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.95} toneMapped={false} />
        </mesh>

        <Text position={[0, 0.42, 0]} fontSize={0.22} color="white" anchorX="center" anchorY="middle">
          {label} ({subtitle})
        </Text>
        <Text
          position={[0, -0.38, 0]}
          fontSize={0.11}
          color="#a3a3a3"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.4}
          textAlign="center"
        >
          {description}
        </Text>
      </group>
    </Float>
  );
}

type PillarCopy = {
  label: string;
  subtitle: string;
  description: string;
};

type TrinityCoreProps = {
  isHovered: boolean;
  reducedMotion: boolean;
  pillars: { security: PillarCopy; yield: PillarCopy; liquidity: PillarCopy };
};

function TrinityCore({ isHovered, reducedMotion, pillars }: TrinityCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.48) * 0.18;
    meshRef.current.rotation.y += delta * (isHovered ? 0.14 : 0.24);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <MeshDistortMaterial
          color="var(--triangle-core)"
          speed={isHovered ? 0.9 : 1.5}
          distort={isHovered ? 0.14 : 0.28}
          radius={1}
          emissive="var(--taiji-gold-soft)"
          emissiveIntensity={0.2}
        />
      </mesh>

      <Line
        points={[
          [0, 2, 0],
          [-1.7, -1, 0],
          [1.7, -1, 0],
          [0, 2, 0],
        ]}
        color="#aeb5c2"
        lineWidth={1}
        transparent
        opacity={0.46}
      />

      <PillarPoint
        position={[-1.7, -1, 0]}
        label={pillars.security.label}
        subtitle={pillars.security.subtitle}
        description={pillars.security.description}
        color="var(--triangle-security)"
      />
      <PillarPoint
        position={[0, 2, 0]}
        label={pillars.yield.label}
        subtitle={pillars.yield.subtitle}
        description={pillars.yield.description}
        color="var(--triangle-yield)"
      />
      <PillarPoint
        position={[1.7, -1, 0]}
        label={pillars.liquidity.label}
        subtitle={pillars.liquidity.subtitle}
        description={pillars.liquidity.description}
        color="var(--triangle-liquidity)"
      />
    </group>
  );
}

export function ImpossibleTriangle() {
  const t = useT();
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const pillars = useMemo(
    () => ({
      security: {
        label: t('tri.security'),
        subtitle: t('tri.securitySub'),
        description: t('tri.securityDesc'),
      },
      yield: {
        label: t('tri.yield'),
        subtitle: t('tri.yieldSub'),
        description: t('tri.yieldDesc'),
      },
      liquidity: {
        label: t('tri.liquidity'),
        subtitle: t('tri.liquiditySub'),
        description: t('tri.liquidityDesc'),
      },
    }),
    [t],
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const colorSecurity = 'var(--triangle-security)';
  const colorYield = 'var(--triangle-yield)';
  const colorLiquidity = 'var(--triangle-liquidity)';

  const stats = useMemo(
    () => [
      { value: 60, label: t('tri.stat1'), color: colorYield, prefix: '', suffix: '+%' },
      { value: 1, label: t('tri.stat2'), color: colorSecurity, prefix: '<', suffix: '%' },
      { value: 5, label: t('tri.stat3'), color: colorLiquidity, prefix: '<', suffix: '%' },
      { value: 3.5, label: t('tri.stat4'), color: colorYield, prefix: '', suffix: t('tri.stat4Suffix') },
    ],
    [t, colorYield, colorSecurity, colorLiquidity],
  );

  const [displayStats, setDisplayStats] = useState(() => stats.map(() => 0));

  useEffect(() => {
    if (reducedMotion) {
      setDisplayStats(stats.map((s) => s.value));
      return;
    }

    const durationMs = 1500;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayStats(stats.map((s) => s.value * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion, stats]);

  return (
    <div className="page-container relative mb-20 py-16">
      <div
        className="relative w-full max-w-[760px] mx-auto mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-4 rounded-full bg-white/[0.05] blur-3xl" />
        <div className="absolute -inset-6 rounded-full bg-[var(--taiji-gold-glow)]/25 blur-[72px]" />

        <div className="relative w-full h-[500px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(155deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_38%,transparent_76%),linear-gradient(180deg,rgba(9,10,14,0.9)_0%,rgba(8,9,13,0.95)_100%)] shadow-[0_16px_42px_rgba(0,0,0,0.42)]">
          <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <Canvas className="!absolute !inset-0 !h-full !w-full" shadows dpr={[1, 2]} camera={{ position: [0, 0, 5.5], fov: 50 }}>
              <Suspense
                fallback={(
                  <Html center>
                    <div className="text-[var(--taiji-gold-soft)] text-sm font-semibold animate-pulse">
                      Loading 3D Scene...
                    </div>
                  </Html>
                )}
              >
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.18} penumbra={1} intensity={0.72} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.34} />

                <PresentationControls
                  global
                  enabled={!reducedMotion}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 3, Math.PI / 3]}
                  azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                  <group position={[0.1, -0.25, 0]}>
                    <TrinityCore isHovered={isHovered} reducedMotion={reducedMotion} pillars={pillars} />
                  </group>
                </PresentationControls>

                <ContactShadows position={[0, -2.5, 0]} opacity={0.38} scale={10} blur={2} far={4.5} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <GlassReveal
            key={i}
            variant="muted"
            interactive
            className="group relative rounded-xl p-8 transition-all duration-700 hover:scale-[1.02]"
            style={{
              borderColor: `${stat.color === colorYield ? 'rgba(245,166,35,0.24)' : 'rgba(255,255,255,0.13)'}`,
            }}
          >
            <div
              className="absolute top-0 right-0 left-0 h-[1px] opacity-40"
              style={{
                background:
                  stat.color === colorYield
                    ? 'linear-gradient(to right, transparent, rgba(245,166,35,0.65), transparent)'
                    : 'linear-gradient(to right, transparent, rgba(230,235,243,0.52), transparent)',
              }}
            />

            <div className="text-center">
              <div
                className="mb-4 text-5xl font-[var(--font-display)] transition-all duration-300"
                style={{
                  color: stat.color === colorYield ? colorYield : 'var(--taiji-white)',
                  textShadow:
                    stat.color === colorYield
                      ? '0 0 14px rgba(245,166,35,0.26)'
                      : '0 0 12px rgba(231,235,242,0.14)',
                }}
              >
                {`${stat.prefix}${stat.value % 1 === 0 ? Math.round(displayStats[i]) : displayStats[i].toFixed(1)}${stat.suffix}`}
              </div>
              <div className="text-[13px] leading-relaxed tracking-wide text-white/56">{stat.label}</div>
            </div>
          </GlassReveal>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-16 max-w-[700px] px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-[15px] font-[var(--font-body)] leading-[1.8] text-white/56">
          {t('tri.footerPrefix')}{' '}
          <span style={{ color: colorSecurity }} className="font-medium opacity-90">
            {t('tri.security')}
          </span>
          {t('tri.footerMid1')}
          <span style={{ color: colorYield }} className="font-medium opacity-90">
            {t('tri.yield')}
          </span>
          {t('tri.footerMid2')}
          <span style={{ color: colorLiquidity }} className="font-medium opacity-90">
            {t('tri.liquidity')}
          </span>
          {' '}
          {t('tri.footerSuffix')}
        </p>
      </motion.div>
    </div>
  );
}
