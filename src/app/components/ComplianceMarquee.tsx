import { Building2, Globe, Scale, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useT } from '@/i18n/locale';

const iconClass = 'mr-2 size-4 shrink-0';

export function ComplianceMarquee() {
  const t = useT();
  const reducedMotion = useReducedMotion();

  const items = [
    { Icon: ShieldCheck, label: t('home.marquee.hk') },
    { Icon: Building2, label: t('home.marquee.sg') },
    { Icon: Scale, label: t('home.marquee.ky') },
    { Icon: Globe, label: t('home.marquee.gc') },
  ] as const;

  return (
    <div
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-b border-slate-800 bg-black"
      role="region"
      aria-label={t('home.marqueeAria')}
    >
      <div
        className={`flex w-max whitespace-nowrap py-4 ${reducedMotion ? '' : 'home-compliance-marquee-track'}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-12 px-6 opacity-50">
            {items.map(({ Icon, label }, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center whitespace-nowrap font-mono text-sm uppercase tracking-widest text-white"
              >
                <Icon className={iconClass} strokeWidth={2} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
