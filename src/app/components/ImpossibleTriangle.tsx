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
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type PillarPointProps = {
  position: [number, number, number];
  label: string;
  subtitle: string;
  description: string;
  color: string;
};

function PillarPoint({ position, label, subtitle, description, color }: PillarPointProps) {
  return (
    <Float speed={2} rotationIntensity={0.45} floatIntensity={0.95}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} />
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

type TrinityCoreProps = {
  isHovered: boolean;
  reducedMotion: boolean;
};

function TrinityCore({ isHovered, reducedMotion }: TrinityCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.22;
    meshRef.current.rotation.y += delta * (isHovered ? 0.18 : 0.32);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <MeshDistortMaterial
          color="#d4af37"
          speed={isHovered ? 1.2 : 2}
          distort={isHovered ? 0.2 : 0.38}
          radius={1}
          emissive="#d4af37"
          emissiveIntensity={0.55}
        />
      </mesh>

      <Line
        points={[
          [0, 2, 0],
          [-1.7, -1, 0],
          [1.7, -1, 0],
          [0, 2, 0],
        ]}
        color="#686868"
        lineWidth={1}
        transparent
        opacity={0.62}
      />

      <PillarPoint
        position={[-1.7, -1, 0]}
        label="安全性"
        subtitle="Security"
        description="基础资产合规稳定"
        color="#4169E1"
      />
      <PillarPoint
        position={[0, 2, 0]}
        label="收益性"
        subtitle="Yield"
        description="指数级资本溢价"
        color="#FFD700"
      />
      <PillarPoint
        position={[1.7, -1, 0]}
        label="流动性"
        subtitle="Liquidity"
        description="RWA 映射与智能合约实现高流动性"
        color="#00CED1"
      />
    </group>
  );
}

export function ImpossibleTriangle() {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const colorSecurity = '#4169E1';
  const colorYield = '#FFD700';
  const colorLiquidity = '#00CED1';

  const stats = [
    { value: '60+%', label: '自营策略年化回报', color: colorYield },
    { value: '<1%', label: '自营策略历史最大回撤', color: colorSecurity },
    { value: '<5%', label: '合规基金历史最大回撤', color: colorLiquidity },
    { value: '3.5亿+', label: '全周期原生交易样本', color: colorYield },
  ];

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mb-20 py-16">
      <div
        className="relative w-full max-w-[760px] mx-auto mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-4 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative w-full h-[500px] md:h-[500px] lg:h-[550px] bg-[#0a0a0a] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <Canvas className="!absolute !inset-0 !h-full !w-full" shadows dpr={[1, 2]} camera={{ position: [0, 0, 5.5], fov: 50 }}>
              <Suspense
                fallback={(
                  <Html center>
                    <div className="text-[var(--gold-champagne)] text-sm font-semibold animate-pulse">
                      Loading 3D Scene...
                    </div>
                  </Html>
                )}
              >
                <ambientLight intensity={0.45} />
                <spotLight position={[10, 10, 10]} angle={0.18} penumbra={1} intensity={0.9} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.45} />

                <PresentationControls
                  global
                  enabled={!reducedMotion}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 3, Math.PI / 3]}
                  azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                  <group position={[0.1, -0.25, 0]}>
                    <TrinityCore isHovered={isHovered} reducedMotion={reducedMotion} />
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
          <motion.div
            key={i}
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
          >
            <div
              className="relative rounded-xl border bg-black/40 p-8 backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:bg-black/50"
              style={{
                borderColor: `${stat.color}15`,
              }}
            >
              <div
                className="absolute top-0 right-0 left-0 h-[1px] opacity-40"
                style={{
                  background: `linear-gradient(to right, transparent, ${stat.color}80, transparent)`,
                }}
              />

              <div className="text-center">
                <div
                  className="mb-4 text-5xl font-[var(--font-display)] transition-all duration-300"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 15px ${stat.color}30`,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[13px] font-[var(--font-body)] leading-relaxed tracking-wide text-white/50">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-16 max-w-[700px] px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-[15px] font-[var(--font-body)] leading-[1.8] text-white/50">
          通过创新技术架构实现{' '}
          <span style={{ color: colorSecurity }} className="font-medium opacity-90">
            安全性
          </span>
          、
          <span style={{ color: colorYield }} className="font-medium opacity-90">
            收益性
          </span>
          、
          <span style={{ color: colorLiquidity }} className="font-medium opacity-90">
            流动性
          </span>
          {' '}
          三者的完美统一，重新定义 Web3 资管标准
        </p>
      </motion.div>
    </div>
  );
}
