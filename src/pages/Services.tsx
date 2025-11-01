import { useLanguage } from '@/contexts/LanguageContext';
import bathroomTiles from '@/assets/bathroom-tiles.jpg';
import kitchenTiles from '@/assets/kitchen-tiles.jpg';
import tilesHero from '@/assets/tiles-hero.jpg';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('bathroom'),
      description: t('bathroomDesc'),
      image: bathroomTiles,
    },
    {
      title: t('kitchen'),
      description: t('kitchenDesc'),
      image: kitchenTiles,
    },
    {
      title: t('commercial'),
      description: t('commercialDesc'),
      image: tilesHero,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-4 text-gradient">
          {t('servicesTitle')}
        </h1>
        <p className="text-center text-muted-foreground mb-16 text-xl max-w-2xl mx-auto">
          {t('servicesSubtitle')}
        </p>

        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-elegant">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
