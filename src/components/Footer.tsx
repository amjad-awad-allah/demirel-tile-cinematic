import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo-transparent.svg';
import { LegalPopup } from './LegalPopup';

export const Footer = () => {
  const { t } = useLanguage();
  const [legalPopup, setLegalPopup] = useState<'impressum' | 'privacy' | null>(null);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return (
    <>
      <LegalPopup type={legalPopup} onClose={() => setLegalPopup(null)} />
      <footer className="relative overflow-hidden py-12 text-white" style={{
    background: 'linear-gradient(135deg, #1E3D59 0%, #283E62 100%)'
  }}>
      {/* Orange divider line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{
      backgroundColor: '#E8752B'
    }}></div>

      {/* Marble texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
    }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Logo & About */}
          <div>
            <img src={logo} alt="Fliesen Demirel" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm leading-relaxed" style={{
            color: '#CCCCCC',
            letterSpacing: '0.02em',
            lineHeight: '1.7'
          }}>
              {t('language') === 'de' ? 'Ihr verlässlicher Partner für hochwertige Fliesenarbeiten seit über 20 Jahren.' : 'Your reliable partner for high-quality tile work for over 20 years.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
            letterSpacing: '0.05em'
          }} className="text-lg font-semibold mb-4 text-slate-50">
              {t('language') === 'de' ? 'Schnelllinks' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-sm transition-colors" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }} onMouseEnter={e => e.currentTarget.style.color = '#E8752B'} onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}>
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-sm transition-colors" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }} onMouseEnter={e => e.currentTarget.style.color = '#E8752B'} onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}>
                  {t('services')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-sm transition-colors" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }} onMouseEnter={e => e.currentTarget.style.color = '#E8752B'} onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}>
                  {t('about')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-sm transition-colors" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }} onMouseEnter={e => e.currentTarget.style.color = '#E8752B'} onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}>
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
            letterSpacing: '0.05em'
          }} className="text-lg font-semibold mb-4 text-slate-50">
              {t('language') === 'de' ? 'Kontakt' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" style={{
                color: '#E8752B'
              }} />
                <a href="mailto:info@fliesen-demirel.de" className="text-sm transition-colors" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }} onMouseEnter={e => e.currentTarget.style.color = '#E8752B'} onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}>
                  info@fliesen-demirel.de
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" style={{
                color: '#E8752B'
              }} />
                <a href="tel:+491234567890" className="text-sm transition-colors" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }} onMouseEnter={e => e.currentTarget.style.color = '#E8752B'} onMouseLeave={e => e.currentTarget.style.color = '#CCCCCC'}>
                  +49 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{
                color: '#E8752B'
              }} />
                <span className="text-sm" style={{
                color: '#CCCCCC',
                letterSpacing: '0.02em'
              }}>
                  Musterstraße 123, 12345 Berlin
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Legal Links */}
        <div className="border-t pt-8 text-center" style={{
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}>
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <button
              onClick={() => setLegalPopup('impressum')}
              className="text-sm transition-colors hover:text-accent"
              style={{ color: '#CCCCCC', letterSpacing: '0.02em' }}
            >
              {t('impressum')}
            </button>
            <span style={{ color: '#666666' }}>|</span>
            <button
              onClick={() => setLegalPopup('privacy')}
              className="text-sm transition-colors hover:text-accent"
              style={{ color: '#CCCCCC', letterSpacing: '0.02em' }}
            >
              {t('privacy')}
            </button>
          </div>
          <p className="text-sm" style={{
            color: '#999999',
            letterSpacing: '0.02em'
          }}>
            © {new Date().getFullYear()} Fliesen Demirel Meisterbetrieb. {t('language') === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};