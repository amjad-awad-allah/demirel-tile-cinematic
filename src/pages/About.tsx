import { useLanguage } from '@/contexts/LanguageContext';
import tilesHero from '@/assets/tiles-hero.jpg';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bold text-center mb-4 text-gradient">
          {t('aboutTitle')}
        </h1>
        <p className="text-center text-muted-foreground mb-16 text-xl">
          {t('aboutSubtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-elegant">
              <img
                src={tilesHero}
                alt="About Fliesen Demirel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              {t('aboutText')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-4xl font-bold text-accent mb-2">20+</div>
                <div className="text-sm text-muted-foreground">
                  {t('language') === 'de' ? 'Jahre Erfahrung' : 'Years Experience'}
                </div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">
                  {t('language') === 'de' ? 'Projekte' : 'Projects'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
