import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { activeBg } from '../contexts/activeSectionStore';
import VideoLayer from './VideoLayer';
import AnimatedLayer from './AnimatedLayer';

const defaultFadeMS = 300;

type LayerContent = 
  | { type: 'video'; src: string }
  | { type: 'animated'; bgKey: string }
  | { type: 'none' };

// Define animated background keys
const ANIMATED_BG_KEYS = ['prism','floatingLines'] as const;
type AnimatedBgKey = typeof ANIMATED_BG_KEYS[number];

function isAnimatedBackground(src: string | Record<string, string> | null): src is AnimatedBgKey {
  if (!src || typeof src !== 'string') return false;
  return ANIMATED_BG_KEYS.includes(src as AnimatedBgKey);
}

function pickVariant(input: string | Record<string, string> | null | undefined): string {
  if (!input) return '';
  if (typeof input === 'string') return input;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const mobileCandidate = input.mobile || input.small || input.default || input.src || '';
  const desktopCandidate = input.desktop || input.default || input.src || '';

  return isMobile ? mobileCandidate : desktopCandidate;
}

export default function Background({ video = 'video/placeholder-background.mp4' }: { video?: string | Record<string, string>; }) {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const aControls = useAnimation();
  const bControls = useAnimation();

  const [frontIsA, setFrontIsA] = useState(true);
  const [layerAContent, setLayerAContent] = useState<LayerContent>({ type: 'none' });
  const [layerBContent, setLayerBContent] = useState<LayerContent>({ type: 'none' });
  
  const transitionInProgress = useRef(false);
  const queuedContent = useRef<LayerContent | null>(null);
  const currentRaw = useRef<string | Record<string, string> | null>(null);

  // Initialize
  useEffect(() => {
    const initialRaw = activeBg.get() || video;
    currentRaw.current = initialRaw;

    if (isAnimatedBackground(initialRaw)) {
      setLayerAContent({ type: 'animated', bgKey: initialRaw });
    } else {
      const initial = pickVariant(initialRaw as any) || (typeof video === 'string' ? video : pickVariant(video as any));
      setLayerAContent({ type: 'video', src: initial });
    }

    aControls.set({ opacity: 1 });
    bControls.set({ opacity: 0 });
  }, []);

  async function runTransitionTo(newContent: LayerContent) {
    if (newContent.type === 'none') return;
    
    if (transitionInProgress.current) {
      queuedContent.current = newContent;
      return;
    }
    transitionInProgress.current = true;

    const frontControls = frontIsA ? aControls : bControls;
    const backControls = frontIsA ? bControls : aControls;
    const frontContent = frontIsA ? layerAContent : layerBContent;

    // Check if we're already showing this content
    if (
      (frontContent.type === 'video' && newContent.type === 'video' && frontContent.src === newContent.src) ||
      (frontContent.type === 'animated' && newContent.type === 'animated' && frontContent.bgKey === newContent.bgKey)
    ) {
      transitionInProgress.current = false;
      const q = queuedContent.current;
      queuedContent.current = null;
      if (q && q.type !== 'none') {
        const isDifferent = 
          (q.type === 'video' && newContent.type === 'video' && q.src !== newContent.src) ||
          (q.type === 'animated' && newContent.type === 'animated' && q.bgKey !== newContent.bgKey) ||
          q.type !== newContent.type;
        if (isDifferent) runTransitionTo(q);
      }
      return;
    }

    // Set new content on back layer
    if (frontIsA) {
      setLayerBContent(newContent);
    } else {
      setLayerAContent(newContent);
    }

    // Wait a bit for content to be ready (160ms matches your video preload race)
    await new Promise(r => setTimeout(r, 160));

    // Crossfade
    const dur = Math.max(0.05, defaultFadeMS / 1000);
    try {
      await backControls.start({ opacity: 1, transition: { duration: dur, ease: 'easeInOut' } });
      await frontControls.start({ opacity: 0, transition: { duration: dur, ease: 'easeInOut' } });
    } catch {
      // ignore animation errors
    }

    // Flip roles
    setFrontIsA(prev => !prev);

    // Reset opacities
    if (frontIsA) {
      aControls.set({ opacity: 0 });
      bControls.set({ opacity: 1 });
    } else {
      aControls.set({ opacity: 1 });
      bControls.set({ opacity: 0 });
    }

    transitionInProgress.current = false;

    // Handle queued transitions
    const queued = queuedContent.current;
    queuedContent.current = null;
    if (queued && queued.type !== 'none') {
      setTimeout(() => runTransitionTo(queued!), 20);
    }
  }

  // Listen for activeBg changes
  useEffect(() => {
    const unsub = activeBg.onChange((srcRaw) => {
      currentRaw.current = srcRaw ?? video;

      if (isAnimatedBackground(srcRaw)) {
        runTransitionTo({ type: 'animated', bgKey: srcRaw });
      } else {
        const picked = pickVariant((srcRaw ?? video) as any);
        if (picked) runTransitionTo({ type: 'video', src: picked });
      }
    });
    return () => unsub();
  }, [video, frontIsA]);

  // Listen to breakpoint changes for video variants
  useEffect(() => {
    let timeout: number | null = null;
    const mq = window.matchMedia('(max-width: 768px)');

    const handler = () => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const raw = currentRaw.current;
        
        // Skip if it's an animated background
        if (typeof raw === 'string' && isAnimatedBackground(raw)) {
          return;
        }
        
        // Handle video variant switching
        if (!raw || typeof raw === 'string') return;
        const picked = pickVariant(raw as Record<string, string>);
        
        const frontContent = frontIsA ? layerAContent : layerBContent;
        if (frontContent.type === 'video' && picked && picked !== frontContent.src) {
          runTransitionTo({ type: 'video', src: picked });
        }
      }, 120) as unknown as number;
    };

    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);

    return () => {
      if (timeout) window.clearTimeout(timeout);
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, [frontIsA, layerAContent, layerBContent]);

  return (
    <div className="fixed left-0 top-0 w-100dvw h-100dvh -z-10">
      {/* Layer A */}
      <motion.div className="absolute inset-0" animate={aControls}>
        {layerAContent.type === 'video' && (
          <VideoLayer
            videoRef={videoARef}
            src={layerAContent.src}
          />
        )}
        {layerAContent.type === 'animated' && (
          <AnimatedLayer bgKey={layerAContent.bgKey as AnimatedBgKey} />
        )}
      </motion.div>

      {/* Layer B */}
      <motion.div className="absolute inset-0" animate={bControls}>
        {layerBContent.type === 'video' && (
          <VideoLayer
            videoRef={videoBRef}
            src={layerBContent.src}
          />
        )}
        {layerBContent.type === 'animated' && (
          <AnimatedLayer bgKey={layerBContent.bgKey as AnimatedBgKey} />
        )}
      </motion.div>
    </div>
  );
}