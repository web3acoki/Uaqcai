import { ChevronRight } from 'lucide-react';
import { GlassReveal } from '../components/site/GlassReveal';

export function About() {
  return (
    <section className="min-h-screen bg-transparent py-20">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2
            className="font-[var(--font-display)] text-5xl mb-4"
            style={{ color: 'var(--gold-champagne)' }}
          >
            投资者关系
          </h2>
          <p className="font-[var(--font-body)] text-xl text-white/70">
            通往百亿估值的价值桥梁
          </p>
        </div>

        {/* Compliance & Licenses */}
        <div className="mb-20">
          <h3 className="text-2xl font-[var(--font-body)] font-semibold mb-8 text-white text-center">
            合规与审计墙
          </h3>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                className="rounded-xl p-6 text-center ring-1 ring-[var(--gold-champagne)]/18 transition-all hover:ring-[var(--gold-champagne)]/40"
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

        {/* Capital Roadmap */}
        <div className="mb-20">
          <h3 className="text-2xl font-[var(--font-body)] font-semibold mb-12 text-white text-center">
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
        <div className="mb-20 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-[rgba(11,11,16,0.36)] p-8">
          <h3 className="text-2xl font-[var(--font-body)] font-semibold mb-6 text-white text-center">
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

        {/* Newsroom */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-[var(--font-body)] font-semibold text-white">
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

          <div className="grid md:grid-cols-3 gap-6">
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
                className="group cursor-pointer rounded-xl p-6 transition-all hover:scale-105"
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
    </section>
  );
}