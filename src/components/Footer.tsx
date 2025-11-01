import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo-transparent.svg';

export const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo & About */}
          <div>
            <img src={logo} alt="Fliesen Demirel" className="h-16 w-auto mb-4" />
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('language') === 'de'
                ? 'Ihr verlässlicher Partner für hochwertige Fliesenarbeiten seit über 20 Jahren.'
                : 'Your reliable partner for high-quality tile work for over 20 years.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('language') === 'de' ? 'Schnelllinks' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t('services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t('about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('language') === 'de' ? 'Kontakt' : 'Contact'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@fliesen-demirel.de"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  info@fliesen-demirel.de
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+491234567890"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  +49 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Musterstraße 123, 12345 Berlin
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Fliesen Demirel Meisterbetrieb. {t('language') === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
