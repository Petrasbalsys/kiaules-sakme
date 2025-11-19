import React, { useEffect, useRef } from 'react';

const preloadTimeoutMS = 800;

interface VideoLayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
}

const PRELOAD_CACHE = new Map<string, Promise<void>>();

function isBadNetworkForPreload() {
  const nav = navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } };
  if (!nav || !nav.connection) return false;
  const conn = nav.connection;
  if (conn.saveData) return true;
  const slow = String(conn.effectiveType || '').includes('2g');
  return slow;
}

function ensurePreloaded(src: string, timeoutMs = preloadTimeoutMS): Promise<void> {
  if (!src) return Promise.resolve();
  if (isBadNetworkForPreload()) return Promise.resolve();

  const cached = PRELOAD_CACHE.get(src);
  if (cached) return cached;

  const p = new Promise<void>((resolve) => {
    const v = document.createElement('video');
    let done = false;

    const cleanup = () => {
      if (done) return;
      done = true;
      try {
        v.removeAttribute('src');
        v.load();
      } catch (e) {
        console.debug('error during video preload cleanup', e);
      }
    };

    const onReady = () => {
      cleanup();
      resolve();
    };

    v.preload = 'auto';
    v.muted = true;
    v.playsInline = true;
    v.src = src;

    v.addEventListener('canplaythrough', onReady, { once: true });
    v.addEventListener('canplay', onReady, { once: true });

    const timeout = window.setTimeout(() => {
      cleanup();
      resolve();
    }, timeoutMs);

    const onceResolve = () => {
      window.clearTimeout(timeout);
    };
    v.addEventListener('canplaythrough', onceResolve, { once: true });
    v.addEventListener('canplay', onceResolve, { once: true });
  });

  PRELOAD_CACHE.set(src, p);
  return p;
}

export default function VideoLayer({ videoRef, src }: VideoLayerProps) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const loadAndPlay = async () => {
      try {
        // Preload in background
        if (!isInitialMount.current) {
          await ensurePreloaded(src, 800);
        }
        isInitialMount.current = false;

        // Set source and play
        video.src = src;
        video.load();
        await video.play().catch((e) => {
          console.debug('video play error', e);
        });
      } catch (e) {
        console.debug('error loading video', e);
      }
    };

    loadAndPlay();

    // Cleanup when src changes or component unmounts
    return () => {
      if (video) {
        try {
          video.pause();
          video.removeAttribute('src');
          video.load();
        } catch (e) {
          console.debug('error cleaning up video', e);
        }
      }
    };
  }, [src, videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      poster="img/gradient.jpg"
      muted
      loop
      playsInline
      className="pointer-events-none w-100dvw h-100dvh fixed min-w-full min-h-full object-fill md:object-cover"
    />
  );
}