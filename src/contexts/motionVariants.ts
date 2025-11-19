import { Variants } from 'framer-motion';

export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const headerFade = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }, 
};

export const headerSwap = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export const slideUp = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
};

export const valueCardAnimation = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 },
    hover: { scale: 1.05 },
};

export const imageAnimation = {
    initial: { opacity: 0, scale: 0.4 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.2 },
};

export const circleVariant = {
    rest: { scale: 1, transition: { duration: 0.22 }, strokeOpacity: 0.2, fillOpacity: 0.4 },
    hover: { scale: 1.06, transition: { duration: 0.18 }, strokeOpacity: 0.8, fillOpacity: 0.6 },
  };

export const textContainerVariants = (stagger = 0.25, delay = 0.1): Variants => ({
  hidden: { transition: { staggerChildren: stagger, when: 'afterChildren', staggerDirection: -1 } },
  visible: { transition: { staggerChildren: stagger, delayChildren: delay, when: 'beforeChildren' } }
});

export const getTextItemVariant = (type = 'slideUp', duration = 0.6): Variants => {
  const map: Record<string, Variants> = {
    slideUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration } } },
    slideDown: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration } } },
    slideLeft: { hidden: { opacity: 0, x: 20, scale: 0.8 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration } } },
    slideRight: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration } } },
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration } } },
    scaleIn: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration } } }
  };
  return map[type] ?? map.slideUp;
};

//       slideLeft: {
//         hidden: { opacity: 0, x: 20, scale: 0.8 },
//         visible: { opacity: 1, x: 0, scale: 1 }