import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, namespace?: string, options?: any) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t: commonT, i18n, ready } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(!ready);

  useEffect(() => {
    // Set loading state based on i18n ready state
    setIsLoading(!ready);
  }, [ready]);

  useEffect(() => {
    if (ready) {
      // Set up language from URL/storage after i18n is ready
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      const savedLang = sessionStorage.getItem('presentation-language');
      const targetLang = langParam || savedLang || 'en';
      
      if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
      }
    }
  }, [ready, i18n]);

  const changeLanguage = async (lang: string) => {
    setIsLoading(true);
    await i18n.changeLanguage(lang);
    sessionStorage.setItem('presentation-language', lang);
    
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
    setIsLoading(false);
  };

  // Wrapper function to handle namespace-aware translations
  const t = (key: string, namespace?: string, options?: any) => {
    if (namespace) {
      return i18n.t(key, { ns: namespace, ...options });
    }
    return commonT(key, options);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage: i18n.language,
      changeLanguage,
      t,
      isLoading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;