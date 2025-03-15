'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';

export const useTranslation = (namespace = 'common') => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setLoading(true);
        // Dynamically import the translation file based on language and namespace
        const translationModule = await import(`../../locales/${language}/${namespace}.json`);
        setTranslations(translationModule);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to load translations for ${language}/${namespace}:`, error);
        // Fallback to English if translation fails
        if (language !== 'en') {
          const fallbackModule = await import(`../../locales/en/${namespace}.json`);
          setTranslations(fallbackModule);
        }
        setLoading(false);
      }
    };

    loadTranslations();
  }, [language, namespace]);

  const t = (key) => {
    if (loading) return key; // Return the key while loading
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value = translations;
    
    // Navigate through the nested properties
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation not found
      }
    }
    
    return value;
  };

  return { t, loading };
}; 