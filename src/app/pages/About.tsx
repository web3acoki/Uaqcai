import { ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GlassReveal } from '../components/site/GlassReveal';

const LICENSE_IMAGE_SRCS = [
  '/assets/image/1.png',
  '/assets/image/2.png',
  '/assets/image/3.png',
  '/assets/image/4.png',
  '/assets/image/5.png',
  '/assets/image/6.png',
  '/assets/image/CMS100143.png',
  '/assets/image/CMS101383.png',
  '/assets/image/COLORADO.png',
  '/assets/image/FINCEN.png',
];

const TEAM_IMAGE_SRCS = [
  '/assets/image/Echo Zeng.png',
  '/assets/image/Calvin xu.png',
  '/assets/image/Ho Kar Loong, Kenneth.png',
  '/assets/image/wenna sun.jpg',
  '/assets/image/MAX GOH.png',
  '/assets/image/Kelvin Tan.png',
];

export function About() {
  const [activeLicense, setActiveLicense] = useState<{ title: string; code: string; imageSrc: string } | null>(null);

  const licenses = useMemo(
    () =>
      LICENSE_IMAGE_SRCS.map((imageSrc, i) => ({
        title: [
          '开曼群岛 SPC 注册证书 (HYC FO SPC)',
          'BVI 公司注册证书 (HYC FO Limited)',
          'BVI 批准投资管理人证书 (HYC FO Limited)',
          '香港证监会第 4/9 类牌照 (Sinohope AM HK)',
          '新加坡金管局主要支付机构牌照 (DTC)',
          '开曼群岛互惠基金注册证书 (HYC FO SPC)',
          '新加坡金管局资本市场服务牌照 (CMS100143)',
          '新加坡金管局资本市场服务牌照 (CMS101383)',
          '科罗拉多州非营利组织注册证书',
          'FinCEN MSB 注册证书',
        ][i],
        code: [
          '多组合/多策略 SPC 架构，资产与负债法定隔离',
          'BVI 商业公司架构，用于全球持股与投资融资',
          '获 BVI 监管框架许可提供投资与基金管理服务',
          '证券咨询 + 资产管理服务',
          '账户发行、汇款、商户收单、电子货币及数字支付代币服务',
          'CIMA 监管框架下注册的互惠基金架构',
          '基金管理服务',
          '基金管理服务',
          '在科罗拉多州州务卿监管框架下注册为非营利法人',
          '在美国财政部 FinCEN 注册为货币服务企业 (MSB)',
        ][i],
        imageSrc,
      })),
    [],
  );

  const team = useMemo(
    () =>
      TEAM_IMAGE_SRCS.map((imageSrc, i) => ({
        name: ['Echo Zeng', 'Calvin Xu', 'Ho Kar Loong, Kenneth', '孙文娜', 'MAX GOH', 'Kelvin Tan'][i],
        role: [
          '联合创始人兼 UAQC Oracle CEO',
          '联合创始人兼首席技术官',
          '负责人员',
          '创始合伙人兼负责人员',
          '投资经理',
          '投资经理',
        ][i],
        bio: [
          '标准化增长专家，拥有中山大学经管专业学士、硕士及美国 MBA 学位。曾陪伴 3 家科技独角兽跨越 IPO，具备花旗银行及金融机构执业背景。Echo 融合了严谨的逻辑思维与极致的商业转化力，深耕 Web3 与社会融资赛道，擅长品牌建设，构建高效的成交转化体系与品牌护城河。',
          '十余年金融市场投资经验，专注虚拟资产二级市场量化策略框架构建与开发。精通 CTA 策略、稳定套利策略及高频套利策略。曾任华为技术 PM、中兴 RCD、火彩投资 ID，现任合一量化投资加密资产管理有限公司 CTO。哈尔滨工业大学航天硕士。',
          '15 年以上金融经历，现任卓越成功投资有限公司董事及 RO。持有香港证监会第 1、2 号牌照（CE：AN703），精通环球证券、期货及期权交易监管。曾任职于东亚证券第一上海证券，擅长高净值客户产品培训与团队合规管理。',
          '南京大学会计硕士及哈尔滨工业大学学士。近 10 年资深投资实战经验，现任广州梵熙创投创始合伙人。具备中国内地基金证券及香港证监会 (SFC) 负责人员 (RO) 双重执业资质。精通募投管退全流程运作，主导的投资矩阵曾捕获泡泡玛特（实现百倍增值）、moodytiger、端木良锦等知名独角兽项目，是兼具产业眼光与深度风控能力的实战派投资人。',
          '16 年风险投资与并购经验，拥有多个创业并亏为盈及 IPO 退出成功案例。Meyzer 集团领袖，管理亚洲及美国 20 余家投资项目，具备卓越的资本运作能力。新加坡文化部杰出艺术赞助人，长期出任新加坡儿童协会大使，深耕慈善公益。',
          '毕业于新加坡国立大学 (NUS)。2017 年 6 月加入 Duquesne，成为 Duquesne 亚洲股票团队成员。现任 Duquesne 多元化农业基金全球上市股票子组合投资组合经理，并担任越南凤凰基金 (VPF) 投资组合经理。',
        ][i],
        initials: ['EZ', 'CX', 'HK', 'SW', 'MG', 'KT'][i],
        imageSrc,
      })),
    [],
  );

  useEffect(() => {
    if (!activeLicense) return;
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveLicense(null);
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [activeLicense]);

  useEffect(() => {
    const allImageSources = [...LICENSE_IMAGE_SRCS, ...TEAM_IMAGE_SRCS];

    allImageSources.forEach((src) => {
      const image = new Image();
      image.onload = () => {
        image.onload = null;
        image.onerror = null;
      };
      image.onerror = () => {
        console.warn(`[About] Missing image asset: ${src}`);
        image.onload = null;
        image.onerror = null;
      };
      image.src = src;
    });
  }, []);

  return (
    <section className="section-shell min-h-screen bg-transparent">
      <div className="page-container">
        <div className="mb-16 text-center">
          <span className="brand-kicker mb-4">
            <span className="brand-dot" />
            Investor Relations
          </span>
          <h2 className="section-heading mb-4">
            投资者关系
          </h2>
          <p className="section-subheading font-[var(--font-body)]">
            通往百亿估值的价值桥梁
          </p>
        </div>

        {/* Compliance & Licenses */}
        <div className="mb-20">
          <h3 className="content-block-title mb-8 text-center">
            合规与审计墙
          </h3>

          <div className="panel-grid mb-8 md:grid-cols-4">
            {[
              { name: '香港 SFC', license: '4/9 号牌照' },
              { name: '新加坡 MAS', license: 'MPI/DPT/CMS' },
              { name: 'BVI', license: 'AM 牌照' },
              { name: '美国', license: 'MSB 牌照' },
            ].map((item, i) => (
              <GlassReveal
                key={i}
                variant="muted"
                interactive
                className="panel-card rounded-[var(--radius-card)] p-6 text-center transition-all hover:border-[var(--line-gold)]"
              >
                <div className="mb-2 text-lg font-semibold text-white">{item.name}</div>
                <div className="text-sm text-[var(--gold-champagne)]">{item.license}</div>
              </GlassReveal>
            ))}
          </div>

          <div className="text-center text-sm text-white/60 font-[var(--font-body)]">
            <p>实体架构：开曼 SPC + 新加坡 VCC/香港 OFC</p>
            <p className="mt-2">顶级律所：Ogier · 审计：Berman Fisher</p>
          </div>
        </div>

        {/* Licenses Gallery */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h3 className="content-block-title mb-3">牌照与证书展示</h3>
            <p className="text-sm text-white/60 font-[var(--font-body)]">
              核心牌照与合规证书可点击查看大图细节
            </p>
          </div>

          <div className="panel-grid md:grid-cols-5">
            {licenses.map((license) => (
              <GlassReveal
                key={license.imageSrc}
                interactive
                className="panel-card group cursor-pointer rounded-[var(--radius-card)] p-4 transition-all hover:-translate-y-1"
                onClick={() => setActiveLicense(license)}
              >
                <div className="mb-3 overflow-hidden rounded-lg border border-white/10 bg-black/30 p-2">
                  <ImageWithFallback
                    src={license.imageSrc}
                    alt={license.title}
                    className="h-28 w-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-white">{license.title}</h4>
                  <p className="mt-1 text-xs text-[var(--gold-champagne)]">{license.code}</p>
                </div>
              </GlassReveal>
            ))}
          </div>
        </div>

        {/* Capital Roadmap */}
        <div className="mb-20">
          <h3 className="content-block-title mb-12 text-center">
            资本进阶路线图
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gold-champagne)]/20 via-[var(--gold-champagne)] to-[var(--gold-champagne)]/20" />

            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  year: '2026',
                  title: '启动期',
                  desc: '天使轮与种子轮完成，奠定生态基石',
                  color: 'gold-light',
                },
                {
                  year: '2027',
                  title: '放量期',
                  desc: '启动 VC/PE 轮，打通 DEX 与 CEX 流动性，AUM 爆发',
                  color: 'gold-champagne',
                },
                {
                  year: '2028',
                  title: '收官期',
                  desc: '冲刺 AUM $10 亿+，实现 Nasdaq IPO/RTO，释放 50X+ 证券化溢价',
                  color: 'gold-dark',
                },
              ].map((stage, i) => (
                <div key={i} className="relative text-center">
                  <div
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-4 bg-black relative z-10"
                    style={{ borderColor: `var(--${stage.color})` }}
                  >
                    <div
                      className="text-2xl font-[var(--font-display)] font-bold"
                      style={{ color: `var(--${stage.color})` }}
                    >
                      {stage.year}
                    </div>
                  </div>
                  <h4 className="text-xl font-[var(--font-body)] font-semibold mb-3 text-white">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-white/60 font-[var(--font-body)] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Algorithm Model */}
        <div className="panel-card mb-20 rounded-[var(--radius-panel)] p-8">
          <h3 className="content-block-title mb-6 text-center">
            三维算力分配模型
          </h3>
          <div className="text-center">
            <div className="inline-block p-6 bg-black/40 border border-[var(--gold-champagne)]/30 rounded-xl">
              <p className="text-lg font-[var(--font-body)] text-white/80 mb-4">
                算力权重 =
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-white/90 font-[var(--font-body)]">
                <span className="px-4 py-2 bg-[var(--gold-light)]/20 border border-[var(--gold-light)]/40 rounded-lg">
                  时间因子 (早鸟溢价)
                </span>
                <span className="text-2xl" style={{ color: 'var(--gold-champagne)' }}>×</span>
                <span className="px-4 py-2 bg-[var(--gold-champagne)]/20 border border-[var(--gold-champagne)]/40 rounded-lg">
                  规模因子 (鼓励机构)
                </span>
                <span className="text-2xl" style={{ color: 'var(--gold-champagne)' }}>×</span>
                <span className="px-4 py-2 bg-[var(--gold-dark)]/20 border border-[var(--gold-dark)]/40 rounded-lg">
                  存续因子 (锁定长效)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h3 className="content-block-title mb-3">核心团队</h3>
            <p className="text-sm text-white/60 font-[var(--font-body)]">
              兼具合规资管、量化研究与跨境业务拓展的国际化团队
            </p>
          </div>

          <div className="panel-grid md:grid-cols-3">
            {team.map((member) => (
              <GlassReveal
                key={member.name}
                interactive
                className="panel-card rounded-[var(--radius-card)] p-6 transition-all hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-[var(--gold-champagne)]/50 bg-black/40">
                  <ImageWithFallback
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                  <p className="mt-1 text-sm text-[var(--gold-champagne)]">{member.role}</p>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">{member.bio}</p>
                  <p className="mt-2 text-[11px] text-white/35">{member.initials}</p>
                </div>
              </GlassReveal>
            ))}
          </div>
        </div>

        {/* Newsroom */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="content-block-title">
              动态与新闻
            </h3>
            <GlassReveal
              as="button"
              type="button"
              variant="muted"
              interactive
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--gold-champagne)] hover:underline"
            >
              查看全部动态 <ChevronRight className="h-4 w-4" />
            </GlassReveal>
          </div>

          <div className="panel-grid md:grid-cols-3">
            {[
              {
                date: '2026-04-10',
                tag: '重大发布',
                title: 'UAQC 完成种子轮融资',
                desc: '顶级 Web3 机构参投，估值突破 5000 万美元',
              },
              {
                date: '2026-03-28',
                tag: '活动回顾',
                title: '香港 RWI 峰会圆满落幕',
                desc: 'UAQC CEO 发表主题演讲，深度解析 RWAFi 未来',
              },
              {
                date: '2026-03-15',
                tag: '产品上线',
                title: '智赢先知预测市场正式启动',
                desc: '首周交易量突破 1000 万美元',
              },
            ].map((news, i) => (
              <GlassReveal
                key={i}
                interactive
                className="panel-card group cursor-pointer rounded-[var(--radius-card)] p-6 transition-all hover:scale-[1.02]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs text-white/40">{news.date}</span>
                  <span
                    className="rounded px-2 py-1 text-xs"
                    style={{
                      backgroundColor: 'var(--gold-champagne)20',
                      color: 'var(--gold-champagne)',
                    }}
                  >
                    {news.tag}
                  </span>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-[var(--gold-champagne)]">
                  {news.title}
                </h4>
                <p className="text-sm text-white/60">{news.desc}</p>
              </GlassReveal>
            ))}
          </div>
        </div>
      </div>

      {activeLicense && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setActiveLicense(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-black/80 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLicense(null)}
              className="absolute right-3 top-3 rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:text-white"
              aria-label="关闭证书预览"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="max-h-[78vh] overflow-auto rounded-xl border border-white/10 bg-black/30 p-4">
              <ImageWithFallback
                src={activeLicense.imageSrc}
                alt={activeLicense.title}
                className="mx-auto h-auto max-h-[72vh] w-auto object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <div className="text-sm font-semibold text-white">{activeLicense.title}</div>
              <div className="text-xs text-[var(--gold-champagne)]">{activeLicense.code}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}