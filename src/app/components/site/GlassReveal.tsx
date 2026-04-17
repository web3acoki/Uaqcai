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

export type GlassRevealProps = GlassRevealDivProps | GlassRevealButtonProps;

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

  const motionRest = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, amount: revealAmount, margin: '0px 0px -8% 0px' } as const,
        transition: { duration: 0.52, delay: revealDelay, ease: [0.22, 1, 0.36, 1] as const },
      };

  if (as === 'button') {
    const { type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>;
    return (
      <motion.button type={type} className={glassClass} {...buttonRest} {...motionRest}>
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div className={glassClass} {...(rest as ComponentPropsWithoutRef<'div'>)} {...motionRest}>
      {children}
    </motion.div>
  );
}
