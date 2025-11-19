import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { StaggerText } from './StaggerText';
import { useRegisterSection } from '../contexts/activeSectionStore';
import { slideUp, scaleIn } from '../contexts/motionVariants';
import { SectionComponent } from '../types/section';

interface TimelineTextBlockProps extends SectionComponent {
  animationType?: 'slideUp' | 'scaleIn';
  delay?: number;
  splitType?: 'words' | 'characters';
}

const variantsMap: Record<string, Variants> = {
  slideUp,
  scaleIn,
};

const TimelineText: React.FC<TimelineTextBlockProps> = ({ 
    index = -1, 
    headerTitle, 
    hideHeader = false, 
    bgVideo, 
    children, 
    className = 'h-screen',
    animationType = 'slideUp', 
    delay = 0,
    splitType = 'words',
}) => {

  const ref = useRef<HTMLDivElement | null>(null);
  useRegisterSection(ref, { index, headerTitle, hideHeader, bgVideo });

 const selectedVariant = variantsMap[animationType] || slideUp;

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial='initial'
      whileInView='animate'
      viewport={{ amount: 0.8, once: true }}
      className={`flex items-center timeline justify-center relative z-20 px-10 max-w-6xl ${className}`}
    >
      <StaggerText splitType={splitType} stagger={0.15} delay={delay + 0.1}>
        {children}
      </StaggerText>
    </motion.div>
  );
};

export default TimelineText;