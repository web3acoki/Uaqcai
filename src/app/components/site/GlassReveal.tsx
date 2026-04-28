import { motion, useReducedMotion } from 'motion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const cn = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

type GlassRevealBase = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted';
  tone?: 'neutral' | 'gold';
  interactive?: boolean;
  revealDelay?: number;
  revealAmount?: number;
};

type GlassRevealDivProps = GlassRevealBase &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
    as?: 'div';
  };

type GlassRevealButtonProps = GlassRevealBase &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
    as: 'button';
  };

type GlassRevealAnchorProps = GlassRevealBase &
  Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
    as: 'a';
  };

export type GlassRevealProps = GlassRevealDivProps | GlassRevealButtonProps | GlassRevealAnchorProps;

export function GlassReveal(props: GlassRevealProps) {
  const {
    children,
    className,
    variant = 'default',
    tone = 'neutral',
    interactive = false,
    revealDelay = 0,
    revealAmount = 0.24,
    as = 'div',
    ...rest
  } =
    props;
  const reduceMotion = useReducedMotion();

  const glassClass = cn(
    'glass-surface',
    variant === 'muted' && 'glass-surface--muted',
    tone === 'gold' && 'glass-surface--gold',
    interactive && 'glass-surface--interactive',
    className,
  );

  const premiumInteractive =
    interactive &&
    'group relative will-change-transform hover:-translate-y-[var(--lift-1)] hover:shadow-[var(--shadow-inset-1),0_10px_26px_rgba(0,0,0,0.24),var(--shadow-outline-gold)]';

  const premiumFx = cn(glassClass, premiumInteractive);

  const motionRest = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, amount: revealAmount, margin: '0px 0px -8% 0px' } as const,
        transition: { duration: 0.52, delay: revealDelay, ease: [0.22, 1, 0.36, 1] as const },
      };

  const Sheen = reduceMotion || !interactive ? null : (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-[var(--dur-3)] ease-[var(--ease-out-1)] group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <span
        className="absolute -inset-[40%] translate-x-[-35%] rotate-[var(--sheen-angle)]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,var(--sheen-alpha)) 45%, transparent 60%)',
        }}
      />
      <span
        className="absolute -inset-[40%] translate-x-[-35%] rotate-[var(--sheen-angle)] animate-[glass-sheen_var(--sheen-speed)_var(--ease-out-1)_1]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,calc(var(--sheen-alpha)*0.9)) 45%, transparent 60%)',
        }}
      />
    </span>
  );

  const EdgeGlow = reduceMotion || !interactive ? null : (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-[var(--dur-3)] ease-[var(--ease-out-1)] group-hover:opacity-100 group-focus-visible:opacity-100"
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 12px rgba(245,166,35,var(--edge-glow-alpha))',
      }}
    />
  );

  if (as === 'button') {
    const { type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>;
    return (
      <motion.button type={type} className={premiumFx} {...buttonRest} {...motionRest}>
        {Sheen}
        {EdgeGlow}
        {children}
      </motion.button>
    );
  }

  if (as === 'a') {
    return (
      <motion.a className={premiumFx} {...(rest as ComponentPropsWithoutRef<'a'>)} {...motionRest}>
        {Sheen}
        {EdgeGlow}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div className={premiumFx} {...(rest as ComponentPropsWithoutRef<'div'>)} {...motionRest}>
      {Sheen}
      {EdgeGlow}
      {children}
    </motion.div>
  );
}
