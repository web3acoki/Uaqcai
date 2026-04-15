import { ChevronRight, Globe } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { useState, useEffect } from 'react';
import { PageSection, SectionHeader, SurfaceCard, SurfacePanel } from '../components/site/PageLayout';
import { deckNarrative } from '../../content/deckPublicContent';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function Fund() {
  const [activeNode, setActiveNode] = useState<string | null>('singapore');
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [isPinned, setIsPinned] = useState(false); // 是否锁定弹窗

  // 将地理坐标转换为SVG屏幕坐标的函数
  const getScreenPosition = (coords: [number, number]) => {
    // 地图投影配置
    const scale = 170;
    const center: [number, number] = [30, 35];
    const width = 800;
    const height = 400;
    
    // 简化的Mercator投影计算
    const lambda = (coords[0] - center[0]) * (Math.PI / 180);
    const phi = coords[1] * (Math.PI / 180);
    
    const x = width / 2 + scale * lambda;
    const y = height / 2 - scale * Math.log(Math.tan(Math.PI / 4 + phi / 2));
    
    return { x, y };
  };

  // 鼠标移入节点
  const handleNodeHover = (nodeId: string, coords: [number, number]) => {
    if (!isPinned) {
      setActiveNode(nodeId);
      const pos = getScreenPosition(coords);
      setTooltipPosition({ x: pos.x, y: pos.y });
    }
  };

  // 点击节点（锁定/解锁）
  const handleNodeClick = (nodeId: string, coords: [number, number]) => {
    if (activeNode === nodeId && isPinned) {
      // 如果点击的是当前锁定的节点，解锁并关闭
      setIsPinned(false);
      setActiveNode(null);
      setTooltipPosition(null);
    } else {
      // 锁定当前节点
      setIsPinned(true);
      setActiveNode(nodeId);
      const pos = getScreenPosition(coords);
      setTooltipPosition({ x: pos.x, y: pos.y });
    }
  };

  // 鼠标移出节点
  const handleNodeLeave = () => {
    if (!isPinned) {
      setActiveNode(null);
      setTooltipPosition(null);
    }
  };

  // 节点数据配置
  const nodes = [
    { 
      id: 'us', 
      name: 'New York', 
      desc: 'TradFi 资金端', 
      coords: [-74.006, 40.7128],
      flagCode: 'us',
      licenses: [
        'SEC 注册投资顾问 (RIA)',
        'FINRA 会员资格',
        'NFA 期货牌照'
      ]
    },
    { 
      id: 'dubai', 
      name: 'Dubai', 
      desc: '合规监管中心', 
      coords: [55.2708, 25.2048],
      flagCode: 'ae',
      licenses: [
        'VARA 虚拟资产监管局牌照',
        'DFSA 金融服务牌照',
        'ADGM 资管牌照'
      ]
    },
    { 
      id: 'hk', 
      name: 'Hong Kong', 
      desc: '亚太现货基石', 
      coords: [114.1694, 22.3193],
      flagCode: 'hk',
      licenses: [
        'SFC Type 9 资管牌照',
        'SFC Type 1 证券交易牌照',
        'SFC Type 4 期货合约顾问牌照'
      ]
    },
    { 
      id: 'japan', 
      name: 'Tokyo', 
      desc: '合规做市网络', 
      coords: [139.6917, 35.6895],
      flagCode: 'jp',
      licenses: [
        'FSA 金融工具业者注册',
        'JVCEA 虚拟货币交易所协会会员',
        'JSDA 证券业协会会员'
      ]
    },
    { 
      id: 'singapore', 
      name: 'Singapore', 
      desc: 'VCC 资管总部', 
      coords: [103.8198, 1.3521],
      flagCode: 'sg',
      licenses: [
        'MAS VCC 可变资本公司架构',
        'MAS CMS 资本市场服务牌照',
        'MAS DPT 数字支付令牌服务牌照'
      ]
    },
  ];

  // 初始化显示新加坡的tooltip
  useEffect(() => {
    const singaporeNode = nodes.find(n => n.id === 'singapore');
    if (singaporeNode) {
      const pos = getScreenPosition(singaporeNode.coords);
      setTooltipPosition({ x: pos.x, y: pos.y });
    }
  }, []);

  return (
    <div className="page-shell">
      <PageSection className="pb-6">
        <SectionHeader align="center" title="合规资管引擎" subtitle="筑牢机构安全垫" />

        <div className="mb-12">
          <h3 className="font-[var(--font-body)] text-2xl mb-2 text-white">
            合规基本盘：TradFi 产品矩阵
          </h3>
          <p className="text-sm text-white/50 mb-2 font-[var(--font-body)]">
            Compliance Foundation: TradFi Product Matrix
          </p>
          <p className="text-white/60 font-[var(--font-body)]">
            以 100% 合规牌照为驱动，聚焦链下 B 端机构与老钱，承接巨量资金
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              number: '4号产品',
              title: '新加坡去中心化对冲套利',
              position: '链上套利资管基石',
              desc: '区块链原生基金，基于 ETH / SOL 公链的流动、跨链及借贷等套利',
              tag: '已稳定运行',
              colorStyle: { text: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', border: 'rgba(212, 175, 55, 0.3)' },
              featured: true,
            },
            {
              number: '11号产品',
              title: '阿联酋多币种趋势对冲基金',
              position: '高波动期货策略基金',
              desc: '部署于 Binance 交易所，主打高波动性期货策略',
              tag: '预计2026Q2',
              colorStyle: { text: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', border: 'rgba(212, 175, 55, 0.3)' },
              featured: true,
            },
            {
              number: '3号产品',
              title: '香港多策略加密现货基金',
              position: '合规现货资管底盘',
              desc: '部署于合规交易所，聚焦 CMC 前 20 标的的现货网格策略',
              tag: '已发行',
              colorStyle: { text: '#DAA520', bg: 'rgba(218, 165, 32, 0.1)', border: 'rgba(218, 165, 32, 0.3)' },
            },
            {
              number: '7号产品',
              title: '新加坡矢量分级基金',
              position: 'TradFi 溢出资金承接器',
              desc: 'VCC 基金的单一 FOF 架构，支持"优先-劣后"分级',
              tag: '已发行',
              colorStyle: { text: '#DAA520', bg: 'rgba(218, 165, 32, 0.1)', border: 'rgba(218, 165, 32, 0.3)' },
            },
            {
              number: '8号产品',
              title: '新加坡智选多策略基金',
              position: '跨资产多策略配置平台',
              desc: 'VCC 基金的混合 FOF 架构，跨界结合加密与传统证券期货衍生品',
              tag: '2026Q2',
              colorStyle: { text: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.05)', border: 'rgba(255, 255, 255, 0.15)' },
            },
            {
              number: '12号产品',
              title: '合一量投指数增强基金',
              position: '传统金融底层资管基石',
              desc: '布局 A 股、商品期货及股指期货',
              tag: '2026H2',
              colorStyle: { text: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.05)', border: 'rgba(255, 255, 255, 0.15)' },
            },
          ].map((product, i) => (
            <SurfaceCard
              key={i}
              className={`group relative flex flex-col bg-black/40 p-6 transition-all duration-500 hover:-translate-y-1 ${
                product.featured
                  ? 'border border-[var(--gold-champagne)]/60 shadow-[0_4px_20px_rgba(212,175,55,0.15)]'
                  : 'border border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-white/50">
                  {product.number}
                </span>
                <span
                  className="px-3 py-1 text-xs font-[var(--font-body)] rounded-full backdrop-blur-sm"
                  style={{
                    backgroundColor: product.colorStyle.bg,
                    color: product.colorStyle.text,
                    border: `1px solid ${product.colorStyle.border}`,
                  }}
                >
                  {product.tag}
                </span>
              </div>

              <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-[var(--gold-light)] transition-colors">
                {product.title}
              </h4>

              <p
                className="text-sm mb-4 font-medium"
                style={{ color: product.featured ? 'var(--gold-champagne)' : 'rgba(255,255,255,0.7)' }}
              >
                {product.position}
              </p>

              <p className="text-sm text-white/50 font-[var(--font-body)] leading-relaxed mb-6">
                {product.desc}
              </p>

              {product.featured && (
                <div className="mt-auto pt-4">
                  <button className="w-full py-3 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-champagne)] text-black font-semibold rounded hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    优先 RWA 映射
                  </button>
                </div>
              )}
            </SurfaceCard>
          ))}
        </div>

        <SurfacePanel className="mt-14 bg-gradient-to-br from-[var(--gold-champagne)]/6 to-black/35">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="text-2xl font-[var(--font-display)] text-[var(--gold-champagne)]">
                {deckNarrative.fundEvidence.title}
              </h3>
              <div className="mt-5 space-y-3">
                {deckNarrative.fundEvidence.highlights.map((item) => (
                  <p key={item} className="text-sm leading-relaxed text-white/72">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <SurfaceCard className="bg-black/35">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--gold-light)]">Risk Control Pillars</p>
              <ul className="mt-4 space-y-3">
                {deckNarrative.fundEvidence.riskControls.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/72">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--gold-champagne)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </div>
        </SurfacePanel>

        {/* CTA Banner */}
        <SurfacePanel className="relative mt-20 overflow-hidden bg-gradient-to-r from-[#111] to-black p-8 md:p-12">
          {/* Subtle gold accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-champagne)]/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10">
            <h4 className="text-3xl font-[var(--font-display)] mb-2 text-[var(--gold-champagne)]">
              合作渠道专属通道
            </h4>
            <p className="text-white/60 font-[var(--font-body)] text-lg">
              预约合作渠道尽调，获取《私募备忘录》及详细合规文件
            </p>
          </div>
          <button className="relative z-10 whitespace-nowrap px-8 py-4 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-champagne)] text-black font-semibold rounded hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            提交尽调申请 <ChevronRight className="inline w-4 h-4 ml-2" />
          </button>
        </SurfacePanel>

        {/* Global Network Map (Independent Row) */}
        <SurfacePanel className="relative mt-12 overflow-hidden bg-[#080808] p-10 md:p-16">
          {/* Subtle vignette / center glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />
          
          {/* Background Grid Pattern for TradFi aesthetic */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 mb-16 text-center">
            <h4 className="text-3xl font-[var(--font-display)] mb-4 text-[var(--gold-champagne)] flex items-center justify-center gap-3">
              <Globe className="w-8 h-8 opacity-80" />
              全球合规网络
            </h4>
            <p className="text-white/50 font-[var(--font-body)] max-w-2xl mx-auto text-sm tracking-wide">
              立足全球核心金融枢纽，通过 VCC 及开曼合规架构搭建连接 TradFi 与 Web3 的价值桥梁。
            </p>
          </div>
          
          {/* World Map Container */}
          <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] max-h-[500px] min-h-[300px] rounded-lg">
            
            {/* License Info Card - appears above the clicked node */}
            {activeNode && tooltipPosition && (() => {
              const selectedNode = nodes.find(n => n.id === activeNode);
              if (!selectedNode) return null;
              
              // 计算卡片位置（相对于地图容器，显示在节点上方）
              const cardWidth = 320;
              const cardHeight = 280;
              const offsetY = -cardHeight - 20; // 节点上方20px
              
              // 确保卡片不超出地图边界
              let leftPos = tooltipPosition.x - cardWidth / 2;
              if (leftPos < 10) leftPos = 10;
              if (leftPos + cardWidth > 790) leftPos = 790 - cardWidth;
              
              let topPos = tooltipPosition.y + offsetY;
              if (topPos < 10) topPos = tooltipPosition.y + 40; // 如果上方放不下，显示在下方
              
              return (
                <div 
                  className="absolute z-20 w-80 bg-black/95 backdrop-blur-xl border border-[var(--gold-champagne)]/40 rounded-xl shadow-[0_12px_48px_rgba(212,175,55,0.25)] p-6 animate-fade-in-up pointer-events-none"
                  style={{
                    left: `${(leftPos / 800) * 100}%`,
                    top: `${(topPos / 400) * 100}%`,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <img 
                      src={`https://flagcdn.com/w80/${selectedNode.flagCode}.png`}
                      alt={selectedNode.name}
                      className="w-12 h-8 object-cover rounded border border-white/20 shadow-md"
                    />
                    <div>
                      <h5 className="text-lg text-[var(--gold-champagne)] font-semibold">
                        {selectedNode.name}
                      </h5>
                      <p className="text-xs text-white/60 font-[var(--font-body)]">{selectedNode.desc}</p>
                    </div>
                  </div>

                  {/* Licenses */}
                  <div>
                    <h6 className="text-xs text-white/40 font-[var(--font-body)] uppercase tracking-wider mb-3">
                      监管牌照 / Licenses
                    </h6>
                    <ul className="space-y-2.5">
                      {selectedNode.licenses.map((license, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-[var(--gold-champagne)] flex-shrink-0 shadow-[0_0_6px_var(--gold-champagne)]" />
                          <span className="text-sm text-white/80 font-[var(--font-body)] leading-relaxed">
                            {license}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Close hint */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-white/30 font-[var(--font-body)] text-center tracking-wider">
                      点击节点关闭 / Click node to close
                    </p>
                  </div>
                  
                  {/* Pointer arrow */}
                  <div 
                    className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[var(--gold-champagne)]/40"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: topPos < tooltipPosition.y ? 'auto' : '-8px',
                      top: topPos < tooltipPosition.y ? '-8px' : 'auto',
                      rotate: topPos < tooltipPosition.y ? '180deg' : '0deg'
                    }}
                  />
                </div>
              );
            })()}
            
            <div className="absolute inset-0 pointer-events-none">
              <ComposableMap 
                projection="geoMercator" 
                projectionConfig={{ scale: 170, center: [30, 35], rotate: [0, 0, 0] }} 
                style={{ width: "100%", height: "100%" }}
                width={800}
                height={400}
              >
                <defs>
                  <linearGradient id="goldCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--gold-champagne)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="var(--gold-champagne)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--gold-champagne)" stopOpacity="0.2" />
                  </linearGradient>
                  
                  <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="var(--gold-champagne)"
                        fillOpacity={0.08}
                        stroke="var(--gold-champagne)"
                        strokeWidth={0.6}
                        strokeOpacity={0.4}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fillOpacity: 0.15 },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Connections via Great Circle Lines */}
                <Line
                  from={[-74.006, 40.7128]}
                  to={[55.2708, 25.2048]}
                  stroke="url(#goldCurveGrad)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  style={{ opacity: 0.8 }}
                />
                <Line
                  from={[55.2708, 25.2048]}
                  to={[114.1694, 22.3193]}
                  stroke="url(#goldCurveGrad)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  style={{ opacity: 0.8 }}
                />
                <Line
                  from={[114.1694, 22.3193]}
                  to={[103.8198, 1.3521]}
                  stroke="var(--gold-champagne)"
                  strokeWidth={1.5}
                  strokeDasharray="3 5"
                  style={{ opacity: 0.5 }}
                />
                <Line
                  from={[114.1694, 22.3193]}
                  to={[139.6917, 35.6895]}
                  stroke="url(#goldCurveGrad)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  style={{ opacity: 0.8 }}
                />

                {/* Hub Nodes */}
                {nodes.map((node) => {
                  const isActive = activeNode === node.id;
                  return (
                  <Marker key={node.id} coordinates={node.coords as [number, number]}>
                    <g 
                      className="cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                      onClick={() => handleNodeClick(node.id, node.coords)}
                      onMouseEnter={() => handleNodeHover(node.id, node.coords)}
                      onMouseLeave={handleNodeLeave}
                    >
                      {/* Invisible Click Area (covers ripple range) */}
                      <circle 
                        r={24} 
                        fill="transparent"
                        className="cursor-pointer"
                      />
                      
                      {/* Animated Ripples (enhanced when active) */}
                      <g className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="0" cy="0" r="0" fill="none" stroke="var(--gold-champagne)" strokeWidth={1.5}>
                          <animate attributeName="r" from="4" to="24" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="0" cy="0" r="0" fill="none" stroke="var(--gold-champagne)" strokeWidth={1.5}>
                          <animate attributeName="r" from="4" to="24" dur="2s" begin="1s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="1" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
                        </circle>
                      </g>
                      
                      {/* Core Dot with Glow Filter and Scale Animation */}
                      <circle 
                        r={4} 
                        fill="var(--gold-champagne)" 
                        filter="url(#goldGlow)"
                        className={`transition-transform duration-500 origin-center ${isActive ? 'scale-[2.5]' : 'scale-100'}`}
                        style={{ transformBox: 'fill-box' }}
                      />
                      
                      {/* Labels with enhanced styling when active */}
                      <text
                        textAnchor="middle"
                        y={24}
                        className={`font-[var(--font-display)] fill-[var(--gold-champagne)] transition-all duration-500 ${
                          isActive ? 'text-[14px] font-bold' : 'text-[11px]'
                        }`}
                        style={{ letterSpacing: '0.05em', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                      >
                        {node.name}
                      </text>
                      <text
                        textAnchor="middle"
                        y={36}
                        className={`font-[var(--font-body)] transition-all duration-500 ${
                          isActive ? 'text-[9px] fill-white/90' : 'text-[7px] fill-white/60'
                        }`}
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                      >
                        {node.desc}
                      </text>
                    </g>
                  </Marker>
                );
                })}
              </ComposableMap>
            </div>
          </div>
          
          {/* Status Footer */}
          <div className="mt-8 pt-6 border-t border-[var(--gold-champagne)]/10 flex items-center justify-between text-xs font-[var(--font-body)]">
            <div className="flex items-center gap-3 text-white/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--gold-champagne)] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--gold-champagne)]/80"></span>
              </span>
              <span className="tracking-[0.2em] uppercase text-[10px]">Global Compliance Network</span>
            </div>
            <div className="text-[var(--gold-champagne)]/50 tracking-[0.2em] font-[var(--font-display)] text-[10px]">
              EST. 2024
            </div>
          </div>
        </SurfacePanel>

        <SurfacePanel className="mt-12">
          <h3 className="text-2xl font-[var(--font-display)] text-[var(--gold-champagne)]">尽调流程说明</h3>
          <p className="mt-2 text-sm text-white/64">
            面向机构与渠道合作方，以下为公开版对接流程。具体合规要求将根据司法辖区与业务类型确认。
          </p>
          <div className="mt-8 grid gap-[var(--grid-gap)] md:grid-cols-4">
            {deckNarrative.dueDiligenceFlow.map((item) => (
              <SurfaceCard key={item.step} className="bg-black/30">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--gold-light)]">{item.step}</p>
                <h4 className="mt-2 text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/66">{item.desc}</p>
              </SurfaceCard>
            ))}
          </div>
        </SurfacePanel>
      </PageSection>
    </div>
  );
}