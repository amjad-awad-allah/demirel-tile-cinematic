import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    whyUs: 'Why Us',
    services: 'Services',
    portfolio: 'Portfolio',
    testimonials: 'Testimonials',
    about: 'About',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Master Craftsmanship',
    heroSubtitle: 'Premium Ceramic & Tile Installation',
    heroDescription: 'Transform your spaces with expert precision and timeless elegance',
    heroButton: 'View Our Work',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Professional tile installation for every space',
    bathroom: 'Bathroom',
    bathroomDesc: 'Luxury bathroom renovations with premium ceramic tiles',
    kitchen: 'Kitchen',
    kitchenDesc: 'Modern kitchen backsplashes and floor installations',
    commercial: 'Commercial',
    commercialDesc: 'Large-scale commercial projects with precision',
    
    // About
    aboutTitle: 'About Us',
    aboutSubtitle: 'Over 20 years of excellence in tile craftsmanship',
    aboutText: 'Fliesen Demirel Meisterbetrieb is a family-owned master tile installation company dedicated to delivering exceptional quality and precision. Our expertise spans residential and commercial projects, ensuring every tile is placed with meticulous care.',
    
    // Contact
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Ready to transform your space?',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    whatsapp: 'WhatsApp',
  },
  de: {
    // Navigation
    home: 'Startseite',
    whyUs: 'Warum wir',
    services: 'Leistungen',
    portfolio: 'Portfolio',
    testimonials: 'Referenzen',
    about: 'Über uns',
    contact: 'Kontakt',
    
    // Hero
    heroTitle: 'Meisterliches Handwerk',
    heroSubtitle: 'Premium Keramik- und Fliesenverlegung',
    heroDescription: 'Verwandeln Sie Ihre Räume mit fachlicher Präzision und zeitloser Eleganz',
    heroButton: 'Unsere Arbeit',
    
    // Services
    servicesTitle: 'Unsere Leistungen',
    servicesSubtitle: 'Professionelle Fliesenverlegung für jeden Raum',
    bathroom: 'Badezimmer',
    bathroomDesc: 'Luxuriöse Badsanierungen mit hochwertigen Keramikfliesen',
    kitchen: 'Küche',
    kitchenDesc: 'Moderne Küchenrückwände und Bodenbeläge',
    commercial: 'Gewerbe',
    commercialDesc: 'Großprojekte mit höchster Präzision',
    
    // About
    aboutTitle: 'Über uns',
    aboutSubtitle: 'Über 20 Jahre Exzellenz im Fliesenlegen',
    aboutText: 'Fliesen Demirel Meisterbetrieb ist ein familiengeführtes Meisterunternehmen, das sich der Lieferung außergewöhnlicher Qualität und Präzision verschrieben hat. Unsere Expertise umfasst Wohn- und Gewerbeprojekte, bei denen jede Fliese mit akribischer Sorgfalt verlegt wird.',
    
    // Contact
    contactTitle: 'Kontakt aufnehmen',
    contactSubtitle: 'Bereit, Ihren Raum zu verwandeln?',
    email: 'E-Mail',
    phone: 'Telefon',
    website: 'Webseite',
    whatsapp: 'WhatsApp',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
