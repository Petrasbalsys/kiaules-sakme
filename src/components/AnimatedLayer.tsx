import React from 'react';
import Prism from './backgrounds/Prism';

type AnimatedBgKey = 'prism' ;

interface AnimatedConfig {
  component: React.ComponentType<any>;
  props: Record<string, any>;
}

// Stable reference for offset
const PRISM_OFFSET = { x: 0, y: 0 };

const ANIMATED_CONFIGS: Record<AnimatedBgKey, AnimatedConfig> = {
  prism: {
    component: Prism,
    props: {
      height: 3.5,
      baseWidth: 5.5,
      animationType: 'rotate',
      glow: 1,
      offset: PRISM_OFFSET,
      noise: 0.3,
      transparent: true,
      scale: 2,
      hueShift: 0,
      colorFrequency: 1,
      hoverStrength: 2,
      inertia: 0.05,
      bloom: 0.8,
      suspendWhenOffscreen: true,
      timeScale: 0.5
    }
  }
};

interface AnimatedLayerProps {
  bgKey: AnimatedBgKey;
}

const AnimatedLayer: React.FC<AnimatedLayerProps> = ({ bgKey }) => {
  const config = ANIMATED_CONFIGS[bgKey];
  
  if (!config) return null;
  
  const Component = config.component;

  return (
    <div className="absolute inset-0">
      <Component {...config.props} />
    </div>
  );
};

export default React.memo(AnimatedLayer);