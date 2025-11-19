import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import type { EmblaOptionsType } from 'embla-carousel';
import { motion } from 'framer-motion';
import { scaleIn } from '../../contexts/motionVariants';

export interface CarouselItemData {
  id: string;
  src?: string;
  alt?: string;
  title?: string;
  description?: string;
  link?: string;
  [key: string]: any;
}

interface MyCarouselProps {
  items: CarouselItemData[];
  renderItem: (item: CarouselItemData) => React.ReactNode;
  showControls?: boolean;
  className?: string;
}

const MyCarousel: React.FC<MyCarouselProps> = ({
  items,
  renderItem,
  showControls = true,
  className = '',
}) => {
  const opts: EmblaOptionsType = {
    align: 'start',
    loop: false,
  };

  return (
    <motion.div
        variants={scaleIn}
        initial="initial"
        whileInView="animate"
        exit="exit"
        viewport={{ amount: 0.5, once: false }}
        className="w-full mx-auto content-center max-w-screen">
        <Carousel opts={opts} className={`w-full ${className}`}>
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/5">
                {renderItem(item)}
              </CarouselItem>
            ))}
          </CarouselContent>
        
          {showControls && (
            <>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </>
          )}
        </Carousel>
    </motion.div>
  );
};

export default MyCarousel;