import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface ScrollEngineOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  onScroll?: (data: { scroll: number; velocity: number }) => void;
  touchMultiplier?: number;    // lower = less sensitive on touch
  wheelMultiplier?: number;    // adjust wheel sensitivity
  gestureDirection?: 'vertical' | 'horizontal';
  syncTouch?: boolean;
}

export const useScrollEngine = (options: ScrollEngineOptions = {}) => {
  const lenisRef = useRef<Lenis | null>(null);

  const {
    duration = 1.2,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel = true,
    smoothTouch = false,
    onScroll,
    touchMultiplier,
    wheelMultiplier,
    gestureDirection = 'vertical',
    syncTouch,
  } = options;

  useEffect(() => {

    const isCoarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel,
      smoothTouch,
      direction: 'vertical',
      gestureDirection,
      touchMultiplier: touchMultiplier ?? (isCoarse ? 0.6 : 1),
      wheelMultiplier: wheelMultiplier ?? 1,
      ...(typeof syncTouch === 'boolean' ? { syncTouch } : {}),
    });

    lenisRef.current = lenis;

    // Register scroll callback if provided
    if (onScroll) {
      lenis.on('scroll', onScroll);
    }

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [duration, easing, smoothWheel, smoothTouch, onScroll, touchMultiplier, wheelMultiplier, gestureDirection, syncTouch]);

  // Expose scroll methods
  const scrollTo = (target: Element | number | string, options?: any) => {
    lenisRef.current?.scrollTo(target, options);
  };

  const scrollToTop = () => scrollTo(0, { duration: 2 });
  const scrollToBottom = () => scrollTo(document.body.scrollHeight, { duration: 2 });

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToBottom
  };
};