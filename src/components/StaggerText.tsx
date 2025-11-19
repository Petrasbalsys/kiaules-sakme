import React, { ReactNode, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { textContainerVariants, getTextItemVariant } from '../contexts/motionVariants';

interface StaggerTextProps {
  children: ReactNode;
  splitType?: 'words' | 'characters';
  stagger?: number;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: 'slideUp' | 'slideDown' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';
  viewport?: { once?: boolean; amount?: number; margin?: string };
  isActive?: boolean;
}

type Wrapper = { type: any; props?: Record<string, any> };
type Token = { text: string; wrappers: Wrapper[] };

export const StaggerText: React.FC<StaggerTextProps> = ({
  children,
  splitType = 'words',
  stagger = 0.25,
  className = '',
  delay = 1,
  duration = 1,
  viewport = { once: false, amount: 0.6 },
  animationType = 'slideLeft',
  isActive
}) => {
  // flatten children -> tokens while preserving wrapper stack
  const flattenToTokens = (node: ReactNode, wrappers: Wrapper[] = []): Token[] => {
    if (node == null || node === false) return [];
    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node);
      if (splitType === 'words') {
        // split by spaces but keep only non-empty tokens; spacing handled via margin on spans
        return text.split(' ').filter(Boolean).map(t => ({ text: t, wrappers: [...wrappers] }));
      }
      // characters: preserve spaces as NBSP to keep gaps between inline-block spans
      return text.split('').map(ch => ({ text: ch === ' ' ? '\u00A0' : ch, wrappers: [...wrappers] }));
    }
    if (Array.isArray(node)) {
      return node.flatMap(child => flattenToTokens(child, wrappers));
    }
    if (React.isValidElement(node)) {
      const { children: childNodes, ...rest } = (node.props as any) ?? {};
      // record wrapper type & props (without children)
      const wrapper: Wrapper = { type: node.type, props: rest };
      return flattenToTokens(childNodes, wrappers.concat(wrapper));
    }
    // unknown node type - stringify fallback
    return [{ text: String(node), wrappers: [...wrappers] }];
  };

  const tokens = useMemo(() => flattenToTokens(children), [children, splitType]);

  const itemVariants: Variants = useMemo(() => getTextItemVariant(animationType, duration), [animationType, duration]);
  const containerVars = useMemo(() => textContainerVariants(stagger, delay), [stagger, delay]);

  const animateControlled = typeof isActive === 'boolean';

  // helper to wrap inner element with wrapper stack
  const wrapWithWrappers = (inner: ReactNode, wrappers: Wrapper[], keyBase: string) => {
    return wrappers.reduceRight((child, w, i) => {
      const key = `${keyBase}-w-${i}`;
      return React.createElement(w.type, { ...w.props, key }, child);
    }, inner);
  };

  return (
    <motion.div
      className={className}
      style={{ display: 'inline-block' }}
      variants={containerVars}
      initial="hidden"
      {...(animateControlled ? { animate: isActive ? 'visible' : 'hidden' } : { whileInView: 'visible', viewport })}
    >
      {tokens.map((tok, i) => {
        const key = `token-${i}-${tok.text}`;
        const tokenSpan = (
          <motion.span
            key={key}
            variants={itemVariants}
            style={{
              display: 'inline-block',
              marginRight: splitType === 'words' && i < tokens.length - 1 ? '0.35em' : undefined
            }}
            aria-hidden={false}
          >
            {tok.text}
          </motion.span>
        );
        // wrap the motion.span with the preserved wrappers (if any)
        return wrapWithWrappers(tokenSpan, tok.wrappers, key);
      })}
    </motion.div>
  );
};

export default StaggerText;