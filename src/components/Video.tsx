import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../contexts/motionVariants';

interface VideoProps {
  src: string;
  index: number;
  poster?: string;
  headerTitle?: string;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ 
  src, 
  index,
  poster, 
  headerTitle,
  className
}) => {
  return (
    <div className={`h-[80dvh] flex items-center justify-center relative z-2 ${className}`}>
      <video src={src} poster={poster} controls className='w-auto h-full object-contain'/>
    </div>
  );
};

export default Video;