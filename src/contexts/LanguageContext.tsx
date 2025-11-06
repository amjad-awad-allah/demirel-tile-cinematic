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
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    portfolio: 'Portfolio',
    testimonials: 'Testimonials',
    whyUs: 'Why Us',
    
    // Hero
    heroTitle: 'Master Craftsmanship',
    heroSubtitle: 'Premium Ceramic & Tile Installation',
    heroDescription: 'Transform your spaces with expert precision and timeless elegance',
    heroButton: 'Contact',
    
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
    
    // Legal
    impressum: 'Legal Notice',
    privacy: 'Privacy Policy',
    companyInfo: 'Company Information',
    responsible: 'Responsible',
    responsibleText: 'The content manager responsible for this website is the company management of Fliesen Demirel Meisterbetrieb.',
    dataProtectionTitle: 'Data Protection at a Glance',
    dataProtectionIntro: 'The following information provides a simple overview of what happens to your personal data when you visit our website. Personal data is any data by which you can be personally identified.',
    dataCollectionTitle: 'Data Collection on Our Website',
    dataCollectionText: 'The data processing on this website is carried out by the website operator. You can find their contact details in the legal notice of this website.',
    cookiesTitle: 'Cookies',
    cookiesText: 'Our website uses cookies. Cookies are small text files that are stored on your device and do no harm. Some cookies remain stored on your device until you delete them.',
    contactDataTitle: 'Contact Data',
    contactDataText: 'If you contact us via contact form or email, the data you provide will be stored by us for the purpose of processing your inquiry and in case of follow-up questions.',
    rightsTitle: 'Your Rights',
    rightsText: 'You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have the right to request the correction or deletion of this data.',
    storageTitle: 'Storage Duration',
    storageText: 'We store your personal data only as long as necessary for the respective purpose or as required by law.',
    thirdPartyTitle: 'Third-Party Services',
    thirdPartyText: 'We do not pass on your personal data to third parties without your express consent, unless we are legally obliged to do so.',
    changesTitle: 'Changes to this Privacy Policy',
    changesText: 'We reserve the right to update this privacy policy to reflect changes in our practices or legal requirements.',
  },
  de: {
    // Navigation
    home: 'Startseite',
    services: 'Leistungen',
    about: 'Über uns',
    contact: 'Kontakt',
    portfolio: 'Projekte',
    testimonials: 'Kundenstimmen',
    whyUs: 'Warum wir',
    
    // Hero
    heroTitle: 'MEISTERBETRIEB',
    heroSubtitle: 'Premium Keramik- und Fliesenverlegung',
    heroDescription: 'Verwandeln Sie Ihre Räume mit fachlicher Präzision und zeitloser Eleganz',
    heroButton: 'Kontakt',
    
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
    
    // Legal
    impressum: 'Impressum',
    privacy: 'Datenschutzerklärung',
    companyInfo: 'Angaben gemäß § 5 TMG',
    responsible: 'Verantwortlich für den Inhalt',
    responsibleText: 'Verantwortlich für den Inhalt dieser Website ist die Geschäftsführung von Fliesen Demirel Meisterbetrieb.',
    dataProtectionTitle: 'Datenschutz auf einen Blick',
    dataProtectionIntro: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.',
    dataCollectionTitle: 'Datenerfassung auf unserer Website',
    dataCollectionText: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.',
    cookiesTitle: 'Cookies',
    cookiesText: 'Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und keinen Schaden anrichten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen.',
    contactDataTitle: 'Kontaktdaten',
    contactDataText: 'Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.',
    rightsTitle: 'Ihre Rechte',
    rightsText: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.',
    storageTitle: 'Speicherdauer',
    storageText: 'Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzlich vorgeschrieben wird.',
    thirdPartyTitle: 'Weitergabe an Dritte',
    thirdPartyText: 'Wir geben Ihre personenbezogenen Daten nicht ohne Ihre ausdrückliche Einwilligung an Dritte weiter, es sei denn, wir sind gesetzlich dazu verpflichtet.',
    changesTitle: 'Änderungen dieser Datenschutzerklärung',
    changesText: 'Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um Änderungen in unseren Praktiken oder gesetzlichen Anforderungen widerzuspiegeln.',
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
