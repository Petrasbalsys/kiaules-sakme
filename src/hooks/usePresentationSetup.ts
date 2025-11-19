import { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollEngine } from './useScrollEngine';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { activeTitle, activeHidden, activeBg } from '../contexts/activeSectionStore';
import { videos } from '../contexts/mediaContext';

interface PresentationState {
  headerState: {
    visible: boolean;
    title: string;
  };
  bgSrc: any;
  containerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  snapTo: (dir: 'nearest' | 'next' | 'prev') => void;
}

export function usePresentationSetup(): PresentationState {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [headerState, setHeaderState] = useState({
    visible: true,
    title: ""
  });

  const [bgSrc, setBgSrc] = useState<any>(videos['main']);

  const { scrollTo } = useScrollEngine({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
  });

  const snapTo = useCallback((dir: 'nearest' | 'next' | 'prev') => {
    const root = contentRef.current;
    if (!root) return;

    const sections = Array.from(root.children) as HTMLElement[];
    if (!sections.length) return;

    const viewportCenter = window.innerHeight / 2;

    let currentIdx = 0;
    let best = Number.POSITIVE_INFINITY;
    sections.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - viewportCenter);
      if (dist < best) {
        best = dist;
        currentIdx = i;
      }
    });

    let targetIdx = currentIdx;
    if (dir === 'next') targetIdx = Math.min(sections.length - 1, currentIdx + 1);
    if (dir === 'prev') targetIdx = Math.max(0, currentIdx - 1);

    const target = sections[targetIdx];
    const r = target.getBoundingClientRect();
    const targetY = window.scrollY + r.top - (window.innerHeight - r.height) / 2;

    scrollTo(targetY);
  }, [scrollTo]);

  useKeyboardNavigation({
    onScrollDown: () => snapTo('next'),
    onScrollUp: () => snapTo('prev'),
  });

  useEffect(() => {
    const unsubTitle = activeTitle.onChange((v) => {
      setHeaderState(prev => (prev.title === v ? prev : { ...prev, title: v }));
    });
    const unsubHidden = activeHidden.onChange((v) => {
      const visible = !v;
      setHeaderState(prev => (prev.visible === visible ? prev : { ...prev, visible }));
    });
    const unsubBg = activeBg.onChange((v) => {
      setBgSrc(v ?? videos.main);
    });

    return () => {
      unsubTitle();
      unsubHidden();
      unsubBg();
    };
  }, []);

  return {
    headerState,
    bgSrc,
    containerRef,
    contentRef,
    snapTo,
  };
}