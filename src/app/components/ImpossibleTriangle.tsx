import { motion } from 'motion/react';
import { useState } from 'react';

export function ImpossibleTriangle() {
  const [isHovered, setIsHovered] = useState(false);

  // High-end luxury color palette
  const colorSecurity = '#FFFFFF';      // Pure Platinum / White
  const colorDecentral = '#D4AF37';     // Champagne Gold
  const colorEfficiency = '#F0D98C';    // Light Champagne Gold

  const stats = [
    { value: '60+%', label: '自营策略年化回报', color: colorSecurity },
    { value: '<1%', label: '自营策略历史最大回撤', color: colorDecentral },
    { value: '<5%', label: '合规基金历史最大回撤', color: colorEfficiency },
    { value: '3.5亿+', label: '全周期原生交易样本', color: colorDecentral },
  ];

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mb-20 py-16">
      {/* Center 3D Triangle Container */}
      <div 
        className="relative w-full max-w-[700px] h-[650px] mx-auto flex items-center justify-center mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle Background Glow */}
        <div 
          className="absolute inset-0 opacity-10 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colorDecentral}, transparent 60%)`,
          }}
        />

        {/* 3D Perspective Container */}
        <div 
          className="relative w-full h-full"
          style={{ perspective: '1800px', perspectiveOrigin: '50% 50%' }}
        >
          {/* 3D Triangle Structure */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px]"
            style={{ 
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateY: isHovered ? 0 : [0, 360],
              rotateX: [5, -5, 5],
            }}
            transition={{
              rotateY: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
              rotateX: {
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            }}
          >
            {/* Triangle Edge 1: Top to Bottom-Left */}
            <div 
              className="absolute w-[1.5px] h-[390px] origin-bottom"
              style={{
                transformStyle: 'preserve-3d',
                background: `linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(212,175,55,0.6))`,
                boxShadow: `0 0 12px rgba(255,255,255,0.15)`,
                transform: 'translate(225px, 30px) rotateZ(120deg)',
                left: '0',
                top: '0',
              }}
            />

            {/* Triangle Edge 2: Top to Bottom-Right */}
            <div 
              className="absolute w-[1.5px] h-[390px] origin-bottom"
              style={{
                transformStyle: 'preserve-3d',
                background: `linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(240,217,140,0.6))`,
                boxShadow: `0 0 12px rgba(240,217,140,0.15)`,
                transform: 'translate(225px, 30px) rotateZ(60deg)',
                left: '0',
                top: '0',
              }}
            />

            {/* Triangle Edge 3: Bottom-Left to Bottom-Right */}
            <div 
              className="absolute origin-center"
              style={{
                transformStyle: 'preserve-3d',
                background: `linear-gradient(to right, rgba(212,175,55,0.6), rgba(240,217,140,0.6))`,
                boxShadow: `0 0 12px rgba(212,175,55,0.15)`,
                transform: 'translate(30px, 367px)',
                left: '0',
                top: '0',
                width: '390px',
                height: '1.5px',
              }}
            />

            {/* Vertex 1: Top - Security */}
            <motion.div 
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: colorSecurity,
                transformStyle: 'preserve-3d',
                boxShadow: `0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.2)`,
                transform: 'translate(219px, 24px)',
                left: '0',
                top: '0',
              }}
              animate={{
                boxShadow: [
                  `0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.2)`,
                  `0 0 25px rgba(255,255,255,0.8), 0 0 50px rgba(255,255,255,0.3)`,
                  `0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.2)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Vertex 2: Bottom-Left - Decentralization */}
            <motion.div 
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: colorDecentral,
                transformStyle: 'preserve-3d',
                boxShadow: `0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.2)`,
                transform: 'translate(24px, 361px)',
                left: '0',
                top: '0',
              }}
              animate={{
                boxShadow: [
                  `0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.2)`,
                  `0 0 25px rgba(212,175,55,0.8), 0 0 50px rgba(212,175,55,0.3)`,
                  `0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.2)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />

            {/* Vertex 3: Bottom-Right - Efficiency */}
            <motion.div 
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: colorEfficiency,
                transformStyle: 'preserve-3d',
                boxShadow: `0 0 20px rgba(240,217,140,0.6), 0 0 40px rgba(240,217,140,0.2)`,
                transform: 'translate(414px, 361px)',
                left: '0',
                top: '0',
              }}
              animate={{
                boxShadow: [
                  `0 0 20px rgba(240,217,140,0.6), 0 0 40px rgba(240,217,140,0.2)`,
                  `0 0 25px rgba(240,217,140,0.8), 0 0 50px rgba(240,217,140,0.3)`,
                  `0 0 20px rgba(240,217,140,0.6), 0 0 40px rgba(240,217,140,0.2)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />

            {/* Central Energy Core */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
              style={{
                transformStyle: 'preserve-3d',
                background: `radial-gradient(circle at 35% 35%, rgba(212,175,55,0.4), rgba(0,0,0,0.95))`,
                border: `1px solid rgba(212,175,55,0.3)`,
                boxShadow: `0 0 30px rgba(212,175,55,0.2), inset 0 0 20px rgba(235,213,169,0.15)`,
              }}
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  `0 0 30px rgba(212,175,55,0.2), inset 0 0 20px rgba(235,213,169,0.15)`,
                  `0 0 40px rgba(212,175,55,0.3), inset 0 0 25px rgba(235,213,169,0.25)`,
                  `0 0 30px rgba(212,175,55,0.2), inset 0 0 20px rgba(235,213,169,0.15)`,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner Glow */}
              <motion.div
                className="absolute inset-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(212,175,55,0.6), transparent)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Fixed Label - Security (Top) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-10">
            <div 
              className="inline-block px-8 py-3 bg-black/70 backdrop-blur-xl rounded-lg border"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <div 
                className="text-[17px] font-[var(--font-body)] font-semibold tracking-wider mb-1"
                style={{ color: colorSecurity }}
              >
                安全性
              </div>
              <div className="text-[10px] text-white/40 font-[var(--font-body)] uppercase tracking-[0.15em]">
                Security
              </div>
            </div>
          </div>

          {/* Fixed Label - Decentralization (Bottom Left) */}
          <div className="absolute bottom-0 left-0 text-center z-10">
            <div 
              className="inline-block px-8 py-3 bg-black/70 backdrop-blur-xl rounded-lg border"
              style={{ borderColor: 'rgba(212,175,55,0.2)' }}
            >
              <div 
                className="text-[17px] font-[var(--font-body)] font-semibold tracking-wider mb-1"
                style={{ color: colorDecentral }}
              >
                去中心化
              </div>
              <div className="text-[10px] text-white/40 font-[var(--font-body)] uppercase tracking-[0.15em]">
                Decentralization
              </div>
            </div>
          </div>

          {/* Fixed Label - Efficiency (Bottom Right) */}
          <div className="absolute bottom-0 right-0 text-center z-10">
            <div 
              className="inline-block px-8 py-3 bg-black/70 backdrop-blur-xl rounded-lg border"
              style={{ borderColor: 'rgba(240,217,140,0.2)' }}
            >
              <div 
                className="text-[17px] font-[var(--font-body)] font-semibold tracking-wider mb-1"
                style={{ color: colorEfficiency }}
              >
                高效性
              </div>
              <div className="text-[10px] text-white/40 font-[var(--font-body)] uppercase tracking-[0.15em]">
                Efficiency
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Below */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
          >
            <div className="relative p-8 bg-black/40 border rounded-xl backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:bg-black/50"
                 style={{
                   borderColor: `${stat.color}15`,
                 }}
            >
              {/* Top accent bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
                style={{ 
                  background: `linear-gradient(to right, transparent, ${stat.color}80, transparent)`,
                }}
              />

              <div className="text-center">
                <div
                  className="text-5xl font-[var(--font-display)] mb-4 transition-all duration-300"
                  style={{ 
                    color: stat.color,
                    textShadow: `0 0 15px ${stat.color}30`,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[13px] font-[var(--font-body)] text-white/50 leading-relaxed tracking-wide">
                  {stat.label}
                </div>
              </div>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Description */}
      <motion.div
        className="text-center max-w-[700px] mx-auto mt-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-[15px] font-[var(--font-body)] text-white/50 leading-[1.8]">
          突破区块链传统瓶颈，通过创新技术架构实现{' '}
          <span style={{ color: colorSecurity }} className="font-medium opacity-90">安全性</span>、
          <span style={{ color: colorDecentral }} className="font-medium opacity-90">去中心化</span>、
          <span style={{ color: colorEfficiency }} className="font-medium opacity-90">高效性</span>
          {' '}三者的完美统一，重新定义 Web3 资管标准
        </p>
      </motion.div>
    </div>
  );
}
