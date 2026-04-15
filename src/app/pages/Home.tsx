import { useNavigate } from 'react-router';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { ImpossibleTriangle } from '../components/ImpossibleTriangle';

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[calc(100vh-128px)] flex items-center justify-center -mt-8 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--deep-black)] via-[#0a0a0a] to-[var(--deep-black)]" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(var(--gold-champagne) 1px, transparent 1px),
                                linear-gradient(90deg, var(--gold-champagne) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Column: Digital Yin-Yang Balance Board */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center animate-fade-in-up">
            
            {/* Balance Board Container with 3D Perspective */}
            <div 
              className="relative w-full max-w-[480px] aspect-square group"
              style={{ perspective: '1200px' }}
            >
              
              {/* 3D Transform Container */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[40px] transition-transform duration-1000 group-hover:-translate-y-2 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background layer with overflow hidden for the blur and borders */}
                <div className="absolute inset-0 rounded-[40px] border border-[var(--gold-champagne)]/20 shadow-[0_0_60px_rgba(235,213,169,0.05)] bg-black/40 backdrop-blur-2xl overflow-hidden group-hover:shadow-[0_0_80px_rgba(235,213,169,0.15)] group-hover:border-[var(--gold-champagne)]/40 transition-all duration-1000">
                  
                  {/* Simple elegant gradient background */}
                  <div className="absolute inset-0 bg-gradient-radial from-[var(--gold-champagne)]/10 via-transparent to-transparent" />
                  
                  {/* Subtle animated glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--gold-champagne)]/5 rounded-full blur-3xl animate-pulse" />
                </div>

                {/* Floating Interactive Elements (TranslateZ for 3D effect) */}
                <div 
                  className="absolute inset-0 flex transition-transform duration-1000 ease-out group-hover:[transform:rotateX(8deg)_rotateY(-8deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Left Half (Yin) */}
                  <div 
                    className="relative z-20 w-1/2 h-full flex flex-col items-center justify-center p-6 transition-transform duration-1000" 
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <button
                      onClick={() => navigate('/fund')}
                      className="relative w-full aspect-square max-w-[160px] rounded-full group/btn flex flex-col items-center justify-center gap-4 transition-all duration-700 hover:scale-105"
                    >
                      {/* 3D Button Background */}
                      <div className="absolute inset-0 rounded-full border border-[var(--gold-dark)]/40 bg-gradient-to-br from-[var(--gold-dark)]/20 to-black/80 shadow-[inset_0_0_30px_rgba(184,134,11,0.1),0_15px_30px_rgba(0,0,0,0.6)] group-hover/btn:shadow-[inset_0_0_50px_rgba(184,134,11,0.3),0_20px_40px_rgba(184,134,11,0.4)] group-hover/btn:border-[var(--gold-dark)] transition-all duration-700 backdrop-blur-md" />
                      
                      <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold-dark)]/40 to-black/60 border border-[var(--gold-dark)]/50 flex items-center justify-center text-[var(--gold-dark)] shadow-[0_0_20px_rgba(184,134,11,0.3)] group-hover/btn:scale-110 transition-transform duration-500">
                        <Zap className="w-6 h-6" />
                      </div>
                      <span className="relative z-10 text-white font-[var(--font-body)] font-medium text-[15px] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">探索基金产品</span>
                    </button>
                  </div>

                  {/* Right Half (Yang) */}
                  <div 
                    className="relative z-20 w-1/2 h-full flex flex-col items-center justify-center gap-8 p-6 transition-transform duration-1000" 
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <button
                      onClick={() => navigate('/rwafi')}
                      className="relative w-full h-[110px] max-w-[170px] rounded-[24px] group/btn flex flex-col items-center justify-center gap-3 transition-all duration-700 hover:scale-105"
                    >
                      <div className="absolute inset-0 rounded-[24px] border border-[var(--gold-champagne)]/30 bg-gradient-to-br from-[var(--gold-champagne)]/10 to-black/90 shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.6)] group-hover/btn:shadow-[inset_0_2px_20px_rgba(235,213,169,0.2),0_20px_40px_rgba(235,213,169,0.3)] group-hover/btn:border-[var(--gold-champagne)]/60 transition-all duration-700 backdrop-blur-md" />
                      
                      <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold-champagne)]/30 to-black/60 border border-[var(--gold-champagne)]/40 flex items-center justify-center text-[var(--gold-champagne)] shadow-[0_0_15px_rgba(235,213,169,0.2)] group-hover/btn:scale-110 transition-transform duration-500">
                        <Shield className="w-5 h-5" />
                      </div>
                      <span className="relative z-10 text-white font-[var(--font-body)] font-medium text-[14px] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">了解 RWAFi</span>
                    </button>

                    <button
                      onClick={() => navigate('/rwafi')}
                      className="relative w-full h-[110px] max-w-[170px] rounded-[24px] group/btn flex flex-col items-center justify-center gap-3 transition-all duration-700 hover:scale-105"
                    >
                      <div className="absolute inset-0 rounded-[24px] border border-[var(--gold-light)]/30 bg-gradient-to-br from-[var(--gold-light)]/10 to-black/90 shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.6)] group-hover/btn:shadow-[inset_0_2px_20px_rgba(218,165,32,0.2),0_20px_40px_rgba(218,165,32,0.3)] group-hover/btn:border-[var(--gold-light)]/60 transition-all duration-700 backdrop-blur-md" />
                      
                      <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold-light)]/30 to-black/60 border border-[var(--gold-light)]/40 flex items-center justify-center text-[var(--gold-light)] shadow-[0_0_15px_rgba(218,165,32,0.2)] group-hover/btn:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="relative z-10 text-white font-[var(--font-body)] font-medium text-[14px] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">智赢先知预测</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Statement (Below Balance Board) */}
            <div className="mt-14 text-center max-w-[420px] px-6 relative z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-champagne)]/50 to-transparent mb-6" />
              <p className="text-[14px] leading-relaxed font-[var(--font-body)] text-white/70 relative pt-5">
                <span className="absolute -left-2 top-0 text-[var(--gold-champagne)] opacity-30 text-4xl font-[var(--font-heading)] leading-none">"</span>
                <span className="text-[var(--gold-champagne)] font-semibold block mb-3 tracking-[0.2em] uppercase text-xs">愿景赋能</span>
                通过 UAQC 最佳实践，以金融科技赋能现实世界资产，共建开放的 <span className="text-white font-medium">RWAFi</span> 产业生态
                <span className="absolute -right-2 bottom-0 text-[var(--gold-champagne)] opacity-30 text-4xl font-[var(--font-heading)] leading-none rotate-180">"</span>
              </p>
            </div>

          </div>

          {/* Right Column: Title & Subtitle */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold-champagne)]/20 bg-gradient-to-r from-[var(--gold-champagne)]/10 to-transparent text-[var(--gold-champagne)] text-[13px] tracking-widest font-[var(--font-body)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-champagne)] animate-pulse" />
              WEB3 资管引擎枢纽
            </div>

            <h1
              className="font-[var(--font-display)] mb-6 leading-[1.1] tracking-wide"
              style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                color: 'var(--gold-champagne)',
              }}
            >
              全球领先的<br />
              <span className="text-white">合规去中心化</span><br />
              AI 资管引擎
            </h1>

            <div className="w-24 h-[2px] bg-gradient-to-r from-[var(--gold-champagne)] to-transparent mb-6 opacity-50" />

            <h2 className="font-[var(--font-body)] text-xl md:text-2xl mb-10 text-white/80 font-light tracking-wide">
              重塑资本主权，定义 Web3 资管枢纽
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-[var(--font-body)] text-[13px] tracking-widest text-white/40">
              <span className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[var(--gold-light)] shadow-[0_0_8px_var(--gold-light)]" />
                AI 驱动 ALPHA
              </span>
              <span className="hidden sm:block text-white/20">|</span>
              <span className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[var(--gold-champagne)] shadow-[0_0_8px_var(--gold-champagne)]" />
                WEB3 飞轮价值
              </span>
            </div>
          </div>
          
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm">
            <div className="w-1 h-1.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Moat Section */}
      <section className="py-24 bg-gradient-to-b from-[var(--deep-black)] to-[var(--space-gray)]">
        <div className="max-w-7xl mx-auto px-8">
          <h3
            className="text-center font-[var(--font-display)] text-4xl mb-12"
            style={{ color: 'var(--gold-champagne)' }}
          >
            突破"不可能三角"
          </h3>

          {/* 3D Impossible Triangle */}
          <ImpossibleTriangle />

          {/* Moat Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: '通信级架构',
                desc: '来自华为、中兴骨干，保障毫秒级低延迟',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: '百亿量化血统',
                desc: '源自幻方量化等头部私募的算法专家',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: '跨周期商业大脑',
                desc: '10+ 年经验及 IPO 操盘背景的合规领袖',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group p-8 bg-gradient-to-br from-black/60 to-[var(--muted-gray)]/40 border border-white/10 rounded-xl hover:border-[var(--gold-champagne)]/50 transition-all duration-500 hover:scale-105"
              >
                <div className="mb-4 text-[var(--gold-champagne)] group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-[var(--font-body)] font-semibold mb-3 text-white">
                  {card.title}
                </h4>
                <p className="text-white/60 font-[var(--font-body)] text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}