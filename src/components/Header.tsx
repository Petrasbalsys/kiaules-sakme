import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { headerFade, headerSwap } from '../contexts/motionVariants';
import { icons } from '../contexts/mediaContext';

interface HeaderProps {
  title?: string;
  isHidden?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, isHidden = false }) => {
  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.header
          variants={headerFade}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-0 left-0 right-0 z-1000 bg-black/80 backdrop-blur-md px-6 py-3 flex items-center justify-between"
        >
          {/* Logo */}
            <div className="flex items-center">
              <img
                src=''
                alt=""
                className="h-6 w-auto"
              />
            </div>
          {/* Title with fade animation */}
          <div className="flex-1 text-center flex items-center justify-center h-8">
            <AnimatePresence mode="wait">
              {title && (
                <motion.h1
                  key={title} // ← Key change triggers re-animation
                  variants={headerSwap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-white text-lg font-semibold m-0 uppercase"
                >{title}</motion.h1>
                )
              }
            </AnimatePresence>
          </div>
          {/* Language Switcher */}
          <div className="flex items-center"><LanguageSwitcher /></div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;