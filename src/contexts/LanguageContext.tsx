// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageContextType = {
  t: (key: string) => string;
  changeLanguage: (lng: 'en' | 'fr') => void;
  currentLanguage: string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en');

  const changeLanguage = (lng: 'en' | 'fr') => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};