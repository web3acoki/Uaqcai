import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  id?: string;
};

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
  kicker?: string;
  align?: 'left' | 'center';
  className?: string;
};

type SurfaceProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const cn = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(' ');

export function PageSection({ children, className, wide = false, id }: PageSectionProps) {
  return (
    <section id={id} className={cn('page-section', className)}>
      <div className={wide ? 'page-container-wide' : 'page-container'}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  description,
  kicker,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';
  return (
    <header className={cn('mb-12 flex max-w-3xl flex-col gap-4', alignClass, className)}>
      {kicker && <div className="section-kicker">{kicker}</div>}
      <h2 className="section-title text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="text-xl text-white/85">{subtitle}</p>}
      {description && <p className="section-subtitle text-base leading-relaxed md:text-lg">{description}</p>}
    </header>
  );
}

export function SurfacePanel({ children, className, style }: SurfaceProps) {
  return (
    <div className={cn('surface-panel p-6 md:p-8', className)} style={style}>
      {children}
    </div>
  );
}

export function SurfaceCard({ children, className, style }: SurfaceProps) {
  return (
    <div className={cn('surface-card p-6', className)} style={style}>
      {children}
    </div>
  );
}
