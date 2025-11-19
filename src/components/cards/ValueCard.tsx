import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardDescription } from '../ui/card';
import { useRegisterSection } from '../../contexts/activeSectionStore';
import { valueCardAnimation } from '../../contexts/motionVariants';
import { SectionComponent } from '../../types/section';

export interface ValueCardProps extends SectionComponent {
  image?: string;
  tags?: string[];
}

export const ValueCard: React.FC<ValueCardProps> = ({
  index = -1,
  headerTitle,
  hideHeader,
  bgVideo,
  children,
  image,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useRegisterSection(ref, { index, headerTitle, hideHeader, bgVideo });

  return (
    <motion.div
      ref={ref}
      variants={valueCardAnimation}
      className={`${className}`}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.5, once: false }}
      whileHover="hover"
    >
      <Card className="shadow-lg border-white/10 bg-black/60 backdrop-blur-md p-4 md:p-6 h-auto md:h-120">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 h-full">
          <div className="flex-none w-full md:w-1/2 max-w-sm m-auto">
            <img
              src={image}
              className="w-full h-40 md:h-auto rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <CardDescription className="max-w-full md:max-w-sm text-sm md:text-lg whitespace-normal break-words">
              {children}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};