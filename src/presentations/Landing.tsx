import React from 'react';
import { useTranslationNamespace } from '../hooks/useTranslationNamespace';
import Contact from '@/components/Contact';
import { Header } from '@/components/Header';
import { ValueCard } from '@/components/cards/ValueCard';
import ReactPlayer from 'react-player';
import Background from '@/components/Background';

const Landing = () => {
  const { t } = useTranslationNamespace('landing');

  return (
    <div>
      <Header title={t('body.title')} isHidden={false} />
      <Background />
      <div className={`relative z-1 pt-10`}>
        <div className="grid grid-rows-1 md:grid-rows-[1fr_20%] mx-auto text-center px-6 md:h-screen">
          <div className='grid grid-cols-1 md:grid-cols-2 md:items-center'>
            <ValueCard image='/img/saga.webp' bgVideo={'prism'} className='my-[20dvh] md:my-auto md:ml-10'>
              <p>{t('body.text')}</p>
              <p>{t('body.text2')}</p>
              <h2 className="text-white">{t('body.price')}</h2>
            </ValueCard>
            <div className='flex items-center justify-center p-6 md:w-xl md:h-120 h-80 mx-auto mb-20 md:mb-0 border rounded-lg border-white/10 bg-black/60 backdrop-blur-md md:p-4 justify-self-center self-center'>
              <ReactPlayer
                url="https://youtu.be/xwfSzExg9rc"
                controls
                width="100%"
                height="100%"
                config={{ file: { attributes: { playsInline: true } } }}
              />
            </div>
          </div>
          <Contact people={[
            { name: t('body.contact'), email: 'kiaulesakme@gmail.com' }
          ]} cols={1} className="mt-8 px-6" />
        </div>
      </div>
    </div>     
  );
};

export default Landing;