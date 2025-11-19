// ...existing code...
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { scaleIn } from "../contexts/motionVariants";
import "swiper/css";

interface SwiperImage {
  src: string;
  alt?: string;
}

interface SwiperComponentProps {
  images: SwiperImage[];
  titles?: string[];
  titleShown?: boolean;
  speed?: number;
  background?: boolean;
  height?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  reverse?: boolean;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ images, titles, titleShown, speed, background, height = "h-24", slidesPerView = 3, spaceBetween = 8, reverse = false }) => {

  return (
    <motion.div 
      variants={scaleIn}
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ amount: 0.5, once: false }}
      className="w-full mx-auto h-fit content-center max-w-screen"
    >

    <style>{`.swiper-wrapper { transition-timing-function: linear !important; }`}</style>
        <Swiper 
          className={`w-full ${background ? 'bg-white/40 py-4' : ''}`}
          modules={[Autoplay]}
          spaceBetween={5}
          slidesPerView={"auto"}
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: reverse }}
          speed={speed ?? 8000}
          loop={true}
        >
          {images.map((it, idx) => (
            <SwiperSlide key={`${it.src}-${idx}`} style={{ width: 200 }}> 
              <div className="flex items-center justify-center">
                <img
                  src={it.src}
                  alt={it.alt ?? ""}
                  className={`w-50 object-fit rounded-md ${height}`}
                />
              </div>
              {titleShown ? (
                <div className="text-sm md:text-base text-white  m-4 truncate text-center">
                  {titles?.[idx] ?? it.alt ?? ""}
                </div>
              ) : null}
            </SwiperSlide>
          ))}
        </Swiper>
    </motion.div>
  );
};

export default SwiperComponent;