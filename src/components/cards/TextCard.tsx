import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useRegisterSection } from '../../contexts/activeSectionStore';
import { scaleIn } from '../../contexts/motionVariants';
import { SectionComponent } from '../../types/section';

export interface TextCardProps extends SectionComponent {
  title?: string;
  horizontalPlacement?: 'left' | 'center' | 'right';
}

export const TextCard: React.FC<TextCardProps> = ({
  index = -1,
  headerTitle,
  hideHeader,
  bgVideo,
  title,
  children,
  className = '',
  horizontalPlacement = 'left',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useRegisterSection(ref, { index, headerTitle, hideHeader, bgVideo });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.5, once: true }}
      className={`max-w-3xl md:max-w-5xl mx-auto ${horizontalPlacement === 'left' ? 'md:ml-10' : horizontalPlacement === 'right' ? 'md:mr-10' : ''}`}
    >
      <Card className={`text-standard border-none shadow-lg bg-black ${className}`}>
        {title && (
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-white">
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="prose prose-invert max-w-none text-gray-200 p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};