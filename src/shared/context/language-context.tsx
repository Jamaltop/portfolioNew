"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language } from "@/config/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)[Language];
  isLinkedInModalOpen: boolean;
  openLinkedInModal: () => void;
  closeLinkedInModal: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ru");
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred-language") as Language | null;
      if (saved && (saved === "en" || saved === "ru" || saved === "az")) {
        setLangState(saved);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("preferred-language", newLang);
    } catch {
      // Ignore
    }
  };

  const openLinkedInModal = () => setIsLinkedInModalOpen(true);
  const closeLinkedInModal = () => setIsLinkedInModalOpen(false);

  const value: LanguageContextType = {
    lang,
    setLang,
    t: translations[lang] || translations.ru,
    isLinkedInModalOpen,
    openLinkedInModal,
    closeLinkedInModal,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
