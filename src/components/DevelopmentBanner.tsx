import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const DevelopmentBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed top-0 left-0 right-0 bg-amber-500/90 backdrop-blur-sm border-b border-amber-600 py-3 px-4 z-[60]">
      <div className="container mx-auto flex items-center justify-center gap-2 text-white">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium text-center">
          {t('developmentNotice')}
        </p>
      </div>
    </div>
  );
};
