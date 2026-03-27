import { Target, Award, TrendingUp, Heart, Lightbulb, Home, Zap, Shield } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { FeatureCard } from '../components/FeatureCard';
import { useSiteContent } from '../context/SiteContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const AboutPage = () => {
  const { siteSettings, mainPagesContent } = useSiteContent();
  const pageContent = mainPagesContent.about;
  const getBlock = (id: string) => pageContent.blocks.find((block) => block.id === id);
  const isBlockVisible = (id: string) => getBlock(id)?.isVisible !== false;
  const storyRef = useScrollAnimation({ threshold: 0.2 });
  const missionRef = useScrollAnimation({ threshold: 0.2 });
  const valuesRef = useScrollAnimation({ threshold: 0.15 });
  const numbersRef = useScrollAnimation({ threshold: 0.2 });
  const prodRef = useScrollAnimation({ threshold: 0.2 });
  const teamRef = useScrollAnimation({ threshold: 0.2 });
  const ctaRef = useScrollAnimation({ threshold: 0.3 });

  return (
    <>
      {/* Hero Section */}
      <Section variant="default" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeeee] mb-6 hero-badge">
              <Award size={16} className="text-[#ff563f]" />
              <span className="text-sm font-medium text-[#161b21]">{pageContent.badge}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#161b21] leading-tight mb-6 hero-title">
              {pageContent.heroTitle}
            </h1>
            <p className="text-xl text-[#737a82] leading-normal hero-subtitle">
              {pageContent.heroDescription}
            </p>
          </div>
        </div>
      </Section>

      {/* Story Section */}
      {isBlockVisible('story') && (
      <Section variant="gray" padding="xl">
        <div
          ref={storyRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${storyRef.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="subblock-media relative rounded-[30px]">
              <img 
                src="https://images.unsplash.com/photo-1667893185343-9e869ae6e1bd?w=1080" 
                alt="Производство модульных домов"
                className="subblock-media__image aspect-video"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-semibold text-[#161b21] leading-tight">
                {getBlock('story')?.title ?? 'Наша история'}
              </h2>
              <div className="flex flex-col gap-4 text-base text-[#737a82] leading-normal">
                <p>
                  Компания была основана в 2015 году группой архитекторов и инженеров, которые видели будущее жилищного строительства в модульных технологиях.
                </p>
                <p>
                  Мы начали с небольших проектов и за 11 лет выросли в крупнейшего производителя модульных домов в регионе. Сегодня у нас собственное производство площадью 5000 м², современное оборудование и команда из 120+ специалистов.
                </p>
                <p>
                  Мы построили более 200 домов по всей России — от компактных дач до роскошных резиденций. Каждый проект для нас уникален, и мы гордимся доверием наших клиентов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      )}

      {/* Mission & Vision */}
      {isBlockVisible('mission') && (
      <Section variant="default" padding="xl">
        <div
          ref={missionRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-slide-up ${missionRef.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="gradient" padding="lg" className="flex flex-col gap-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Target size={32} className="text-white" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-semibold text-white">Наша миссия</h3>
                <p className="text-lg text-white/90 leading-normal">
                  Сделать энергоэффективное и качественное жильё доступным для каждой семьи через инновационные модульные технологии. Мы строим не просто дома — мы создаём пространство для счастливой жизни.
                </p>
              </div>
            </Card>

            <Card variant="surface" padding="lg" className="flex flex-col gap-6">
              <div className="w-16 h-16 rounded-full bg-[#161b21] flex items-center justify-center">
                <Lightbulb size={32} className="text-white" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-semibold text-[#161b21]">Наше видение</h3>
                <p className="text-lg text-[#737a82] leading-normal">
                  Стать лидером индустрии модульного строительства, устанавливая новые стандарты качества, скорости и экологичности. К 2030 году — 500+ довольных семей в собственных домах.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
      )}

      {/* Values */}
      {isBlockVisible('values') && (
      <Section variant="gray" padding="xl">
        <div
          ref={valuesRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${valuesRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('values')?.title ?? 'Наши ценности'}
            subtitle={getBlock('values')?.description ?? 'Принципы, на которых строится наша работа'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Heart size={24} />}
              title="Клиент — в центре"
              description="Каждый проект начинается с ваших потребностей. Мы создаём дома для жизни, а не для продажи"
            />
            <FeatureCard
              icon={<Award size={24} />}
              title="Качество превыше всего"
              description="Используем только сертифицированные материалы и проводим многоступенчатый контроль на производстве"
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Честность и прозрачность"
              description="Никаких скрытых платежей. Стоимость фиксируется в договоре и не меняется"
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Инновации"
              description="Внедряем передовые технологии строительства и smart-решения для вашего комфорта"
            />
            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Постоянное развитие"
              description="Инвестируем в обучение команды и модернизацию производства"
            />
            <FeatureCard
              icon={<Home size={24} />}
              title="Экологичность"
              description="Строим энергоэффективные дома с минимальным углеродным следом"
              variant="gradient"
            />
          </div>
        </div>
      </Section>
      )}

      {/* Numbers */}
      {isBlockVisible('numbers') && (
      <Section variant="default" padding="xl">
        <div
          ref={numbersRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-slide-up ${numbersRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('numbers')?.title ?? 'Компания в цифрах'}
            subtitle={getBlock('numbers')?.description ?? 'Наши достижения за 11 лет работы'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card variant="surface" padding="lg" className="text-center">
              <p className="text-5xl font-bold text-[#161b21] mb-3">11+</p>
              <p className="text-lg text-[#737a82]">Лет на рынке</p>
            </Card>
            <Card variant="surface" padding="lg" className="text-center">
              <p className="text-5xl font-bold text-[#161b21] mb-3">200+</p>
              <p className="text-lg text-[#737a82]">Построенных домов</p>
            </Card>
            <Card variant="surface" padding="lg" className="text-center">
              <p className="text-5xl font-bold text-[#161b21] mb-3">5000м²</p>
              <p className="text-lg text-[#737a82]">Производственная площадь</p>
            </Card>
            <Card variant="surface" padding="lg" className="text-center">
              <p className="text-5xl font-bold text-[#161b21] mb-3">120+</p>
              <p className="text-lg text-[#737a82]">Специалистов в команде</p>
            </Card>
          </div>
        </div>
      </Section>
      )}

      {/* Production */}
      {isBlockVisible('production') && (
      <Section variant="gray" padding="xl">
        <div
          ref={prodRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${prodRef.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-semibold text-[#161b21] leading-tight">
                {getBlock('production')?.title ?? 'Собственное производство'}
              </h2>
              <div className="flex flex-col gap-4 text-base text-[#737a82] leading-normal">
                <p>
                  Наше производство оснащено современным высокоточным оборудованием из Германии и Финляндии. Это позволяет изготавливать модули с точностью до миллиметра.
                </p>
                <p>
                  Мы контролируем весь цикл производства — от закупки материалов до финальной сборки. Каждый модуль проходит трёхступенчатую проверку качества перед отправкой на объект.
                </p>
                <p>
                  Производственные мощности позволяют нам одновременно работать над 15-20 проектами, при этом соблюдая все сроки и стандарты качества.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card variant="surface" padding="md" className="text-center">
                <p className="text-3xl font-bold text-[#161b21] mb-2">99.8%</p>
                <p className="text-sm text-[#737a82]">Точность изготовления</p>
              </Card>
              <Card variant="surface" padding="md" className="text-center">
                <p className="text-3xl font-bold text-[#161b21] mb-2">100%</p>
                <p className="text-sm text-[#737a82]">Контроль качества</p>
              </Card>
              <Card variant="surface" padding="md" className="text-center">
                <p className="text-3xl font-bold text-[#161b21] mb-2">15-20</p>
                <p className="text-sm text-[#737a82]">Проектов в работе</p>
              </Card>
              <Card variant="surface" padding="md" className="text-center">
                <p className="text-3xl font-bold text-[#161b21] mb-2">24/7</p>
                <p className="text-sm text-[#737a82]">Режим производства</p>
              </Card>
            </div>
          </div>
        </div>
      </Section>
      )}

      {/* Team Preview */}
      {isBlockVisible('team') && (
      <Section variant="default" padding="xl">
        <div
          ref={teamRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-slide-up ${teamRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('team')?.title ?? 'Команда экспертов'}
            subtitle={getBlock('team')?.description ?? 'Профессионалы, которые воплощают ваши мечты в реальность'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Игорь Кузнецов', role: 'Генеральный директор', initials: 'ИК' },
              { name: 'Светлана Морозова', role: 'Главный архитектор', initials: 'СМ' },
              { name: 'Андрей Волков', role: 'Директор по производству', initials: 'АВ' },
              { name: 'Мария Новикова', role: 'Руководитель отдела продаж', initials: 'МН' },
            ].map((member, index) => (
              <Card key={index} variant="surface" padding="lg" className="flex flex-col items-center gap-4 text-center">
                <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#161b21] mb-1">{member.name}</h4>
                  <p className="text-base text-[#737a82]">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      )}

      {/* CTA */}
      {isBlockVisible('cta') && (
      <Section variant="gray" padding="xl">
        <div
          ref={ctaRef.ref}
          className={`max-w-4xl mx-auto px-5 sm:px-8 text-center scroll-scale ${ctaRef.isVisible ? 'is-visible' : ''}`}
        >
          <Card variant="gradient" padding="lg" className="text-white">
            <div className="flex flex-col gap-6 items-center">
              <h2 className="text-4xl font-semibold leading-tight">
                {getBlock('cta')?.title ?? 'Станьте частью нашей истории!'}
              </h2>
              <p className="text-xl text-white/90 leading-normal max-w-2xl">
                {getBlock('cta')?.description ?? 'Запишитесь на экскурсию по производству и узнайте, как создаются модульные дома будущего'}
              </p>
              <a 
                href={`mailto:${siteSettings.email}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#161b21] font-medium text-xl transition-default hover:bg-opacity-90"
              >
                Записаться на экскурсию
              </a>
            </div>
          </Card>
        </div>
      </Section>
      )}
    </>
  );
};
