import { motionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export type BgVideo = string | Record<string, string> | null;

// Store state
export const activeIndex = motionValue(-1);
export const activeTitle = motionValue('');
export const activeBg = motionValue<BgVideo>(null);
export const activeHidden = motionValue(false);

// Track active sections by priority (higher index = higher priority)
const sectionRegistry = new Map<number, SectionMeta>();

interface SectionMeta {
  index: number;
  title?: string | null;
  bg?: BgVideo;
  hidden?: boolean | null;
  element?: Element;
}

/**
 * Update store based on highest priority visible section
 */
function updateActiveSection() {
  if (sectionRegistry.size === 0) return;

  // Get highest index (most recent/lowest in viewport)
  const entries = Array.from(sectionRegistry.entries());
  const [highestIndex, meta] = entries.reduce((max, curr) => 
    curr[0] > max[0] ? curr : max
  );

  if (activeIndex.get() !== highestIndex) {
    activeIndex.set(highestIndex);
  }
  if (meta.title !== undefined && activeTitle.get() !== meta.title) {
    activeTitle.set(meta.title || '');
  }
  if (meta.bg !== undefined && activeBg.get() !== meta.bg) {
    activeBg.set(meta.bg);
  }
  if (meta.hidden !== undefined && activeHidden.get() !== meta.hidden) {
    activeHidden.set(meta.hidden || false);
  }
}

/**
 * Register a section when it's in view, unregister when out of view
 */
export function useRegisterSection(
  ref: React.RefObject<Element | null>,
  meta: {
    index?: number;
    headerTitle?: string | null;
    hideHeader?: boolean | null;
    bgVideo?: BgVideo;
  }
) {
  const inView = useInView(ref, { amount: 0.2 });
  const indexRef = useRef(meta.index);

  useEffect(() => {
    const idx = meta.index;
    if (idx === undefined) return;

    if (inView) {
      // Register this section
      sectionRegistry.set(idx, {
        index: idx,
        title: meta.headerTitle,
        bg: meta.bgVideo,
        hidden: meta.hideHeader,
        element: ref.current || undefined,
      });
      updateActiveSection();
    } else {
      // Unregister this section
      sectionRegistry.delete(idx);
      updateActiveSection();
    }

    return () => {
      // Cleanup on unmount
      if (indexRef.current !== undefined) {
        sectionRegistry.delete(indexRef.current);
        updateActiveSection();
      }
    };
  }, [inView, meta.index, meta.headerTitle, meta.bgVideo, meta.hideHeader, ref]);
}