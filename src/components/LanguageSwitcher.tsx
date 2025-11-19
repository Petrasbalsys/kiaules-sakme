import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation('common');


  return (
    <div className="flex gap-1">
      <button 
        onClick={() => changeLanguage('en')}
        aria-label={t('ui.switchLanguage')}
        aria-pressed={currentLanguage === 'en'}
        className={`px-2 py-1 text-xs rounded-sm border transition-colors duration-150
                    ${currentLanguage === 'en' ? 'bg-white/20 border-yellow-500/60' : 'bg-transparent border-white/30'}
                    hover:bg-white/10 text-white`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('lt')}
        aria-label={t('ui.switchLanguage')}
        aria-pressed={currentLanguage === 'lt'}
        className={`px-2 py-1 text-xs rounded-sm border transition-colors duration-150
                    ${currentLanguage === 'lt' ? 'bg-white/20 border-yellow-500/60' : 'bg-transparent border-white/30'}
                    hover:bg-white/10 text-white`}
      >
        LT
      </button>
    </div>
  );
};

export default LanguageSwitcher;