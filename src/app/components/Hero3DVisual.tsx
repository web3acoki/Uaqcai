import React from 'react';

export function Hero3DVisual() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" data-version="2.0">
      {/* 3D Rotating Rings System - Pure CSS Implementation */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
        
        {/* Outer Ring */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full border-2 border-[var(--gold-champagne)]/20 animate-[spin_20s_linear_infinite]"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) rotateY(30deg)',
            boxShadow: '0 0 40px rgba(255,199,100,0.12), inset 0 0 40px rgba(255,199,100,0.06)'
          }}
        />
        
        {/* Middle Ring */}
        <div 
          className="absolute w-[320px] h-[320px] rounded-full border-2 border-[var(--gold-light)]/30 animate-[spin_15s_linear_infinite_reverse]"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(45deg) rotateY(60deg)',
            boxShadow: '0 0 30px rgba(245,166,35,0.16), inset 0 0 30px rgba(245,166,35,0.09)'
          }}
        />
        
        {/* Inner Ring */}
        <div 
          className="absolute w-[240px] h-[240px] rounded-full border-2 border-[var(--gold-dark)]/40 animate-[spin_12s_linear_infinite]"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(30deg) rotateY(90deg)',
            boxShadow: '0 0 25px rgba(184,134,11,0.2), inset 0 0 25px rgba(184,134,11,0.1)'
          }}
        />

        {/* Core Sphere */}
        <div 
          className="absolute w-32 h-32 rounded-full bg-gradient-radial from-[var(--gold-champagne)]/20 via-[var(--gold-dark)]/10 to-transparent animate-pulse"
          style={{ 
            boxShadow: '0 0 60px rgba(255,199,100,0.32), inset 0 0 40px rgba(245,166,35,0.22)'
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * -20;
          const x = (Math.random() - 0.5) * 500;
          const y = (Math.random() - 0.5) * 500;
          
          return (
            <div
              key={i}
              className="absolute rounded-full bg-[var(--gold-champagne)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: '50%',
                top: '50%',
                marginLeft: `${x}px`,
                marginTop: `${y}px`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                boxShadow: `0 0 ${size * 3}px rgba(255,199,100,0.62)`
              }}
            />
          );
        })}
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--gold-light)]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--gold-dark)]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) scale(0.9);
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}