import React, { useState, useMemo, useEffect } from "react";
import ReactPlayer from "react-player";
import { youtubeVideos, type MediaItem } from "../contexts/mediaContext";
import { motion } from "framer-motion";
import { scaleIn } from "../contexts/motionVariants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface MediaPlayerProps {
  items?: MediaItem[];
  initialIndex?: number;
  index?: number;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ 
  items = youtubeVideos, 
  initialIndex = 0 
}) => {
  const normalizeList = (items?: any[]) => {
    if (!items || !items.length) return youtubeVideos;
    if (typeof items[0] === "string") {
      return items.map((s: string, i: number) => ({
        id: `item-${i}`,
        title: "",
        src: s,
        thumbnail: "",
        type: "video",
      })) as MediaItem[];
    }
    return items as MediaItem[];
  };

  const list = useMemo(() => normalizeList(items), [items]);
  const [selected, setSelected] = useState<number>(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, list.length - 1))
  );
  
  const current = list[selected];
  const url = Array.isArray(current.src) ? current.src[0] : current.src;

  useEffect(() => {
    if (selected >= list.length) setSelected(0);
  }, [list.length, selected]);

  if (!current || !url) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 text-center bg-red-900/10 rounded-lg">
        <strong>MediaPlayer:</strong> missing source — check mediaContext or the items prop.
      </div>
    );
  }

  return (
    <motion.div 
      variants={scaleIn}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.5, once: false }}
      className="w-full max-w-5xl mx-auto space-y-4"
    >
      {/* Main Player */}
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          config={{ file: { attributes: { playsInline: true } } }}
        />
      </div>

      {/* Thumbnail Navigation */}
      {list.length > 1 && (
        <Carousel 
          opts={{ align: 'start', loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {list.map((item, idx) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                <button
                  type="button"
                  onClick={() => setSelected(idx)}
                  aria-label={`Play ${item.title}`}
                  aria-pressed={idx === selected}
                  className={`
                    relative w-full aspect-video rounded-md overflow-hidden
                    transition-all duration-200
                    ${idx === selected 
                      ? 'ring-2 ring-yellow-400 scale-105' 
                      : 'ring-1 ring-white/20 hover:ring-white/40'
                    }
                  `}
                >
                  <img
                    src={item.thumbnail || '/img/video-placeholder.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-xs text-white truncate">{item.title}</p>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      )}
    </motion.div>
  );
};

export default MediaPlayer;