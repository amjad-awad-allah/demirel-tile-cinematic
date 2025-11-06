import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LegalPopupProps {
  type: 'impressum' | 'privacy' | null;
  onClose: () => void;
}

export const LegalPopup = ({ type, onClose }: LegalPopupProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={type !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {type === 'impressum' ? t('impressum') : t('privacy')}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {type === 'impressum' ? (
              <>
                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('companyInfo')}</h3>
                  <p>Fliesen Demirel Meisterbetrieb</p>
                  <p>Allensteiner Str. 6</p>
                  <p>45701 Herten</p>
                  <p className="mt-2">
                    <strong>UST-ID:</strong> DE456945760
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('contact')}</h3>
                  <p>E-Mail: info@fliesen-demirel.de</p>
                  <p>Telefon: +49 123 456 7890</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('responsible')}</h3>
                  <p>{t('responsibleText')}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('dataProtectionTitle')}</h3>
                  <p>{t('dataProtectionIntro')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('dataCollectionTitle')}</h3>
                  <p>{t('dataCollectionText')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('cookiesTitle')}</h3>
                  <p>{t('cookiesText')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('contactDataTitle')}</h3>
                  <p>{t('contactDataText')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('rightsTitle')}</h3>
                  <p>{t('rightsText')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('storageTitle')}</h3>
                  <p>{t('storageText')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('thirdPartyTitle')}</h3>
                  <p>{t('thirdPartyText')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">{t('changesTitle')}</h3>
                  <p>{t('changesText')}</p>
                </div>
              </>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
