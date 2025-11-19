import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../ui/card';
import { useRegisterSection } from '../../contexts/activeSectionStore';
import { valueCardAnimation } from '../../contexts/motionVariants';
import { SectionComponent } from '../../types/section';

export interface ProjectCardProps extends SectionComponent {
  image?: string;
  tags?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  index = -1,
  headerTitle,
  hideHeader,
  bgVideo,
  children,
  image,
  className = '',
  tags = []
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useRegisterSection(ref, { index, headerTitle, hideHeader, bgVideo });

  return (
    <motion.div
      ref={ref}
      variants={valueCardAnimation}
      className={`md:max-w-[30dvw] h-fit mx-auto my-20 ${className}`}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.5, once: true }}
      whileHover="hover"
    >
      <Card className="shadow-lg bg-black border-gray-600">
        {image && (
          <CardHeader className="flex items-center justify-center">
            <div className="h-60 w-full">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
          </CardHeader>
        )}
        <CardContent className="flex flex-col p-6 text-white">
          {children}
        </CardContent>
        {tags.length > 0 && (
          <CardContent className="flex flex-wrap gap-3 justify-center px-4 pb-6">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center text-sm px-3 py-1 yellow-bg rounded-full text-white/90"
              >
                {tag}
              </span>
            ))}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};