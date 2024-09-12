import React, { createContext, useContext, useState } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';

const TranslationContext = createContext();

const translations = {
  en,
  hi,
};

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translate = (key) => {
    return translations[language][key] || key;
  };

  const switchLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'hi' : 'en'));
  };

  return (
    <TranslationContext.Provider value={{ translate, switchLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
export default TranslationProvider;
