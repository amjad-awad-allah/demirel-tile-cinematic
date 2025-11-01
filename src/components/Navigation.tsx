import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import logo from '@/assets/logo-transparent.svg';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'why-us', label: t('whyUs') },
    { id: 'services', label: t('services') },
    { id: 'portfolio', label: t('portfolio') },
    { id: 'testimonials', label: t('testimonials') },
    { id: 'about', label: t('about') },
    { id: 'contact', label: t('contact') },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center hover:opacity-80 transition-opacity pl-4 md:pl-5"
          >
            <img src={logo} alt="Fliesen Demirel" className="h-9 md:h-16 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium transition-colors hover:text-accent text-foreground"
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[64px]">
                    {language.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[9999]">
                  <DropdownMenuItem onClick={() => setLanguage('de')}>DE</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>EN</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-3 text-sm font-medium transition-colors hover:text-accent text-foreground"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    {language.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[9999]">
                  <DropdownMenuItem onClick={() => setLanguage('de')}>DE</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>EN</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
