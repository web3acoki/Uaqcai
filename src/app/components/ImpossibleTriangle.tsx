import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const _edgeSample = new THREE.Vector3();
const R = 2.35;
/** 等边三角：顶=安全性，左下=去中心化，右下=高效性 */
function triangleVertices() {
  const v0 = new THREE.Vector3(0, R, 0);
  const v1 = new THREE.Vector3((-R * Math.sqrt(3)) / 2, -R / 2, 0);
  const v2 = new THREE.Vector3((R * Math.sqrt(3)) / 2, -R / 2, 0);
  return { v0, v1, v2 };
}

type TriangleSceneProps = {
  isHovered: boolean;
  reducedMotion: boolean;
  colorDecentral: string;
  colorEfficiency: string;
};

function TriangleScene({
  isHovered,
  reducedMotion,
  colorDecentral,
  colorEfficiency,
}: TriangleSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { v0, v1, v2 } = useMemo(() => triangleVertices(), []);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([v0, v1, v2]);
    return g;
  }, [v0, v1, v2]);

  const particleCount = reducedMotion ? 0 : 42;

  const particleData = useMemo(() => {
    if (particleCount <= 0) return null;
    const phases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      phases[i] = Math.random();
    }
    const edges: [THREE.Vector3, THREE.Vector3][] = [
      [v0, v1],
      [v1, v2],
      [v2, v0],
    ];
    return { phases, edges };
  }, [v0, v1, v2, particleCount]);

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(Math.max(particleCount, 1) * 3);
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [particleCount]);

  const gold = useMemo(() => new THREE.Color('#d4af37'), []);
  const white = useMemo(() => new THREE.Color('#ffffff'), []);
  const champagne = useMemo(() => new THREE.Color('#f0d98c'), []);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
      const rotSpeed = isHovered ? 0.04 : 0.11;
      g.rotation.z += delta * rotSpeed;
    }

    if (coreRef.current && materialRef.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 1.1) * (isHovered ? 0.03 : 0.06);
      coreRef.current.scale.setScalar(pulse);
      materialRef.current.emissiveIntensity = isHovered ? 0.35 : 0.55 + Math.sin(t * 0.9) * 0.12;
    }

    if (reducedMotion || particleCount <= 0 || !pointsRef.current || !particleData) {
      return;
    }

    const { edges, phases } = particleData;
    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const flow = isHovered ? 0.22 : 0.38;

    for (let i = 0; i < particleCount; i++) {
      const edgeIdx = i % 3;
      const [a, b] = edges[edgeIdx];
      const u = THREE.MathUtils.euclideanModulo(phases[i] + t * flow * 0.12, 1);
      _edgeSample.copy(b).sub(a).multiplyScalar(u).add(a);
      arr[i * 3] = _edgeSample.x;
      arr[i * 3 + 1] = _edgeSample.y;
      arr[i * 3 + 2] = _edgeSample.z;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 8]} intensity={0.55} color="#ffffff" />
      <directionalLight position={[-5, -3, 4]} intensity={0.25} color="#d4af37" />

      <lineLoop geometry={lineGeo}>
        <lineBasicMaterial color="#d4af37" transparent opacity={0.88} depthWrite={false} />
      </lineLoop>

      <group scale={0.985}>
        <lineLoop geometry={lineGeo}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.12} depthWrite={false} />
        </lineLoop>
      </group>

      {particleCount > 0 && (
        <points ref={pointsRef} geometry={pointsGeo}>
          <pointsMaterial
            size={0.055}
            color="#f0d98c"
            transparent
            opacity={0.55}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#0a0a0c"
          metalness={0.65}
          roughness={0.35}
          emissive={gold}
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh position={[v0.x, v0.y, v0.z]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={white} emissive={white} emissiveIntensity={0.35} metalness={0.2} roughness={0.45} />
      </mesh>
      <mesh position={[v1.x, v1.y, v1.z]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={colorDecentral}
          emissive={gold}
          emissiveIntensity={0.45}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[v2.x, v2.y, v2.z]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={colorEfficiency}
          emissive={champagne}
          emissiveIntensity={0.4}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>
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

  const colorSecurity = '#FFFFFF';
  const colorDecentral = '#D4AF37';
  const colorEfficiency = '#F0D98C';

  const stats = [
    { value: '60+%', label: '自营策略年化回报', color: colorSecurity },
    { value: '<1%', label: '自营策略历史最大回撤', color: colorDecentral },
    { value: '<5%', label: '合规基金历史最大回撤', color: colorEfficiency },
    { value: '3.5亿+', label: '全周期原生交易样本', color: colorDecentral },
  ];

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mb-20 py-16">
      <div
        className="relative w-full max-w-[700px] h-[650px] mx-auto flex items-center justify-center mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[28px] border border-white/[0.06] bg-black/20">
            <Canvas
              className="h-full w-full"
              dpr={[1, 1.75]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
              }}
              camera={{ position: [0, 0, 8.2], fov: 42, near: 0.1, far: 40 }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
              }}
            >
              <TriangleScene
                isHovered={isHovered}
                reducedMotion={reducedMotion}
                colorDecentral={colorDecentral}
                colorEfficiency={colorEfficiency}
              />
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
              <div
                className="inline-block rounded-lg border bg-black/70 px-8 py-3 backdrop-blur-xl"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <div
                  className="mb-1 text-[17px] font-semibold tracking-wider"
                  style={{ color: colorSecurity }}
                >
                  安全性
                </div>
                <div className="text-[10px] font-[var(--font-body)] uppercase tracking-[0.15em] text-white/40">
                  Security
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 text-center">
              <div
                className="inline-block rounded-lg border bg-black/70 px-8 py-3 backdrop-blur-xl"
                style={{ borderColor: 'rgba(212,175,55,0.2)' }}
              >
                <div
                  className="mb-1 text-[17px] font-semibold tracking-wider"
                  style={{ color: colorDecentral }}
                >
                  去中心化
                </div>
                <div className="text-[10px] font-[var(--font-body)] uppercase tracking-[0.15em] text-white/40">
                  Decentralization
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 text-center">
              <div
                className="inline-block rounded-lg border bg-black/70 px-8 py-3 backdrop-blur-xl"
                style={{ borderColor: 'rgba(240,217,140,0.2)' }}
              >
                <div
                  className="mb-1 text-[17px] font-semibold tracking-wider"
                  style={{ color: colorEfficiency }}
                >
                  高效性
                </div>
                <div className="text-[10px] font-[var(--font-body)] uppercase tracking-[0.15em] text-white/40">
                  Efficiency
                </div>
              </div>
            </div>
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
          突破区块链传统瓶颈，通过创新技术架构实现{' '}
          <span style={{ color: colorSecurity }} className="font-medium opacity-90">
            安全性
          </span>
          、
          <span style={{ color: colorDecentral }} className="font-medium opacity-90">
            去中心化
          </span>
          、
          <span style={{ color: colorEfficiency }} className="font-medium opacity-90">
            高效性
          </span>
          {' '}
          三者的完美统一，重新定义 Web3 资管标准
        </p>
      </motion.div>
    </div>
  );
}
