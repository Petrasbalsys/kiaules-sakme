import React, { useEffect, useState } from 'react';
import { activeIndex, activeTitle, activeBg, activeHidden, videoFrontSrc, videoBackSrc, videoTransitionId, videoPending, videoFadeMs } from '../contexts/activeSectionStore';

const ActiveDebugOverlay = () => {
  const [s, setS] = useState({
    i: activeIndex.get(),
    t: activeTitle.get(),
    b: activeBg.get(),
    h: activeHidden.get(),
    vf: videoFrontSrc.get(),
    vb: videoBackSrc.get(),
    tid: videoTransitionId.get(),
    pending: videoPending.get(),
    fade: videoFadeMs.get(),
  });

  useEffect(() => {
    const u1 = activeIndex.onChange((v) => setS((p) => ({ ...p, i: v })));
    const u2 = activeTitle.onChange((v) => setS((p) => ({ ...p, t: v })));
    const u3 = activeBg.onChange((v) => setS((p) => ({ ...p, b: v })));
    const u4 = activeHidden.onChange((v) => setS((p) => ({ ...p, h: v })));
    const u5 = videoFrontSrc.onChange((v) => setS((p) => ({ ...p, vf: v })));
    const u6 = videoBackSrc.onChange((v) => setS((p) => ({ ...p, vb: v })));
    const u7 = videoTransitionId.onChange((v) => setS((p) => ({ ...p, tid: v })));
    const u8 = videoPending.onChange((v) => setS((p) => ({ ...p, pending: v })));
    const u9 = videoFadeMs.onChange((v) => setS((p) => ({ ...p, fade: v })));
    return () => { u1(); u2(); u3(); u4(); u5(); u6(); u7(); u8(); u9(); };
  }, []);

  return (
    <div style={{ position: 'fixed', left: 8, bottom: 8, zIndex: 9999, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: 8, fontSize: 12, borderRadius: 6 }}>
      <div>index: {s.i}</div>
      <div>title: {s.t}</div>
      <div>bg: {s.b}</div>
      <div>hidden: {String(s.h)}</div>
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <div>front: {s.vf}</div>
      <div>back: {s.vb}</div>
      <div>tid: {s.tid}</div>
      <div>pending: {String(s.pending)}</div>
      <div>fadeMs: {s.fade}</div>
    </div>
  );
}

export default ActiveDebugOverlay;